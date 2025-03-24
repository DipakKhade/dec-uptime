import { randomUUIDv7, type ServerWebSocket } from "bun";
import { type DataValidatorOutgoingMessage, type HubIncomingMessage, type HubOutgoingMessage, type SignInValidatorIncomingMessage } from "@uptime/types";
import prisma from "db/client"
import nacl from 'tweetnacl';
import nacl_util from "tweetnacl-util"
import { PublicKey } from "@solana/web3.js";

const AVAILABLE_VALIDADATORS : {
    validaterId: string,
    publicKey: string,
    validatorId: string,
    socket: ServerWebSocket<unknown>
}[] = []

const CALLBACKS : {
    [callbackid:string]:(data:DataValidatorOutgoingMessage)=>void
} = {}

const VALIDATOR_INSENTIVE_LAMPORTS = 100;


const server = Bun.serve({
    fetch(req, server) {
      if (server.upgrade(req)) {
        return; 
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    port: 8080,
    websocket: {
        async message(ws: ServerWebSocket<unknown>, message: string):Promise<any> {
            const parsedMessage: HubIncomingMessage  = JSON.parse(message);
            if(parsedMessage.type == "signup"){
                console.log('data from hub is this ---',parsedMessage)
                console.log(`Signed message for ${parsedMessage.data.callbackId}, ${parsedMessage.data.publickey}`,
                    parsedMessage.data.publickey,
                    parsedMessage.data.signedMessage)
                const verified = await validateMessage(
                    `Signed message for ${parsedMessage.data.callbackId}, ${parsedMessage.data.publickey}`,
                    parsedMessage.data.publickey,
                    parsedMessage.data.signedMessage
                );
                if (verified) {
                    console.log('message is verified');
                    const {callbackId, ip, publickey, signedMessage} = parsedMessage.data;
                    await signUpValidator(ws,{callbackId, ip, publickey, signedMessage});   
                }
                
            }else if(parsedMessage.type == "validate"){
                ///this function logic in implimented before req is sended in moniterWebsites fn
                CALLBACKS[parsedMessage.data.callbackId](parsedMessage.data);
            }
            return;
        },
        async close(ws: ServerWebSocket<unknown>, code: number, reason: string) {
            return;
        }
    },
  });

  async function signUpValidator(ws:ServerWebSocket<unknown>,{callbackId, ip, publickey, signedMessage}:SignInValidatorIncomingMessage){
    try{
        const validator = await prisma.validator.findFirst({
            where:{
                publicKey: publickey
            }
        })
        if(validator){
            AVAILABLE_VALIDADATORS.push({
                validaterId: validator.id,
                publicKey: publickey,
                validatorId: validator.id,
                socket: ws
            })

            ws.send(JSON.stringify({
                type:"signup",
                data:{
                    validatorId: validator.id,
                    callbackId
                }
            }))
            console.log(AVAILABLE_VALIDADATORS)
            return;
        }

        const newValidator = await prisma.validator.create({
            data:{
                ip,
                publicKey: publickey,
                pendingPayout: 0,
                location:'unknown',
            }
        })

        AVAILABLE_VALIDADATORS.push({
            validaterId: newValidator.id,
            publicKey: publickey,
            validatorId: newValidator.id,
            socket: ws
        })

        ws.send(JSON.stringify({
            type:"signup",
            data:{
                validatorId: newValidator.id,
                callbackId
            }
        }))
    }catch(error){
        console.log(error);
    }

  }

 async function validateMessage(message:string,publicKey:string, signature:string){
    const messageBytes = nacl_util.decodeUTF8(message);
    const result = nacl.sign.detached.verify(
        messageBytes,
        new Uint8Array(JSON.parse(signature)),
        new PublicKey(publicKey).toBytes(),
    );
    return result;
 }

  async function moniterWebsites(){
    try{
        const websites = await prisma.website.findMany({
            where:{
                disable:false
            }
        })
        console.log(`got ${websites.length} websites to check`);
        for(let website of websites){
            AVAILABLE_VALIDADATORS.forEach(validator =>{
                const callbackId = randomUUIDv7();
                console.log(`validator ${validator.publicKey} is checking ${website.url} and callback id is ${callbackId}`);
                validator.socket.send(JSON.stringify({
                    type:"validate",
                    data:{
                        websiteId:website.id,
                        callbackId,
                        url:website.url,
                    }
                }))

                CALLBACKS[callbackId] = async(data:DataValidatorOutgoingMessage)=>{
                    console.log('data from validator is this ---',`Replying to ${data.callbackId}`, validator.publicKey, data.signedMessage)
                    const verify = await validateMessage(`Replying to ${data.callbackId}`, validator.publicKey, data.signedMessage);
       
                    if(!verify){
                        console.log(`validator ${validator.publicKey} got bad data ${JSON.stringify(data)}`);
                        return;
                    }

                    console.log('verify>>>>>>',verify);
                    const txn = await prisma.$transaction(async tx=>{
                        const ticks = await tx.ticks.create({
                            data:{
                                websiteId:website.id,
                                validatorId:validator.validaterId,
                                latency:data.latency,
                                status:data.status,
                            }
                        })
                        
                        await tx.validator.update({
                            where:{
                                id:validator.validaterId
                            },
                            data:{
                                pendingPayout:{
                                    increment:VALIDATOR_INSENTIVE_LAMPORTS
                                }
                            }
                        })
                    })
                }
            })
        }
    }catch(error){
        console.log(error);
    }
  }

  setInterval(async () => {
    await moniterWebsites();
  }, 4 * 1000);

console.log(`Listening on ${server.hostname}:${server.port}`);