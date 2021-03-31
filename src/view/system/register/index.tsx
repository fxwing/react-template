import React, { useCallback, memo } from 'react';
import type { FC } from 'react';
import { Button, Form } from 'antd';
import type { FormInstance } from 'antd/lib/form';
import { Link, RouteComponentProps } from 'react-router-dom';
import { nanoid } from 'nanoid';
import FormWrap from '../component/FormWrap';
import LoginItem from '../component/LoginItem';

import style from './index.less';

interface ResProps {
    account: string;
    password: string;
    mobile: string;
    code: string;
}

interface Props extends RouteComponentProps {}

const Register: FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const onSubmit = useCallback(() => {
        form.validateFields().then((res) => {
            const data = res as ResProps;
            const id = nanoid();
            setTimeout(() => {
                props.history.push(`/system/register-result/${id}`);
            }, 1000);
        });
    }, []);
    return (
        <>
            <FormWrap>
                <Form form={form} onFinish={onSubmit}>
                    <LoginItem.Account form={form}></LoginItem.Account>
                    <LoginItem.Password form={form}></LoginItem.Password>
                    <LoginItem.Confirm form={form}></LoginItem.Confirm>
                    <LoginItem.Mobile form={form}></LoginItem.Mobile>
                    <LoginItem.Code form={form}></LoginItem.Code>
                    <Form.Item>
                        <div className="justify--between align--center">
                            <Button type="primary" htmlType="submit">
                                注册
                            </Button>
                            <Link to="/system/login">使用已有账号登录</Link>
                        </div>
                    </Form.Item>
                </Form>
            </FormWrap>
        </>
    );
};

export default memo(Register);
