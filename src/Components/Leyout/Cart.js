import React, { useContext,  useState } from 'react';
import Checkout from './Checkout';
import Modal from '../UI/Modal';
import CartItem from './CartItem';
import classes from './Cart.module.css';
import CartContext from '../Store/cart-context-again';

const Cart = (props) => {
  const [isCheckingOut, setIsCheckingOut ] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [didSubmit, setDidSubmit] = useState(false);
  const cartCtx = useContext(CartContext);

  const totalAmount = `$${cartCtx.totalAmount.toFixed(2)}`;
  const hasItems = cartCtx.items.length > 0;

  const cartItemRemoveHandler = (id) => {
    cartCtx.removeItem(id);
  };

  const cartItemAddHandler = (item) => {
    const cartItem = { ...item, amount: 1 };
    cartCtx.addItem(cartItem);
  };

  const orderHandeler = () => {
    setIsCheckingOut(true);
  };

  const submitOrderHandeler = async (userData) => {
    setIsSubmitting(true);
     await fetch('https://ordering-app-7e4e1-default-rtdb.firebaseio.com/order.json', {
        method: 'POST',
        body: JSON.stringify({
          user: userData,
          orderedItems: cartCtx.items
        })
      });
      setIsSubmitting(false);
      setDidSubmit(true);
      cartCtx.clearCart();
  };

  const cartItems = (
    <div className='scrollbar'>
    <ul className={classes['cart-items']}>
      {cartCtx.items.map((item) => (
        <CartItem
          key={item.id}
          name={item.name}
          amount={item.amount}
          price={item.price}
          onRemove={cartItemRemoveHandler.bind(null, item.id)}
          onAdd={cartItemAddHandler.bind(null, item)}
        />
      ))}
    </ul>
    </div>
  );

  const  modalAction = <div className={classes.actions}>
          <button className={classes['button--alt']} onClick={props.onClose}>
            Close
          </button>
        {hasItems && <button className={classes.button} onClick={orderHandeler} >Order</button>}
</div>
        
        const cartModalContent = <React.Fragment>
        {cartItems}
            <div className={classes.total}>
              <span>Total Amount</span>
              <span>{totalAmount}</span>
            </div>
            {isCheckingOut && <Checkout onConfirm={submitOrderHandeler} onCancel={props.onClose}/>}
            {!isCheckingOut && modalAction}
        </React.Fragment>

        const isSubmittingModalContent = <p>Sending order data! </p>;

        const didSubmitModalContent = <React.Fragment>
          <p> Successfully sent your order!</p>
            <div className={classes.actions}>
              <button className={classes.actions} onClick={props.onClose}>
                Close
              </button>
            </div>  
          </React.Fragment>;

  return (
    <Modal onClose={props.onClose}>
      {!isSubmitting && !didSubmit && cartModalContent}
      {isSubmitting && isSubmittingModalContent}
      {!isSubmitting && didSubmit && didSubmitModalContent}
    </Modal>
  );
};

export default Cart;