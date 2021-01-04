import React from 'react';

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
