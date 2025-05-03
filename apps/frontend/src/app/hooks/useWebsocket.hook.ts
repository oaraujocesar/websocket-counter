import { useEffect } from "react";

interface UseWebsocketResponse {
  ws: WebSocket;
}

export const useWebsocket = (): UseWebsocketResponse => {
  const ws = new WebSocket("ws://localhost:3333");

  useEffect(() => {
    ws.onopen = () => {
      console.log("Connected to WebSocket Server");
    };

    return () => {
      ws.close();
    };
  }, [ws]);

  return { ws };
};
