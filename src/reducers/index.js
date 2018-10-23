import {routerReducer as routing} from 'react-router-redux';
import {combineReducers} from 'redux';
import * as main from './main';
import * as header from './header';
import * as fill from './orderFill';
import * as message from './message'

const rootReducer = combineReducers({
    routing,
    config: (state = {}) => state,
    ...main,
    ...header,
    ...fill,
    ...message,
});

export default rootReducer;