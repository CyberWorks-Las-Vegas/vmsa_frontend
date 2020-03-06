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
  console.log({ isFirstSignin }, { adminToken }, 'privateformroute')
  return (
    <Route {...rest} render={props => (
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