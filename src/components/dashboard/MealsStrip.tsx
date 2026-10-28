import React, { useState } from 'react';
import {
  Check,
  ChevronRight,
  Clock,
  Flame,
  Info,
  RefreshCw,
  Utensils,
  X,
} from 'lucide-react';
import { MealItem } from '../../types';
import { useBrowserBackModal } from '../../hooks/useBrowserBackModal';

interface MealsStripProps {
  meals: MealItem[];
  onToggleEaten: (mealId: string) => void;
  onSwapMeal: (mealId: string) => void;
  isDarkMode: boolean;
}

export const MealsStrip: React.FC<MealsStripProps> = ({
  meals,
  onToggleEaten,
  onSwapMeal,
  isDarkMode,
}) => {
  const [selectedMeal, setSelectedMeal] = useState<MealItem | null>(null);

  // Allow browser Back button to cleanly close recipe modal without navigating away
  useBrowserBackModal(Boolean(selectedMeal), () => setSelectedMeal(null), 'recipe-modal');

  return (
    <div className={`p-6 rounded-3xl border transition-colors ${
      isDarkMode
        ? 'bg-[#251B17] border-[#3D2C26]'
        : 'bg-[#FAF3EF] border-[#E8D9CD]'
    }`}>
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0] uppercase tracking-wider flex items-center gap-2">
            <Utensils size={16} className="text-[#AE7C53]" />
            <span>Today&apos;s Meals</span>
          </h2>
          <p className="text-xs text-[#AE7C53] mt-0.5">
            Prepared fresh by Priya Sharma for Monday, 21 Oct
          </p>
        </div>

        <span className="text-xs font-mono font-semibold px-2.5 py-1 rounded-full bg-[#AE7C53]/15 text-[#AE7C53]">
          {meals.reduce((sum, m) => sum + (m.isEaten ? m.calories : 0), 0)} / {meals.reduce((sum, m) => sum + m.calories, 0)} kcal logged
        </span>
      </div>

      {/* 3 Meal Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {meals.map((meal) => (
          <div
            key={meal.id}
            className={`rounded-2xl border overflow-hidden flex flex-col justify-between transition-all hover:shadow-md group ${
              meal.isEaten
                ? isDarkMode
                  ? 'bg-[#1D1412] border-[#3D2C26] opacity-90'
                  : 'bg-[#FFFBF0]/80 border-[#E8D9CD]'
                : isDarkMode
                  ? 'bg-[#1E1512] border-[#3D2C26]'
                  : 'bg-[#FFFBF0] border-[#E8D9CD]'
            }`}
          >
            {/* Meal Image with Category Pill & Eaten Badge */}
            <div className="relative h-44 overflow-hidden bg-black/10">
              <img
                src={meal.image}
                alt={meal.name}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                onError={(e) => {
                  e.currentTarget.style.display = 'none';
                }}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/20" />

              {/* Category chip */}
              <div className="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-semibold text-white tracking-wide">
                {meal.category}
              </div>

              {/* Time */}
              <div className="absolute top-3 right-3 px-2.5 py-1 rounded-full bg-black/50 backdrop-blur-md text-[11px] font-mono text-[#DEB89D] flex items-center gap-1">
                <Clock size={12} />
                <span>{meal.time}</span>
              </div>

              {/* Eaten indicator check button */}
              <button
                onClick={() => onToggleEaten(meal.id)}
                title={meal.isEaten ? 'Mark as not eaten' : 'Mark as eaten'}
                className={`absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all shadow-md cursor-pointer ${
                  meal.isEaten
                    ? 'bg-emerald-600 text-white'
                    : 'bg-white/80 hover:bg-white text-[#4B2E25]'
                }`}
              >
                <Check size={16} className={meal.isEaten ? 'stroke-3' : 'opacity-70'} />
              </button>
            </div>

            {/* Meal Details */}
            <div className="p-4 flex-1 flex flex-col justify-between">
              <div>
                <div className="flex items-baseline justify-between mb-1.5">
                  <h3 className="text-base font-bold text-[#4B2E25] dark:text-[#FFFBF0] group-hover:text-[#AE7C53] transition-colors">
                    {meal.name}
                  </h3>
                  <div className="flex items-center gap-1 text-xs font-mono font-semibold text-[#AE7C53]">
                    <Flame size={12} />
                    <span>{meal.calories} kcal</span>
                  </div>
                </div>

                <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] line-clamp-2 leading-relaxed mb-3">
                  {meal.description}
                </p>

                {/* Macro summary tags */}
                <div className="flex items-center gap-2 text-[11px] text-[#AE7C53] font-mono mb-3">
                  <span>P: {meal.protein}g</span>
                  <span aria-hidden="true">·</span>
                  <span>C: {meal.carbs}g</span>
                  <span aria-hidden="true">·</span>
                  <span>F: {meal.fats}g</span>
                </div>
              </div>

              {/* Action buttons */}
              <div className="pt-3 border-t border-[#E8D9CD]/50 dark:border-[#3D2C26] flex items-center justify-between gap-2">
                <button
                  onClick={() => setSelectedMeal(meal)}
                  className="flex items-center gap-1 text-xs font-medium text-[#6F4E37] hover:text-[#4B2E25] dark:text-[#DEB89D] dark:hover:text-[#FFFBF0] transition-colors cursor-pointer"
                >
                  <Info size={13} />
                  <span>Recipe Info</span>
                </button>

                <button
                  onClick={() => onSwapMeal(meal.id)}
                  title="Swap with healthy alternative"
                  className="flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-medium bg-[#AE7C53]/15 text-[#AE7C53] hover:bg-[#AE7C53]/25 transition-colors cursor-pointer"
                >
                  <RefreshCw size={12} />
                  <span>Swap Dish</span>
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Recipe Info Modal */}
      {selectedMeal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl relative ${
            isDarkMode
              ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
              : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
          }`}>
            <button
              onClick={() => setSelectedMeal(null)}
              className="absolute top-5 right-5 p-1 rounded-full hover:bg-black/10 dark:hover:bg-white/10 text-[#AE7C53] cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs uppercase tracking-wider font-semibold text-[#AE7C53]">
                {selectedMeal.category} · {selectedMeal.time}
              </span>
            </div>

            <h3 className="text-xl font-bold text-[#4B2E25] dark:text-[#FFFBF0] mb-2">
              {selectedMeal.name}
            </h3>

            <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed mb-4">
              {selectedMeal.description}
            </p>

            <div className="p-3.5 rounded-2xl bg-black/5 dark:bg-white/5 mb-4 grid grid-cols-4 gap-2 text-center">
              <div>
                <p className="text-[10px] text-[#AE7C53] uppercase font-semibold">Calories</p>
                <p className="text-sm font-bold font-mono">{selectedMeal.calories}</p>
              </div>
              <div>
                <p className="text-[10px] text-[#AE7C53] uppercase font-semibold">Carbs</p>
                <p className="text-sm font-bold font-mono">{selectedMeal.carbs}g</p>
              </div>
              <div>
                <p className="text-[10px] text-[#AE7C53] uppercase font-semibold">Protein</p>
                <p className="text-sm font-bold font-mono">{selectedMeal.protein}g</p>
              </div>
              <div>
                <p className="text-[10px] text-[#AE7C53] uppercase font-semibold">Fats</p>
                <p className="text-sm font-bold font-mono">{selectedMeal.fats}g</p>
              </div>
            </div>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-2">
              Ingredients Used
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {selectedMeal.ingredients.map((ing) => (
                <span
                  key={ing}
                  className="px-2.5 py-1 rounded-lg text-xs bg-[#FAF3EF] dark:bg-[#1E1512] border border-[#E8D9CD] dark:border-[#3D2C26] text-[#4B2E25] dark:text-[#DEB89D]"
                >
                  {ing}
                </span>
              ))}
            </div>

            <div className="p-3 rounded-xl bg-[#AE7C53]/10 border border-[#AE7C53]/20 text-xs text-[#4B2E25] dark:text-[#DEB89D] leading-relaxed">
              <strong>Chef Priya&apos;s Note:</strong> Sautéed with only 1 tsp cold-pressed oil, rock salt, and fresh turmeric for anti-inflammatory benefits.
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
