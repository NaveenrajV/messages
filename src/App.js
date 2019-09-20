import React, { useState } from "react";
import Details from "./components/Details/Details";
import Chat from "./components/Chat/Chat";
import chatIcon from "./assets/chatBubble.svg";
import closeIcon from "./assets/close1.png";
import { connect } from "react-redux";
import Login from "./components/Login/Login";
import "./App.css";

function App(props) {
  let [displayChat, setToggle] = useState(false);
  let style;

  const toggleChat = e => {
    setToggle(prevState => !prevState);
  };

  if (displayChat) {
    style = {
      opacity: 1,
      transition: "all .2s ease",
      transform: "rotate(-90deg)"
    };
  }
  return (
    <div className="App">
      {props.isLogged ? <Details /> : <Login />}
      <Chat show={displayChat} />
      <div className="Icon" onClick={e => toggleChat(e)}>
        {displayChat ? (
          <img
            className="closeIcon"
            style={{
              ...style,
              height: "25px",
              width: "25px"
            }}
            src={closeIcon}
            alt="Chat Icon"
          />
        ) : (
          <img src={chatIcon} style={style} alt="Chat Icon" />
        )}
      </div>
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
