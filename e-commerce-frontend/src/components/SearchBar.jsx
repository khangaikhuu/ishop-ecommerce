import { useContext } from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { LoginContext } from "../context/login-provider";

export default function SearchBar(props) {
  const { login, setLogin } = useContext(LoginContext);

  function signOut() {
    localStorage.removeItem("token");
    setLogin(false);
  }

  const [showWish, setShowWish] = useState(false);
  const [showBasket, setShowBasket] = useState(false);
  const [searchValue, setSearchValue] = useState("");
  const notifyBasketRemove = (title) =>
    toast.error(title + "-г сагснаас амжилттай устгалаа.! ", {
      icon: <i class="bi bi-trash3"></i>,
    });

  const notifyWishlistRemove = (title) =>
    toast.error(title + "-г Wislist-ээс амжилттай устгалаа .! ", {
      icon: <i class="bi bi-trash3"></i>,
    });

  function clearCart() {
    props.setBasket([]);
  }

  function clearWishlist() {
    props.setWishlist([]);
  }

  function removeFromBasket(id, title, props) {
    console.log("--------To remove from Basket ");
    console.log("Basket remove ID = " + id);
    props.setBasket(props.basket.filter((a) => a.id !== id));
    notifyBasketRemove(title);
  }

  console.log("Wishlist array = ");
  console.log(props.wishlist);

  console.log("Basket array = ");
  console.log(props.basket);

  function removeFromWishlist(id, title, props) {
    console.log("--------To remove from wishlist ");
    console.log("wishlist remove ID = " + id);
    props.setWishlist(props.wishlist.filter((a) => a.id !== id));
    notifyWishlistRemove(title);
  }

  function handleSearchInput(e) {
    console.log(e.target.value);
    setSearchValue(e.target.value);
  }

  return (
    <div className="searchbar-container">
      <div className="container">
        <div className="row xx">
          <div className="logo-container col-4 col-md-3">
            <Link to={"/"}>
              <img src="image/content/logo1.png" alt="" />
            </Link>
          </div>

          <div className="col-6 col-md-4 d-none d-md-block">
            <div className="input-group">
              <input
                type="search"
                className="form-control rounded"
                placeholder="Search"
                aria-label="Search"
                aria-describedby="search-addon"
                value={searchValue}
                onChange={handleSearchInput}
              />
              <Link
                className="btn btn-warning"
                to={"/search"}
                state={{
                  data: searchValue,
                }}
              >
                search
              </Link>
            </div>
          </div>

          <div className="col-sm-1"></div>
          <div className="col-12 col-sm-5 col-md-4 justify-content-center signin-container">
            <div className="signin">
              <i className="bi bi-person"></i>
              <span className="space"> </span>

              <button onClick={signOut}>
                {login ? "Sign out" : "Sign in"}
              </button>
            </div>
            <div className="favorite">
              <i
                className="bi bi-suit-heart"
                onClick={() => setShowWish(!showWish)}
              >
                {props.wishlist.length > 0 ? (
                  <div id="wishSize">
                    <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                      {props.wishlist.length}
                    </span>
                  </div>
                ) : (
                  <p></p>
                )}
              </i>
            </div>
            <div className="basket">
              <i
                className="bi bi-cart"
                onClick={() => setShowBasket(!showBasket)}
              >
                {props.basket.length > 0 ? (
                  <div id="basketSize">
                    <span className="position-absolute top-0 start-95 translate-middle badge rounded-pill bg-danger">
                      {props.basket.length}
                    </span>
                  </div>
                ) : (
                  <p></p>
                )}
              </i>
            </div>
          </div>
        </div>

        {showWish && (
          <div id="wishlist-container">
            <a onClick={() => setShowWish(false)}>
              <i className="bi bi-x-circle-fill close-btn"> </i>
            </a>
            <div className="wishlist-header d-flex justify-content-between">
              <h4>Таны Wishlist</h4>
              <button
                className="btn btn-warning"
                onClick={() => {
                  clearWishlist();
                }}
              >
                Хоослох
              </button>
            </div>

            {props.wishlist.length > 0 ? (
              props.wishlist.map((myWishList, index) => {
                return (
                  <div key={index} className="wishlist-product">
                    <img
                      src={myWishList.imgUrl[0].original}
                      alt="myWishList.title"
                    />
                    <div>
                      <div>{myWishList.title}</div>
                      <div>${myWishList.price}</div>
                    </div>
                    <div>
                      <a
                        onClick={() =>
                          removeFromWishlist(
                            myWishList.id,
                            myWishList.title,
                            props
                          )
                        }
                      >
                        <i className="bi bi-x-circle-fill"> </i>
                      </a>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h5>Таны wishlist хоосон байна</h5>
              </div>
            )}
          </div>
        )}

        {showBasket && (
          <div id="basket-container">
            <a onClick={() => setShowBasket(false)}>
              <i className="bi bi-x-circle-fill close-btn"> </i>
            </a>
            <div className="basket-header d-flex justify-content-between">
              <h4>Таны сагс</h4>
              <button
                className="btn btn-warning"
                onClick={() => {
                  clearCart();
                }}
              >
                Хоослох
              </button>
            </div>

            {props.basket.length > 0 ? (
              props.basket.map((basket, index) => {
                return (
                  <div>
                    <div key={index} className="basket-product">
                      <img src={basket.imgUrl[0].original} alt="basket.title" />

                      <div>
                        <div>{basket.title}</div>
                        <div>${basket.price}</div>
                        <div>Order Qty: {basket.orderQty} pc</div>
                        <div>Color: {basket.selectedColor}</div>
                        <div>Size: {basket.selectedSize}</div>
                      </div>
                      <div>
                        <a
                          onClick={() =>
                            removeFromBasket(basket.id, basket.title, props)
                          }
                        >
                          <i className="bi bi-x-circle-fill"> </i>
                        </a>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <div>
                <h5>Таны сагс хоосон байна</h5>
              </div>
            )}
            <div className="go-to-cart">
              {" "}
              <Link to={"/cart"}>
                {" "}
                <button className="btn btn-warning" id="go-to-basket-button">
                  Сагсруу үсрэх
                </button>{" "}
              </Link>{" "}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
