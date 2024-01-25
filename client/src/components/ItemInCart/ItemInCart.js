import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import redX from '../../images/red-x.png';
import CartQuantity from '../../components/CartQuantity/CartQuantity';
import penniesToUSD from '../../utils/penniesToUSD';
import {
  loadCartData,
  changeQuantityInGuestCart,
  deleteFromGuestCart,
} from '../../slices/cartSlice';
import axios from 'axios';

const ItemInCart = (props) => {
  const [quantityChangeError, setQuantityChangeError] = useState('');
  const dispatch = useDispatch();
  const [imageUrl, setImageUrl] = useState('');
  useEffect(() => {
    async function getSignedUrl() {
      try {
        let res = await axios.get(`/generate-presigned-url/${props.imgFile}`);
        setImageUrl(res.data.url);
      } catch (err) {
        console.log('Error fetching signed URL', err);
      }
    }
    getSignedUrl();
  }, []);

  const deleteItem = async (e) => {
    try {
      const id = e.target.value;
      const response = await axios('/authenticated');
      if (response.data) {
        //Delete from cart on server
        await axios.delete(`/server-cart/${id}`);
      } else {
        //Delete from guest cart
        deleteFromGuestCart(id);
      }
      loadCartData(dispatch);
    } catch (err) {
      loadCartData(dispatch);
    }
  };

  const handleQuantitySelection = async (e, cartItem) => {
    const response = await axios('/authenticated');
    let value = e.target.value;
    //Check to make sure there are enough items in stock
    const amountInStock = cartItem.product.productOptions[0].amountInStock;
    if (value > amountInStock) {
      value = amountInStock;
      if (value === 0) {
        setQuantityChangeError('This item is sold out.');
      } else {
        setQuantityChangeError('Not enough in stock. Setting to the max.');
      }
    }

    if (response.data) {
      const requestBody = {
        quantity: Number(value),
        productId: cartItem.product.id,
        optionSelection: cartItem.optionSelection,
      };
      //Change quantity in cart on server
      await axios.put('/server-cart', requestBody);
    } else {
      //Change quantity in guest cart
      changeQuantityInGuestCart(cartItem, value);
    }
    loadCartData(dispatch);
  };

  return (
    <div className="cart-item">
      <div className="cart-item-image">
        <Link to={`/product/${props.productId}`}>
          <img src={imageUrl} alt="cart item" />
        </Link>
      </div>
      <div className="cart-item-content">
        <p>
          {props.optionType}: {props.optionSelection}
        </p>
        <p>{props.brandName}</p>
        <p>{props.productName}</p>
        <strong>
          <p>{penniesToUSD(props.price)}</p>
        </strong>
        <div className="cart-item-options">
          <CartQuantity
            handleSelection={handleQuantitySelection}
            cartItem={props.cartItem}
            defaultValue={props.quantity}
          />
          <button
            className="small-button"
            onClick={deleteItem}
            value={props.id}
          >
            Delete
          </button>
        </div>
      </div>
      {quantityChangeError && (
        <div className="input-error-box">
          <img alt="error" src={redX} />
          <p>{quantityChangeError}</p>
        </div>
      )}
    </div>
  );
};
export default ItemInCart;
