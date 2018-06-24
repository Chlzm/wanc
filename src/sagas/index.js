import { fork, all } from 'redux-saga/effects'
import homeSaga from './homeSaga'
import headerSaga from './headerSaga'

export default function* root() {
    yield all([
        fork(homeSaga),
        fork(headerSaga),
    ])
}

