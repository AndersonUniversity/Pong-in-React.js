// src/components/Game.js
// the Game page for Pong

// standard react components
import React from 'react';

// import the game board
import GameArea from './GameArea';

// style for this page
import './Game.css';

const Game = () => {
  return (
    <div className="Game">
      <GameArea />
    </div>
  );
};

export default Game;
