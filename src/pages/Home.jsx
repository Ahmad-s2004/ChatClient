import React, { useState } from 'react';
import {
  MessageSquare, Users, Hash, Phone, Link2, Calendar,
  Settings, Search, Video, Send, Plus, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Account from './Account';

const Home = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);
  const [activeFilter, setActiveFilter] = useState('All');
  const [isSearching, setIsSearching] = useState(false);
  const [chatSearchQuery, setChatSearchQuery] = useState("");

  const [view, setView] = useState('list');
  const [selectedChat, setSelectedChat] = useState(null);


  const filters = ['All', 'Direct', 'Spaces', 'Unread'];
  const allChats = [
    { id: 1, name: 'Thomas Ball', type: 'Direct', unread: true, img: '20' },
    { id: 2, name: 'Kenny Wade', type: 'Direct', unread: false, img: '21' },
    { id: 3, name: 'Movie Review', type: 'Spaces', unread: true, isSpace: true, subtitle: 'Forest Of Mystery' },
    { id: 4, name: 'Phoenix Romero', type: 'Direct', unread: false, img: '22' },
    { id: 5, name: 'Daisy Reid', type: 'Direct', unread: true, img: '23' },
    { id: 6, name: 'Project Alpha', type: 'Spaces', unread: false, isSpace: true, subtitle: 'Internal Team' },
    { id: 7, name: 'Marketing Team', type: 'Spaces', unread: true, isSpace: true, subtitle: 'Campaign 2024' },
  ];

  const filteredChats = allChats.filter(chat => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return chat.unread;
    return chat.type === activeFilter;
  });

  const handleChatSelect = (chat) => {
    setSelectedChat(chat);
    setView('chat');
  };

  return (
    <div className="flex h-screen bg-[#121212] text-gray-300 font-sans overflow-hidden relative">

      {/* Home.jsx ke andar Account component */}
<Account 
  isOpen={isAccountOpen} 
  onClose={() => setIsAccountOpen(false)} 
/>

{/* 1. Slim Sidebar */}
<div className="w-16 flex-shrink-0 flex flex-col items-center py-4 border-r border-gray-800 space-y-6 z-50 bg-[#121212]">
<div
  onClick={(e) => {
    e.stopPropagation(); // Outside click listener ko rokne ke liye
    setIsAccountOpen(!isAccountOpen); // Toggle logic
  }}
  className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center font-bold text-white transition-all ${
    isAccountOpen ? 'ring-2 ring-emerald-500 bg-emerald-600' : 'bg-emerald-500 hover:bg-emerald-600'
  }`}
>
  D
</div>

  <MessageSquare
    className={`w-6 h-6 pl-1 cursor-pointer transition-colors ${
      view === 'list' ? 'text-blue-400 border-l-2 border-blue-400' : 'text-gray-500 hover:text-white'
    }`}
    onClick={() => setView('list')}
  />
  
  <Users className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
  <Phone className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
  <Link2 className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />
  <Calendar className="w-6 h-6 text-gray-500 hover:text-white cursor-pointer transition-colors" />

  <div className="mt-auto space-y-6">
    <Link to="/setting">
      <Settings className="w-6 h-8 pb-1.5 m-auto text-gray-500 hover:text-white cursor-pointer transition-colors" />
    </Link>
    <div className="w-8 h-8 bg-gray-700/50 text-gray-400 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600 hover:text-white transition-all font-bold">
      ?
    </div>
  </div>
</div>

      <div className={`w-full md:w-80 flex-shrink-0 flex-col border-r border-gray-800 bg-[#121212] ${view === 'list' ? 'flex' : 'hidden md:flex'}`}>
        <div className="p-4 flex items-center justify-between">
          <span className="font-semibold text-lg text-white">Messages</span>
          <div className="hidden md:flex flex space-x-2 text-gray-500">
            <ChevronLeft size={18} className="cursor-pointer hover:text-white" />
            <ChevronRight size={18} className="cursor-pointer hover:text-white" />
            <Plus size={18} className="cursor-pointer hover:text-white" />
          </div>
        </div>

        <div className="flex px-4 space-x-2 text-sm mb-4 overflow-x-auto no-scrollbar">
          {filters.map((f) => (
            <span
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-3 py-1 rounded-full cursor-pointer transition-all whitespace-nowrap ${activeFilter === f ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'
                }`}
            >
              {f}
            </span>
          ))}
        </div>

        <div className="overflow-y-auto flex-1 px-2">
          <div className="px-2 py-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
            Recent {activeFilter !== 'All' ? activeFilter : 'Chats'}
          </div>

          {filteredChats.map((chat) => (
            <div key={chat.id} className="mb-1" onClick={() => handleChatSelect(chat)}>
              <div className={`p-3 rounded-2xl flex items-center space-x-3 cursor-pointer transition-all ${selectedChat?.id === chat.id ? 'bg-[#1e1e1e]' : 'hover:bg-gray-800/40'
                }`}>
                <div className="relative flex-shrink-0">
                  {chat.isSpace ? (
                    <div className="w-11 h-11 bg-pink-900 rounded-2xl flex items-center justify-center text-xl shadow-lg">🎬</div>
                  ) : (
                    <div className="relative">
                      <img src={`https://i.pravatar.cc/150?u=${chat.img}`} className="w-11 h-11 rounded-full object-cover" alt="avatar" />
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#121212] rounded-full"></div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className={`text-sm truncate ${chat.unread ? 'text-white font-bold' : 'text-gray-300'}`}>{chat.name}</p>
                    {chat.unread && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{chat.subtitle || 'Click to message'}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={`flex-1 flex flex-col min-w-0 bg-[#121212] ${view === 'chat' ? 'flex' : 'hidden md:flex'}`}>

        {selectedChat ? (
          <>
            <header className="h-20 border-b border-gray-800/60 bg-[#121212]/80 backdrop-blur-md sticky top-0 z-20 flex items-center px-0.5 md:px-8 shadow-2xl transition-all duration-300">

              {!isSearching ? (
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center min-w-0">
                    <button className="md:hidden p-2 hover:bg-gray-800 rounded-full" onClick={() => setView('list')}>
                      <ChevronLeft size={24} />
                    </button>

                    <div className="flex items-center gap-4 truncate">
                      {selectedChat.isSpace ? (
                        <div className="w-12 h-12 bg-gradient-to-tr from-pink-600 to-rose-400 rounded-2xl flex items-center justify-center text-2xl shadow-lg">🎬</div>
                      ) : (
                        <div className="relative flex-shrink-0">
                          <img src={`https://i.pravatar.cc/150?u=${selectedChat.img}`} className="w-12 h-12 rounded-full border-2 border-emerald-500/20" alt="avatar" />
                          <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-[#121212] rounded-full"></div>
                        </div>
                      )}
                      <div className="min-w-0">
                        <h2 className="text-md md:text-lg font-bold text-white flex items-center gap-2 truncate">
                          {selectedChat.name}
                          <span className="hidden sm:inline-block w-1.5 h-1.5 bg-emerald-500 rounded-full animate-pulse"></span>
                        </h2>
                        <p className="text-xs md:text-sm text-gray-500 font-medium truncate italic">{selectedChat.subtitle || "Active now"}</p>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-2 md:gap-4">
                    <button onClick={() => setIsSearching(true)} className="p-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                      <Search size={20} />
                    </button>
                    <button className="bg-emerald-600/10 hover:bg-emerald-600 text-emerald-500 hover:text-white px-4 py-2 rounded-xl flex items-center gap-2 text-sm font-bold border border-emerald-600/20 transition-all shadow-lg">
                      <Video size={18} />
                      <span className="hidden sm:block">Meet</span>
                    </button>
                    <button className="hidden lg:block p-2.5 text-gray-400 hover:text-white hover:bg-gray-800 rounded-xl transition-all">
                      <Settings size={20} />
                    </button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center w-full gap-4">
                  <div className="flex-1 flex items-center bg-[#1e1e1e] rounded-xl px-4 py-2 border border-gray-700 focus-within:border-emerald-500/50 transition-all">
                    <Search size={18} className="text-gray-500 mr-3" />
                    <input
                      autoFocus
                      type="text"
                      value={chatSearchQuery}
                      onChange={(e) => setChatSearchQuery(e.target.value)}
                      placeholder={`Search messages in ${selectedChat.name}...`}
                      className="bg-transparent w-full outline-none text-white text-sm"
                    />
                  </div>
                  <button
                    onClick={() => { setIsSearching(false); setChatSearchQuery(""); }}
                    className="text-sm font-medium text-gray-400 hover:text-white px-2"
                  >
                    Cancel
                  </button>
                </div>
              )}
            </header>

            <div className="flex-1 overflow-y-auto p-4 md:p-8 space-y-6">
              <div className="flex space-x-3 md:space-x-4">
                <img src={`https://i.pravatar.cc/150?u=${selectedChat.id}`} className="w-10 h-10 rounded-full flex-shrink-0" alt="user" />
                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2 mb-1">
                    <span className="font-bold text-white text-sm">{selectedChat.name}</span>
                    <span className="text-[10px] text-gray-500">16:42</span>
                  </div>
                  <div className="bg-[#1a2b3b] border border-blue-900/30 rounded-2xl p-4 shadow-lg w-full max-w-2xl text-white text-sm">
                    Ye raha message area aur neechay input area bhi wapis aa gaya hai!
                  </div>
                </div>
              </div>
            </div>

            <div className="p-4 md:p-6 border-t border-gray-800 bg-[#121212]">
              <div className="bg-[#1e1e1e] border border-gray-700 rounded-2xl p-3 focus-within:border-gray-500 transition-all shadow-inner">
                <div className="flex space-x-4 mb-2 text-gray-500">
                  <Plus size={18} className="cursor-pointer hover:text-white" />
                  <Calendar size={18} className="hidden sm:block cursor-pointer hover:text-white" />
                  <Hash size={18} className="hidden sm:block cursor-pointer hover:text-white" />
                </div>
                <div className="flex items-center gap-2">
                  <input className="bg-transparent flex-1 outline-none text-sm text-white min-w-0" placeholder="Write a message..." />
                  <button className="p-2 bg-emerald-600/10 hover:bg-emerald-600 rounded-lg group transition-all">
                    <Send size={18} className="text-emerald-500 group-hover:text-white transition-colors" />
                  </button>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex-1 flex flex-col items-center justify-center text-gray-600">
            <MessageSquare size={48} className="mb-4 opacity-20" />
            <p>Select a chat to start</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default Home;


