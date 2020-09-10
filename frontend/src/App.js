//frontend/src/App.js
// the main container component

// standard react components
import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

// bring in other components
import './App.css';
import Home from './components/Home';
import MenuBar from './components/MenuBar';

function App() {
  return (
    <div className="App">
      {/* The BrowserRouter package gives us the Single Page Application (SPA)
       * functionality, so we can use routes in the URL. */}
      <BrowserRouter>
        {/* Show the MenuBar component on all pages */}
        <MenuBar />

        {/* these components are only shown with a route in the URL */}
        <Switch>
          <Route path="/" exact component={Home} />
        </Switch>
      </BrowserRouter>
    </div>
  );
}

export default App;
