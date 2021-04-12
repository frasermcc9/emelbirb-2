import React from "react";

export interface PageLinkProps {
  text?: string;
  onClick?: () => void;
  active?: boolean;
}

const PageLink: React.FC<PageLinkProps> = ({ onClick, text, active }) => {
  return (
    <>
      {active ? (
        <div
          className="p-4 w-64 bg-gradient-to-tr from-f-primary to-f-offdark cursor-pointer"
          onClick={onClick}
        >
          <div className="font-semibold text-lg text-f-light">{text}</div>
        </div>
      ) : (
        <div
          className="p-4 w-64 bg-gradient-to-tr from-f-dark to-f-offdark cursor-pointer hover:from-f-ultradark hover:to-f-dark"
          onClick={onClick}
        >
          <div className="font-semibold text-lg text-f-light">{text}</div>
        </div>
      )}
    </>
  );
};

export default PageLink;
