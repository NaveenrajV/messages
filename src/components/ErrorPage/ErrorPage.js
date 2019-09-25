import React from "react";
import { Link } from "react-router-dom";
import "./ErrorStyle.css";
const ErrorPage = () => {
  return (
    <body>
      <div id="notfound">
        <div className="notfound">
          <div className="notfound-404">
            <h3>Oops! Page not found</h3>
            <h1>
              <span>4</span>
              <span>0</span>
              <span>4</span>
            </h1>
          </div>
          <h2>we are sorry, but the page you requested was not found</h2>
          <div className="GoBack">
            <Link to="/">
              <h3>Go Back</h3>
            </Link>
          </div>
        </div>
      </div>
    </body>
  );
};

export default ErrorPage;
