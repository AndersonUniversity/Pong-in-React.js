// src/components/gameLogic.js
// the logic that determines if things collide, and other similar things

// function to return a number between the min and max values
// modified from source: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Math/random
export const getRandomValue = (min, max) => {
  return Math.floor(Math.random() * Math.floor(max - min)) + min;
};

// randomly return positive or negative one
export const getRandomSign = () => {
  // Math.random() returns a number between 0 and 1
  if (Math.random() < 0.5) {
    return +1; // half the time, be positive
  } else {
    return -1; // half the time, be negative
  }
};

export const collideRightPaddle = () => {};

export const collideLeftPaddle = () => {};
