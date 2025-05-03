import { Counter } from "./components/Counter";
import { useWebsocket } from "./hooks/useWebsocket.hook";

export function App() {
  const { ws } = useWebsocket();

  return <Counter ws={ws} />;
}

export default App;
