import React, { ReactElement, useEffect, useState } from 'react';
import { Breadcrumb } from 'antd';
import { useHistory, useLocation, Link } from 'react-router-dom';
import { getBreadCrumbs } from '@/router/utils';

import type { IRoute } from '@/router/config';
interface Props {}

function BreadCrumbCom({}: Props): ReactElement {
    const location = useLocation();
    const history = useHistory();
    const { pathname } = location;
    const [breadCrumbs, setBreadCrumbs] = useState<IRoute[]>([]);
    useEffect(() => {
        setBreadCrumbs(getBreadCrumbs(pathname));
        return history.listen(() => {
            setBreadCrumbs(getBreadCrumbs(pathname));
        });
    }, []);
    return (
        <>
            <Breadcrumb>
                {breadCrumbs.map((route: IRoute) => (
                    <Breadcrumb.Item key={route.path}>
                        <Link to={route.path}>{route.meta.title}</Link>
                    </Breadcrumb.Item>
                ))}
            </Breadcrumb>
        </>
    );
}

export default BreadCrumbCom;
