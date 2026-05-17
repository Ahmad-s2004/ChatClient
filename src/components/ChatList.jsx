import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const ChatList = ({ allChats, activeFilter, setActiveFilter, selectedChat, handleChatSelect, onlineUsers, view }) => {
  const filters = ['All', 'Direct', 'Spaces', 'Unread'];

  const filteredChats = allChats.filter(chat => {
    if (activeFilter === 'All') return true;
    if (activeFilter === 'Unread') return chat.unread;
    return chat.type === activeFilter;
  });

  return (
    <div className={`w-full md:w-80 flex-shrink-0 flex-col border-r border-gray-800 bg-[#121212] ${view === 'list' ? 'flex' : 'hidden md:flex'}`}>
      <div className="p-4 flex items-center justify-between">
        <span className="font-semibold text-lg text-white">Messages</span>
        <div className="hidden md:flex space-x-2 text-gray-500">
          <ChevronLeft size={18} className="cursor-pointer hover:text-white" />
          <ChevronRight size={18} className="cursor-pointer hover:text-white" />
          <Plus size={18} className="cursor-pointer hover:text-white" />
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex px-4 space-x-2 text-sm mb-4 overflow-x-auto no-scrollbar">
        {filters.map((f) => (
          <span
            key={f}
            onClick={() => setActiveFilter(f)}
            className={`px-3 py-1 rounded-full cursor-pointer transition-all whitespace-nowrap ${
              activeFilter === f ? 'bg-gray-700 text-white' : 'text-gray-500 hover:text-white'
            }`}
          >
            {f}
          </span>
        ))}
      </div>

      {/* List Render */}
      <div className="overflow-y-auto flex-1 px-2">
        <div className="px-2 py-2 text-[10px] font-bold text-gray-600 uppercase tracking-widest">
          Recent {activeFilter !== 'All' ? activeFilter : 'Chats'}
        </div>

        {filteredChats.map((chat) => {
          const isOnline = onlineUsers.includes(chat._id?.toString());
          // Fast and secure Dicebear API fallback for avatars ⚡
          const avatarUrl = chat.img ? `https://i.pravatar.cc/150?u=${chat.img}` : `https://api.dicebear.com/7.x/initials/svg?seed=${encodeURIComponent(chat.name)}`;

          return (
            <div key={chat._id || chat.id} className="mb-1" onClick={() => handleChatSelect(chat)}>
              <div className={`p-3 rounded-2xl flex items-center space-x-3 cursor-pointer transition-all ${
                selectedChat?._id === chat._id ? 'bg-[#1e1e1e]' : 'hover:bg-gray-800/40'
              }`}>
                <div className="relative flex-shrink-0">
                  {chat.isSpace ? (
                    <div className="w-11 h-11 bg-pink-900 rounded-2xl flex items-center justify-center text-xl shadow-lg">🎬</div>
                  ) : (
                    <div className="relative">
                      <img src={avatarUrl} className="w-11 h-11 rounded-full object-cover" alt="avatar" />
                      <div className={`absolute bottom-0 right-0 w-3 h-3 border-2 border-[#121212] rounded-full ${
                        isOnline ? 'bg-green-500' : 'bg-gray-500'
                      }`}></div>
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex justify-between items-center">
                    <p className={`text-sm truncate ${chat.unread ? 'text-white font-bold' : 'text-gray-300'}`}>{chat.name}</p>
                    {chat.unread && <span className="w-2 h-2 bg-blue-500 rounded-full"></span>}
                  </div>
                  <p className="text-xs text-gray-500 truncate mt-0.5">{chat.email || chat.subtitle || 'Click to message'}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ChatList;