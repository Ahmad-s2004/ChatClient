import React from 'react';
import { 
  User, Mail, ShieldCheck, LogOut, Camera, 
  ChevronRight, Circle, ExternalLink 
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Account = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    /* 
       Fix: Mobile par 'left-4 right-4' (center dikhega) aur desktop (md) par 
       'left-16 right-auto' (sidebar ke sath dikhega). 
    */
    <div className="fixed md:absolute top-16 left-4 right-4 md:left-20 md:right-auto md:w-80 bg-[#1e1e1e] border border-gray-800 rounded-2xl shadow-2xl z-[100] overflow-hidden animate-in fade-in zoom-in duration-200">
      
      {/* Profile Header */}
      <div className="p-5 bg-[#252525] flex flex-col items-center border-b border-gray-800">
        <div className="relative group cursor-pointer">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-lg">
            D
          </div>
          <div className="absolute bottom-0 right-0 bg-gray-900 p-1.5 rounded-full border border-gray-700 group-hover:bg-gray-800">
            <Camera size={14} className="text-gray-300" />
          </div>
        </div>
        <h3 className="mt-3 text-lg font-bold text-white">Daniel Anderson</h3>
        <p className="text-sm text-gray-400 truncate max-w-full">daniel.design@webex.com</p>
        
        {/* Status Badge */}
        <div className="mt-3 flex items-center gap-2 bg-[#121212] px-3 py-1 rounded-full border border-gray-700">
          <Circle size={8} fill="#10b981" className="text-emerald-500" />
          <span className="text-xs font-medium text-emerald-500">Available</span>
        </div>
      </div>

      {/* Menu Options */}
      <div className="p-2 max-h-[60vh] overflow-y-auto">
        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-xl transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
              <User size={18} />
            </div>
            <span className="text-sm font-medium text-gray-200">Edit Profile</span>
          </div>
          <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-xl transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
              <ShieldCheck size={18} />
            </div>
            <span className="text-sm font-medium text-gray-200">Security & Privacy</span>
          </div>
          <ChevronRight size={16} className="text-gray-600 group-hover:text-gray-400" />
        </button>

        <button className="w-full flex items-center justify-between p-3 hover:bg-gray-800 rounded-xl transition-colors group">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
              <ExternalLink size={18} />
            </div>
            <span className="text-sm font-medium text-gray-200">Subscription</span>
          </div>
          <span className="text-[10px] bg-orange-500/20 text-orange-400 px-2 py-0.5 rounded uppercase font-bold">Pro</span>
        </button>
      </div>

      {/* Footer / Sign Out */}
      <div className="p-2 mt-1 border-t border-gray-800">
        <Link 
          to="/signin" 
          className="w-full flex items-center gap-3 p-3 hover:bg-red-500/10 rounded-xl text-red-400 transition-colors"
        >
          <LogOut size={18} />
          <span className="text-sm font-bold">Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Account;