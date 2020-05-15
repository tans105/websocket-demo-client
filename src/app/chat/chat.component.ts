import { Component, OnInit } from '@angular/core';
import { ChatService } from "./chat.service";

@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.css']
})
export class ChatComponent implements OnInit {

  webSocketAPI: ChatService;
  greeting: any;
  name: string;

  ngOnInit() {
    this.webSocketAPI = new ChatService(this);
  }

  connect() {
    this.webSocketAPI._connect();
  }

  disconnect() {
    this.webSocketAPI._disconnect();
  }

  sendMessage() {
    this.webSocketAPI._send(this.name);
  }

  handleMessage(message) {
    console.log("Server says.........." + message);
    this.greeting = message;
  }
}
