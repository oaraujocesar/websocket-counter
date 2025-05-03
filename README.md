# Websocket Counter Challenge

## Instructions

1. First install all dependencies

```sh
npm install
```

2. Then run the application

```sh
npm start
```

3. The backend will run under the address `http://localhost:3333` and the frontend will run under the address `http://localhost:4200`


## Improvement points

1. I would add some information to a .env file, like the port of the backend and the frontend, so that it is easier to change them.
2. Implement tests to the backend and the frontend (both unit and e2e), so that we can be sure that everything is working as expected.
3. A reconnection strategy for the websocket connection, so that if the connection is lost, it will try to reconnect automatically.
4. For scalability (horizontal) I would use something other than a map in memory to store the connections, like Redis.
5. For production I would add a security layer to the websocket connection (TLS/SSL).