// ContentContainer.tsx

import React, { ReactNode } from "react";

interface ContentContainerProps {
  children: ReactNode;
  className?: string; // Optional custom classes for customization
}

const ContentContainer: React.FC<ContentContainerProps> = ({
  children,
  className,
}) => {
  return (
    <div className={`p-4 md:p-8 lg:p-10 xl:p-12 ${className}`}>{children}</div>
  );
};

export default ContentContainer;
