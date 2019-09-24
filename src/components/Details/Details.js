import React, { useEffect } from "react";
import Detail from "../Detail/Detail";
import Login from "../Login/Login";
import firebase from "firebase";
import { connect } from "react-redux";
import { logout } from "../../actions/actions";
import classes from "./Details.module.css";
import "./Table.module.css";
import noData from "../../assets/noData.jpg";

const Details = props => {
  let data,
    keys,
    list = [];

  /*eslint-disable */
  useEffect(() => {
    firebase.auth().onAuthStateChanged(user => {
      if (!user) {
        localStorage.removeItem("data");
        localStorage.removeItem("isLogged");
        props.logout();
      }
    });
  }, []);
  /*eslint-enable */

  if (props.data !== "null") {
    data = props.data;
    keys = Object.keys(data);
    list = keys
      .map(key => {
        return (
          <Detail
            key={key}
            id={key}
            name={data[key].name}
            message={data[key].message}
            subject={data[key].subject}
            email={data[key].email}
          />
        );
      })
      .filter(elem => elem);
    list.splice(0, 1);
  }

  return (
    <div className={classes.Details}>
      <div className={classes.title}>
        <div className={classes.welcome}>
          Welcome <span>{props.name}</span>
        </div>
        <div
          className={classes.logout}
          onClick={() => firebase.auth().signOut()}
        >
          <p> LOGOUT</p>
        </div>
      </div>
      {props.isLogged ? (
        list.length !== 0 ? (
          <div className={classes.table}>
            <center>
              <h2>Records</h2>
            </center>
            <center>
              <table className={classes.table}>
                <thead>
                  <tr key={Date.now()}>
                    <th key="name">Name</th>
                    <th key="email">Email</th>
                    <th key="subject">Subject</th>
                    <th key="message">Message</th>
                  </tr>
                </thead>
                <tbody>{list}</tbody>
              </table>
            </center>
          </div>
        ) : (
          <div className={classes.noData}>
            <div className={classes.content}>
              <img src={noData} alt="no data found" />
              <br />
              No data to display. <br />
              Send message to see data
            </div>
          </div>
        )
      ) : (
        <Login />
      )}
    </div>
  );
};
const mapStateToProps = state => ({
  loading: state.loading,
  isLogged: state.isLogged || localStorage.getItem("isLogged"),
  data: state.data || localStorage.getItem("data"),
  name: state.name || localStorage.getItem("name")
});
const mapDispatchToProps = dispatch => ({
  logout: () => dispatch(logout())
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Details);
