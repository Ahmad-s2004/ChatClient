import React, { useEffect, useRef } from 'react';
import { 
  User, Mail, ShieldCheck, LogOut, Camera, 
  ChevronRight, Circle, ExternalLink, Moon, 
  HelpCircle, UserPlus, CreditCard, MessageSquareMore
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Account = ({ isOpen, onClose }) => {
  const accountRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (accountRef.current && !accountRef.current.contains(event.target)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;;

  return (
    <div 
      ref={accountRef} 
      className="fixed md:absolute top-12 left-16 w-3/4 right-4 md:left-20 md:right-auto md:w-80 bg-[#1e1e1e] border border-gray-800 rounded-2xl shadow-2xl z-[100] overflow-hidden transition-all duration-300 animate-in fade-in zoom-in-95"
    >
      <div className="p-5 bg-[#252525] flex flex-col items-center border-b border-gray-800">
        <div className="relative group cursor-pointer">
          <div className="w-16 h-16 md:w-20 md:h-20 bg-emerald-500 rounded-full flex items-center justify-center text-2xl md:text-3xl font-bold text-white shadow-lg transition-transform duration-300 hover:scale-105">
            D
          </div>
          <div className="absolute bottom-0 right-0 bg-gray-900 p-1.5 rounded-full border border-gray-700">
            <Camera size={14} className="text-gray-300" />
          </div>
        </div>
        <h3 className="mt-3 text-lg font-bold text-white">Daniel Anderson</h3>
        <p className="text-[11px] text-gray-500 uppercase tracking-wider font-bold">Free Plan User</p>
      </div>

      <div className="p-2 max-h-[400px] overflow-y-auto custom-scrollbar">
        
        <div className="mb-2">
          <p className="px-3 py-2 text-[10px] font-bold text-gray-600 uppercase">Account</p>
          <button className="w-full flex items-center justify-between p-2.5 hover:bg-gray-800 rounded-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-blue-500/10 rounded-lg text-blue-400">
                <User size={16} />
              </div>
              <span className="text-sm font-medium text-gray-200">Edit Profile</span>
            </div>
            <ChevronRight size={14} className="text-gray-600 group-hover:text-gray-400" />
          </button>
          
          <button className="w-full flex items-center justify-between p-2.5 hover:bg-gray-800 rounded-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-emerald-500/10 rounded-lg text-emerald-400">
                <Circle size={16} />
              </div>
              <span className="text-sm font-medium text-gray-200">Set Status</span>
            </div>
          </button>
        </div>

        <div className="mb-2 border-t border-gray-800/50 pt-2">
          <p className="px-3 py-2 text-[10px] font-bold text-gray-600 uppercase">Preferences</p>
          <button className="w-full flex items-center justify-between p-2.5 hover:bg-gray-800 rounded-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-orange-500/10 rounded-lg text-orange-400">
                <Moon size={16} />
              </div>
              <span className="text-sm font-medium text-gray-200">Appearance</span>
            </div>
            <span className="text-[10px] text-gray-500 bg-gray-800 px-2 py-0.5 rounded-md">Dark</span>
          </button>

          <button className="w-full flex items-center justify-between p-2.5 hover:bg-gray-800 rounded-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-purple-500/10 rounded-lg text-purple-400">
                <ShieldCheck size={16} />
              </div>
              <span className="text-sm font-medium text-gray-200">Security</span>
            </div>
          </button>
        </div>

        <div className="mb-2 border-t border-gray-800/50 pt-2">
          <p className="px-3 py-2 text-[10px] font-bold text-gray-600 uppercase">Social</p>
          <button className="w-full flex items-center justify-between p-2.5 hover:bg-gray-800 rounded-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-pink-500/10 rounded-lg text-pink-400">
                <UserPlus size={16} />
              </div>
              <span className="text-sm font-medium text-gray-200">Invite Friends</span>
            </div>
          </button>
          
          <button className="w-full flex items-center justify-between p-2.5 hover:bg-gray-800 rounded-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-yellow-500/10 rounded-lg text-yellow-400">
                <MessageSquareMore size={16} />
              </div>
              <span className="text-sm font-medium text-gray-200">Feedback</span>
            </div>
          </button>
        </div>

        <div className="mb-2 border-t border-gray-800/50 pt-2">
          <button className="w-full flex items-center justify-between p-2.5 hover:bg-gray-800 rounded-xl transition-all group">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gray-500/10 rounded-lg text-gray-400">
                <HelpCircle size={16} />
              </div>
              <span className="text-sm font-medium text-gray-200">Help Center</span>
            </div>
          </button>
        </div>
      </div>

      <div className="p-2 mt-1 border-t border-gray-800 bg-[#252525]/30">
        <Link 
          to="/signin" 
          className="w-full flex items-center gap-3 p-3 hover:bg-red-500/10 rounded-xl text-red-400 transition-all duration-200">
          <LogOut size={18} />
          <span className="text-sm font-bold">Sign Out</span>
        </Link>
      </div>
    </div>
  );
};

export default Account;