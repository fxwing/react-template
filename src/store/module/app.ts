//  全局路由  的配置
import { flattenRoute } from '@router/utils';

import type { Reducer } from 'redux';
import type { IRoute } from '@router/config';
import type { IAction } from '../type';
export interface AppState {
    routes: IRoute[];
    flattenRoutes: IRoute[];
    init: boolean;
}
//  default-state
const defaultAppState = {
    routes: [],
    flattenRoutes: [],
    init: false // 是否是服务端的路由
};

// types
export const types: { [propsNames: string]: string } = {
    SET_SILDE_BAR_ROUTES: 'SET_SILDE_BAR_ROUTES', // 设置当前sidebar路由
    REMOVE_SILDE_BAR_ROUTES: 'REMOVE_SILDE_BAR_ROUTES' // 清空sidebar路由
};

// actions
// 设置
export const setSideBarRoutes: (payload: IRoute[]) => IAction<IRoute[]> = (payload: IRoute[]) => ({
    type: types.SET_SILDE_BAR_ROUTES,
    payload
});
// 移除
export const removeSideBarRoutes: () => Pick<IAction<any>, 'type'> = () => ({
    type: types.REMOVE_SILDE_BAR_ROUTES
});

// reducer
const appReducer: Reducer<AppState, IAction<any>> = (
    state: AppState = defaultAppState,
    actions: IAction<any>
): AppState => {
    const { type, payload } = actions;
    switch (type) {
        case types.SET_SILDE_BAR_ROUTES:
            return {
                ...state,
                routes: payload,
                flattenRoutes: flattenRoute(payload, true, false),
                init: true
            };
        case types.REMOVE_SILDE_BAR_ROUTES:
            return {
                ...state,
                routes: [],
                flattenRoutes: [],
                init: false
            };
        default:
            return { ...state };
    }
};

export default appReducer;
