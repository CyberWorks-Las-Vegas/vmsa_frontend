import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from "../../Context/Context"



const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);
  const {
    isFirstSignin,
    accessTokens: {
      adminToken
    } } = context;
  console.log(isFirstSignin, "adminroute")
  return (
    <Route {...rest} render={props => (
      adminToken !== null || undefined ? (
        isFirstSignin ? (
          <Redirect to={{
            pathname: '/form',
            state: { from: props.location }
          }}
          />
        ) : (
            <Component {...props} />
          )
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

export default PrivateAdminRoute; 