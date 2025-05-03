import { randomUUID } from "crypto";
import { WebSocket, WebSocketServer } from "ws";

interface ClientMessage {
  type: "COUNTER_UPDATE";
  counter: number;
}

const wsOptions = {
  host: "localhost",
  port: 3333,
};

const wss = new WebSocketServer(wsOptions);

const clients = new Map<WebSocket, string>();

wss.on("connection", (ws: WebSocket) => {
  const clientId = randomUUID();

  clients.set(ws, clientId);

  console.log(`Client connected with ID: ${clientId}`);

  ws.send(JSON.stringify({ type: "CLIENT_ID", clientId }));

  ws.on("message", (message) => {
    try {
      const data = JSON.parse(message.toString()) as ClientMessage;

      if (data.type === "COUNTER_UPDATE") {
        console.log(
          `[clientId:${clientId}] Received counter value: ${data.counter}`
        );
      }
    } catch (error) {
      console.error(`[clientId:${clientId}] Error parsing message:`, error);
    }
  });

  ws.on("close", () => {
    console.log(`Client disconnected: ${clientId}`);
    clients.delete(ws);
  });
});

setInterval(() => {
  for (const [client] of clients.entries()) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({ type: "GET_COUNTER" }));
    }
  }
}, 1000);

process.on("SIGTERM", () => {
  console.log("shutting down Websocket server");
  wss.close();

  process.exit(0);
});
