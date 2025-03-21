import { randomUUIDv7, type ServerWebSocket } from "bun";
import { type HubIncomingMessage, type HubOutgoingMessage, type SignInValidatorIncomingMessage } from "@uptime/types";
import prisma from "db/client"

const AVAILABLE_VALIDADATORS : {
    publicKey: string,
    validatorId: string,
    socket: ServerWebSocket<unknown>
}[] = []

const CALLBACKS : {
    [callbackid:string]:(data:HubIncomingMessage)=>void
} = {}

const VALIDATOR_INSENTIVE_LAMPORTS = 100;


const server = Bun.serve({
    fetch(req, server) {
        console.log('control is here ', req.url);
      if (server.upgrade(req)) {
        return; 
      }
      return new Response("Upgrade failed", { status: 500 });
    },
    port: 8080,
    websocket: {
        async message(ws: ServerWebSocket<unknown>, message: string):Promise<any> {
            console.log(message);
            const parsedMessage: HubIncomingMessage  = JSON.parse(message);
            if(parsedMessage.type == "signup"){
                const {callbackId, ip, publickey, signedMessage} = parsedMessage.data;
                await signUpValidator(ws,{callbackId, ip, publickey, signedMessage});
                console.log({callbackId, ip, publickey, signedMessage});
            }else if(parsedMessage.type == "validate"){
                const {callbackId, websiteId, validatorId, latency, signedMessage, status} = parsedMessage.data;
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

console.log(`Listening on ${server.hostname}:${server.port}`);