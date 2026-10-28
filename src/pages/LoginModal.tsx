import React, { useState } from 'react';
import {
  Eye,
  EyeOff,
  Lock,
  Mail,
  Sparkles,
  X,
} from 'lucide-react';
import { Logo } from '../components/common/Logo';

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLoginSuccess: (email: string) => void;
  isDarkMode: boolean;
}

export const LoginModal: React.FC<LoginModalProps> = ({
  isOpen,
  onClose,
  onLoginSuccess,
  isDarkMode,
}) => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [email, setEmail] = useState('kanika@gmail.com');
  const [password, setPassword] = useState('••••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [forgotSent, setForgotSent] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onLoginSuccess(email);
    onClose();
  };

  const handleOAuth = (provider: string) => {
    onLoginSuccess(`${provider.toLowerCase()}@user.com`);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-xs animate-in fade-in select-none">
      <div className={`w-full max-w-md rounded-3xl border shadow-2xl relative p-6 sm:p-8 transition-colors ${
        isDarkMode
          ? 'bg-[#251B17] border-[#3D2C26] text-[#FAF3EF]'
          : 'bg-[#FFFBF0] border-[#E8D9CD] text-[#4B2E25]'
      }`}>
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-1 rounded-full text-[#AE7C53] hover:bg-black/10 cursor-pointer"
        >
          <X size={18} />
        </button>

        {/* Logo and title matching Screen 2 */}
        <div className="text-center mb-6">
          <Logo size="lg" variant={isDarkMode ? 'light' : 'dark'} />
          <h2 className="text-xl font-bold mt-3">
            {isSignUp ? 'Create your account' : 'Welcome back!'}
          </h2>
          <p className="font-serif italic text-xs text-[#AE7C53] mt-0.5">
            Good food. Better days.
          </p>
        </div>

        {forgotSent ? (
          <div className="p-4 rounded-2xl bg-[#AE7C53]/15 text-center space-y-2 mb-4">
            <p className="text-xs font-bold text-[#4B2E25] dark:text-[#FFFBF0]">
              Password Reset Link Sent!
            </p>
            <p className="text-[11px] text-[#6F4E37] dark:text-[#DEB89D]">
              Check your inbox at <strong>{email}</strong> for instructions.
            </p>
            <button
              onClick={() => setForgotSent(false)}
              className="text-xs text-[#AE7C53] underline font-medium cursor-pointer"
            >
              Back to Sign In
            </button>
          </div>
        ) : null}

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-1">
              Email Address
            </label>
            <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
              isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-white/80 border-[#E8D9CD]'
            }`}>
              <Mail size={16} className="text-[#AE7C53]" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="kanika@gmail.com"
                className="w-full bg-transparent text-xs outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-[#AE7C53] mb-1">
              Password
            </label>
            <div className={`flex items-center gap-2.5 p-3 rounded-xl border ${
              isDarkMode ? 'bg-[#1E1512] border-[#3D2C26]' : 'bg-white/80 border-[#E8D9CD]'
            }`}>
              <Lock size={16} className="text-[#AE7C53]" />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="w-full bg-transparent text-xs outline-none"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="text-[#AE7C53] hover:text-[#4B2E25] cursor-pointer"
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <div className="flex items-center justify-between text-xs">
            <button
              type="button"
              onClick={() => setForgotSent(true)}
              className="text-[#AE7C53] hover:underline cursor-pointer"
            >
              Forgot password?
            </button>
          </div>

          {/* Primary Action Button matching Screen 2 */}
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl text-xs font-bold bg-[#4B2E25] hover:bg-[#38221B] text-[#FFFBF0] dark:bg-[#AE7C53] dark:hover:bg-[#976841] shadow-md transition-all active:scale-98 cursor-pointer uppercase tracking-wider"
          >
            {isSignUp ? 'Create Account' : 'Log In'}
          </button>
        </form>

        {/* Divider */}
        <div className="relative my-5 text-center">
          <div className="absolute inset-0 flex items-center">
            <div className="w-full border-t border-[#E8D9CD]/50 dark:border-[#3D2C26]" />
          </div>
          <span className="relative px-3 text-xs text-[#AE7C53] bg-[#FFFBF0] dark:bg-[#251B17]">
            or
          </span>
        </div>

        {/* Social Buttons matching Screen 2 */}
        <div className="space-y-2.5">
          <button
            type="button"
            onClick={() => handleOAuth('Google')}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2.5 transition-all hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer ${
              isDarkMode ? 'border-[#3D2C26]' : 'border-[#E8D9CD]'
            }`}
          >
            {/* Google G icon */}
            <svg width="16" height="16" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.82-2.4 3.68v3.05h3.88c2.27-2.09 3.665-5.17 3.665-9.17z"/>
              <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.25v3.15C3.26 21.36 7.33 24 12 24z"/>
              <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.25C.45 8.18 0 9.98 0 12s.45 3.82 1.25 5.42l4.03-3.15z"/>
              <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.25 6.58l4.03 3.15c.95-2.83 3.6-4.98 6.72-4.98z"/>
            </svg>
            <span>Continue with Google</span>
          </button>

          <button
            type="button"
            onClick={() => handleOAuth('Apple')}
            className={`w-full py-2.5 px-4 rounded-xl text-xs font-semibold border flex items-center justify-center gap-2.5 transition-all hover:bg-black/5 dark:hover:bg-white/5 cursor-pointer ${
              isDarkMode ? 'border-[#3D2C26]' : 'border-[#E8D9CD]'
            }`}
          >
            {/* Apple Icon */}
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
              <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M15.97 6.89c.67-.82 1.12-1.95 1-3.09-.97.04-2.14.65-2.83 1.46-.61.71-1.15 1.87-1 2.99 1.08.08 2.18-.55 2.83-1.36z"/>
            </svg>
            <span>Continue with Apple</span>
          </button>
        </div>

        {/* Toggle between Login and Signup matching Screen 2 */}
        <div className="mt-5 text-center">
          <button
            type="button"
            onClick={() => setIsSignUp(!isSignUp)}
            className="text-xs text-[#AE7C53] hover:underline cursor-pointer font-medium"
          >
            {isSignUp
              ? 'Already have an account? Log In'
              : "Don't have an account? Sign Up"}
          </button>
        </div>
      </div>
    </div>
  );
};
