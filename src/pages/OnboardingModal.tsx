import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronRight,
  Heart,
  Sparkles,
  User,
  Utensils,
  X,
} from 'lucide-react';
import { Logo } from '../components/common/Logo';
import { FOOD_IMAGES } from '../data/mockData';
import { UserProfile } from '../types';

interface OnboardingModalProps {
  isOpen: boolean;
  onClose: () => void;
  onComplete: (profile: Partial<UserProfile>) => void;
  initialUser: UserProfile;
  isDarkMode: boolean;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onClose,
  onComplete,
  initialUser,
  isDarkMode,
}) => {
  const [step, setStep] = useState<number>(0); // 0 = Splash, 1 = Step 1, 2 = Step 2, 3 = Step 3, 4 = Step 4, 5 = Done
  const [name, setName] = useState(initialUser.name);
  const [age, setAge] = useState(initialUser.age);
  const [gender, setGender] = useState(initialUser.gender);
  const [diet, setDiet] = useState(initialUser.dietaryPreference);
  const [allergies, setAllergies] = useState(initialUser.allergies.join(', '));
  const [religion, setReligion] = useState(initialUser.religionRestriction);
  const [fasting, setFasting] = useState(initialUser.fastingPreference);
  const [height, setHeight] = useState(initialUser.height);
  const [weight, setWeight] = useState(initialUser.weight);
  const [goal, setGoal] = useState(initialUser.healthGoal);
  const [budget, setBudget] = useState(initialUser.dailyBudget);
  const [spice, setSpice] = useState(initialUser.spiceLevel);
  const [workingHours, setWorkingHours] = useState(initialUser.workingHours);

  if (!isOpen) return null;

  const handleNext = () => {
    if (step < 4) {
      setStep(step + 1);
    } else {
      // Step 4 finished -> complete
      onComplete({
        name,
        age: Number(age),
        gender,
        dietaryPreference: diet,
        allergies: allergies ? allergies.split(',').map((s) => s.trim()) : [],
        religionRestriction: religion,
        fastingPreference: fasting,
        height,
        weight,
        healthGoal: goal,
        dailyBudget: budget,
        spiceLevel: spice,
        workingHours,
      });
      setStep(5);
      setTimeout(() => {
        onClose();
      }, 1500);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in select-none">
      <div className={`w-full max-w-md rounded-3xl border shadow-2xl relative overflow-hidden transition-all duration-300 ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
          : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
      }`}>
        {/* Close Button */}
        {step > 0 && (
          <button
            onClick={onClose}
            className="absolute top-5 right-5 p-1 rounded-full text-[#AE7C53] hover:bg-black/10 cursor-pointer z-20"
          >
            <X size={18} />
          </button>
        )}

        {/* STEP 0: Splash Screen (Matching Screen 1) */}
        {step === 0 && (
          <div className="p-8 text-center flex flex-col items-center justify-between min-h-[500px]">
            <div className="pt-4">
              <Logo size="xl" variant={isDarkMode ? 'light' : 'dark'} />
              <p className="font-serif italic text-sm text-[#AE7C53] mt-2">
                Healthy home food without daily planning.
              </p>
            </div>

            {/* Food Dish Image */}
            <div className="w-56 h-56 rounded-full overflow-hidden my-6 border-4 border-[#DEB89D] shadow-xl">
              <img
                src={FOOD_IMAGES.splash}
                alt="Wholesome meal"
                className="w-full h-full object-cover"
              />
            </div>

            <button
              onClick={() => setStep(1)}
              className="w-full py-4 rounded-2xl text-sm font-bold bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
            >
              <span>Get Started</span>
              <ArrowRight size={16} />
            </button>
          </div>
        )}

        {/* STEP 1: Tell us about yourself (Matching Screen 3) */}
        {step === 1 && (
          <div className="p-6 sm:p-8 space-y-5">
            {/* Stepper numbers 1-2-3-4-5 */}
            <div className="flex items-center justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center ${
                    i === 1
                      ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-white shadow-xs'
                      : 'bg-black/10 dark:bg-white/10 text-[#AE7C53]'
                  }`}
                >
                  {i}
                </span>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold">Tell us about yourself</h3>
              <p className="text-xs text-[#AE7C53] mt-0.5">
                Let&apos;s create a personalized meal plan for you.
              </p>
            </div>

            {/* Avatar illustration center */}
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-[#AE7C53] bg-[#FAF3EF] shadow-inner">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none bg-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Age
                </label>
                <input
                  type="number"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none bg-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Gender
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Female', 'Male', 'Other'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGender(g)}
                      className={`py-2.5 rounded-xl text-xs font-medium border transition-all ${
                        gender === g
                          ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-white border-transparent'
                          : 'border-[#E8D9CD] dark:border-[#3D2C26]'
                      }`}
                    >
                      {g}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <button
              onClick={handleNext}
              className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* STEP 2: Dietary Preferences (Matching Screen 4) */}
        {step === 2 && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center ${
                    i === 2
                      ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-white shadow-xs'
                      : i < 2
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black/10 dark:bg-white/10 text-[#AE7C53]'
                  }`}
                >
                  {i < 2 ? '✓' : i}
                </span>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold">Dietary Preferences</h3>
              <p className="text-xs text-[#AE7C53] mt-0.5">
                Help us plan meals that suit your lifestyle and beliefs.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Veg / Non-veg
                </label>
                <div className="grid grid-cols-2 gap-2">
                  {(['Veg', 'Non-veg'] as const).map((d) => (
                    <button
                      key={d}
                      type="button"
                      onClick={() => setDiet(d)}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        diet === d
                          ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-white border-transparent'
                          : 'border-[#E8D9CD] dark:border-[#3D2C26]'
                      }`}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Allergies (optional)
                </label>
                <input
                  type="text"
                  placeholder="e.g., nuts, dairy, gluten..."
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none bg-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Religion / Dietary Restrictions
                </label>
                <select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className={`w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none ${
                    isDarkMode ? 'bg-[#251B17]' : 'bg-[#FFFBF0]'
                  }`}
                >
                  <option value="None">None</option>
                  <option value="Hindu (No Beef)">Hindu (No Beef)</option>
                  <option value="Jain (No Onion / Garlic)">Jain (No Onion / Garlic)</option>
                  <option value="Halal">Halal</option>
                  <option value="Vaishnav">Vaishnav</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Fasting Preferences
                </label>
                <input
                  type="text"
                  placeholder="e.g., Ekadashi, Navratri, Tuesdays"
                  value={fasting}
                  onChange={(e) => setFasting(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(1)}
                className="py-3 px-4 rounded-xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 3: Your Health Goals (Matching Screen 5) */}
        {step === 3 && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center ${
                    i === 3
                      ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-white shadow-xs'
                      : i < 3
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black/10 dark:bg-white/10 text-[#AE7C53]'
                  }`}
                >
                  {i < 3 ? '✓' : i}
                </span>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold">Your Health Goals</h3>
              <p className="text-xs text-[#AE7C53] mt-0.5">
                This helps us plan the right nutrition balance for you.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Height
                </label>
                <select
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={`w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none ${
                    isDarkMode ? 'bg-[#251B17]' : 'bg-[#FFFBF0]'
                  }`}
                >
                  {["4'11\"", "5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "5'10\"", "6'0\""].map((h) => (
                    <option key={h} value={h}>{h}</option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Weight
                </label>
                <input
                  type="text"
                  value={weight}
                  onChange={(e) => setWeight(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none bg-transparent"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Primary Goal
                </label>
                <div className="space-y-2">
                  {(['Weight Loss', 'Muscle Gain', 'Maintain'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`w-full p-3 rounded-xl text-xs font-semibold border text-left transition-all flex items-center justify-between ${
                        goal === g
                          ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-white border-transparent'
                          : 'border-[#E8D9CD] dark:border-[#3D2C26]'
                      }`}
                    >
                      <span>{g}</span>
                      {goal === g && <Check size={14} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(2)}
                className="py-3 px-4 rounded-xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* STEP 4: More Details (Matching Screen 6) */}
        {step === 4 && (
          <div className="p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-center gap-3 mb-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <span
                  key={i}
                  className={`w-6 h-6 rounded-full text-xs font-mono font-bold flex items-center justify-center ${
                    i === 4
                      ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-white shadow-xs'
                      : i < 4
                        ? 'bg-emerald-600 text-white'
                        : 'bg-black/10 dark:bg-white/10 text-[#AE7C53]'
                  }`}
                >
                  {i < 4 ? '✓' : i}
                </span>
              ))}
            </div>

            <div className="text-center">
              <h3 className="text-xl font-bold">More Details</h3>
              <p className="text-xs text-[#AE7C53] mt-0.5">
                Just a few more details to calibrate your cook and budget.
              </p>
            </div>

            <div className="space-y-3.5">
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Daily Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={`w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none ${
                    isDarkMode ? 'bg-[#251B17]' : 'bg-[#FFFBF0]'
                  }`}
                >
                  <option value="₹ 800 - 1200">₹ 800 - 1200</option>
                  <option value="₹ 1500 - 2000">₹ 1500 - 2000</option>
                  <option value="₹ 2000 - 3000">₹ 2000 - 3000</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Spice Level
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {(['Mild', 'Medium', 'Spicy'] as const).map((sp) => (
                    <button
                      key={sp}
                      type="button"
                      onClick={() => setSpice(sp)}
                      className={`py-2.5 rounded-xl text-xs font-semibold border transition-all ${
                        spice === sp
                          ? 'bg-[#4B2E25] dark:bg-[#AE7C53] text-white border-transparent'
                          : 'border-[#E8D9CD] dark:border-[#3D2C26]'
                      }`}
                    >
                      {sp}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Working Hours
                </label>
                <input
                  type="text"
                  value={workingHours}
                  onChange={(e) => setWorkingHours(e.target.value)}
                  className="w-full p-3 rounded-xl border border-[#AE7C53]/40 text-xs outline-none bg-transparent"
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setStep(3)}
                className="py-3 px-4 rounded-xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53]"
              >
                Back
              </button>
              <button
                onClick={handleNext}
                className="flex-1 py-3 rounded-xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Generate Plan →</span>
              </button>
            </div>
          </div>
        )}

        {/* STEP 5: Success / Ready */}
        {step === 5 && (
          <div className="p-8 text-center space-y-4 py-12">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-600 dark:text-emerald-400 mx-auto flex items-center justify-center animate-bounce">
              <Sparkles size={32} />
            </div>
            <h3 className="text-2xl font-bold">Plan Personalized!</h3>
            <p className="text-xs text-[#AE7C53]">
              Assigning Chef Priya Sharma and loading your weekly breakfast, lunch, and dinner menus...
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
