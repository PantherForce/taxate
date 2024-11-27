import React from "react";

interface HeadingProps {
  fontSize: "sm" | "md" | "lg" | "xl" | "2xl";
  fontColor?: string;
  className?: string;
  children: React.ReactNode;
}

const Heading: React.FC<HeadingProps> = ({
  fontSize,
  fontColor,
  className,
  children,
}) => {
  const fontSizeClass = {
    sm: "text-sm",
    md: "text-md",
    lg: "text-2xl",
    xl: "text-2xl md:text-4xl ",
    "2xl": "text-3xl",
  }[fontSize];

  return (
    <h2 className={`${fontSizeClass} ${fontColor || ""} ${className || ""}`}>
      {children}
    </h2>
  );
};

export default Heading;
