import React from "react";
import { Link } from "react-router-dom";

const isLoaded, timer;

const Loading = () => {
  return (
    <React.Fragement>
      {
        (!isLoaded && timer === 0) ?
          <Link to="/" className="btn-primary">
            Click here if not redirected
          </Link>
          : <img>Insert Loading Image</img>
      }
    </React.Fragement>
  );
};

export default Loading;