import { DataState, DataAction, GET_DATA, SET_LOADING, SET_ERROR } from "../types";

const initialState: DataState = {
    data: [],
    loading: false,
    error: ''
}

const dataReducer = (state = initialState, action: DataAction): DataState => {
    switch (action.type) {
        case GET_DATA:
            return {
                data: action.payload,
                loading: false,
                error: ''
            }
        case SET_LOADING:
            return {
                ...state,
                loading: true
            }
        case SET_ERROR:
            return {
                ...state,
                error: action.payload,
                loading: false
            }
        default:
            return state;
    }
}
export default dataReducer