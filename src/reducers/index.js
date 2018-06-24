import { routerReducer as routing } from 'react-router-redux';
import { combineReducers } from 'redux';
import * as main from './main';
import * as header from './header';

const rootReducer = combineReducers({
    routing,
    config: (state = {}) => state,
    ...main,
    ...header,
});

export default rootReducer;