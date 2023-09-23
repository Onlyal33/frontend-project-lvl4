import {
  ReactNode,
  createContext,
  useCallback,
  useContext,
  useState,
} from 'react';
import { AuthData } from '../types';

const LogOutContext = createContext<AuthData['logOut']>(() => {});
const LogInContext = createContext<AuthData['logIn']>(() => {});
const GetAuthHeaderContext = createContext<AuthData['getAuthHeader']>(
  () => ({}),
);
const UserContext = createContext<AuthData['user']>(null);

export const useLogOut = () => useContext(LogOutContext);
export const useLogIn = () => useContext(LogInContext);
export const useGetAuthHeader = () => useContext(GetAuthHeaderContext);
export const useUser = () => useContext(UserContext);

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const currentUser: Record<string, string> = JSON.parse(
    localStorage.getItem('user') as string,
  );
  const [user, setUser] = useState(currentUser ? currentUser.username : null);

  const getAuthHeader = useCallback(() => {
    const userData: Record<string, string> = JSON.parse(
      localStorage.getItem('user') as string,
    );

    return userData.token !== undefined
      ? { Authorization: `Bearer ${userData.token}` }
      : {};
  }, []);

  const logIn = useCallback((data: Record<string, string>) => {
    localStorage.setItem('user', JSON.stringify(data));
    setUser(data.username);
  }, []);

  const logOut = useCallback(() => {
    localStorage.removeItem('user');
    setUser(null);
  }, []);

  return (
    <UserContext.Provider value={user}>
      <GetAuthHeaderContext.Provider value={getAuthHeader}>
        <LogInContext.Provider value={logIn}>
          <LogOutContext.Provider value={logOut}>
            {children}
          </LogOutContext.Provider>
        </LogInContext.Provider>
      </GetAuthHeaderContext.Provider>
    </UserContext.Provider>
  );
};

export default AuthProvider;
