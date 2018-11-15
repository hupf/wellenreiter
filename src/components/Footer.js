import React from 'react';
import { Link } from 'react-router-dom';

import './Footer.css';

function Footer(props) {
  const { infoOnly, showAddStation, showLogout, logout } = props;

  const footerClasses = `Footer ${infoOnly && 'is-info-only'}`;

  const title = infoOnly ? null : (
    <div className="Footer-title">Wellenreiter</div>
  );

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

  const actions = infoOnly ? null : (
    <div className="Footer-actions">
      {addStationLink}
      {logoutLink}
    </div>
  );

  return (
    <footer className={footerClasses}>
      {title}
      <div className="Footer-info">
        © {new Date().getFullYear()} Mathis Hofer –{' '}
        <a href="https://github.com/hupf/wellenreiter">Github</a>
      </div>
      {actions}
    </footer>
  );
}

export default Footer;
