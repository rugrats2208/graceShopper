import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Dropdown from "react-bootstrap/Dropdown";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import DropdownButton from "react-bootstrap/DropdownButton";
import { useSelector, useDispatch } from "react-redux";
import { MDBIcon, MDBBadge } from "mdb-react-ui-kit";
import {
  getOrders,
  deleteOrderItem,
  changeQty,
} from "../../reducers/orders/ordersReducer";

export default function Cart() {
  const [isOpen, setIsOpen] = useState(false);
  const [total, setTotal] = useState(0);
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.id);

  //return only the active order lineItems or empty array
  const activeOrder = useSelector((state) =>
    state.orders.find((order) => !order.complete)
  ) || { lineItems: [] };
  const { lineItems } = activeOrder;

  //set all the orders when user logs in
  useEffect(() => {
    dispatch(getOrders(userId));
  }, [userId]);

  //set total price when lineItems changes
  useEffect(() => {
    setTotal(
      lineItems.reduce((agg, item) => agg + item.product.price * item.qty, 0)
    );
  }, [lineItems]);

  return (
    <Dropdown
      drop="start"
      autoClose="outside"
      onToggle={() => setIsOpen(!isOpen)}
    >
      <Dropdown.Toggle variant="success" id="cart" title="Dropdown button">
        {isOpen ? (
          <MDBIcon fas icon="times" size="lg" className="cart-icon" />
        ) : (
          <>
            <MDBIcon fas icon="shopping-cart" size="lg" className="cart-icon" />{" "}
            <MDBBadge color="danger" notification pill>
              {lineItems.length === 0 ? "" : lineItems.length}
            </MDBBadge>
          </>
        )}
      </Dropdown.Toggle>

      <Dropdown.Menu className="cart-dropdown">
        {lineItems.map((item) => {
          //perhaps make this its own component
          const numDropdowns = [];
          for (let i = 1; i <= item.product.stock; i++) {
            numDropdowns.push(
              <Dropdown.Item
                key={item.id + i}
                onClick={() => dispatch(changeQty(item.id, i))}
              >
                {i}
              </Dropdown.Item>
            );
          }
          // start map of line items
          return (
            <div key={item.id}>
              <Dropdown.Item
                className="cart-title"
                as={Link}
                to={`/singleProduct/${item.product.id}`}
              >
                {item.product.name}
              </Dropdown.Item>
              <Dropdown.Item
                as={Link}
                to={`/singleArtist/${item.product.artist.id}`}
              >
                <strong>Artist:</strong> {item.product.artist.name}
              </Dropdown.Item>
              <Dropdown.ItemText>
                <strong>Price:</strong> ${item.product.price / 100}
              </Dropdown.ItemText>
              <Dropdown.ItemText>
                <strong>Qty: </strong>
                <ButtonGroup size="sm">
                  <Button
                    onClick={() => dispatch(changeQty(item.id, item.qty - 1))}
                  >
                    -
                  </Button>

                  <DropdownButton as={ButtonGroup} title={item.qty} drop="down">
                    {numDropdowns}
                  </DropdownButton>

                  <Button
                    onClick={() => dispatch(changeQty(item.id, item.qty + 1))}
                  >
                    +
                  </Button>
                </ButtonGroup>
              </Dropdown.ItemText>
              <Dropdown.Item
                className="cart-delete-btn"
                onClick={() => {
                  if (
                    confirm(
                      `Are you sure you want to delete "${item.product.name}" from your cart?`
                    )
                  )
                    dispatch(deleteOrderItem(item.id));
                }}
              >
                Delete
              </Dropdown.Item>

              <Dropdown.Divider />
            </div>
          );
        })}
        <Dropdown.ItemText id="checkout-section">
          <Link to="/checkout">
            <button className="product-button btn btn-dark">Checkout</button>
          </Link>
          <span>Subtotal: ${(total / 100).toFixed(2)}</span>
        </Dropdown.ItemText>
      </Dropdown.Menu>
    </Dropdown>
  );
}
