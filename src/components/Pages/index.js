import React from 'react';
import { Navbar } from '../Navbar';

export function Layout(props) {
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>The Blog.</h1>
        {props.children}
      </div>
    </>
  );
}
