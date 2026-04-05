"use client";

import React from "react";

interface DashboardCardProps {
  label: string;
  value?: string | number;
  icon?: string;
  onClick?: () => void;
  children?: React.ReactNode;
  className?: string;
}

export const DashboardCard = ({
  label,
  value,
  icon,
  onClick,
  children,
  className = "",
}: DashboardCardProps) => {
  const isButton = !!onClick;
  const Component = isButton ? "button" : "div";

  return (
    <Component
      onClick={onClick}
      className={`bg-surface-container-low border border-outline-variant/10 p-4 rounded-lg group transition-all duration-500 text-left relative overflow-hidden ${
        isButton ? "hover:border-primary/30 cursor-pointer" : ""
      } ${className}`}
    >
      {isButton && (
        <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity"></div>
      )}
      <span className="font-label text-[10px] uppercase tracking-widest text-on-surface-variant block mb-3 relative z-10">
        {label}
      </span>
      <div className="flex justify-between items-center relative z-10">
        {value !== undefined && (
          <span className="font-headline text-lg font-light text-on-surface group-hover:text-primary transition-colors capitalize">
            {value}
          </span>
        )}
        {icon && (
          <span className="material-symbols-outlined text-primary opacity-0 group-hover:opacity-100 transition-opacity">
            {icon}
          </span>
        )}
        {children}
      </div>
    </Component>
  );
};
