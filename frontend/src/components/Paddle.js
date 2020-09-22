// src/components/Paddle.js
// the Game area for Pong

// standard react components
import React from 'react';

// style for this page
import './Paddle.css';

// props are passed to Paddle from GameArea, so we can have a left and right paddle
// with x and y locations
const Paddle = (props) => {
  // TODO:  error handling on props
  const { x, y, w, h } = props; // props is expecting two numbers

  return (
    // Draw the Paddle in the proper location, specified by the x/y position
    <div
      className="Paddle"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${w}px`,
        height: `${h}px`,
      }}
    />
  );
};

export default Paddle;
