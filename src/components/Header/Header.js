"use client";
import React, { useState } from 'react';
import clsx from 'clsx';
import { Rss, Sun, Moon } from 'react-feather';

import Logo from '@/components/Logo';
import VisuallyHidden from '@/components/VisuallyHidden';
import { LIGHT_TOKENS, DARK_TOKENS } from '@/constants';

import styles from './Header.module.css';
import jsCookie from 'js-cookie';

function Header({ initTheme, className, ...delegated }) {
  const [theme, setTheme] = useState(initTheme);

  function switchTheme() {
    const nextTheme = theme === 'light' ? 'dark' : 'light';
    const nextColors = nextTheme === 'light' ? LIGHT_TOKENS : DARK_TOKENS; 
    setTheme(nextTheme);
    jsCookie.set('theme', nextTheme);

    const root = document.documentElement;
    root.setAttribute('data-color-theme', nextTheme);
    Object.entries(nextColors).forEach(([key, value]) => {
      root.style.setProperty(key, value);
    });
  }

  return (
    <header
      className={clsx(styles.wrapper, className)}
      {...delegated}
    >
      <Logo />

      <div className={styles.actions}>
        <button className={styles.action}>
          <Rss
            size="1.5rem"
            style={{
              // Optical alignment
              transform: 'translate(2px, -2px)',
            }}
          />
          <VisuallyHidden>
            View RSS feed
          </VisuallyHidden>
        </button>
        <button className={styles.action} onClick={switchTheme} >
          {theme === 'light' ?<Sun size="1.5rem" /> : <Moon size="1.5rem"/>}
          <VisuallyHidden>
            Toggle dark / light mode
          </VisuallyHidden>
        </button>
      </div>
    </header>
  );
}

export default Header;
