import React from "react";
import '../../main.js'
function Heroabout() {


  return (
    <main className="main">
      <div className="page-header" style={{ backgroundColor: "#f9f8f4" }}>
        <h1 className="page-title">About Us</h1>
      </div>
      <nav className="breadcrumb-nav has-border">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>About Us</li>
          </ul>
        </div>
      </nav>
      <div className="page-content about-page">

        <div className="container">
          <section className="row align-items-center">
            <div className="col-lg-6">
              <figure>
                <img
                  src="images/subpage/about/1.jpg"
                  width="610"
                  height="450"
                  alt="image"
                />
              </figure>
            </div>
            <div className="col-lg-6">
              <div className="pl-lg-8 pr-lg-3 pt-5 pt-lg-0">
                <h4 className="text-uppercase text-body font-weight-normal ls-1 mb-4">
                  What we sell
                </h4>
                <h2 className="desc-title mb-4">
                  We Provide Fresh Goods & Tasty Nuts
                </h2>
                <p className="mb-3 ml-1">
                  Facilisi nullam vehicula ipsum a arcu cursus vitae congue.
                  Pretium quam vu lputate dignissim suspendisse in est. Sit amet
                  consectetur adipiscing elit ut aliquam purus sit.
                </p>
                <p className="mb-8 ml-1">
                  Porttitor rhoncus dolor purus non enim praesent elementum
                  facilisis leo.
                </p>
                <a
                  href="shop-5-cols.html"
                  className="btn btn-outline btn-dark ml-1 mb-1"
                >
                  Get our store<i className="p-icon-arrow-long-right"></i>
                </a>
              </div>
            </div>
          </section>
        </div>

        <section className="pb-6" style={{ backgroundColor: "#f9f8f4" }}>
          <div className="container text-center">
            <h4 className="text-uppercase text-body font-weight-normal ls-1 mb-3">
              What we do
            </h4>
            <h2 className="desc-title mb-10">We are Trusted by Clients</h2>
            <div className="row cols-lg-3 cols-md-2 cols-1 justify-content-center">
              <div className="counter mb-6">
                <span
                  className="count-to text-primary"
                  data-fromvalue="0"
                  data-tovalue="10"
                  data-duration="2000"
                  data-delimiter=","
                >
                  0
                </span>
                <div className="counter-content">
                  <h4 className="count-title text-dark mb-2">BUSINESS YEARS</h4>
                  <p className="count-desc mx-auto" style={{ width: "80%" }}>
                    Lorem ipsum dolor sit amet, consectetur adip do eiusmod
                    tempor incididunt ut
                  </p>
                </div>
              </div>
              <div className="counter mb-6">
                <span
                  className="count-to text-primary"
                  data-fromvalue="0"
                  data-tovalue="80"
                  data-duration="2000"
                  data-delimiter=","
                  data-append="K+"
                >
                  0
                </span>
                <div className="counter-content">
                  <h4 className="count-title text-dark mb-2">PRODUCTS SALES</h4>
                  <p className="count-desc mx-auto" style={{ width: "80%" }}>
                    Lorem ipsum dolor sit amet, consectetur adip do eiusmod
                    tempor incididunt ut
                  </p>
                </div>
              </div>
              <div className="counter mb-6">
                <span
                  className="count-to text-primary"
                  data-fromvalue="0"
                  data-tovalue="90"
                  data-duration="2000"
                  data-delimiter=","
                  data-append="%"
                >
                  0
                </span>
                <div className="counter-content">
                  <h4 className="count-title text-dark mb-2">
                    HAPPY CUSTOMERS
                  </h4>
                  <p className="count-desc mx-auto" style={{ width: "80%" }}>
                    Lorem ipsum dolor sit amet, consectetur adip do eiusmod
                    tempor incididunt ut
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="container">
          <section className="row align-items-center">
            <div className="col-lg-6">
              <div className="pr-lg-3">
                <h4 className="text-uppercase text-body font-weight-normal ls-1 mt-5 mb-4">
                  our delivery system
                </h4>
                <h2 className="desc-title mb-4">
                  The Fastest & Best Delivery ever met before
                </h2>
                <ul className="list list-circle text-dim">
                  {/* List items for delivery system */}
                  {/* You can replace this with actual content */}
                </ul>
              </div>
            </div>
            <div className="col-lg-6">
              <figure>
                <img
                  src="images/subpage/about/2.jpg"
                  width="610"
                  height="450"
                  alt="image"
                />
              </figure>
            </div>
          </section>
        </div>
        
        <section style={{ backgroundColor: "#f9f8f4", paddingBottom: "8rem" }}>
          <div className="container text-center">
            <h4 className="text-uppercase text-body font-weight-normal ls-1 mb-3">
              Testimonial
            </h4>
            <h2 className="desc-title mb-4">Why You Choose Panda</h2>
            <div className="owl-carousel owl-theme row owl-nav-box cols-1">
              {/* Testimonial components */}
              {/* You can replace this with actual content */}
            </div>
          </div>
        </section>
        
      </div>
    </main>
  );
}

export default Heroabout;
