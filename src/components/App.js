import React, { Component } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { NotificationContainer } from 'react-notifications';
import Amplify from 'aws-amplify';
import auth0 from 'auth0-js';

import './App.css';
import 'react-notifications/lib/notifications.css';

import { StationsProvider } from '../context/stations';
import Main from './Main';
import StationForm from './StationForm';
import {
  getSession,
  getSessionIdToken,
  setSession,
  clearSession
} from '../utils/auth';
import { showError } from '../utils/error';
import aws_exports from '../aws-exports';

Amplify.configure(aws_exports);
Amplify.configure({
  API: {
    graphql_headers: () => ({
      Authorization: getSessionIdToken()
    })
  }
});

class App extends Component {
  state = {
    session: null
  };

  auth0 = null;

  componentDidMount() {
    this.initAuth();
  }

  initAuth() {
    this.auth0 = new auth0.WebAuth({
      domain: 'hupf.eu.auth0.com',
      clientID: 'gv3ZcVE1KxQ40QREC8io0F1fXgn30SAs',
      redirectUri: `${window.location.origin}/callback`,
      // audience: 'https://hupf.eu.auth0.com/userinfo',
      responseType: 'token id_token',
      scope: 'openid'
    });
    if (window.location.pathname === '/callback') {
      this.onAuthRedirect();
    } else {
      const session = getSession();
      this.setState({ session });
    }
  }

  async onAuthRedirect() {
    let authResult;
    try {
      authResult = await this.parseAuthResult();
    } catch (error) {
      return showError('Login failure', error);
    }

    const session = setSession(authResult);
    this.setState({ session });
    window.history.pushState(null, '', '/');
  }

  parseAuthResult() {
    return new Promise((resolve, reject) => {
      this.auth0.parseHash(
        { hash: window.location.hash },
        (error, authResult) => (error ? reject(error) : resolve(authResult))
      );
    });
  }

  login = () => {
    this.auth0.authorize();
  };

  logout = () => {
    // TODO: this.auth0.logout() ?
    clearSession();
    this.setState({ session: null });
  };

  get isAuthenticated() {
    return (
      this.state.session && new Date().getTime() < this.state.session.expiresAt
    );
  }

  render() {
    if (!this.isAuthenticated) {
      return (
        <main className="App">
          <button className="button" onClick={this.login}>
            Login
          </button>
        </main>
      );
    }
    return (
      <>
        <Router>
          <main className="App">
            <StationsProvider>
              <Route exact path="/" component={Main} />
              <Route path="/stations/new" component={StationForm} />
              <Route path="/stations/:stationId/edit" component={StationForm} />
            </StationsProvider>
            <button className="button" onClick={this.logout}>
              Logout
            </button>
          </main>
        </Router>
        <NotificationContainer />
      </>
    );
  }
}

export default App;
