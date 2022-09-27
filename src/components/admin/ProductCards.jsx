import React from "react";
import { useDispatch, useSelector } from "react-redux";

//BOOTSTRAP
import Card from "react-bootstrap/Card";
import ListGroup from "react-bootstrap/ListGroup";

//FUNCTIONS
import { setProduct } from "../../reducers/adminReducer";
import Pagination from "./Pagination";

function ProductCards() {
  const { formMethod, product, products } = useSelector((state) => state.admin);
  const dispatch = useDispatch();

  const [currPage, setCurrPage] = React.useState(1);
  const [itemsPerPage] = React.useState(10);
  const indexOfLastPost = currPage * itemsPerPage;
  const indexOfFirstPost = indexOfLastPost - itemsPerPage;
  const currSlice = products.slice(indexOfFirstPost, indexOfLastPost);

  const item = currSlice[0];
  console.log(item);
  const paginate = (pageNumber) => setCurrPage(pageNumber);

  return (
    <div className="cardsContainer">
      {currSlice.map((item) => {
        const price = `${item.price}`;
        return (
          <Card className="mb-4" bg={"light"} style={{ width: "18rem" }}>
            <Card.Header>{`ID#${item.id}`}</Card.Header>
            <Card.Body>
              <Card.Title>{`${item.name}`}</Card.Title>
              <Card.Text>{`${item.label}`}</Card.Text>
            </Card.Body>
            <ListGroup className="list-group-flush">
              <label>Price</label>
              <ListGroup.Item>
                $
                {`${price.slice(0, price.length - 2)}.${price.slice(
                  price.length - 2
                )}`}
              </ListGroup.Item>
              <label>Quantity</label>
              <ListGroup.Item>{`${item.stock}`}</ListGroup.Item>
              <label>Release Date</label>
              <ListGroup.Item>{`${item.releaseDate}`}</ListGroup.Item>
            </ListGroup>
          </Card>
        );
      })}
      <Pagination
        currPage={currPage}
        itemsPerPage={itemsPerPage}
        total={products.length}
        paginate={paginate}
      />
    </div>
  );
}

export default ProductCards;
