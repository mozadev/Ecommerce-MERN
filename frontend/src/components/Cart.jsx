  import { useEffect } from "react"; // to manage sync with redux 
  import { useSelector, useDispatch } from "react-redux";

  import { Link, useNavigate } from "react-router-dom";
  import authSlice from "../features/authSlice";
  import {
    addToCart,
    clearCart,
    decreaseCart,
    getTotals,
    removeFromCart,
  } from "../features/cartSlice";
  import PayButton from "./PayButton";

  const Cart = () => {
    const cart = useSelector((state) => state.cart);
    const auth = useSelector((state) => state.auth);// obtiene estado de auth desde el store de redux

    const dispatch = useDispatch(); // obtiene funciont para dispachar reduc
    const navigate = useNavigate();

    useEffect(() => {
      dispatch(getTotals());
    }, [cart, dispatch]);// se usa para recalcular cadavez q cart cambia  o el dispatch

    const handleRemoveFromCart = (cartItem) => {
      dispatch(removeFromCart(cartItem));
    };

    const handleDecreaseCart = (cartItem) => {
      dispatch(decreaseCart(cartItem));
    };

    const handleIncreaseCart = (cartItem) => {
      dispatch(addToCart(cartItem));
    };
    const handleClearCart = () => {
      dispatch(clearCart());// limpiar el carrito despachando la accion clearart
    };
    return (
      <div className="cart-container">
        <h2>Carrito de Compras</h2>
        {cart.cartItems.length === 0 ? (
          <div className="cart-empty">
            <p>Your card is currently empty</p>
            <div className="start-shopping">
              <Link to="/">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  fill="currentColor"
                  className="bi bi-arrow-left"
                  viewBox="0 0 16 16"
                >
                  <path
                    fillRule="evenodd"
                    d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                  />
                </svg>
                <span>Start Shopping</span>
              </Link>
            </div>
          </div>
        ) : (
          <div>
            <div className="titles">
              <h3 className="product-title">Product</h3>
              <h3 className="price">Price</h3>
              <h3 className="Quantity">Quantity</h3>
              <h3 className="total">Total</h3>
            </div>
            <div className="cart-items">
              {cart.cartItems?.map((cartItem) => (
                <div className="cart-item" key={cartItem._id}>
                  <div className="cart-product">
                    <img src={cartItem.image.url} alt={cartItem.name} /> 
                    {/* <img src={cartItem.image} alt={cartItem.name} /> */}
                    <div>
                      <h3>{cartItem.name}</h3>
                      <p>{cartItem.desc}</p>
                      <button onClick={() => handleRemoveFromCart(cartItem)}>
                        Remove
                      </button>
                    </div>
                  </div>
                  <div className="cart-product-price">${cartItem.price}</div>
                  <div className="cart-product-quantity">
                    <button onClick={() => handleDecreaseCart(cartItem)}>
                      -
                    </button>
                    <div className="count">{cartItem.cartQuantity}</div>
                    <button onClick={() => handleIncreaseCart(cartItem)}>
                      +
                    </button>
                  </div>
                  <div className="cart-product-total-price">
                    ${cartItem.price * cartItem.cartQuantity}
                  </div>
                </div>
              ))}
            </div>
            <div className="cart-summary">
              <button className="clear-cart" onClick={() => handleClearCart()}>
                Clear Cart
              </button>
              <div className="cart-checkout">
                <div className="subtotal">
                  <span>Subtotal</span>
                  <span className="amount">${cart.cartTotalAmount}</span>
                </div>
                <p>Taxes and shipping calculated at checkout</p>
                {auth._id ? (
                  // <button>Check out</button>
                  <PayButton cartItems={cart.cartItems} />
                ) : (
                  <button
                    className="cart-login"
                    onClick={() => navigate("/login")}
                  >
                    Login to Check out
                  </button>
                )}
                <div className="continue-shopping">
                  <Link to="/">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="20"
                      height="20"
                      fill="currentColor"
                      className="bi bi-arrow-left"
                      viewBox="0 0 16 16"
                    >
                      <path
                        fillRule="evenodd"
                        d="M15 8a.5.5 0 0 0-.5-.5H2.707l3.147-3.146a.5.5 0 1 0-.708-.708l-4 4a.5.5 0 0 0 0 .708l4 4a.5.5 0 0 0 .708-.708L2.707 8.5H14.5A.5.5 0 0 0 15 8z"
                      />
                    </svg>
                    <span>Continue Shopping</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  export default Cart;
