import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import { Spin } from 'antd';
import { layoutRouteList } from '@router/utils';
import type { IRoute } from '@router/config';
import { config } from '@config/index';
import '@style/index.less';

function App() {
    const fallback = <Spin size="large" className="layout__loading"></Spin>;
    const basename = config.BASENAME!;
    console.log(layoutRouteList);

    return (
        <Suspense fallback={fallback}>
            <Router basename={basename}>
                <Switch>
                    {/* 方便开发  定位到当前路由 */}
                    <Redirect exact path="/" to="/system/login"></Redirect>
                    {layoutRouteList.map((route: IRoute) => {
                        return (
                            <Route
                                key={route.path}
                                path={route.path}
                                component={route.component}
                            ></Route>
                        );
                    })}
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App;
