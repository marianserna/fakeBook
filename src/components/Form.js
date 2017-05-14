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
      title: 'Developer'
    }
  }

  componentWillMount() {
    const id = sessionStorage.getItem('id');

    base.fetch(`users/${id}`, {
      context: this
    }).then(data => {
      this.setState({
        loading: false,
        user: data
      });
    });
  }

  onTitleChange = (e) => {
    this.setState({
      title: e.target.value
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
        <div className="Form">
          <form>
            <div className="input-row">
              <span className="input-wrapper">
                <input className="input-field" type="text" id="name" name="name" defaultValue={this.state.user.name} required ref={(input) => this.name = input}/>
                <label className="input-label" htmlFor="name">Name</label>
              </span>
            </div>

            <div className="input-row">
              <span className="input-wrapper">
                <input className="input-field" type="text" id="description" name="description" required ref={(input) => this.description = input}/>
                <label className="input-label" htmlFor="description">Description</label>
              </span>
            </div>

            <select className="input-row" name="title" onChange={(e) => {this.onTitleChange(e)}}>
              <option value="Designer">Designer</option>
              <option value="Developer">Developer</option>
            </select>

            <div className="input-row">
              <span className="input-wrapper">
                <input className="input-field" type="url" id="linkedin" name="linkedin" required ref={(input) => this.linkedin = input}/>
                <label className="input-label" htmlFor="linkedin">LinkedIn</label>
              </span>
            </div>

            <div className="profile-img">
              <p>Choose a Filter</p>
              <img src={this.state.user.photo} alt="profile image"/>
            </div>

            <div className="filters">
              <CircleFilter photo={this.state.user.photo} />
              <TextFilter photo={this.state.user.photo} text={'Hello!'} />
              <UnaFilter photo={this.state.user.photo} />
              <DesandroFilter photo={this.state.user.photo} />
            </div>

            <button type="submit">Post Profile</button>
          </form>
        </div>
      </div>
    );
  }
}
