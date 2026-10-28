import React, { useState } from 'react';
import {
  Activity,
  Award,
  Calendar,
  Flame,
  HeartPulse,
  Leaf,
  ShieldCheck,
  TrendingDown,
} from 'lucide-react';
import { NutritionData, UserProfile } from '../types';

interface NutritionViewProps {
  nutrition: NutritionData;
  user: UserProfile;
  isDarkMode: boolean;
}

export const NutritionView: React.FC<NutritionViewProps> = ({
  nutrition,
  user,
  isDarkMode,
}) => {
  const [selectedWeek, setSelectedWeek] = useState('Week 1');

  // SVG Donut calculation
  const size = 160;
  const strokeWidth = 18;
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;

  const carbsOffset = circumference * (1 - nutrition.carbsPercent / 100);
  const proteinOffset = circumference * (1 - nutrition.proteinPercent / 100);
  const fatsOffset = circumference * (1 - nutrition.fatsPercent / 100);

  // Calorie Trend max scale
  const maxCalories = 2200;

  return (
    <div className="space-y-6">
      {/* Header & Week Selector matching Screen 11 */}
      <div className={`p-6 rounded-3xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#AE7C53]">
            Health &amp; Metabolism
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#4B2E25] dark:text-[#FFFBF0] flex items-center gap-2 mt-0.5">
            <HeartPulse size={22} className="text-[#AE7C53]" />
            <span>Nutrition Report</span>
          </h2>
          <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] mt-1">
            Goal: <strong className="text-[#AE7C53]">{user.healthGoal}</strong> · Current Weight: 47 kg
          </p>
        </div>

        {/* Week Switcher Pills */}
        <div className={`p-1 rounded-xl border flex items-center gap-1 ${
          isDarkMode
            ? 'bg-[#1E1512] border-[#3D2C26]'
            : 'bg-[#FFFBF0] border-[#E8D9CD]'
        }`}>
          {['Week 1', 'Week 2', 'Week 3', 'Week 4'].map((wk) => (
            <button
              key={wk}
              onClick={() => setSelectedWeek(wk)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                selectedWeek === wk
                  ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-[#FFFBF0] shadow-xs'
                  : 'text-[#6F4E37] dark:text-[#DEB89D] hover:text-[#4B2E25]'
              }`}
            >
              {wk}
            </button>
          ))}
        </div>
      </div>

      {/* Main Stats Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* Left: Calorie & Macro Donut Card (Matching Screen 11) */}
        <div className={`lg:col-span-5 p-6 rounded-3xl border transition-colors flex flex-col justify-between ${
          isDarkMode
            ? 'bg-[#251B17] border-[#3D2C26]'
            : 'bg-[#FAF3EF] border-[#E8D9CD]'
        }`}>
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-sm font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0]">
              Daily Caloric Balance
            </h3>
            <span className="text-xs text-emerald-600 dark:text-emerald-400 font-semibold flex items-center gap-1">
              <TrendingDown size={14} />
              On Target (-150 kcal deficit)
            </span>
          </div>

          {/* SVG Macro Ring Center */}
          <div className="flex flex-col sm:flex-row items-center justify-around gap-6 py-4">
            <div className="relative flex items-center justify-center">
              <svg width={size} height={size} className="transform -rotate-90">
                {/* Background Ring */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke={isDarkMode ? '#34241F' : '#E8D9CD'}
                  strokeWidth={strokeWidth}
                  fill="transparent"
                />
                {/* Carbs Arc (55%) */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#AE7C53"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={carbsOffset}
                  fill="transparent"
                  strokeLinecap="round"
                />
                {/* Protein Arc (20%) */}
                <circle
                  cx={size / 2}
                  cy={size / 2}
                  r={radius}
                  stroke="#6F4E37"
                  strokeWidth={strokeWidth}
                  strokeDasharray={circumference}
                  strokeDashoffset={proteinOffset}
                  fill="transparent"
                  strokeLinecap="round"
                />
              </svg>

              {/* Center Calorie Number matching Screen 11 */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center">
                <span className="text-2xl font-black font-mono text-[#4B2E25] dark:text-[#FFFBF0]">
                  {nutrition.avgDailyCalories.toLocaleString()}
                </span>
                <span className="text-[10px] uppercase font-semibold text-[#AE7C53]">
                  Avg. Daily kcal
                </span>
              </div>
            </div>

            {/* Macro Breakdown Legend matching Screen 11 */}
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#AE7C53]" />
                <div>
                  <p className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                    Carbs: {nutrition.carbsPercent}%
                  </p>
                  <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D]">
                    Complex grains &amp; fiber
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#6F4E37]" />
                <div>
                  <p className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                    Protein: {nutrition.proteinPercent}%
                  </p>
                  <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D]">
                    Paneer, lentils, curd
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 rounded-full bg-[#DEB89D]" />
                <div>
                  <p className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                    Fats: {nutrition.fatsPercent}%
                  </p>
                  <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D]">
                    Ghee &amp; cold-pressed oil
                  </p>
                </div>
              </div>
            </div>
          </div>

          <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D] text-center pt-3 border-t border-[#E8D9CD]/50 dark:border-[#3D2C26]">
            Personalized for <strong>Kanika Suthar</strong>&apos;s clean healthy metabolism.
          </p>
        </div>

        {/* Right: Daily Average 4 Metric Cards + Calorie Trend Bar Chart */}
        <div className="lg:col-span-7 space-y-6">
          {/* Daily Average Cards (matching Screen 11: Protein 75g, Fiber 28g, Sugar 12g, Sodium 1200mg) */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            
            <div className={`p-4 rounded-2xl border text-center transition-colors ${
              isDarkMode ? 'bg-[#251B17] border-[#3D2C26]' : 'bg-[#FAF3EF] border-[#E8D9CD]'
            }`}>
              <div className="w-8 h-8 rounded-xl mx-auto mb-2 bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
                <Activity size={16} />
              </div>
              <p className="text-[10px] uppercase font-bold text-[#AE7C53]">Protein</p>
              <p className="text-xl font-bold font-mono text-[#4B2E25] dark:text-[#FFFBF0] mt-0.5">
                {nutrition.dailyProtein} g
              </p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">94% Target</span>
            </div>

            <div className={`p-4 rounded-2xl border text-center transition-colors ${
              isDarkMode ? 'bg-[#251B17] border-[#3D2C26]' : 'bg-[#FAF3EF] border-[#E8D9CD]'
            }`}>
              <div className="w-8 h-8 rounded-xl mx-auto mb-2 bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <Leaf size={16} />
              </div>
              <p className="text-[10px] uppercase font-bold text-[#AE7C53]">Fiber</p>
              <p className="text-xl font-bold font-mono text-[#4B2E25] dark:text-[#FFFBF0] mt-0.5">
                {nutrition.dailyFiber} g
              </p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Optimal</span>
            </div>

            <div className={`p-4 rounded-2xl border text-center transition-colors ${
              isDarkMode ? 'bg-[#251B17] border-[#3D2C26]' : 'bg-[#FAF3EF] border-[#E8D9CD]'
            }`}>
              <div className="w-8 h-8 rounded-xl mx-auto mb-2 bg-amber-500/15 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Flame size={16} />
              </div>
              <p className="text-[10px] uppercase font-bold text-[#AE7C53]">Sugar</p>
              <p className="text-xl font-bold font-mono text-[#4B2E25] dark:text-[#FFFBF0] mt-0.5">
                {nutrition.dailySugar} g
              </p>
              <span className="text-[10px] text-[#6F4E37] dark:text-[#DEB89D] font-medium">Natural only</span>
            </div>

            <div className={`p-4 rounded-2xl border text-center transition-colors ${
              isDarkMode ? 'bg-[#251B17] border-[#3D2C26]' : 'bg-[#FAF3EF] border-[#E8D9CD]'
            }`}>
              <div className="w-8 h-8 rounded-xl mx-auto mb-2 bg-sky-500/15 text-sky-600 dark:text-sky-400 flex items-center justify-center">
                <ShieldCheck size={16} />
              </div>
              <p className="text-[10px] uppercase font-bold text-[#AE7C53]">Sodium</p>
              <p className="text-xl font-bold font-mono text-[#4B2E25] dark:text-[#FFFBF0] mt-0.5">
                {nutrition.dailySodium} mg
              </p>
              <span className="text-[10px] text-emerald-600 dark:text-emerald-400 font-medium">Safe Limit</span>
            </div>

          </div>

          {/* Calorie Trend Bar Chart matching Screen 11 */}
          <div className={`p-6 rounded-3xl border transition-colors ${
            isDarkMode ? 'bg-[#251B17] border-[#3D2C26]' : 'bg-[#FAF3EF] border-[#E8D9CD]'
          }`}>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0]">
                  Calorie Trend
                </h4>
                <p className="text-xs text-[#AE7C53]">Weekly adherence against daily calorie target</p>
              </div>
              <span className="text-xs font-mono font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                Avg: 1,720 kcal/day
              </span>
            </div>

            {/* Bars */}
            <div className="h-44 flex items-end justify-between gap-3 pt-6 pb-2 px-2 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26]">
              {nutrition.weeklyTrend.map((item) => {
                const heightPercent = Math.min(100, Math.round((item.calories / maxCalories) * 100));
                return (
                  <div key={item.day} className="flex-1 flex flex-col items-center gap-2 group">
                    <span className="text-[10px] font-mono text-[#AE7C53] opacity-0 group-hover:opacity-100 transition-opacity">
                      {item.calories}
                    </span>
                    <div className="w-full max-w-[28px] h-32 bg-black/5 dark:bg-white/5 rounded-t-lg relative flex items-end overflow-hidden">
                      <div
                        className="w-full bg-[#AE7C53] hover:bg-[#976841] transition-all rounded-t-lg"
                        style={{ height: `${heightPercent}%` }}
                      />
                    </div>
                    <span className="text-xs font-medium text-[#4B2E25] dark:text-[#FFFBF0]">
                      {item.day}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
