import { Link } from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import HeaderUserButtons from '../HeaderButtons/HeaderButtons';
import { useDispatch, useSelector } from 'react-redux';
import { selectUser } from '../../slices/userSlice';
import React, { useEffect, useState } from 'react';
import './Header.css';
import { loadCartData, selectCart } from '../../slices/cartSlice';
import axios from 'axios';
import logo from '../../images/logo.png';
import smolLogo from '../../images/smol-logo.png';
import cartIcon from '../../images/cart.png';

const DetailedHeader = (props) => {
  const cart = useSelector(selectCart);
  const cartData = cart.data;
  const dispatch = useDispatch();
  const [loggedIn, setLoggedIn] = useState(false);
  const user = useSelector(selectUser);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const response = await axios('/authenticated');
        if (response.data) {
          const response = await axios.get('/user');
          setLoggedIn(true);
          dispatch({ type: 'user/loadUserData', payload: response.data });
        }
      } catch (err) {
        console.log(err);
      }
    };
    loadCartData(dispatch);
    getUserData();
  }, [dispatch]);
  let firstName = '';
  if (user.name) {
    firstName = user.name.split(' ')[0];
  }

  return (
    <header className="header">
      <div id="detailed-header-content">
        <Link to="/">
          <picture>
            <source media="(max-width: 512px)" srcset={smolLogo} />
            <img
              src={logo}
              alt="logo"
              id="detailed-header-logo"
              className="logo header-item"
            />
          </picture>
        </Link>
        <div className="header-item">
          <SearchBar />
        </div>
        {loggedIn && user.name ? (
          <div className="header-item" id="welcome-message">
            <p>Welcome,</p>
            <p>{firstName}</p>
          </div>
        ) : (
          <div className="header-item" id="welcome-message">
            {' '}
          </div>
        )}
        <div id="header-user-buttons-container" className="header-item">
          <HeaderUserButtons />
        </div>
        <div className="header-item">
          <Link to="/cart">
            <img src={cartIcon} id="cart-icon" alt="cart">
            </img>
              {cartData.itemCount === -1 ? null : cartData.itemCount > 99 ? (
                <div className="cart-items-count" id="double-digit">
                  99+
                </div>
              ) : cartData.itemCount > 9 ? (
                <div className="cart-items-count" id="double-digit">
                  {cartData.itemCount}
                </div>
              ) : cartData.itemCount > 0 ? (
                <div className="cart-items-count" id="single-digit">
                  {cartData.itemCount}
                </div>
              ) : null}
          </Link>
        </div>
      </div>
    </header>
  );
};

export default DetailedHeader;
