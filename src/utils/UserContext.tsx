import React, { useContext, useReducer, useEffect } from 'react';
import useLocalStorage from 'react-use/lib/useLocalStorage';

const LoggedIn = React.createContext<
  [LoginState, React.Dispatch<LoginAction> | undefined]
>(undefined);
const { Provider } = LoggedIn;
const localStorageId = 'localStorageUserId';

export const useLoginContext = () => {
  const [state, dispatch] = useContext(LoggedIn);
  const [userIdLocalStorage, setUserIdLocalStorage] = useLocalStorage(
    localStorageId,
    0
  );
  const { userId } = state;

  const logout = () => {
    dispatch({ type: LoginActionTypes.Logout });
  };

  // login user with email / password and on success, return token
  const loginUser = (userId: number) => {
    dispatch({ type: LoginActionTypes.Login, payload: { userId } });
  };

  useEffect(() => {
    if (userId === userIdLocalStorage) return;

    setUserIdLocalStorage(userId);
  }, [userId]);

  return {
    login: loginUser,
    logout: logout,
    userId: userIdLocalStorage,
  };
};

interface LoginState {
  userId: number;
}

interface LoginContextProps {
  children: React.ReactChildren;
}

interface LoginAction {
  type: LoginActionTypes;
  payload?: LoginState;
}

enum LoginActionTypes {
  Login,
  Logout,
}

function reducer(state: LoginState, action: LoginAction): LoginState {
  switch (action.type) {
    case LoginActionTypes.Login:
      const {
        payload: { userId },
      } = action;
      return { ...state, userId };
    case LoginActionTypes.Logout:
      return { userId: 0 };
  }
}

function LoginContext({ children }: LoginContextProps) {
  const [state, dispatch] = useReducer(reducer, {
    userId: 0,
  });

  return <Provider value={[state, dispatch]}>{children}</Provider>;
}

export default LoginContext;
