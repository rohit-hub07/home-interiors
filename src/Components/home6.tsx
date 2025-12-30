import Link from "next/link";

const Home6 = () => {
  return (
    <div className="bg-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-10">15000+ Happy Homes</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-10">
          <div className="flex flex-col items-center">
            <img
              src="/img/Deepak-Kumar.jpg"
              alt="Deepak Kumar"
              className="rounded-full mb-4 w-32 h-32 object-cover"
            />
            <h5 className="font-semibold text-lg text-gray-800">Deepak Kumar</h5>
            <p className="text-sm text-gray-500 mb-3">Bilaspur, Chhattisgarh</p>

            <p className="text-gray-700 px-4 max-w-md">
              Colours Kitchen gave us a home we always wanted. The journey from
              idea to execution was smooth and having them on board transform
              our home was a great decision.
            </p>
          </div>
          <div className="flex flex-col items-center">
            <img
              src="/img/Aditya-Sinha.jpg"
              alt="Aditya Sinha"
              className="rounded-full mb-4 w-32 h-32 object-cover"
            />
            <h5 className="font-semibold text-lg text-gray-800">Aditya Sinha</h5>
            <p className="text-sm text-gray-500 mb-3">Korba, Chhattisgarh</p>

            <p className="text-gray-700 px-4 max-w-md">
              Overall an excellent job done by Colours Kitchen. Truly
              overwhelmed by the complete design and execution of the project.
              Love the storage solutions provided in the kitchen.
            </p>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <img
              src="/img/family1.jpg"
              alt="Family Happy Home"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>

          <div>
            <img
              src="/img/family2.jpg"
              alt="Family Happy Home"
              className="w-full h-64 object-cover rounded-lg shadow-md"
            />
          </div>
        </div>

        <div className="mt-8">
          <Link
            href="https://wa.me/919864919978"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#DC3545] hover:bg-[#C82333] text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg transition-colors duration-200 inline-block text-center"
          >
            Book A Free Consultation
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Home6;
