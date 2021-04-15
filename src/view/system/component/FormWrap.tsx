// form  包裹组件
import React from 'react';
import type { FC, ReactNode } from 'react';

interface IProps {
    children: ReactNode;
    className?: string;
}

const FormWrap: FC<IProps> = (props: IProps) => {
    const { children, className } = props;
    const defaultStyle = {
        width: '350px',
        margin: 'auto',
        paddingTop: '50px'
    };
    return (
        <div className={className} style={defaultStyle}>
            {children}
        </div>
    );
};

export default FormWrap;
