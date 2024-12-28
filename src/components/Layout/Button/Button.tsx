import React from 'react';

interface ButtonProps {
  height?: string;
  width?: string;
  fontSize?: 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  fontColor?: string;
  className?: string;
  onClick?: React.MouseEventHandler<HTMLButtonElement>; 
  disabled?: boolean; // Add disabled prop
  children: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  height,
  width,
  fontSize = 'md',
  fontColor,
  className,
  onClick,
  disabled = false, // Default to false if not provided
  children,
}) => {
  const fontSizeClass = {
    sm: 'text-sm',
    md: 'text-md',
    lg: 'text-lg',
    xl: 'text-xl',
    '2xl': 'text-2xl',
  }[fontSize];

  return (
    <button
      style={{
        height: height || 'auto',
        width: width || 'auto',
      }}
      className={`${fontSizeClass} ${fontColor || ''} ${className || ''} px-4 py-2 rounded-md ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`} // Add styles for disabled button
      onClick={onClick}
      disabled={disabled} // Disable the button
    >
      {children}
    </button>
  );
};

export default Button;
 