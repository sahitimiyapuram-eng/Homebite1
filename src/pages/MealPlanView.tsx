import React, { useState } from 'react';
import {
  Calendar as CalendarIcon,
  Check,
  ChevronLeft,
  ChevronRight,
  Clock,
  Flame,
  Info,
  RefreshCw,
  Sparkles,
  Utensils,
  X,
} from 'lucide-react';
import { DayPlan, MealItem } from '../types';
import { useBrowserBackModal } from '../hooks/useBrowserBackModal';

interface MealPlanViewProps {
  dayPlans: DayPlan[];
  selectedDayId: string;
  onSelectDay: (dayId: string) => void;
  onToggleEaten: (mealId: string) => void;
  onSwapMeal: (mealId: string) => void;
  onShuffleDayPlan: (dayId: string) => void;
  isDarkMode: boolean;
}

export const MealPlanView: React.FC<MealPlanViewProps> = ({
  dayPlans,
  selectedDayId,
  onSelectDay,
  onToggleEaten,
  onSwapMeal,
  onShuffleDayPlan,
  isDarkMode,
}) => {
  const currentDay = dayPlans.find((d) => d.id === selectedDayId) || dayPlans[0];
  const [selectedMeal, setSelectedMeal] = useState<MealItem | null>(null);
  const [isShuffling, setIsShuffling] = useState(false);

  // Close recipe details modal when browser Back is pressed
  useBrowserBackModal(Boolean(selectedMeal), () => setSelectedMeal(null), 'meal-plan-recipe');

  const handleShuffle = () => {
    setIsShuffling(true);
    setTimeout(() => {
      onShuffleDayPlan(currentDay.id);
      setIsShuffling(false);
    }, 600);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card */}
      <div className={`p-6 rounded-3xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs uppercase tracking-wider font-semibold text-[#AE7C53]">
              Monthly Meal Plan
            </span>
            <span className="text-xs text-[#AE7C53]">·</span>
            <span className="text-xs text-[#6F4E37] dark:text-[#DEB89D]">
              October 2025
            </span>
          </div>
          <h2 className="text-xl sm:text-2xl font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
            {currentDay.dayName}, {currentDay.dayNumber} {currentDay.month}
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={handleShuffle}
            disabled={isShuffling}
            className="flex items-center gap-1.5 px-3.5 py-2 rounded-xl text-xs font-semibold bg-[#AE7C53] hover:bg-[#976841] text-white shadow-xs transition-all active:scale-98 cursor-pointer"
          >
            <Sparkles size={14} className={isShuffling ? 'animate-spin' : ''} />
            <span>{isShuffling ? 'Customizing...' : 'AI Re-Plan Meals'}</span>
          </button>
        </div>
      </div>

      {/* Week Calendar Strip (Matching Screen 9 < October 2025 > 21-27) */}
      <div className={`p-4 rounded-2xl border transition-colors ${
        isDarkMode
          ? 'bg-[#1F1614] border-[#3D2C26]'
          : 'bg-[#FFFBF0] border-[#E8D9CD]'
      }`}>
        <div className="flex items-center justify-between px-2 mb-3">
          <div className="flex items-center gap-2">
            <CalendarIcon size={16} className="text-[#AE7C53]" />
            <span className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
              &lt; October 2025 &gt;
            </span>
          </div>
          <span className="text-xs text-[#AE7C53] font-mono">
            Daily Target: 1,850 kcal
          </span>
        </div>

        <div className="grid grid-cols-7 gap-2">
          {dayPlans.map((day) => {
            const isSelected = day.id === currentDay.id;
            return (
              <button
                key={day.id}
                onClick={() => onSelectDay(day.id)}
                className={`flex flex-col items-center justify-center p-3 rounded-xl border transition-all cursor-pointer ${
                  isSelected
                    ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-[#FFFBF0] border-transparent shadow-md scale-102'
                    : isDarkMode
                      ? 'bg-[#251B17] border-[#3D2C26] text-[#DEB89D] hover:bg-[#34241F]'
                      : 'bg-[#FAF3EF] border-[#E8D9CD] text-[#4B2E25] hover:bg-[#F2E7DE]'
                }`}
              >
                <span className="text-[10px] uppercase font-medium opacity-80">
                  {day.dayName.slice(0, 3)}
                </span>
                <span className="text-lg font-bold font-mono my-0.5">
                  {day.dayNumber}
                </span>
                <span className="text-[10px] font-mono opacity-90">
                  {day.totalCalories} kcal
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Day Schedule Card with meals list matching screen 8 & 9 */}
      <div className={`p-6 rounded-3xl border transition-colors ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div className="flex items-center justify-between mb-6 pb-4 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26]">
          <div className="flex items-center gap-2">
            <Utensils size={18} className="text-[#AE7C53]" />
            <h3 className="text-base font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
              Scheduled Meals for {currentDay.dayName}
            </h3>
          </div>
          <div className="text-right">
            <span className="text-xs text-[#AE7C53]">Total Calories: </span>
            <span className="text-base font-mono font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
              {currentDay.totalCalories.toLocaleString()} kcal
            </span>
          </div>
        </div>

        {/* Meals rows */}
        <div className="space-y-4">
          {currentDay.meals.map((meal) => (
            <div
              key={meal.id}
              className={`p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 transition-all ${
                meal.isEaten
                  ? isDarkMode
                    ? 'bg-[#1D1412] border-[#3D2C26] opacity-80'
                    : 'bg-[#FFFBF0]/70 border-[#E8D9CD]'
                  : isDarkMode
                    ? 'bg-[#1E1512] border-[#3D2C26]'
                    : 'bg-[#FFFBF0] border-[#E8D9CD]'
              }`}
            >
              {/* Left Image & Dish Info */}
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 rounded-xl overflow-hidden shrink-0 border border-[#E8D9CD] dark:border-[#3D2C26]">
                  <img
                    src={meal.image}
                    alt={meal.name}
                    className="w-full h-full object-cover"
                    onError={(e) => {
                      e.currentTarget.style.display = 'none';
                    }}
                  />
                </div>

                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-semibold text-[#AE7C53] uppercase tracking-wider">
                      {meal.category}
                    </span>
                    <span className="text-xs text-[#AE7C53]">·</span>
                    <span className="text-xs text-[#6F4E37] dark:text-[#DEB89D] flex items-center gap-1 font-mono">
                      <Clock size={12} />
                      {meal.time}
                    </span>
                  </div>

                  <h4 className="text-base font-bold text-[#4B2E25] dark:text-[#FFFBF0] mt-0.5">
                    {meal.name}
                  </h4>

                  <div className="flex items-center gap-2 mt-1 text-xs font-mono text-[#AE7C53]">
                    <span className="font-bold">{meal.calories} kcal</span>
                    <span>·</span>
                    <span>P: {meal.protein}g</span>
                    <span>·</span>
                    <span>C: {meal.carbs}g</span>
                    <span>·</span>
                    <span>F: {meal.fats}g</span>
                  </div>
                </div>
              </div>

              {/* Right Controls */}
              <div className="flex items-center gap-2 self-end sm:self-center">
                <button
                  onClick={() => setSelectedMeal(meal)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium border border-[#E8D9CD] dark:border-[#3D2C26] text-[#6F4E37] dark:text-[#DEB89D] hover:bg-black/5 dark:hover:bg-white/5 transition-colors cursor-pointer"
                >
                  <Info size={13} className="inline mr-1" />
                  Recipe
                </button>

                <button
                  onClick={() => onSwapMeal(meal.id)}
                  className="px-3 py-1.5 rounded-lg text-xs font-medium bg-[#AE7C53]/15 text-[#AE7C53] hover:bg-[#AE7C53]/25 transition-colors cursor-pointer"
                >
                  <RefreshCw size={12} className="inline mr-1" />
                  Swap
                </button>

                <button
                  onClick={() => onToggleEaten(meal.id)}
                  className={`p-2 rounded-xl transition-all cursor-pointer ${
                    meal.isEaten
                      ? 'bg-emerald-600 text-white'
                      : 'bg-black/5 dark:bg-white/5 text-[#4B2E25] dark:text-[#FAF3EF] hover:bg-black/10'
                  }`}
                  title={meal.isEaten ? 'Marked as Eaten' : 'Mark as Eaten'}
                >
                  <Check size={16} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Recipe Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl relative ${
            isDarkMode
              ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
              : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
          }`}>
            <button
              onClick={() => setSelectedMeal(null)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#AE7C53] hover:bg-black/10 cursor-pointer"
            >
              <X size={18} />
            </button>
            <h3 className="text-xl font-bold mb-2">{selectedMeal.name}</h3>
            <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] mb-4 leading-relaxed">
              {selectedMeal.description}
            </p>
            <h4 className="text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-2">
              Ingredients
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-4">
              {selectedMeal.ingredients.map((ing) => (
                <span key={ing} className="px-2.5 py-1 rounded-lg text-xs bg-black/5 dark:bg-white/5">
                  {ing}
                </span>
              ))}
            </div>
            <div className="p-3 rounded-xl bg-[#AE7C53]/15 text-xs text-[#4B2E25] dark:text-[#DEB89D]">
              Prepared by home cook Priya Sharma with measured spices and cold-pressed oil.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
