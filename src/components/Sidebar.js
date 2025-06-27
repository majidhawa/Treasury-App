import React from 'react';

const Sidebar = ({ onTransferClick }) => {
  return (
    <div className="w-64 h-screen relative overflow-hidden flex flex-col justify-between text-white">
      {/* Background Image */}
      <div
        className="absolute inset-0 bg-cover bg-right z-0"
        style={{ backgroundImage: 'url("/images/background-image.gif")' }}
      ></div>

      {/* Dark Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-60 z-0"></div>

      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full">
        {/* Top Section */}
        <div>
          <div className="p-6 border-b border-white border-opacity-30">
            <img src="/images/logo.png" alt="Logo" className="w-80 mb-8" />
            <h2 className="text-lg font-semibold">Treasury System</h2>
          </div>

          <div className="p-6 py-24">
            <button
              onClick={onTransferClick}
              className="w-full backdrop-blur-md bg-white/10 border border-white text-white font-semibold py-2 px-4 rounded-lg hover:bg-white hover:text-black transition duration-200"
            >
              Transfer Funds
            </button>
          </div>
        </div>

        {/* Bottom */}
        <div className="p-4 text-xs text-white text-center opacity-70">
          © 2025 Niobi
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
