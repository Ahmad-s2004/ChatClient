import React, { useState } from 'react';
import { Bell, Volume2, Video, Shield, Globe, Moon, ArrowLeft, Menu, X } from 'lucide-react';

const Setting = () => {
  const [activeTab, setActiveTab] = useState('Appearance');
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // Mobile sidebar toggle state

  const menuItems = [
    { id: 'General', icon: <Globe size={20} /> },
    { id: 'Audio', icon: <Volume2 size={20} /> },
    { id: 'Video', icon: <Video size={20} /> },
    { id: 'Notifications', icon: <Bell size={20} /> },
    { id: 'Appearance', icon: <Moon size={20} /> },
    { id: 'Privacy', icon: <Shield size={20} /> },
  ];

  return (
    <div className="flex h-screen w-full bg-[#121212] border border-gray-800 overflow-hidden shadow-2xl relative">
      
      {/* 1. Mobile Sidebar Overlay (Sirf mobile pe jab menu open ho) */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 md:hidden" 
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* 2. Responsive Settings Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-[#1a1a1a] border-r border-gray-800 p-4 transform transition-transform duration-300 ease-in-out
        md:relative md:translate-x-0 
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="flex items-center justify-between mb-6 px-1">
          <div className="flex items-center gap-3">
            <button 
              onClick={() => window.history.back()}
              className="p-1.5 hover:bg-gray-800 rounded-full text-gray-400 hover:text-white transition-colors"
            >
              <ArrowLeft size={20} />
            </button>
            <h2 className="text-xl font-bold text-white">Settings</h2>
          </div>
          {/* Mobile close button */}
          <button className="md:hidden text-gray-400" onClick={() => setIsSidebarOpen(false)}>
            <X size={24} />
          </button>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => {
                setActiveTab(item.id);
                setIsSidebarOpen(false); // Mobile pe select karne ke baad sidebar band ho jaye
              }}
              className={`w-full flex items-center space-x-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all ${
                activeTab === item.id 
                ? 'bg-emerald-600/10 text-emerald-500' 
                : 'text-gray-400 hover:bg-gray-800 hover:text-gray-200'
              }`}
            >
              {item.icon}
              <span>{item.id}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* 3. Main Content Area */}
      <div className="flex-1 flex flex-col h-full overflow-hidden">
        
        {/* Mobile Header (Search input ya menu toggle ke liye) */}
        <div className="md:hidden flex items-center p-4 border-b border-gray-800 bg-[#121212]">
          <button onClick={() => setIsSidebarOpen(true)} className="text-gray-400">
            <Menu size={24} />
          </button>
          <span className="ml-4 font-bold text-white">{activeTab} Settings</span>
        </div>

        <div className="flex-1 overflow-y-auto p-4 md:p-8">
          <div className="max-w-2xl mx-auto">
            <h3 className="hidden md:block text-2xl font-semibold text-white mb-8">{activeTab} Settings</h3>

            {/* Content sections (Appearance section as placeholder) */}
            <div className="space-y-8">
              <section>
                <h4 className="text-sm font-bold text-gray-500 uppercase tracking-wider mb-4">Theme Mode</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  {['Light', 'Dark', 'High Contrast'].map((mode) => (
                    <div 
                      key={mode}
                      className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${
                        mode === 'Dark' ? 'border-emerald-500 bg-[#1a1a1a]' : 'border-gray-800 bg-[#0f0f0f]'
                      }`}
                    >
                      <div className={`h-20 w-full rounded mb-2 ${mode === 'Light' ? 'bg-gray-200' : 'bg-gray-700'}`}></div>
                      <p className="text-center text-sm text-gray-300">{mode}</p>
                    </div>
                  ))}
                </div>
              </section>

              <hr className="border-gray-800" />

              {/* Toggles Area */}
              <section className="space-y-6">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-white font-medium">Hardware Acceleration</p>
                    <p className="text-sm text-gray-500">Optimizes performance using your GPU.</p>
                  </div>
                  <div className="w-12 h-6 flex-shrink-0 bg-emerald-600 rounded-full relative cursor-pointer">
                    <div className="absolute right-1 top-1 w-4 h-4 bg-white rounded-full"></div>
                  </div>
                </div>
                {/* Compact mode toggle... */}
              </section>
            </div>

            {/* Action Buttons */}
            <div className="mt-12 flex flex-col sm:flex-row justify-end gap-4 pb-10">
              <button className="px-6 py-2 text-sm text-gray-400 hover:text-white order-2 sm:order-1">Cancel</button>
              <button className="px-6 py-2 text-sm bg-emerald-600 hover:bg-emerald-700 text-white rounded-full font-bold order-1 sm:order-2">
                Save Changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;