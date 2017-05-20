import React from 'react';
import Filter from '../Filter';
import photoUrl from '../photoUrl';

export default class CircleFilter extends React.Component {
  componentDidMount() {
    this.filter = new Filter(this.canvas, {
      filter: 'circle'
    });

    this.filterPhoto(this.props.photo);
  }

  componentWillReceiveProps(nextProps) {
    if(nextProps.photo !== this.props.photo) {
      this.filterPhoto(nextProps.photo);
    }
  }

  filterPhoto(photo) {
    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = photoUrl(photo);

    this.filter.filter(img);
  }

  render() {
    return (
      <canvas ref={(canvas) => this.canvas = canvas}></canvas>
    )
  }
}
