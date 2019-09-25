import firebase from "firebase";
import "firebase/auth";
import "firebase/database";
import { takeLatest, put, call } from "redux-saga/effects";
import {
  AUTH_FAIL,
  AUTH_SUCCESS,
  AUTH_VALIDATION,
  REGISTER,
  UPDATE_MESSAGES,
  UPDATE_MESSAGE,
  LOADING,
  STOP_LOADING,
  LOGOUT_INIT
} from "../actions/actions";
import { logout } from "../actions/actionCreators";

async function registration(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export function* register(action) {
  const { password, email, name, history } = action.payload;
  try {
    yield put({ type: LOADING });
    const userData = yield call(registration, email, password);
    const uid = userData.user.uid;
    firebase
      .database()
      .ref(`${uid}`)
      .push({
        name,
        email,
        conversations: []
      });
    firebase.database().ref(`${name}`);
    yield put({ type: STOP_LOADING });
    alert("Registered successfully");
    history.push("/");
  } catch (err) {
    console.log(err);
  }
}

export function* update(action) {
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
  localStorage.setItem("data", JSON.stringify(data));
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
    localStorage.setItem("email", email);
    localStorage.setItem("data", JSON.stringify(data));

    yield put({ data, name, email, type: AUTH_SUCCESS });
  } catch (e) {
    console.log(e);
    yield put({ type: AUTH_FAIL });
  }
}

function* logout_init() {
  localStorage.removeItem("data");
  localStorage.removeItem("isLogged");
  localStorage.removeItem("name");
  localStorage.removeItem("email");
  yield put({ type: LOADING });
  yield put(logout());
  yield put({ type: STOP_LOADING });
}

export default function* rootSaga() {
  yield takeLatest(AUTH_VALIDATION, validateLogin);
  yield takeLatest(UPDATE_MESSAGE, update);
  yield takeLatest(REGISTER, register);
  yield takeLatest(LOGOUT_INIT, logout_init);
}
