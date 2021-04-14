// 权限路由
import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { getToken } from '@/utils/cookie';
import { useSelector } from 'react-redux';
import { businessRouteList } from '@router/utils';
import type { FC, ReactElement, ReactNode } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import type { IRoute } from '@router/config';
import type { IStoreState } from '@store/type';

interface IProps extends RouteComponentProps {
    children: ReactNode;
    route: IRoute;
}
// 鉴权
function checkAuth(location: RouteComponentProps['location']): boolean {
    const { pathname } = location;
    const { flattenRoutes } = useSelector((state: IStoreState) => state.app);
    // 全部的路由
    const route = businessRouteList.find((route: IRoute) => route.path === pathname);
    //如果没有当前路由  鉴权通过 走404
    if (!route) return true;
    // 如果有重定向  鉴权通过当前路由
    if (route.redirect) return true;
    // 当前这个route route为false  不进行鉴权
    if (route.auth === false) return true;
    // 当前用户的路由
    const hasAuthRoute = flattenRoutes.some((route: IRoute) => route.path === pathname);
    if (!hasAuthRoute) return false;
    return true;
}

const Auth: FC<IProps> = (props: IProps): ReactElement => {
    // console.log(props);
    const { children, location } = props;
    const history = useHistory();
    // console.log(location, history);
    //  没有登录  跳转到登录页面
    if (!getToken()) {
        const currUrl = encodeURIComponent(window.location.href);
        const url = `/system/login?redirectUrl=${currUrl}`;
        history.push(url);
    }
    // 鉴权不通过  跳转到403
    if (!checkAuth(location)) {
        return <Redirect to="/error/403"></Redirect>;
    }
    //
    return <div>{children}</div>;
};

export default Auth;
