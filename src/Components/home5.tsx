import Link from "next/link";

const Home5 = () => {
  return (
    <div className="bg-white max-w-full mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800">What You Get</h2>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* 1 — Innovative Storage */}
        <div className="flex gap-4">
          <div className="w-20 h-20 shrink-0">
            <img src="/img/image1.png" alt="Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <h6 className="font-bold text-gray-800 mb-2">Innovative Storage</h6>
            <p className="text-sm text-gray-600">
              TV Unit, TV Back Panelling, Crockery Unit, Bar Unit, Bookshelf.
            </p>
          </div>
        </div>
        {/* 2 — Bedroom */}
        <div className="flex gap-4">
          <div className="w-20 h-20 shrink-0">
            <img src="/img/image2.png" alt="Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <h6 className="font-bold text-gray-800 mb-2">Bedroom</h6>
            <p className="text-sm text-gray-600">
              Wardrobes, TV Unit, Bed with Storage, Dressing Unit, Study Unit.
            </p>
          </div>
        </div>
        {/* 3 — Kitchen */}
        <div className="flex gap-4">
          <div className="w-20 h-20 shrink-0">
            <img src="/img/image3.png" alt="Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <h6 className="font-bold text-gray-800 mb-2">Kitchen</h6>
            <p className="text-sm text-gray-600">
              Countertops, Backsplashes, Accessories, Shutters, Storage.
            </p>
          </div>
        </div>

        {/* 4 — Innovative Storage 2 */}
        <div className="flex gap-4">
          <div className="w-20 h-20 shrink-0">
            <img src="/img/image4.png" alt="Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <h6 className="font-bold text-gray-800 mb-2">Innovative Storage</h6>
            <p className="text-sm text-gray-600">
              Janitor Unit, Skirting Drawer, Pantry Pull Out, Appliance Garage,
              Hidden Bar Cabinet, Magic Corner.
            </p>
          </div>
        </div>

        {/* 5 — Interior Design Services */}
        <div className="flex gap-4">
          <div className="w-20 h-20 shrink-0">
            <img src="/img/image5.png" alt="Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <h6 className="font-bold text-gray-800 mb-2">Interior Design Services</h6>
            <p className="text-sm text-gray-600">
              False Ceiling, Wall Panelling, Decor Accents, Lighting,
              Furnishing, Appliances.
            </p>
          </div>
        </div>

        {/* 6 — Home Improvement */}
        <div className="flex gap-4">
          <div className="w-20 h-20 shrink-0">
            <img src="/img/image6.png" alt="Icon" className="w-full h-full object-contain" />
          </div>
          <div>
            <h6 className="font-bold text-gray-800 mb-2">Home Improvement Services</h6>
            <p className="text-sm text-gray-600">
              Painting, Bathroom Remodelling, Tiling, Plumbing, Electrical,
              Civil Work, Deep Cleaning.
            </p>
          </div>
        </div>
      </div>
      <div className="text-center mt-8">
        <Link
          href="https://wa.me/919993690392"
          target="_blank"
          rel="noopener noreferrer"
          className="bg-[#DC3545] hover:bg-[#C82333] text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg transition-colors duration-200 inline-block text-center"
        >
          Get Free Estimate
        </Link>
      </div>
    </div>
  );
};

export default Home5;
