import React, { useState } from 'react';
import {
  CheckCircle2,
  Heart,
  MessageSquareHeart,
  Sparkles,
  Star,
  Utensils,
} from 'lucide-react';
import { FOOD_IMAGES } from '../data/mockData';
import { MealFeedback } from '../types';

interface FeedbackViewProps {
  isDarkMode: boolean;
  onSubmitFeedback: (feedback: MealFeedback) => void;
}

export const FeedbackView: React.FC<FeedbackViewProps> = ({
  isDarkMode,
  onSubmitFeedback,
}) => {
  const [selectedDish, setSelectedDish] = useState('Paneer Roti (Dinner - 21 Oct)');
  const [taste, setTaste] = useState(5);
  const [oilLevel, setOilLevel] = useState(4);
  const [spice, setSpice] = useState(3);
  const [quantity, setQuantity] = useState(5);
  const [notes, setNotes] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const dishes = [
    { name: 'Paneer Roti (Dinner - 21 Oct)', type: 'Dinner', image: FOOD_IMAGES.paneerRoti },
    { name: 'Dal, Rice, Bhindi (Lunch - 21 Oct)', type: 'Lunch', image: FOOD_IMAGES.dalRice },
    { name: 'Poha (Breakfast - 21 Oct)', type: 'Breakfast', image: FOOD_IMAGES.poha },
  ];

  const handleRatingClick = (setter: (val: number) => void, val: number) => {
    setter(val);
  };

  const renderStars = (value: number, setter: (val: number) => void) => {
    return (
      <div className="flex items-center gap-1.5">
        {[1, 2, 3, 4, 5].map((star) => (
          <button
            type="button"
            key={star}
            onClick={() => handleRatingClick(setter, star)}
            className="p-1 hover:scale-110 transition-transform cursor-pointer"
          >
            <Star
              size={20}
              className={`${
                star <= value
                  ? 'fill-amber-400 text-amber-400'
                  : 'text-[#DEB89D]/50 stroke-1'
              }`}
            />
          </button>
        ))}
        <span className="text-xs font-mono font-bold text-[#AE7C53] ml-2">
          {value}/5
        </span>
      </div>
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newFeedback: MealFeedback = {
      id: `fb-${Date.now()}`,
      dishName: selectedDish,
      date: '21 Oct 2025',
      mealType: selectedDish.includes('Dinner') ? 'Dinner' : 'Lunch',
      taste,
      oilLevel,
      spice,
      quantity,
      notes,
      timestamp: new Date().toLocaleTimeString(),
    };
    onSubmitFeedback(newFeedback);
    setSubmitted(true);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Header matching Screen 13 */}
      <div className={`p-6 rounded-3xl border transition-colors text-center ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div className="w-12 h-12 rounded-2xl bg-[#AE7C53]/15 text-[#AE7C53] mx-auto mb-2 flex items-center justify-center">
          <MessageSquareHeart size={24} />
        </div>
        <span className="text-xs uppercase tracking-wider font-semibold text-[#AE7C53]">
          Continuous Quality Tracking (Kaizen)
        </span>
        <h2 className="text-2xl font-bold text-[#4B2E25] dark:text-[#FFFBF0] mt-1">
          Meal Feedback
        </h2>
        <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] mt-1 max-w-md mx-auto">
          How was your meal today? Your ratings directly train Priya&apos;s seasoning and spice formulation.
        </p>
      </div>

      {!submitted ? (
        <form
          onSubmit={handleSubmit}
          className={`p-6 sm:p-8 rounded-3xl border transition-colors space-y-6 ${
            isDarkMode
              ? 'bg-[#251B17] border-[#3D2C26]'
              : 'bg-[#FAF3EF] border-[#E8D9CD]'
          }`}
        >
          {/* Dish Picker */}
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-2">
              Select Meal to Review
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
              {dishes.map((d) => (
                <button
                  type="button"
                  key={d.name}
                  onClick={() => setSelectedDish(d.name)}
                  className={`p-2.5 rounded-xl border flex items-center gap-2.5 text-left transition-all ${
                    selectedDish === d.name
                      ? 'border-[#AE7C53] bg-[#AE7C53]/15 shadow-xs font-semibold'
                      : 'border-[#E8D9CD] dark:border-[#3D2C26] opacity-75'
                  }`}
                >
                  <img src={d.image} alt={d.name} className="w-9 h-9 rounded-lg object-cover" />
                  <div className="truncate">
                    <p className="text-xs truncate">{d.name.split(' (')[0]}</p>
                    <span className="text-[10px] text-[#AE7C53]">{d.type}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Rating Rows matching Screen 13 */}
          <div className="space-y-4 pt-2 border-t border-[#E8D9CD]/50 dark:border-[#3D2C26]">
            {/* Taste */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0]">
                Taste
              </span>
              {renderStars(taste, setTaste)}
            </div>

            {/* Oil Level */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0]">
                Oil Level
              </span>
              {renderStars(oilLevel, setOilLevel)}
            </div>

            {/* Spice */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0]">
                Spice
              </span>
              {renderStars(spice, setSpice)}
            </div>

            {/* Quantity */}
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0]">
                Quantity
              </span>
              {renderStars(quantity, setQuantity)}
            </div>
          </div>

          {/* Feedback Textarea matching Screen 13 */}
          <div className="pt-2 border-t border-[#E8D9CD]/50 dark:border-[#3D2C26]">
            <label className="block text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-2">
              Any Additional Feedback?
            </label>
            <textarea
              rows={3}
              placeholder="Tell us more... (e.g. Loved the phulkas! Just a pinch less salt in the paneer gravy would be perfect.)"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              className={`w-full p-3.5 rounded-2xl text-xs border outline-none leading-relaxed ${
                isDarkMode
                  ? 'bg-[#1E1512] border-[#3D2C26] text-[#FAF3EF]'
                  : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
              }`}
            />
          </div>

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-sm font-bold bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] shadow-md transition-all active:scale-98 cursor-pointer"
          >
            Submit Feedback
          </button>
        </form>
      ) : (
        <div className={`p-8 rounded-3xl border text-center space-y-4 transition-colors ${
          isDarkMode
            ? 'bg-[#251B17] border-[#3D2C26]'
            : 'bg-[#FAF3EF] border-[#E8D9CD]'
        }`}>
          <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
            <CheckCircle2 size={32} />
          </div>
          <h3 className="text-xl font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
            Feedback Submitted!
          </h3>
          <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] max-w-sm mx-auto leading-relaxed">
            Priya has received your note for <strong>{selectedDish}</strong>. Future meals will automatically adjust oil and spice to your exact preference!
          </p>

          <button
            onClick={() => {
              setSubmitted(false);
              setNotes('');
            }}
            className="px-6 py-2.5 rounded-xl text-xs font-bold border border-[#AE7C53] text-[#AE7C53] hover:bg-[#AE7C53]/10 transition-colors cursor-pointer"
          >
            Submit Another Meal Review
          </button>
        </div>
      )}
    </div>
  );
};
