import React, { useState } from 'react';
import {
  Bell,
  Moon,
  Search,
  Sun,
  User,
  X,
  Sparkles,
  RotateCcw,
} from 'lucide-react';
import { ActiveTab, UserProfile } from '../../types';

interface HeaderProps {
  user: UserProfile;
  searchQuery: string;
  onSearchChange: (query: string) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onSelectTab: (tab: ActiveTab) => void;
  onOpenOnboarding: () => void;
  onOpenLogin: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  user,
  searchQuery,
  onSearchChange,
  isDarkMode,
  onToggleTheme,
  onSelectTab,
  onOpenOnboarding,
  onOpenLogin,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [showProfileMenu, setShowProfileMenu] = useState(false);

  const notifications = [
    {
      id: '1',
      title: 'Priya confirmed today’s dinner',
      desc: 'Paneer Roti will be prepared at 7:45 PM with low oil.',
      time: '15m ago',
      unread: true,
    },
    {
      id: '2',
      title: 'Grocery reminder',
      desc: 'Spinach and capsicum are scheduled for tomorrow’s lunch.',
      time: '2h ago',
      unread: false,
    },
    {
      id: '3',
      title: 'Nutrition Goal Met 🎉',
      desc: 'You reached your protein target of 75g yesterday!',
      time: 'Yesterday',
      unread: false,
    },
  ];


