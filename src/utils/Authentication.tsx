import nextCookie from 'next-cookies';
import cookie from 'js-cookie';
import Router from 'next/router';
import fetch from 'isomorphic-unfetch';
import { NextPageContext, NextPage } from 'next';
import { useEffect } from 'react';

export const auth = (ctx: NextPageContext) => {
  const { token } = nextCookie(ctx);

  // If there's no token, it means the user is not logged in.
  if (!token) {
    redirect(ctx);
  }

  return token;
};
const redirect = (ctx: NextPageContext) => {
  if (typeof window === 'undefined') {
    ctx.res.writeHead(302, { Location: '/login' });
    ctx.res.end();
  } else {
    Router.push('/login');
  }
};

export const logout = () => {
  cookie.remove('token');
  // to support logging out from all windows
  window.localStorage.setItem('logout', Date.now().toString());
  Router.push('/login');
};

export const withAuthSync = (WrappedComponent: NextPage) => {
  const Wrapper: NextPage = props => {
    const syncLogout = (event: StorageEvent) => {
      if (event.key === 'logout') {
        console.log('logged out from storage!');
        Router.push('/login');
      }
    };

    useEffect(() => {
      window.addEventListener('storage', syncLogout);

      return () => {
        window.removeEventListener('storage', syncLogout);
        window.localStorage.removeItem('logout');
      };
    }, []);

    return <WrappedComponent {...props} />;
  };

  Wrapper.getInitialProps = async ctx => {
    const token = auth(ctx);

    if (token) {
      const response = await fetch(`${process.env.BACKEND_URL}users/validate`, {
        credentials: 'include',
        headers: {
          Authorization: 'Bearer ' + token,
        },
      });

      if (response.status !== 200) {
        cookie.remove('token');
        redirect(ctx);
      }
    }

    const componentProps =
      WrappedComponent.getInitialProps &&
      (await WrappedComponent.getInitialProps(ctx));
    return { ...componentProps, token };
  };

  return Wrapper;
};
