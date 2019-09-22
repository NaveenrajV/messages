import firebase from "firebase";
import { takeLatest, put, call } from "redux-saga/effects";
import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_VALIDATION,
  REGISTER,
  UPDATE_MESSAGES,
  UPDATE_MESSAGE,
  LOADING
} from "../actions/actions";

export function register(action) {
  const { password, email, name } = action.payload;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(userData => {
      const uid = userData.user.uid;
      firebase
        .database()
        .ref(`${uid}`)
        .push({
          name,
          email,
          conversations: []
        });
      console.log(userData.user);
      console.log(userData.user.uid);
      alert("Registered successfully");
      firebase.database().ref(`${name}`);
      // .push({ empty: "sas" });
    })
    .catch(err => console.log(err));
}

export function* update(action) {
  // console.log(`update /${action.data.name}`);
  let data;
  const { name, email, message, subject } = action.data;
  const uid = firebase.auth().currentUser.uid;
  const recentPostsRef = firebase.database().ref(`/${uid}`);
  firebase
    .database()
    .ref(`${uid}`)
    .push({
      email,
      name,
      message,
      subject
    });

  yield recentPostsRef.once("value").then(snapshot => {
    data = snapshot.val();
  });
  yield put({ data, type: UPDATE_MESSAGES });
}

async function authenticateLogin(email, password) {
  return await firebase.auth().signInWithEmailAndPassword(email, password);
}

function* validateLogin(action) {
  let data, key, name, nameRef;
  const { email, password } = action.payload;
  try {
    yield call(authenticateLogin, email, password);
    yield put({ type: LOADING });
    const uid = firebase.auth().currentUser.uid;
    const recentPostsRef = firebase.database().ref(`/${uid}`);
    yield recentPostsRef.once("value").then(snapshot => {
      data = snapshot.val();
    });
    key = Object.keys(data)[0];
    nameRef = firebase.database().ref(`/${uid}/${key}/name`);
    yield nameRef.once("value").then(snapshot => {
      name = snapshot.val();
    });
    localStorage.setItem("isLogged", true);
    localStorage.setItem("name", name);
    localStorage.setItem("data", JSON.stringify(data));
    yield put({ data, name, type: AUTH_SUCCESS });
  } catch (e) {
    console.log(e);
    yield put({ type: AUTH_FAIL });
  }
}

export default function* rootSaga() {
  yield takeLatest(AUTH_VALIDATION, validateLogin);
  yield takeLatest(UPDATE_MESSAGE, update);
  yield takeLatest(REGISTER, register);
}
