import React from 'react';
import base from '../base';
import CircleFilter from './CircleFilter';
import TextFilter from './TextFilter';
import DesandroFilter from './DesandroFilter';
import UnaFilter from './UnaFilter';

// import { Button, Card, Row, Col } from './react-materializecss';

// import { Link } from 'react-router-dom';
import { TweenMax } from 'gsap';

export default class Form extends React.Component {
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
        <div className="profile-image">
          <div className="image-and-filters">
            <div className="profile-img">
              <img className="big-img" src={this.state.newImage || this.state.user.photo} alt="profile image"/>
            </div>

            <div className="row">
              <div className="input-field">
                <label className="input-label" htmlFor="change-img">Choose a file</label>
                <input className="inputfile" type="file" id="change-img" name="change-img" ref={(input) => this.newImage = input} onChange={(e) => this.changeImage(e)} />
              </div>
            </div>

            <div className="filters">
              <p>Choose a Filter</p>

              <div className={`filter ${this.state.chosenFilter === 'circle' ? 'chosen' : ''}`} onClick={(e) => this.changeFilter(e, 'circle')}>
                <CircleFilter photo={this.state.newImage || this.state.user.photo} />
              </div>

              <div className={`filter ${this.state.chosenFilter === 'text' ? 'chosen' : ''}`} onClick={(e) => this.changeFilter(e, 'text')}>
                <TextFilter photo={this.state.newImage || this.state.user.photo} text={'Hello!'} />
              </div>

              <div className={`filter ${this.state.chosenFilter === 'una' ? 'chosen' : ''}`} onClick={(e) => this.changeFilter(e, 'una')}>
                <UnaFilter photo={this.state.newImage || this.state.user.photo} />
              </div>

              <div className={`filter ${this.state.chosenFilter === 'desandro' ? 'chosen' : ''}`} onClick={(e) => this.changeFilter(e, 'desandro')}>
                <DesandroFilter photo={this.state.newImage || this.state.user.photo} />
              </div>
            </div>
          </div>
        </div>

        <div className="form-inner" onSubmit={(e) => this.submitProfile(e)}>
          <form>
            <div className="row">
              <div className="input-field">
                <label className="input-label" htmlFor="name">Name</label>
                <input className="input" type="text" id="name" name="name" defaultValue={this.state.user.name} required ref={(input) => this.name = input}/>
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <label className="input-label" htmlFor="description">Description</label>
                <input className="input" type="text" id="description" name="description" defaultValue={this.state.user.description} required ref={(input) => this.description = input}/>
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <label className="input-label" htmlFor="title">Title</label>
                <select className="input-field" name="title" id="title" onChange={(e) => {this.onTitleChange(e)}} defaultValue={this.state.user.title}>
                  <option value="Designer">Designer</option>
                  <option value="Developer">Developer</option>
                </select>
              </div>
            </div>

            <div className="row">
              <div className="input-field">
                <label className="input-label" htmlFor="linkedin">LinkedIn</label>
                <input className="input" type="url" id="linkedin" name="linkedin" defaultValue={this.state.user.linkedin} required ref={(input) => this.linkedin = input}/>
              </div>
            </div>

            <button type="submit">Post Profile</button>
          </form>
        </div>
      </div>
    );
  }
}
