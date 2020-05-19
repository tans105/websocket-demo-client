import { Component } from '@angular/core';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.css']
})
export class AppComponent {
    canTalk = false;
    currentUser: string;

    enableChat(user) {
        this.currentUser = user;
        this.canTalk = true;
    }
}
