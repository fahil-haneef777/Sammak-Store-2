import { useState } from "react";
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


function App() {
  const [count, setCount] = useState(0);
  

  return (
    <Provider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Herocart />} />
          <Route path="/viewcart" element={<Viewcart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/reset" element={<ResetPassword />} />
          <Route path="/shopview" element={<Shopview />} />
        
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
