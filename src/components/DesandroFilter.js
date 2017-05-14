import React from 'react';
import BreathingHalftone from '../BreathingHalftone';

export default class DesandroFilter extends React.Component {
  componentDidMount() {
    this.image.crossOrigin = "Anonymous";
    const filter = new window.BreathingHalftone(this.image, {
      isAdditive: true
    });
  }

  render() {
    return (
      <img src={this.props.photo} alt="image" ref={(image) => this.image = image}/>
    )
  }
}
