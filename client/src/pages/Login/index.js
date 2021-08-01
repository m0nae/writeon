import config from '../../config';
import React, { useContext } from 'react';
import styles from './login.module.scss';
import { Box, Center, Input } from '@chakra-ui/react';
import { Redirect, Link } from 'react-router-dom';
import { UserContext } from '../../contexts/UserContext';

export function Login() {
  const { user } = useContext(UserContext);

  return (
    <>
      {user ? (
        <Redirect push to="/dashboard" />
      ) : (
        <Center className={styles['wrapper']}>
          <Box className={styles['login']}>
            <div>
              <Center>
                <a href="#" className={styles['write-on']}>
                  WriteOn
                </a>
              </Center>
              <form
                action={config.LOGIN}
                method="POST"
                className={styles['form']}
              >
                <label htmlFor="username">Username</label>
                <Input
                  type="text"
                  name="username"
                  mb="3"
                  size="lg"
                />
                <label htmlFor="password">Password</label>
                <Input
                  type="password"
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
                  <Link to="/signup">Sign Up</Link>
                </button>
              </form>
            </div>
          </Box>
        </Center>
      )}
    </>
  );
}
