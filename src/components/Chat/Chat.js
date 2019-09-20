import React, { useState } from "react";
import Avatars from "../Avatars/Avatars";
import ContactForm from "../ContactForm/ContactForm";
import Previous from "../PreviousChat/Previous";
import classes from "./Chat.module.css";
import back_arrow from "../../assets/left-arrow.svg";
import help_scout from "../../assets/helpScout.jpg";
import plane from "../../assets/plane1.svg";

const FORM = "FORM",
  EMAIL = "EMAIL",
  SENDED = "SENDED",
  PREVIOUS = "PREVIOUS";

const Chat = props => {
  const [activePage, setActivePage] = useState(EMAIL);
  let header, body, headerStyle;
  const setPage = page => {
    setActivePage(page);
  };

  const chatStyle = props.show
    ? { opacity: "1" }
    : { opacity: "0", visibility: "hidden" };

  switch (activePage) {
    case FORM:
      header = <HeaderForm sended={false} toggle={setPage} />;
      body = <ContactForm toggle={setPage} />;
      break;
    case EMAIL:
      header = <HeaderEmail />;
      body = <EmailCard toggle={setPage} />;
      break;
    case SENDED:
      header = <HeaderForm sended={true} toggle={setPage} />;
      body = <MessageSended toggle={setPage} />;
      headerStyle = { paddingBottom: 0 };
      break;
    case PREVIOUS:
      header = <PreviousHeader toggle={setPage} />;
      body = <Previous />;
      headerStyle = { paddingBottom: 0, height: "40px" };
      break;
    default:
      return null;
  }

  return (
    <div style={chatStyle} className={classes.container}>
      <div className={classes.header} style={headerStyle}>
        {header}
      </div>
      {body}
    </div>
  );
};

const HeaderEmail = () => (
  <>
    <div className={classes.header_nav}>
      <span className={classes.title}>
        <p>Start a conversation</p>
      </span>
    </div>
    <Avatars />
    <div className={classes.header_content}>
      <span>What channel do you prefer?</span>
    </div>
  </>
);

const HeaderForm = props => (
  <>
    <div className={classes.header_nav}>
      <span className={classes.back_arrow}>
        <img
          src={back_arrow}
          alt="back_arrow"
          onClick={() => props.toggle(EMAIL)}
        />
      </span>
      <span className={classes.title}>
        {props.sended ? <p>Start a conversation</p> : <p>Send a message</p>}
      </span>
    </div>
    <Avatars />
    <div className={classes.header_content}>
      <span className={classes.content_1}>
        {!props.sended ? "How can we help?" : "Start a conversation"}
      </span>
      <span className={classes.content_2}>
        We usually respond in a few hours
      </span>
    </div>
  </>
);

const EmailCard = props => (
  <>
    <div className={classes.email_card} onClick={() => props.toggle(FORM)}>
      <img src={plane} alt="Plane " />
      <div className={classes.email_content}>
        <div className={classes.heading}>Email</div>

        <div className={classes.sub_heading}>
          No time to wait around? We usually respond within a few hours
        </div>
      </div>
    </div>
    <div className={classes.link_button} style={{ marginTop: "55%" }}>
      <a href="/">
        <img src={help_scout} alt="Help Scout" title="Powered by Help Scout" />
      </a>
    </div>
  </>
);

const MessageSended = props => (
  <>
    <div className={classes.circle}></div>
    <div className={classes.AfterSend}>
      <span>We’re on it!</span>
      <p>
        You’ll receive an email reply within a few hours. You can view and
        update your message in
        <span
          className={classes.previous}
          onClick={() => props.toggle(PREVIOUS)}
        >
          Previous Conversations.
        </span>
      </p>
    </div>
    <div className={classes.link_button} style={{ marginTop: 0 }}>
      <a href="/">
        <img src={help_scout} alt="Help Scout" title="Powered by Help Scout" />
      </a>
    </div>
  </>
);

const PreviousHeader = props => (
  <div className={classes.header_nav} style={{ height: "40px" }}>
    <span className={classes.back_arrow}>
      <img
        src={back_arrow}
        alt="back_arrow"
        onClick={() => props.toggle(SENDED)}
      />
    </span>
    <div className={classes.previousHeader}>
      <p>Previous</p>
    </div>
  </div>
);

export { SENDED };
export default Chat;
