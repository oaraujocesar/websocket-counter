import { useEffect, useState } from "react";

export function Counter({ ws }: { ws: WebSocket }) {
  const [count, setCount] = useState(0);
  const [clientId, setClientId] = useState("");

  function handleIncrement() {
    setCount((prevCount) => prevCount + 1);
  }

  useEffect(() => {
    ws.onmessage = (event) => {
      try {
        const message = JSON.parse(event.data);

        switch (message.type) {
          case "CLIENT_ID":
            if (message.clientId) {
              setClientId(message.clientId);
            }
            break;
          case "GET_COUNTER":
            ws.send(JSON.stringify({ type: "COUNTER_UPDATE", counter: count }));
            break;
        }
      } catch (error) {
        console.error("Websocket error: ", error);
      }
    };
  }, [ws, count]);

  return (
    <div className="flex flex-col items-center justify-center gap-4 p-4">
      <h2 className="text-2xl font-bold">Counter: {count}</h2>
      <p>Client ID: {clientId}</p>
      <button
        onClick={handleIncrement}
        className="px-4 py-2 bg-blue-500 hover:bg-blue-600 rounded text-white"
      >
        + Increment
      </button>
    </div>
  );
}
