import firebase from "../constants/Firebase";
import firebaseApp from "firebase/app";

export function getCurrentUser() {
  return firebaseApp.auth().currentUser;
}

firebase.auth().onAuthStateChanged((user) => {
  if (user != null) {
    console.log("We are authenticated now!");
  }
});
