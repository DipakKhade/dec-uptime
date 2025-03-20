import { randomUUIDv7, type ServerWebSocket } from "bun";
import { type HubIncomingMessage, type HubOutgoingMessage } from "@uptime/types";

const AVAILABLE_VALIDADATORS : {
    publicKey: string,
    validatorId: string,
    socket: ServerWebSocket<unknown>
} = {}

const CALLBACKS : {
    [callbackid:string]:(data:HubIncomingMessage)=>void
} = {}

const VALIDATOR_INSENTIVE_LAMPORTS = 100;
