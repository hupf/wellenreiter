import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer(props) {
  const { showAddStation, showLogout, logout } = props;

  const addStationLink = showAddStation ? (
    <Link className="Footer-add button" to="/stations/new">
      Add station
    </Link>
  ) : null;

  const logoutLink = showLogout ? (
    <button className="Footer-logout button is-link" onClick={logout}>
      Logout
    </button>
  ) : null;

  return (
    <footer className="Footer">
      <div className="Footer-title">Wellenreiter</div>
      <div className="Footer-info">
        © {new Date().getFullYear()} Mathis Hofer –{' '}
        <a href="https://github.com/hupf/wellenreiter">Github</a>
      </div>
      <div className="Footer-actions">
        {addStationLink}
        {logoutLink}
      </div>
    </footer>
  );
}

export default Footer;
