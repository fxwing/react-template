import React, { ReactElement } from 'react';
import classNames from 'classnames/bind';
import { Menu } from 'antd';
import style from './index.less';
const cx = classNames.bind(style);

interface Props {}

// menu中的数据需要redux中异步请求中获取到的routes

function LayoutSliderBar({}: Props): ReactElement {
    return (
        <>
            <Menu></Menu>
        </>
    );
}

export default LayoutSliderBar;
