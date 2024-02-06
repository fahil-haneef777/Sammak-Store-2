import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllContext from "../../src/Context/Context";
import Herocart from "../herocart/Herocart";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import style from "./Heroshop.module.css";
import "../../main.js";
function Heroshop() {
  const [data, setdata] = useState("");
  const {
    id,
    setid,
    cart,
    setcart,
    productinfo,
    setproductinfo,
    search,
    setsearch,
  } = useContext(AllContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/Product/post`)
      .then((res) => {
        setdata(res.data.result);
        setproductinfo(res.data.result);
        localStorage.setItem("products", JSON.stringify(res.data.result));
      })
      .catch((err) => {});
  }, []);

  useEffect(() => {
    let newdata =
      data.length > 0 &&
      data.filter((info) => {
        info.productName.includes(search);
      });
    setdata(newdata);
  }, [search]);

  const onCart = () => {
    navigate("/shop");
  };

  return (
    <main className="main">
      {/* page Header */}
      <div className="page-header shop-hero cph-header pl-4 pr-4">
        <h1 className="page-title font-weight-light text-capitalize">
          Sammak Shop
        </h1>
        {/* Category container */}
      </div>
      {/* ends */}

      {/* breadcrumps  */}
      <nav className="breadcrumb-nav has-border">
        <div className="container">
          <ul className="breadcrumb">
            <li>
              <a href="/">Home</a>
            </li>
            <li>Shop</li>
          </ul>
        </div>
      </nav>
      {/* ends */}

      {/* page content static container */}
      <div className="page-content mb-10 shop-page shop-horizontal">
        <div className="container">
          <div className="row product-wrapper cols-lg-5 cols-md-4 cols-sm-3 cols-2">
            {/* Product 1 */}
            {data.length === 0 && (
              <div className={style.beforeload}>
                {" "}
                <div className={style.loader_content}>
                  {" "}
                  <Loader
                    type="bubble-scale"
                    bgColor={"#163b4d"}
                    color={"blue"}
                    size={50}
                  />
                </div>
              </div>
            )}

            {data.length > 0 &&
              Array.isArray(data) &&
              data.map((field, index) => (
                <div
                  className="product-wrap"
                  style={{ display: "flex", flexDirection: "row" }}
                  key={index}
                  onClick={() => {
                    setid(field.id);
                    localStorage.setItem("id", field.id);
                    onCart();
                    window.location.reload();
                  }}
                >
                  <div className="product shadow-media text-center">
                    <figure
                      className="product-media"
                      style={{ cursor: "pointer" }}
                    >
                      <a>
                        <img
                          src={
                            field.images.length > 0
                              ? field.images[0].imageUrl
                              : ""
                          }
                          alt="product"
                          style={{ width: "295", height: "369" }}
                          className="homelistingimg"
                        />
                        <img
                          src={
                            field.images.length > 0
                              ? field.images[0].imageUrl
                              : ""
                          }
                          alt="product"
                          style={{ width: "295", height: "369" }}
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
                      {/* Product actions */}
                    </figure>
                    <div className="product-details">
                      <div className="ratings-container">
                        <div className="ratings-full">
                          <span
                            className="ratings"
                            style={{ width: "60%" }}
                          ></span>
                          <span className="tooltiptext tooltip-top">3.00</span>
                        </div>
                        <a
                          href="javascript:void(0);"
                          className="rating-reviews"
                        >
                          (12)
                        </a>
                      </div>
                      <h5 className="product-name">
                        <a
                          href="product-simple.html"
                          style={{
                            color: "#163b4d",
                            fontWeight: "600",
                            scale: "1.1",
                          }}
                        >
                          {field.productName}
                        </a>
                      </h5>
                      <span className="product-price">
                        <del className="old-price">
                          {field.originalPrice} SAR
                        </del>
                        <ins
                          className="new-price"
                          style={{ fontWeight: "bold" }}
                        >
                          &nbsp; {field.sellingPrice} SAR
                        </ins>
                      </span>
                    </div>
                  </div>
                </div>
              ))}

            {/* Product 2 */}
            {/* ... Other products */}
          </div>
        </div>
      </div>
      {/* ends */}
      {cart ? <Herocart /> : ""}
    </main>
  );
}

export default Heroshop;
