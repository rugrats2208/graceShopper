import axios from 'axios';

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

const deleteItem = itemId => ({
    type: DEL_ORDER_ITEM,
    itemId,
});

export const changeQty = (itemId, num) => ({
    type: CHANGE_QTY,
    itemId,
    num,
});

//THUNKS
export const getOrders = userId => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/shop/orders/${userId}`);
            dispatch(setOrders(data));
        } catch (error) {
            console.error(error);
        }
    };
};

export const deleteOrderItem = itemId => {
    return async dispatch => {
        try {
            // await axios.delete(`/api/shop/`)
            dispatch(deleteItem(itemId));
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
            return [...action.orders];
        case ADD_ORDER_ITEM:
        // return [...state, ...action.order]
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
