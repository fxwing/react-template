import type { IRoute } from './config';
import { routes } from './config';
/**
 * 递归获取到全部的route  转化为一位数组
 * @param routeList 路由
 * @param deep 是否深层转化
 * @param auth 路由是否检查权限   路由配置里的优先级高
 * @returns  一维路由数组
 */
export const flattenRoute = (routeList: IRoute[], deep: boolean, auth: boolean): IRoute[] => {
    const result: Array<IRoute> = [];
    routeList.forEach((route: IRoute) => {
        result.push({
            ...route,
            auth: typeof route.auth !== undefined ? route.auth : auth
        });
        if (route.children && deep) {
            result.push(...flattenRoute(route.children, deep, auth));
        }
    });
    return result;
};

// 获取最外层路由
function getLayoutRoute(): IRoute[] {
    return flattenRoute(routes, false, false);
}
//获取登陆和介绍的路由(系统路由  登录注册)
function getSystemRoute(): IRoute[] {
    const routeList = routes.filter((r) => r.path === '/system');
    if (routeList.length) return flattenRoute(routeList, true, false);
    return [];
}
// 获取业务路由
function getBusinessRoute(): IRoute[] {
    const routeList = routes.filter((r) => r.path === '/');
    if (routeList.length) return flattenRoute(routeList, true, true);
    return [];
}
// 最外层路由
export const layoutRouteList: IRoute[] = getLayoutRoute();
// 登陆注册路由
export const systemRouteList: IRoute[] = getSystemRoute();
// 业务路由
export const businessRouteList: Array<IRoute> = getBusinessRoute();
// export const
// 根据pathname  获取当前路由的名字
export function getPageTitle(routeList: IRoute[]): string {
    const route = routeList.find((route) => route.path === window.location.pathname);
    return route ? route?.meta?.title : '';
}
