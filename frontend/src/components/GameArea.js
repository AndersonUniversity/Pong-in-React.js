// src/components/GameArea.js
// the Game area for Pong

// standard react components
import React from 'react';

// import paddles
import Paddle from './Paddle';

// style for this page
import './GameArea.css';

const GameArea = () => {
  return (
    <div className="GameArea">
      <Paddle x={10} y={150} />
      <Paddle x={1045} y={350} />
    </div>
  );
};

export default GameArea;
