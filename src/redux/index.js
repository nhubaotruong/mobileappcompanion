import { createStore, applyMiddleware, combineReducers } from 'redux';
import ReduxThunk from 'redux-thunk';
import systemReducer from './systemReducer';
import courseReducer from './courseReducer';

const rootReducer = combineReducers({
    system: systemReducer,
    course: courseReducer
});

const store = createStore(rootReducer, applyMiddleware(ReduxThunk));

export default store;