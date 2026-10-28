import React, { useState } from 'react';
import {
  AlertCircle,
  ArrowLeft,
  Calendar,
  CheckCircle2,
  ChefHat,
  Clock,
  HeartHandshake,
  MapPin,
  ShieldCheck,
  Sparkles,
  User,
  Utensils,
} from 'lucide-react';
import { Logo } from '../components/common/Logo';

interface CookPortalViewProps {
  onBackToCustomerView: () => void;
  isDarkMode: boolean;
}

export const CookPortalView: React.FC<CookPortalViewProps> = ({
  onBackToCustomerView,
  isDarkMode,
}) => {
  const [prepStatus, setPrepStatus] = useState<Record<string, boolean>>({
    'p1': true,
    'p2': true,
    'p3': false,
    'p4': false,
  });

  const togglePrep = (id: string) => {
    setPrepStatus((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div className="space-y-6">
      {/* Return to App bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBackToCustomerView}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl text-xs font-bold border border-[#AE7C53] text-[#AE7C53] hover:bg-[#AE7C53]/10 transition-colors cursor-pointer"
        >
          <ArrowLeft size={14} />
          <span>Return to Customer Dashboard</span>
        </button>

        <span className="text-xs px-3 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 font-bold flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
          Cook Shift Active · Kitchen Ready
        </span>
      </div>

      {/* Cook Portal Banner matching mockup bottom-left card */}
      <div className={`p-8 rounded-3xl border transition-colors flex flex-col md:flex-row items-center justify-between gap-6 ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
          : 'bg-[#FAF3EF] border-[#E8D9CD] text-[#4B2E25]'
      }`}>
        <div className="flex items-center gap-5">
          <div className="w-16 h-16 rounded-3xl bg-[#AE7C53] text-white flex items-center justify-center shrink-0 shadow-md">
            <ChefHat size={32} />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <Logo size="md" variant={isDarkMode ? 'light' : 'dark'} showText={false} />
              <h2 className="text-2xl font-bold tracking-tight">
                Homebite Cook Portal
              </h2>
            </div>
            <p className="font-serif italic text-sm text-[#AE7C53] mt-0.5">
              Good food. Happy homes.
            </p>
            <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] mt-1">
              Logged in as <strong>Chef Priya Sharma</strong> (FSSAI ID: #HB-COOK-942)
            </p>
          </div>
        </div>

        <div className="text-center md:text-right">
          <p className="text-xs text-[#AE7C53] uppercase font-bold tracking-wider">
            Today&apos;s Client Batch
          </p>
          <p className="text-2xl font-bold font-mono">2 Households</p>
          <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D]">
            6 Homestyle Meals Scheduled
          </p>
        </div>
      </div>

      {/* Client Detail: Kanika Suthar */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-colors ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 mb-4 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26] gap-3">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-2xl overflow-hidden border border-[#AE7C53]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Kanika Suthar"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-base font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                  Kanika Suthar
                </h3>
                <span className="text-[10px] px-2 py-0.5 rounded-full bg-[#AE7C53]/15 text-[#AE7C53] font-bold">
                  Primary Client
                </span>
              </div>
              <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] flex items-center gap-1 mt-0.5">
                <MapPin size={12} className="text-[#AE7C53]" />
                Bellandur, Bangalore (2.1 km away)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-3 font-mono text-xs text-[#AE7C53]">
            <span>Diet: <strong>Pure Veg</strong></span>
            <span>·</span>
            <span>Spice: <strong>Mild / Medium</strong></span>
          </div>
        </div>

        {/* Dietary Rules & Health Constraints */}
        <div className="p-4 rounded-2xl bg-amber-500/10 border border-amber-500/20 text-amber-900 dark:text-amber-300 text-xs mb-6 space-y-1">
          <div className="flex items-center gap-2 font-bold text-amber-800 dark:text-amber-200">
            <AlertCircle size={15} />
            <span>Client Dietary Directives (Weight Loss Goal):</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            • Strictly low cooking oil (&le; 1.5 tsp per meal) · Use cold-pressed mustard oil or pure cow ghee.
            <br />
            • Fasting note: Observes Ekadashi fasting on scheduled lunar dates.
            <br />
            • Customer feedback note: Keep dinner phulkas soft and lightly puffed; reduce red chili powder.
          </p>
        </div>

        {/* Prep Checklist for Priya */}
        <h4 className="text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-3">
          Today&apos;s Cooking Checklist (Monday, 21 Oct)
        </h4>

        <div className="space-y-2.5">
          {[
            { id: 'p1', title: 'Breakfast: Poha with roasted peanuts & curry leaves', time: '8:00 AM', status: 'Completed' },
            { id: 'p2', title: 'Lunch: Homestyle Dal Tadka & Steamed Basmati Rice', time: '1:00 PM', status: 'Completed' },
            { id: 'p3', title: 'Lunch Side: Mild Crispy Sautéed Bhindi Masala', time: '1:00 PM', status: 'In Progress' },
            { id: 'p4', title: 'Dinner: Fresh Paneer Tomato Gravy & Soft Phulkas (2 pcs)', time: '7:45 PM', status: 'Scheduled' },
          ].map((item) => (
            <div
              key={item.id}
              onClick={() => togglePrep(item.id)}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-all cursor-pointer ${
                prepStatus[item.id]
                  ? 'bg-emerald-500/10 border-emerald-500/30'
                  : isDarkMode
                    ? 'bg-[#1E1512] border-[#3D2C26]'
                    : 'bg-[#FFFBF0] border-[#E8D9CD]'
              }`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-5 h-5 rounded-md flex items-center justify-center border ${
                  prepStatus[item.id]
                    ? 'bg-emerald-600 border-emerald-600 text-white'
                    : 'border-[#AE7C53]/50'
                }`}>
                  {prepStatus[item.id] && <CheckCircle2 size={13} className="stroke-3" />}
                </div>
                <span className={`text-xs font-semibold ${prepStatus[item.id] ? 'line-through opacity-75' : ''}`}>
                  {item.title}
                </span>
              </div>

              <div className="flex items-center gap-3">
                <span className="text-[11px] font-mono text-[#AE7C53] flex items-center gap-1">
                  <Clock size={12} />
                  {item.time}
                </span>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  prepStatus[item.id]
                    ? 'bg-emerald-600 text-white'
                    : 'bg-black/5 dark:bg-white/5 text-[#AE7C53]'
                }`}>
                  {prepStatus[item.id] ? 'Ready' : item.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
