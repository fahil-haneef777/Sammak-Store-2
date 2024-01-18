import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import AllContext from "../../src/Context/Context";
import Herocart from "../herocart/Herocart";
import { useNavigate } from "react-router-dom";
import Loader from "react-js-loader";
import style from "./Heroshop.module.css";
import '../../main.js'
function Heroshop() {
  const [data, setdata] = useState("");
  const { id, setid, cart, setcart, productinfo, setproductinfo } =
    useContext(AllContext);

  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`${import.meta.env.VITE_URL}/Product/post`)
      .then((res) => {
        console.log(res.data.result);
        setdata(res.data.result);
        setproductinfo(res.data.result);
        localStorage.setItem("products", JSON.stringify(res.data.result));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // useEffect(() => {
  //   const newdata =
  //     data.length > 0 &&
  //     data.filter((fil) => {
  //       return fil.id === id;
  //     });

  //   setproductinfo(newdata);
  // }, [id, data]);

  const onCart = () => {
    navigate("/shop");
  };
  console.log(id);

  return (
    <main className="main">
      {/* page Header */}
      <div
        className="page-header cph-header pl-4 pr-4"
        style={{ backgroundColor: "#f9f8f4" }}
      >
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
                <div className={style.loader_content  }>
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
                          style={{ width: "269px", height: "369px" }}
                        />
                        <img
                          src="images/products/5-2-295x369.jpg"
                          alt="product"
                          style={{ width: "269px", height: "369px" }}
                        />
                      </a>
                      {/* Product actions */}
                    </figure>
                    <div className="product-details">
                      <div className="ratings-container"></div>
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
