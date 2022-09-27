import axios from 'axios';
const token = window.localStorage.getItem('token');

//{complete: false, lineItems: []}

/*
TODO: refactor to have active order
    -initial state = {activeOrder: {}, pastOrders: []}
    -send active order id in body of put requests
*/

//ACTION TYPE
const SET_ORDER = 'SET_ORDER';
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
const DEL_ORDER_ITEM = 'DEL_ORDER_ITEM';
const CHANGE_QTY = 'CHANGE_QTY';

//ACTION CREATOR
const setOrders = orders => ({
    type: SET_ORDER,
    orders,
});

const addItem = item => ({
    type: ADD_ORDER_ITEM,
    item,
});

const deleteItem = itemId => ({
    type: DEL_ORDER_ITEM,
    itemId,
});

const updateQty = (itemId, num) => ({
    type: CHANGE_QTY,
    itemId,
    num,
});

//THUNKS
export const getOrders = userId => {
    return async dispatch => {
        try {
            if (token) {
                const { data } = await axios.get(`/api/shop/orders/${userId}`, {
                    headers: {
                        authorization: token,
                    },
                });
                dispatch(setOrders(data));
            } else {
                const order = window.localStorage.getItem('order');
                if (!order)
                    window.localStorage.setItem(
                        'order',
                        JSON.stringify({
                            complete: false,
                            lineItems: [],
                        })
                    );

                dispatch(
                    setOrders([
                        JSON.parse(window.localStorage.getItem('order')),
                    ])
                );
            }
        } catch (error) {
            console.error(error);
        }
    };
};

export const addOrderItem = productId => {
    return async dispatch => {
        try {
            if (token) {
                const { data } = await axios.put(
                    `/api/shop/orders/${productId}`,
                    {},
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );
                dispatch(addItem(data));
            } else {
                const order = window.localStorage.getItem('order');
                const { data } = await axios.get(
                    `/api/shop/album/${productId}`
                );
                const newOrder = JSON.parse(order);
                const item = {
                    id: newOrder.lineItems.length + 1,
                    qty: 1,
                    product: data,
                };
                newOrder.lineItems.push(item);
                localStorage.order = JSON.stringify(newOrder);
                dispatch(addItem(item));
            }
        } catch (error) {
            console.error(error);
        }
    };
};

export const deleteOrderItem = itemId => {
    return async dispatch => {
        try {
            if (token) {
                await axios.delete(`/api/shop/orders/${itemId}`, {
                    headers: {
                        authorization: token,
                    },
                });
                dispatch(deleteItem(itemId));
            } else {
                const order = window.localStorage.getItem('order');
                const newOrder = JSON.parse(order);
                newOrder.lineItems = newOrder.lineItems.filter(
                    item => item.id !== itemId
                );
                localStorage.order = JSON.stringify(newOrder);
                dispatch(deleteItem(itemId));
            }
        } catch (error) {
            console.error(error);
        }
    };
};

export const changeQty = (itemId, num) => {
    return async dispatch => {
        try {
            if (token) {
                await axios.put(
                    '/api/shop/orders/qty',
                    { itemId, num },
                    {
                        headers: {
                            authorization: token,
                        },
                    }
                );
                dispatch(updateQty(itemId, num));
            } else {
                const order = window.localStorage.getItem('order');
                const newOrder = JSON.parse(order);
                if (
                    num < 1 ||
                    num > newOrder.lineItems[itemId - 1].product.stock
                )
                    return;
                newOrder.lineItems[itemId - 1].qty = num;
                localStorage.order = JSON.stringify(newOrder);
                dispatch(updateQty(itemId, num));
            }
        } catch (error) {
            console.error(error);
        }
    };
};

//INITIAL STATE
const initialState = [];

//REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDER:
            if (!action.orders) return state;
            return [...action.orders];
        case ADD_ORDER_ITEM:
            return state.map(order =>
                order.complete
                    ? order
                    : {
                          ...order,
                          lineItems: [...order.lineItems, action.item],
                      }
            );
        case DEL_ORDER_ITEM:
            return state.map(order =>
                order.complete
                    ? order
                    : {
                          ...order,
                          lineItems: order.lineItems.filter(
                              item => item.id !== action.itemId
                          ),
                      }
            );
        case CHANGE_QTY:
            const orderIndex = state.findIndex(order => !order.complete);
            const itemIndex = state[orderIndex].lineItems.findIndex(
                item => action.itemId === item.id
            );
            if (
                action.num <= 0 ||
                action.num >
                    state[orderIndex].lineItems[itemIndex].product.stock
            )
                return state;
            const nextState = JSON.parse(JSON.stringify(state));
            nextState[orderIndex].lineItems[itemIndex].qty = action.num;
            return nextState;
        default:
            return state;
    }
};
