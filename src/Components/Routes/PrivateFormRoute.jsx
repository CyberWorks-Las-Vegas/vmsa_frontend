import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from "../../Context/Context"



const PrivateFormRoute = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);
  const {
    isFirstSignin,
    accessTokens: {
      adminToken
    } } = context;
  console.log(isFirstSignin, "formroute before return", { Component }, { rest })
  return (
    <Route {...rest} render={props => (
      consol.log('formroute after return', { rest }, { props })
        (adminToken !== null || undefined) && isFirstSignin ? (
          <Component {...props} />
        ) : (
          <Redirect to={{
            pathname: '/',
            state: { from: props.location }
          }}
          />
        )
    )} />
  )
};

export default PrivateFormRoute; 