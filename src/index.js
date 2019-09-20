import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import App from "./App";
import * as serviceWorker from "./serviceWorker";
import { Provider } from "react-redux";
import store from "./store/store";
import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyAIis6g8s3BLIKw_PPgQcl2GgE57rBqRp0",
  authDomain: "fir-cf42d.firebaseapp.com",
  databaseURL: "https://fir-cf42d.firebaseio.com",
  projectId: "fir-cf42d",
  storageBucket: "",
  messagingSenderId: "637492776841",
  appId: "1:637492776841:web:2b3fcc76d49bb842149b58"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById("root")
);

serviceWorker.unregister();
