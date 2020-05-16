import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ChatComponent } from "./chat.component";
import { ChatMessage } from "../model/chat.message";

export class ChatService {
    webSocketEndPoint: string = 'http://localhost:8080/ws';
    topic: string = "/topic/public";
    stompClient: any;
    appComponent: ChatComponent;

    constructor(appComponent: ChatComponent) {
        this.appComponent = appComponent;
    }

    connect() {
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        // this.stompClient.debug = null; // Disable the logs
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.stompClient.subscribe(_this.topic, function (sdkEvent) {
                _this.onMessageReceived(sdkEvent);
            });
        }, this.errorCallBack);
    };

    disconnect() {
        if (this.stompClient !== null) {
            this.stompClient.disconnect();
        }
    }

    errorCallBack(error) {
        console.log("errorCallBack -> " + error);
        setTimeout(() => {
            this.connect();
        }, 5000);
    }

    send(message: ChatMessage) {
        this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
    }

    onMessageReceived(message) {
        let chatMessage = new ChatMessage(message.body, true);
        this.appComponent.handleMessage(chatMessage);
    }
}