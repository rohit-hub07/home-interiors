import Link from "next/link"

const Home10 = () => {
  return (
    <div className="bg-gray-100 text-center py-12">
      <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-3">Ready To Design Your Dream Home ?</h2>
      <p className="text-gray-700 mb-6">Book A Free Design Consultation With Our Expert Designers</p>
      <div className="max-w-7xl mx-auto px-4">
        <Link
              href="https://wa.me/919993690392"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#DC3545] hover:bg-[#C82333] text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg transition-colors duration-200 mb-4 w-full md:w-auto inline-block text-center"
            >
              Get Free Quote
            </Link>
      </div>
    </div>
  )
}

export default Home10