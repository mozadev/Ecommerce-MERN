import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { clearCart, getTotals } from "../features/cartSlice";

const CheckOutSuccess = () => {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart);// hook to obtener estado del carrito

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]); // only cuando dispathc change aunq en la mayoria de las veces no cambia

  useEffect(() => {
    dispatch(getTotals());
  }, [cart, dispatch]); // asegura cuando cart o dispatch cambia

  return (
    <Container>
      <h2>Checkout Successful</h2>
      <p>Your order migth take some time to process</p>
      <p>Check your order status at your profile after about 10 mins.</p>
      <p>
        Incase of any inqueries contact the support at{" "}
        <strong>support@Smartsolutions.com</strong>
      </p>
    </Container>
  );
};

export default CheckOutSuccess;

const Container = styled.div`
  min-height: 80vh;
  max-width: 800px;
  width: 100%;
  margin: auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  h2 {
    margin-bottom: 0.5rem;
    color: #029e02;
  }
`;
