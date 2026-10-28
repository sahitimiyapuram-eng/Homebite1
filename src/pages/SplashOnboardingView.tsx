import React, { useState } from 'react';
import {
  ArrowRight,
  Check,
  ChevronLeft,
  ChevronRight,
  Sparkles,
} from 'lucide-react';
import { BotanicalFlourish } from '../components/common/BotanicalFlourish';
import { Logo } from '../components/common/Logo';
import { FOOD_IMAGES } from '../data/mockData';
import { UserProfile } from '../types';

interface SplashOnboardingViewProps {
  initialUser: UserProfile;
  onComplete: (profile: Partial<UserProfile>) => void;
  onNavigateToLogin: () => void;
  isDarkMode: boolean;
}

export const SplashOnboardingView: React.FC<SplashOnboardingViewProps> = ({
  initialUser,
  onComplete,
  onNavigateToLogin,
  isDarkMode,
}) => {
  // Step 1 = Splash Screen, Step 2 = Tell us about yourself, Step 3 = Dietary, Step 4 = Goals, Step 5 = More Details
  const [currentStep, setCurrentStep] = useState<number>(1);
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

  const handleFinish = () => {
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
  };

  return (
    <div className={`min-h-[85vh] flex flex-col items-center justify-center p-4 select-none relative overflow-hidden transition-colors ${
      isDarkMode ? 'bg-[#18110E] text-[#FAF3EF]' : 'bg-[#FFFBF0] text-[#4B2E25]'
    }`}>
      {/* Background Ambience */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#DEB89D]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#AE7C53]/15 blur-3xl pointer-events-none" />

      {/* Screen Container matching Phone Mockup Cards in Screenshot */}
      <div className={`w-full max-w-[400px] rounded-[36px] border p-7 sm:p-9 shadow-xl relative overflow-hidden transition-all ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
          : 'bg-[#FFFBF0] border-[#EBDDD2] text-[#4B2E25]'
      }`}>
        {/* Decorative corner flourishes */}
        <div className="absolute top-2 right-2 pointer-events-none opacity-40">
          <BotanicalFlourish color="#AE7C53" size={38} />
        </div>
        <div className="absolute bottom-2 left-2 pointer-events-none opacity-40">
          <BotanicalFlourish color="#AE7C53" size={38} />
        </div>

        {/* SCREEN 1: SPLASH SCREEN (From Screenshot) */}
        {currentStep === 1 && (
          <div className="text-center flex flex-col items-center justify-between min-h-[520px]">
            <div className="pt-2">
              <Logo size="xl" variant={isDarkMode ? 'light' : 'dark'} />
              <p className="font-serif italic text-sm text-[#AE7C53] mt-2">
                Healthy home food without daily planning.
              </p>
            </div>

            {/* Food Platter Center matching Screenshot 1 */}
            <div className="w-60 h-60 rounded-full overflow-hidden my-6 border-4 border-[#DEB89D] shadow-2xl relative">
              <img
                src={FOOD_IMAGES.splash}
                alt="Healthy Home Cooked Meal"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="w-full space-y-3">
              <button
                onClick={() => setCurrentStep(2)}
                className="w-full py-4 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] shadow-lg transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Get Started</span>
                <ArrowRight size={15} />
              </button>

              <button
                onClick={onNavigateToLogin}
                className="w-full py-2.5 text-xs text-[#AE7C53] font-semibold hover:underline cursor-pointer"
              >
                Already have an account? Log In
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 2: ONBOARDING STEP 1 - Tell us about yourself (From Screenshot) */}
        {currentStep === 2 && (
          <div className="space-y-4">
            {/* Stepper dots */}
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

            {/* Avatar Circle matching Screenshot */}
            <div className="w-20 h-20 rounded-full overflow-hidden mx-auto border-2 border-[#AE7C53] shadow-md bg-[#FAF3EF]">
              <img
                src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=150&q=80"
                alt="Avatar"
                className="w-full h-full object-cover"
              />
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
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
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
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
                      className={`py-2.5 rounded-2xl text-xs font-medium border transition-all ${
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
              onClick={() => setCurrentStep(3)}
              className="w-full py-3.5 rounded-2xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-4"
            >
              <span>Next</span>
              <ArrowRight size={14} />
            </button>
          </div>
        )}

        {/* SCREEN 3: ONBOARDING STEP 2 - Dietary Preferences (From Screenshot) */}
        {currentStep === 3 && (
          <div className="space-y-4">
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
                Help us plan meals that suit your needs.
              </p>
            </div>

            <div className="space-y-3">
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
                      className={`py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
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
                  placeholder="e.g. nuts, dairy, etc."
                  value={allergies}
                  onChange={(e) => setAllergies(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Religion / Dietary restrictions
                </label>
                <select
                  value={religion}
                  onChange={(e) => setReligion(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#251B17] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
                >
                  <option value="None">None</option>
                  <option value="Hindu (No Beef)">Hindu (No Beef)</option>
                  <option value="Jain (No Onion / Garlic)">Jain (No Onion / Garlic)</option>
                  <option value="Halal">Halal</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Fasting preferences
                </label>
                <input
                  type="text"
                  placeholder="e.g. Ekadashi, Jain, etc."
                  value={fasting}
                  onChange={(e) => setFasting(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCurrentStep(2)}
                className="py-3 px-4 rounded-2xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53]"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(4)}
                className="flex-1 py-3 rounded-2xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 4: ONBOARDING STEP 3 - Your Health Goals (From Screenshot) */}
        {currentStep === 4 && (
          <div className="space-y-4">
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
                This helps us plan the right nutrition for you.
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Height
                </label>
                <select
                  value={height}
                  onChange={(e) => setHeight(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#251B17] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
                >
                  {["5'0\"", "5'1\"", "5'2\"", "5'3\"", "5'4\"", "5'5\"", "5'6\"", "5'7\"", "5'8\"", "5'9\"", "6'0\""].map((h) => (
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
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Goal
                </label>
                <div className="space-y-2">
                  {(['Weight Loss', 'Muscle Gain', 'Maintain'] as const).map((g) => (
                    <button
                      key={g}
                      type="button"
                      onClick={() => setGoal(g)}
                      className={`w-full p-3 rounded-2xl text-xs font-semibold border text-left transition-all flex items-center justify-between ${
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
                onClick={() => setCurrentStep(3)}
                className="py-3 px-4 rounded-2xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53]"
              >
                Back
              </button>
              <button
                onClick={() => setCurrentStep(5)}
                className="flex-1 py-3 rounded-2xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Next</span>
                <ArrowRight size={14} />
              </button>
            </div>
          </div>
        )}

        {/* SCREEN 5: ONBOARDING STEP 4 - More Details (From Screenshot) */}
        {currentStep === 5 && (
          <div className="space-y-4">
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
                Just a few more details...
              </p>
            </div>

            <div className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                  Daily Budget
                </label>
                <select
                  value={budget}
                  onChange={(e) => setBudget(e.target.value)}
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#251B17] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
                >
                  <option value="₹ 1500 - 2000">₹ 1500 - 2000</option>
                  <option value="₹ 800 - 1200">₹ 800 - 1200</option>
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
                      className={`py-2.5 rounded-2xl text-xs font-semibold border transition-all ${
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
                  className={`w-full px-4 py-3 rounded-2xl text-xs border outline-none ${
                    isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-white border-[#E8D9CD]'
                  }`}
                />
              </div>
            </div>

            <div className="flex gap-2 pt-2">
              <button
                onClick={() => setCurrentStep(4)}
                className="py-3 px-4 rounded-2xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53]"
              >
                Back
              </button>
              <button
                onClick={handleFinish}
                className="flex-1 py-3 rounded-2xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
              >
                <span>Save &amp; Go to Dashboard →</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
