import React, { useContext } from 'react';
import { Redirect, Route } from 'react-router-dom';

import { UserContext } from "../../Context/Context"

// TODO: need to check againist token in cookie

const PrivateFDDashboardRoute = ({ component: Component, ...rest }) => {

  const context = useContext(UserContext);
  const {
    accessTokens,
    loginApp: {
      current_profile,
      correct
    } } = context;
  console.log({ context }, accessTokens, 'private dashboard route')
  return (
    <Route {...rest} render={props => {
      if (correct) {
        switch (current_profile) {
          case 'front_desk':
            return (accessTokens.front_desk_token) ?
              (
                <Component {...props} />
              )
              :
              (
                <Redirect to={{
                  pathname: '/appLogin',
                  state: {
                    from: props.location
                  }
                }}
                />
              )
            break;
          case 'administrator':
            return (accessTokens.administrator_token) ?
              (
                <Redirect to={{
                  pathname: '/dashboard/administrator',
                  state: {
                    from: props.location
                  }
                }}
                />
              )
              :
              (
                <Redirect to={{
                  pathname: '/appLogin',
                  state: {
                    from: props.location
                  }
                }}
                />
              )
            break;
          case 'visitor_station':
            return (accessTokens.visitor_station_token) ?
              (
                <Redirect to={{
                  pathname: '/dashboard/visitor_station',
                  state: {
                    from: props.location
                  }
                }}
                />
              )
              :
              (
                <Redirect to={{
                  pathname: '/appLogin',
                  state: {
                    from: props.location
                  }
                }}
                />
              )
            break;
          default:
            return (
              <Redirect to={{
                pathname: '/appLogin',
                state: {
                  from: props.location
                }
              }}
              />
            )
        }
      } else {
        return (
          <Redirect to={{
            pathname: '/appLogin',
            state: {
              from: props.location
            }
          }}
          />
        )
      }
    }} />
  )
};

export default PrivateFDDashboardRoute; 