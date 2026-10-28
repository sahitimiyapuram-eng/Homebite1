import React, { useState, useEffect } from 'react';
import {
  Bell,
  Check,
  ChevronRight,
  Download,
  Flame,
  Heart,
  HelpCircle,
  LogOut,
  Moon,
  RotateCcw,
  Settings,
  ShieldCheck,
  Sparkles,
  Sun,
  User,
  Utensils,
  X,
} from 'lucide-react';
import { UserProfile } from '../types';
import { useBrowserBackModal } from '../hooks/useBrowserBackModal';

interface ProfileViewProps {
  user: UserProfile;
  onUpdateUser: (updated: Partial<UserProfile>) => void;
  isDarkMode: boolean;
  onToggleTheme: () => void;
  onOpenOnboarding: () => void;
  onOpenLogin: () => void;
}

export const ProfileView: React.FC<ProfileViewProps> = ({
  user,
  onUpdateUser,
  isDarkMode,
  onToggleTheme,
  onOpenOnboarding,
  onOpenLogin,
}) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [tempName, setTempName] = useState(user.name);
  const [tempAge, setTempAge] = useState<string>(String(user.age));
  const [tempDiet, setTempDiet] = useState(user.dietaryPreference);
  const [tempGoal, setTempGoal] = useState(user.healthGoal);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);

  // Sync inputs whenever modal opens or user updates
  useEffect(() => {
    if (activeModal === 'personal') {
      setTempName(user.name);
      setTempAge(String(user.age));
    }
  }, [activeModal, user.name, user.age]);

  // Close profile edit modals on browser Back button
  useBrowserBackModal(Boolean(activeModal), () => setActiveModal(null), 'profile-modal');

  const handleSavePersonalInfo = (e: React.FormEvent) => {
    e.preventDefault();
    const parsedAge = parseInt(tempAge, 10);
    onUpdateUser({
      name: tempName.trim() || user.name,
      age: !isNaN(parsedAge) && parsedAge > 0 ? parsedAge : user.age,
    });
    setActiveModal(null);
  };

  const handleSaveDietary = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ dietaryPreference: tempDiet });
    setActiveModal(null);
  };

  const handleSaveGoal = (e: React.FormEvent) => {
    e.preventDefault();
    onUpdateUser({ healthGoal: tempGoal });
    setActiveModal(null);
  };

  const downloadZip = () => {
    const link = document.createElement('a');
    link.href = '/Homebite_complete_app.zip';
    link.download = 'Homebite_complete_app.zip';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6 max-w-2xl mx-auto">
      {/* Profile Header matching Screen 14 */}
      <div className={`p-6 sm:p-8 rounded-3xl border transition-colors flex items-center gap-5 ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        <div className="w-20 h-20 rounded-3xl overflow-hidden border-2 border-[#AE7C53] bg-[#FFFBF0] shrink-0 shadow-md">
          <img
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=300&q=80"
            alt={user.name}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 truncate">
          <h2 className="text-xl sm:text-2xl font-bold text-[#4B2E25] dark:text-[#FFFBF0] truncate">
            {user.name}
          </h2>
          <p className="text-xs text-[#AE7C53] truncate mt-0.5">
            {user.email}
          </p>
          <div className="flex items-center gap-2 mt-2">
            <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
              Active Member
            </span>
            <span className="text-xs text-[#6F4E37] dark:text-[#DEB89D] font-mono">
              Age {user.age} · {user.weight}
            </span>
          </div>
        </div>
      </div>

      {/* Menu List matching Screen 14 */}
      <div className={`p-4 rounded-3xl border transition-colors divide-y divide-[#E8D9CD]/50 dark:divide-[#3D2C26] ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26]'
          : 'bg-[#FAF3EF] border-[#E8D9CD]'
      }`}>
        {/* 1. Personal Information */}
        <button
          onClick={() => setActiveModal('personal')}
          className="w-full py-3.5 px-3 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
              <User size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#4B2E25] dark:text-[#FFFBF0]">
                Personal Information
              </p>
              <p className="text-[11px] text-[#AE7C53]">
                Name, age, gender, contact details
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#AE7C53] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 2. Dietary Preferences */}
        <button
          onClick={() => setActiveModal('diet')}
          className="w-full py-3.5 px-3 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
              <Utensils size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#4B2E25] dark:text-[#FFFBF0]">
                Dietary Preferences
              </p>
              <p className="text-[11px] text-[#AE7C53]">
                {user.dietaryPreference} · Spice: {user.spiceLevel} · Fasting: {user.fastingPreference}
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#AE7C53] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 3. Health Goals */}
        <button
          onClick={() => setActiveModal('goals')}
          className="w-full py-3.5 px-3 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
              <Heart size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#4B2E25] dark:text-[#FFFBF0]">
                Health Goals
              </p>
              <p className="text-[11px] text-[#AE7C53]">
                {user.healthGoal} · Target: 1,850 kcal/day
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#AE7C53] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 4. Subscription Plan */}
        <div className="w-full py-3.5 px-3 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/15 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
              <ShieldCheck size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#4B2E25] dark:text-[#FFFBF0]">
                Subscription Plan
              </p>
              <p className="text-[11px] text-[#AE7C53]">
                Active - Monthly · Renews 24 Nov
              </p>
            </div>
          </div>
          <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-emerald-500/15 text-emerald-700 dark:text-emerald-400">
            Active
          </span>
        </div>

        {/* 5. Notifications */}
        <div className="w-full py-3.5 px-3 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
              <Bell size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#4B2E25] dark:text-[#FFFBF0]">
                Notifications
              </p>
              <p className="text-[11px] text-[#AE7C53]">
                Daily cook updates and grocery reminders
              </p>
            </div>
          </div>
          <button
            onClick={() => setNotificationsEnabled(!notificationsEnabled)}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              notificationsEnabled ? 'bg-[#AE7C53]' : 'bg-black/20 dark:bg-white/20'
            }`}
          >
            <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
              notificationsEnabled ? 'left-5.5' : 'left-0.5'
            }`} />
          </button>
        </div>

        {/* 6. Dark Mode (Matching Screen 14) */}
        <div className="w-full py-3.5 px-3 flex items-center justify-between">
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
              {isDarkMode ? <Moon size={16} /> : <Sun size={16} />}
            </div>
            <div>
              <p className="text-sm font-semibold text-[#4B2E25] dark:text-[#FFFBF0]">
                Dark Mode
              </p>
              <p className="text-[11px] text-[#AE7C53]">
                Warm espresso theme for low-light evenings
              </p>
            </div>
          </div>
          <button
            onClick={onToggleTheme}
            className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
              isDarkMode ? 'bg-[#AE7C53]' : 'bg-black/20 dark:bg-white/20'
            }`}
          >
            <span className={`w-5 h-5 rounded-full bg-white absolute top-0.5 transition-transform ${
              isDarkMode ? 'left-5.5' : 'left-0.5'
            }`} />
          </button>
        </div>

        {/* 7. Settings / Re-run Onboarding */}
        <button
          onClick={onOpenOnboarding}
          className="w-full py-3.5 px-3 flex items-center justify-between text-left hover:bg-black/5 dark:hover:bg-white/5 rounded-xl transition-colors cursor-pointer group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-[#AE7C53]/15 text-[#AE7C53] flex items-center justify-center">
              <Sparkles size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold text-[#4B2E25] dark:text-[#FFFBF0]">
                Re-Run Onboarding Setup
              </p>
              <p className="text-[11px] text-[#AE7C53]">
                Change height, weight, daily budget, or dietary goals
              </p>
            </div>
          </div>
          <ChevronRight size={16} className="text-[#AE7C53] group-hover:translate-x-0.5 transition-transform" />
        </button>

        {/* 8. Logout (Matching Screen 14) */}
        <button
          onClick={onOpenLogin}
          className="w-full py-3.5 px-3 flex items-center justify-between text-left hover:bg-rose-500/10 rounded-xl transition-colors cursor-pointer text-rose-600 dark:text-rose-400 group"
        >
          <div className="flex items-center gap-3.5">
            <div className="w-8 h-8 rounded-lg bg-rose-500/15 flex items-center justify-center">
              <LogOut size={16} />
            </div>
            <div>
              <p className="text-sm font-semibold">Logout</p>
              <p className="text-[11px] opacity-80">Sign in as another user</p>
            </div>
          </div>
          <ChevronRight size={16} className="group-hover:translate-x-0.5 transition-transform" />
        </button>
      </div>

      {/* VS Code Download Card */}
      <div className={`p-6 rounded-3xl border border-[#AE7C53]/50 transition-colors flex flex-col sm:flex-row items-center justify-between gap-4 ${
        isDarkMode
          ? 'bg-[#1E1512] text-[#FAF3EF]'
          : 'bg-[#FFFBF0] text-[#4B2E25]'
      }`}>
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-2xl bg-[#AE7C53] text-white flex items-center justify-center shrink-0 shadow-sm">
            <Download size={22} />
          </div>
          <div>
            <h4 className="text-sm font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
              Download Complete Project (.ZIP)
            </h4>
            <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D] mt-0.5">
              Ready to extract and run in VS Code with <code className="px-1 py-0.5 rounded bg-black/10 dark:bg-white/10 font-mono">npm run dev</code>
            </p>
          </div>
        </div>

        <button
          onClick={downloadZip}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl text-xs font-bold bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] transition-all shadow-md active:scale-98 cursor-pointer shrink-0 flex items-center justify-center gap-2"
        >
          <Download size={15} />
          <span>Download Zip</span>
        </button>
      </div>

      {/* Edit Personal Info Modal */}
      {activeModal === 'personal' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl relative ${
            isDarkMode ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]' : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
          }`}>
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 p-1 text-[#AE7C53] cursor-pointer">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold mb-4">Edit Personal Information</h3>
            <form onSubmit={handleSavePersonalInfo} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">Full Name</label>
                <input
                  type="text"
                  value={tempName}
                  onChange={(e) => setTempName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none bg-transparent"
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">Age</label>
                <input
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]*"
                  value={tempAge}
                  onChange={(e) => setTempAge(e.target.value.replace(/[^0-9]/g, ''))}
                  placeholder="e.g. 20"
                  className="w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none bg-transparent"
                />
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold bg-[#AE7C53] text-white hover:bg-[#976841] transition-colors cursor-pointer"
              >
                Save Changes
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Dietary Modal */}
      {activeModal === 'diet' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl relative ${
            isDarkMode ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]' : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
          }`}>
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 p-1 text-[#AE7C53] cursor-pointer">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold mb-4">Update Dietary Preference</h3>
            <form onSubmit={handleSaveDietary} className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
                {(['Veg', 'Non-veg', 'Eggetarian', 'Vegan'] as const).map((pref) => (
                  <button
                    key={pref}
                    type="button"
                    onClick={() => setTempDiet(pref)}
                    className={`p-3 rounded-xl text-xs font-semibold border transition-all ${
                      tempDiet === pref ? 'bg-[#AE7C53] text-white border-[#AE7C53]' : 'border-[#E8D9CD] dark:border-[#3D2C26]'
                    }`}
                  >
                    {pref}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold bg-[#AE7C53] text-white hover:bg-[#976841] transition-colors cursor-pointer"
              >
                Update Preference
              </button>
            </form>
          </div>
        </div>
      )}

      {/* Edit Goal Modal */}
      {activeModal === 'goals' && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-xs animate-in fade-in">
          <div className={`w-full max-w-md rounded-3xl border p-6 shadow-2xl relative ${
            isDarkMode ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]' : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
          }`}>
            <button onClick={() => setActiveModal(null)} className="absolute top-5 right-5 p-1 text-[#AE7C53] cursor-pointer">
              <X size={18} />
            </button>
            <h3 className="text-lg font-bold mb-4">Select Health Goal</h3>
            <form onSubmit={handleSaveGoal} className="space-y-4">
              <div className="space-y-2">
                {(['Weight Loss', 'Muscle Gain', 'Maintain', 'Manage Diabetes'] as const).map((goal) => (
                  <button
                    key={goal}
                    type="button"
                    onClick={() => setTempGoal(goal)}
                    className={`w-full p-3 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between ${
                      tempGoal === goal ? 'bg-[#AE7C53] text-white border-[#AE7C53]' : 'border-[#E8D9CD] dark:border-[#3D2C26]'
                    }`}
                  >
                    <span>{goal}</span>
                    {tempGoal === goal && <Check size={14} />}
                  </button>
                ))}
              </div>
              <button
                type="submit"
                className="w-full py-3 rounded-xl text-xs font-bold bg-[#AE7C53] text-white hover:bg-[#976841] transition-colors cursor-pointer"
              >
                Update Goal
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
