import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ChatService } from "./chat.service";
import { ChatMessage } from "../model/chat.message";
import { Constants } from "../app.constants";

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
    canTalk = false;
    currentUser: string;

    ngOnInit() {
        this.chatService = new ChatService(this);
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

    enableChat(currentUser) {
        this.currentUser = currentUser;
        this.canTalk = true;
        let msg = new ChatMessage(this.conversation, false, this.currentUser, new Date(), Constants.JOIN);
        this.connect(msg);
        this.msgs.push(msg)

    }
}
