import React from 'react';
import base from '../base';
import { Link } from 'react-router-dom';

import { TweenMax, Back } from 'gsap';

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
      this.animateTransition();
    });
  }

  animateTransition = () => {
    TweenMax.to(this.imgWithFilter, 1, {opacity: 1, x: '0%', ease: Back.easeOut.config(1.7)});
    TweenMax.to('.info-item', 1, {opacity: 1, y: '0%', delay: 0.5, ease: Back.easeOut.config(1.7)});
  }


  renderFilter = (photo, filter) => {
    if (filter === 'circle') {
      return <CircleFilter photo={photo} />
    }
    if (filter === 'text') {
      return <TextFilter photo={photo} text='hello!' />
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
        <Link className="back-to-grid" to='/grid'>
          GRID
        </Link>

        <div className="imgWithFilter" ref={(div) => this.imgWithFilter = div}>
          {this.renderFilter(user.photo, user.filter)}
        </div>

        <div className="userInfo">
          <div className="info-container">
            <h1 className="info-item">{user.name}</h1>
            <h3 className="info-item">{user.title.toUpperCase()}</h3>
            <p className="info-item">
              {user.description}
            </p>

            <a className="linkedin-profile info-item" href={user.linkedin}>
              SEE LINKEDIN
            </a>
          </div>

        </div>
      </div>
    );
  }
}
