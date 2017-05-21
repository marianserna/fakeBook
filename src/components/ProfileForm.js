import React from 'react';
import base from '../base';

import CircleFilter from './CircleFilter';
import TextFilter from './TextFilter';
import DesandroFilter from './DesandroFilter';
import UnaFilter from './UnaFilter';

import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import { TweenMax, TimelineLite, Elastic } from 'gsap';

export default class ProfileForm extends React.Component {
  constructor() {
    super();

    this.state = {
      loading: true,
      user: null,
      title: 'Developer',
      chosenFilter: 'una',
      newImage: null
    }
  }

  componentWillMount() {
    const id = sessionStorage.getItem('id');

    base.fetch(`users/${id}`, {
      context: this
    }).then(data => {
      this.setState({
        loading: false,
        user: data,
        chosenFilter: data.filter || this.state.chosenFilter,
        title: data.title || this.state.title
      });
      this.animateForm();
    });
  }


  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
    });
  }

  changeFilter = (e, filter) => {
    this.setState({
      chosenFilter: filter
    })
  }

  changeImage = (e) => {
    // Read contents of file (img) stored in user computer using file or blob obj
    const reader = new FileReader();
    // Access the files associated to the input: Tell the reader to go read the file
    reader.readAsDataURL(e.target.files[0]);

    reader.addEventListener('load', () => {
      this.setState({
        newImage: reader.result
      })
    });
  }

  submitProfile = (e) =>{
    e.preventDefault();
    const id = sessionStorage.getItem('id');

    this.updateImage().then((url) => {
      base.update(`users/${id}`, {
        data: {
          name: this.name.value,
          description: this.description.value,
          title: this.state.title,
          linkedin: this.linkedin.value,
          filter: this.state.chosenFilter,
          photo: url
        }
      }).then(() => {
        this.props.history.push('/grid');
      });
    });
  }

  updateImage = () => {
    const id = sessionStorage.getItem('id');

    const promise = new Promise((resolve, reject) => {
      if (!this.state.newImage) {
        return resolve(this.state.user.photo);
      }
      // create a reference to firebase storage
      const storageRef = base.storage().ref();
      // create a reference to the img that will be uploaded
      const imgRef = storageRef.child(`${id}.jpg`);
      // get a ref to the input for the image and access the actual file that the person is trying to upload(files[0])
      imgRef.put(this.newImage.files[0]).then((snapshot) => {
        // to be able to show the image, you need to get its url by calling getDownloadURL (imgUrl refers to the img url in firebase)
        imgRef.getDownloadURL().then((imgUrl) => {
          resolve(imgUrl);
        });
      });
    });
    return promise;
  }

  animateForm = () => {
    TweenMax.from('.image-and-filters', 1, {x: '-200%', delay: 0.3, ease: Elastic.easeOut.config(0.2, 0.3)});
    TweenMax.from('.form-inner', 1, {x: '200%', delay: 0.3, ease: Elastic.easeOut.config(0.2, 0.3)})
  }

  render() {
    if (this.state.loading) {
      return(
        <div>
          <p className="loading">LOADING</p>
        </div>
      )
    }

    return (
      <div className="form-container">
        <div className="image-and-filters">

          <div className="profile-img">
            <img className="big-img" src={this.state.newImage || this.state.user.photo} alt="profile image"/>
          </div>

          <FormGroup>
            <Label htmlFor="change-img" className="change-img-label">
              <img src="upload.svg" className="upload-grey" alt="upload icon"/>
              <img src="upload-white.svg" className="upload-white" alt="upload icon"/>
              Upload Image
            </Label>
            <Input type="file" id="change-img" name="change-img" getRef={(input) => this.newImage = input} onChange={(e) => this.changeImage(e)} />
          </FormGroup>

          <div className="filters">
            <p>Choose a Filter</p>

            <div className={`filter ${this.state.chosenFilter === 'circle' ? 'chosen' : ''}`} onClick={(e) => this.changeFilter(e, 'circle')}>
              <img src="check.svg" className="check-icon" alt="chosen filter"/>
              <CircleFilter photo={this.state.newImage || this.state.user.photo} />
            </div>

            <div className={`filter ${this.state.chosenFilter === 'text' ? 'chosen' : ''}`} onClick={(e) => this.changeFilter(e, 'text')}>
              <img src="check.svg" className="check-icon" alt="chosen filter"/>
              <TextFilter photo={this.state.newImage || this.state.user.photo} text={'Hello!'} />
            </div>

            <div className={`filter ${this.state.chosenFilter === 'una' ? 'chosen' : ''}`} onClick={(e) => this.changeFilter(e, 'una')}>
              <img src="check.svg" className="check-icon" alt="chosen filter"/>
              <UnaFilter photo={this.state.newImage || this.state.user.photo} />
            </div>

            <div className={`filter ${this.state.chosenFilter === 'desandro' ? 'chosen' : ''}`} onClick={(e) => this.changeFilter(e, 'desandro')}>
              <img src="check.svg" className="check-icon" alt="chosen filter"/>
              <DesandroFilter photo={this.state.newImage || this.state.user.photo} />
            </div>
          </div>
        </div>

        <div className="form-inner" onSubmit={(e) => this.submitProfile(e)}>
          <Form>
            <FormGroup>
              <Label htmlFor="name">Name</Label>
              <Input type="text" id="name" name="name" defaultValue={this.state.user.name} required getRef={(input) => this.name = input}/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="description">Description</Label>
              <Input type="text" id="description" name="description" defaultValue={this.state.user.description} required getRef={(input) => this.description = input}/>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="title">Title</Label>
              <Input type="select" name="title" id="title" onChange={(e) => {this.onTitleChange(e)}} defaultValue={this.state.user.title}>
                <option value="Designer">Designer</option>
                <option value="Developer">Developer</option>
              </Input>
            </FormGroup>

            <FormGroup>
              <Label htmlFor="linkedin">LinkedIn</Label>
              <Input type="url" id="linkedin" name="linkedin" defaultValue={this.state.user.linkedin} required getRef={(input) => this.linkedin = input}/>
            </FormGroup>

            <div className="button-container">
              <Button>Post Profile</Button>
            </div>

          </Form>
        </div>
      </div>
    );
  }
}
