import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from "../../Context/Context"



const PrivateAdminRoute = ({ component: Component, ...rest }) => {
  const context = useContext(UserContext);
  const {
    isFirstSignin,
    accessTokens: {
      admin_token
    } } = context;
  console.log({ isFirstSignin }, { admin_token }, "adminroute")
  return (
    <Route {...rest} render={props => (
      admin_token !== undefined && admin_token !== null ? (
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