// src/components/Home.js
// the Homepage, welcoming them to the game

// standard react components
import React from 'react';
import { Jumbotron, Button } from 'reactstrap';
import { Link } from 'react-router-dom';

// style for this page
import './Home.css';

const Home = () => {
  return (
    <div className="Home">
      <Jumbotron>
        <h1 className="display-3">Welcome to Pong!</h1>
        <hr className="my-2" />
        <h2>Rules:</h2>
        <h3>
          Try to keep the ball bouncing for as long as possible. Each bounce
          equals one point.
        </h3>
        <h3>
          Move the left paddle with that a and z keys, and the right paddle with
          the up and down arrows.
        </h3>
        <hr className="my-2" />
        <h2>
          <Link to="/game">
            <Button outline color="danger" size="lg">
              Play Now
            </Button>
          </Link>
        </h2>
      </Jumbotron>
    </div>
  );
};

export default Home;
