import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate, useParams } from 'react-router-dom';
import LoadWheel from '../../components/LoadWheel/LoadWheel';
import { loadOrder, selectOrder } from '../../slices/orderSlice';
import getFullUTCDay from '../../utils/getFullDay';
import penniesToUSD from '../../utils/penniesToUSD';
import './OrderDetailsPage.css';
import axios from 'axios';

const OrderDetailsPage = (props) => {
  const { id } = useParams();
  const order = useSelector(selectOrder);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(loadOrder(id));
  }, [dispatch, navigate, id]);

  return (
    <main className="container" id="order-details-page">
      <h2>Order Details</h2>
      {order.isLoading ? (
        <div>
          <LoadWheel />
        </div>
      ) : (
        <section id="order-details" className="styled-box">
          <div id="order-details-head" className="container">
            <table id="order-address">
              <tbody>
                <tr>
                  <td>
                    <strong>Shipping Address</strong>
                  </td>
                </tr>
                <tr>
                  <td>{order.data.deliveryStreetAddress1}</td>
                </tr>
                {order.data.deliveryStreetAddress2 && (
                  <tr>
                    <td>{order.data.deliveryStreetAddress2}</td>
                  </tr>
                )}
                <tr>
                  <td>
                    {`${order.data.deliveryCity}, ` +
                      `${order.data.deliveryState} ` +
                      `${order.data.deliveryZipCode}`}
                  </td>
                </tr>
                <tr>
                  <td>{order.data.deliveryCountry}</td>
                </tr>
              </tbody>
            </table>
            <table id="order-additional-info">
              <tbody>
                <tr>
                  <td>
                    <strong>Date placed</strong>
                  </td>
                </tr>
                <tr>
                  <td>
                    {getFullUTCDay(new Date(Number(order.data.timeCreated)))}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Order status</strong>
                  </td>
                </tr>
                <tr>
                  <td>{`${order.data.orderStatus}`}</td>
                </tr>
              </tbody>
            </table>
            <table id="order-totals">
              <tbody>
                <tr>
                  <td>
                    <strong>Subtotal</strong>
                  </td>
                  <td className="price-col">
                    <strong>{penniesToUSD(order.data.subTotal)}</strong>
                  </td>
                </tr>
                <tr>
                  <td>Shipping & handling</td>
                  <td className="price-col">
                    {penniesToUSD(order.data.shippingFeeCharged)}
                  </td>
                </tr>
                <tr>
                  <td>Sales Tax</td>
                  <td className="price-col">
                    {penniesToUSD(order.data.taxCharged)}
                  </td>
                </tr>
                <tr>
                  <td>
                    <strong>Total</strong>
                  </td>
                  <td className="price-col">
                    <strong>
                      {penniesToUSD(
                        order.data.subTotal +
                          order.data.shippingFeeCharged +
                          order.data.taxCharged
                      )}
                    </strong>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
          <div id="order-details-items">
            {order.data.orderItems.map((i, key) => {
              return (
                <div key={key}>
                  <OrderItem 
                    imgFile={i.product.smallImageFile1}
                    productId={i.product.id}
                    optionType={i.product.optionType}
                    optionSelection={i.product.optionSelection}
                    brandName={i.product.brandName}
                    productName={i.product.productName}
                    price={i.price}
                    quantity={i.quantity}
                  />
                </div>
              );
            })}
          </div>
        </section>
      )}
    </main>
  );
};

export default OrderDetailsPage;
