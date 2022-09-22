import React from "react";
import { useSelector } from "react-redux";

import LineItem from "./LineItem";
import EditForm from "./EditForm";

const Products = () => {
  const data = useSelector((state) => state.albums);
  const [itemEdit, setItemEdit] = React.useState("");
  const product = data.find((item) => item.id == Number(itemEdit));

  return (
    <div className="products">
      {data.length
        ? data.map((product) => (
            <LineItem key={product.id} data={{ product, setItemEdit }} />
          ))
        : ""}
      {itemEdit ? <EditForm data={{ product, setItemEdit }} /> : ""}
    </div>
  );
};

export default Products;
