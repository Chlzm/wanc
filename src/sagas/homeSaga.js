import {SagaCancellationException} from 'redux-saga'
import {take, put, call, fork, select, takeEvery, takeLatest, all, cancel, race} from 'redux-saga/effects'
import * as actions from '../actions/main';
import * as api from '../api/home'
import {TRIGGER_TAKE_EXAMPLE} from "../actions/main";
import {GET_REGIONS} from "../actions/main";
import {CANCEL_TASK3} from "../actions/main";
import {FETCH_SUCCESS} from "../actions/main";
import {USER_INPUT} from "../actions/main";
// 一个工具函数：返回一个 Promise，这个 Promise 将在 1 秒后 resolve
export const delay = ms => new Promise(resolve => setTimeout(resolve, ms))

function* bgSync() {
    try {
        yield call(delay, 1000)
        yield put(actions.getRegions(true))
        //const result = yield call(api.getUri3)
        yield call(delay, 1000)
        yield put(actions.getRegions(false))

    } catch (error) {
        if (error instanceof SagaCancellationException) {
            yield put(actions.getRegions(true))
        }

    }
}

// Our worker Saga: 将异步执行 increment 任务
export function* cancelEvent() {
    const bgSyncTask = yield fork(bgSync)
    yield take(actions.CANCEL_TASK3);
    yield cancel(bgSyncTask)

}

/**
 * take 演示 － 用户输入传值 可以put一个action 也可以put type saga内部会进行关联
 * @returns {IterableIterator<*>}
 */
export function* takeExample() {
    while (true) {
        let ret = yield take(actions.TRIGGER_TAKE_EXAMPLE);
        //yield put(actions.getRegions(true))
        yield put({type: actions.GET_REGIONS, data: ret.data})
    }
}

// 阻塞
export function* sync() {
    const [ret1,ret2,ret3] = yield [
        call(api.getUri2),
        call(api.getUri1),
        call(api.getUri3)
    ]
    debugger;
    /*yield api.getUri1()
    yield api.getUri2()
    yield api.getUri3()*/
    /*let ret1 = yield call(api.getUri3);
    let task2 = yield call(api.getUri1,1);
    let task3 = yield call(api.getUri2);*/
    console.log(1)
}

// 非阻塞
export function* async() {
    let ret1 = yield fork(api.getUri3);
    let task2 = yield fork(api.getUri1);
    let task3 = yield fork(api.getUri2);
    console.log(2)
}

// race
export function* raceTimeout() {
    const {result,timeout} = yield race({
        result: call(api.getUri1),
        timeout: call(delay,4000),
    });
    if(result){
        debugger;
        console.log(result)
    }else{
        debugger;
    }
}

function* backgroundTask() {
    while(true){
        yield call(delay, 1000);
        console.log('backgroundTask')
    }
}
export function* reactCancel() {
    yield race({
        task: call(backgroundTask),
        cancel: take(actions.CANCEL_TASK3)
    })
}

function* backgroundInput(value) {
    try{
        yield call(delay,1000);
        let ret1 = yield call(api.getUri1,value);
        yield put({type:actions.FETCH_SUCCESS,data:ret1})
    }catch(e){
        yield put({type:actions.FETCH_SUCCESS,data:ret1})
    }

}

export function* userInput() {
    let task;
    while(true){
        const state = yield select(state => state.GetExam.data);
        let ret = yield take(actions.USER_INPUT);
        if(task){
            yield cancel(task);
        }
        task = yield fork(backgroundInput,ret.data);
    }

}

function* fetchUser(action) {
    console.log(action)
}

function* watchLastFetchUser() {
    debugger;

}

export default function* root() {
    yield all([
        //fork(sync),
        //fork(async),
        //fork(takeExample),
        //fork(cancelEvent),
        //fork(raceTimeout),
        //fork(reactCancel),
        //fork(testTakeLatest),
        //fork(backgroundRequest),
        fork(userInput),
        //fork(watchLastFetchUser)
    ]);
    /*yield takeEvery(actions.CANCEL_TASK3,function* (){
        debugger;
    });*/
    //yield takeLatest(actions.USER_REQUESTED, fetchUser)
}

