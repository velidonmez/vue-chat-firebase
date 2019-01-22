import firebase from 'firebase/app';
import 'firebase/firestore';

// Initialize Firebase
var config = {
  apiKey: "AIzaSyCJz4avr0RAFll3F7uEsBezl3aARKl4XQg",
  authDomain: "vue-chat-d761d.firebaseapp.com",
  databaseURL: "https://vue-chat-d761d.firebaseio.com",
  projectId: "vue-chat-d761d",
  storageBucket: "vue-chat-d761d.appspot.com",
  messagingSenderId: "1077116031284"
};

const firebaseApp = firebase.initializeApp(config);
//firebaseApp.firestore().settings({timestampsInSnapshots:true});

export default firebaseApp.firestore();