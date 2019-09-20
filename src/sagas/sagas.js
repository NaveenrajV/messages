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
  const { password, email } = action.payload;
  firebase
    .auth()
    .createUserWithEmailAndPassword(email, password)
    .then(user => alert("Registered successfully"))
    .catch(err => console.log(err));
}

export function* update(action) {
  let data;
  const user = action.data.name;
  const recentPostsRef = firebase.database().ref("/details");
  firebase
    .database()
    .ref("details")
    .push({
      [user]: {
        email: action.data.email,
        name: user,
        message: action.data.message,
        subject: action.data.subject
      }
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
  let data;
  const { email, password } = action.payload;
  try {
    yield call(authenticateLogin, email, password);
    yield put({ type: LOADING });
    const recentPostsRef = firebase.database().ref("/details");
    yield recentPostsRef.once("value").then(snapshot => {
      data = snapshot.val();
    });
    localStorage.setItem("isLogged", true);
    localStorage.setItem("data", JSON.stringify(data));
    yield put({ data, type: AUTH_SUCCESS });
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
