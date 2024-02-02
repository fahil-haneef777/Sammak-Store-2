import React, { useContext, useEffect, useState } from "react";
import Header from "../Header";
import Footer from "../Footer";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "react-js-loader";
import "../../main.js";
function Checkout() {
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });
  const [cartdata, setcartdata] = useState("");
  const [cod, setcod] = useState(false);
  const [total, settotal] = useState("");

  const [checkoutform, setcheckoutform] = useState({
    additionalInfo: "non",
    address: "",
    city: "",
    country: "",
    email: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    pinCode: "",
    state: "",
  });

  const cartid = localStorage.getItem("cart");
  const parseCartid = JSON.parse(cartid);
  console.log(parseCartid);

  console.log(parseCartid);
  const [paytabinfo, setpaytabinfo] = useState({
    callback: "https://admin.sammak.store",
    cart_amount:'11',
    cart_currency: "SAR",
    cart_description: "Fish",
    cart_id: "34",
    customer_details: {
      city: "",
      country: "",
      email: "",
      name: "",
      phone: "",
      state: "",
      street1: "",
      zip: "",
    },
    hide_shipping: true,
    paymentMode: "online",
    paypage_lang: "en",
    profile_id: 0,
    tran_class: "ecom",
    tran_type: "sale  ",
    userId: 13,
  });
  console.log(paytabinfo);
  //

  const [data, setdata] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    let storedProduct = localStorage.getItem("products");
    let productId = localStorage.getItem("id");
    if (storedProduct && productId) {
      let parseProduct = JSON.parse(storedProduct);
      productId = parseInt(productId);
      let filterproduct = parseProduct.filter((fil) => {
        return fil.id === productId;
      });
      console.log(filterproduct);
      console.log(productId);
      setdata(filterproduct);
    }
  }, []);
  console.log(JSON.parse(localStorage.getItem("cart")));
  const {
    loggedin,
    setloggedin,
    home,
    sethome,
    shop,
    setshop,
    about,
    setabout,
    contact,
    setcontact,
    cart,
    id,
    productinfo,
  } = useContext(AllContext);

  const home1 = () => {
    sethome(true);
    setshop(false);
    setabout(false);
    setcontact(false);
  };
  const shop1 = () => {
    sethome(false);
    setshop(true);
    setabout(false);
    setcontact(false);
  };
  const about1 = () => {
    sethome(false);
    setshop(false);
    setabout(true);
    setcontact(false);
  };
  const contact1 = () => {
    sethome(false);
    setshop(false);
    setabout(false);
    setcontact(true);
  };
  const register = () => {
    console.log(registeruser);
    axios
      .post(`${import.meta.env.VITE_URL}/v1/auth/createUser`, registeruser)
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const login = () => {
    console.log(loginuser);
    axios
      .post(`${import.meta.env.VITE_URL}/v1/auth/login`, loginuser)
      .then((res) => {
        console.log(res.data);
        console.log(res.data.result.emailId);
        localStorage.setItem("userid", res.data.result.userId);
        localStorage.setItem("token", res.data.result.accessToken);
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    let cart = localStorage.getItem("cart");

    if (cart) {
      let parseCart = JSON.parse(cart);
      setcartdata(parseCart);
    }
  }, []);

  const token = localStorage.getItem("token");
  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    },
  };
  const isAnyfieldEmpty = () => {
    return Object.values(checkoutform).some((value) => value === "");
  };
  const handlePlace = (e) => {
    e.preventDefault();
    if (isAnyfieldEmpty()) {
      console.log("please fill all the field");
    } else {
      axios
        .post(
          `${
            import.meta.env.VITE_URL
          }/Address/AddAddress/${localStorage.getItem("userid")}`,
          checkoutform,
          config
        )
        .then((res) => {
          console.log(res.data);
          handlepaytabs();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  useEffect(() => {
    axios
      .get(
        `${import.meta.env.VITE_URL}/CartMaster/getAll/${localStorage.getItem(
          "userid"
        )}`,
        config
      )
      .then((res) => {
        console.log(res.data.result.cartItemResponseList);
        localStorage.setItem(
          "cart",
          JSON.stringify(res.data.result.cartItemResponseList)
        );
        setcartdata(res.data.result.cartItemResponseList);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleDelete = (index, id) => {
    let newCartdata =
      cartdata.length > 0 &&
      cartdata.filter((data, ind) => {
        return ind !== index;
      });
    setcartdata(newCartdata);
    axios
      .delete(
        `${
          import.meta.env.VITE_URL
        }/CartMaster/deleteByProductId/${id}/${parseInt(
          localStorage.getItem("userid")
        )}`,
        config
      )
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    if (!loggedin) {
      navigate(-1);
    }
  }, []);
  const headers = {
    "content-type": "application/json",
    Authorization: "SHJN6KTM9G-J6W6WR6GTN-G2RMKNRWKK",
  };

  const handlepaytabs = () => {
    console.log(paytabinfo);
    axios
      .post(`${import.meta.env.VITE_URL}/checkOut/fromCart`, paytabinfo, config)
      .then((response) => {
        console.log(response.data);
        if (cod) {
          navigate("/ordercomplete");
          console.log("cod");
        } else {
          window.location.href = response.data.result;
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };
  console.log(paytabinfo);
  return (
    <>
      <header className="header">
        <div className="header-top">
          <div className="container">
            <div className="header-left">
              <a href="tel:#" className="call">
                <i className="p-icon-phone-solid"></i>
                <span>+456 789 000</span>
              </a>
              <span className="divider"></span>
              <a href="contact.html" className="contact">
                <i className="p-icon-map"></i>
                <span>Saudi Arabia,Jazan, KSA</span>
              </a>
            </div>
            <div className="header-right">
              <div className="dropdown switcher">
                <a href="#currency">USD</a>
                <ul className="dropdown-box">
                  <li>
                    <a href="#USD">USD</a>
                  </li>
                  <li>
                    <a href="#EUR">EUR</a>
                  </li>
                </ul>
              </div>

              <div className="dropdown switcher">
                <a href="#language">
                  <img
                    src="images/flagus.jpg"
                    width="14"
                    height="10"
                    className="mr-1"
                    alt="flagus"
                  />
                  ENG
                </a>
                <ul className="dropdown-box">
                  <li>
                    <a href="#USD">
                      <img
                        src="images/flagus.jpg"
                        width="14"
                        height="10"
                        className="mr-1"
                        alt="flagus"
                      />
                      ENG
                    </a>
                  </li>
                  <li>
                    <a href="#EUR">
                      <img
                        src="images/flagfr.jpg"
                        width="14"
                        height="10"
                        className="mr-1"
                        alt="flagfr"
                      />
                      FRH
                    </a>
                  </li>
                </ul>
              </div>
              <span className="divider"></span>

              <div className="social-links">
                <a
                  href="#"
                  className="social-link fab fa-facebook-f"
                  title="Facebook"
                ></a>
                <a
                  href="#"
                  className="social-link fab fa-twitter"
                  title="Twitter"
                ></a>
                <a
                  href="#"
                  className="social-link fab fa-pinterest"
                  title="Pinterest"
                ></a>
                <a
                  href="#"
                  className="social-link fab fa-linkedin-in"
                  title="Linkedin"
                ></a>
              </div>
            </div>
          </div>
        </div>

        <div className="header-middle has-center sticky-header fix-top sticky-content">
          <div className="container">
            <div className="header-left">
              <a href="#" className="mobile-menu-toggle" title="Mobile Menu">
                <i className="p-icon-bars-solid"></i>
              </a>
              <a href="/" className="logo">
                <img src="images/logo.png" alt="logo" width="171" height="41" />
              </a>
            </div>
            <div className="header-center">
              <nav className="main-nav">
                <ul className="menu">
                  <li className={home ? "active" : ""}>
                    <a
                      onClick={() => {
                        home1();
                        navigate("/");
                      }}
                    >
                      Home
                    </a>
                  </li>
                  <li className={shop ? "active" : ""}>
                    <a
                      onClick={() => {
                        shop1();
                        navigate("/");
                      }}
                    >
                      Shop
                    </a>
                  </li>
                  <li className={about ? "active" : ""}>
                    <a
                      onClick={() => {
                        about1();
                        navigate("/");
                      }}
                    >
                      About Us
                    </a>
                  </li>
                  <li className={contact ? "active" : ""}>
                    <a
                      onClick={() => {
                        contact1();
                        navigate("/");
                      }}
                    >
                      Contact Us
                    </a>
                  </li>
                </ul>
              </nav>
            </div>
            <div className="header-right">
              <div className="header-search hs-toggle">
                <a className="search-toggle" href="#" title="Search">
                  <i className="p-icon-search-solid"></i>
                </a>
                <form action="#" className="form-simple">
                  <input
                    type="search"
                    autoComplete="off"
                    placeholder="Search in..."
                    required=""
                  />
                  <button className="btn btn-search" type="submit">
                    <i className="p-icon-search-solid"></i>
                  </button>
                </form>
              </div>
              <div className="dropdown login-dropdown off-canvas">
                {loggedin ? (
                  <button
                    onClick={() => {
                      localStorage.clear();
                      window.location.reload();
                    }}
                    style={{
                      position: "relative",
                      left: "-1vh",
                      cursor: "pointer",
                    }}
                  >
                    Logout
                  </button>
                ) : (
                  <a className="login-toggle" href="" data-toggle="login-modal">
                    <i className="p-icon-user-solid mr-2"></i>
                    <span className="">login/Signup</span>
                  </a>
                )}

                <div className="canvas-overlay"></div>
                <a href="#" className="btn-close"></a>
                <div className="dropdown-box scrollable">
                  <div className="login-popup">
                    <div className="form-box">
                      <div className="tab tab-nav-underline tab-nav-boxed">
                        <ul className="nav nav-tabs nav-fill mb-4">
                          <li className="nav-item">
                            <a
                              className="nav-link active lh-1 ls-normal"
                              href="#signin"
                            >
                              Login
                            </a>
                          </li>
                          <li className="nav-item">
                            <a
                              className="nav-link lh-1 ls-normal"
                              href="#register"
                            >
                              Register
                            </a>
                          </li>
                        </ul>
                        <div className="tab-content">
                          <div className="tab-pane active" id="signin">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                login();
                              }}
                            >
                              <div className="form-group">
                                <input
                                  type="text"
                                  id="singin-email"
                                  name="singin-email"
                                  placeholder="Username or Email Address"
                                  onInput={(e) => {
                                    setloginuser({
                                      ...loginuser,
                                      email: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="password"
                                  id="singin-password"
                                  name="singin-password"
                                  placeholder="Password"
                                  required=""
                                  onInput={(e) => {
                                    setloginuser({
                                      ...loginuser,
                                      password: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div className="form-footer">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id="signin-remember"
                                    name="signin-remember"
                                  />
                                  <label htmlFor="signin-remember">
                                    Remember me
                                  </label>
                                </div>
                                <a href="#" className="lost-link">
                                  Lost your password?
                                </a>
                              </div>
                              <button
                                className="btn btn-dark btn-block"
                                type="submit"
                              >
                                Login
                              </button>
                            </form>
                            <div className="form-choice text-center">
                              <label>or Login With</label>
                              <div className="social-links social-link-active">
                                <a
                                  href="#"
                                  title="Facebook"
                                  className="social-link social-facebook fab fa-facebook-f"
                                ></a>
                                <a
                                  href="#"
                                  title="Twitter"
                                  className="social-link social-twitter fab fa-twitter"
                                ></a>
                                <a
                                  href="#"
                                  title="Linkedin"
                                  className="social-link social-linkedin fab fa-linkedin-in"
                                ></a>
                              </div>
                            </div>
                          </div>
                          <div className="tab-pane" id="register">
                            <form
                              onSubmit={(e) => {
                                e.preventDefault();
                                register();
                              }}
                            >
                              <div className="form-group">
                                <input
                                  type="text"
                                  id="register-user"
                                  name="register-user"
                                  placeholder="Username"
                                  required=""
                                  onInput={(e) => {
                                    setregisteruser({
                                      ...registeruser,
                                      userName: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="email"
                                  id="register-email"
                                  name="register-email"
                                  placeholder="Your Email Address"
                                  required=""
                                  onInput={(e) => {
                                    setregisteruser({
                                      ...registeruser,
                                      emailId: e.target.value,
                                    });
                                  }}
                                />
                                <input
                                  type="password"
                                  id="register-password"
                                  name="register-password"
                                  placeholder="Password"
                                  required=""
                                  onInput={(e) => {
                                    setregisteruser({
                                      ...registeruser,
                                      password: e.target.value,
                                    });
                                  }}
                                />
                              </div>
                              <div className="form-footer mb-5">
                                <div className="form-checkbox">
                                  <input
                                    type="checkbox"
                                    id="register-agree"
                                    name="register-agree"
                                    required=""
                                  />
                                  <label htmlFor="register-agree">
                                    I agree to the privacy policy
                                  </label>
                                </div>
                              </div>
                              <button
                                className="btn btn-dark btn-block"
                                type="submit"
                              >
                                Register
                              </button>
                            </form>
                            <div className="form-choice text-center">
                              <label className="ls-m">or Register With</label>
                              <div className="social-links social-link-active">
                                <a
                                  href="#"
                                  title="Facebook"
                                  className="social-link social-facebook fab fa-facebook-f"
                                ></a>
                                <a
                                  href="#"
                                  title="Twitter"
                                  className="social-link social-twitter fab fa-twitter"
                                ></a>
                                <a
                                  href="#"
                                  title="Linkedin"
                                  className="social-link social-linkedin fab fa-linkedin-in"
                                ></a>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                    <button
                      title="Close (Esc)"
                      type="button"
                      className="mfp-close"
                    >
                      <span>×</span>
                    </button>
                  </div>
                </div>
              </div>

              {loggedin && (
                <div className="dropdown cart-dropdown off-canvas mr-0 mr-lg-2">
                  <a href="#" className="cart-toggle link">
                    <i className="p-icon-cart-solid">
                      <span className="cart-count">
                        {cartdata.length > 0 && cartdata.length}
                      </span>
                    </i>
                  </a>
                  <div className="canvas-overlay"></div>
                  <div className="dropdown-box">
                    <div className="canvas-header">
                      <h4 className="canvas-title">Shopping Cart</h4>
                      <a href="#" className="btn btn-dark btn-link btn-close">
                        close<i className="p-icon-arrow-long-right"></i>
                        <span className="sr-only">Cart</span>
                      </a>
                    </div>
                    <div className="products scrollable">
                      {cartdata.length > 0 ? (
                        cartdata.map((data, index) => (
                          <div className="product product-mini" key={index}>
                            <figure className="product-media">
                              <a href="product-simple.html">
                                <img
                                  src={
                                    data.productResponse.productImages[0]
                                      .imageUrl
                                  }
                                  alt="product"
                                  width="84"
                                  height="105"
                                  style={{ height: "105px", width: "84px" }}
                                />
                              </a>
                              <a
                                title="Remove Product"
                                className="btn-remove"
                                onClick={() => {
                                  handleDelete(
                                    index,
                                    data.productResponse.productImages[0].id
                                  );
                                }}
                              >
                                <i className="p-icon-times"></i>
                                <span className="sr-only">Close</span>
                              </a>
                            </figure>
                            <div className="product-detail">
                              <a href="product.html" className="product-name">
                                {data.productResponse.productName}
                              </a>
                              <div className="price-box">
                                <span className="product-quantity">
                                  {data.quantity}
                                </span>
                                <span className="product-price">
                                  {data.productResponse.sellingPrice} SAR
                                </span>
                              </div>
                            </div>
                          </div>
                        ))
                      ) : (
                        <span style={{ position: "relative", top: "2vh" }}>
                          {" "}
                          <Loader
                            type="bubble-scale"
                            bgColor={"#163b4d"}
                            color={"blue"}
                            size={30}
                          />
                        </span>
                      )}
                    </div>

                    <div className="cart-total">
                      <label>Total:</label>
                      <span className="price"> C SAR</span>
                    </div>

                    <div className="cart-action">
                      <a
                        className="btn btn-outline btn-dim mb-2"
                        onClick={() => {
                          navigate("/viewcart");
                        }}
                      >
                        View Cart
                      </a>
                      <a
                        onClick={() => {
                          navigate("/checkout");
                        }}
                        className="btn btn-dim"
                      >
                        <span>Go To Checkout</span>
                      </a>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="mobile-menu-wrapper">
          <div className="mobile-menu-overlay"></div>

          <a className="mobile-menu-close" href="#">
            <i className="p-icon-times"></i>
          </a>

          <div className="mobile-menu-container scrollable">
            <ul className="mobile-menu mmenu-anim">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/shopview">Shop</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      <main className="main checkout">
        <div className="page-content pt-8 pb-10 mb-4">
          <div className="step-by pr-4 pl-4">
            <h3 className="title title-step">
              <a href="/viewcart">1. Shopping Cart</a>
            </h3>
            <h3 className="title title-step active">
              <a>2. Checkout</a>
            </h3>
            <h3 className="title title-step">
              <a>3. Order Complete</a>
            </h3>
          </div>
          <div className="container mt-7">
            <form onSubmit={handlePlace} className="form">
              <div className="row">
                <div className="col-lg-7 mb-6 mb-lg-0 check-detail">
                  <h3 className="title text-left mt-3 mb-6">Billing Details</h3>
                  <div className="row">
                    <div className="col-xs-6">
                      <label>First Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="first-name"
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            firstName: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              name: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="col-xs-6">
                      <label>Last Name*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="last-name"
                        required=""
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            lastName: e.target.value,
                          });
                        }}
                      />
                    </div>
                  </div>

                  <label>Country / Region*</label>
                  <div className="select-box">
                    <input
                      type="text"
                      className="form-control"
                      name="country"
                      required=""
                      onInput={(e) => {
                        setcheckoutform({
                          ...checkoutform,
                          country: e.target.value,
                        });
                        setpaytabinfo({
                          ...paytabinfo,
                          customer_details: {
                            ...paytabinfo.customer_details,
                            country: e.target.value,
                          },
                        });
                      }}
                    />
                  </div>
                  <label> Address</label>
                  <input
                    type="text"
                    className="form-control"
                    name="address1"
                    required=""
                    placeholder="House number and street name"
                    onInput={(e) => {
                      setcheckoutform({
                        ...checkoutform,
                        address: e.target.value,
                      });
                      setpaytabinfo({
                        ...paytabinfo,
                        customer_details: {
                          ...paytabinfo.customer_details,
                          street1: e.target.value,
                        },
                      });
                    }}
                  />
                  <div className="row">
                    <div className="col-xs-6">
                      <label>Town / City</label>
                      <input
                        type="text"
                        className="form-control"
                        name="city"
                        required=""
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            city: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              city: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="col-xs-6">
                      <label>State</label>
                      <input
                        type="text"
                        className="form-control"
                        name="state"
                        required=""
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            state: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              state: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <div className="row">
                    <div className="col-xs-6">
                      <label>Postcode / ZIP*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="zip"
                        required=""
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            pinCode: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              zip: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                    <div className="col-xs-6">
                      <label>Phone*</label>
                      <input
                        type="text"
                        className="form-control"
                        name="phone"
                        required=""
                        onInput={(e) => {
                          setcheckoutform({
                            ...checkoutform,
                            phoneNumber: e.target.value,
                          });
                          setpaytabinfo({
                            ...paytabinfo,
                            customer_details: {
                              ...paytabinfo.customer_details,
                              phone: e.target.value,
                            },
                          });
                        }}
                      />
                    </div>
                  </div>
                  <label>Email Address*</label>
                  <input
                    type="text"
                    className="form-control"
                    name="email-address"
                    required=""
                    onInput={(e) => {
                      setcheckoutform({
                        ...checkoutform,
                        email: e.target.value,
                      });
                      setpaytabinfo({
                        ...paytabinfo,
                        customer_details: {
                          ...paytabinfo.customer_details,
                          email: e.target.value,
                        },
                      });
                    }}
                  />
                </div>
                <aside className="col-lg-5 sticky-sidebar-wrapper pl-lg-6">
                  <div
                    className="sticky-sidebar"
                    data-sticky-options="{'bottom': 50}"
                  >
                    <div className="summary pt-5">
                      <h3 className="title">Your Order</h3>
                      <table>
                        <thead>
                          <tr>
                            <th
                              style={{
                                position: "relative",
                                right: "-13vh",
                                padding: "2vh",
                                bottom: "2vh",
                                color: "",
                              }}
                            >
                              Product
                            </th>
                            <th></th>
                          </tr>
                        </thead>
                        <tbody>
                          {cartdata.length > 0 &&
                            cartdata.map((cart, index) => (
                              <tr key={index}>
                                <td className="product-name">
                                  {cart.productResponse.productName}
                                  <span className="product-quantity">
                                    ×&nbsp;{cart.quantity}
                                  </span>
                                </td>
                                <td className="product-total text-body">
                                  {cart.subtotal} SAR
                                </td>
                              </tr>
                            ))}

                          <tr className="summary-subtotal">
                            <td>
                              <h4 className="summary-subtitle">Total</h4>
                            </td>
                            <td className="summary-total-price ls-s">
                              {cartdata.length > 0 &&
                                cartdata
                                  .reduce((acc, curr) => {
                                    let data = curr.subtotal;
                                    return acc + data;
                                  }, 0)
                                  .toFixed(2)}{" "}
                              SAR
                            </td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="payment accordion radio-type pb-5">
                        <h4 className="summary-subtitle ls-m pb-3">
                          Payment Methods
                        </h4>
                        <div className="card">
                          <div className="card-header">
                            <a
                              href="#collapse1"
                              className="collapse"
                              onClick={() => {
                                setpaytabinfo({
                                  ...paytabinfo,
                                  paymentMode: "online",
                                });
                                setcod(false);
                              }}
                            >
                              Online
                            </a>
                          </div>
                          <div
                            id="collapse1"
                            className="expanded"
                            style={{ display: "block" }}
                          >
                            <div className="card-body">
                              Pay with debit/Credit card
                            </div>
                          </div>
                        </div>
                        <div className="card">
                          <div className="card-header">
                            <a
                              href="#collapse2"
                              className="expand"
                              onClick={() => {
                                setpaytabinfo({
                                  ...paytabinfo,
                                  paymentMode: "COD",
                                });
                                setcod(true);
                              }}
                            >
                              Cash on delivery
                            </a>
                          </div>
                          <div id="collapse2" className="collapsed">
                            <div className="card-body">
                              Pay with cash upon delivery.
                            </div>
                          </div>
                        </div>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-dim btn-block mt-6"
                        onClick={handlePlace}
                      >
                        Place Order
                      </button>
                    </div>
                  </div>
                </aside>
              </div>
            </form>
          </div>
        </div>
      </main>
    </>
  );
}

export default Checkout;
