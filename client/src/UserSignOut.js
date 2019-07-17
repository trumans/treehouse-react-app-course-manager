import React from 'react';
import { Redirect } from 'react-router-dom';

export default ({ context }) => {
  context.actions.signOut();
  context.authenticatedUser = '';
  return (
    <Redirect to="/" />
  );
}
