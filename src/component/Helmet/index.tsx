import React from 'react';
import { Helmet } from 'react-helmet';

interface Iprops {
    title: string;
}

const HelmetCom: React.FC<Iprops> = ({ title }: Iprops) => {
    return (
        <>
            <Helmet>
                <title>{title}</title>
                <meta name="description" content={title} />
            </Helmet>
        </>
    );
};

export default HelmetCom;
