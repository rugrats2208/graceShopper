import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getOrders } from '../../reducers/orders/ordersReducer';
import { useParams } from 'react-router-dom';

function OrderHistory() {
  const allOrders = useSelector((state) => state.orders);
  const [pastOrders, setPastOrders] = useState([]);
  const dispatch = useDispatch();
  const params = useParams();

  useEffect(() => {
    dispatch(getOrders(params.id));
  }, []);

  useEffect(() => {
    setPastOrders(filterPastOrders(allOrders));
  }, [allOrders]);

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
      {pastOrders && pastOrders.length > 0 ? (
        <>
          <h1>Order History</h1>
          {pastOrders.map((order) =>
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
        </>
      ) : (
        <h1>You do not have any past orders!</h1>
      )}
    </div>
  );
}

export default OrderHistory;
