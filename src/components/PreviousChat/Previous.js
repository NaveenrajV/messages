import React from "react";
import { connect } from "react-redux";
import ticked from "../../assets/checked.svg";
import classes from "./Previous.module.css";

const Previous = props => {
  let data, keys, list;

  if (props.data !== "null") {
    data = props.data;
    keys = Object.keys(data);
    list = keys
      .map(key => {
        return <MessageCard key={key} id={key} message={data[key].message} />;
      })
      .filter(elem => elem);
  } else {
    list = (
      <div className={classes.loginMessage}>
        <p>Please login to see conversations.</p>
      </div>
    );
  }
  return <div className={classes.messages}>{list}</div>;
};

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

const mapStateToProps = state => ({
  data: state.data,
  isLogged: state.isLogged
});

export default connect(
  mapStateToProps,
  null
)(Previous);
