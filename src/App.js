import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Amplify from 'aws-amplify';

import './App.css';
import { StationsProvider } from './context/stations';
import Main from './Main';
import StationForm from './StationForm';
import aws_exports from './aws-exports';

Amplify.configure(aws_exports);

class App extends Component {
  render() {
    return (
      <Router>
        <main className="App">
          <StationsProvider>
            <Route exact path="/" component={Main} />
            <Route path="/stations/new" component={StationForm} />
            <Route path="/stations/:stationId/edit" component={StationForm} />
          </StationsProvider>
        </main>
      </Router>
    );
  }
}

export default App;
