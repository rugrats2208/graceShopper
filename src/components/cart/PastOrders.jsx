import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
//import {getOrders} from "../../reducers/orders/ordersReducer"

function PastOrders() {
  const allOrders = useSelector((state) => state.orders);
  const dispatch = useDispatch();

  // useEffect(() => {
  //   dispatch(getOrders());
  // }, []);

  function filterPastOrders(orders) {
    return orders.filter((order) => order.complete === true);
  }

  function displayPrice(price) {
    price /= 100;
    price.toLocaleString('en-US', { style: 'currency', currency: 'USD' });
    return `$${price}`;
  }

  return (
    <div>
      <h1>Order History</h1>
      {allOrders &&
        filterPastOrders(allOrders).map((order) =>
          order.products.map((product) => {
            return (
              <div key={product.id}>
                <h2>{product.name}</h2>
                <h2>{product.artist.name}</h2>
                <img src={product.img} height="300px" width="300px" />
                <h3>Purchased for: {displayPrice(product.price)}</h3>
              </div>
            );
          })
        )}
      ;
    </div>
  );
}

export default PastOrders;
