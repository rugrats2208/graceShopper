import axios from 'axios';

//ACTION TYPE
const SET_PRODUCTS = 'SET_PRODUCTS';
const ADD_PRODUCT = 'ADD_PRODUCT';
const EDIT_PRODUCT = 'EDIT_PRODUCT';
const DEL_PRODUCT = 'DEL_PRODUCT';

//ACTION CREATOR
const setProducts = (products) => ({
  type: SET_PRODUCTS,
  products,
});

//THUNKS
export const getProducts = () => {
  return async (dispatch) => {
    const { data } = await axios.get('/api/shop');
    dispatch(setProducts(data));
  };
};

export const addProduct = (form) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.post(`/api/shop/albums`, form, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: ADD_PRODUCT, payload: data });
    } catch (error) {
      console.log(error);
    }
  };
};

export const editProduct = (id, form) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.get(`/api/shop/album/${id}`);
      const req = await axios.put(`/api/shop/albums/${data.id}`, form, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: EDIT_PRODUCT, payload: req.data });
    } catch (error) {
      console.log(error)
    }
  }
}

export const delProduct = (id) => {
  return async (dispatch) => {
    try {
      const token = window.localStorage.getItem('token');
      const { data } = await axios.delete(`/api/shop/albums/${id}`, {
        headers: {
          authorization: token,
        },
      });
      dispatch({ type: DEL_PRODUCT, payload: data.id });
    } catch (error) {
      console.log(error);
    }
  };
};

const initialState = [];

//REDUCER
const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case SET_PRODUCTS:
      return action.products;
    case ADD_PRODUCT:
      return [action.payload, ...state];
    case EDIT_PRODUCT:
      let prevState = state.filter(product => product.id !== action.payload.id);
      return [action.payload, ...prevState]
    case DEL_PRODUCT:
      return state.filter((product) => product.id !== action.payload);
    default:
      return state;
  }
};

export default productReducer;
