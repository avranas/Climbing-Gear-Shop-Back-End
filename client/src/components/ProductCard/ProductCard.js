import './ProductCard.css';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import penniesToUSD from '../../utils/penniesToUSD';
import axios from 'axios';

// Renders a card for a single product
// Props are productName, brandName, description, price, and imageURL,
const ProductCard = (props) => {
  const [imageUrl1, setImageUrl1] = useState('');
  const [imageUrl2, setImageUrl2] = useState('');
  useEffect(() => {
    async function getSignedUrls() {
      try {
        let res = await axios.get(
          `/generate-presigned-url/${props.smallImageFile1}`
        );
        setImageUrl1(res.data.url);
        res = await axios.get(
          `/generate-presigned-url/${props.smallImageFile2}`
        );
        setImageUrl2(res.data.url);
      } catch (err) {
        console.log('Error fetching signed URL', err);
      }
    }
    getSignedUrls();
  }, []);

  return (
    <li className="product-card styled-box styled-link-box">
      <Link to={`/product/${props.id}`}>
        <div className="product-image">
          <div className="top-image">
            <img alt="product" src={imageUrl1} />
          </div>
          <div className="bottom-image">
            <img alt="product" src={imageUrl2} />
          </div>
        </div>
        <div className="product-info">
          <h3>{props.brandName}</h3>
          <p>{props.productName}</p>

          {props.highestPrice === props.lowestPrice ? (
            <p>{penniesToUSD(props.lowestPrice)}</p>
          ) : (
            <p>{`${penniesToUSD(props.lowestPrice)} - ${penniesToUSD(
              props.highestPrice
            )}`}</p>
          )}
        </div>
      </Link>
    </li>
  );
};
export default ProductCard;
