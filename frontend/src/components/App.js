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
          <Route path="/upload" component={Upload} />
          <Route path="/visualization" component={Visualization} />
          <Route path="/" exact>
            <h2>Welcome to the Seismic Hub Identification Project</h2>
            <p>Please navigate to upload your seismic data or visualize the results.</p>
          </Route>
        </Switch>
      </div>
    </Router>
  );
}

export default App;