import React, { memo } from 'react';
import { connect } from 'react-redux';
import classNames from 'classnames/bind';
import LayoutSlideBar from '@/component/LayoutSlideBar';
import type { FC } from 'react';
import type { DefaultRootState } from 'react-redux';
import type { RouteComponentProps } from 'react-router-dom';
import type { IStoreState } from '@store/type';
import style from './index.less';

const cx = classNames.bind(style);

interface Props extends RouteComponentProps, IStoreState {}
//   系统的第一入口
const Layout: FC<Props> = (props: Props) => {
    console.log(props);
    const {
        setting: { layout }
    } = props;
    return (
        <>
            <section
                className={cx(style.layout, {
                    'layout--side-bar': layout === 'side'
                })}
            >
                {layout === 'side' ? <LayoutSlideBar></LayoutSlideBar> : null}
            </section>
        </>
    );
};

export default connect((state: Partial<IStoreState>) => {
    return { setting: state.setting! };
}, {})(memo(Layout));
