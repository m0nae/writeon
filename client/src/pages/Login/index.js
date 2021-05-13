const SERVER_DOMAIN = process.env.SERVER_DOMAIN || `http://localhost:5000`;
import React, { useContext } from 'react';
import styles from './login.module.scss';
import { Box, Center, Input } from '@chakra-ui/react';
import { Redirect } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export function Login() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <Redirect push to="/dashboard" />
      ) : (
        <Center className={styles['wrapper']}>
          <Box m="3rem" className={styles['login']}>
            <div>
              <Center>
                <a href="#" className={styles['write-on']}>
                  WriteOn
                </a>
              </Center>
              <form
                action={`${SERVER_DOMAIN}/api/login`}
                method="POST"
                className={styles['form']}
              >
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  name="username"
                  value="username"
                  mb="3"
                  size="lg"
                />
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
                  value="password"
                  name="password"
                  size="lg"
                />
                <button type="submit" className={styles['login-btn']}>
                  Login
                </button>
                <div className={styles['or']}>
                  <div className={styles['line']}></div>
                  <span>or</span>
                  <div className={styles['line']}></div>
                </div>
                <button className={styles['signup-btn']}>
                  Sign Up (Coming Soon!)
                </button>
              </form>
            </div>
          </Box>
        </Center>
      )}
    </>
  );
}
