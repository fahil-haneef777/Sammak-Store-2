import React, { useEffect, useState } from "react";
import Header from "../Header";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useNavigate } from "react-router-dom";
function OrderComplete(props) {
  const [cartdata, setcartdata] = useState("");
  const token = localStorage.getItem("token");

  const navigate = useNavigate();

  useEffect(() => {
    const handlePageLoad = () => {
      // Reload the page when it is loaded
      window.location.reload();
    };

    // Attach the event listener to handle page load
    window.addEventListener('load', handlePageLoad);

    // Cleanup the listener when the component is unmounted
    return () => {
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  const config = {
    headers: {
      Accept: "application/json",
      Authorization: `Bearer ` + token,
    },
  };
  let cart = JSON.parse(localStorage.getItem("cart"));

  return (
    <>
      <ToastContainer />
      <div className="page-content pt-8 pb-10 mb-10">
        <div className="step-by pr-4 pl-4">
          <h3 className="title title-step">
            <a href="cart.html">1. Shopping Cart</a>
          </h3>
          <h3 className="title title-step">
            <a href="checkout.html">2. Checkout</a>
          </h3>
          <h3 className="title title-step active">
            <a href="order.html">3. Order Complete</a>
          </h3>
        </div>
        <div className="container mt-7">
          <div className="order-message">
            <div className="icon-box d-inline-flex align-items-center">
              <div className="icon-box-icon mb-0">
                <svg
                  xmlnsXlink="http://www.w3.org/1999/xlink"
                  x="0px"
                  y="0px"
                  viewBox="0 0 50 50"
                  enableBackground="new 0 0 50 50"
                  xmlSpace="preserve"
                >
                  <g>
                    <path
                      fill="none"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                      strokeMiterlimit="10"
                      d="
                      M33.3,3.9c-2.7-1.1-5.6-1.8-8.7-1.8c-12.3,0-22.4,10-22.4,22.4c0,12.3,10,22.4,22.4,22.4c12.3,0,22.4-10,22.4-22.4
                      c0-0.7,0-1.4-0.1-2.1"
                    ></path>
                    <polyline
                      fill="none"
                      strokeWidth="3"
                      strokeLinecap="round"
                      strokeLinejoin="bevel"
                      strokeMiterlimit="10"
                      points="
                      48,6.9 24.4,29.8 17.2,22.3 	"
                    ></polyline>
                  </g>
                </svg>
              </div>
              <h3 className="icon-box-title">
                Thank you. Your Order has been received.
              </h3>
            </div>
          </div>
          <div className="order-results row cols-xl-6 cols-md-3 cols-sm-2 mt-10 pt-2 mb-4">
            {/* Order results go here */}
          </div>
          <h2 className="detail-title mb-6">Order Details</h2>
          <div className="order-details">
            <table className="order-details-table">
              <thead>
                <tr className="summary-subtotal">
                  <td>
                    <h3 className="summary-subtitle">Your Order</h3>
                  </td>
                  <td></td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="product-subtitle">Product</td>
                  <td></td>
                </tr>
                {/* Product details go here */}
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Subtotal:</h4>
                  </td>
                  <td className="summary-value font-weight-normal">
                    {" "}
                    {cart.length > 0 &&
                      cart
                        .reduce((acc, curr) => {
                          return acc + curr.subtotal;
                        }, 0)
                        .toFixed(2)}{" "}
                    SAR
                  </td>
                </tr>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Payment method:</h4>
                  </td>
                  <td className="summary-value">Cash on delivery</td>
                </tr>
                <tr className="summary-subtotal">
                  <td>
                    <h4 className="summary-subtitle">Total:</h4>
                  </td>
                  <td>
                    <p className="summary-total-price">
                      {cart.length > 0 &&
                        cart
                          .reduce((acc, curr) => {
                            return acc + curr.subtotal;
                          }, 0)
                          .toFixed(2)}{" "}
                      SAR
                    </p>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}

export default OrderComplete;
