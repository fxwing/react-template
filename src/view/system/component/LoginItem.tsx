import React, { memo, useCallback } from 'react';
import type { FormInstance } from 'antd/lib/form';
import { message } from 'antd';
import type { IProps as FormInputItemProps } from './FormInputItem';
import { UserOutlined, LockOutlined } from '@ant-design/icons';
import FormInputItem from './FormInputItem';

interface LoginItemProps {
    form: FormInstance;
}

const messageKey: string = 'login-message';

const loginItem = ['Account', 'Password', 'Mobile', 'Code', 'Confirm'] as const;
////#region
// type LoginItem = 'Account' | 'Password' | 'Mobile' | 'Code';
//#endregion
// 优雅写法
type LoginItem = typeof loginItem[number];
//#region
// interface LoginItemType {
//     Account: React.FC<LoginItemProps>;
//     Password: React.FC<LoginItemProps>;
//     Mobile: React.FC<LoginItemProps>;
// }
// 代替上面的写法
//#endregion
type LoginItemType = Record<LoginItem, React.FC<LoginItemProps>>;

// 这里只可以用type interface会有问题
// 具体为啥不清楚
type LoginConfig = {
    [key in keyof LoginItemType]: FormInputItemProps;
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
    },
    Mobile: {
        inputProps: {
            prefix: <UserOutlined />,
            placeholder: '11位合法手机号',
            type: 'mobile'
        },
        formProps: {
            hasFeedback: true,
            name: 'mobile',
            children: null,
            rules: [{ required: true, message: '请输入合法手机号', len: 11 }]
        }
    },
    // 验证码
    Code: {
        inputProps: {
            placeholder: '大于6位的密码',
            prefix: <LockOutlined />,
            type: 'code'
        },
        formProps: {
            hasFeedback: true,
            name: 'code',
            children: null,
            rules: [{ required: true, message: '请输入验证码', len: 6 }]
        }
    },
    // 检验密码
    Confirm: {
        inputProps: {
            id: 'confirm',
            prefix: <LockOutlined />,
            placeholder: '大于6位的密码',
            type: 'password',
            visibilityToggle: true
        },
        formProps: {
            hasFeedback: true,
            name: 'confirm',
            rules: [{ required: true, message: '请输入合法密码', min: 5 }]
        }
    }
};

// 账户 组件
function Account(props: LoginItemProps) {
    return <FormInputItem {...props} {...config['Account']}></FormInputItem>;
}

// 密码 组件
function Password(props: LoginItemProps): React.ReactElement {
    return <FormInputItem {...props} {...config['Password']}></FormInputItem>;
}

// 手机 组件
function Mobile(props: LoginItemProps) {
    return <FormInputItem {...props} {...config['Mobile']}></FormInputItem>;
}

// 验证码
function Code(props: LoginItemProps) {
    const { form } = props;
    // 传给inputitem  参数是一个函数
    // onGetMobileCode(()=>{})
    const onGetMobileCode = useCallback((cb: () => void) => {
        let timer: any = null;
        form.validateFields(['mobile']).then(
            (res) => {
                message.success({
                    content: '延迟一秒发送验证码',
                    key: messageKey,
                    duration: 1
                });
                // if()
                // 这里是个异步调后台接口
                timer = setTimeout(() => {
                    cb();
                }, 1000);
            },
            (err) => {}
        );
        return () => {
            timer && clearTimeout(timer);
        };
    }, []);
    return (
        <FormInputItem
            {...props}
            {...config['Code']}
            onGetMobileCode={onGetMobileCode}
        ></FormInputItem>
    );
}

// confirm  组件
function Confirm(props: { form: FormInstance }) {
    const configs = config['Confirm'];
    configs.formProps.rules = [
        { required: true, message: '请输入合法密码' },
        ({ getFieldValue }) => ({
            validator(_, value) {
                console.log(getFieldValue('password'));
                if (!value || getFieldValue('password') === value) {
                    return Promise.resolve();
                }
                return Promise.reject(new Error('两次输入的密码不一致，请重新输入'));
            }
        })
    ];
    console.log(configs);
    return <FormInputItem {...props} {...configs}></FormInputItem>;
}
const LoginItem: LoginItemType = {
    Account: memo(Account),
    Password: memo(Password),
    Mobile: memo(Mobile),
    Code: memo(Code),
    Confirm: memo(Confirm)
};

export default LoginItem;
