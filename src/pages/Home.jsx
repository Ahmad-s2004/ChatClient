import React, { useState } from 'react'; // 1. useState import kiya
import {
  MessageSquare, Users, Hash, Phone, Link2, Calendar,
  Settings, Search, Video, Send, Plus, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Account from './Account';

const Home = () => {
  // 2. State define ki overlay ko kholne/band karne ke liye
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#121212] text-gray-300 font-sans overflow-hidden relative">
      
      {/* 3. Account Overlay - Isko props pass kiye aur close logic lagaya */}
      <Account 
        isOpen={isAccountOpen} 
        onClose={() => setIsAccountOpen(false)} 
      />

      {/* 4. Backdrop - Jab account khula ho toh bahar click karne se band ho jaye */}
      {isAccountOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/5" 
          onClick={() => setIsAccountOpen(false)}
        />
      )}

      {/* 1. Slim Sidebar (Leftmost) */}
      <div className="w-16 flex flex-col items-center py-4 border-r border-gray-800 space-y-6 z-50 bg-[#121212]">
        <div
          onClick={() => setIsAccountOpen(!isAccountOpen)}
          className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center font-bold text-white transition-all ${
            isAccountOpen ? 'ring-2 ring-emerald-500 bg-emerald-600' : 'bg-emerald-500 hover:bg-emerald-600'
          }`}
        >
          D
        </div>
        
        <MessageSquare className="w-6 h-6 text-blue-400 border-l-2 border-blue-400 pl-1" />
        <Users className="w-6 h-6 hover:text-white cursor-pointer" />
        <Phone className="w-6 h-6 hover:text-white cursor-pointer" />
        <Link2 className="w-6 h-6 hover:text-white cursor-pointer" />
        <Calendar className="w-6 h-6 hover:text-white cursor-pointer" />
        
        <div className="mt-auto space-y-6">
          <Link to="/setting">
            <Settings className="w-6 h-8 pb-1.5 m-auto hover:text-white cursor-pointer" />
          </Link>
          <div className="w-8 h-8 bg-gray-700 rounded-lg flex items-center justify-center cursor-pointer hover:bg-gray-600">?</div>
        </div>
      </div>

      {/* 2. Navigation List (Middle Panel) */}
      <div className="w-80 flex flex-col border-r border-gray-800 hidden md:flex">
        <div className="p-4 flex items-center justify-between">
          <span className="font-semibold text-lg text-white">Status</span>
          <div className="flex space-x-2">
            <ChevronLeft size={18} className="cursor-pointer hover:text-white" />
            <ChevronRight size={18} className="cursor-pointer hover:text-white" />
            <Plus size={18} className="cursor-pointer hover:text-white" />
          </div>
        </div>

        <div className="flex px-4 space-x-4 text-sm mb-4">
          <span className="bg-gray-700 px-3 py-1 rounded-full text-white cursor-pointer">All</span>
          <span className="cursor-pointer hover:text-white">Direct</span>
          <span className="cursor-pointer hover:text-white">Spaces</span>
        </div>

        <div className="overflow-y-auto flex-1">
          <div className="px-4 py-2 text-xs font-bold text-gray-500 uppercase">Favorites</div>

          <div className="bg-[#2c2c2c] mx-2 p-3 rounded-2xl flex items-center space-x-3 mb-1 cursor-pointer">
            <div className="w-10 h-10 bg-pink-900 rounded-full flex items-center justify-center text-xl">🎬</div>
            <div>
              <p className="text-white font-medium text-sm">Movie Review</p>
              <p className="text-xs text-rose-400">Forest Of Mystery</p>
            </div>
          </div>

          {['Thomas Ball', 'Kenny Wade', 'Phoenix Romero', 'Daisy Reid'].map((user, i) => (
            <div key={i} className="px-4 py-3 flex items-center space-x-3 hover:bg-gray-800 cursor-pointer group">
              <div className="relative">
                <img src={`https://i.pravatar.cc/150?u=${i + 20}`} className="w-10 h-10 rounded-full" alt="avatar" />
                <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-[#121212] rounded-full"></div>
              </div>
              <span className="text-sm flex-1 group-hover:text-white">{user}</span>
            </div>
          ))}
        </div>
      </div>

      {/* 3. Main Chat Area */}
      <div className="flex-1 flex flex-col">
      <header className="h-16 border-b border-gray-800 flex items-center justify-between px-6 gap-4">
  {/* flex-1 mobile pe puri width lega, lg:max-w-xl desktop pe width limit rakhega */}
  <div className="flex items-center space-x-4 bg-[#252525] px-4 py-1.5 rounded-lg flex-1 lg:max-w-xl">
    <Search size={18} className="text-gray-500 flex-shrink-0" />
    <input 
      className="bg-transparent outline-none text-sm w-full text-white" 
      placeholder="Search, meet, and call" 
    />
  </div>

  {/* Ye sirf desktop (lg) pe dikhega */}
  <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
    <div className="flex items-center space-x-1 text-sm bg-gray-800 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-700">
      <div className="w-4 h-4 border border-gray-400 rounded-sm"></div>
      <span className="whitespace-nowrap">Connect to a device</span>
    </div>
  </div>
</header>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                <Settings size={20} className="text-gray-400" /> Movie Review
              </h2>
              <p className="text-rose-400 text-sm ml-7">Forest Of Mystery</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-1.5 rounded-full flex items-center gap-2 font-medium transition-all active:scale-95">
              <Video size={18} /> Meet
            </button>
          </div>

          <div className="flex space-x-4 max-w-4xl">
            <img src="https://i.pravatar.cc/150?u=1" className="w-10 h-10 rounded-full h-fit shadow-md" alt="user" />
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-bold text-white">Thomas Ball</span>
                <span className="text-xs text-gray-500">16:42</span>
              </div>
              <div className="bg-[#1a2b3b] border border-blue-900/30 rounded-lg overflow-hidden max-w-2xl shadow-lg">
                <div className="flex flex-col sm:flex-row gap-4 p-4">
                  <img src="https://picsum.photos/400/220" className="w-full sm:w-48 h-28 object-cover rounded shadow-inner" alt="teaser" />
                  <div>
                    <h3 className="text-white font-bold mb-1">Forest Of Mistery | Teaser</h3>
                    <p className="text-xs text-gray-400">A movie based on Herbert Clay novels from 18th century. Directed by Roman Duncan</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-sm mb-2 text-white">This is it guys! The official trailer is live.</p>
                  <a href="#" className="text-blue-400 text-sm hover:underline font-medium">https://forestofmistery.com/officialtrailer</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area */}
        <div className="p-6 border-t border-gray-800">
          <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-3 focus-within:border-gray-500 transition-all">
            <div className="flex space-x-4 mb-2 text-gray-500">
              <Plus size={18} className="cursor-pointer hover:text-white" /> 
              <Calendar size={18} className="cursor-pointer hover:text-white" /> 
              <Hash size={18} className="cursor-pointer hover:text-white" />
            </div>
            <div className="flex items-center">
              <input className="bg-transparent flex-1 outline-none text-sm text-white" placeholder="Write a message to Webex for Daniel" />
              <Send size={18} className="text-gray-500 cursor-pointer hover:text-emerald-500" />
            </div>
          </div>
          <p className="text-[10px] text-gray-500 mt-2 text-right">Shift + Enter for a new line</p>
        </div>
      </div>
    </div>
  );
};

export default Home;