import Banner from "./Banner";
import AliceCarousel from "react-alice-carousel";
import carouselData from "../data/carousel";
import Category from "./Category";
import Products from "./Products";
import React, { useEffect } from "react";
import Poster from "./Poster";
import ProductsPart2 from "./ProductsPart2";
import { useState } from "react";

import { ToastContainer } from "react-toastify";
import { fetchPopularCategory, fetchProducts } from "../services/fetchData";
const POPULAR_URL = "http://localhost:8181/api/popular";
const PRODUCT_URL = "http://localhost:8181/api/products";

function Home({ wishlist, setWishlist, basket, setBasket }) {
  //   const [wishlist, setWishlist] = useState([]);
  //   const [basket, setBasket] = useState([]);
  const [show, setShow] = useState(false);
  const [popularCategory, setPopularCategory] = useState([]);
  const [productsData, setProducts] = useState([]);

  useEffect(() => {
    fetchPopularCategory(POPULAR_URL, setPopularCategory);
    fetchProducts(PRODUCT_URL, setProducts);
  }, []);

  console.log(productsData);
  const images = carouselData.map((data) => {
    return <img src={data.url} className={data.style} />;
  });

  const popProducts = popularCategory.map((data) => {
    return (
      <button
        type="button"
        className="category-btn btn btn-outline-light text-dark border mx-2"
      >
        {data.title}
      </button>
    );
  });

  // populate data between 2 ranges (array)
  function populateProduct(min, max) {
    const products = productsData.map((data, index) => {
      if (index >= min && index <= max) {
        return (
          <Products
            id={data.id}
            title={data.title}
            imgUrl={data.imgUrl}
            price={data.price}
            rating={data.rating}
            reviews={data.reviews}
            quantity={data.quantity}
            color={data.color}
            size={data.size}
            show={show}
            setShow={setShow}
            wishlist={wishlist}
            setWishlist={setWishlist}
            basket={basket}
            setBasket={setBasket}
            description={data.description}
          />
        );
      }
    });

    return products;
  }

  const productsPart2 = productsData.map((data, index) => {
    if (index == 16) {
      return (
        <ProductsPart2
          id={data.id}
          title={data.title}
          imgUrl={data.imgUrl}
          price={data.price}
          rating={data.rating}
          reviews={data.reviews}
          quantity={data.quantity}
          color={data.color}
          size={data.size}
          show={show}
          setShow={setShow}
          wishlist={wishlist}
          setWishlist={setWishlist}
          basket={basket}
          setBasket={setBasket}
          description={data.description}
        />
      );
    }
  });

  return (
    <div className="App">
      <div id="product-container" className="container">
        <ToastContainer
          position="bottom-right"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />

        <div className="my-container">
          <Banner />
        </div>

        <div className="my-container">
          <Category />
        </div>

        <div className="container">
          <div className="product-cards-container row btn-container d-flex justify-content-between mb-4 mt-5">
            <p className="col-3 header">Popular products</p>
            <div className="col-7 d-flex justify-content-end">
              {popProducts}
            </div>
          </div>
        </div>

        <AliceCarousel autoPlay autoPlayInterval="8000" disableButtonsControls>
          <div className="product-cards-container">{populateProduct(0, 7)}</div>
          <div className="product-cards-container">
            {populateProduct(8, 15)}
          </div>
        </AliceCarousel>

        <Poster />

        <div className="product-cards-container part2">{productsPart2}</div>

        <div className="service mt-5 row">
          <div className="free-delivery-container col-12 col-md-4">
            <img src="./image/content/box-tick.png" alt="" />
            <div className="free-delivery-text-container">
              <div className="free-delivery-txt">Free delivery</div>
              <div className="free-delivery-txt-small">
                on order above $50,00
              </div>
            </div>
          </div>

          <div className="best-quality-container col-12 col-md-4">
            <img src="./image/content/crown.png" alt="" />
            <div className="best-quality-text-container">
              <div className="best-quality-txt">Best quality</div>
              <div className="best-quality-txt-small">
                best quality in low price
              </div>
            </div>
          </div>

          <div className="warranty-container col-12 col-md-4">
            <img src="./image/content/shield-security.png" alt="" />
            <div className="warranty-text-container">
              <div className="warranty-txt">1 year warranty</div>
              <div className="warranty-txt-small">available warranty</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
