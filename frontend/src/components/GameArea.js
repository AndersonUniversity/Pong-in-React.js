// src/components/GameArea.js
// This component draws the gamearea, and also handles the movement of
// the other components inside the game area, such as the paddles

// standard react components
import React from 'react';
import { useState, useEffect } from 'react';

// import paddles and ball
import Paddle from './Paddle';
import Ball from './Ball';

// style for this page
import './GameArea.css';

const GameArea = () => {
  const KEY_A = 65; // ascii code for lowercase a
  const KEY_Z = 90; // ascii code for lowercase z
  const KEY_UP = 38; // ascii code for up arrow
  const KEY_DOWN = 40; // ascii code for down arrow
  const keymap = { a: false, z: false, up: false, down: false }; // array of keys that are currently pressed

  // constants for paddle ratios
  const paddleWidthPercent = 0.01; // paddle is 1% of gamearea wide
  const paddleHeightPercent = 0.15; // paddle is 15% of gamearea tall
  const stepSizePercent = 0.1; // each movement of the paddle is 10% of the paddle height
  const paddleSpace = 2; // blank space "behind" the paddle, multipls of paddle width
  const initialPosition = 0.5; // initial position, percent of gameHeight from top/bottom

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

  // constants for the ball's position
  const [ballx, setBallx] = useState(0); // ball's x position (upper left corner)
  const [bally, setBally] = useState(0); // ball's y position (upper left corner)
  const [ballSize, setBallSize] = useState(0); // ball's width/height (it's square)

  // what to execute when the screen is reloaded with a new size
  // executed once at the start, since there are [] for the last
  // argument of useEffect
  // NOTE:  in this function, we can call something like setGameWidth,
  // and it will work ... except that the value of gameWidth is not set
  // immediately -- it is queued to be set when this function exits.  This
  // is why we have all the long formulas that reuse parentElement.offsetWidth, etc
  useEffect(() => {
    // find out size of parent component (App.js)
    var parentElement = document.querySelector('.GameArea');

    // save the width and height of the game board
    setGameWidth(parentElement.offsetWidth);
    setGameHeight(parentElement.offsetHeight);

    // set the dimensions of the paddles
    setPWidth(paddleWidthPercent * parentElement.offsetWidth);
    setPHeight(paddleHeightPercent * parentElement.offsetHeight);

    // set the step that we'll move each time the button is pressed
    setStepY(
      paddleHeightPercent * parentElement.offsetHeight * stepSizePercent
    );

    // set the position of the paddles
    // (x,y) mark the upper left corner of the paddles
    // if initialPosition is not 0.5, the left paddle will start higher than the right
    setLeftx(paddleWidthPercent * parentElement.offsetWidth);
    setLefty(
      initialPosition *
        (parentElement.offsetHeight -
          paddleHeightPercent * parentElement.offsetHeight)
    );
    setRightx(
      parentElement.offsetWidth -
        paddleSpace * paddleWidthPercent * parentElement.offsetWidth
    );
    setRighty(
      (1 - initialPosition) *
        (parentElement.offsetHeight -
          paddleHeightPercent * parentElement.offsetHeight)
    );

    // set the ball's starting position
    setBallx(0.5 * parentElement.offsetWidth);
    setBally(0.5 * parentElement.offsetHeight);

    // set ball's starting size -- same width as the paddle
    setBallSize(paddleWidthPercent * parentElement.offsetWidth);
  }, []);

  // this is the function that handles the keydown event
  const handleKeyDown = (event) => {
    // for the keys that we care about, set their value in the map to true
    // when the key is pressed
    if (event.keyCode === KEY_Z) {
      keymap.z = true;
    } else if (event.keyCode === KEY_A) {
      keymap.a = true;
    } else if (event.keyCode === KEY_UP) {
      keymap.up = true;
    } else if (event.keyCode === KEY_DOWN) {
      keymap.down = true;
    }
    // since a key was pressed, move the objects
    // TODO:  This will be moved to a timer loop later, when we get the ball
    move();
  };

  // this is the function that handles the keyup event
  const handleKeyUp = (event) => {
    // for the keys that we care about, set their value in the map to false
    // when the key is lifted
    if (event.keyCode === KEY_Z) {
      keymap.z = false;
    } else if (event.keyCode === KEY_A) {
      keymap.a = false;
    } else if (event.keyCode === KEY_UP) {
      keymap.up = false;
    } else if (event.keyCode === KEY_DOWN) {
      keymap.down = false;
    }
  };

  // function that moves everything on the gamearea
  const move = () => {
    // check to see which keys are being held down
    // and move the correct object relative to that key
    // Note:  these need to be independent if's, because more than
    // one can be true
    if (keymap.z === true) {
      moveDown(lefty, setLefty);
    }
    if (keymap.a === true) {
      moveUp(lefty, setLefty);
    }
    if (keymap.up === true) {
      moveUp(righty, setRighty);
    }
    if (keymap.down === true) {
      moveDown(righty, setRighty);
    }
  };

  // functions to move paddles down
  // y is either lefty or righty
  // sety is either the function setLefty or setRighty
  const moveDown = (y, sety) => {
    if (y + stepY < gameHeight - pHeight) {
      // check that we are not off the bottom
      // if so, move down by our stepY
      sety(y + stepY);
    } else {
      // otherwise, set y so the bottom is on the edge
      sety(gameHeight - pHeight);
    }
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
    // listen for these events, and go to the specified function
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);
    // when done, unload the event listener
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [lefty, righty]);
  // TODO:  there are some warnings with handleKeyDown and handleKeyUp that need to be eliminated
  // I think the event listeners may need to be in the other useEffect to be most efficient
  // but, if I move it up then it doesn't work -- the lefty and righty is always zero
  // I think this may be fixed when the ball is added and we get a timing loop

  return (
    <div className="GameArea">
      <Paddle x={leftx} y={lefty} w={pWidth} h={pHeight} />
      <Paddle x={rightx} y={righty} w={pWidth} h={pHeight} />
      <Ball x={ballx} y={bally} size={ballSize} />
    </div>
  );
};

export default GameArea;
