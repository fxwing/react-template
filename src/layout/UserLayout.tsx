import React, { PureComponent, Suspense } from 'react';
import { Result, Button, Typography } from 'antd';
import { Switch, Link, Route, Redirect } from 'react-router-dom';
import Helmet from '@component/Helmet';
import { getPageTitle, systemRouteList } from '@router/utils';
import style from './userLayout.less';

console.log(style);

interface Props {}
interface State {
    isError: boolean;
}

export default class UserLayout extends PureComponent<Props, State> {
    state: State = {
        isError: false
    };
    static getDerivedStateFromError() {
        return {
            isError: true
        };
    }

    render() {
        const { isError } = this.state;

        if (isError) {
            return (
                <Result
                    status="warning"
                    title="系统错误，请联系管理员"
                    extra={<Button type="primary">联系管理员</Button>}
                ></Result>
            );
        }

        const title = getPageTitle(systemRouteList);
        console.log(systemRouteList);

        return (
            <>
                <Helmet title={title}></Helmet>

                <main className={style.container}>
                    <div className={style.content}>
                        <div className={style.top}>
                            <Typography.Title className={style.header}>
                                <Link to="/">
                                    <span className={style.title}>React-template</span>
                                </Link>
                            </Typography.Title>
                            <div className={style.desc}>这是一个react-中后台模板</div>
                        </div>

                        <Switch>
                            {systemRouteList.map((route) => {
                                //渲染用render的方法 防止两次/system
                                const { redirect } = route;
                                return (
                                    <Route
                                        exact
                                        path={route.path}
                                        key={route.path}
                                        render={(props) => {
                                            return redirect ? (
                                                <Redirect push to={route.path}></Redirect>
                                            ) : (
                                                <route.component {...props}></route.component>
                                            );
                                        }}
                                    ></Route>
                                );
                            })}
                        </Switch>
                    </div>
                </main>
            </>
        );
    }
}
