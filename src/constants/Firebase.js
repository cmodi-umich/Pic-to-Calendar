import * as firebase from "firebase/app";

var firebaseConfig = {
  apiKey: "AIzaSyCpcGGMWmcPPcRZ-hyCV5QDVZ0NmFhmAXg",
  authDomain: "gcal-app-1.firebaseapp.com",
  databaseURL: "https://gcal-app-1.firebaseio.com",
  projectId: "gcal-app-1",
  storageBucket: "gcal-app-1.appspot.com",
  messagingSenderId: "919786003171",
  appId: "1:919786003171:web:ed56e5b0094ea29ebdc3d6",
  measurementId: "G-PNE08WHY2T",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase.app();
