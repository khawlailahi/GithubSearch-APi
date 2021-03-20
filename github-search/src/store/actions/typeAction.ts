import { TypeAction, SET_TYPE } from "../types";

export const setType = (type: string): TypeAction => {
    return {
        type: SET_TYPE,
        payload: type
    }
}