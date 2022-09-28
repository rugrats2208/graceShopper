import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import { getOrders } from '../../reducers/orders/ordersReducer';

function OrderHistory() {
  const allOrders = useSelector((state) => state.orders);
  const [pastOrders, setPastOrders] = useState([]);
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);

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

  console.log(pastOrders);

  return (
    <div className="past-orders">
      {pastOrders && pastOrders.length > 0 ? (
        <>
          <h1>Order History</h1>
          {pastOrders.map((order) =>
            order.lineItems.map((lineItem) => {
              return (
                <div key={lineItem.id} id="past-order" className="card w-75">
                  <h3 className="order-number">
                    Order #{lineItem.product.id}0-{order.id}0
                  </h3>
                  <div id="order-list" className="card-body">
                    <div id="past-order-image-info">
                      <div className="past-order-image">
                        <Link to={`/singleProduct/${lineItem.product.id}`}>
                          <img
                            src={lineItem.product.img}
                            height="150px"
                            width="150px"
                          />
                        </Link>
                      </div>
                      <div className="past-order-info">
                        <Link to={`/singleProduct/${lineItem.product.id}`}>
                          <h5 className="card-title">
                            Title: {lineItem.product.name}
                          </h5>
                        </Link>
                        <Link
                          to={`/singleArtist/${lineItem.product.artist.id}`}
                        >
                          <p className="card-text">
                            by: {lineItem.product.artist.name}
                          </p>
                        </Link>
                      </div>
                    </div>
                    <div className="past-order-price">
                      <h5>
                        Total:{' '}
                        {displayPrice(
                          lineItem.qty > 0
                            ? lineItem.qty * lineItem.product.price
                            : lineItem.product.price
                        )}
                      </h5>
                    </div>
                  </div>
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
