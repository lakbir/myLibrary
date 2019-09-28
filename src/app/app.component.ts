import { Component } from '@angular/core';
import * as firebase from 'firebase';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  constructor() {
    const firebaseConfig = {
      apiKey: 'AIzaSyCCadG25tnRO9PT9S0qx1S2nwojwEaH4W4',
      authDomain: 'mylibrary-69e2c.firebaseapp.com',
      databaseURL: 'https://mylibrary-69e2c.firebaseio.com',
      projectId: 'mylibrary-69e2c',
      storageBucket: 'mylibrary-69e2c.appspot.com',
      messagingSenderId: '701589773038',
      appId: '1:701589773038:web:857888a5a0e8e414bc31ff',
      measurementId: 'G-VTHZ9KCB4C'
    };
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
  }
}
