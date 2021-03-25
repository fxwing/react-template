import React, { FC, memo } from 'react';
import type { ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    className?: string;
}
const PageWrap: FC<IProps> = (props) => {
    const { children, className = '' } = props;
    const defaultStyle = {
        padding: '20px',
        boxShadow: '0 2px 12px 0 rgba(0,0,0,.1)',
        width: '100%'
    };
    return (
        <div className={className} style={defaultStyle}>
            {children}
        </div>
    );
};

export default memo(PageWrap);
