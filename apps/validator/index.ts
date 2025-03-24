import type { DataHubOutgoingMessage, HubIncomingMessage, HubOutgoingMessage, SignUpHubOutgoingMessage } from "@uptime/types";
import { HUB_URL } from "./config";
import { randomUUIDv7 } from "bun";
import { Keypair } from "@solana/web3.js";
import nacl from "tweetnacl";
import { decodeUTF8 } from "tweetnacl-util";

const CALLBACKS : {[key:string]:(data:SignUpHubOutgoingMessage) => void} = {};

let validatorId: string | null = null;

function main(){
    const ws = new WebSocket(HUB_URL);
    const validatorKeyPair = Keypair.fromSecretKey(
        Uint8Array.from(process.env.SOALANA_PRIVATE_KEY!)
    );

    ws.onopen = () => {
        const callbackId = randomUUIDv7();
        CALLBACKS[callbackId] = (data:SignUpHubOutgoingMessage) => {
            validatorId = data.validatorId
        }

        const signedMessage = signMessage(validatorKeyPair.secretKey, `this is a message from validator ${validatorKeyPair.publicKey.toBase58()}`);

        ws.send(JSON.stringify({
            signedMessage,
            callbackId,
            publickey:validatorKeyPair.publicKey.toBase58(),
            ip:''
        }))
    }

    ws.onmessage = (event) => {
       const data = event.data as HubOutgoingMessage;

       switch(data.type){
        case "signup":
            const { callbackId } = data.data;
            CALLBACKS[callbackId](data.data);
            delete CALLBACKS[callbackId];
            break;
        case "validate":
            const {callbackId:callback_id, url, websiteId} = data.data;
            validateMessageHandler(callback_id, url, websiteId, ws);
            break;
       }
    }
}


function signMessage(privateKey:Uint8Array<ArrayBufferLike>, message:string){
    const messageBytes = decodeUTF8(message);
    const signature = nacl.sign.detached(messageBytes, privateKey);

    return JSON.stringify(Array.from(signature));
}

function validateMessageHandler(callback_id:string, url:string, websiteId:string, ws:WebSocket){
    console.log(`got validate message ${url}`);
    const signedMessage = signMessage(Uint8Array.from(process.env.SOALANA_PRIVATE_KEY!), `this is a message from validator ${validatorId} for website ${websiteId}`);
    const startTime = Date.now();
    fetch(url).then(async (res) => {
        const endTime = Date.now();
        const latency = endTime - startTime;
        const status = res.status;
        console.log(`got response from ${url} with status ${status} and latency ${latency}`);
        ws.send(JSON.stringify({
            callbackId:callback_id,
            websiteId,
            validatorId,
            latency,
            signedMessage,
            status : status === 200 ? "good" : "bad"
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