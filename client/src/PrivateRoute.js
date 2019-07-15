import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import { Consumer } from './Context';

/*
  PrivateRoute tests if there is a current user
  If so, it renders the component
  If not, it saves the current url (props.location) and redirects to /signin
*/
export default ({ component: Component, ...rest }) => {
  return (
    <Consumer>
      { context => (
        <Route
          {...rest}
          render={props => context.actions.getAuthUser() ? (
              <Component {...props} />
            ) : (
              <Redirect to={{
                pathname: '/signin',
                state: { from: props.location },
              }} />
            )
          }
        />
      )}
    </Consumer>
  );
};
