import type { DataHubOutgoingMessage, HubIncomingMessage, HubOutgoingMessage, SignUpHubOutgoingMessage } from "@uptime/types";
import { HUB_URL } from "./config";
import { randomUUIDv7 } from "bun";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import nacl_util from "tweetnacl-util";

const CALLBACKS : {[key:string]:(data:SignUpHubOutgoingMessage) => void} = {};

let validatorId: string | null = null;

function main(){
    const ws = new WebSocket(HUB_URL);
    const validatorKeyPair = Keypair.fromSecretKey(
        Uint8Array.from(JSON.parse(process.env.SOALANA_PRIVATE_KEY!))
    );

    ws.onopen = async() => {
        const callbackId = randomUUIDv7();
        CALLBACKS[callbackId] = (data:SignUpHubOutgoingMessage) => {
            validatorId = data.validatorId
        }

        const signedMessage = await signMessage(validatorKeyPair,`Signed message for ${callbackId}, ${validatorKeyPair.publicKey}`);
        ws.send(JSON.stringify({
            type:"signup",
            data:{
                signedMessage,
                callbackId,
                publickey:validatorKeyPair.publicKey,
                ip:''
            }
        }))
    }

    ws.onmessage = (event) => {
       const data = JSON.parse(event.data) as HubOutgoingMessage;
       console.log('data from hub is this ---',data)
       if(data.type == "signup"){
        const { callbackId } = data.data;
        CALLBACKS[callbackId](data.data);
        delete CALLBACKS[callbackId];
       }else if (data.type == "validate"){
        const {callbackId:callback_id, url, websiteId} = data.data;
        validateMessageHandler(validatorKeyPair,callback_id, url, websiteId, ws);
       }
    }
}


async function signMessage(keypair:Keypair, message:string){
    const messageBytes = nacl_util.decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, keypair.secretKey);
    return JSON.stringify(Array.from(signature));
}

async function validateMessageHandler(keypair:Keypair,callback_id:string, url:string, websiteId:string, ws:WebSocket){
    const signedMessage =await signMessage(keypair, `Replying to ${callback_id}`);
    const startTime = Date.now();
    fetch(url).then(async (res) => {
        const endTime = Date.now();
        const latency = endTime - startTime;
        const status = res.status;
        console.log(`got response from ${url} with status ${status} and latency ${latency}`);
        ws.send(JSON.stringify({
            type:"validate",
            data:{
                callbackId:callback_id,
                websiteId,
                validatorId,
                latency,
                signedMessage,
                status : status === 200 ? "good" : "bad"
            }
        }))
    }).catch((err:any)=>{
        const endTime = Date.now();
        ws.send(JSON.stringify({
            callbackId:callback_id,
            websiteId,
            validatorId,
            latency:endTime-startTime,
            signedMessage,
            status: "bad"
        }))
    })
}

main();