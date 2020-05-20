### Websocket client

An angular based client application to communicate with a websocket server. <br>
The server should support 2 messaging endpoints 

- /chat.sendMessage - Public messaging
- /chat.addUser - When adding a new user

Connection to the server gets established once users enter the details. With right listeners in place, we can capture the user joining and leaving events.

To run this
- clone the repo
- Goto the repo path 
- Dev
    - Make sure the `api_url` is configured in the `environment.ts` file.
    - run `ng serve`. 
OR
- To run from a node/express server
    - Make sure the `api_url` is configured in the `environment.ts` file. 
    - run `ng build --aot --prod`. 
    - This will generate distributable directory (`dist`). Copy the `dist` & `server.js` in the same directory
    - run `node server.js` if you want to deploy it on a server 

Screens

 