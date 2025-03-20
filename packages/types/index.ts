
export interface SignInValidatorIncomingMessage {
    signedMessage: string;
    callbackId: string;
    publickey: string;
    ip: string;
}

export interface DataValidatorOutgoingMessage {
    callbackId: string;
    websiteId: string;
    validatorId: string;
    latency: number;
    signedMessage: string;
    status: "good" | "bad";
}

export interface SignUpHubOutgoingMessage {
    validatorId: string;
    callbackId: string;
}

export interface DataHubOutgoingMessage {
    websiteId: string;
    callbackId: string;
    url: string;
}

export type HubIncomingMessage = {
    type:"signup",
    data: SignInValidatorIncomingMessage
} | {
    type:"validate",
    data: DataValidatorOutgoingMessage
}

export type HubOutgoingMessage = {
    type:"signup",
    data: SignUpHubOutgoingMessage
} | {
    type:"validate",
    data: DataHubOutgoingMessage
}