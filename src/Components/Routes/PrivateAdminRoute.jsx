import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from "../../Context/Context"



const PrivateAdminRoute = ({ component: Component, ...rest }) => {

  const context = useContext(UserContext);
  const {
    isFirstSignin,
    accessTokens: {
      administrator_token
    } } = context;
  console.log({ context }, 'private admin route')
  return (
    <Route {...rest} render={props => (
      administrator_token !== undefined && administrator_token !== null ? (
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