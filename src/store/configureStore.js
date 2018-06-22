import {createStore, applyMiddleware} from 'redux'
import thunkMiddleware from 'redux-thunk'
import createSagaMiddleware from 'redux-saga'
import {logger, router, reduxRouterMiddleware} from '../middleware'
import promiseMiddleware from 'redux-promise-middleware';
import {routerMiddleware} from 'react-router-redux'
import rootReducer from '../reducers'

const nextReducer = require('../reducers')

export default function configure(initialState, history) {
    // console.log('initialState', initialState)
    const create = global.devToolsExtension
        ? global.devToolsExtension()(createStore)
        : createStore
    const createStoreWithMiddleware = applyMiddleware(
        promiseMiddleware({
            promiseTypeSuffixes: ['LOADING', 'SUCCESS', 'ERROR']
        }),
        thunkMiddleware,
        logger,
        router,
        routerMiddleware(history)
    )(create)

    const store = createStoreWithMiddleware(rootReducer, initialState)

    if (module.hot) {
        module.hot.accept('../reducers', () => {
            store.replaceReducer(nextReducer)
        })
    }

    return store
}
