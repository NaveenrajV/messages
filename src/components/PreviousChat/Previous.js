import React from "react";
import { connect } from "react-redux";
import classes from "./Previous.module.css";
import ticked from "../../assets/checked.svg";
const Previous = props => {
  let data, keys, list;
  if (props.data !== undefined) {
    data = props.data;
    keys = Object.keys(data);
  }
  if (props.isLogged) {
    const loggedUser = "naveen";
    list = keys.map(key => {
      if (data[key][loggedUser] === undefined) return null;
      return <MessageCard id={key} message={data[key][loggedUser].message} />;
    });
  } else {
    list = (
      <div className={classes.loginMessage}>
        <p>Please login to see conversations.</p>
      </div>
    );
  }
  return <div className={classes.messages}>{list}</div>;
};
const mapStateToProps = state => ({
  data: state.data,
  isLogged: state.isLogged
});

const MessageCard = props => {
  return (
    <div className={classes.card}>
      <span className={classes.title}>{props.message}</span>
      <br />
      <span className={classes.tick}>
        <img src={ticked} alt="tick" />
      </span>
      <span className={classes.received}>Received.</span>
      <span className={classes.waiting}>Waiting for an answer</span>
    </div>
  );
};
export default connect(
  mapStateToProps,
  null
)(Previous);
