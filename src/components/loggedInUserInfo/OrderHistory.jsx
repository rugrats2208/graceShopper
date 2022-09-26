import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getOrders } from '../../reducers/orders/ordersReducer';

function OrderHistory() {
  const allOrders = useSelector((state) => state.orders);
  const [pastOrders, setPastOrders] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const params = useParams();

  useEffect(() => {
    dispatch(getOrders(user.id));
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
    <div className="past-orders">
      {pastOrders && pastOrders.length > 0 ? (
        <>
          <h1>Order History</h1>
          {pastOrders.map((order) =>
            order.lineItems.map((lineItem) => {
              return (
                <div key={lineItem.id} className="past-order">
                  <h5>Product: {lineItem.product.name}</h5>
                  <h6>by: {lineItem.product.artist.name}</h6>
                  <img
                    src={lineItem.product.img}
                    height="200px"
                    width="200px"
                  />
                  <h5>
                    Total:{' '}
                    {displayPrice(
                      lineItem.qty > 0
                        ? lineItem.qty * lineItem.product.price
                        : lineItem.product.price
                    )}
                  </h5>
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
