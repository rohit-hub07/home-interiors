import Link from "next/link"

const Home4 = () => {
  return (
    <div className="container text-center py-5">
      <h2 className="fw-semibold">Smart Modular Kitchen Designs</h2>
      <div className="row g-4 justify-content-evenly">
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen.jpg"
            className="img-fluid rounded shadow-sm"
            alt="Stylish Dining Hall Design"
          />
          <p>Stylish Dining Hall Design</p>
        </div>
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen1.jpg"
            className="img-fluid rounded shadow-sm"
            alt="Stylish Bedroom Design"
          />
          <p>Stylish Bedroom Design</p>
        </div>
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen2.jpg"
            className="img-fluid rounded shadow-sm"
            alt="A Minimal with Blue Toned Bedroom"
          />
          <p>A Minimal with Blue Toned Bedroom</p>
        </div>
      </div>
      <div className="container mt-4">
        <button className="btn btn-danger shadow-sm" data-bs-dismiss="offcanvas">
          Book Your Dream Kitchen
        </button>
      </div>
      <h2 className="fw-semibold my-4">Bedroom Interiors For Comfort And Style</h2>
      <div className="row g-4 justify-content-evenly">
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen.jpg"
            className="img-fluid rounded shadow-sm"
            alt="Stylish Dining Hall Design"
          />
          <p>Stylish Dining Hall Design</p>
        </div>
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen1.jpg"
            className="img-fluid rounded shadow-sm"
            alt="Stylish Bedroom Design"
          />
          <p>Stylish Bedroom Design</p>
        </div>
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen2.jpg"
            className="img-fluid rounded shadow-sm"
            alt="A Minimal with Blue Toned Bedroom"
          />
          <p>A Minimal with Blue Toned Bedroom</p>
        </div>
      </div>
      <div className="container mt-4">
        <button className="btn btn-danger shadow-sm" data-bs-dismiss="offcanvas">
          Meet Our Designers
        </button>
      </div>
      <h2 className="fw-semibold my-4">Living Room Interiors For A Fabulous First Impression</h2>
      <div className="row g-4 justify-content-evenly">
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen.jpg"
            className="img-fluid rounded shadow-sm"
            alt="Stylish Dining Hall Design"
          />
          <p>Stylish Dining Hall Design</p>
        </div>
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen1.jpg"
            className="img-fluid rounded shadow-sm"
            alt="Stylish Bedroom Design"
          />
          <p>Stylish Bedroom Design</p>
        </div>
        <div className="col-12 col-md-4">
          <img
            src="/colours-kitchen-img/colours-kitchen2.jpg"
            className="img-fluid rounded shadow-sm"
            alt="A Minimal with Blue Toned Bedroom"
          />
          <p>A Minimal with Blue Toned Bedroom</p>
        </div>
      </div>
      <div className="container mt-4">
        <Link
              href="https://wa.me/919864919978"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-[#DC3545] hover:bg-[#C82333] text-white font-bold text-lg py-4 px-10 rounded-lg shadow-lg transition-colors duration-200 mb-4 w-full md:w-auto inline-block text-center"
            >
              Book A FREE Consultation 👋
            </Link>
      </div>
    </div>
  )
}

export default Home4