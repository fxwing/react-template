import React from 'react';
import type { FC } from 'react';
import { Link } from 'react-router-dom';
import { Result, Button } from 'antd';
import style from './index.less';

interface Props {}

const Com403: FC<Props> = (props: Props) => {
    return (
        <>
            <Result
                title="403"
                status="403"
                subTitle="系统提示：你暂无有访问该页面的权限，请联系管理员添加权限后使用"
                extra={
                    <Button type="primary">
                        <Link to="/">返回首页</Link>
                    </Button>
                }
            ></Result>
        </>
    );
};

export default Com403;
