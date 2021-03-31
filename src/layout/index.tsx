import React, { memo } from 'react';
import type { FC } from 'react';
import type { RouteComponentProps } from 'react-router-dom';
import style from './index.less';

interface Props extends RouteComponentProps {}

//   系统的第一入口
const Layout: FC<Props> = (props: Props) => {
    return (
        <>
            <section className={style.layout}>111</section>
        </>
    );
};

export default memo(Layout);
