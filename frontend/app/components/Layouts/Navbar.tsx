'use client';
export default function Navbar() {
  return (
    <nav
      className="fixed top-0 left-0 right-0 bg-white z-50 h-16 lg:h-[108px] lg:px-15"
      style={{ boxShadow: '0px 2px 2px 0px rgba(0, 0, 0, 0.25)' }}
    >
      <div className="h-full px-4 lg:px-8 flex items-center justify-between">
        <div className="flex items-center gap-4 lg:gap-12">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 lg:w-10 lg:h-10 bg-[#1e3a5f] rounded-full flex items-center justify-center">
              <div className="w-5 h-5 lg:w-6 lg:h-6 border-2 border-white rounded-full relative">
                <div className="absolute inset-0 flex items-center justify-center text-white text-xs font-bold">C</div>
              </div>
            </div>
            <span className="text-lg lg:text-xl font-semibold text-[#1e3a5f]">Credepath</span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#" className="text-gray-700 font-medium hover:text-[#00CC83]">Jobs</a>
            <a href="#" className="text-gray-700 font-medium hover:text-[#00CC83]">Hiring Partners</a>
          </div>
        </div>
        <button className="w-8 h-8 lg:w-10 lg:h-10 bg-[#00CC83] rounded-full flex items-center justify-center text-white">
          <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
            <path d="M10 10C12.7614 10 15 7.76142 15 5C15 2.23858 12.7614 0 10 0C7.23858 0 5 2.23858 5 5C5 7.76142 7.23858 10 10 10Z" fill="white" />
            <path d="M10 12C4.47715 12 0 14.4772 0 17.5V20H20V17.5C20 14.4772 15.5228 12 10 12Z" fill="white" />
          </svg>
        </button>
      </div>
    </nav>
  );
};