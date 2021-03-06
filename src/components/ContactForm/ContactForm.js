import React, { useRef, useEffect, useState } from "react";
import help_scout from "../../assets/helpScout.jpg";
import add_image from "../../assets/Add_Image.png";
import classes from "./ContactForm.module.css";
import { addMsg } from "../../actions/actions";
import { connect } from "react-redux";
import { SENDED } from "../Chat/Chat";

const ContactForm = props => {
  const nameRef = useRef(null);
  /*eslint-disable */
  useEffect(() => {
    if (props.isLogged === true) {
      nameRef.current.focus();
    }
  }, []);
  /*eslint-enable */
  const name = props.name;
  const email = props.email;
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedFiles, addFiles] = useState([]);

  const submitHandler = e => {
    e.preventDefault();
    props.addMessage(name, email, message, subject);
    props.toggle(SENDED);
  };

  const changeHandler = e => {
    const name = e.target.files[0].name;
    addFiles(prevState => prevState.concat(name));
  };

  return props.isLogged === true ? (
    <>
      <form onSubmit={e => submitHandler(e)}>
        <div className={classes.contact_form}>
          <div className={classes.input}>
            <input
              className={classes.text}
              type="text"
              placeholder="Name"
              name="name"
              ref={nameRef}
              value={name}
              readOnly
              required
            />
            <input
              className={classes.text}
              type="text"
              placeholder="Subject"
              name="subject"
              onChange={e => setSubject(e.target.value)}
              required
            />
            <input
              className={classes.text}
              type="email"
              placeholder="Email"
              name="email"
              value={email}
              readOnly
              required
            />
            <div className={classes.message_area}>
              <textarea
                placeholder="How can we help?"
                name="message"
                onChange={e => setMessage(e.target.value)}
                required
              ></textarea>
              <div className={classes.fileInput}>
                {selectedFiles.length !== 0 ? (
                  <div className={classes.selectedFiles}>
                    {selectedFiles.length} files
                  </div>
                ) : (
                  <div></div>
                )}
                <div className={classes.image}>
                  <input
                    type="file"
                    id="file"
                    name="myImage"
                    accept="image/*"
                    onChange={changeHandler}
                  />
                  <label htmlFor="file">
                    <img src={add_image} alt="adds" />
                  </label>
                </div>
              </div>
            </div>
            <div className={classes.message_button}>
              <center>
                <input
                  type="submit"
                  className={classes.input}
                  value="Send a message"
                />
              </center>
            </div>
          </div>
        </div>
      </form>
      <div className={classes.link_button} style={{ marginTop: "10px" }}>
        <a href="/">
          <img
            src={help_scout}
            alt="Help Scout logo"
            title="Powered by Help Scout"
          />
        </a>
      </div>
    </>
  ) : (
    <div className={classes.notLogged}>
      <p>Login to send messages</p>
    </div>
  );
};

const mapDispatchToProps = dispatch => ({
  addMessage: (name, email, message, subject) =>
    dispatch(addMsg(name, email, message, subject))
});
const mapStateToProps = state => ({
  isLogged: state.isLogged,
  email: state.email,
  name: state.name
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ContactForm);
