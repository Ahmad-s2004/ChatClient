import React, { useState, useEffect, useRef } from 'react';
import Account from './Account';
import Sidebar from '../components/Sidebar';
import ChatList from '../components/ChatList';
import ChatWindow from '../components/ChatWindow';

import { useSocket } from '../context/SocketContext.jsx'; 
import { sendMessage, getChatMessages, searchUsers, getCurrentUser } from '../api'; 

const Home = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSearching, setIsSearching] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState("");
  const [view, setView] = useState('list');
  const [selectedChat, setSelectedChat] = useState(null);

  const [allChats, setAllChats] = useState([]); 
  const [messages, setMessages] = useState([]);
  const [typedMessage, setTypedMessage] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  
  const { socket, onlineUsers } = useSocket();
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const loadCurrentUser = async () => {
      try {
        const { data } = await getCurrentUser();
        setCurrentUser(data);
      } catch (error) {
        console.error("Error loading current user:", error);
      }
    };
    loadCurrentUser();
  }, []);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        const { data } = await searchUsers(""); 
        setAllChats(data);
      } catch (error) {
        console.error("Error fetching initial chats:", error);
      }
    };
    loadUsers();
  }, []);

  useEffect(() => {
    const loadChatHistory = async () => {
      if (!selectedChat) return;
      try {
        const chatIdentifier = selectedChat.chatId || selectedChat._id; 
        const { data } = await getChatMessages(chatIdentifier);
        setMessages(data.messages || []);
      } catch (error) {
        console.error("Error loading history:", error);
        setMessages([]); 
      }
    };
    loadChatHistory();
  }, [selectedChat]);

  useEffect(() => {
    if (!socket) return;

    socket.on("receive_message", (newMessage) => {
      const activeChatId = selectedChat?.chatId || selectedChat?._id;
      if (newMessage.chatId === activeChatId) {
        setMessages((prev) => [...prev, newMessage]);
      }
    });

    return () => socket.off("receive_message");
  }, [socket, selectedChat]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setView('chat');
  };

  const handleSendMessageSubmit = async (e) => {
    e.preventDefault();
    if (!typedMessage.trim() || !selectedChat) return;

    try {
      const chatIdentifier = selectedChat.chatId || selectedChat._id;
      const receiverId = selectedChat._id;

      const { data } = await sendMessage({
        content: typedMessage,
        chatId: chatIdentifier,
        receiverId: receiverId
      });

      setMessages((prev) => [...prev, data.newMessage]);
      setTypedMessage("");
    } catch (error) {
      console.error("Failed to send message via API:", error);
    }
  };

  return (
    <div className="flex h-screen bg-[#121212] text-gray-300 font-sans overflow-hidden relative">
      <Account isOpen={isAccountOpen} onClose={() => setIsAccountOpen(false)} />

      <Sidebar 
        currentUser={currentUser} 
        isAccountOpen={isAccountOpen} 
        setIsAccountOpen={setIsAccountOpen} 
        view={view} 
        setView={setView} 
      />

      <ChatList 
        allChats={allChats} 
        activeFilter={activeFilter} 
        setActiveFilter={setActiveFilter} 
        selectedChat={selectedChat} 
        handleChatSelect={handleChatSelect} 
        onlineUsers={onlineUsers} 
        view={view} 
      />

<ChatWindow 
  selectedChat={selectedChat}
  messages={messages}
  currentUser={currentUser}
  onlineUsers={onlineUsers}
  view={view}
  setView={setView}
  isSearching={isSearching}
  setIsSearching={setIsSearching}
  chatSearchQuery={chatSearchQuery}
  setChatSearchQuery={setChatSearchQuery}
  typedMessage={typedMessage}
  setTypedMessage={setTypedMessage}
  handleSendMessageSubmit={handleSendMessageSubmit}
  messagesEndRef={messagesEndRef}
  socket={socket} 
/>
    </div>
  );
};

export default Home;