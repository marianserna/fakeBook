import React from 'react';
import Filter from '../Filter';

export default class TextFilter extends React.Component {
  componentDidMount() {
    this.filter = new Filter(this.canvas, {
      filter: 'text',
      text: this.props.text
    });

    const img = new Image();
    img.crossOrigin = "Anonymous";
    img.src = this.props.photo;

    this.filter.filter(img);
  }

  render() {
    return (
      <canvas ref={(canvas) => this.canvas = canvas}></canvas>
    )
  }
}
