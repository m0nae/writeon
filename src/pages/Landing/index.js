import styles from './landing.module.scss';
import writeOnDemo from './writeon-demo.png';
import searchDemo from './writeon-search-demo.gif';
import editorDemo from './writeon-editor-demo.gif';

import React, { useContext, useState, useLayoutEffect } from 'react';
import { Box, IconButton, Spacer, Button } from '@chakra-ui/react';
import { UserContext } from '../../contexts/UserContext';
import { Redirect } from 'react-router-dom';
import { Loading } from '../Loading';
import { Header } from '../../components/Header';

import { HiMenu } from 'react-icons/hi';

import writeOn from '../../components/Header/writeon.svg';

export function Landing() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [toggleMobileMenu, setToggleMobileMenu] = useState(false);
  const { user, loading } = useContext(UserContext);

  function handleScroll() {
    const position = window.pageYOffset;
    setScrollPosition(position);
  }

  useLayoutEffect(() => {
    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [window.pageYOffset]);

  return (
    <>
      {user && <Redirect push to="/dashboard" />}
      {loading ? (
        <Loading />
      ) : (
        <>
          <Header
            classname={
              scrollPosition > 0 || toggleMobileMenu
                ? 'landing-header'
                : 'landing-header-top'
            }
          >
            <Box
              as="a"
              href="http://localhost:3000/"
              className={styles['writeon-logo']}
            >
              <img src={writeOn} className={styles['writeon-landing']} />
            </Box>
            <Spacer className={styles['header-spacer']} />
            <Box>
              <button className={styles['login']}>
                <a href="/login">Login</a>
              </button>
              <button className={styles['signup']} disabled>
                Sign Up
              </button>
              <button
                className={styles['mobile-menu-icon']}
                onClick={() => setToggleMobileMenu(!toggleMobileMenu)}
              >
                <IconButton
                  icon={<HiMenu />}
                  variant="unstyled"
                  aria-label="Mobile menu"
                />
              </button>
            </Box>
          </Header>
          <div
            className={
              toggleMobileMenu
                ? styles['mobile-menu']
                : styles['mobile-menu-hidden']
            }
          >
            <button className={styles['login-mobile']}>Login</button>
            <button className={styles['signup-mobile']} disabled>
              Sign Up
            </button>
          </div>
          <section className={styles['hero']}>
            <div className={styles['container']}>
              <h1 className={styles['header']}>Unleash Your Creativity</h1>
              <h3 className={styles['subtitle']}>
                Or jot down your thoughts. Whatever works for you.
              </h3>
              <div className={styles['hero-img']}>
                <img src={writeOnDemo} alt="WriteOn dashboard" />
              </div>
            </div>
          </section>
          <section className={styles['features']}>
            <div className={styles['features-container']}>
              <Feature
                heading="Seamless Writing Experience"
                description="Format text how you'd like. Insert quotes, links, and create
            headings."
                image={editorDemo}
                imageAlt=""
              />
              <Feature
                heading="Boost Your Creativity"
                description="Set a word count goal, a time limit, or generate random words for inspiration."
                classname={styles['feature-flipped']}
                image="/"
                imageAlt=""
              />
              <Feature
                heading="Instantly Find Notes"
                description="Search through all of your notes. Get results as you type."
                image={searchDemo}
                imageAlt=""
              />
            </div>
          </section>
          <div className={styles['footer']}>
            <span className={styles['footer-left']}>WriteOn.</span>
            <a href="#" className={styles['footer-right']}>
              Made with 💖
            </a>
          </div>
        </>
      )}
    </>
  );
}

function Feature({ classname, heading, description, image, imageAlt }) {
  return (
    <>
      <div className={classname ? classname : styles['feature']}>
        <div
          className={
            classname ? styles['feature-flipped-img'] : styles['feature-img']
          }
        >
          <img src={image} alt={imageAlt} />
        </div>
        <div className={styles['text-container']}>
          <h2 className={styles['feature-heading']}>{heading}</h2>
          <p className={styles['feature-description']}>{description}</p>
        </div>
      </div>
    </>
  );
}
