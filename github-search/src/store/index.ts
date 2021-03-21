import { createStore, applyMiddleware, combineReducers } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import thunk from 'redux-thunk';

import dataReducer from './reducers/dataReducer';
import alertReducer from './reducers/alertReducer';
import typeReducer from './reducers/typeReducer';

const rootReducer = combineReducers({
    DataGit: dataReducer,
    alert: alertReducer,
    type: typeReducer
});

const store = createStore(
    rootReducer,
    composeWithDevTools(applyMiddleware(thunk))
);

export type RootState = ReturnType<typeof rootReducer>;

export default store;