import React from "react";
import classes from "./Avatars.module.css";
import a1 from "../../assets/user1.jpeg";
import a2 from "../../assets/user2.jpeg";
import a3 from "../../assets/user3.jpeg";
import a4 from "../../assets/user4.jpeg";
import a5 from "../../assets/user5.jpeg";
const Avatars = () => (
  <React.Fragment>
    <div className={classes.header_avatars}>
      <div className={[classes.avatar, classes.avatar1].join(" ")}>
        <img src={a1} alt="avatar" />
      </div>
      <div className={[classes.avatar, classes.avatar2].join(" ")}>
        <img src={a2} alt="avatar" />
      </div>
      <div className={[classes.avatar, classes.avatar3].join(" ")}>
        <img src={a3} alt="avatar" />
      </div>
      <div className={[classes.avatar, classes.avatar4].join(" ")}>
        <img src={a4} alt="avatar" />
      </div>
      <div className={[classes.avatar, classes.avatar5].join(" ")}>
        <img src={a5} alt="avatar" />
      </div>
    </div>
  </React.Fragment>
);
export default Avatars;
