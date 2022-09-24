export const setSelection = (selection) => ({ type: 'SET_SELECTION', selection })

export const setOption = (option) => ({ type: 'SET_OPTION', option })

const initialState = { selection: '', option: '' };

const adminReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_SELECTION':
            return { ...state, selection: action.selection }
        case "SET_OPTION":
            return { ...state, option: action.option }
        default:
            return state;
    }
}

export default adminReducer;