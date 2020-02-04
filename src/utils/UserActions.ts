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
  if (userJWT.status === 200) {
    const jwt = await userJWT.json();
    cookie.set('token', jwt);
  } else {
    cookie.remove('token');
  }
  /**
   * 200 => ok
   * 409 => email not existant
   * 404 not existant user
   */
  return userJWT.status;
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
  /**
   * 201 => user created
   * 409 => email in use
   */
  if (user.status === 200) {
    return true;
  } else {
    return false;
  }
};
