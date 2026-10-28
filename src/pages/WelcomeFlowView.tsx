import React, { useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User as UserIcon,
} from 'lucide-react';
import { BotanicalFlourish } from '../components/common/BotanicalFlourish';
import { Logo } from '../components/common/Logo';
import { FOOD_IMAGES } from '../data/mockData';
import { UserProfile } from '../types';

interface WelcomeFlowViewProps {
  initialUser: UserProfile;
  onCompleteFlow: (profile: Partial<UserProfile>) => void;
  isDarkMode: boolean;
  stage: 'login' | 'onboarding';
  onboardingStep: number;
  onNavigateWelcome: (stage: 'login' | 'onboarding', step: number) => void;
  onBackToDashboard?: () => void;
}

export const WelcomeFlowView: React.FC<WelcomeFlowViewProps> = ({
  initialUser,
  onCompleteFlow,
  isDarkMode,
  stage,
  onboardingStep,
  onNavigateWelcome,
  onBackToDashboard,
}) => {
  // Login form state
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('kanika@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  // Onboarding profile state - storing age as string prevents input cursor jumping and digit dropping
  const [name, setName] = useState(initialUser.name || 'Kanika');
  const [age, setAge] = useState<string>(String(initialUser.age ?? '24'));
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

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onNavigateWelcome('onboarding', 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSocialLogin = (_provider: string) => {
    onNavigateWelcome('onboarding', 1);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSaveAndGoToDashboard = () => {
    // User requested: "and on the last page of this splah and onboard page i see save and go to dashboard just then it will get me to the main dashboard page"
    const parsedAge = parseInt(age, 10);
    onCompleteFlow({
      name: name.trim() || initialUser.name,
      age: !isNaN(parsedAge) && parsedAge > 0 ? parsedAge : initialUser.age,
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
    <div className={`min-h-screen flex items-center justify-center p-4 lg:p-8 transition-colors select-none ${
      isDarkMode ? 'bg-[#18110E] text-[#FAF3EF]' : 'bg-[#FFFBF0] text-[#4B2E25]'
    }`}>
      {stage === 'login' ? (
        /* ============================================================ */
        /* DESKTOP STYLE SPLIT VIEW: SPLASH IMAGE (LEFT) + LOGIN (RIGHT)*/
        /* (No "get started" button, no "scroll down" button)           */
        /* ============================================================ */
        <div className="w-full max-w-5xl rounded-[40px] border border-[#EBDDD2] dark:border-[#3D2C26] shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 bg-[#FFFBF0] dark:bg-[#251B17]">
          
          {/* LEFT COLUMN: The Exact Splash Image & Branding in Desktop Style */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-between items-center text-center relative overflow-hidden bg-gradient-to-br from-[#FAF3EF] to-[#F3E5D8] dark:from-[#211613] dark:to-[#1B110E] border-b lg:border-b-0 lg:border-r border-[#EBDDD2] dark:border-[#3D2C26]">
            {/* Corner botanical flourishes */}
            <div className="absolute top-6 left-6 pointer-events-none">
              <BotanicalFlourish color={isDarkMode ? '#6F4E37' : '#AE7C53'} size={48} />
            </div>
            <div className="absolute bottom-6 right-6 pointer-events-none">
              <BotanicalFlourish color={isDarkMode ? '#6F4E37' : '#AE7C53'} size={48} />
            </div>

            {/* Top Brand & Tagline */}
            <div className="relative z-10 pt-2">
              <Logo size="xl" variant={isDarkMode ? 'light' : 'dark'} />
              <p className="font-serif italic text-base sm:text-lg text-[#AE7C53] mt-3 tracking-wide">
                Healthy home food without daily planning.
              </p>
            </div>

            {/* The Wholesome Food Dish Image exactly from the mockup */}
            <div className="relative z-10 my-6 sm:my-8">
              <div className="w-64 h-64 sm:w-72 sm:h-72 rounded-full overflow-hidden border-4 border-[#DEB89D] shadow-2xl relative mx-auto group">
                <img
                  src={FOOD_IMAGES.splash}
                  alt="Healthy Home Cooked Meal"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out"
                />
              </div>
            </div>

            {/* Bottom Warm Subtitle & Features */}
            <div className="relative z-10 max-w-xs text-xs text-[#6F4E37] dark:text-[#DEB89D] leading-relaxed">
              <p className="font-medium">
                Wholesome home-cooked breakfast, lunch, and dinner prepared fresh by your neighborhood certified cook.
              </p>
            </div>
          </div>

          {/* RIGHT COLUMN: The Exact Login / Sign Up Page */}
          <div className="lg:col-span-6 p-8 sm:p-12 flex flex-col justify-center relative">
            {onBackToDashboard && (
              <div className="mb-4">
                <button
                  type="button"
                  onClick={onBackToDashboard}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#AE7C53] hover:text-[#4B2E25] dark:hover:text-[#FFFBF0] transition-colors cursor-pointer"
                >
                  <ArrowLeft size={14} />
                  <span>Back to Dashboard</span>
                </button>
              </div>
            )}

            {/* Top Header of Login Card */}
            <div className="text-center mb-6">
              <div className="inline-flex items-center justify-center lg:hidden mb-2">
                <Logo size="md" variant={isDarkMode ? 'light' : 'dark'} showText={false} />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-[#4B2E25] dark:text-[#FFFBF0]">
                {isSignUp ? 'Create your account' : 'Welcome back!'}
              </h2>
              <p className="font-serif italic text-sm text-[#AE7C53] mt-1">
                Good food. Better days.
              </p>
            </div>

            {/* Password Reset Alert */}
            {forgotSent && (
              <div className="p-3.5 rounded-2xl bg-[#AE7C53]/15 text-center space-y-1 mb-5 border border-[#AE7C53]/30">
                <p className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
                  Password Reset Link Sent!
                </p>
                <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D]">
                  Check your inbox at <strong>{email}</strong> for instructions.
                </p>
                <button
                  onClick={() => setForgotSent(false)}
                  className="text-[11px] text-[#AE7C53] underline font-medium cursor-pointer"
                >
                  Back to Log In
                </button>
              </div>
            )}

            {/* Login Form matching Screen 2 */}
            <form onSubmit={handleLoginSubmit} className="space-y-3.5 max-w-sm mx-auto w-full">
              {isSignUp && (
                <div>
                  <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all ${
                    isDarkMode
                      ? 'bg-[#1E1512] border-[#3D2C26] focus-within:border-[#AE7C53]'
                      : 'bg-white border-[#E8D9CD] focus-within:border-[#AE7C53] shadow-xs'
                  }`}>
                    <UserIcon size={17} className="text-[#AE7C53] shrink-0" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Full name"
                      className="w-full bg-transparent text-xs outline-none text-[#4B2E25] dark:text-[#FAF3EF]"
                    />
                  </div>
                </div>
              )}

              {/* Email Input */}
              <div>
                <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all ${
                  isDarkMode
                    ? 'bg-[#1E1512] border-[#3D2C26] focus-within:border-[#AE7C53]'
                    : 'bg-white border-[#E8D9CD] focus-within:border-[#AE7C53] shadow-xs'
                }`}>
                  <Mail size={17} className="text-[#AE7C53] shrink-0" />
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Email address"
                    className="w-full bg-transparent text-xs outline-none text-[#4B2E25] dark:text-[#FAF3EF]"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div>
                <div className={`flex items-center gap-3 px-4 py-3.5 rounded-2xl border transition-all ${
                  isDarkMode
                    ? 'bg-[#1E1512] border-[#3D2C26] focus-within:border-[#AE7C53]'
                    : 'bg-white border-[#E8D9CD] focus-within:border-[#AE7C53] shadow-xs'
                }`}>
                  <Lock size={17} className="text-[#AE7C53] shrink-0" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full bg-transparent text-xs outline-none text-[#4B2E25] dark:text-[#FAF3EF]"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="text-[#AE7C53] hover:text-[#4B2E25] dark:hover:text-[#FFFBF0] transition-colors cursor-pointer"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>

              {/* Log In Button (Solid Dark Cocoa) */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2 mt-4"
              >
                <span>{isSignUp ? 'Create Account' : 'Log In'}</span>
                <ArrowRight size={14} />
              </button>

              {/* Forgot Password Link */}
              {!isSignUp && (
                <div className="text-center pt-1">
                  <button
                    type="button"
                    onClick={() => setForgotSent(true)}
                    className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D] hover:text-[#AE7C53] transition-colors cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>
              )}
            </form>

            {/* "or" Divider */}
            <div className="relative my-5 max-w-sm mx-auto w-full text-center">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#E8D9CD]/70 dark:border-[#3D2C26]" />
              </div>
              <span className="relative px-3 text-xs text-[#AE7C53] font-serif italic bg-[#FFFBF0] dark:bg-[#251B17]">
                or
              </span>
            </div>

            {/* Social Logins matching Screen 2 */}
            <div className="space-y-2.5 max-w-sm mx-auto w-full">
              <button
                type="button"
                onClick={() => handleSocialLogin('Google')}
                className={`w-full py-3 px-4 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-3 transition-all hover:shadow-xs active:scale-98 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1E1512] border-[#3D2C26] text-[#FAF3EF] hover:bg-[#2B1F1C]'
                    : 'bg-white border-[#E8D9CD] text-[#4B2E25] hover:bg-black/2 shadow-xs'
                }`}
              >
                <svg width="17" height="17" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
                  <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
                  <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
                  <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                onClick={() => handleSocialLogin('Apple')}
                className={`w-full py-3 px-4 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-3 transition-all hover:shadow-xs active:scale-98 cursor-pointer ${
                  isDarkMode
                    ? 'bg-[#1E1512] border-[#3D2C26] text-[#FAF3EF] hover:bg-[#2B1F1C]'
                    : 'bg-white border-[#E8D9CD] text-[#4B2E25] hover:bg-black/2 shadow-xs'
                }`}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.67-.82 1.12-1.95 1-3.09-.97.04-2.14.65-2.83 1.46-.61.71-1.15 1.87-1 2.99 1.08.08 2.18-.55 2.83-1.36z"/>
                </svg>
                <span>Continue with Apple</span>
              </button>
            </div>

            {/* Bottom Toggle between Sign In and Sign Up */}
            <div className="mt-6 text-center">
              <p className="text-xs text-[#6F4E37] dark:text-[#DEB89D]">
                {isSignUp ? 'Already have an account? ' : "Don't have an account? "}
                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="text-[#AE7C53] font-bold hover:underline cursor-pointer"
                >
                  {isSignUp ? 'Log In' : 'Sign Up'}
                </button>
              </p>
            </div>
          </div>

        </div>
      ) : (
        /* ============================================================ */
        /* STAGE 2: ONBOARDING STEPS (TRIGGERED AFTER CLICKING LOGIN)   */
        /* ============================================================ */
        <div className="w-full max-w-[440px] rounded-[36px] border border-[#EBDDD2] dark:border-[#3D2C26] p-7 sm:p-9 shadow-2xl relative overflow-hidden transition-all bg-[#FFFBF0] dark:bg-[#251B17]">
          
          {/* STEP 1: Tell us about yourself (Matching Screen 3) */}
          {onboardingStep === 1 && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                {[1, 2, 3, 4].map((i) => (
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

              <div className="space-y-3">
                <div>
                  <label className="block text-xs font-bold text-[#AE7C53] uppercase mb-1">
                    Full Name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Enter your name"
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
                    type="text"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    value={age}
                    onChange={(e) => {
                      const val = e.target.value.replace(/[^0-9]/g, '');
                      setAge(val);
                    }}
                    placeholder="e.g. 20"
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

              {/* Navigation: Back to Login / Splash & Next to Step 2 */}
              <div className="flex gap-2 pt-2 mt-4">
                <button
                  type="button"
                  onClick={() => onNavigateWelcome('login', 1)}
                  className="py-3 px-5 rounded-2xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53] hover:bg-[#AE7C53]/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateWelcome('onboarding', 2)}
                  className="flex-1 py-3.5 rounded-2xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 2: Dietary Preferences (Matching Screen 4) */}
          {onboardingStep === 2 && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                {[1, 2, 3, 4].map((i) => (
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
                      isDarkMode ? 'bg-[#251B17]' : 'bg-white border-[#E8D9CD]'
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
                  type="button"
                  onClick={() => onNavigateWelcome('onboarding', 1)}
                  className="py-3 px-5 rounded-2xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53] hover:bg-[#AE7C53]/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateWelcome('onboarding', 3)}
                  className="flex-1 py-3 rounded-2xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 3: Your Health Goals (Matching Screen 5) */}
          {onboardingStep === 3 && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                {[1, 2, 3, 4].map((i) => (
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
                      isDarkMode ? 'bg-[#251B17]' : 'bg-white border-[#E8D9CD]'
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
                  type="button"
                  onClick={() => onNavigateWelcome('onboarding', 2)}
                  className="py-3 px-5 rounded-2xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53] hover:bg-[#AE7C53]/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>
                <button
                  type="button"
                  onClick={() => onNavigateWelcome('onboarding', 4)}
                  className="flex-1 py-3 rounded-2xl text-xs font-bold bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Next</span>
                  <ArrowRight size={14} />
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: More Details (Matching Screen 6) -> SAVE & GO TO DASHBOARD BUTTON */}
          {onboardingStep === 4 && (
            <div className="space-y-4">
              <div className="flex items-center justify-center gap-3 mb-2">
                {[1, 2, 3, 4].map((i) => (
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
                      isDarkMode ? 'bg-[#251B17]' : 'bg-white border-[#E8D9CD]'
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
                  type="button"
                  onClick={() => onNavigateWelcome('onboarding', 3)}
                  className="py-3 px-5 rounded-2xl text-xs font-semibold border border-[#AE7C53] text-[#AE7C53] hover:bg-[#AE7C53]/10 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                >
                  <ArrowLeft size={14} />
                  <span>Back</span>
                </button>

                {/* EXACT REQUESTED BUTTON: "Save & Go to Dashboard →" */}
                <button
                  type="button"
                  onClick={handleSaveAndGoToDashboard}
                  className="flex-1 py-3.5 rounded-2xl text-xs font-bold uppercase tracking-wider bg-[#4B2E25] dark:bg-[#AE7C53] text-white hover:opacity-90 shadow-md transition-all active:scale-98 cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>Save &amp; Go to Dashboard</span>
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          )}

        </div>
      )}
    </div>
  );
};
