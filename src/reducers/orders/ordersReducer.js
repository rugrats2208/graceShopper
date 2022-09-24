import axios from 'axios';

//ACTION TYPE
const SET_ORDERS = 'SET_ORDERS';
const GET_ORDERS = 'GET_ORDERS';
const ADD_ORDER = 'ADD_ORDER'; //dispatch these through thunks
const DEL_ORDER = 'DEL_ORDER';

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
        case ADD_ORDER:
        // return [...state, ...action.order]
        case DEL_ORDER:
        // return state.filter(album => action.id !== album.id);
        default:
            return state;
    }
};
