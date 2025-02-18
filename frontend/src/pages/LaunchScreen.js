import React, { useState } from "react";
import SignIn from "../components/SignIn";
import SignUp from "../components/SignUp";

const LaunchScreen = ({ setLoged }) => {
  const [showSignIn, setShowSignIn] = useState(true);

  const toggleForm = () => {
    setShowSignIn(!showSignIn);
  };

  return (
    <div className="flex flex-col min-h-screen bg-[#EDF1F1] font-customFont">
      <div className="bg-[#EDF1F1] lg:bg-transparent sticky top-0 left-0 right-0 z-20 flex items-center px-4 py-3">
        <img src="/images/Logo.jpeg" alt="logo" className="w-[40px]" />
        <h1 className="text-3xl font-bold text-gray-800">Paktex</h1>
      </div>

      <div className="flex flex-col lg:flex-row items-center flex-1 px-6 lg:px-16 py-12 lg:py-16 space-y-8 lg:space-y-0 lg:space-x-10 z-10">
        <div className="w-full lg:w-1/2 lg:ms-20 bg-[#EDF1F1]">
          <img
            src="/images/paktexlogin.avif"
            alt="login"
            style={{
              mixBlendMode: "multiply",
            }}
            className="w-full"
          />
        </div>

        <div className="w-full lg:w-1/2">
          {showSignIn ? (
            <SignIn toggleForm={toggleForm} setLoged={setLoged} />
          ) : (
            <SignUp toggleForm={toggleForm} setLoged={setLoged} />
          )}
        </div>
      </div>

      <div className="bg-[#EDF1F1] lg:bg-transparent sticky bottom-0 left-0 right-0 p-4 z-10">
        <div className="flex gap-5 justify-center">
          <p className="text-gray-400  text-sm">
            Secure login | ISO 13485 Compliant
          </p>
        </div>
      </div>
    </div>
  );
};

export default LaunchScreen;
