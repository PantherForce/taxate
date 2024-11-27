import React from "react";

interface TextProps {
  fontSize: "sm" | "md" | "lg" | "xl" | "2xl";
  fontColor?: string;
  className?: string;
  children: React.ReactNode;
}

const Text: React.FC<TextProps> = ({
  fontSize,
  fontColor,
  className,
  children,
}) => {
  const fontSizeClass = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-lg md:text-xl",
    xl: "text-lg md:text-2xl",
    "2xl": "text-2xl",
  }[fontSize];

  return (
    <p className={`${fontSizeClass} ${fontColor || ""} ${className || ""}`}>
      {children}
    </p>
  );
};

export default Text;
