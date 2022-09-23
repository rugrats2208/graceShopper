import React from "react";
import { useSelector } from "react-redux";

import Table from "react-bootstrap/Table";

function ProductsTable({ set: { selection, setSelection } }) {
  const data = useSelector((state) => state.products);

  return (
    <Table striped bordered hover variant="dark">
      <thead>
        <tr>
          <th>ID#</th>
          <th>Name</th>
          <th>Price</th>
          <th>Stock</th>
        </tr>
      </thead>
      <tbody>
        {data.map((product) => {
          const price = `${product.price}`;
          return (
            <tr
              className={selection.id === product.id ? "selected" : ""}
              key={product.id}
              onClick={() => {
                setSelection(product);
              }}
            >
              <td>{product.id}</td>
              <td>{product.name}</td>
              <td>
                $
                {`${price.slice(0, price.length - 2)}.${price.slice(
                  price.length - 2
                )}`}
              </td>
              <td>{product.qty}</td>
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
}

export default ProductsTable;
