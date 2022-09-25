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

export const changeQty = (id, num) => ({
    type: CHANGE_QTY,
    id,
    num,
});

//THUNKS
export const getActiveOrder = userId => {
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
            return state.filter(item => action.itemId !== item.id);
        case CHANGE_QTY:
        default:
            return state;
    }
};
