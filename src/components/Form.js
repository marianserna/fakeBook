import React from 'react';
import base from '../base';
import CircleFilter from './CircleFilter';
import TextFilter from './TextFilter';
import DesandroFilter from './DesandroFilter';
import UnaFilter from './UnaFilter';

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
        chosenFilter: data.filter,
        title: data.title
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

    base.update(`users/${id}`, {
      data: {
        name: this.name.value,
        description: this.description.value,
        title: this.state.title,
        linkedin: this.linkedin.value,
        filter: this.state.chosenFilter
      }
    }).then(() => {
      this.props.history.push('/grid');
    });
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
      <div>
        <div className="Form" onSubmit={(e) => this.submitProfile(e)}>
          <form>
            <div className="input-row">
              <span className="input-wrapper">
                <label className="input-label" htmlFor="name">Name</label>
                <input className="input-field" type="text" id="name" name="name" defaultValue={this.state.user.name} required ref={(input) => this.name = input}/>
              </span>
            </div>

            <div className="input-row">
              <span className="input-wrapper">
                <label className="input-label" htmlFor="description">Description</label>
                <input className="input-field" type="text" id="description" name="description" defaultValue={this.state.user.description} required ref={(input) => this.description = input}/>
              </span>
            </div>

            <select className="input-row" name="title" onChange={(e) => {this.onTitleChange(e)}}>
              <option value="Designer">Designer</option>
              <option value="Developer">Developer</option>
            </select>

            <div className="input-row">
              <span className="input-wrapper">
                <label className="input-label" htmlFor="linkedin">LinkedIn</label>
                <input className="input-field" type="url" id="linkedin" name="linkedin" defaultValue={this.state.user.linkedin} required ref={(input) => this.linkedin = input}/>
              </span>
            </div>

            <div className="profile-img">
              <img src={this.state.newImage || this.state.user.photo} alt="profile image"/>
            </div>

            <div className="input-row">
              <span className="input-wrapper">
                <input className="input-field" type="file" id="change-img" name="change-img" ref={(input) => this.newImage = input} onChange={(e) => this.changeImage(e)} />
                <label className="input-label" htmlFor="change-img">Change Image</label>
              </span>
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

            <button type="submit">Post Profile</button>
          </form>
        </div>
      </div>
    );
  }
}
