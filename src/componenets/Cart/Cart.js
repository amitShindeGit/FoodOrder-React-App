import React, { useContext, useState } from "react";
import classes from "./Cart.module.css";
import Modal from "../UI/Modal";
import CartContext from "../../store/cart-context";
import CartItem from "./CartItem";
import CheckOut from "./CheckOut";

const Cart = (props) => {
  const CartCtx = useContext(CartContext);
  const [isCheckout, setIsCheckout] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setdidSubmit] = useState(false);


  const totalAMount = `$${CartCtx.totalAmount.toFixed(2)}`;
  const hasItems = CartCtx.items.length > 0;

  const CartItemRemoveHandler = (id) => {
    CartCtx.removeItem(id);
  };

  const CartItemAdddedHandler = (item) => {
    CartCtx.addItem({ ...item, amount: 1 });
  };

  const orderHandler = (props) => {
    setIsCheckout(true);
  };

  const submitOrderHandler = async (userData) => {

    setIsSubmitting(true);

    await fetch('https://foodorder-react-4920e-default-rtdb.firebaseio.com/orders.json', {
      method : 'POST',
      body : JSON.stringify({
        user : userData,
        orderedItems : CartCtx.items
      })
    });

    setIsSubmitting(false);
    setdidSubmit(true);

    CartCtx.clearCart();
  };

  const CartItems = (
    <ul className={classes["cart-items"]}>
      {CartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={CartItemRemoveHandler.bind(null, item.id)}
          onAdd={CartItemAdddedHandler.bind(null, item)}
        />
      ))}
    </ul>
  );

  const ModalActions = (
    <div className={classes.actions}>
      <button className={classes["button--alt"]} onClick={props.onClose}>
        Close
      </button>
      {hasItems && (
        <button className={classes.button} onClick={orderHandler}>
          {" "}
          Order{" "}
        </button>
      )}
    </div>
  );

  const cartModalContent = 
  (<React.Fragment>
  {CartItems}
  <div className={classes.total}>
    <span>Total Amount</span>
    <span>{totalAMount}</span>
  </div>

  {isCheckout && <CheckOut onConfirm={submitOrderHandler} onClick={props.onClose} />}

  {!isCheckout && ModalActions}
  </React.Fragment>)

  const cartSubmittingModal = <p>Submitting...</p>;

  const didSubmitModal = <React.Fragment>
    <p>Submit Successful</p>
    <div className={classes.actions}>
      <button className={classes.button} onClick={props.onClose}>
        Close
      </button>
      </div>
  </React.Fragment>


  return (
    <Modal onClose={props.onClose}>

    {!isSubmitting && !didSubmit && cartModalContent}
    {isSubmitting && cartSubmittingModal}
    {!isSubmitting && didSubmit && didSubmitModal}
      
    </Modal>
  );
};

export default Cart;
