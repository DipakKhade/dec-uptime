import { HUB_URL } from "./config";


function main(){
    const ws = new WebSocket(HUB_URL);

    ws.onmessage = (event) => {
        console.log(event.data);
    }
}

main();