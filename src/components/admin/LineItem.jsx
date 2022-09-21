import React from "react";

// const [form, setForm] = React.useState({
//   name: product.title || "",
//   price: product.price || "",
//   qty: product.stock || "",
//   description: product.description || "",
// });

const LineItem = ({ data: { product, setItemEdit } }) => {
  const handleClick = (evt) => {
    setItemEdit(evt.target.id);
  };

  return (
    <div style={{ display: "flex" }} className="lineItem">
      <div>{`ID: ${product.id}`}</div>
      <div>{`Name: ${product.title}`}</div>
      <div>{`Price: ${product.price}`}</div>
      <div>{`Stock Qty: ${product.stock}`}</div>
      <div className="actions">
        <button id={product.id} onClick={handleClick}>
          Edit
        </button>
        <button
          onClick={() =>
            console.log(`Sike, you thought! Product ID: #${product.id}`)
          }
        >
          Delete
        </button>
      </div>
    </div>
  );
};

export default LineItem;
