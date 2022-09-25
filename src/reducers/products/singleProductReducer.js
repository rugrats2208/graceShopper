import axios from 'axios';

//action type
const SET_SINGLE_PRODUCT = 'SET_SINGLE_PRODUCT';

const setSingleProduct = (product) => ({
  type: SET_SINGLE_PRODUCT,
  product,
});

// thunk for data
export const getSingleProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/shop/album/${id}`);
      dispatch(setSingleProduct(data));
    } catch (error) {
      console.error(error);
    }
  };
};

const initialState = {};

//reducer
const singleProductReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_SINGLE_PRODUCT:
      return action.product;
    default:
      return state;
  }
};

export default singleProductReducer;
