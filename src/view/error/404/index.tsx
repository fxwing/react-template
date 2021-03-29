import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import style from './index.less';

interface Props {}

const Com404: FC<Props> = (props: Props) => {
    return (
        <>
            <Result
                title="404"
                status="404"
                subTitle="系统提示：您访问的页面不存在，请检查后重新使用"
                extra={
                    <Button type="primary">
                        <Link to="/">返回首页</Link>
                    </Button>
                }
            ></Result>
        </>
    );
};

export default Com404;
