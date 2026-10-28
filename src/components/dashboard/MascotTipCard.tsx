import React, { useState } from 'react';
import { Lightbulb, RefreshCw } from 'lucide-react';
import { FOOD_IMAGES, MOTIVATION_TIPS } from '../../data/mockData';

interface MascotTipCardProps {
  isDarkMode: boolean;
}

export const MascotTipCard: React.FC<MascotTipCardProps> = ({ isDarkMode }) => {
  const [tipIndex, setTipIndex] = useState(0);

  const nextTip = () => {
    setTipIndex((prev) => (prev + 1) % MOTIVATION_TIPS.length);
  };

  return (
    <div className={`p-5 rounded-3xl border transition-colors relative overflow-hidden flex flex-col sm:flex-row items-center gap-5 ${
      isDarkMode
        ? 'bg-[#251B17] border-[#3D2C26]'
        : 'bg-[#FAF3EF] border-[#E8D9CD]'
    }`}>
      {/* Robot Mascot 3D Character */}
      <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl overflow-hidden shrink-0 bg-[#FFFBF0] dark:bg-[#1E1512] border border-[#E8D9CD] dark:border-[#3D2C26] p-1 shadow-xs">
        <img
          src={FOOD_IMAGES.mascot}
          alt="Homebite friendly chef robot mascot"
          className="w-full h-full object-cover rounded-xl"
          onError={(e) => {
            e.currentTarget.style.display = 'none';
          }}
        />
      </div>

      {/* Mascot Speech / Tip */}
      <div className="flex-1 text-center sm:text-left">
        <div className="inline-flex items-center gap-2 px-2.5 py-0.5 rounded-full bg-[#AE7C53]/15 text-[#AE7C53] text-[11px] font-semibold uppercase tracking-wider mb-1.5">
          <Lightbulb size={12} />
          <span>Healthy food fuels happy life.</span>
        </div>

        <h3 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0] mb-1">
          Tip of the Day
        </h3>

        <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed max-w-lg mb-2">
          &ldquo;{MOTIVATION_TIPS[tipIndex]}&rdquo;
        </p>

        <button
          onClick={nextTip}
          className="inline-flex items-center gap-1.5 text-xs text-[#AE7C53] hover:text-[#4B2E25] dark:hover:text-[#FFFBF0] font-medium transition-colors cursor-pointer"
        >
          <RefreshCw size={12} />
          <span>Next Wellness Tip</span>
        </button>
      </div>
    </div>
  );
};
