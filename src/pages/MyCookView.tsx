import React, { useState } from 'react';
import {
  Calendar,
  ChefHat,
  Clock,
  Heart,
  MapPin,
  MessageCircle,
  Phone,
  Send,
  ShieldCheck,
  Star,
  UserCheck,
  UtensilsCrossed,
  X,
} from 'lucide-react';
import { CookProfile } from '../types';
import { useBrowserBackModal } from '../hooks/useBrowserBackModal';

interface MyCookViewProps {
  cook: CookProfile;
  isDarkMode: boolean;
  onNavigateFeedback: () => void;
}

export const MyCookView: React.FC<MyCookViewProps> = ({
  cook,
  isDarkMode,
  onNavigateFeedback,
}) => {
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showChatModal, setShowChatModal] = useState(false);

  // Close modals when browser Back is pressed
  useBrowserBackModal(showProfileModal, () => setShowProfileModal(false), 'cook-profile');
  useBrowserBackModal(showChatModal, () => setShowChatModal(false), 'cook-chat');
  const [messages, setMessages] = useState<Array<{ sender: 'user' | 'cook'; text: string; time: string }>>([
    {
      sender: 'cook',
      text: 'Namaste Kanika ji! I have packed the fresh yellow dal and steamed rice for lunch. For dinner, shall I prepare Paneer Roti with mild or medium spice?',
      time: '11:15 AM',
    },
    {
      sender: 'user',
      text: 'Mild spice please, and very little oil!',
      time: '11:20 AM',
    },
    {
      sender: 'cook',
      text: 'Noted! I will use cold-pressed mustard oil and make soft phulkas right at 7:45 PM.',
      time: '11:22 AM',
    },
  ]);
  const [inputText, setInputText] = useState('');

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim()) return;

    const userMsg = {
      sender: 'user' as const,
      text: inputText.trim(),
      time: 'Just now',
    };
    setMessages((prev) => [...prev, userMsg]);
    setInputText('');

    // Simulate cook reply
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'cook',
          text: 'Understood Kanika ji, will follow your instructions carefully for today’s dinner.',
          time: 'Just now',
        },
      ]);
    }, 1000);
  };

  return (
    <div className="space-y-6">
      {/* Top Header Card matching Screen 12 */}
      <div className={`p-6 rounded-3xl border transition-colors flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div>
          <span className="text-xs uppercase tracking-wider font-semibold text-[#AE7C53]">
            Dedicated Culinary Partner
          </span>
          <h2 className="text-xl sm:text-2xl font-bold text-[#4B2E25] dark:text-[#FFFBF0] flex items-center gap-2 mt-0.5">
            <ChefHat size={22} className="text-[#AE7C53]" />
            <span>My Assigned Cook</span>
          </h2>
          <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] mt-1">
            Personalized cooking, doorstep hygiene compliance, and customized spice control
          </p>
        </div>

        <button
          onClick={onNavigateFeedback}
          className="px-4 py-2 rounded-xl text-xs font-semibold bg-[#4B2E25] dark:bg-[#AE7C53] hover:opacity-90 text-white shadow-xs transition-all cursor-pointer flex items-center gap-1.5"
        >
          <Star size={14} className="fill-white" />
          <span>Rate Today&apos;s Meal</span>
        </button>
      </div>

      {/* Main Cook Profile Card matching Screen 12 */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-colors ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div className="flex flex-col md:flex-row items-center md:items-start gap-6 pb-6 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26]">
          
          {/* Avatar with Assigned badge */}
          <div className="relative">
            <div className="w-28 h-28 sm:w-32 sm:h-32 rounded-3xl overflow-hidden border-3 border-[#AE7C53] shadow-md bg-[#FFFBF0]">
              <img
                src={cook.avatar}
                alt={cook.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-2 -right-2 px-2.5 py-1 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center gap-1 shadow-sm">
              <UserCheck size={12} />
              <span>Assigned</span>
            </div>
          </div>

          {/* Details */}
          <div className="flex-1 text-center md:text-left space-y-2">
            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2">
              <h3 className="text-2xl font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                {cook.name}
              </h3>
              <div className="flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-500/15 text-amber-700 dark:text-amber-400 text-xs font-bold">
                <Star size={13} className="fill-amber-500 text-amber-500" />
                <span>{cook.rating} ({cook.totalReviews}+ meals)</span>
              </div>
            </div>

            <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] max-w-xl leading-relaxed">
              Experience: <strong>{cook.experienceYears} years</strong> · Languages: <strong>{cook.languages.join(', ')}</strong>
            </p>

            <div className="flex flex-wrap items-center justify-center md:justify-start gap-2 pt-2">
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-[#AE7C53]/15 text-[#AE7C53]">
                {cook.cuisine}
              </span>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/15 text-emerald-700 dark:text-emerald-400 flex items-center gap-1">
                <ShieldCheck size={13} />
                <span>Hygiene {cook.hygieneScore}% Verified</span>
              </span>
            </div>

            {/* CTAs View Profile & Contact Cook matching Screen 12 */}
            <div className="pt-4 flex flex-wrap items-center justify-center md:justify-start gap-3">
              <button
                onClick={() => setShowProfileModal(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold border border-[#AE7C53] text-[#AE7C53] hover:bg-[#AE7C53]/10 transition-colors cursor-pointer"
              >
                View Full Profile
              </button>

              <button
                onClick={() => setShowChatModal(true)}
                className="px-5 py-2.5 rounded-xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] hover:opacity-90 text-[#FFFBF0] shadow-sm transition-all cursor-pointer flex items-center gap-1.5"
              >
                <MessageCircle size={15} />
                <span>Contact Cook (Chat)</span>
              </button>

              <a
                href={`tel:${cook.phone}`}
                className="p-2.5 rounded-xl border border-[#E8D9CD] dark:border-[#3D2C26] text-[#AE7C53] hover:bg-black/5 dark:hover:bg-white/5 transition-colors"
                title="Call Priya"
              >
                <Phone size={15} />
              </a>
            </div>
          </div>
        </div>

        {/* Cook Details Grid matching Screen 12 */}
        <div className="pt-6">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-4">
            Cook Details &amp; Operational Logistics
          </h4>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            <div className={`p-4 rounded-2xl border transition-colors ${
              isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-[#FFFBF0] border-[#E8D9CD]'
            }`}>
              <div className="flex items-center gap-2 text-xs text-[#AE7C53] mb-1">
                <UtensilsCrossed size={14} />
                <span>Primary Cuisine</span>
              </div>
              <p className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                {cook.cuisine.split(',')[0]}
              </p>
              <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D] mt-0.5">
                Low oil &amp; Ayurvedic balance
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-colors ${
              isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-[#FFFBF0] border-[#E8D9CD]'
            }`}>
              <div className="flex items-center gap-2 text-xs text-[#AE7C53] mb-1">
                <Clock size={14} />
                <span>Availability Window</span>
              </div>
              <p className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                {cook.availability}
              </p>
              <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D] mt-0.5">
                Morning &amp; Afternoon batch
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-colors ${
              isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-[#FFFBF0] border-[#E8D9CD]'
            }`}>
              <div className="flex items-center gap-2 text-xs text-[#AE7C53] mb-1">
                <MapPin size={14} />
                <span>Distance</span>
              </div>
              <p className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                {cook.distanceKm} km away
              </p>
              <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D] mt-0.5">
                Neighborhood dispatch
              </p>
            </div>

            <div className={`p-4 rounded-2xl border transition-colors ${
              isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-[#FFFBF0] border-[#E8D9CD]'
            }`}>
              <div className="flex items-center gap-2 text-xs text-[#AE7C53] mb-1">
                <Star size={14} className="fill-[#AE7C53]" />
                <span>Rating</span>
              </div>
              <p className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                {cook.rating} (120+ meals)
              </p>
              <p className="text-[11px] text-emerald-600 dark:text-emerald-400 mt-0.5">
                Top 2% Certified Cook
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* View Full Profile Modal */}
      {showProfileModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-lg rounded-3xl border p-6 sm:p-8 shadow-2xl relative ${
            isDarkMode ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]' : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
          }`}>
            <button
              onClick={() => setShowProfileModal(false)}
              className="absolute top-5 right-5 p-1 rounded-full text-[#AE7C53] hover:bg-black/10 cursor-pointer"
            >
              <X size={18} />
            </button>

            <div className="flex items-center gap-4 mb-4">
              <div className="w-16 h-16 rounded-2xl overflow-hidden border-2 border-[#AE7C53]">
                <img src={cook.avatar} alt={cook.name} className="w-full h-full object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-bold">{cook.name}</h3>
                <p className="text-xs text-[#AE7C53] font-medium">Homebite Certified Chef #HB-942</p>
                <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D]">5 Years Experience · FSSAI Food Safety Trained</p>
              </div>
            </div>

            <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed mb-4">
              {cook.bio}
            </p>

            <h4 className="text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-2">
              Chef Specialties
            </h4>
            <div className="flex flex-wrap gap-1.5 mb-5">
              {cook.specialties.map((s) => (
                <span key={s} className="px-3 py-1 rounded-lg text-xs bg-black/5 dark:bg-white/5 font-medium">
                  {s}
                </span>
              ))}
            </div>

            <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-xs text-emerald-800 dark:text-emerald-300 space-y-1">
              <div className="flex items-center gap-2 font-bold">
                <ShieldCheck size={16} />
                <span>Homebite 5S Kaizen Kitchen Standards Passed</span>
              </div>
              <p className="text-[11px] leading-relaxed">
                Underwent sanitization checks, thermal food temperature control test, and knife safety protocol.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Interactive Chat Simulator Modal */}
      {showChatModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md h-[520px] rounded-3xl border flex flex-col shadow-2xl relative overflow-hidden ${
            isDarkMode ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]' : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
          }`}>
            {/* Chat Header */}
            <div className="p-4 border-b border-[#E8D9CD]/50 dark:border-[#3D2C26] flex items-center justify-between bg-black/5 dark:bg-white/5">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full overflow-hidden border border-[#AE7C53]">
                  <img src={cook.avatar} alt={cook.name} className="w-full h-full object-cover" />
                </div>
                <div>
                  <h4 className="text-sm font-bold">{cook.name}</h4>
                  <span className="text-[10px] text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500" />
                    Available on Shift
                  </span>
                </div>
              </div>
              <button
                onClick={() => setShowChatModal(false)}
                className="p-1 rounded-full text-[#AE7C53] hover:bg-black/10 cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Quick Prompt Chips */}
            <div className="p-2 border-b border-[#E8D9CD]/30 dark:border-[#3D2C26]/30 flex items-center gap-1.5 overflow-x-auto text-[11px]">
              {['Less oil for dinner', 'Use rock salt only', 'Arriving at 8 PM'].map((chip) => (
                <button
                  key={chip}
                  onClick={() => setInputText(chip)}
                  className="px-2.5 py-1 rounded-full whitespace-nowrap bg-black/5 dark:bg-white/5 hover:bg-[#AE7C53]/20 text-[#6F4E37] dark:text-[#DEB89D] transition-colors"
                >
                  {chip}
                </button>
              ))}
            </div>

            {/* Messages Body */}
            <div className="flex-1 p-4 overflow-y-auto space-y-3">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex flex-col ${m.sender === 'user' ? 'items-end' : 'items-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-2xl text-xs leading-relaxed ${
                      m.sender === 'user'
                        ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-[#FFFBF0] rounded-br-xs'
                        : 'bg-black/5 dark:bg-white/10 text-[#4B2E25] dark:text-[#FAF3EF] rounded-bl-xs'
                    }`}
                  >
                    {m.text}
                  </div>
                  <span className="text-[10px] text-[#AE7C53] mt-0.5 px-1">{m.time}</span>
                </div>
              ))}
            </div>

            {/* Input Bar */}
            <form
              onSubmit={handleSendMessage}
              className="p-3 border-t border-[#E8D9CD]/50 dark:border-[#3D2C26] flex items-center gap-2 bg-black/5 dark:bg-white/5"
            >
              <input
                type="text"
                placeholder="Type instructions for Priya..."
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                className="flex-1 px-3 py-2 text-xs rounded-xl border outline-none bg-transparent border-[#E8D9CD] dark:border-[#3D2C26]"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-[#AE7C53] text-white hover:bg-[#976841] transition-colors cursor-pointer"
              >
                <Send size={15} />
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
