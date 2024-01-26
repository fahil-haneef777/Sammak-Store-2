import React, { useContext, useEffect, useState } from "react";
import "./Herocart.css";
import Header from "../Header";
import Footer from "../Footer";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Loader from "react-js-loader";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { RotatingLines } from "react-loader-spinner";
import "../../main.js";
function Herocart() {
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });
  const [loading, setloading] = useState(false);
  const [ishover, setishovered] = useState(false);
  const [addCartLogin, setaddCartLogin] = useState(false);
  const [quantity, setquantity] = useState(1);
  const [cartdata, setcartdata] = useState("");
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
    isloggedin,
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
    if (
      registeruser.emailId === "" ||
      registeruser.password === "" ||
      registeruser.userName === ""
    ) {
      toast.error("Please enter all the field", {
        autoClose: 700,
        closeOnClick: true,
        position: "top-right",
      });
      setloading(false);
    } else {
      axios
        .post(`${import.meta.env.VITE_URL}/v1/auth/createUser`, registeruser)
        .then((res) => {
          setloading(false);
          console.log(res);
          if (res.data.status === 200) {
            toast.success("Registered successfully", {
              position: "top-right",
              autoClose: 400,
              closeOnClick: true,
            });
            setTimeout(() => {
              toast.info(
                "Please click link from your email for activation and login back!",
                {
                  autoClose: 3000,
                  position: "top-right",
                }
              );
            }, 1000);
          }
        })
        .catch((err) => {
          console.log(err);
          setloading(false);
        });
    }
  };

  const login = () => {
    console.log(loginuser);
    if (loginuser.email === "" || loginuser.password === "") {
      toast.error("Enter both Password and Email", {
        autoClose: 700,
        position: "top-right",
        closeOnClick: true,
      });
      setloading(false);
    } else {
      axios
        .post(`${import.meta.env.VITE_URL}/v1/auth/login`, loginuser)
        .then((res) => {
          setloading(false);

          localStorage.setItem("userid", res.data.result.userId);
          localStorage.setItem("token", res.data.result.accessToken);
          if (res.data.result.accessToken) {
            toast.success("Loggedin Succefully", {
              autoClose: 1000,
              position: "top-right",
              closeOnClick: true,
            });

            setTimeout(() => {
              window.location.reload();
            }, 1000);
          }
        })
        .catch((err) => {
          setloading(false);
          if (err) {
            toast.error("Incorrect email or password", {
              autoClose: 1000,
              position: "top-right",
              closeOnClick: true,
            });
          }
        });
    }
  };

  const token = localStorage.getItem("token");
  console.log(token);
  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + token,
    },
  };

  const handleAddcart = () => {
    if (!isloggedin) {
      setaddCartLogin(true);
    } else {
      setaddCartLogin(false);
    }

    axios
      .post(
        `${import.meta.env.VITE_URL}/cart/addToCart/${localStorage.getItem(
          "id"
        )}/${localStorage.getItem("userid")}/${quantity}`,
        {},
        config
      )
      .then((res) => {
        console.log(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const addquantity = () => {
    setquantity(quantity + 1);
  };
  const minusquantity = () => {
    if (quantity === 1) {
      setquantity(1);
    } else {
      setquantity(quantity - 1);
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
                <img src="/images/logo.png" alt="logo" width="171" height="41" />
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
              <div
                className={`dropdown login-dropdown off-canvas ${
                  addCartLogin ? "opened" : ""
                } off-canvas`}
              >
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
                  <a
                    className="login-toggle "
                    href=""
                    data-toggle="login-modal"
                  >
                    <i className="p-icon-user-solid mr-2"></i>
                    <span className="">login/Signup</span>
                  </a>
                )}

                <div
                  className="canvas-overlay"
                  onClick={() => setaddCartLogin(false)}
                ></div>
                <a
                  href="#"
                  className="btn-close"
                  onClick={() => setaddCartLogin(false)}
                ></a>
                <div className="dropdown-box scrollable">
                  <div className="login-popup">
                    <div className="form-box">
                      <div className="tab tab-nav-underline tab-nav-boxed">
                        <ToastContainer />
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
                                setloading(true);
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
                                {loading && (
                                  <span
                                    style={{
                                      position: "relative",
                                      left: "4vh",
                                      top: "0.5vh",
                                    }}
                                  >
                                    <RotatingLines
                                      visible={true}
                                      height="20"
                                      width="25"
                                      color="	#87CEEB"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      ariaLabel="rotating-lines-loading"
                                      wrapperStyle={{}}
                                      wrapperClass=""
                                    />
                                  </span>
                                )}
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
                                setloading(true);
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
                                {loading && (
                                  <span
                                    style={{
                                      position: "relative",
                                      left: "4vh",
                                      top: "0.5vh",
                                    }}
                                  >
                                    <RotatingLines
                                      visible={true}
                                      height="20"
                                      width="25"
                                      color="	#87CEEB"
                                      strokeWidth="5"
                                      animationDuration="0.75"
                                      ariaLabel="rotating-lines-loading"
                                      wrapperStyle={{}}
                                      wrapperClass=""
                                    />
                                  </span>
                                )}
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
                                {data.productResponse.productImages &&
                                data.productResponse.productImages.length >
                                  0 ? (
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
                                ) : (
                                  <div>No Image Available</div>
                                )}
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
                                  {data.productResponse.sellingPrice}
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
                      <label>Subtotal:</label>
                      <span className="price">
                        {" "}
                        {cartdata.length > 0 &&
                          cartdata.reduce((acc, curr) => {
                            return acc + curr.subtotal;
                          }, 0)}{" "}
                        SAR
                      </span>
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
      </header>

      <main className="main single-product">
        <nav className="breadcrumb-nav">
          <div className="container">
            <div className="product-navigation">
              <ul className="breadcrumb">
                <li>
                  <a href="index.html">Home</a>
                </li>
                <li>
                  <a href="product-simple.html">Products</a>
                </li>
                <li>Product Name</li>
              </ul>
            </div>
          </div>
        </nav>
        <div className="page-content">
          <div className="container">
            <div className="product product-single product-simple row mb-8">
              <div className="col-md-7">
                <div className="product-gallery">
                  <div className="product-single-carousel owl-carousel owl-theme owl-nav-inner row cols-1 gutter-no">
                    <figure
                      className="product-image"
                      style={{ position: "relative", bottom: "32vh" }}
                    >
                      <img
                        src="images/products/product-resize1.jpg"
                        data-zoom-image="images/products/product-resize1.jpg"
                        alt="1"
                        style={{ width: 800, height: 1000 }}
                      />
                    </figure>
                    <figure className="product-image">
                      <img
                        src="images/products/product-resize2.jpg"
                        data-zoom-image="images/products/product-resize2.jpg"
                        alt="2"
                        style={{ width: 800, height: 1000 }}
                      />
                    </figure>
                    <figure className="product-image">
                      <img
                        src="images/products/product-resize3.jpg"
                        data-zoom-image="images/products/product-resize3.jpg"
                        alt="3"
                        style={{ width: 800, height: 1000 }}
                      />
                    </figure>
                    <figure className="product-image">
                      <img
                        src="images/products/product-resize4.jpg"
                        data-zoom-image="images/products/product-resize4.jpg"
                        alt="4"
                        style={{ width: 800, height: 1000 }}
                      />
                    </figure>
                  </div>
                  <div className="product-thumbs-wrap">
                    <div className="product-thumbs">
                      <div className="product-thumb productco">
                        <img
                          src="images/products/product-resize1.jpg"
                          alt="product thumbnail"
                          style={{ width: 240, height: 300 }}
                        />
                      </div>
                      <div className="product-thumb">
                        <img
                          src="images/products/product-resize2.jpg"
                          alt="product thumbnail"
                          style={{ width: 240, height: 300 }}
                        />
                      </div>

                      <div className="product-thumb">
                        <img
                          src="images/products/product-resize3.jpg"
                          alt="product thumbnail"
                          style={{ width: 240, height: 300 }}
                        />
                      </div>
                      <div className="product-thumb">
                        <img
                          src="images/products/product-resize4.jpg"
                          alt="product thumbnail"
                          style={{ width: 240, height: 300 }}
                        />
                      </div>
                    </div>
                    <button className="thumb-up disabled">
                      <i className="fas fa-chevron-left"></i>
                    </button>
                    <button className="thumb-down disabled">
                      <i className="fas fa-chevron-right"></i>
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-md-5">
                <div className="product-details">
                  <h1 className="product-name">
                    {data.length > 0 && data[0].productName}
                  </h1>

                  <p className="product-price mb-1">
                    <del className="old-price">
                      {" "}
                      {data.length > 0 && data[0].originalPrice}{" "}
                    </del>
                    <ins className="new-price">
                      {" "}
                      {data.length > 0 && data[0].sellingPrice} SAR
                    </ins>
                  </p>
                  <p className="product-short-desc">
                    {data.length > 0 && data[0].productDescription}
                  </p>

                  <div className="product-form mb-2 pt-1">
                    <select name="cleaning" id="cl-method">
                      <option value="Cleaning Method 1">
                        Cleaning method 1
                      </option>
                      <option value="Cleaning Method 2">
                        Cleaning method 2
                      </option>
                      <option value="Cleaning Method 3">
                        Cleaning method 3
                      </option>
                      <option value="Cleaning Method 4">
                        Cleaning method 4
                      </option>
                      <option value="Cleaning Method 5">
                        Cleaning method 5
                      </option>
                    </select>
                  </div>
                  <div className="product-variation-price"></div>
                  <div className="product-form product-qty pt-1">
                    <div className="product-form-group">
                      <div className="input-group">
                        <button
                          className="quantity-minus p-icon-minus-solid"
                          onClick={minusquantity}
                        ></button>
                        <p
                          className="quantity form-control"
                          style={{ position: "relative", top: "2vh" }}
                        >
                          {quantity}
                        </p>
                        <button
                          className="quantity-plus p-icon-plus-solid"
                          onClick={addquantity}
                        ></button>
                      </div>
                      <button
                        className="btn-cart ls-normal font-weight-semi-bold"
                        disabled={false}
                        onClick={handleAddcart}
                      >
                        <i className="p-icon-cart-solid"></i>ADD TO CART
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="product-content">
              <div className="content-specification mt-10 pt-3">
                <h2 className="title title-line title-underline">
                  <span> Specifications </span>
                </h2>
                <ul className="list-none">
                  <li>
                    <label>WEIGHT</label>
                    <p>5 kg</p>
                  </li>
                  <li>
                    <label>DIMENSIONS</label>
                    <p>10 × 10 × 10 cm</p>
                  </li>
                  <li>
                    <label>WEIGHT UNIT</label>
                    <p>1KG, 1LB, 500G, Bound, Each</p>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <section className="mt-3">
            <h2 className="text-center mb-7">Related Products</h2>
            <div
              className="owl-carousel owl-theme owl-nav-outer slider-brand row cols-lg-4 cols-md-3 cols-2"
              data-owl-options="{
                        'nav': true,
                        'dots': false,
                        'margin': 20,
                        'loop': false,
                        'responsive': {
                            '0': {
                                'items': 2,
                                'autoplay': true,
                                'nav': false
                            },
                            '768': {
                                'items': 3,
                                'nav': false
                            },
                            '992': {
                                'items': 4
                            }
                        }
                    }"
            >
              <div className="product-wrap">
                <div className="product text-center">
                  <figure className="product-media">
                    <a href="#">
                      <img
                        src="images/products/5-295x369.jpg"
                        alt="product"
                        style={{ width: 240, height: 300 }}
                      />
                    </a>

                    <div className="product-action-vertical">
                      <a
                        href="#"
                        className="btn-product-icon btn-cart"
                        data-toggle="modal"
                        data-target="#addCartModal"
                        title="Add to Cart"
                      >
                        <i className="p-icon-cart-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-wishlist"
                        title="Add to Wishlist"
                      >
                        <i className="p-icon-heart-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-compare"
                        title="Compare"
                      >
                        <i className="p-icon-compare-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-quickview"
                        title="Quick View"
                      >
                        <i className="p-icon-search-solid"></i>
                      </a>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="ratings-container">
                      <div className="ratings-full">
                        <span
                          className="ratings"
                          style={{ width: "60%" }}
                        ></span>
                        <span className="tooltiptext tooltip-top"></span>
                      </div>
                      <a
                        href="product-simple.html#content-reviews"
                        className="rating-reviews hash-scroll"
                      >
                        (12)
                      </a>
                    </div>
                    <h5 className="product-name">
                      <a href="#"> Lorem. </a>
                    </h5>
                    <div className="product-price">
                      <ins className="new-price">$00.00</ins>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-wrap">
                <div className="product text-center">
                  <figure className="product-media">
                    <a href="#">
                      <img
                        src="images/products/6-295x369.jpg"
                        alt="product"
                        style={{ width: 240, height: 300 }}
                      />
                    </a>

                    <div className="product-action-vertical">
                      <a
                        href="#"
                        className="btn-product-icon btn-cart"
                        data-toggle="modal"
                        data-target="#addCartModal"
                        title="Add to Cart"
                      >
                        <i className="p-icon-cart-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-wishlist"
                        title="Add to Wishlist"
                      >
                        <i className="p-icon-heart-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-compare"
                        title="Compare"
                      >
                        <i className="p-icon-compare-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-quickview"
                        title="Quick View"
                      >
                        <i className="p-icon-search-solid"></i>
                      </a>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="ratings-container">
                      <div className="ratings-full">
                        <span
                          className="ratings"
                          style={{ width: "60%" }}
                        ></span>
                        <span className="tooltiptext tooltip-top"></span>
                      </div>
                      <a
                        href="product-simple.html#content-reviews"
                        className="rating-reviews hash-scroll"
                      >
                        (12)
                      </a>
                    </div>
                    <h5 className="product-name">
                      <a href="#"> Lorem, ipsum. </a>
                    </h5>
                    <div className="product-price">
                      <del className="old-price">$0.00</del>
                      <ins className="new-price">$0.00</ins>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-wrap">
                <div className="product text-center">
                  <figure className="product-media">
                    <a href="#">
                      <img
                        src="images/products/7-295x369.jpg"
                        alt="product"
                        style={{ width: 295, height: 369 }}
                      />
                    </a>

                    <div className="product-action-vertical">
                      <a
                        href="#"
                        className="btn-product-icon btn-cart"
                        data-toggle="modal"
                        data-target="#addCartModal"
                        title="Add to Cart"
                      >
                        <i className="p-icon-cart-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-wishlist"
                        title="Add to Wishlist"
                      >
                        <i className="p-icon-heart-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-compare"
                        title="Compare"
                      >
                        <i className="p-icon-compare-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-quickview"
                        title="Quick View"
                      >
                        <i className="p-icon-search-solid"></i>
                      </a>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="ratings-container">
                      <div className="ratings-full">
                        <span
                          className="ratings"
                          style={{ width: "60%" }}
                        ></span>
                        <span className="tooltiptext tooltip-top"></span>
                      </div>
                      <a
                        href="product-simple.html#content-reviews"
                        className="rating-reviews hash-scroll"
                      >
                        (12)
                      </a>
                    </div>
                    <h5 className="product-name">
                      <a href="#"> Lorem, ipsum dolor. </a>
                    </h5>
                    <div className="product-price">
                      <ins className="new-price">$0.00</ins>
                    </div>
                  </div>
                </div>
              </div>
              <div className="product-wrap">
                <div className="product text-center">
                  <figure className="product-media">
                    <a href="#">
                      <img
                        src="images/products/fish10.jpg"
                        alt="product"
                        style={{ width: 295, height: 369 }}
                      />
                    </a>
                    <div className="product-action-vertical">
                      <a
                        href="#"
                        className="btn-product-icon btn-cart"
                        data-toggle="modal"
                        data-target="#addCartModal"
                        title="Add to Cart"
                      >
                        <i className="p-icon-cart-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-wishlist"
                        title="Add to Wishlist"
                      >
                        <i className="p-icon-heart-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-compare"
                        title="Compare"
                      >
                        <i className="p-icon-compare-solid"></i>
                      </a>
                      <a
                        href="#"
                        className="btn-product-icon btn-quickview"
                        title="Quick View"
                      >
                        <i className="p-icon-search-solid"></i>
                      </a>
                    </div>
                  </figure>
                  <div className="product-details">
                    <div className="ratings-container">
                      <div className="ratings-full">
                        <span
                          className="ratings"
                          style={{ width: "60%" }}
                        ></span>
                        <span className="tooltiptext tooltip-top"></span>
                      </div>
                      <a href="" className="rating-reviews hash-scroll">
                        (12)
                      </a>
                    </div>
                    <h5 className="product-name">
                      <a href="#"> Lorem. </a>
                    </h5>
                    <div className="product-price">
                      <ins className="new-price">$0.00</ins>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
        <div className="mobile-menu-wrapper">
          <div className="mobile-menu-overlay"></div>

          <a className="mobile-menu-close" href="#">
            <i className="p-icon-times"></i>
          </a>

          <div className="mobile-menu-container scrollable">
            <form action="#" className="inline-form">
              <input
                type="search"
                name="search"
                autoComplete="off"
                placeholder="Search your keyword..."
                required=""
              />
              <button className="btn btn-search" type="submit">
                <i className="p-icon-search-solid"></i>
              </button>
            </form>

            <ul className="mobile-menu mmenu-anim">
              <li>
                <a href="/">Home</a>
              </li>
              <li>
                <a href="/shopview">Shop</a>
              </li>
              <li>
                <a href="about.html">About Us</a>
              </li>
              <li>
                <a href="contact.html">Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
}

export default Herocart;
