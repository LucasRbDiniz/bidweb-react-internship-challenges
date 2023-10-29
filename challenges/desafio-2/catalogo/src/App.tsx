import "./App.css"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/home/Home"
import ProductInfo from "./pages/ProductInfo/ProductInfo";
import Cart from "./pages/cart/Cart";

function App() {

  return (
    <>
		<BrowserRouter>
			<Routes>
				<Route path="" element={<Home />} />
				<Route path="/product/:productId" element={<ProductInfo />} />
				<Route path="/cart" element={<Cart />} />
			</Routes>
		</BrowserRouter>	
    </>
  )
}

export default App