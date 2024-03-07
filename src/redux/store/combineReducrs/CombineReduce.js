import { combineReducers } from 'redux';
import tokenReducer from '../slice/Userslice';

const rootReducer = combineReducers({
  token: tokenReducer,
  // other reducers...
});

export default rootReducer;
