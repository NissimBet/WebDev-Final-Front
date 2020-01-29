import React from 'react';
import Head from 'next/head';
import User from '../../components/User';
import { withAuthSync } from '../../utils/Authentication';
import { NextPage } from 'next';

const UserProfile: NextPage = props => {
  const { username, email } = { username: 'nissim', email: 'test' };

  return (
    <React.Fragment>
      <Head>
        <title>{username}</title>
      </Head>
      <p>{email}</p>
      <User />
    </React.Fragment>
  );
};

export default withAuthSync(UserProfile);
