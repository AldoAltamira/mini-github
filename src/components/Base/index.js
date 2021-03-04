import React from 'react';
import Menu from '../../components/Menu';

export default function base(props) {
  return (
    <div className="App">
      <Menu loading={props.loading} />
      {props.children}
    </div>
  );
}