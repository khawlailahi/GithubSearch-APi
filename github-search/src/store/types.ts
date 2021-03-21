export const GET_DATA = 'GET_DATA';
export const SET_LOADING = 'SET_LOADING';
export const SET_ERROR = 'SET_ERROR';
export const SET_ALERT = 'SET_ALERT';
export const SET_TYPE = 'SET_TYPE';


export interface GithubData {
    data: object[]
}

export interface DataError {
    err: string;
}

export interface DataState {
    data: GithubData | [];
    loading: boolean;
    error: string;
}

interface GetDataAction {
    type: typeof GET_DATA;
    payload: GithubData | [];
}

interface SetLoadingAction {
    type: typeof SET_LOADING;
}

interface SetErrorAction {
    type: typeof SET_ERROR;
    payload: string;
}

export type DataAction = GetDataAction | SetLoadingAction | SetErrorAction;

export interface AlertAction {
    type: typeof SET_ALERT;
    payload: string;
}

export interface AlertState {
    message: string;
}
export interface TypeState {
    type: string;
}
export interface TypeAction {
    type: typeof SET_TYPE;
    payload: string;
}