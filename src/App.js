import React, { useState } from "react";
import { connect } from "react-redux";
import {
  BrowserRouter as Router,
  Switch,
  Redirect,
  Route
} from "react-router-dom";
import ProtectedRoute from "./components/HOC/ProtectedRoute";
import ErrorPage from "./components/ErrorPage/ErrorPage";
import Details from "./components/Details/Details";
import Chat from "./components/Chat/Chat";
import Login from "./components/Login/Login";
import Signup from "./components/signup/signup";
import chatIcon from "./assets/chatBubble.svg";
import closeIcon from "./assets/close1.png";
import "./App.css";

function App(props) {
  let [displayChat, setToggle] = useState(false);
  let style;

  if (displayChat) {
    style = {
      opacity: 1,
      transition: "all .2s ease",
      transform: "rotate(-90deg)"
    };
  }

  return (
    <div className="App">
      <Router>
        <Switch>
          <ProtectedRoute
            exact
            path="/"
            redirectTo="/home"
            logged={!props.isLogged}
            component={Login}
          />
          <ProtectedRoute
            path="/signup"
            redirectTo="/home"
            logged={!props.isLogged}
            component={Signup}
          />
          <ProtectedRoute
            path="/home"
            redirectTo="/"
            logged={props.isLogged}
            component={Details}
          />
          <Route path="/error" component={ErrorPage} />
          <Redirect from="*" to="/error" />
        </Switch>
        <Chat show={displayChat} />
        <div className="Icon" onClick={e => setToggle(prevState => !prevState)}>
          {displayChat ? (
            <img
              height="25px"
              width="25px"
              style={{
                ...style
              }}
              src={closeIcon}
              alt="Chat Icon"
            />
          ) : (
            <img src={chatIcon} className="styleAnimate" alt="Chat Icon" />
          )}
        </div>
      </Router>
    </div>
  );
}
const mapStateToProps = state => ({
  isLogged: state.isLogged,
  loginStatus: state.loginStatus
});

export default connect(
  mapStateToProps,
  null
)(App);
