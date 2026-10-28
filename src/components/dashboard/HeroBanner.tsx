import React from 'react';
import { Calendar, ChevronRight, Flame, Star } from 'lucide-react';
import { FOOD_IMAGES } from '../../data/mockData';
import { ActiveTab, UserProfile } from '../../types';

interface HeroBannerProps {
  user: UserProfile;
  todayCalories: number;
  targetCalories: number;
  cookRating: number;
  daysLeft: number;
  onSelectTab: (tab: ActiveTab) => void;
  isDarkMode: boolean;
}

export const HeroBanner: React.FC<HeroBannerProps> = ({
  todayCalories,
  targetCalories,
  cookRating,
  daysLeft,
  onSelectTab,
  isDarkMode,
}) => {
  const caloriePercent = Math.min(100, Math.round((todayCalories / targetCalories) * 100));

  return (
    <div className="relative overflow-hidden rounded-3xl border transition-all shadow-sm group border-[#E8D9CD] dark:border-[#3D2C26] bg-[#2E1E19] text-[#FFFBF0]">
      {/* Background Hero Image with warm scrim overlay */}
      <div className="absolute inset-0 z-0">
        <img
          src={FOOD_IMAGES.splash}
          alt="Homebite fresh wholesome food"
          className="w-full h-full object-cover object-center opacity-35 scale-105 group-hover:scale-100 transition-transform duration-700 ease-out"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-[#231511] via-[#2A1914]/90 to-transparent" />
      </div>

      {/* Banner Content */}
      <div className="relative z-10 p-6 md:p-8 flex flex-col justify-between min-h-[220px]">
        <div className="max-w-xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#AE7C53]/25 border border-[#AE7C53]/40 text-[#DEB89D] text-xs font-semibold uppercase tracking-wider mb-3">
            <span>Home-Style Wellness</span>
            <span aria-hidden="true">·</span>
            <span>Zero Daily Chore</span>
          </div>

          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold tracking-tight leading-tight text-white mb-2">
            Healthy home food <br className="hidden sm:inline" />
            <span className="text-[#DEB89D] font-medium italic">without daily planning.</span>
          </h1>

          <p className="text-sm text-[#DEB89D]/90 max-w-md leading-relaxed mb-6">
            Personalized home-cooked meals, automated grocery ordering, and tailored daily nutrition prepared by your assigned certified cook.
          </p>
        </div>

        {/* Metrics Strip matching screenshot */}
        <div className="pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-4">
          <div className="flex flex-wrap items-center gap-6 md:gap-10">
            {/* Today's Calories Metric */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#DEB89D] mb-1">
                <Flame size={14} className="text-amber-400" />
                <span>Today&apos;s Calories</span>
              </div>
              <div className="flex items-baseline gap-1.5">
                <span className="text-2xl font-bold font-mono tracking-tight text-white">
                  {todayCalories.toLocaleString()}
                </span>
                <span className="text-xs text-[#DEB89D]/70 font-mono">
                  / {targetCalories.toLocaleString()} kcal
                </span>
              </div>
              <div className="w-28 h-1.5 bg-white/20 rounded-full mt-1.5 overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 to-[#AE7C53] rounded-full transition-all duration-500"
                  style={{ width: `${caloriePercent}%` }}
                />
              </div>
            </div>

            {/* Plan Days Left */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#DEB89D] mb-1">
                <Calendar size={14} className="text-[#AE7C53]" />
                <span>Plan Status</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-white">{daysLeft}</span>
                <span className="text-xs text-[#DEB89D]">Days Left (Plan)</span>
              </div>
            </div>

            {/* Cook Rating */}
            <div>
              <div className="flex items-center gap-1.5 text-xs text-[#DEB89D] mb-1">
                <Star size={14} className="text-amber-400 fill-amber-400" />
                <span>Cook Rating</span>
              </div>
              <div className="flex items-baseline gap-1">
                <span className="text-2xl font-bold font-mono text-white">{cookRating}</span>
                <span className="text-xs text-[#DEB89D]">Priya S.</span>
              </div>
            </div>
          </div>

          {/* Action CTA */}
          <button
            onClick={() => onSelectTab('mealplan')}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#AE7C53] hover:bg-[#966740] text-white text-xs font-semibold tracking-wide uppercase shadow-md transition-all active:scale-98 cursor-pointer"
          >
            <span>View Full Month Plan</span>
            <ChevronRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
};
