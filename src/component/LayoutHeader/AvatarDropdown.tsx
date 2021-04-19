import React, { MouseEvent, useCallback, memo } from 'react';
import { Dropdown, Avatar, AvatarProps, Menu } from 'antd';
import { UserOutlined, SettingOutlined, LogoutOutlined } from '@ant-design/icons';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { removeSideBarRoutes } from '@/store/module/app';
import { setUserLogout } from '@/store/module/user';
import type { ReactElement, FC } from 'react';
import type { MenuInfo } from 'rc-menu/lib/interface';
interface Props {
    classNames?: string;
}

function AvatarDropdown({ classNames }: Props): ReactElement {
    const dispatch = useDispatch();
    const history = useHistory();
    const onMenuClick = useCallback(({ key }: MenuInfo) => {
        if (key === 'logout') {
            dispatch(removeSideBarRoutes());
            dispatch(setUserLogout());
            history.replace('/system/login');
        }
    }, []);
    const RenderMenu: FC<{ onClick: any }> = ({ onClick }) => {
        return (
            <Menu onClick={onClick}>
                <Menu.Item key="center">
                    <UserOutlined />
                    个人中心
                </Menu.Item>
                <Menu.Item key="settings">
                    <SettingOutlined />
                    个人设置
                </Menu.Item>
                <Menu.Divider />
                <Menu.Item key="logout">
                    <LogoutOutlined />
                    退出登录
                </Menu.Item>
            </Menu>
        );
    };
    return (
        <>
            <Dropdown
                overlay={<RenderMenu onClick={onMenuClick}></RenderMenu>}
                arrow
                trigger={['click', 'hover']}
            >
                <div className={classNames}>
                    <Avatar icon={<UserOutlined />}></Avatar>
                </div>
            </Dropdown>
        </>
    );
}

export default memo(AvatarDropdown);
