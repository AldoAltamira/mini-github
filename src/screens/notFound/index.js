import React from 'react';
import Base from '../../components/Base';
import logo from '../../assets/logo.svg';

export default function NotFound() {
  let path = window.location.pathname;
  if (path) {
    path = path.substring(1);
  }
  return (
    <Base>
      <div className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          La ruta <strong>{path}</strong> no existe, intente otra
        </p>
      </div>
    </Base>
  );
}
