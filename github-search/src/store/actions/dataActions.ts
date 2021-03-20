import { ThunkAction } from 'redux-thunk';
import { RootState } from '..';
import { DataAction, GithubData, DataError, GET_DATA, SET_LOADING, SET_ERROR } from '../types';

export const getData = (city: object): ThunkAction<void, RootState, null, DataAction> => {
    return async dispatch => {
        try {

            if (Array.isArray(city)) {
                const resData: [] = []
                dispatch({
                    type: GET_DATA,
                    payload: resData
                });
            }
            else {

                const res = await fetch(`http://localhost:5000/api/search`, {
                    method: 'POST', headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(city)

                });

                if (!res.ok) {

                    const resData: DataError = await res.json();
                    console.log(resData['err'])
                    dispatch({
                        type: SET_ERROR,
                        payload: resData['err']
                    });
                }

                const resData: GithubData = await res.json();
                console.log(resData)
                dispatch({
                    type: GET_DATA,
                    payload: resData
                });
            }
        } catch (err) {

            console.log(err)
        }
    }
}

export const setLoading = (): DataAction => {
    return {
        type: SET_LOADING
    }
}

export const setError = (): DataAction => {
    return {
        type: SET_ERROR,
        payload: ''
    }
}