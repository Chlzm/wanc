import {take, put, call, fork, select, takeEvery, takeLatest, all, cancel, race} from 'redux-saga/effects'
import * as actions from '../actions/header';

/**
 * 更新title
 * @returns {IterableIterator<*>}
 */
export function* updateTitle() {
    while (true) {
        let ret = yield take(actions.SET_TITLE);
        yield put({type: actions.SET_TITLE, data: ret.data})
    }
}


export default function* root() {
    yield all([
        fork(updateTitle),
    ]);
}

