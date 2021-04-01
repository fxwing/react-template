//布局和整体样式控制

import { config } from '@config/index';
import type { Reducer } from 'redux';
import type { Config } from '@config/index';
import { IAction } from '../type';
import { localStore } from '@/utils/store';

const localSetting: Partial<Setting> = localStore.getValue(config.SETTING_LOCAL_KEY) || {};

export interface Setting {
    layout: Config['layout'];
}
const defaultSetting: Setting = {
    layout: config['layout'],
    ...localSetting
};
// type
export const types: { [propName: string]: string } = {
    UPDATE_SETTING: 'UPDATE_SETTING'
};
//actions
export const updateSetting: (data: Partial<Setting>) => IAction<Partial<Setting>> = (
    data: Partial<Setting>
) => {
    return { type: types.UPDATE_SETTING, payload: data };
};
// reducer
const reducer: Reducer<Setting, IAction<any>> = (
    state: Setting = defaultSetting,
    action
): Setting => {
    const { type, payload } = action;
    switch (type) {
        case types.UPDATE_SETTING:
            localStore.setValue(config.SETTING_LOCAL_KEY, { ...state, ...payload } as Setting);
            return { ...state, ...payload };
        default:
            return { ...state };
    }
};

export default reducer;
