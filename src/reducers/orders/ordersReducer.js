import axios from 'axios';

//ACTION TYPE
const SET_ORDERS = 'SET_ORDERS';
// const SET_ACTIVE_ORDER = 'SET_ACTIVE_ORDER'; //TODO: is this necessary?
const ADD_ORDER = 'ADD_ORDER'; //dispatch these through thunks
const DEL_ORDER = 'DEL_ORDER';
const SET_PAST_ORDERS = 'SET_PAST_ORDERS';

//ACTION CREATOR
const setOrders = (orders) => ({
  type: SET_ORDERS,
  orders,
});

//THUNKS

//INITIAL STATE
const initialState = [];

//REDUCER
export default (state = initialState, action) => {
  switch (action.type) {
    case SET_ORDERS:
    // case SET_ACTIVE_ORDER:
    case ADD_ORDER:
    case DEL_ORDER:
    default:
      return state;
  }
};
