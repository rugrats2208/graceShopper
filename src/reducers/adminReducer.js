import axios from 'axios';
import { sortedUsersArray, sortedProductsArray } from '../components/admin/helperFuncs';


export const setProduct = (sel) => ({ type: 'SET_PRODUCT', sel });
export const setUser = (sel) => ({ type: 'SET_USER', sel });
export const setFormMethod = (sel) => ({ type: 'SET_FORM_METHOD', sel });
export const setSortMethod = (sel) => ({ type: 'SET_SORT_METHOD', sel });
export const setView = (sel) => ({ type: 'SET_VIEW', sel })
export const sortUsers = (sel) => ({ type: 'SORT_USERS', sel });
export const sortProducts = (sel) => ({ type: 'SORT_PRODUCTS', sel });


//THUNKS
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

export const getProducts = () => {
    return async (dispatch) => {
        try {
            const { data } = await axios.get('/api/shop');
            dispatch({ type: 'GET_PRODUCTS', payload: data });
        } catch (error) {
            console.log(error)
        }
    };
};


export const addUser = (form) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token');
            const { data } = await axios.post(`/api/admin/users`, form, {
                headers: {
                    authorization: token,
                },
            });
            dispatch({ type: 'ADD_USER', payload: data });
        }
        catch (error) {
            console.log(error);
        }
    }
}

export const editUser = (id, form) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token');
            const { data } = await axios.get(`/api/auth/userInfo/${id}`, {
                headers: {
                    authorization: token,
                },
            });
            const req = await axios.put(`/api/admin/users/${data.id}`, form, {
                headers: {
                    authorization: token,
                },
            });
            dispatch({ type: 'EDIT_USER', payload: req.data });
        } catch (error) {
            console.log(error)
            dispatch({ type: 'EDIT_USER', error: error })
        }
    }
}

export const delUser = (id) => {
    return async (dispatch) => {
        try {
            const token = window.localStorage.getItem('token');
            const { data } = await axios.get(`/api/auth/userInfo/${id}`, {
                headers: {
                    authorization: token,
                },
            });
            const req = await axios.delete(`/api/admin/users/${data.id}`, {
                headers: {
                    authorization: token,
                },
            });
            dispatch({ type: 'DEL_USER', payload: req.data.id });
        } catch (error) {
            console.log(error)
        }
    }
}

const initialState = { view: false, sortMethod: "", formMethod: '', product: '', user: '', users: [], products: [] };

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'GET_PRODUCTS':
            return { ...state, products: action.payload };
        case 'GET_USERS':
            return { ...state, users: action.payload };
        case "ADD_USER":
            return { ...state, users: [action.payload, ...state.users] };
        case "EDIT_USER":
            let prevState = state.users.filter(user => user.id !== action.payload.id);
            return { ...state, users: [action.payload, ...prevState] };
        case "DEL_USER":
            let prevUsers = state.users.filter(user => user.id !== action.payload);
            return { ...state, users: prevUsers };
        case 'SET_VIEW':
            return { ...state, view: action.sel };
        case 'SET_PRODUCT':
            return { ...state, product: action.sel };
        case 'SET_USER':
            return { ...state, user: action.sel };
        case 'SET_FORM_METHOD':
            return { ...state, formMethod: action.sel };
        case 'SET_SORT_METHOD':
            return { ...state, sortMethod: action.sel };
        case 'SORT_USERS':
            return { ...state, users: sortedUsersArray(state.users, state.sortMethod, action.sel) };
        case 'SORT_PRODUCTS':
            return { ...state, products: sortedProductsArray(state.products, state.sortMethod, action.sel) };
        default:
            return state;
    }
}

export default adminReducer;


