import React from 'react';
import { Link } from 'react-router-dom';
import { MessageSquare, Users, Phone, Link2, Calendar, Settings } from 'lucide-react';

const Sidebar = ({ currentUser, isAccountOpen, setIsAccountOpen, view, setView }) => {
  return (
    <div className="w-16 flex-shrink-0 flex flex-col items-center py-4 border-r border-gray-800 space-y-6 z-50 bg-[#121212]">
      {/* Profile Avatar Trigger */}
      <div
        onClick={(e) => {
          e.stopPropagation();
          setIsAccountOpen(!isAccountOpen);
        }}
        className={`w-10 h-10 rounded-full cursor-pointer flex items-center justify-center font-bold text-white transition-all ${
          isAccountOpen ? 'ring-2 ring-emerald-500 bg-emerald-600' : 'bg-emerald-500 hover:bg-emerald-600'
        }`}
      >
        {currentUser?.name ? currentUser.name.charAt(0).toUpperCase() : 'D'}
      </div>

      {/* Nav Icons */}
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
  );
};

export default Sidebar;