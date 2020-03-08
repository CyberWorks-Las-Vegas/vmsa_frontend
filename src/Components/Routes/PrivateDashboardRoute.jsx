import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from "../../Context/Context"

// TODO: need to check againist token in cookie

const PrivateDashboardRoute = ({ component: Component, ...rest }) => {

  const context = useContext(UserContext);
  const {
    accessTokens,
    loginApp: {
      current_profile,
      correct
    } } = context;
  console.log({ context }, 'private dashboard route')
  if (correct) {
    return (
      <Route {...rest} render={props => {
        switch (current_profile) {
          case administrator:
            if (accessTokens.administrator_token) {
              return (
                <Component {...props} />
              )
            }
            break;
          case front_desk:
            if (accessTokens.front_desk_token) {
              return (
                <Redirect to={{
                  pathname: '/dashboard_FD',
                  state: { from: props.location }
                }}
                />
              )
            }
            break;
          case visitor_station:
            if (accessTokens.visitor_station_token) {
              return (
                <Redirect to={{
                  pathname: '/dashboard_VS',
                  state: { from: props.location }
                }}
                />
              )
            }
            break;
          default:
            return (
              <Redirect to={{
                pathname: '/appLogin',
                state: { from: props.location }
              }}
              />
            )
            break;
        }
      }} />
    )
  } else {
    return (
      <Redirect to={{
        pathname: '/appLogin',
        state: { from: props.location }
      }}
      />
    )
  }
};

export default PrivateDashboardRoute; 