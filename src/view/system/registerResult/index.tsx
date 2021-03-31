import React, { memo } from 'react';
import type { FC } from 'react';
import { RouteComponentProps, useParams, Link } from 'react-router-dom';
import { Result, Button } from 'antd';

interface Props extends RouteComponentProps {}
interface Params {
    id: string;
}
const index: FC<Props> = (props: Props) => {
    const params: Params = useParams<Params>();
    return (
        <>
            <Result
                status="success"
                title="注册成功！请返回登陆页面登录"
                subTitle={`恭喜您，你的id是${params.id}，赶快去登录体验功能吧`}
                extra={[
                    <Link to="/system/login" key="link">
                        <Button type="primary" key="button">
                            去 登 录
                        </Button>
                    </Link>
                ]}
            ></Result>
        </>
    );
};

export default memo(index);
