import React from "react";
import { Link } from "react-router-dom";

export interface NavProps {}

const Nav: React.FC = () => {
  return (
    <nav className="p-6 sticky z-50 top-0 bg-f-offdark shadow-lg opacity-90 flex justify-between w-full">
      <div className="w-full flex gap-10">
        <NavigatonLink
          text="Add to Server"
          href={`https://discord.com/api/oauth2/authorize?client_id=624967845922734080&permissions=8&scope=bot`}
        />
        <NavigatonLink text="Commands" />
        <NavigatonLink text="Help" />
      </div>
      <div>
        <NavigatonLink text="Dashboard" href="/dashboard" sameTab />
      </div>
    </nav>
  );
};
export default Nav;

const NavigatonLink: React.FC<{
  text: string;
  href?: string;
  sameTab?: boolean;
}> = ({ text, href, sameTab }) => {
  if (sameTab) {
    return (
      <Link to={href ?? ""} className="text-f-primary font-semibold">
        {text}
      </Link>
    );
  }
  return (
    <a
      href={href ?? ""}
      target="_blank"
      rel="noreferrer"
      className="text-f-primary font-semibold"
    >
      {text}
    </a>
  );
};
