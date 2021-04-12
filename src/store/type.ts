import type { UserState } from './module/user';
import type { Setting as SettingState } from './module/setting';
import type { AppState } from './module/app';
export interface IAction<T = any> {
    type: string;
    payload: T;
}

export interface IStoreState {
    user: UserState;
    setting: SettingState;
    app: AppState;
}
