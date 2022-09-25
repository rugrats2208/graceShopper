import React from "react";
import { useDispatch, useSelector } from "react-redux";
import Table from "react-bootstrap/Table";
import Pagination from "./Pagination";
import { setProduct } from "../../reducers/adminReducer";

function ProductsTable() {
  const data = useSelector((state) => state.products);
  const { formMethod, product } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [currPage, setCurrPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);
  const indexOfLastPost = currPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currSlice = data.slice(indexOfFirstPost, indexOfLastPost);

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
                <td>{item.qty}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>

      <Pagination
        currPage={currPage}
        itemsPerPage={itemsPerPage}
        total={data.length}
        paginate={paginate}
      />
    </>
  );
}

export default ProductsTable;
