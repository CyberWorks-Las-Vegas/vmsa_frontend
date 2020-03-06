import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from "../../Context/Context"



const PrivateFormRoute = ({ component: Component, ...rest }) => {

  const context = useContext(UserContext);
  const {
    isFirstSignin,
    accessTokens: {
      admin_token
    } } = context;

  return (
    <Route {...rest} render={props => (
      (admin_token !== undefined && admin_token !== null) && isFirstSignin ? (
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