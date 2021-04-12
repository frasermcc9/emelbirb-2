import React from "react";
import Nav from "../stories/nav/NavBar";

const Page: React.FC = ({ children }) => {
  return (
    <>
      <Nav />
      <div className="flex flex-col justify-between min-h-screen">
        <div>{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Page;
