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

  return (
    < Route {...rest} render={props => {
      if (correct) {
        switch (current_profile) {
          case 'administrator':
            return (accessTokens.administrator_token) ?
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
          case 'front_desk':
            return (accessTokens.front_desk_token) ?
              (
                <Redirect to={{
                  pathname: '/dashboard/front_desk',
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

export default PrivateDashboardRoute; 