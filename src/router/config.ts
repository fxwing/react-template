/**
 * route 的配置文件
 */
import React from 'react';

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
// 默认全部路由配置
// 第一级路由为最外层路由   方便以后在系统外拓展
export const routes: Array<IRoute> = [
    {
        path: '/system',
        component: React.lazy(() => import('../layout/UserLayout')),
        meta: {
            title: '系统路由'
        },
        redirect: '/system/login',
        children: [
            {
                path: '/system/login',
                component: React.lazy(() => import('../view/system/login/index')),
                meta: {
                    title: '登录'
                }
            }
        ]
    },
    {
        path: '/',
        component: React.lazy(() => import('../layout/index')),
        meta: {
            title: '系统'
        },
        redirect: '/dashborad/intro',
        children: []
    },

    // error 路由
    {
        path: '/error',
        meta: {
            title: '错误页面'
        },
        component: React.lazy(() => import('../view/error/404')),
        redirect: '/error/404',
        children: [
            {
                path: '/error/404',
                auth: false,
                component: React.lazy(() => import('../view/error/404')),
                meta: {
                    title: '页面不存在'
                }
            },
            {
                path: '/error/403',
                auth: false,
                component: React.lazy(() => import('../view/error/403')),
                meta: {
                    title: '暂无权限'
                }
            }
        ]
    },
    // 其他路由
    {
        path: '/*',
        auth: false,
        component: React.lazy(() => import('../view/error/404')),
        redirect: '/error/404',
        meta: {
            title: '错误页面'
        }
    }
];
