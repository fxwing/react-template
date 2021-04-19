import React, { FC, memo } from 'react';
import BreadCrumb from '@/component/BreadCrumb';
import { Divider } from 'antd';
import classNames from 'classnames/bind';
import style from './index.less';
import type { ReactNode } from 'react';
const cns = classNames.bind(style);
interface IProps {
    children: ReactNode;
    className?: string;
}
const PageWrap: FC<IProps> = (props) => {
    const { children, className = '' } = props;
    const defaultStyle = {
        padding: '10px',
        width: '100%',
        height: '100%'
        // background: '#fff'
    };
    return (
        <div className={className} style={defaultStyle}>
            <div>
                <BreadCrumb></BreadCrumb>
                <Divider className={cns('divider')}></Divider>
            </div>
            {children}
        </div>
    );
};

export default memo(PageWrap);
