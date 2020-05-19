import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { ChatService } from "./chat.service";
import { ChatMessage } from "./model/chat.message";
import { Constants } from "../app.constants";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    @ViewChild('chatArea', {static: false}) private myScrollContainer: ElementRef;
    @Input('user') currentUser: string;

    chatService: ChatService;
    msgs = [];
    conversation: string;


    ngOnInit() {
        this.chatService = new ChatService(this);
        this.enableChat();
    }

    connect(joinMessage) {
        this.chatService.connect(joinMessage);
    }

    disconnect() {
        this.chatService.disconnect();
    }

    sendMessage() {
        this.chatService.send(new ChatMessage(this.conversation, false, this.currentUser, new Date(), Constants.CHAT));
        this.conversation = '';
    }

    handleMessage(message: ChatMessage) {
        if (message.sender === this.currentUser && message.type === Constants.JOIN) {
        } else {
            this.msgs.push(message);
        }
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        try {
            this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
        } catch (e) {
        }
    }

    enableChat() {
        let msg = new ChatMessage(this.conversation, false, this.currentUser, new Date(), Constants.JOIN);
        this.connect(msg);
        this.msgs.push(msg)
    }
}
