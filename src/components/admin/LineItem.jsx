import React from "react";
import { useDispatch } from "react-redux";
import { delProduct } from "../../reducers/albums/albumsReducer";

const LineItem = ({ data: { product, setItemEdit } }) => {
  const dispatch = useDispatch();

  const handleClick = (evt) => {
    setItemEdit(evt.target.id);
  };

  return (
    <div style={{ display: "flex" }} className="lineItem">
      <div>{`ID: ${product.id}`}</div>
      <div>{`Name: ${product.name}`}</div>
      <div>{`Price: ${product.price}`}</div>
      <div>{`Stock Qty: ${product.qty}`}</div>
      <div className="actions">
        <button id={product.id} onClick={handleClick}>
          Edit
        </button>
        <button
          onClick={() => {
            dispatch(delProduct(product.id));
          }}
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default LineItem;
