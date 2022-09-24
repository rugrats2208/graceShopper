import axios from 'axios';

const GET_USERS = 'GET_USERS'

export const setSelection = (selection) => ({ type: 'SET_SELECTION', selection })

export const setOption = (option) => ({ type: 'SET_OPTION', option })

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
            dispatch({ type: GET_USERS, payload: data })
        }
        catch (error) {
            console.log(error);
        }
    }
}




const initialState = { selection: '', option: '', users: [] };

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTION':
            return { ...state, selection: action.selection }
        case "SET_OPTION":
            return { ...state, option: action.option }
        case 'GET_USERS':
            return { ...state, users: action.payload }
        default:
            return state;
    }
}

export default adminReducer;