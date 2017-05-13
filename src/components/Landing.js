import React, { Component } from 'react';
import base from '../base';

// import { Link } from 'react-router-dom';
// import { TweenMax } from 'gsap';

export default class Landing extends Component {
  constructor() {
    super();

    this.provider = new base.auth.FacebookAuthProvider();
  }

  componentWillMount() {
    base.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      let user = result.user;
      this.saveUser(user);
    }).catch(function(error) {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      // The email of the user's account used.
      const email = error.email;
      // The firebase.auth.AuthCredential type that was used.
      const credential = error.credential;
      // ...
    });
  }

  redirect = (e) => {
    e.preventDefault();
    base.auth().signInWithRedirect(this.provider);
  }

  saveUser = (user) => {
    console.log(user);
    const data = {
      name: user.displayName,
      email: user.email,
      photo: user.photoURL
    }

    base.post(`users/${user.uid}`, {
      data: data
    }).then(() => {
      this.props.history.push('/form');
    });
  }

  render() {
    return (
      <div className="App">
        <a className="join" href="#" onClick={(e) => this.redirect(e)}>
          JOIN THE CLUB
        </a>
      </div>
    );
  }
}
