//   routes入口
import React, { useMemo, memo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AsyncRoutes from './AsyncRoutes';
import Auth from './Auth';
import Helmet from '@component/Helmet';
import { businessRouteList, getPageTitle } from '@router/utils';

import type { FC, ReactNode, ReactElement } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import type { IRoute } from '@router/config';
interface Props {}

function renderRoute(route: IRoute): ReactNode {
    const title = getPageTitle(businessRouteList);
    const { component: Component, path, redirect } = route;
    return (
        <Route
            key={path}
            exact
            path={path}
            render={(props: RouteComponentProps) => {
                return (
                    <Auth>
                        <Helmet title={title} />
                        {redirect ? <Redirect to={redirect} /> : <Component {...props}></Component>}
                    </Auth>
                );
            }}
        ></Route>
    );
}

function renderRouteList(routeList: IRoute[]): ReactNode {
    return businessRouteList.map(renderRoute);
}

const MainRoutes: FC<Props> = (props: Props): ReactElement => {
    console.log(businessRouteList);
    const routeList = useMemo(() => renderRouteList(businessRouteList), []);
    return (
        <>
            <AsyncRoutes>
                {routeList}
                <Redirect to="/error"></Redirect>
            </AsyncRoutes>
        </>
    );
};
export default memo(MainRoutes);
