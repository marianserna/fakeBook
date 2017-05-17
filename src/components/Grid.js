import React from 'react';
import base from '../base';
import CanvasGrid from '../CanvasGrid';

// import { Link } from 'react-router-dom';
import { TweenMax } from 'gsap';

export default class Grid extends React.Component {

  componentDidMount() {
    base.fetch('users', {
      context: this
    }).then((users) => {
      const canvasGrid = new CanvasGrid(this.gridContainer, users, this.redirectToProfile);
    });
  }

  redirectToProfile = (userId) => {
    this.props.history.push(`/grid/${userId}`);
  }

  render() {
    return (
      <div className="grid-container moon" ref={(div) => this.gridContainer = div}></div>
    );
  }
}
