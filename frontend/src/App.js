import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Upload from './Upload';
import Visualization from './Visualization';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <h1>Seismic Hub Identification</h1>
        <Switch>
          <Route path="/" exact component={Upload} />
          <Route path="/visualization" component={Visualization} />
        </Switch>
      </div>
    </Router>
  );
}

export default App;