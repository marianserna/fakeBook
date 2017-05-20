import React from 'react';

import { TweenMax, TimelineLite, Back, Power1 } from 'gsap';

export default class Logo extends React.Component {

  componentDidMount() {
    this.animateLogo();
  }

  animateLogo = () => {
    setTimeout(() => {
      const tl = new TimelineLite();
      tl.
      staggerTo('.cls-1', 1, {opacity: 1, ease: Back.easeOut.config(1.7)}, 0.1).
      to('.cls-2', 1, {opacity: 1, ease:Power1.easeInOut}, "-=0.5").
      play();
    }, 2000);
  }

  render() {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 234.99 133.2">
        <defs>
          <style></style>
        </defs>

        <title>logo3</title><g id="Layer_2" data-name="Layer 2"><g id="Layer_1-2" data-name="Layer 1">

          <path className="cls-1" d="M70.56,27.9h-.81l.36-2.43a19.54,19.54,0,0,0,.18-3.24c0-10.08-6.75-21-18.9-21H46.62L39.33,32.94h3.51C49.32,33,57,28.17,59,19.8l.36-1.44h1.17L53.1,50.85H51.93l.45-2.07A18.06,18.06,0,0,0,52.83,45c0-6.3-4-10.62-10.08-10.62H39L32.13,64.17a14,14,0,0,0-.45,3c0,2.43,1.26,3.69,4,3.69H39L38.7,72H0l.27-1.17H4.14c3.87,0,6.39-1.08,7.65-6.66l13-56.79a14,14,0,0,0,.45-3c0-2.43-1.35-3.15-4.23-3.15h-4L17.37.09H76.95Z"/>

          <path className="cls-1" d="M123.3,61.2C121.86,65.52,116.46,73,106.92,73c-5,0-10.26-2.52-10.26-9.18A17.17,17.17,0,0,1,97,59.67c-3.24,7.92-6.84,13.59-16.74,13.59-7.2,0-13.95-4.86-13.95-15.57,0-17.73,16.74-34.92,29.16-34.92,5.13,0,8.19,1.53,9.63,5.31l1.53-4.86h19.17l-9.9,37.89a17.89,17.89,0,0,0-.72,4.5c0,1.44.72,2.25,1.44,2.25,2,0,4.86-4.23,5.85-7ZM99.81,24.75c-7.83,0-15.66,27.63-15.66,37,0,4.86,1.8,6.84,4.32,6.84,6.39,0,15.48-29.88,15.48-37.17C103.95,27.9,102.33,24.75,99.81,24.75Z"/>

          <path className="cls-1" d="M140.85,6.48a8.64,8.64,0,0,0,.27-2c0-2.16-1.17-3.33-3.6-3.33h-1.89V0h23.13c1.44,0,2.07,0,2.07.63a1.76,1.76,0,0,1-.09.63L150.48,44.82h1c8.1,0,9.9-21.42,22.68-21.42,6.12,0,9.45,4.86,9.45,9.81,0,4.41-2.7,8.64-8.37,8.64-4.77,0-8.37-3.42-8.37-7.92a7.76,7.76,0,0,1,8-7.56,24,24,0,0,1,4.59.72c-1.08-1.8-3-2.61-5.58-2.61-10.26,0-13.14,17.64-19.44,20.34,1.17-.09,2.43-.18,3.6-.18,8.73,0,16,3.24,16,9.45,0,5.85-2.88,10.26-2.88,13.77A2,2,0,0,0,173,70c2.16,0,5.67-4.5,6-8.55l1,.18c-1.44,8.1-6.48,11.43-17,11.43-6.66,0-9.81-2.61-9.81-7.29,0-5.22,3.6-11.88,3.6-16.11,0-3.24-2.52-3.6-6.48-3.87L144.18,72H125.55Z"/>

          <path className="cls-1" d="M203.76,58.14c0,9.18,2.61,13.14,6.39,13.14,6.48,0,15.66-6.57,20.16-14.76l1,.63c-6.12,10.26-14.76,16-25.74,16s-20.61-6.66-20.61-19.62c0-18.45,19.26-31.14,36.36-31.14,9.63,0,13.68,5.22,13.68,11.07,0,10.71-19.17,16.2-30.87,18.09C203.94,54,203.76,56.25,203.76,58.14Zm16.29-34c-5.76,0-14.22,12.87-15.84,25.56a3.2,3.2,0,0,0,.9.18c5.94,0,18.72-3.06,18.72-19.62C223.83,26.28,222.3,24.12,220,24.12Z"/>

          <path className="cls-2" d="M116.54,132.7c-9.5,0-12-4.55-12-9.85a11.68,11.68,0,0,1,.45-2.9l6.2-24.25a3.59,3.59,0,0,0,.1-1,1.84,1.84,0,0,0-2-2.05h-1.1V92H121c.8,0,1.15,0,1.15.35a1,1,0,0,1,0,.35l-4,16.5c2.65-4.2,5.4-4.75,8.55-4.75a8.7,8.7,0,0,1,8.65,8.85C135.29,124.3,126.94,132.7,116.54,132.7Zm7-27.05c-2.25,0-5.45,3.35-6.7,9l-2.65,11.85a12.37,12.37,0,0,0-.35,2.9c0,1.5.55,2.65,1.9,2.65,5.85,0,9.85-16.75,9.85-22.5C125.54,106.95,124.89,105.65,123.49,105.65Z"/>

          <path className="cls-2" d="M149,132.95c-7.15,0-11.5-4.85-11.5-11.3,0-9.35,9-17.65,18.2-17.65,7.1,0,11.45,4.85,11.45,11.3a14.13,14.13,0,0,1-.35,3.15C164.94,126.45,157.24,132.95,149,132.95Zm9.05-25.4c0-2-.7-3-2.4-3-3,0-4.2,2.65-6.85,14.05-1.25,5.45-1.9,8.9-1.9,10.9,0,2.35.85,2.8,2.3,2.8,2.8,0,4.1-2.45,6.65-13.55C157,113.65,158,109.85,158,107.55Z"/>

          <path className="cls-2" d="M180.34,132.95c-7.15,0-11.5-4.85-11.5-11.3,0-9.35,9-17.65,18.2-17.65,7.1,0,11.45,4.85,11.45,11.3a14.13,14.13,0,0,1-.35,3.15C196.29,126.45,188.59,132.95,180.34,132.95Zm9.05-25.4c0-2-.7-3-2.4-3-3,0-4.2,2.65-6.85,14.05-1.25,5.45-1.9,8.9-1.9,10.9,0,2.35.85,2.8,2.3,2.8,2.8,0,4.1-2.45,6.65-13.55C188.39,113.65,189.39,109.85,189.39,107.55Z"/>

          <path className="cls-2" d="M207.69,95.59a4.79,4.79,0,0,0,.15-1.1c0-1.2-.65-1.85-2-1.85h-1V92h12.85c.8,0,1.15,0,1.15.35a1,1,0,0,1-.05.35L213,116.9h.55c4.5,0,5.5-11.9,12.6-11.9a5.19,5.19,0,0,1,5.25,5.45,4.49,4.49,0,0,1-4.65,4.8,4.44,4.44,0,0,1-4.65-4.4,4.31,4.31,0,0,1,4.45-4.2,13.38,13.38,0,0,1,2.55.4,3.31,3.31,0,0,0-3.1-1.45c-5.7,0-7.3,9.8-10.8,11.3.65,0,1.35-.1,2-.1,4.85,0,8.9,1.8,8.9,5.25,0,3.25-1.6,5.7-1.6,7.65a1.09,1.09,0,0,0,1,1.2c1.2,0,3.15-2.5,3.35-4.75l.55.1c-.8,4.5-3.6,6.35-9.45,6.35-3.7,0-5.45-1.45-5.45-4,0-2.9,2-6.6,2-9,0-1.8-1.4-2-3.6-2.15L209.54,132H199.19Z"/>
          </g></g>
      </svg>
    );
  }
}
