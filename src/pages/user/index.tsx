import React from 'react';
import Head from 'next/head';
import fetch from 'isomorphic-unfetch';
import User from '../../components/User';
import { withAuthSync } from '../../utils/Authentication';
import { NextPage } from 'next';
import nextCookie from 'next-cookies';
import Router from 'next/router';

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

UserProfile.getInitialProps = async ctx => {
  const { token } = nextCookie(ctx);

  const redirectOnError = () => {
    if (typeof window !== 'undefined') {
      Router.push('/login');
    } else {
      ctx.res.writeHead(302, { Location: '/login' });
      ctx.res.end();
    }
  };

  try {
    //const response = await fetch(`${process.env.BACKEND_URL}/users/validate`, {
    const response = await fetch(
      `${process.env.BACKEND_URL}/users/no-email-validate`,
      {
        credentials: 'include',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      }
    );

    if (response.ok || response.status === 200) {
      //return { data: { username: 'test', email: 'test' } };
      return;
    } else {
      redirectOnError();

      return;
    }
  } catch (error) {
    return redirectOnError();
  }
};

export default withAuthSync(UserProfile);
