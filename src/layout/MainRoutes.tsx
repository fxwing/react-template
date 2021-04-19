//   routes入口
import React, { useMemo, memo } from 'react';
import { Route, Redirect } from 'react-router-dom';
import AsyncRoutes from './AsyncRoutes';
import Auth from './Auth';
import Helmet from '@component/Helmet';
import { businessRouteList, getPageTitle } from '@router/utils';
import PageWrap from '../component/Pagewrap';
import type { FC, ReactNode, ReactElement } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import type { IRoute } from '@router/config';
interface Props {}
//   样式简洁一点
function renderRouteList(routeList: IRoute[]): ReactNode {
    function renderRoute(route: IRoute): ReactNode {
        const title = getPageTitle(businessRouteList);
        const { component: CurrComponent, path, redirect } = route;
        return (
            <Route
                key={path}
                exact={path !== '*'}
                path={path}
                render={(props: RouteComponentProps) => {
                    return (
                        <Auth route={route} {...props}>
                            <Helmet title={title} />
                            {redirect ? (
                                <Redirect to={redirect} push></Redirect>
                            ) : (
                                <PageWrap>
                                    <CurrComponent {...props}></CurrComponent>
                                </PageWrap>
                            )}
                        </Auth>
                    );
                }}
            ></Route>
        );
    }
    return businessRouteList.map(renderRoute);
}

const MainRoutes: FC<Props> = (props: Props): ReactElement => {
    const routeList = useMemo(() => renderRouteList(businessRouteList), []);
    // console.log(businessRouteList, routeList);
    return (
        <>
            <AsyncRoutes>{routeList}</AsyncRoutes>
        </>
    );
};
export default memo(MainRoutes);
