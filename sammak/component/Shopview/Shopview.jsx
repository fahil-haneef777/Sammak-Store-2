import React from "react";
import { useState, useEffect } from "react";
import Herohome from "../herohome/Herohome";
import Heroshop from "../heroshop/Heroshop";
import Heroabout from "../heroabout/Heroabout";
import Herocontact from "../herocontact/Herocontact";
import axios from "axios";
import { useContext } from "react";
import AllContext from "../../src/Context/Context";
import Herocart from "../herocart/Herocart";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import { RotatingLines } from "react-loader-spinner";
import "../../main.js";
import "../../css/style.css";
import Footer from "../Footer.jsx";

function Shopview() {
  const [loginuser, setloginuser] = useState({ email: "", password: "" });
  const [registeruser, setregisteruser] = useState({
    emailId: "",
    password: "",
    userName: "",
  });
  const [cartdata, setcartdata] = useState("");
  const [shop, setshop] = useState(true);
  const [home, sethome] = useState(false);
  const [loading, setloading] = useState(false);
  const navigate = useNavigate();
  const {
    loggedin,
    setloggedin,

    about,
    setabout,
    contact,
    setcontact,
    cart,
    search,
    setsearch,
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
  let newdata = JSON.stringify(registeruser);
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
    } else {
      axios
        .post(`${import.meta.env.VITE_URL}/v1/auth/createUser`, registeruser)
        .then((res) => {
          console.log(res.data);
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

  const config = {
    headers: {
      Accept: "*/*",
      Authorization: `Bearer ` + localStorage.getItem("token"),
    },
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
  useEffect(() => {}, [search]);

  const handleDelete = (index, id, cartid) => {
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
        )}/${cartid}`,
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
              <a className="contact">
                <i className="p-icon-map"></i>
                <span>Saudi Arabia,Jazan, KSA</span>
              </a>
            </div>
            <div className="header-right">
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
              <a className="mobile-menu-toggle" title="Mobile Menu">
                <i className="p-icon-bars-solid"></i>
              </a>
              <a className="logo">
                <img src="images/logo.png" alt="logo" width="171" height="41" />
              </a>
            </div>
            <div className="header-center">
              <nav className="main-nav">
                <ul className="menu">
                  <li className={home ? "active" : ""}>
                    <a href="/">Home</a>
                  </li>
                  <li style={{ cursor:'pointer' }} className={shop ? "active" : ""}>
                    <a onClick={shop1}>Shop</a>
                  </li>
                  <li  style={{ cursor:'pointer' }} className={about ? "active" : ""}>
                    <a onClick={about1}>About Us</a>
                  </li>
                  <li  style={{ cursor:'pointer' }} className={contact ? "active" : ""}>
                    <a onClick={contact1}>Contact Us</a>
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
                    onInput={(e) => {
                      setsearch(e.target.value);
                    }}
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
                          <ToastContainer />
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
                        {cartdata.length > 0 ? cartdata.length : 0}
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
                              <a>
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
                                    data.productResponse.productId,
                                    data.cartId
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
                      <label>Total:</label>
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
              <li>
                <a onClick={about1}>About Us</a>
              </li>
              <li>
                <a onClick={contact1}>Contact Us</a>
              </li>
            </ul>
          </div>
        </div>
      </header>

      {home ? (
        <Herohome />
      ) : shop ? (
        <Heroshop search={search} setseatch={setsearch} />
      ) : about ? (
        <Heroabout />
      ) : contact ? (
        <Herocontact />
      ) : (
        ""
      )}
      <Footer />
    </>
  );
}

export default Shopview;
