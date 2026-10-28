import React, { useState } from 'react';
import {
  ArrowRight,
  Eye,
  EyeOff,
  Lock,
  Mail,
  User as UserIcon,
} from 'lucide-react';
import { BotanicalFlourish } from '../components/common/BotanicalFlourish';
import { Logo } from '../components/common/Logo';

interface LoginViewProps {
  onLoginSuccess: (email: string) => void;
  onNavigateToOnboarding: () => void;
  onNavigateToDashboard: () => void;
  isDarkMode: boolean;
}

export const LoginView: React.FC<LoginViewProps> = ({
  onLoginSuccess,
  onNavigateToOnboarding,
  onNavigateToDashboard,
  isDarkMode,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('kanika@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [name, setName] = useState('Kanika Suthar');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(email);
    }, 600);
  };

  const handleOAuth = (provider: string) => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      onLoginSuccess(`${provider.toLowerCase()}_user@homebite.com`);
    }, 600);
  };

  return (
    <div className={`min-h-[85vh] flex items-center justify-center p-4 select-none relative overflow-hidden transition-colors ${
      isDarkMode ? 'bg-[#18110E] text-[#FAF3EF]' : 'bg-[#FFFBF0] text-[#4B2E25]'
    }`}>
      {/* Background soft ambient gradient blobs */}
      <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full bg-[#DEB89D]/20 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-96 h-96 rounded-full bg-[#AE7C53]/15 blur-3xl pointer-events-none" />

      {/* Main Login Card - Exactly styled as Screen 2 in the user's screenshot */}
      <div className={`w-full max-w-[400px] rounded-[36px] border p-7 sm:p-9 shadow-xl relative overflow-hidden transition-all ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
          : 'bg-[#FFFBF0] border-[#EBDDD2] text-[#4B2E25]'
      }`}>
        {/* Soft corner curves mimicking the mobile mockup frame */}
        <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-bl from-[#DEB89D]/15 to-transparent rounded-bl-full pointer-events-none" />
        <div className="absolute bottom-0 right-0 w-28 h-20 bg-gradient-to-tl from-[#DEB89D]/20 to-transparent rounded-tl-full pointer-events-none" />

        {/* Top Brand Logo matching Screen 2 */}
        <div className="flex flex-col items-center justify-center text-center mb-6">
          <Logo size="lg" variant={isDarkMode ? 'light' : 'dark'} />
          <h2 className="text-2xl font-bold mt-3 tracking-tight text-[#4B2E25] dark:text-[#FFFBF0]">
            {isSignUp ? 'Create Account' : 'Welcome back!'}
          </h2>
          <p className="font-serif italic text-sm text-[#AE7C53] mt-0.5">
            Good food. Better days.
          </p>
        </div>

        {/* Password reset banner if clicked */}
        {forgotSent && (
          <div className="p-3.5 rounded-2xl bg-[#AE7C53]/15 text-center space-y-1.5 mb-5 border border-[#AE7C53]/30">
            <p className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
              Password Reset Link Sent!
            </p>
            <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D]">
              Instructions sent to <strong>{email}</strong>.
            </p>
            <button
              onClick={() => setForgotSent(false)}
              className="text-[11px] text-[#AE7C53] font-semibold underline cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        )}

        {/* Form Inputs matching Screen 2 */}
        <form onSubmit={handleSubmit} className="space-y-3.5 relative z-10">
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
                  className="w-full bg-transparent text-xs outline-none text-[#4B2E25] dark:text-[#FAF3EF] placeholder:text-[#AE7C53]/60"
                />
              </div>
            </div>
          )}

          {/* Email Address input matching Screen 2 */}
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
                className="w-full bg-transparent text-xs outline-none text-[#4B2E25] dark:text-[#FAF3EF] placeholder:text-[#AE7C53]/60"
              />
            </div>
          </div>

          {/* Password input matching Screen 2 */}
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
                className="w-full bg-transparent text-xs outline-none text-[#4B2E25] dark:text-[#FAF3EF] placeholder:text-[#AE7C53]/60"
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

          {/* Primary Action Button (Solid Dark Cocoa matching Screen 2) */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-3.5 rounded-2xl text-xs font-bold tracking-wide uppercase bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] shadow-md transition-all active:scale-98 cursor-pointer disabled:opacity-75 flex items-center justify-center gap-2 mt-4"
          >
            <span>{isLoading ? 'Signing in...' : isSignUp ? 'Create Account' : 'Log In'}</span>
            {!isLoading && <ArrowRight size={14} />}
          </button>

          {/* Forgot password link */}
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

        {/* "or" Divider matching Screen 2 */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8D9CD]/70 dark:border-[#3D2C26]" />
          </div>
          <span className="relative px-3 text-xs text-[#AE7C53] font-serif italic bg-[#FFFBF0] dark:bg-[#251B17]">
            or
          </span>
        </div>

        {/* Social Buttons matching Screen 2 */}
        <div className="space-y-2.5 relative z-10">
          {/* Continue with Google */}
          <button
            type="button"
            onClick={() => handleOAuth('Google')}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-3 transition-all hover:shadow-xs active:scale-98 cursor-pointer ${
              isDarkMode
                ? 'bg-[#1E1512] border-[#3D2C26] text-[#FAF3EF] hover:bg-[#2B1F1C]'
                : 'bg-white border-[#E8D9CD] text-[#4B2E25] hover:bg-black/2'
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

          {/* Continue with Apple */}
          <button
            type="button"
            onClick={() => handleOAuth('Apple')}
            className={`w-full py-3 px-4 rounded-2xl text-xs font-semibold border flex items-center justify-center gap-3 transition-all hover:shadow-xs active:scale-98 cursor-pointer ${
              isDarkMode
                ? 'bg-[#1E1512] border-[#3D2C26] text-[#FAF3EF] hover:bg-[#2B1F1C]'
                : 'bg-white border-[#E8D9CD] text-[#4B2E25] hover:bg-black/2'
            }`}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.67-.82 1.12-1.95 1-3.09-.97.04-2.14.65-2.83 1.46-.61.71-1.15 1.87-1 2.99 1.08.08 2.18-.55 2.83-1.36z"/>
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Bottom Switcher matching Screen 2 */}
        <div className="mt-6 text-center relative z-10">
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

        {/* Botanical sprig in bottom left corner matching Screen 2 */}
        <div className="absolute bottom-2 left-2 pointer-events-none">
          <BotanicalFlourish color={isDarkMode ? '#6F4E37' : '#DEB89D'} size={40} />
        </div>
      </div>
    </div>
  );
};
