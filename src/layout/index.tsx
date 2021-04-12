import React, { memo, Suspense } from 'react';
import { useSelector, shallowEqual } from 'react-redux';
import { Spin } from 'antd';
import classNames from 'classnames/bind';
import LayoutSlideBar from '@/component/LayoutSlideBar';
import MainRoutes from './MainRoutes';
import type { FC } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import type { IStoreState } from '@store/type';
import style from './index.less';

const cx = classNames.bind(style);

interface Props extends RouteComponentProps, IStoreState {}
//   系统的第一入口
const Layout: FC<Props> = (props: Props) => {
    console.log('layout的props', props);
    // 不是通过注入props中使用  放弃connect
    // 默认使用的 === 全等比较 对象的时候 最好使用浅比较
    const { layout } = useSelector((state: IStoreState) => state.setting, shallowEqual);
    return (
        <>
            <section
                className={cx(style.layout, {
                    'layout--side-bar': layout === 'side'
                })}
            >
                {layout === 'side' ? <LayoutSlideBar /> : null}

                <section className={style.layout_main}>
                    <Suspense fallback={<Spin className="layout__loading"></Spin>}>
                        <MainRoutes></MainRoutes>
                    </Suspense>
                </section>
            </section>
        </>
    );
};

export default memo(Layout);
