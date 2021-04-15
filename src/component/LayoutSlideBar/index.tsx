import React, { useMemo, memo } from 'react';
import classNames from 'classnames/bind';
import { Menu } from 'antd';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import _ from 'lodash';
import { config } from '@/config/index';
import { DashboardTwoTone } from '@ant-design/icons';
import type { ReactElement, ReactNode } from 'react';
import type { IStoreState } from '@store/type';
import type { IRoute, IRouteMeta } from '@/router/config';

import style from './index.less';
const cx = classNames.bind(style);
const { SubMenu } = Menu;
interface Props {}
// route-icon的map
export const routeIcons: { [key: string]: ReactElement } = {
    dashborad: <DashboardTwoTone></DashboardTwoTone>
};
// menu中的数据需要redux中异步请求中获取到的routes
// 分开渲染  menu  和submenu  在submenu中根据children递归  renderRoute 针对route[]的一个
function LayoutSliderBar({}: Props): ReactElement {
    const routes: IRoute[] = useSelector((state: IStoreState) => state.app.routes);
    const renderRoutes = useMemo(() => _.map(routes, (route) => renderMenu(route)), [routes]);
    return (
        <>
            <Menu mode="inline">{renderRoutes}</Menu>
        </>
    );
}

function renderMenu(route: IRoute): ReactElement {
    console.log(route);
    if (route.children) {
        return renderSubRoute(route);
    } else {
        return renderRoute(route);
    }
}
// 渲染sub路由
function renderSubRoute(route: IRoute): ReactElement {
    const { path, meta, children } = route;
    return (
        <SubMenu key={path} title={renderTitle(meta)}>
            {children?.map((item) => {
                if (item.children) {
                    return renderSubRoute(item);
                }
                return renderMenu(item);
            })}
        </SubMenu>
    );
}
// 渲染单一路由
function renderRoute(route: IRoute): ReactElement {
    const { path, meta } = route;
    return (
        <Menu.Item key={path}>
            <Link to={config.BASENAME + path}>{renderTitle(meta)}</Link>
        </Menu.Item>
    );
}
//  获取 title node
function renderTitle(meta: IRouteMeta): ReactNode {
    const { title, icon } = meta;
    return (
        <span className="menu-item-inner">
            {icon ? routeIcons[icon] : null}
            <span className="menu-item-title">{title}</span>
        </span>
    );
}
export default memo(LayoutSliderBar);
