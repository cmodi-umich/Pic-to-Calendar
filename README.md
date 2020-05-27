# Gcal App

App that allows you to scrape text from images and add events to your google calendar

## Installation

```bash
yarn
expo start
```

Make your own src/constants/Firebase.js file

```javascript
import * as firebase from "firebase";
import "firebase/auth";

// Initialize Firebase
const firebaseConfig = {
  apiKey: "api-key",
  authDomain: "project-id.firebaseapp.com",
  databaseURL: "https://project-id.firebaseio.com",
  projectId: "project-id",
  storageBucket: "project-id.appspot.com",
  messagingSenderId: "sender-id",
  appId: "app-id",
  measurementId: "G-measurement-id",
};

firebase.initializeApp(firebaseConfig);
```
