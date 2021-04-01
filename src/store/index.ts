//  redux 的入口文件
import { createStore, combineReducers, applyMiddleware } from 'redux';
import ReduxThunk from 'redux-thunk';
import ReduxLogger from 'redux-logger';
// redux 浏览器工具
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import userReducer from './module/user';
import settingReducer from './module/setting';

import type { Reducer, Store, Middleware, AnyAction } from 'redux';
import type { IStoreState, IAction } from './type';

const reducers: Reducer<IStoreState, IAction> = combineReducers<IStoreState>({
    user: userReducer,
    setting: settingReducer
});
const middlewares: Middleware[] = [ReduxThunk];

if (process.env.NODE_ENV === 'development') {
    middlewares.push(ReduxLogger);
}

function createMyStore(): Store<IStoreState, AnyAction> {
    return createStore(reducers, composeWithDevTools(applyMiddleware(...middlewares)));
}

const store: Store<IStoreState, AnyAction> = createMyStore();

export default store;
