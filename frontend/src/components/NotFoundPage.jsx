import React from 'react';
import image from "../assets/404.png";

const NotFoundPage = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-sky-700 to-indigo-950 text-white">
      <div className="text-center -mt-32">
        <img
          src={image}
          alt="Blockchain 404"
          className="w-48 mx-auto animate-bounce shadow-xl transition-transform transform hover:scale-110"
        />
        
        <h1 className=" text-4xl md:text-5xl font-extrabold mb-16 mt-8 md:mb-12 md:mt-4 animate-pulse drop-shadow-lg">
          Oops!!! Page not found.
        </h1>

        <a
          href="/"
          className="inline-block bg-gradient-to-r from-fuchsia-600 to-blue-500 text-white px-8 py-4 rounded-full hover:bg-gradient-to-r hover:from-blue-500 hover:to-fuchsia-600 transition duration-300 transform hover:scale-110 shadow-lg"
        >
          Back to Home
        </a>
      </div>
    </div>
  );
};

export default NotFoundPage;
