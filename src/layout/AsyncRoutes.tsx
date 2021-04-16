// 异步请求   获取route中的配置
// 先走这里  存到redux的app的route
import React, { Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Spin } from 'antd';
import { TransitionGroup, CSSTransition } from 'react-transition-group';
import { Switch, useLocation } from 'react-router-dom';
import { setSideBarRoutes } from '../store/module/app';
import type { FC, ReactElement, ReactNode } from 'react';
import type { IStoreState } from '../store/type';
interface Props {
    children: ReactNode;
}

const TransitionMain: FC<{ children: ReactNode }> = ({ children }: { children: ReactNode }) => {
    return (
        <>
            <TransitionGroup>
                <CSSTransition timeout={300}>
                    <Switch>{children}</Switch>
                </CSSTransition>
            </TransitionGroup>
        </>
    );
};

const AsyncRoutes: FC<Props> = (props: Props): ReactElement => {
    const { init } = useSelector((state: IStoreState) => state.app);
    const dispatch = useDispatch();
    // 异步获取
    if (!init) {
        setTimeout(() => {
            dispatch(setSideBarRoutes(defaultRoute));
        }, 2000);
        return <Spin className="layout__loading"></Spin>;
    }
    return (
        <Fragment>
            <TransitionMain>{props.children}</TransitionMain>
        </Fragment>
    );
};

export default AsyncRoutes;

const defaultRoute = [
    {
        path: '/page1',
        meta: {
            title: 'page1',
            icon: 'dashborad'
        },
        children: [
            {
                path: '/page1/one',
                meta: {
                    title: 'page1/one'
                },
                children: [
                    {
                        path: '/page1/one/one',
                        meta: {
                            title: 'page1/one/one'
                        }
                    }
                ]
            },
            {
                path: '/page1/two',
                meta: {
                    title: 'page1/two'
                }
            }
        ]
    },
    {
        path: '/page2',
        meta: {
            title: 'page2',
            icon: 'dashborad'
        },
        children: [
            {
                path: '/page2/one',
                meta: {
                    title: 'page2/one'
                }
            }
        ]
    }
];