  return (
    <header className={`px-6 py-3.5 border-b flex items-center justify-between gap-4 transition-colors relative z-20 ${
      isDarkMode 
        ? 'bg-[#1F1614] border-[#3D2C26] text-[#FAF3EF]' 
        : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
    }`}>
      {/* Search Input Bar */}
      <div className="flex-1 max-w-md relative">
        <div className={`flex items-center gap-2.5 px-3.5 py-2 rounded-xl border text-sm transition-all focus-within:ring-2 focus-within:ring-[#AE7C53]/40 ${
          isDarkMode
            ? 'bg-[#2B1F1B] border-[#3D2C26] text-[#FAF3EF]'
            : 'bg-[#FAF3EF] border-[#E8D9CD] text-[#4B2E25]'
        }`}>
          <Search size={16} className="text-[#AE7C53] shrink-0" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            placeholder="Search meals, recipes, or ingredients..."
            className="w-full bg-transparent border-none outline-none text-xs placeholder:text-[#AE7C53]/60 focus:outline-none"
          />
          {searchQuery && (
            <button
              onClick={() => onSearchChange('')}
              className="text-xs text-[#AE7C53] hover:text-[#4B2E25]"
            >
              <X size={14} />
            </button>
          )}
        </div>
      </div>

      {/* Header Controls Right */}
      <div className="flex items-center gap-3 shrink-0">
        {/* User Greeting */}
        <div className="hidden lg:flex items-center gap-2 text-sm font-medium">
          <span>Good Morning, <strong className="text-[#AE7C53]">{user.name.split(' ')[0]}</strong></span>
          <span className="text-amber-500 animate-pulse text-base">☀️</span>
        </div>

        {/* Theme Toggle (Day / Night) */}
        <button
          onClick={onToggleTheme}
          title={isDarkMode ? 'Switch to Day Mode' : 'Switch to Dark Mode'}
          className={`p-2 rounded-lg border transition-colors cursor-pointer ${
            isDarkMode
              ? 'bg-[#2B1F1B] border-[#3D2C26] text-amber-300 hover:bg-[#382620]'
              : 'bg-[#FAF3EF] border-[#E8D9CD] text-[#6F4E37] hover:bg-[#F2E7DE]'
          }`}
        >
          {isDarkMode ? <Sun size={16} /> : <Moon size={16} />}
        </button>

        {/* Notification Bell */}
        <div className="relative">
          <button
            onClick={() => {
              setShowNotifications(!showNotifications);
              setShowProfileMenu(false);
            }}
            className={`p-2 rounded-lg border relative transition-colors ${
              isDarkMode
                ? 'bg-[#2B1F1B] border-[#3D2C26] text-[#DEB89D] hover:bg-[#382620]'
                : 'bg-[#FAF3EF] border-[#E8D9CD] text-[#6F4E37] hover:bg-[#F2E7DE]'
            }`}
          >
            <Bell size={16} />
            <span className="absolute top-1.5 right-1.5 w-2 h-2 rounded-full bg-[#AE7C53]" />
          </button>

          {/* Notifications Flyout */}
          {showNotifications && (
            <div className={`absolute right-0 mt-2 w-80 rounded-2xl shadow-xl border p-4 z-50 animate-in fade-in zoom-in-95 ${
              isDarkMode
                ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
                : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
            }`}>
              <div className="flex items-center justify-between pb-3 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26]">
                <div className="flex items-center gap-2">
                  <Bell size={14} className="text-[#AE7C53]" />
                  <span className="text-xs font-semibold uppercase tracking-wider">Notifications</span>
                </div>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#AE7C53]/15 text-[#AE7C53] font-medium">
                  3 Updates
                </span>
              </div>
              <div className="divide-y divide-[#E8D9CD]/40 dark:divide-[#3D2C26] mt-2 space-y-1">
                {notifications.map((n) => (
                  <div key={n.id} className="pt-2 pb-2 hover:bg-black/5 dark:hover:bg-white/5 p-2 rounded-lg transition-colors">
                    <div className="flex items-center justify-between">
                      <p className="text-xs font-semibold text-[#4B2E25] dark:text-[#FFFBF0]">{n.title}</p>
                      <span className="text-[10px] text-[#AE7C53]">{n.time}</span>
                    </div>
                    <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D] mt-0.5">{n.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* Profile Avatar Button & Menu */}
        <div className="relative">
          <button
            onClick={() => {
              setShowProfileMenu(!showProfileMenu);
              setShowNotifications(false);
            }}
            className="flex items-center gap-2 p-1 rounded-full hover:ring-2 hover:ring-[#AE7C53]/40 transition-all focus:outline-none"
          >
            <div className="w-8 h-8 rounded-full overflow-hidden border-2 border-[#AE7C53] shadow-xs bg-[#FAF3EF] flex items-center justify-center">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt={user.name}
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <span className="text-xs font-bold text-[#4B2E25]">KS</span>
            </div>
          </button>

          {/* Profile Dropdown */}
          {showProfileMenu && (
            <div className={`absolute right-0 mt-2 w-56 rounded-2xl shadow-xl border p-3 z-50 ${
              isDarkMode
                ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
                : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
            }`}>
              <div className="px-2 py-1.5 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26] mb-2">
                <p className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">{user.name}</p>
                <p className="text-[11px] text-[#AE7C53] truncate">{user.email}</p>
              </div>

              <div className="space-y-1">
                <button
                  onClick={() => {
                    onSelectTab('profile');
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#FAF3EF] dark:hover:bg-[#34241F] text-left transition-colors"
                >
                  <User size={14} className="text-[#AE7C53]" />
                  <span>My Profile & Preferences</span>
                </button>

                <button
                  onClick={() => {
                    onOpenOnboarding();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#FAF3EF] dark:hover:bg-[#34241F] text-left transition-colors text-[#AE7C53] font-medium"
                >
                  <Sparkles size={14} />
                  <span>Restart Onboarding Flow</span>
                </button>

                <button
                  onClick={() => {
                    onOpenLogin();
                    setShowProfileMenu(false);
                  }}
                  className="w-full flex items-center gap-2.5 px-2.5 py-1.5 rounded-lg text-xs hover:bg-[#FAF3EF] dark:hover:bg-[#34241F] text-left transition-colors text-amber-700 dark:text-amber-400"
                >
                  <RotateCcw size={14} />
                  <span>Switch Account / Login</span>
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};
