import React, { Component } from 'react';
import base from '../base';
import { Link } from 'react-router-dom';

import Logo from './Logo';

import { TweenMax, Back } from 'gsap';
import mojs from 'mo-js';
import { Howl } from 'howler';

export default class Landing extends Component {
  constructor() {
    super();

    this.provider = new base.auth.FacebookAuthProvider();

    this.plop = new Howl({
      src: ['/plop.mp3'],
      volume: 0.2
    });
  }

  componentWillMount() {
    this.handleFbResponse();
  }

  componentDidMount() {
    this.bursting();
    this.animateLanding();
  }

  redirectToFb = (e) => {
    e.preventDefault();
    base.auth().signInWithRedirect(this.provider);
  }

  handleFbResponse = () => {
    base.auth().getRedirectResult().then((result) => {
      if (result.credential) {
        // This gives you a Facebook Access Token. You can use it to access the Facebook API.
        const token = result.credential.accessToken;
        // ...
      }
      // The signed-in user info.
      let user = result.user;
      if (user) {
        this.login(user);
      }
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

  login = (user) => {
    sessionStorage.setItem('id', user.uid);

    // Check if user exists
    base.fetch(`users/${user.uid}`, {
      context: this
    }).then(data => {
      if (Object.keys(data).length === 0) {
        this.saveUser(user);
      } else {
        this.redirectToForm();
      }
    }).catch(error => {
      console.log(error);
    });
  }

  uploadPhotoFromUrl = (photoUrl, uid) => {
    const promise = new Promise((resolve, reject) => {
      // Use that photo url to get the raw img data (downloading img data)
      fetch(photoUrl).then((response) => {
        // blob = raw image data
        return response.blob();
      }).then((imgBlob) => {
        // create a reference to firebase storage
        const storageRef = base.storage().ref();
        // create a reference to the img that will be uploaded
        const imgRef = storageRef.child(`${uid}.jpg`);
        // upload the blob to the storage
        imgRef.put(imgBlob).then((snapshot) => {
          // to be able to show the image, you need to get its url by calling getDownloadURL (imgUrl refers to the img url in firebase)
          imgRef.getDownloadURL().then((imgUrl) => {
            resolve(imgUrl);
          });
        });
      });
    });
    return promise;
  }

  saveUser = (user) => {
    // Place img url coming from Facebook (other uid comes from firebase) in a variable
    const photoUrl = `https://graph.facebook.com/${user.providerData[0].uid}/picture?width=500`;

    this.uploadPhotoFromUrl(photoUrl, user.uid).then((imgUrl) => {
      // save the user data
      const data = {
        name: user.displayName,
        email: user.email,
        photo: imgUrl
      }

      // save the user to firebase
      base.post(`users/${user.uid}`, {
        data: data
      }).then(() => {
        // once its done saving, redirect user to form
        this.redirectToForm();
      });
    });
  }

  applySound = () => {

  }

  bursting = () => {
    const burst = new mojs.Burst({
      children: {
        fill: '#CC208E'
      }
    });
    burst.setSpeed(0.5).play();
    this.plop.play();

    setTimeout(() => {
      const burst = new mojs.Burst({
        left: '40%',
        top: '40%',
        children: {
          fill: '#CC208E'
        }
      });
      burst.setSpeed(0.5).play();
      this.plop.play();
    }, 500);

    setTimeout(() => {
      const burst = new mojs.Burst({
        left: '60%',
        top: '45%',
        children: {
          fill: '#CC208E'
        }
      });
      burst.setSpeed(0.5).play();
      this.plop.play();
    }, 1000);
  }

  animateLanding = () => {
    setTimeout(() => {
      TweenMax.to('.links', 1, {opacity: 1, delay: 1, ease: Back.easeOut.config(1.7)});
      TweenMax.to('.legend', 1, {opacity: 1, delay: 1.3, ease: Back.easeOut.config(1.7)});
    }, 2500);
  }

  redirectToForm = () => {
    this.props.history.push('/form');
  }

  render() {
    return (
      <div className="landing">

        <div className="fakebook">
          <Logo />
        </div>

        <div className="links">
          <a className="join" href="#" onClick={(e) => this.redirectToFb(e)}>
            JOIN THE CLUB
          </a>

          <Link className="enter" to='/grid'>
            ENTER EXPERIENCE
          </Link>
        </div>

        <div className="legend">
          <p>
            A shameless copycat of <a href="http://youngcreatives.heed.agency/" target="_blank">Young Creatives</a> by <a href="http://heed.agency/" target="_blank">heed</a> ⤐ One · Is · Curious 😅
          </p>
          <p className="smaller-text">Exploring how to build an infinite image grid in canvas</p>
        </div>
      </div>
    );
  }
}
