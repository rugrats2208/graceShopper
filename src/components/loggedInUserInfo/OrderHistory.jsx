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

  console.log(pastOrders);
  return (
    <div>
      {pastOrders && pastOrders.length > 0 ? (
        <>
          <h1>Order History</h1>
          {pastOrders.map((order) =>
            order.lineItems.map((lineItem) => {
              return (
                <div key={lineItem.id}>
                  <h3>Product: {lineItem.product.name}</h3>
                  <h6>by: {lineItem.product.artist.name}</h6>
                  <img
                    src={lineItem.product.img}
                    height="100px"
                    width="100px"
                  />
                  <h3>
                    Total:{' '}
                    {displayPrice(
                      lineItem.qty > 0
                        ? lineItem.qty * lineItem.product.price
                        : lineItem.product.price
                    )}
                  </h3>
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
