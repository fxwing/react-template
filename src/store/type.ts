import type { UserState } from './module/user';

export interface IAction<T = any> {
    type: string;
    payload: T;
}

export interface IStoreState {
    user: UserState;
}
