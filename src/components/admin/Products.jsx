import React from "react";

import LineItem from "./LineItem";
import EditForm from "./EditForm";

import dummyData from "./dummyData.json";

const Products = () => {
  const [itemEdit, setItemEdit] = React.useState("");
  const product = dummyData.products.find(
    (item) => item.id == Number(itemEdit)
  );

  return (
    <div className="products">
      {dummyData.products.map((product) => (
        <LineItem key={product.id} data={{ product, setItemEdit }} />
      ))}
      {itemEdit ? <EditForm data={{ product, setItemEdit }} /> : ""}
    </div>
  );
};

export default Products;
