import React, { useState, useCallback, ChangeEventHandler } from 'react';
import type { MouseEvent, ChangeEvent } from 'react';
import { Form, Tabs, Button } from 'antd';
import FormWrap from '../component/FormWrap';
import LoginItem from '../component/LoginItem';
import useCount from '@hooks/useCount';

import style from './index.less';
const { TabPane } = Tabs;
interface Props {}
interface FormProps {
    account?: string;
    password?: string;
    mobile?: number;
    code?: number;
}

const Login = (props: Props) => {
    const [activeTab, setActiveTab] = useState<string>('account');
    const [form] = Form.useForm();
    const changeActiveTab = useCallback((activeTab: string) => {
        setActiveTab(activeTab);
    }, []);
    const onSubmit = useCallback(() => {
        form.validateFields().then((res: Partial<FormProps>) => {
            const values = res;
            console.log(values);
        });
    }, []);
    const [count, onBeginCount, onEndCount] = useCount(60);
    return (
        <>
            <FormWrap className={style.page_login}>
                <Tabs centered defaultActiveKey={activeTab} onChange={changeActiveTab}>
                    <TabPane tab="账号密码登录" key="account"></TabPane>
                    <TabPane tab="手机号登录" key="mobile"></TabPane>
                </Tabs>
                <Form form={form} onFinish={onSubmit}>
                    <LoginItem.Account form={form}></LoginItem.Account>
                    <LoginItem.Password form={form}></LoginItem.Password>
                </Form>
            </FormWrap>

            {count}
            <Button onClick={onBeginCount}>开始</Button>
            <Button onClick={onEndCount}>暂停</Button>
        </>
    );
};

export default Login;
