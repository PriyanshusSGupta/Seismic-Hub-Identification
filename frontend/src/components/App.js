import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Layout from './Layout/Layout';
import UploadCSV from './UploadCSV';
import GraphVisualization from './GraphVisualization';

function App() {
  return (
    <Router>
      <Layout>
        <Switch>
          <Route exact path="/" component={UploadCSV} />
          <Route path="/upload" component={UploadCSV} />
          <Route path="/visualization" component={GraphVisualization} />
        </Switch>
      </Layout>
    </Router>
  );
}

export default App;
