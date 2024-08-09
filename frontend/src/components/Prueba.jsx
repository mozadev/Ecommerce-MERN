import { useState } from "react";

const Prueba = () => {
  const [counter, setCounter] = useState(0);
  const scores = [98, 45, 33, 47, 100, 80];
  const totalScores = scores.reduce(
    (previousScore, currentScore, index) => previousScore + currentScore,
    0
  );
  console.log(totalScores); //returns 403
  // const { items, status } = useSelector((state) => state.products);
  //   const { data, error, isLoading } = useGetAllProductsQuery();
  //   const dispatch = useDispatch();
  //   const history = useHistory();

  //   const handleAddToCart = (product) => {
  //     dispatch(addToCart(product));
  //     history.push("/cart");
  //   };
  return (
    <div className="prueba-container">
      <h1>{counter}</h1>
      <button onClick={() => setCounter(counter + 1)}>+</button>
    </div>
  );
};

export default Prueba;
