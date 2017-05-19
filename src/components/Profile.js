import React from 'react';
import base from '../base';

// import { Link } from 'react-router-dom';
import { TweenMax } from 'gsap';

import CircleFilter from './CircleFilter';
import TextFilter from './TextFilter';
import DesandroFilter from './DesandroFilter';
import UnaFilter from './UnaFilter';

export default class Profile extends React.Component {
  constructor() {
    super();

    this.state = {
      user: false
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
        {this.renderFilter(user.photo, user.filter)}
      </div>
    );
  }
}
