import React, { useState, useEffect } from "react";
import { MDBIcon } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  getOrders,
  deleteOrderItem,
  changeQty,
} from "../../reducers/orders/ordersReducer";
import styles from "./form-validation.module.css";

// -------------FUNCTION START --------------------------------------------

export default function Checkout() {
  //order total
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  //grab our user data
  const userData = useSelector((state) => state.auth);

  //return only the active order lineItems or empty array
  const activeOrder = useSelector((state) =>
    state.orders.find((order) => !order.complete)
  ) || { lineItems: [] };
  const { lineItems } = activeOrder;

  //set all the orders when user logs in
  useEffect(() => {
    dispatch(getOrders(userData.id));
  }, [userData.id]);

  //set total price when lineItems changes
  useEffect(() => {
    setTotal(
      lineItems.reduce((agg, item) => agg + item.product.price * item.qty, 0)
    );
  }, [lineItems]);

  //go to stripe checkout
  const submitCheckout = () => {
    //we map through the line items to create stripe-ready objects for each product
    const checkoutItems = lineItems.map((item) => {
      return {
        // adjustable_quantity: {
        //   enabled: true,
        //   minimum: 1,
        //   maximum: item.product.stock,
        // },
        price_data: {
          currency: "usd",
          product_data: {
            name: item.product.artist.name + " - " + item.product.name,
            description: "Vinyl LP",
            images: [item.product.img],
          },
          unit_amount: item.product.price,
        },
        quantity: item.qty,
      };
    });

    //because of how stripe works, we need to pass along our internal product ids
    // so that we can adjust the inventory on the backend. We pass it through
    // with the metadata field. There SHOULD be metadata fields on the line items
    // objects, but I can't get access to them on the backend! Stripe fail.
    const getProductIds = lineItems.map((item, index) => {
      return `${item.product.id}`;
    });

    //now that the objects are created, we send them to our stripe route on the backend
    fetch("/create-checkout-session", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      // Send along all the information about the items
      body: JSON.stringify({
        items: checkoutItems,
        email: userData.username !== null ? userData.email : null,
        metadata: { GSR_order_id: activeOrder.id, ...getProductIds },
      }),
    })
      .then((res) => {
        if (res.ok) return res.json();
        // If there is an error then make sure we catch that
        return res.json().then((e) => console.error(err));
      })
      .then(({ url }) => {
        // On success redirect the customer to the returned URL
        window.location = url;
      })
      .catch((e) => {
        console.error(e.error);
      });
  };

  return (
    <div className={`${styles.container_checkout} checkout`}>
      {/* HEADER */}
      <div className="py-5 text-center">
        <h2>Checkout</h2>
        <p className="lead">
          Thank you for shopping at Grace Shopper Records! Please review your
          order before submitting.
        </p>
      </div>
      {/* CART */}
      <div className="row w-100 g-3 justify-content-center">
        <div className="col-md-10 col-lg-10">
          <h4 className="d-flex justify-content-start align-items-center mb-3">
            <span className="text-primary">Your cart</span>
            <span className="badge bg-primary rounded-pill mx-2">
              {lineItems.length}
            </span>
          </h4>
          <ul className="list-group mb-3">
            {lineItems.map((item) => {
              return (
                <li
                  key={item.product.id}
                  className="list-group-item d-flex justify-content-between lh-sm"
                >
                  <div className="d-flex flex-row align-items-center">
                    <div className={styles.checkoutImage}>
                      <img src={item.product.img} width="50px" />
                    </div>
                    <div>
                      <h6 className="my-0">{item.product.name}</h6>
                      <small className="text-muted">
                        {item.product.artist.name}
                      </small>
                    </div>
                  </div>

                  <div className="d-flex justify-content-flex-end align-items-center">
                    <div className="text-muted mx-4">
                      <ButtonGroup size="sm">
                        <Button
                          onClick={() =>
                            dispatch(changeQty(item.id, item.qty - 1))
                          }
                        >
                          -
                        </Button>

                        <Button disabled>{item.qty}</Button>

                        <Button
                          onClick={() =>
                            dispatch(changeQty(item.id, item.qty + 1))
                          }
                        >
                          +
                        </Button>
                      </ButtonGroup>
                    </div>
                    <span className="text-muted">
                      ${item.product.price / 100}
                    </span>
                    <span
                      className={styles.trashcan}
                      onClick={() => {
                        if (
                          confirm(
                            `Are you sure you want to delete "${item.product.name}" from your cart?`
                          )
                        )
                          dispatch(deleteOrderItem(item.id));
                      }}
                    >
                      <MDBIcon fas icon="trash text-danger" size="lg" />
                    </span>
                  </div>
                </li>
              );
            })}

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${total / 100}</strong>
            </li>
          </ul>
        </div>
      </div>
      <hr className="my-3" />
      {/* SUBMIT BUTTON */}
      <div className="d-flex flex-row justify-content-center">
        <Button onClick={() => submitCheckout()}>CONTINUE TO CHECKOUT</Button>
      </div>
    </div>
  );
}
