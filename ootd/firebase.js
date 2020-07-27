import app from 'firebase/app';
import React from 'react';
 
const firebaseConfig = {
    apiKey: "AIzaSyCd4XU85lbCCqXHt9EQFkO5KxfJFfFppEo",
    authDomain: "ootd-orbital.firebaseapp.com",
    databaseURL: "https://ootd-orbital.firebaseio.com",
    projectId: "ootd-orbital",
    storageBucket: "ootd-orbital.appspot.com",
    messagingSenderId: "359312066183",
    appId: "1:359312066183:web:52d68cbddb526633f31a22",
    measurementId: "G-94F2LGN1QF"
  };
 
class Firebase {
  constructor() {
    app.initializeApp(config);
  }
}

const FirebaseContext = React.createContext(null);
 
export { FirebaseContext };
export default Firebase;