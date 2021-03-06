import React from "react";
import { Link } from "react-router-dom";
import Rating from "./Rating";

import { addDecimals } from "../utils/addDecimals";

const ItemCard = ({ item }) => {
  return (
    <div className="card">
      <div className="card-image has-text-centered">
        <figure className="pt-4">
          <Link to={`/items/${item._id}`}>
            <img src={item.image} alt={item.name} style={{ maxHeight: 220 }} />
          </Link>
        </figure>
      </div>
      <div className="card-content">
        <div className="content ">
          <p className="title is-6 ">
            <Link to={`/items/${item._id}`} className="has-text-primary">
              {item.name}
            </Link>
          </p>
          <p className=" is-size-7">
          <Rating
            value={item.rating}
            text={
              item.numReviews > 1
                ? `${item.numReviews} reviews`
                : `${item.numReviews} review`
            }
            color="#f8d125"
          />
        </p>
        <p className="content is-normal">${addDecimals(item.price)}</p>
        </div>
        
      </div>
    </div>
  );
};

export default ItemCard;
