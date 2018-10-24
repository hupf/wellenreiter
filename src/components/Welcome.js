import React from 'react';

import './Welcome.css';

function Welcome(props) {
  const { login } = props;
  return (
    <main className="Welcome">
      <div className="Welcome-container">
        <h1 className="Welcome-title">Wellenreiter</h1>
        <h2 className="Welcome-subtitle">Radio Streaming Web Application</h2>
        <button className="button is-primary Welcome-login" onClick={login}>
          Login
        </button>
      </div>
    </main>
  );
}

export default Welcome;
