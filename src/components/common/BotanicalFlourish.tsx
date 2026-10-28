import React from 'react';

interface BotanicalFlourishProps {
  className?: string;
  color?: string;
  size?: number;
}

export const BotanicalFlourish: React.FC<BotanicalFlourishProps> = ({
  className = '',
  color = '#AE7C53',
  size = 56,
}) => {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 64 64"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={`pointer-events-none select-none opacity-40 hover:opacity-60 transition-opacity ${className}`}
    >
      {/* Central curved stem */}
      <path
        d="M 12 56 C 24 50 36 38 48 12"
        stroke={color}
        strokeWidth="1.75"
        strokeLinecap="round"
      />
      {/* Leaves */}
      <path
        d="M 48 12 C 54 14 56 22 50 24 C 44 26 40 20 48 12 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 38 24 C 42 22 48 24 46 30 C 44 34 38 32 38 24 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 30 35 C 24 33 22 26 28 24 C 34 22 36 29 30 35 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      <path
        d="M 24 45 C 30 43 34 47 30 52 C 26 55 22 50 24 45 Z"
        stroke={color}
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
};
