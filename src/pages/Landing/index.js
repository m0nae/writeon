import styles from './landing.module.scss';

import React, { useContext } from 'react';
import { Box, Spacer, Button } from '@chakra-ui/react';
import { UserContext } from '../../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import { Loading } from '../Loading';
import { Header } from '../../components/Header';

import writeOn from '../../components/Header/writeon.svg';

export function Landing() {
  const { user, loading } = useContext(UserContext);

  return (
    <>
      {user && <Redirect push to="/dashboard" />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header classname="landing-header">
            <Box
              as="a"
              href="http://localhost:3000/"
              className={styles['writeon-logo']}
            >
              <img src={writeOn} className={styles['writeon-landing']} />
            </Box>
            <Spacer />
            <Box>
              <button className={styles['login']}>
                <a href="/login">Login</a>
              </button>
              <button className={styles['signup']}>Sign Up</button>
            </Box>
          </Header>
          <section className={styles['hero']}>
            <div className={styles['container']}>
              <h1 className={styles['header']}>Unleash Your Creativity</h1>
              <h3 className={styles['subtitle']}>
                Or jot down some thoughts. Whatever works for you.
              </h3>
              <div className={styles['hero-img']}></div>
            </div>
          </section>
          <section className={styles['features']}>
            <div className={styles['features-container']}>
              <Feature
                heading="Seamless Writing Experience"
                description="Format text how you'd like. Insert quotes, links, and create
            headings."
              />
              <Feature
                heading="Hello World"
                description="Format text how you'd like. Insert quotes, links, and create
            headings."
                classname={styles['feature-flipped']}
              />
              <Feature
                heading="Instantly Find Notes"
                description="Search through all of your notes. Get results as you type."
              />
            </div>
          </section>
          <div>Footer!</div>
        </>
      )}
    </>
  );
}

function Feature({ classname, heading, description }) {
  return (
    <>
      <div className={classname ? classname : styles['feature']}>
        <div
          className={
            classname ? styles['feature-flipped-img'] : styles['feature-img']
          }
        ></div>
        <div className={styles['text-container']}>
          <h2 className={styles['feature-heading']}>{heading}</h2>
          <p className={styles['feature-description']}>{description}</p>
        </div>
      </div>
    </>
  );
}
