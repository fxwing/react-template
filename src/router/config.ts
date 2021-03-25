/**
 * route 的配置文件
 */
import React, { lazy } from 'react';

export interface IRouteMate {
    title: string;
    icon?: string;
}
export interface IRouteBase {
    path: string; //路由路径
    component?: any; // 路由组件
    redirect?: string; // 302 重定向跳转
    meta: IRouteMate; // 路由信息
    auth?: boolean; // 是否权限检验，false不校验  不存在和设置为true为校验 子路由继承父路由auth
}
export interface IRoute extends IRouteBase {
    children?: IRoute[];
}
// 懒加载引入路由
const lazyImport = (path: string) => lazy(() => import(path));
// 默认全部路由配置
export const routes: Array<IRoute> = [
    {
        path: '/',
        component: lazyImport('../layout/index'),
        meta: {
            title: '系统'
        },
        redirect: '/dashborad/intro'
        // children: [ ];
    }
];
