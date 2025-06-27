import React from 'react';
import { Link } from 'react-router-dom';

export default function LandingPage() {
  return (
    <div
      className="relative h-screen flex items-center justify-center bg-cover bg-no-repeat overflow-hidden"
      style={{ backgroundImage: 'url(/images/background-image.gif)' }}
    >
      {/* Logo */}
      <div className="absolute top-4 left-4 z-50">
        <img
          src="/images/logo.png"
          alt="Logo"
          className="w-24 sm:w-32 md:w-40 lg:w-48 xl:w-56"
        />
      </div>

      {/* Text and Button */}
      <div className="relative z-10 text-center text-white px-8 flex flex-col items-center">
        <h1 className="text-2xl md:text-6xl font-bold mb-4">
        Centralized finance platform that powers your business growth.
        </h1>
        <p className="text-sm md:text-xl font-light mb-6">
        Easily manage finance operations, local and cross-border payments and business accounts, all on a single platform.
        </p>
        <Link to="/home">
        <button className="border border-white text-white font-bold py-2 px-6 rounded-lg flex items-center gap-2 hover:bg-white hover:text-gray-900 transition duration-300">
          Get Started
          <span>→</span>
         </button>
    

        </Link>
      </div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black opacity-60"></div>
    </div>
  );
}
