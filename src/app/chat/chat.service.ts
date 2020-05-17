import * as Stomp from 'stompjs';
import * as SockJS from 'sockjs-client';
import { ChatComponent } from "./chat.component";
import { ChatMessage } from "../model/chat.message";

export class ChatService {
    webSocketEndPoint: string = 'https://pure-gorge-41603.herokuapp.com/ws';
    topic: string = "/topic/public";
    stompClient: any;
    appComponent: ChatComponent;

    constructor(appComponent: ChatComponent) {
        this.appComponent = appComponent;
    }

    connect(joinMessage) {
        let ws = new SockJS(this.webSocketEndPoint);
        this.stompClient = Stomp.over(ws);
        this.stompClient.debug = null; // Disable the logs
        const _this = this;
        _this.stompClient.connect({}, function (frame) {
            _this.send(joinMessage);
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
            this.connect(new ChatMessage('', false, this.appComponent.currentUser, new Date(), 'JOIN'));
        }, 5000);
    }

    send(message: ChatMessage) {
        if (message.type == 'CHAT') {
            this.stompClient.send("/app/chat.sendMessage", {}, JSON.stringify(message));
        } else {
            this.stompClient.send("/app/chat.addUser", {}, JSON.stringify(message));
        }
    }

    onMessageReceived(message) {
        let chatMessage = new ChatMessage(message.body, true);
        this.appComponent.handleMessage(chatMessage);

    }
}