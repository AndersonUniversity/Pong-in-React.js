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
  const stepSizePercent = 0.1; // each movement of the paddle is 10% of the paddle height

  // variables to store calculated size of playing field
  const [gameWidth, setGameWidth] = useState(0);
  const [gameHeight, setGameHeight] = useState(0);

  // constants to position paddles
  // note that positions are measured from the upper left corner of the object
  const [leftx, setLeftx] = useState(0); // left paddle x position
  const [lefty, setLefty] = useState(0); // left paddle y position
  const [rightx, setRightx] = useState(0); // right paddle x position
  const [righty, setRighty] = useState(0); // right paddle y position
  const [pWidth, setPWidth] = useState(0); // width of the paddle
  const [pHeight, setPHeight] = useState(0); // height of the paddle
  const [stepY, setStepY] = useState(0); // amount to move with each keypress

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

    // set the step that we'll move each time the button is pressed
    setStepY(paddleHeightPercent * gameHeight * stepSizePercent);

    // set the position of the paddles
    // (x,y) mark the upper left corner of the paddles
    setLeftx(paddleWidthPercent * gameWidth);
    setLefty(0.2 * gameHeight);
    setRightx(gameWidth - 2 * paddleWidthPercent * gameWidth);
    setRighty(0.8 * gameHeight - paddleHeightPercent * gameHeight);
  }, [gameWidth, gameHeight]);

  // functions to move paddles down
  // y is either lefty or righty
  // sety is either the function setLefty or setRighty
  const moveDown = (y, sety) => {
    console.log('gh', gameHeight, 'ph', pHeight, 'y', y);
    if (y < gameHeight + pHeight) {
      // check that we are not off the bottom
      // if so, move down by our stepY
      sety(y + stepY);
    } // otherwise, don't change the y value downward
  };

  // functions to move paddles up
  // y is either lefty or righty
  // sety is either the function setLefty or setRighty
  const moveUp = (y, sety) => {
    if (y - stepY > 0) {
      // check that we are not off the bottom
      // if so, move down by our stepY
      sety(y - stepY);
    } else {
      // otherwise, don't change the y value upward
      sety(0);
    }
  };

  // this is executed when the items in the [] at the end of the function change
  // adds event listeners to detect keystrokes
  // includes the function that moves the paddles
  useEffect(() => {
    // this is the function that handles the event we are listening for
    const handleEsc = (event) => {
      if (event.keyCode === 90) {
        // 'z'
        moveDown(lefty, setLefty);
      } else if (event.keyCode === 65) {
        // 'a'
        moveUp(lefty, setLefty);
      } else if (event.keyCode === 38) {
        // up arrow
        console.log('up Key');
        moveUp(righty, setRighty);
      } else if (event.keyCode === 40) {
        // down arrow
        console.log('down Key');
        moveDown(righty, setRighty);
      } else {
        console.log(event.keyCode);
      }
    };
    window.addEventListener('keydown', handleEsc);

    return () => {
      window.removeEventListener('keydown', handleEsc);
    };
  }, [lefty, moveUp, moveDown]);

  return (
    <div className="GameArea">
      <Paddle x={leftx} y={lefty} w={pWidth} h={pHeight} />
      <Paddle x={rightx} y={righty} w={pWidth} h={pHeight} />
    </div>
  );
};

export default GameArea;
