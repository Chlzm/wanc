import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as main from './main';
const rootReducer = combineReducers({
    routing,
    config: (state = {}) => state,
    ...main,
});

export default rootReducer;