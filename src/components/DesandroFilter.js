import React from 'react';
import BreathingHalftone from '../BreathingHalftone';
import photoUrl from '../photoUrl';

export default class DesandroFilter extends React.Component {
  componentDidMount() {
    this.image.crossOrigin = "Anonymous";
    this.filter = new window.BreathingHalftone(this.image, {
      isAdditive: true
    });
  }

  // Changing image
  componentWillReceiveProps(nextProps) {
    if(nextProps.photo !== this.props.photo) {
      // destroy current canvas
      this.filter.destroy();
      // set img source to new image
      this.image.src = nextProps.photo;
      // create new canvas
      this.filter.create();
    }
  }

  render() {
    return (
      <img src={photoUrl(this.props.photo)} alt="image" ref={(image) => this.image = image}/>
    )
  }
}
