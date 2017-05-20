import React from 'react';
import base from '../base';
import { Link } from 'react-router-dom';

import { TweenMax, Back } from 'gsap';
import mojs from 'mo-js';
import { Howl } from 'howler';

import CircleFilter from './CircleFilter';
import TextFilter from './TextFilter';
import DesandroFilter from './DesandroFilter';
import UnaFilter from './UnaFilter';

export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: null,

    }
  }

  componentWillMount() {
    const userId = this.props.match.params.uuid;

    base.fetch(`users/${userId}`, {
      context: this
    }).then(user => {
      this.setState({
        user: user
      });
    });

    const plop = new Howl({
      src: ['/plop.mp3'],
      volume: 0.2
    });

    const burst = new mojs.Burst({
      children: {
        fill: '#CC208E'
      }
    });
    burst.setSpeed(0.5).play();
    plop.play();

    setTimeout(() => {
      const burst = new mojs.Burst({
        left: '40%',
        top: '40%',
        children: {
          fill: '#CC208E'
        }
      });
      burst.setSpeed(0.5).play();
      plop.play();
    }, 500);

    setTimeout(() => {
      const burst = new mojs.Burst({
        left: '60%',
        top: '45%',
        children: {
          fill: '#CC208E'
        }
      });
      burst.setSpeed(0.5).play();
      plop.play();
    }, 1000);

    setTimeout(() => {
      TweenMax.to(this.imgWithFilter, 1, {opacity: 1, x: '0%', ease: Back.easeOut.config(1.7)});
      TweenMax.to('.info-item', 1, {opacity: 1, y: '0%', delay: 0.5, ease: Back.easeOut.config(1.7)});
    }, 2000);
  }


  renderFilter = (photo, filter) => {
    if (filter === 'circle') {
      return <CircleFilter photo={photo} />
    }
    if (filter === 'text') {
      return <TextFilter photo={photo} />
    }
    if (filter === 'desandro') {
      return <DesandroFilter photo={photo} />
    }
    if (filter === 'una') {
      return <UnaFilter photo={photo} />
    }
  }

  render() {
    const { user } = this.state;

    if (!this.state.user) {
      return (
        <p>loading</p>
      )
    }

    return (
      <div className="profile">
        <div className="imgWithFilter" ref={(div) => this.imgWithFilter = div}>
          {this.renderFilter(user.photo, user.filter)}
        </div>

        <div className="userInfo">
          <div className="info-container">
            <h1 className="info-item">{user.name}</h1>
            <h3 className="info-item">{user.title}</h3>

            <a className="linkedin-profile info-item" href={user.linkedin}>
              SEE LINKEDIN
            </a>
          </div>

        </div>
      </div>
    );
  }
}
