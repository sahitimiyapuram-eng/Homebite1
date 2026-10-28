import React from 'react';
import {
  CalendarDays,
  ChefHat,
  HeartPulse,
  Home,
  MessageSquareHeart,
  ShoppingCart,
  Sparkles,
  User,
  UtensilsCrossed,
} from 'lucide-react';
import { ActiveTab } from '../../types';
import { BotanicalFlourish } from './BotanicalFlourish';
import { Logo } from './Logo';

interface SidebarProps {
  activeTab: ActiveTab;
  onSelectTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  activeTab,
  onSelectTab,
  isDarkMode,
}) => {
  const navItems: { id: ActiveTab; label: string; icon: React.ElementType; badge?: string }[] = [
    { id: 'dashboard', label: 'Home', icon: Home },
    { id: 'mealplan', label: 'Meal Plan', icon: CalendarDays },
    { id: 'grocery', label: 'Grocery', icon: ShoppingCart },
    { id: 'nutrition', label: 'Nutrition', icon: HeartPulse },
    { id: 'mycook', label: 'My Cook', icon: ChefHat },
    { id: 'feedback', label: 'Feedback', icon: MessageSquareHeart },
    { id: 'profile', label: 'Profile', icon: User },
  ];

  return (
    <aside className={`w-64 shrink-0 flex flex-col justify-between h-full border-r transition-colors duration-200 select-none ${
      isDarkMode 
        ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]' 
        : 'bg-[#FAF3EF] border-[#E8D9CD] text-[#4B2E25]'
    }`}>
      {/* Brand Header */}
      <div>
        <div className="p-6 pb-4">
          <button
            onClick={() => onSelectTab('dashboard')}
            className="flex items-center gap-3 text-left focus:outline-none group"
          >
            <Logo size="md" variant={isDarkMode ? 'light' : 'dark'} />
          </button>
          <p className="mt-2 text-xs text-[#AE7C53] font-medium tracking-tight">
            Healthy home food without daily planning.
          </p>
        </div>

        {/* Primary Navigation */}
        <nav className="px-3 py-2 space-y-1">
          {navItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => onSelectTab(item.id)}
                className={`w-full flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  isActive
                    ? isDarkMode
                      ? 'bg-[#4B2E25] text-[#FFFBF0] shadow-sm font-semibold'
                      : 'bg-[#EBDDD2] text-[#4B2E25] shadow-xs font-semibold'
                    : isDarkMode
                      ? 'text-[#DEB89D]/80 hover:bg-[#34241F] hover:text-[#FFFBF0]'
                      : 'text-[#6F4E37] hover:bg-[#F2E7DE] hover:text-[#4B2E25]'
                }`}
              >
                <div className="flex items-center gap-3.5">
                  <Icon
                    size={20}
                    className={isActive ? 'text-[#AE7C53]' : 'opacity-70'}
                  />
                  <span>{item.label}</span>
                </div>
                {item.badge && (
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-[#AE7C53] text-white">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </nav>
      </div>

      {/* Bottom Section with Cook Portal Switch & Botanical sprig */}
      <div className="p-4 relative overflow-hidden">
        {/* Cook portal quick toggle (as shown in mockup: Cook View for reference) */}
        <div className={`p-3.5 rounded-xl border mb-3 relative z-10 ${
          isDarkMode
            ? 'bg-[#1E1512] border-[#3D2C26]'
            : 'bg-[#FFFBF0] border-[#E8D9CD]'
        }`}>
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold uppercase tracking-wider text-[#AE7C53]">
              Cook View
            </span>
            <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#AE7C53]/15 text-[#AE7C53] font-medium">
              Demo Portal
            </span>
          </div>
          <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] mb-2.5 leading-relaxed">
            Switch to Priya&apos;s cook schedule view & dietary prep alerts.
          </p>
          <button
            onClick={() => onSelectTab('cookportal')}
            className={`w-full flex items-center justify-center gap-2 py-2 px-3 rounded-lg text-xs font-medium transition-colors ${
              activeTab === 'cookportal'
                ? 'bg-[#AE7C53] text-white'
                : isDarkMode
                  ? 'bg-[#2E201B] hover:bg-[#3E2C25] text-[#FAF3EF]'
                  : 'bg-[#EBDDD2] hover:bg-[#DEB89D] text-[#4B2E25]'
            }`}
          >
            <UtensilsCrossed size={14} />
            <span>Open Cook Portal</span>
          </button>
        </div>

        {/* Botanical flourish at bottom corner */}
        <div className="flex justify-end pr-1">
          <BotanicalFlourish color={isDarkMode ? '#6F4E37' : '#DEB89D'} size={52} />
        </div>
      </div>
    </aside>
  );
};
