export default function Footer() {
  return (
    <footer className=" w-full bg-[#147FF6] h-auto lg:h-[192px] py-8 lg:p-12 mb-0">
      <div className="w-full px-8">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 lg:gap-0">
          <div className="flex flex-col lg:flex-row items-center gap-8">
            <div className="bg-white px-8 py-4 rounded">
              <div className="w-24 h-6 bg-gray-300 rounded"></div>
            </div>
            <h3 className="text-white font-semibold text-lg">Subheading three words</h3>
          </div>
          <div className="flex gap-4">
            <div className="w-12 h-12 bg-white rounded-full"></div>
            <div className="w-12 h-12 bg-white rounded-full"></div>
            <div className="w-12 h-12 bg-white rounded-full"></div>
          </div>
        </div>
        <div className="flex justify-center gap-8 mt-8">
          <a href="#" className="text-white hover:underline">Privacy Policy</a>
          <a href="#" className="text-white hover:underline">Terms & Conditions</a>
          <a href="#" className="text-white hover:underline">Sitemap</a>
        </div>
      </div>
    </footer>
  );
};