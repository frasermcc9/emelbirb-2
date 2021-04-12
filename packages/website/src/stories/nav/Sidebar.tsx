import React from "react";
import GuildIcon from "../dashboard/sidebar/GuildIcon";

export interface SidebarProps {
  className?: string;
}

const Sidebar: React.FC<SidebarProps> = ({ className, children }) => {
  return (
    <div className={`w-64 pt-10 h-full min-h-screen bg-f-offdark ${className}`}>
      <div className="flex flex-col gap-y-4">
        <div className="">
          <GuildIcon />
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Sidebar;
