import { useEffect, useState } from 'react';

export default function Home() {
  const [watchers, setWatchers] = useState({});
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const websocket = new WebSocket('ws://localhost:4000/product-1');
    
    websocket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      setWatchers(prev => ({
        ...prev,
        [data.productId]: data.count
      }));
    };

    setWs(websocket);

    return () => {
      websocket.close();
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>E-commerce Product Tracker</h1>
      <p>Watching Product 1: {watchers['product-1'] || 0} users</p>
    </div>
  );
}