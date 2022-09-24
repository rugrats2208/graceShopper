import axios from 'axios';

//ACTION TYPE
const SET_ORDERS = 'SET_ORDERS';
const ADD_ORDER_ITEM = 'ADD_ORDER_ITEM';
const DEL_ORDER_ITEM = 'DEL_ORDER_ITEM';

//ACTION CREATOR
const setOrders = orders => ({
    type: SET_ORDERS,
    orders,
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

//INITIAL STATE
const initialState = [];

//REDUCER
export default (state = initialState, action) => {
    switch (action.type) {
        case SET_ORDERS:
            return [...action.orders];
        case ADD_ORDER_ITEM:
        // return [...state, ...action.order]
        case DEL_ORDER_ITEM:
        // return state.filter(album => action.id !== album.id);
        default:
            return state;
    }
};
