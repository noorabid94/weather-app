import React from "react";

interface CardProps {
  children: React.ReactNode;
  className?: string;
}

// Named exports
export const Card: React.FC<CardProps> = ({ children, className }) => {
  return (
    <div className={`p-6 bg-gray-800 text-center rounded-lg shadow-lg ${className}`}>
      {children}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return <div className="p-2">{children}</div>;
};
