import React from 'react';
import { Redirect, Route } from 'react-router-dom';

import { withUserConsumer } from "../../Context/Context"



const PrivateFormRoute = ({ component: Component, context, ...rest }) => {
  const {
    isFirstSignin,
    accessTokens: {
      adminToken
    } } = context;

  return (
    <Route {...rest} render={props => (
      (adminToken !== null || undefined) && isFirstSignin ? (
        <Component {...props} context={context} />
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

export default withUserConsumer(PrivateFormRoute); 