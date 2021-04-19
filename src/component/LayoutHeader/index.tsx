import React, { ReactElement, useCallback } from 'react';
import classNames from 'classnames/bind';
import NavIcon from './NavIcon';
import AvatarDropdown from './AvatarDropdown';
import style from './index.less';

const cns = classNames.bind(style);
interface Props {}

export default function LayoutHeader({}: Props): ReactElement {
    const iconClick = useCallback(() => {
        window.open('https://www.github.com/fxwing');
    }, []);

    return (
        <div className={cns(style.layout_header, 'align--center')}>
            <NavIcon className={style.icon} count={2} icon="github" onClick={iconClick}></NavIcon>
            <NavIcon className={style.icon} count={8} icon="facebook" onClick={iconClick}></NavIcon>
            <AvatarDropdown classNames={style.avatar} />
        </div>
    );
}
