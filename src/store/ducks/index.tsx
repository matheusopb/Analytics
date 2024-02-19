import { combineReducers } from 'redux';
import insightReducer from './insight';
import userReducer from './user';
import authReducer from './auth';

export default combineReducers({
    authReducer,
    insightReducer,
    userReducer,
});