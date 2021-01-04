import React from 'react';
import { Navbar } from '../Navbar';
import { Posts } from '../Posts';

export function Home() {
  return (
    <Layout>
      <Posts />
    </Layout>
  );
}

export function Users() {
  return <p>This is the users page</p>;
}

function Layout(props) {
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

export function Saved() {
  return <Layout></Layout>;
}
