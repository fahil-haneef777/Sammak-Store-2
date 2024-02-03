import axios from "axios";
import React, { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import '../../main.js'
import '../../css/style.css'
function Herocontact() {
  const [contactData, setcontactData] = useState({
    contactEmail: "",
    contactMessage: "",
    contactName: "",
    contactSubject: "",
  });

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    },
  };

  const handleContact = () => {
    axios
      .post(`${import.meta.env.VITE_URL}/contactUs/post`, contactData, config)
      .then((res) => {
        console.log(res.data);
        if(res.data.status===200){
          toast.success('Comment Sent Successfully ',{
            autoClose:2000,
            position:'top-center'
          })
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <main className="main">
      <ToastContainer/>
      <div className="page-header contact-hero">
        <h1 className="page-title font-weight-light text-capitalize pt-2">
          Contact Us
        </h1>
      </div>
      <nav className="breadcrumb-nav has-border">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Contact Us</li>
          </ul>
        </div>
      </nav>
      <div className="page-content contact-page">
        <div className="container">
          <section className="mt-10 pt-8">
            <h2 className="title title-center mb-8">Contact Information</h2>
            <div
              className="owl-carousel owl-theme row cols-lg-4 cols-md-3 cols-sm-2 cols-1 mb-10"
              data-owl-options={`{
                                'nav': false,
                                'dots': false,
                                'loop': false,
                                'margin': 20,
                                'autoplay': true,
                                'responsive': {
                                    '0': {
                                        'items': 1,
                                        'autoplay': true
                                    },
                                    '576': {
                                        'items': 2
                                    },
                                    '768': {
                                        'items': 3
                                    },
                                    '992': {
                                        'items': 4,
                                        'autoplay': false
                                    }
                                }
                            }`}
            >
              <div className="icon-box text-center">
                <span className="icon-box-icon mb-4">
                  <i className="p-icon-map"></i>
                </span>
                <div className="icon-box-content">
                  <h4 className="icon-box-title">Address</h4>
                  <p className="text-dim">121 King Street, New York</p>
                </div>
              </div>
              <div className="icon-box text-center">
                  <span className="icon-box-icon mb-4">
                    <i className="p-icon-phone-solid"></i>
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title">Phone Number</h4>
                    <p className="text-dim">+1 (456) 789 000</p>
                  </div>
                </div>
                <div className="icon-box text-center">
                  <span className="icon-box-icon mb-4">
                    <i className="p-icon-message"></i>
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title">E-mail Address</h4>
                    <p className="text-dim">
                      <a
                        href="/cdn-cgi/l/email-protection"
                        className="__cf_email__"
                        data-cfemail="bdd0dcd4d1fdd8c5dcd0cdd1d893ded2d0"
                        >[email&#160;protected]</a
                      >
                    </p>
                  </div>
                </div>
                <div className="icon-box text-center">
                  <span className="icon-box-icon mb-4">
                    <i className="p-icon-clock"></i>
                  </span>
                  <div className="icon-box-content">
                    <h4 className="icon-box-title">Opening Hours</h4>
                    <p className="text-dim">Mon-Fri: 10:00 - 18:00</p>
                  </div>
                </div>
            </div>
            <hr />
          </section>
          <section className="mt-10 pt-2 mb-10 pb-8">
            <div className="row align-items-center">
              <div className="col-md-6">
                <figure>
                  <img
                    src="images/subpage/contact/1.jpg"
                    width="600"
                    height="557"
                    alt="About Image"
                  />
                </figure>
              </div>
              <div className="col-md-6 pl-md-4 mt-8 mt-md-0">
                <h2 className="title mb-1">Leave a Comment</h2>
                <p className="mb-6">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                  do eiusmod.
                </p>
                <form>
                  <div className="row">
                    <div className="col-md-6 mb-4">
                      <input
                        type="text"
                        id="contactName"
                        name="contactName"
                        placeholder="Your Name"
                        required=""
                        onInput={(e) => {
                          setcontactData({
                            ...contactData,
                            contactName: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-md-6 mb-4">
                      <input
                        type="email"
                        id="contactEmail"
                        name="contactEmail"
                        placeholder="Your Email"
                        required=""
                        onInput={(e) => {
                          setcontactData({
                            ...contactData,
                            contactEmail: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <input
                        type="text"
                        id="contactSubject"
                        name="contactSubject"
                        placeholder="Your Subject"
                        required=""
                        onInput={(e) => {
                          setcontactData({
                            ...contactData,
                            contactSubject: e.target.value,
                          });
                        }}
                      />
                    </div>
                    <div className="col-12 mb-4">
                      <textarea
                        id="contactMessage"
                        name="contactMessage"
                        placeholder="Your Message"
                        required=""
                        onInput={(e) => {
                          setcontactData({
                            ...contactData,
                            contactMessage: e.target.value,
                          });
                        }}
                      ></textarea>
                    </div>
                  </div>
                  <button
                    type="button"
                    className="btn btn-dark"
                    onClick={handleContact}
                  >
                    Send Message
                  </button>
                </form>
              </div>
            </div>
          </section>
        </div>
        <div
          className="bg-light google-map"
          id="googlemaps"
          style={{ height: "45rem" }}
        ></div>
      </div>
    </main>
  );
}

export default Herocontact;
