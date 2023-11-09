import React, { useEffect, useState } from 'react';
import io from 'socket.io-client';
import DataList from './components/DataList';
import SuccessRate from './components/SuccessRate';


const socket = io('http://localhost:3001'); // Replace with your backend WebSocket server URL

const App = () => {
  const [data, setData] = useState([]);
  const [successCount, setSuccessCount] = useState(0);
  const [totalCount, setTotalCount] = useState(0);

  useEffect(() => {
    socket.on('data', (message) => {
      // Handle incoming data from the socket
      const parsedData = JSON.parse(message);
      // Update data state
      setData(parsedData);
      // Calculate success rate
      const successItems = parsedData.filter(item => item.success).length;
      setSuccessCount(successItems);
      setTotalCount(parsedData.length);
    });

    // Clean up on component unmount
    return () => {
      socket.disconnect();
    };
  }, []);

  const successRate = ((successCount / totalCount) * 100).toFixed(2);

  return (
    <div className="App">
      <h1>Real-Time Data Display</h1>
      <DataList data={data} />
      <SuccessRate successRate={successRate} />
    </div>
  );
};

export default App;
