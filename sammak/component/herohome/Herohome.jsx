import React, { useState, useEffect, useContext } from "react";
import HeroSlider from "../heroSlider/HeroSlider";
import style from "./Herohome.module.css";
import axios from "axios";
import Loader from "react-js-loader";
import AllContext from "../../src/Context/Context";
import { useNavigate } from "react-router-dom";
import SliderMain from "../SliderMain/SliderMain";
import SpecialSection from "../SpecialSection/SpecialSection";
import '../../main.js'
function Herohome() {
  const [data, setdata] = useState([]);
  const { id, setid, cart, setcart, productinfo, setproductinfo } =
    useContext(AllContext);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get("http://13.200.180.167:9731/Product/post")
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

  const onCart = () => {
    navigate("/shop");
  };
  return (
    <div>
      {data.length === 0 ? (
        <div className={style.beforeload}>
          {" "}
          <div className={style.home_loader}>
            {" "}
            <Loader
              type="bubble-scale"
              bgColor={"#163b4d"}
              color={"blue"}
              size={50}
            />
          </div>
        </div>
      ) : (
        <main className="main">
          <div className="page-content">
            {/* Hero section  */}
            <SliderMain />
            {/* <Slider /> */}

            {/* top products  */}
            <section
              className="container mt-10 pt-7 mb-7 appear-animate fadeIn appear-animation-visible"
              style={{ animationDuration: "1.2s" }}
            >
              <h2 className="title-underline2 text-center mb-2">
                <span>Top Products</span>
              </h2>
              <div className={style.topProductContainer} id="productContainer">
                {data.length > 0 &&
                  Array.isArray(data) &&
                  data
                    .map((field, index) => (
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
                                style={{ width: "290px", height: "369px" }}
                                className="homelistingimg"
                              />
                              <img
                                src="images/products/5-2-295x369.jpg"
                                alt="product"
                                style={{ width: "295px", height: "369px" }}
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
                    ))
                    .slice(0, 4)}
              </div>
              <SpecialSection />
            </section>
          </div>
        </main>
      )}
    </div>
  );
}

export default Herohome;
