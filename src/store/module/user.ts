// user reducer 和actions  配置文件
import type { Reducer } from 'redux';
import type { IAction } from '../type';
import { setToken, getToken, removeToken } from '@/utils/cookie';
import { localStore } from '@/utils/store';
import { config } from '@/config/index';

export interface UserState {
    id: string;
    token: string;
    account: string;
    mobile: string;
}
// 获取存到本地的用户信息
const localUser: { [propsName: string]: any } =
    localStore.getValue<UserState>(config.USER_LOCAL_KEY) || {};
//  reducer  state 默认值
const defaultUserState: UserState = {
    id: '0',
    token: getToken(),
    account: '',
    mobile: '',
    ...localUser
};
// 声明当前的types
const types: { [propsName: string]: string } = {
    SET_USER_INFO: 'SET_USER_INFO',
    SET_USER_LOGOUT: 'SET_USER_LOGOUT'
};
// actions
export const setUserInfo = (value: UserState): IAction<UserState> => {
    return { type: types.SET_USER_INFO, payload: value };
};
export const setUserLogout = (): IAction<null> => {
    return { type: types.SET_USER_LOGOUT, payload: null };
};
//  reducer
const userReducer: Reducer<UserState, IAction> = (
    state: UserState = defaultUserState,
    action: IAction
): UserState => {
    const { type, payload } = action;
    switch (type) {
        case types.SET_USER_INFO:
            setToken(payload.token);
            localStore.setValue(config.TOKEN_KEY, payload);
            return Object.assign({}, state, payload);
        case types.SET_USER_LOGOUT:
            removeToken();
            localStore.removeValue(config.USER_LOCAL_KEY);
            return { ...state };
        default:
            return { ...payload };
    }
};

export default userReducer;
