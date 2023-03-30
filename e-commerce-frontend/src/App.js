import "./App.css";
import React from "react";

import { Link, Routes, Route } from "react-router-dom";
import Signup from "./components/Signup";
import Home from "./components/Home";
import CallService from "./components/CallService";
import MainMenu from "./components/MainMenu";
import SearchBar from "./components/SearchBar";
import { useState } from "react";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import SearchResult from "./components/SearchResult";
import Login from "./components/Login";

function App() {
  const [wishlist, setWishlist] = useState([]);
  const [basket, setBasket] = useState([]);
  return (
    <div>
      <div id="product-container" className="container">
        <CallService />
        <MainMenu />
        <SearchBar
          wishlist={wishlist}
          setWishlist={setWishlist}
          basket={basket}
          setBasket={setBasket}
        />
      </div>

      <div>
        <Routes>
          <Route
            path="/"
            element={
              <Home
                wishlist={wishlist}
                setWishlist={setWishlist}
                basket={basket}
                setBasket={setBasket}
              />
            }
          ></Route>
          <Route path="/signup" element={<Signup />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/search" element={<SearchResult />} />
          <Route
            path="/productDetails/:id"
            element={
              <ProductDetails
                wishlist={wishlist}
                setWishlist={setWishlist}
                basket={basket}
                setBasket={setBasket}
              />
            }
          ></Route>
          <Route
            path="/cart"
            element={<Cart basket={basket} setBasket={setBasket} />}
          ></Route>
        </Routes>
      </div>
    </div>
  );
}

export default App;
