import React, { useEffect, useState } from 'react';
import penniesToUSD from '../../utils/penniesToUSD';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ItemInOrder = (props) => {
  const [imageUrl, setImageUrl] = useState('');

  useEffect(() => {
    async function getSignedUrl() {
      try {
        setImageUrl("");
        let res = await axios.get(`/generate-presigned-url/${props.imgFile}`);
        setImageUrl(res.data.url);
      } catch (err) {
        console.log('Error fetching signed URL', err);
      }
    }
    getSignedUrl();
  }, [props.imgFile]);

  return (
    <div className="order-item">
      <Link to={`/product/${props.productId}`}>
        <div className="order-item-image">
          {imageUrl && <img src={imageUrl} alt="order item" />}
        </div>
      </Link>
      <ul className="order-item-content">
        <li>
          {props.optionType}: {props.optionSelection}
        </li>
        <li>{props.brandName}</li>
        <li>{props.productName}</li>
        <strong>
          <li>{penniesToUSD(props.price)}</li>
        </strong>
        <li className="order-item-options">{`Quantity: ${props.quantity}`}</li>
      </ul>
    </div>
  );
};

export default ItemInOrder;
