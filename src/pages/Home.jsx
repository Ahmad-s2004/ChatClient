import React, { useState } from 'react';
import {
  MessageSquare, Users, Hash, Phone, Link2, Calendar,
  Settings, Search, Video, Send, Plus, ChevronLeft, ChevronRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import Account from './Account';

const Home = () => {
  const [isAccountOpen, setIsAccountOpen] = useState(false);

  return (
    <div className="flex h-screen bg-[#121212] text-gray-300 font-sans overflow-hidden relative">
      
      <Account 
        isOpen={isAccountOpen} 
        onClose={() => setIsAccountOpen(false)} 
      />

      {isAccountOpen && (
        <div 
          className="fixed inset-0 z-40 bg-black/20" 
          onClick={() => setIsAccountOpen(false)}
        />
      )}

      {/* 1. Slim Sidebar */}
      <div className="w-16 flex-shrink-0 flex flex-col items-center py-4 border-r border-gray-800 space-y-6 z-50 bg-[#121212]">
        <div
          onClick={() => setIsAccountOpen(!isAccountOpen)}
          className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center font-bold text-white transition-all flex-shrink-0 ${
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

      {/* 2. Navigation List - Desktop Only */}
      <div className="w-80 flex-shrink-0 flex-col border-r border-gray-800 hidden md:flex">
        {/* ... (Pura navigation content same rahega) */}
        <div className="p-4 flex items-center justify-between">
          <span className="font-semibold text-lg text-white">Status</span>
        </div>
      </div>

      {/* 3. Main Chat Area - FIX: min-w-0 lagaya taake ye shrink ho sake */}
      <div className="flex-1 flex flex-col min-w-0">
        
        {/* Header FIX: Padding kam ki mobile ke liye */}
        <header className="h-16 border-b border-gray-800 flex items-center justify-between px-4 md:px-6 gap-2">
          <div className="flex items-center space-x-3 bg-[#252525] px-3 py-1.5 rounded-lg flex-1 lg:max-w-xl min-w-0">
            <Search size={16} className="text-gray-500 flex-shrink-0" />
            <input 
              className="bg-transparent outline-none text-sm w-full text-white min-w-0" 
              placeholder="Search..." 
            />
          </div>

          <div className="hidden lg:flex items-center space-x-4 flex-shrink-0">
            <div className="flex items-center space-x-1 text-sm bg-gray-800 px-3 py-1 rounded-md cursor-pointer hover:bg-gray-700">
              <span>Connect to a device</span>
            </div>
          </div>
        </header>

        {/* Messages Area - FIX: min-w-0 flex-1 */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-8 min-w-0">
          
          {/* Movie Review Title Section */}
          <div className="flex items-center justify-between mb-4 gap-2">
            <div className="min-w-0">
              <h2 className="text-lg md:text-2xl font-bold text-white flex items-center gap-2 truncate">
                <Settings size={18} className="text-gray-400 flex-shrink-0" /> Movie Review
              </h2>
              <p className="text-rose-400 text-xs md:text-sm ml-6 md:ml-7 truncate">Forest Of Mystery</p>
            </div>
            <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-3 py-1.5 rounded-full flex items-center gap-2 text-xs md:text-sm font-medium flex-shrink-0">
              <Video size={16} /> Meet
            </button>
          </div>

          {/* Message Card - FIX: flex-1 min-w-0 layout */}
          <div className="flex space-x-3 md:space-x-4 max-w-full">
            <img src="https://i.pravatar.cc/150?u=1" className="w-8 h-8 md:w-10 md:h-10 rounded-full flex-shrink-0 shadow-md" alt="user" />
            <div className="flex-1 min-w-0"> {/* FIX: Is container ne overflow roka */}
              <div className="flex items-center space-x-2 mb-1">
                <span className="font-bold text-white text-sm">Thomas Ball</span>
                <span className="text-[10px] text-gray-500">16:42</span>
              </div>
              
              {/* Card - FIX: Width fixed nahi rakhi */}
              <div className="bg-[#1a2b3b] border border-blue-900/30 rounded-lg overflow-hidden shadow-lg w-full">
                <div className="flex flex-col sm:flex-row gap-3 p-3 md:p-4">
                  <img src="https://picsum.photos/400/220" className="w-full sm:w-40 h-24 object-cover rounded shadow-inner" alt="teaser" />
                  <div className="min-w-0 flex-1">
                    <h3 className="text-white font-bold mb-1 text-sm md:text-base truncate">Forest Of Mistery | Teaser</h3>
                    <p className="text-xs text-gray-400 line-clamp-2">A movie based on Herbert Clay novels from 18th century.</p>
                  </div>
                </div>
                <div className="px-4 pb-4">
                  <p className="text-xs md:text-sm mb-2 text-white break-words">This is it guys! The official trailer is live.</p>
                  <a href="#" className="text-blue-400 text-xs md:text-sm hover:underline font-medium break-all">https://forestofmistery.com/officialtrailer</a>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Input Area - FIX: Padding aur min-w-0 */}
        <div className="p-4 md:p-6 border-t border-gray-800 bg-[#121212]">
          <div className="bg-[#1e1e1e] border border-gray-700 rounded-xl p-3 focus-within:border-gray-500 transition-all flex flex-col">
            <div className="flex space-x-4 mb-2 text-gray-500">
              <Plus size={18} className="cursor-pointer hover:text-white" /> 
              <Calendar size={18} className="hidden sm:block cursor-pointer hover:text-white" /> 
              <Hash size={18} className="hidden sm:block cursor-pointer hover:text-white" />
            </div>
            <div className="flex items-center gap-2">
              <input className="bg-transparent flex-1 outline-none text-sm text-white min-w-0" placeholder="Write a message..." />
              <Send size={18} className="text-gray-500 cursor-pointer hover:text-emerald-500 flex-shrink-0" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;