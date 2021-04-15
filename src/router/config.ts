/**
 * route 的配置文件
 */
import React, { ReactNode } from 'react';
export interface IRouteMeta {
    title: string;
    icon?: string;
}
export interface IRouteBase {
    path: string; //路由路径
    component?: any; // 路由组件
    redirect?: string; // 302 重定向跳转
    meta: IRouteMeta; // 路由信息
    auth?: boolean; // 是否权限检验，false不校验  不存在和设置为true为校验 子路由继承父路由auth
}
export interface IRoute extends IRouteBase {
    children?: IRoute[];
}

// 默认全部路由配置
// 第一级路由为最外层路由   方便以后在进入系统外拓展
// 一共 两个路由  一个登录  一个系统
export const routes: Array<IRoute> = [
    // 登陆注册
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
            },
            {
                path: '/system/register',
                component: React.lazy(() => import('../view/system/register/index')),
                meta: {
                    title: '注册'
                }
            },
            {
                path: '/system/register-result/:id',
                component: React.lazy(() => import('../view/system/registerResult/index')),
                meta: {
                    title: '注册结果'
                }
            },
            {
                path: '/system/recovery-pwd',
                component: React.lazy(() => import('../view/system/recoveryPwd/index')),
                meta: {
                    title: '找回密码'
                }
            }
        ]
    },
    // 系统业务路由
    {
        path: '/',
        component: React.lazy(() => import('../layout/index')),
        meta: {
            title: '系统'
        },
        redirect: '/page1/one',
        children: [
            {
                path: '/page1',
                redirect: '/page1/one',
                meta: {
                    title: 'page1',
                    icon: 'dashborad'
                },
                children: [
                    {
                        path: '/page1/one',
                        component: React.lazy(() => import('../view/page1')),
                        meta: {
                            title: 'page1/one'
                        }
                    }
                ]
            },
            {
                path: '/page2',
                redirect: '/page2/one',
                meta: {
                    title: 'page2',
                    icon: 'dashborad'
                },
                children: [
                    {
                        path: '/page2/one',
                        component: React.lazy(() => import('../view/page2')),
                        meta: {
                            title: 'page2/one'
                        }
                    }
                ]
            },
            // error 路由
            {
                path: '/error',
                meta: {
                    title: '错误页面'
                },
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
                redirect: '/error/404',
                meta: {
                    title: '错误页面'
                }
            }
        ]
    }
];
