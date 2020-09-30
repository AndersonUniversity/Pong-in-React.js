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

// determine if two objects boundaries overlap
// first and second are objects with properties {x, y, width, height}
// note that the (x,y) location is the upper left of the object, with
// x increasing to the right, and y increasing downward
// return true if they collide, false if not
export const collideObjects = (first, second) => {
  ///////
  // if they are too far apart in x to collide, return false
  if (first.x + first.width < second.x) {
    // first is left of second
    return false;
  }
  if (first.x > second.x + second.width) {
    // first is right of second
    return false;
  }

  ///////
  // if they are too far apart in y to collide, return false
  if (first.y + first.height < second.y) {
    // first is above second
    return false;
  }
  if (first.y > second.y + second.height) {
    // first is below second
    return false;
  }

  ///////
  // there is a chance they overlap, so check the left edge
  if (first.x + first.width >= second.x && first.y + first.height >= second.y) {
    console.log('COLLISION!');
    return true;
  }

  console.log('we have a hole in the if logic in collideObjects');
};
