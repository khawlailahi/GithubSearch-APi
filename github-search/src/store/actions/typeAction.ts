import { TypeAction, SET_TYPE } from "../types";


// This action is dispatched When the category changes ( users/ Repos)

export const setType = (type: string): TypeAction => {
    return {
        type: SET_TYPE,
        payload: type
    }
}