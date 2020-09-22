// src/components/GameArea.js
// the Game area for Pong

// standard react components
import React from 'react';
import { useState, useEffect } from 'react';

// import paddles
import Paddle from './Paddle';

// style for this page
import './GameArea.css';

const GameArea = () => {
  // constants for paddle ratios
  const paddleWidthPercent = 0.01; // paddle is 1% of gamearea wide
  const paddleHeightPercent = 0.15; // paddle is 15% of gamearea tall

  // variables to store calculated size of playing field
  const [gameWidth, setGameWidth] = useState(0);
  const [gameHeight, setGameHeight] = useState(0);

  // constants to position paddles
  const [leftx, setLeftx] = useState(0);
  const [lefty, setLefty] = useState(0);
  const [rightx, setRightx] = useState(0);
  const [righty, setRighty] = useState(0);
  const [pWidth, setPWidth] = useState(0);
  const [pHeight, setPHeight] = useState(0);

  // what to execute when the screen is reloaded with a new size
  // executed once at the start, and then if [gameWidth, gameHeight] change
  useEffect(() => {
    // find out size of parent component (App.js)
    var parentElement = document.querySelector('.GameArea');

    // save the width and height of the game board
    setGameWidth(parentElement.offsetWidth);
    setGameHeight(parentElement.offsetHeight);

    // set the dimensions of the paddles
    setPWidth(paddleWidthPercent * gameWidth);
    setPHeight(paddleHeightPercent * gameHeight);

    // set the position of the paddles
    // (x,y) mark the upper left corner of the paddles
    setLeftx(paddleWidthPercent * gameWidth);
    setLefty(0.2 * gameHeight);
    setRightx(gameWidth - 2 * paddleWidthPercent * gameWidth);
    setRighty(0.8 * gameHeight - paddleHeightPercent * gameHeight);
  }, [gameWidth, gameHeight]);

  return (
    <div className="GameArea">
      <Paddle x={leftx} y={lefty} w={pWidth} h={pHeight} />
      <Paddle x={rightx} y={righty} w={pWidth} h={pHeight} />
    </div>
  );
};

export default GameArea;
