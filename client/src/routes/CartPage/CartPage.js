import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { selectCart, loadCartData } from '../../slices/cartSlice';
import penniesToUSD from '../../utils/penniesToUSD';
import { Link, useNavigate } from 'react-router-dom';
import './CartPage.css';
import axios from 'axios';
import LoadWheel from '../../components/LoadWheel/LoadWheel';
import ItemInCart from '../../components/ItemInCart/ItemInCart';

/*
  Loading cart data with a useEffect is not necessary, because the
  DetailedHeader will already take care of that for you. In fact, adding it
  creates problems
*/
const CartPage = (props) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cart = useSelector(selectCart);
  const cartData = cart.data;

  const continueToCheckout = async () => {
    const response = await axios('/authenticated');
    if (response.data) {
      navigate('/checkout');
    } else {
      navigate('/login?next=checkout');
    }
  };

  const backToProducts = async () => {
    navigate('/products/0');
  };

  useEffect(() => {
    loadCartData(dispatch);
  }, [dispatch]);

  return (
    <main id="cart" className="container styled-box">
      <h2>Shopping Cart</h2>
      {cart.isLoading ? (
        <div>
          <LoadWheel />
        </div>
      ) : cartData.cartItems.length === 0 ? (
        <div id="empty-cart">
          <p>Your shopping cart is empty.</p>
        </div>
      ) : (
        cartData.cartItems.map((i, key) => {
          return (
            <div key={`cart-item-${key}`}>
              <ItemInCart
                id={i.id}
                productId={i.product.id}
                imgFile={i.product.smallImageFile1}
                optionType={i.product.optionType}
                optionSelection={i.optionSelection}
                brandName={i.product.brandName}
                productName={i.product.productName}
                cartItem={i}
                price={i.product.productOptions[0].price}
                quantity={i.quantity}
              />
            </div>
          );
        })
      )}
      <div id="cart-footer">
        {cartData.cartItems.length === 0 ? (
          <Link to="/products/0">
            <button aria-label="Continue shopping" className="important-button">Continue shopping</button>
          </Link>
        ) : (
          <div id="cart-footer">
            {cartData.itemCount !== -1 && (
              <p>{`Subtotal (${cartData.itemCount} items): ${penniesToUSD(
                cartData.subTotal
              )}`}</p>
            )}
            <div id="cart-buttons">
              <button aria-label="Continue to checkout" onClick={continueToCheckout} className="important-button">
                Continue to checkout
              </button>
              <button
                aria-label="Continue shopping"
                onClick={backToProducts}
                className="semi-important-button"
              >
                Continue shopping
              </button>
            </div>
          </div>
        )}
      </div>
    </main>
  );
};

export default CartPage;
