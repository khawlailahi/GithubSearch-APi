import { TypeState, TypeAction, SET_TYPE } from "../types";

const initialState: TypeState = {
    type: 'users'
}
const typeReducer = (state = initialState, action: TypeAction): TypeState => {
    switch (action.type) {
        case SET_TYPE:
            return {
                type: action.payload
            }
        default:
            return state;
    }
}
export default typeReducer