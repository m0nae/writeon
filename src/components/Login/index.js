import React from 'react';

export default function Login() {

  return (
    <>
      <form action="/" method="POST">
        <label for="username">Username</label>
        <input type="text" name="username" />
        <label for="password">Password</label>
        <input type="password" name="password" />
        <input type="submit" value="Login" />
      </form>
    </>
  )
}