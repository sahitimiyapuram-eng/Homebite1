import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  variant?: 'light' | 'dark' | 'cream';
  showText?: boolean;
}

export const Logo: React.FC<LogoProps> = ({
  className = '',
  size = 'md',
  variant = 'dark',
  showText = true,
}) => {
  const iconSizes = {
    sm: 'w-7 h-7',
    md: 'w-9 h-9',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const textSizes = {
    sm: 'text-base font-semibold',
    md: 'text-xl font-bold tracking-tight',
    lg: 'text-2xl font-bold tracking-tight',
    xl: 'text-3xl font-extrabold tracking-tight',
  };

  const colors = {
    dark: {
      stroke: '#4B2E25',
      text: 'text-[#4B2E25]',
    },
    light: {
      stroke: '#FFFBF0',
      text: 'text-[#FFFBF0]',
    },
    cream: {
      stroke: '#AE7C53',
      text: 'text-[#AE7C53]',
    },
  };

  const current = colors[variant];

  return (
    <div className={`inline-flex items-center gap-2.5 select-none ${className}`}>
      {/* House outline with fork and spoon inside + sprout leaf */}
      <div className={`relative flex items-center justify-center shrink-0 ${iconSizes[size]}`}>
        <svg
          viewBox="0 0 48 48"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
          className="w-full h-full"
        >
          {/* House Roof and Walls */}
          <path
            d="M 24 6 L 8 19 L 8 40 C 8 41.1 8.9 42 10 42 L 38 42 C 39.1 42 40 41.1 40 40 L 40 19 Z"
            stroke={current.stroke}
            strokeWidth="2.75"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Botanical leaf sprouting on top right corner */}
          <path
            d="M 33 13 C 37 10 42 10 44 8 C 44 11 43 15 39 17 C 42 18 44 21 44 24 C 41 23 38 21 36 18"
            stroke={current.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Fork inside house */}
          <path
            d="M 18 24 V 36 M 15 24 V 28 C 15 29.5 16.5 30.5 18 30.5 C 19.5 30.5 21 29.5 21 28 V 24"
            stroke={current.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          {/* Spoon inside house */}
          <path
            d="M 29 28.5 V 36 M 26 25 C 26 23.3 27.3 22 29 22 C 30.7 22 32 23.3 32 25 C 32 27.2 30.7 28.5 29 28.5 C 27.3 28.5 26 27.2 26 25 Z"
            stroke={current.stroke}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {showText && (
        <span className={`font-['Poppins'] ${textSizes[size]} ${current.text}`}>
          Homebite
        </span>
      )}
    </div>
  );
};
