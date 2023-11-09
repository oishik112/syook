// src/components/DataList.js
import React from 'react';

const DataList = ({ data }) => {
  return (
    <div>
      <h2>Data List</h2>
      <ul>
        {data.map((item, index) => (
          <li key={index}>{item.name} - {item.origin} to {item.destination}</li>
        ))}
      </ul>
    </div>
  );
};

export default DataList;
