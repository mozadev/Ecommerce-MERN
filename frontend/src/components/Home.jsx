import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";
import { addToCart } from "../features/cartSlice";
import { useGetAllProductsQuery } from "../features/productsApi";

const Home = () => {
  const { items: data, status } = useSelector((state) => state.products);
  // const auth = useSelector((state) => state.auth);

  // console.log(auth);

  const dispatch = useDispatch(); // to send action to redux
  const navigate = useNavigate();

  // const { data, error, isLoading } = useGetAllProductsQuery();
  // console.log("Api", isLoading);

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    navigate("/cart");
  };

  return (
    <div className="home-container">
      {status === "success" ? (
        <>
          <h2>Nuevos modelos de celulares</h2>
          <div className="products">
            {data &&
              data?.map((product) => (
                <div key={product._id} className="product">
                  <h3>{product.name}</h3>
                  <Link to={`/product/${product._id}`}>
                    <img src={product.image.url} alt={product.name} />
                    {/* <img src={product.image} alt={product.name} /> */}
                  </Link>
                  <div className="details">
                    <span>{product.desc}</span>
                    <span className="price">${product.price}</span>
                  </div>
                  <button onClick={() => handleAddToCart(product)}>
                    Add To Cart
                  </button>
                </div>
              ))}
          </div>
        </>
      ) : status === "pending" ? (
        <p>Loading...</p>
      ) : (
        <p>Unexpected error occured...{status}</p>
      )}
    </div>
  );
};

export default Home;
