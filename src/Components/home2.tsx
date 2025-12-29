const Home2 = () => {
  return (
    <div className="bg-white max-w-full mx-auto px-4 py-12 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8">
        Why Choose Colours Kitchen Homes ?
      </h2>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center bg-gray-100 rounded-lg">
            <img src="/img/interiors/design-possibilities-home-interiors.png" className="w-16 h-16 object-contain" alt="Design Possibilities" />
          </div>
          <p className="text-sm md:text-base text-gray-700">51040 Design<br />Possibilities</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center bg-gray-100 rounded-lg">
            <img src="/img/interiors/top-interior-designers.png" className="w-16 h-16 object-contain" alt="Extra Storage" />
          </div>
          <p className="text-sm md:text-base text-gray-700">20% EXTRA<br />Storage</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center bg-gray-100 rounded-lg">
            <img src="/img/interiors/low-cost-interiors.png" className="w-16 h-16 object-contain" alt="Low Cost EMIs" />
          </div>
          <p className="text-sm md:text-base text-gray-700">No Cost<br />EMIs</p>
        </div>

        <div className="flex flex-col items-center">
          <div className="w-20 h-20 md:w-24 md:h-24 mb-3 flex items-center justify-center bg-gray-100 rounded-lg">
            <img src="/img/interiors/warranty-home-interiors.png" className="w-16 h-16 object-contain" alt="Warranty" />
          </div>
          <p className="text-sm md:text-base text-gray-700">Upto 25 years<br />Warranty</p>
        </div>
      </div>
    </div>
  )
}

export default Home2;
