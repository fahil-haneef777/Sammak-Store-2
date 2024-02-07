import { useState, lazy, Suspense } from "react";
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/home/home";
import { Provider } from "./Context/Context";
import Herocart from "../component/herocart/Herocart";
import Viewcart from "../component/Viewcart/Viewcart";
import Checkout from "../component/Checkout/Checkout";
import ResetPassword from "../pages/home/ResetPassword/ResetPassword";
import Shopview from "../component/Shopview/Shopview";
import SliderMain from "../component/SliderMain/SliderMain";
import OrderComplete from "../component/OrderComplete/OrderComplete";
// import CheckoutMain from "../component/Main/CheckoutMain";
import Aboutview from "../component/Aboutview/Aboutview";
import Contactview from "../component/Contactview/Contactview";

function App() {
  const [count, setCount] = useState(0);
  const CheckoutMain = lazy(() => import("../component/Main/CheckoutMain"));

  return (
    <Provider>
      <BrowserRouter>
        <Suspense fallback={<div>Loading...</div>}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/shop" element={<Herocart />} />
            <Route path="/about" element={<Aboutview />} />
            <Route path="/viewcart" element={<Viewcart />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/reset" element={<ResetPassword />} />
            <Route path="/shopview" element={<Shopview />} />
            <Route path="/contact" element={<Contactview />} />
            <Route path="/orderComplete" element={<OrderComplete />} />
            <Route path="/setting" element={<CheckoutMain />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
