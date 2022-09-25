import axios from 'axios';

//ACTION TYPE
const SET_ACTIVE_ORDER = 'SET_ACTIVE_ORDER';
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
const DEL_ORDER_ITEM = 'DEL_ORDER_ITEM';

//ACTION CREATOR
const setOrder = order => ({
    type: SET_ACTIVE_ORDER,
    order,
});

const deleteItem = itemId => ({
    type: DEL_ORDER_ITEM,
    itemId,
});

//THUNKS
export const getActiveOrder = userId => {
    return async dispatch => {
        try {
            const { data } = await axios.get(`/api/shop/orders/${userId}`);
            dispatch(setOrder(data));
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
        case SET_ACTIVE_ORDER:
            return [...action.order.products];
        case ADD_ORDER_ITEM:
        // return [...state, ...action.order]
        case DEL_ORDER_ITEM:
            return state.filter(item => action.itemId !== item.id);
        default:
            return state;
    }
};
