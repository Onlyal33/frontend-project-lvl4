import { createContext, useContext } from 'react';

const SocketContext = createContext();

export const useSocket = () => useContext(SocketContext);

const SocketProvider = ({ children, socket }) => (
  <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
);

export default SocketProvider;
