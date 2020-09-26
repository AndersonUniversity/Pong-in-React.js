// src/components/Ball.js
// the Ball

// standard react components
import React from 'react';

// style for this page
import './Ball.css';

// props are passed to Ball from GameArea, so that it can control the location
const Ball = (props) => {
  // TODO:  error handling on props
  const { x, y, size } = props;

  return (
    // Draw the Ball in the proper location, specified by the x/y position
    <div
      className="Ball"
      style={{
        left: `${x}px`,
        top: `${y}px`,
        width: `${size}px`,
        height: `${size}px`,
      }}
    />
  );
};

export default Ball;
