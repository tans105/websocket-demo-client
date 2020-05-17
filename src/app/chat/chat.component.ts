import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from "./chat.service";
import { ChatMessage } from "../model/chat.message";

@Component({
    selector: 'app-chat',
    templateUrl: './chat.component.html',
    styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {
    @ViewChild('chatArea', {static: false}) private myScrollContainer: ElementRef;

    chatService: ChatService;
    msgs = [];
    conversation: string;

    ngOnInit() {
        this.chatService = new ChatService(this);
        this.connect();
    }

    connect() {
        this.chatService.connect();
    }

    disconnect() {
        this.chatService.disconnect();
    }

    sendMessage() {
        this.chatService.send(new ChatMessage(this.conversation, false, "DemoUser", new Date(), 'CHAT'));
    }

    handleMessage(message: ChatMessage) {
        this.msgs.push(message);
    }

    ngAfterViewChecked() {
        this.scrollToBottom();
    }

    scrollToBottom(): void {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    }
}
