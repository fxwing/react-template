//   routes入口
import React from 'react';
import type { FC } from 'react';
import AsyncRoutes from './AsyncRoutes';
interface Props {}
const MainRoutes: FC<Props> = (props: Props): React.ReactElement => {
    return (
        <>
            main
            <AsyncRoutes>路由</AsyncRoutes>
        </>
    );
};
export default MainRoutes;
