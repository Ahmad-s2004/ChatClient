import React, { createContext, useContext, useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext();

export const useSocket = () => {
  return useContext(SocketContext);
};

export const SocketProvider = ({ children }) => {
  const [socket, setSocket] = useState(null);
  const [onlineUsers, setOnlineUsers] = useState([]);

  useEffect(() => {
    const isLocal = window.location.hostname === "localhost";
    const SOCKET_URL = isLocal 
      ? "http://localhost:4550" 
      : "https://chat-server-three-livid.vercel.app";
    const socketInstance = io(SOCKET_URL, {
      withCredentials: true,
      autoConnect: true,
      transports: ['websocket', 'polling']
    });
    setSocket(socketInstance);
    socketInstance.on("connect", () => {
      
      const profile = localStorage.getItem('profile');
      if (profile) {
        try {
          const user = JSON.parse(profile);
          const userId = user?._id || user?.user?._id;
            socketInstance.emit("join_room", userId); 
            socketInstance.io.opts.query = { userId };
        } catch (e) {
          console.error("error:", e);
        }
      } else {
        console.log("No profile found.");
      }
    });

    socketInstance.on("getOnlineUsers", (users) => {
      setOnlineUsers(users);
    });

    return () => {
      socketInstance.disconnect();
    };
  }, []); 

  return (
    <SocketContext.Provider value={{ socket, onlineUsers }}>
      {children}
    </SocketContext.Provider>
  );
};