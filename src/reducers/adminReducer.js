import axios from 'axios';

export const setProduct = (sel) => ({ type: 'SET_PRODUCT', sel });
export const setUser = (sel) => ({ type: 'SET_USER', sel });
export const setFormMethod = (sel) => ({ type: 'SET_FORM_METHOD', sel });

//THUNK
export const getUsers = () => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token');
            const { data } = await axios.get(`/api/auth`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch({ type: 'GET_USERS', payload: data });
        }
        catch (error) {
            console.log(error);
        }
    }
}


const initialState = { formMethod: '', product: '', user: '', users: [] };

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_USERS':
            return { ...state, users: action.payload }
        case 'SET_PRODUCT':
            return { ...state, product: action.sel };
        case 'SET_USER':
            return { ...state, user: action.sel };
        case 'SET_FORM_METHOD':
            return { ...state, formMethod: action.sel };
        default:
            return state;
    }
}

export default adminReducer;