import React from 'react';
import base from '../base';
import CanvasGrid from '../CanvasGrid';

import { TweenMax } from 'gsap';

export default class Grid extends React.Component {
  constructor() {
    super();

    this.state = {
      transitioning: false
    }
  }

  componentDidMount() {
    base.fetch('users', {
      context: this
    }).then((users) => {
      this.canvasGrid = new CanvasGrid(this.gridContainer, users, this.redirectToProfile);
    });
  }

  componentWillUnmount() {
    this.canvasGrid.stopGrid();
  }

  redirectToProfile = (userId) => {
    this.setState({
      transitioning: true
    });

    setTimeout(() => {
      this.props.history.push(`/grid/${userId}`);
    }, 500);
  }

  render() {
    return (
      <div>
        <div className="grid-container moon" ref={(div) => this.gridContainer = div}></div>
        <div className={`transition ${this.state.transitioning ? 'active' : ''} `}></div>
        <p className="grid-legend">Drag in any Direction</p>
      </div>
    );
  }
}
