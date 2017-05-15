import React from 'react';
import Filter from '../Filter';

export default class TextFilter extends React.Component {
  componentDidMount() {
    this.filter = new Filter(this.canvas, {
      filter: 'text',
      text: this.props.text
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
    img.src = photo;

    this.filter.filter(img);
  }

  render() {
    return (
      <canvas ref={(canvas) => this.canvas = canvas}></canvas>
    )
  }
}
