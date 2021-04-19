import React, { useMemo, memo, Key, useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Menu, Spin } from 'antd';
import { useSelector } from 'react-redux';
import { Link, useLocation } from 'react-router-dom';
import _ from 'lodash';
import { config } from '@/config/index';
import { DashboardTwoTone } from '@ant-design/icons';
import { getPageKey } from '@/router/utils';
import type { ReactElement, ReactNode } from 'react';
import type { IStoreState } from '@store/type';
import type { IRoute, IRouteMeta } from '@/router/config';
import style from './index.less';
const cns = classNames.bind(style);
const { SubMenu } = Menu;
interface Props {}
// route-icon的map
export const routeIcons: { [key: string]: ReactElement } = {
    dashborad: <DashboardTwoTone></DashboardTwoTone>
};
// menu中的数据需要redux中异步请求中获取到的routes
// 分开渲染  menu  和submenu  在submenu中根据children递归  renderRoute 针对route[]的一个
function LayoutMenu({}: Props): ReactElement {
    const location = useLocation();
    const { pathname } = location;
    const routes: IRoute[] = useSelector((state: IStoreState) => state.app.routes);
    const collapsed: boolean = useSelector((state: IStoreState) => state.setting.collapsed);

    const renderRoutes = useMemo(() => _.map(routes, (route) => renderMenu(route)), [routes]);
    const rootSubmenuKeys = useMemo(() => _.map(_.filter(routes, 'children'), 'path'), [routes]);
    const [openKeys, setOpenKeys] = useState<Array<string>>([]);

    useEffect(() => {
        const openKeys = getPageKey(pathname);
        setOpenKeys(openKeys);
        return () => {};
    }, [pathname]);

    const onOpenChange = (keys: any[]) => {
        if (collapsed) return false;
        const latestOpenKey = keys.find((key) => openKeys.indexOf(key) === -1);
        if (rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            setOpenKeys(keys);
        } else {
            setOpenKeys(latestOpenKey ? [latestOpenKey] : []);
        }
    };
    if (_.isEmpty(routes)) return <Spin className="layout__loading"></Spin>;
    return (
        <>
            <Menu
                mode="inline"
                theme={'light'}
                selectedKeys={[pathname]}
                openKeys={openKeys}
                onOpenChange={onOpenChange}
            >
                {renderRoutes}
            </Menu>
        </>
    );
}

function renderMenu(route: IRoute): ReactElement {
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
        <span className={cns(style.meun_item, 'align--center')}>
            {icon ? routeIcons[icon] : null}
            <span className={cns(style.menu_item__title)}>{title}</span>
        </span>
    );
}
export default memo(LayoutMenu);
