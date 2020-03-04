import React from "react";

const Status = ({ children, title, subtitle }) => {
  return (
    <div className="Loading">
      <h1>{title}</h1>
      <div />
      <p>{subtitle}</p>
      {children}
    </div>
  );
};

export default Status;