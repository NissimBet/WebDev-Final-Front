import cookie from 'js-cookie';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';

interface LoginParams {
  email: string;
  password: string;
}

interface RegisterParams {
  email: string;
  password: string;
  username: string;
}

export const loginUser = async (email: string, password: string) => {
  const userJWT = await fetch(`${process.env.BACKEND_URL}users/login`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password }),
  });
  const jwt = await userJWT.json();

  if (userJWT) {
    cookie.set('token', jwt);
    Router.push('/');
    return jwt;
  } else {
    cookie.remove('token');
    return null;
  }
};

export const registerUser = async ({
  email,
  username,
  password,
}: RegisterParams) => {
  const user = await fetch(`${process.env.BACKEND_URL}users/register`, {
    method: 'POST',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ email, password, username }),
  });
  const userJSON = await user.json();

  Router.push('/login');
  return userJSON;
};
