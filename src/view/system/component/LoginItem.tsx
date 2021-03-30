import React, { memo } from 'react';
import type { FormInstance, FormItemProps } from 'antd/lib/form';
import type { InputProps } from 'antd/lib/input';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import FormInputItem from './FormInputItem';

interface LoginItemProps {
    form: FormInstance;
}
interface LoginItemType {
    Account: React.FC<LoginItemProps>;
    Password: React.FC<LoginItemProps>;
}

interface LoginItemConfig {
    formProps: FormItemProps;
    inputProps: InputProps & { visibilityToggle?: boolean };
}

// 这里只可以用type interface会有问题
// 具体为啥不清楚
type LoginConfig = {
    [key in keyof LoginItemType]: LoginItemConfig;
};

const config: LoginConfig = {
    Account: {
        formProps: {
            hasFeedback: true,
            name: 'account',
            children: null,
            rules: [{ required: true, message: '请输入合法账号', min: 6, max: 18 }]
        },
        inputProps: {
            prefix: <UserOutlined />,
            placeholder: '6-18位账号',
            type: 'text'
        }
    },
    Password: {
        inputProps: {
            prefix: <LockOutlined />,
            placeholder: '大于6位的密码',
            type: 'password',
            visibilityToggle: true
        },
        formProps: {
            hasFeedback: true,
            name: 'password',
            children: null,
            rules: [{ required: true, message: '请输入合法密码', min: 5 }]
        }
    }
};

// 账户 组件
function Account(props: LoginItemProps) {
    return <FormInputItem {...props} {...config['Account']}></FormInputItem>;
}

// 密码 组件
function Password(props: LoginItemProps) {
    return <FormInputItem {...props} {...config['Password']}></FormInputItem>;
}

const LoginItem: LoginItemType = {
    Account: memo(Account),
    Password: memo(Password)
};

export default LoginItem;
