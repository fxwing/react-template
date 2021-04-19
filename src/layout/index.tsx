import React, { memo, Suspense, createElement, useState } from 'react';
import { useSelector, shallowEqual, useDispatch } from 'react-redux';
import { Spin, Layout } from 'antd';
import { MenuUnfoldOutlined, MenuFoldOutlined } from '@ant-design/icons';
import classNames from 'classnames/bind';
import LayoutMenu from '@/component/LayoutMenu';
import LayoutHeader from '@/component/LayoutHeader';
import MainRoutes from './MainRoutes';
import { updateSetting } from '@/store/module/setting';
import type { FC, MouseEventHandler } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import type { IStoreState } from '@store/type';
import style from './index.less';

const cns = classNames.bind(style);
const { Header, Sider, Content } = Layout;
console.log(style);

interface Props extends RouteComponentProps, IStoreState {}
//   系统的第一入口
const LayoutComponent: FC<Props> = (props: Props) => {
    // console.log('layout的props', props);
    // 不是通过注入props中使用  放弃connect
    // 默认使用的 === 全等比较 对象的时候 最好使用浅比较
    const { layout, collapsed } = useSelector((state: IStoreState) => state.setting, shallowEqual);
    const dispatch = useDispatch();

    return (
        <>
            <Layout className={style.layout}>
                <Sider
                    className={style.slide}
                    trigger={null}
                    collapsible
                    collapsed={collapsed}
                    theme={'light'}
                    collapsedWidth="0"
                >
                    <div className="logo" />
                    <LayoutMenu />
                    {/* <Spin className="layout__loading"></Spin> */}
                </Sider>
                <Layout className={style.layout_content}>
                    <Header
                        className={cns('align--center', 'justify--between', style.layout_header)}
                    >
                        {createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
                            className: style.trigger,
                            onClick: (() =>
                                dispatch(
                                    updateSetting({ collapsed: !collapsed })
                                )) as MouseEventHandler<HTMLSpanElement>
                        })}
                        <LayoutHeader />
                    </Header>
                    <Content className={style.content}>
                        <Suspense fallback={<Spin className="layout__loading"></Spin>}>
                            <MainRoutes></MainRoutes>
                        </Suspense>
                    </Content>
                </Layout>
            </Layout>
        </>
    );
};

export default memo(LayoutComponent);
