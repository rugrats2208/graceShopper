import React from "react";
import { useDispatch, useSelector } from "react-redux";

//BOOTSTRAP
import Table from "react-bootstrap/Table";

//FUNCTIONS
import { setProduct } from "../../reducers/adminReducer";
import Pagination from "./Pagination";

function ProductsTable() {
  const { formMethod, product, products } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [currPage, setCurrPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);
  const indexOfLastPost = currPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currSlice = products.slice(indexOfFirstPost, indexOfLastPost);

  const paginate = (pageNumber) => setCurrPage(pageNumber);

  return (
    <>
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
          {currSlice.map((item) => {
            const price = `${item.price}`;
            return (
              <tr
                className={item.id === product.id ? "selected" : ""}
                key={item.id}
                onClick={() => {
                  if (!formMethod) {
                    dispatch(setProduct(item));
                  }
                }}
              >
                <td>{item.id}</td>
                <td>{item.name}</td>
                <td>
                  $
                  {`${price.slice(0, price.length - 2)}.${price.slice(
                    price.length - 2
                  )}`}
                </td>
                <td>{item.stock}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Pagination
        currPage={currPage}
        itemsPerPage={itemsPerPage}
        total={products.length}
        paginate={paginate}
      />
    </>
  );
}

export default ProductsTable;
