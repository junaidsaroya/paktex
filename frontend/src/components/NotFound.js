import React from "react";

const NotFound = () => {
  return (
    <div
      className="flex flex-col min-h-screen
     items-center justify-center py-20 bg-[#F1F1F1] text-[#1E2833]"
    >
      <div className="text-center">
        <h1 className="text-9xl font-bold text-[#FB4141]">404</h1>
        <h2 className="text-4xl md:text-5xl font-semibold mt-4">
          Page Not Found
        </h2>
        <p className="mt-4 text-lg md:text-xl text-[#1E2833]/70">
          Sorry, the page you are looking for does not exist or has been moved.
        </p>
        <div className="mt-8">
          <a
            href="/"
            className="px-6 py-3 bg-[#1E2833] text-white font-medium text-lg rounded-lg shadow-md hover:bg-[#1E2833]/80 transition duration-300"
          >
            Go Back to Home
          </a>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
