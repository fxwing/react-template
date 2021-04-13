// 权限路由
import React from 'react';
import type { FC, ReactElement, ReactNode } from 'react';

interface Props {
    children: ReactNode;
}

const Auth: FC<Props> = (props: Props): ReactElement => {
    const { children } = props;
    return <div>{children}</div>;
};

export default Auth;
