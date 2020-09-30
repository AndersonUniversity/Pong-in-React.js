// src/components/GameArea.js
// This component draws the gamearea, and also handles the movement of
// the other components inside the game area, such as the paddles

// standard react components
import React from 'react';
import { useState, useEffect } from 'react';

// import paddles and ball
import Paddle from './Paddle';
import Ball from './Ball';

// import functions to detect collision between ball and paddles
import { collideObjects, getRandomValue, getRandomSign } from './gameLogic';

// style for this page
import './GameArea.css';

const GameArea = () => {
  // constants related to keys
  const KEY_A = 65; // ascii code for lowercase a
  const KEY_Z = 90; // ascii code for lowercase z
  const KEY_UP = 38; // ascii code for up arrow
  const KEY_DOWN = 40; // ascii code for down arrow
  const keymap = { a: false, z: false, up: false, down: false }; // array of keys that are currently pressed

  // time step for rendering speed
  const TIME_STEP = 10; // in milliseconds between steps
  const INI_SPEED_X_RANGE = 5; // initial ball speed will vary from 0 to +5, in x
  const INI_SPEED_Y_RANGE = 2; // initial ball speed will vary, from 0 to 2, in y

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
  const [ballSize, setBallSize] = useState(0); // ball's width/height (it's square)
  const [ballx, setBallx] = useState(0); // ball's x position (upper left corner)
  const [bally, setBally] = useState(0); // ball's y position (upper left corner)
  const [ballSpeedx, setBallSpeedx] = useState(0); // ball's x speed (pixels/time step)
  const [ballSpeedy, setBallSpeedy] = useState(0); // ball's y speed

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

    // set ball's starting speed
    setBallSpeedx(getRandomSign() * getRandomValue(1, INI_SPEED_X_RANGE));
    setBallSpeedy(getRandomSign() * getRandomValue(0, INI_SPEED_Y_RANGE));
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
    // move the ball first
    moveBall();

    // check for collisions first (be mean to the user, ha!)
    if (
      collideObjects(
        { x: ballx, y: bally, width: ballSize, height: ballSize },
        { x: leftx, y: lefty, width: pWidth, height: pHeight }
      ) === true
    ) {
      alert('Collision with left paddle!!!!');
    }
    if (
      collideObjects(
        { x: ballx, y: bally, width: ballSize, height: ballSize },
        { x: rightx, y: righty, width: pWidth, height: pHeight }
      ) === true
    ) {
      alert('Collision with right paddle!!!!');
    }

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

  // function that moves the ball
  const moveBall = () => {
    // add the speed to the position in x
    if (ballx + ballSpeedx > 0 && ballx + ballSpeedx < gameWidth - ballSize) {
      setBallx(ballx + ballSpeedx);
    } else if (ballx + ballSpeedx < 0) {
      // if ball hits left edge of screen
      setBallx(0);
      alert('You lose!'); // TODO: this is an infinite loop of alerts
    } else {
      // if ball hits right edge of screen
      setBallx(gameWidth - ballSize);
      alert('You lose!'); // TODO: this is an infinite loop of alerts
    }

    // add the speed to the position in y
    if (bally + ballSpeedy > 0 && bally + ballSpeedy < gameHeight - ballSize) {
      setBally(bally + ballSpeedy);
    } else if (bally + ballSpeedy < 0) {
      // ball bounces off top edge
      setBally(0); // don't go past edge
      setBallSpeedy(-ballSpeedy); // reverse direction
    } else {
      // if ball bounces off bottom edge
      setBally(gameHeight - ballSize); // don't go past edge
      setBallSpeedy(-ballSpeedy); // reverse direction
    }
  };

  // functions to move paddles down
  // y is either lefty or righty, sety is either setLefty() or setRighty()
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
  // y is either lefty or righty, sety is either setLefty() or setRighty()
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

  // this is executed when the items in the [] change
  // adds event listeners to detect keystrokes, also handles animation interval
  useEffect(() => {
    // listen for these events, and go to the specified function
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('keyup', handleKeyUp);

    // start animating the motion, number is in milliseconds
    // bug -- this accesses move when all ball values are zero
    // if we put this in the other useEffect, we get multiple intervals executing
    // in an infinite loop
    const interval = setInterval(move, TIME_STEP);

    // when done, unload the event listeners and stop the interval
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
      clearInterval(interval);
    };
  }, [lefty, righty, ballx, bally]);
  // TODO:  there are some warnings with handleKeyDown and handleKeyUp and move that need to be eliminated
  // I don't know why these things need to have a trigger with those dependencies in the [].
  // if we put these in the other useEffect function, then these functions only see the original useState values

  return (
    <div className="GameArea">
      <Paddle x={leftx} y={lefty} w={pWidth} h={pHeight} />
      <Paddle x={rightx} y={righty} w={pWidth} h={pHeight} />
      <Ball x={ballx} y={bally} size={ballSize} />
    </div>
  );
};

export default GameArea;
