import {
  CalendarDays,
  ChefHat,
  HeartPulse,
  ShoppingCart,
  User,
  Utensils,
} from 'lucide-react';
import { ActiveTab } from '../../types';

interface QuickActionsProps {
  onSelectTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
}

export const QuickActions: React.FC<QuickActionsProps> = ({
  onSelectTab,
  isDarkMode,
}) => {
  const actions = [
    {
      id: 'mealplan' as ActiveTab,
      title: "Today's Menu",
      desc: '3 meals planned',
      icon: Utensils,
      color: 'bg-amber-500/10 text-amber-600 dark:text-amber-400',
    },
    {
      id: 'mealplan' as ActiveTab,
      title: 'Meal Plan',
      desc: 'Monthly schedule',
      icon: CalendarDays,
      color: 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400',
    },
    {
      id: 'grocery' as ActiveTab,
      title: 'Grocery List',
      desc: 'Auto-updated',
      icon: ShoppingCart,
      color: 'bg-sky-500/10 text-sky-600 dark:text-sky-400',
    },
    {
      id: 'nutrition' as ActiveTab,
      title: 'Nutrition',
      desc: '1,850 kcal avg',
      icon: HeartPulse,
      color: 'bg-rose-500/10 text-rose-600 dark:text-rose-400',
    },
    {
      id: 'mycook' as ActiveTab,
      title: 'My Cook',
      desc: 'Priya Sharma (4.8★)',
      icon: ChefHat,
      color: 'bg-[#AE7C53]/15 text-[#AE7C53]',
    },
  ];

  return (
    <div className={`p-5 rounded-3xl border transition-colors ${
      isDarkMode
        ? 'bg-[#251B17] border-[#3D2C26]'
        : 'bg-[#FAF3EF] border-[#E8D9CD]'
    }`}>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0] uppercase tracking-wider">
          Quick Actions
        </h2>
        <span className="text-xs text-[#AE7C53] font-medium">Direct Access</span>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        {actions.map((act, index) => {
          const Icon = act.icon;
          return (
            <button
              key={`${act.title}-${index}`}
              onClick={() => onSelectTab(act.id)}
              className={`p-3.5 rounded-2xl border text-left transition-all duration-200 group flex flex-col justify-between hover:-translate-y-0.5 hover:shadow-xs cursor-pointer ${
                isDarkMode
                  ? 'bg-[#1E1512] border-[#3D2C26] hover:border-[#AE7C53]/50'
                  : 'bg-[#FFFBF0] border-[#E8D9CD] hover:border-[#AE7C53]/60'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${act.color}`}>
                  <Icon size={18} />
                </div>
              </div>
              <div>
                <h3 className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0] group-hover:text-[#AE7C53] transition-colors">
                  {act.title}
                </h3>
                <p className="text-[11px] text-[#AE7C53]/80 mt-0.5 truncate">
                  {act.desc}
                </p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );
};
