import React from 'react';
import {
  ChefHat,
  Sparkles,
  HeartHandshake,
  ShoppingCart,
  ShieldCheck,
  Kanban,
  Users,
  TrendingUp,
  MapPin,
  ArrowRight,
} from 'lucide-react';
import { Logo } from '../common/Logo';
import { BotanicalFlourish } from '../common/BotanicalFlourish';

interface DashboardBottomSectionProps {
  isDarkMode: boolean;
  onSelectHealthMode?: (mode: string) => void;
}

export const DashboardBottomSection: React.FC<DashboardBottomSectionProps> = ({
  isDarkMode,
  onSelectHealthMode,
}) => {
  const healthModes = [
    'Diabetes',
    'Weight Loss',
    'Muscle Gain',
    'Low Sodium',
    'Pregnancy Diet',
    'Senior Citizen Diet',
  ];

  return (
    <section className="mt-12 select-none">
      {/* Top Value Pillars Strip (From Screenshot 2) */}
      <div className={`p-6 sm:p-8 rounded-t-3xl border border-b-0 transition-colors ${
        isDarkMode
          ? 'bg-[#211713] border-[#3D2C26] text-[#FAF3EF]'
          : 'bg-[#FAF3EF] border-[#E8D9CD] text-[#4B2E25]'
      }`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-6 lg:gap-8 items-start">
          
          {/* Left Columns: 6 Key Features */}
          <div className="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            
            {/* 1. Smart Cook Matching */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
                <ChefHat size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                Smart Cook Matching
              </h3>
              <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed">
                Based on cuisine, ratings, language, availability, distance
              </p>
            </div>

            {/* 2. AI Suggestions */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
                <Sparkles size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                AI Suggestions
              </h3>
              <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed">
                Changes meals based on your schedule &amp; needs
              </p>
            </div>

            {/* 3. Health Mode */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
                <HeartHandshake size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                Health Mode
              </h3>
              <ul className="text-xs text-[#6F4E37] dark:text-[#DEB89D] space-y-0.5">
                {healthModes.map((mode) => (
                  <li key={mode} className="flex items-center gap-1.5">
                    <span className="text-[#AE7C53] font-bold">·</span>
                    <button
                      onClick={() => onSelectHealthMode?.(mode)}
                      className="hover:text-[#AE7C53] transition-colors text-left"
                    >
                      {mode}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* 4. Grocery Integration */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
                <ShoppingCart size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                Grocery Integration
              </h3>
              <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed">
                Auto-generated list, order groceries
              </p>
            </div>

            {/* 5. Quality Tracking */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
                <ShieldCheck size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                Quality Tracking
              </h3>
              <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed">
                Rate meals &amp; let the app learn
              </p>
            </div>

            {/* 6. Japanese Management */}
            <div className="space-y-2">
              <div className="w-10 h-10 rounded-xl bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
                <Kanban size={20} />
              </div>
              <h3 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                Japanese Management
              </h3>
              <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed font-mono">
                Kaizen | 5S | JIT | Poka-Yoke | Kanban
              </p>
            </div>

          </div>

          {/* Right Columns: Target Customers & Revenue Model (Matching Screenshot 2 Card Box) */}
          <div className="lg:col-span-4 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-4 p-5 rounded-2xl border bg-[#FFFBF0]/60 dark:bg-[#1A120F]/60 border-[#E8D9CD] dark:border-[#3D2C26]">
            
            {/* Target Customers */}
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Users size={16} className="text-[#AE7C53]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0]">
                  Target Customers
                </h4>
              </div>
              <ul className="text-xs text-[#6F4E37] dark:text-[#DEB89D] space-y-1 mb-3">
                <li>• IT professionals</li>
                <li>• Newly shifted employees</li>
                <li>• Working couples</li>
                <li>• Students</li>
                <li>• Bachelors</li>
                <li>• Busy families</li>
              </ul>
              <div className="flex items-center gap-1.5 text-[11px] font-medium text-[#AE7C53] pt-2 border-t border-[#E8D9CD]/50 dark:border-[#3D2C26]">
                <MapPin size={13} className="shrink-0" />
                <span>Bangalore | Hyderabad | Pune | Gurgaon</span>
              </div>
            </div>

            {/* Revenue Model */}
            <div className="pt-3 border-t sm:border-t-0 lg:border-t border-[#E8D9CD]/50 dark:border-[#3D2C26]">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-[#AE7C53]" />
                <h4 className="text-xs font-bold uppercase tracking-wider text-[#4B2E25] dark:text-[#FFFBF0]">
                  Revenue Model
                </h4>
              </div>
              <ul className="text-xs text-[#6F4E37] dark:text-[#DEB89D] space-y-1">
                <li>• Monthly subscription</li>
                <li>• Commission from cooks</li>
                <li>• Grocery partnerships</li>
                <li>• Premium nutrition plans</li>
                <li>• Corporate wellness packages</li>
              </ul>
            </div>

          </div>

        </div>
      </div>

      {/* Bottom Organic Wavy Cozy Dark Brown Banner (From Screenshot 2) */}
      <div className="relative bg-[#4B2E25] text-[#FFFBF0] overflow-hidden rounded-b-3xl pt-8 pb-10 px-6 sm:px-10 border-t border-[#6F4E37]/40 shadow-inner">
        {/* Soft wavy decorative top curve */}
        <div className="absolute top-0 left-0 right-0 h-4 bg-gradient-to-b from-black/15 to-transparent pointer-events-none" />

        <div className="relative z-10 max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          
          {/* Logo & Brand */}
          <div className="flex items-center gap-3">
            <Logo size="lg" variant="light" />
          </div>

          {/* Central Tagline in elegant serif / italic */}
          <div className="text-center md:text-left">
            <p className="font-serif italic text-lg sm:text-xl lg:text-2xl text-[#DEB89D] tracking-wide">
              Healthy home food without daily planning.
            </p>
          </div>

          {/* Botanical flourish on the right */}
          <div className="flex items-center gap-4">
            <BotanicalFlourish color="#DEB89D" size={48} />
          </div>
        </div>

        {/* Footer Sub-links */}
        <div className="mt-8 pt-6 border-t border-[#6F4E37]/50 max-w-7xl mx-auto flex flex-wrap items-center justify-between text-xs text-[#DEB89D]/70 gap-4">
          <div className="flex items-center gap-4 flex-wrap">
            <span>© 2026 Homebite Technologies Inc.</span>
            <span>·</span>
            <span>Made with warm homestyle care</span>
            <span>·</span>
            <span>Cook Portal Enabled</span>
          </div>

          <div className="flex items-center gap-4">
            <a href="#privacy" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Privacy</a>
            <span>·</span>
            <a href="#terms" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Terms</a>
            <span>·</span>
            <a href="#safety" onClick={(e) => e.preventDefault()} className="hover:text-white transition-colors">Cook Safety &amp; 5S Kaizen</a>
          </div>
        </div>
      </div>
    </section>
  );
};
