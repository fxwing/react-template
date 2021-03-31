import React, { useState, useCallback, ChangeEventHandler } from 'react';
import type { MouseEvent, ChangeEvent } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { Form, Tabs, Button, Checkbox } from 'antd';
import { GithubOutlined, ZhihuOutlined } from '@ant-design/icons';
// import useCount from '@hooks/useCount';
import classNames from 'classnames/bind';
import FormWrap from '../component/FormWrap';
import LoginItem from '../component/LoginItem';
import style from './index.less';

const { TabPane } = Tabs;
const cx = classNames.bind(style);
interface Props extends RouteComponentProps {}
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
            props.history.push('/');
            console.log(values);
        });
    }, []);
    // const [count, onBeginCount, onEndCount] = useCount(60);
    return (
        <>
            <FormWrap className={style.page_login}>
                <Tabs centered defaultActiveKey={activeTab} onChange={changeActiveTab}>
                    <TabPane tab="账号密码登录" key="account"></TabPane>
                    <TabPane tab="手机号登录" key="mobile"></TabPane>
                </Tabs>
                <Form form={form} onFinish={onSubmit}>
                    {activeTab === 'account' ? (
                        <>
                            <LoginItem.Account form={form}></LoginItem.Account>
                            <LoginItem.Password form={form}></LoginItem.Password>
                        </>
                    ) : (
                        <>
                            <LoginItem.Mobile form={form}></LoginItem.Mobile>
                            <LoginItem.Code form={form}></LoginItem.Code>
                        </>
                    )}

                    <Form.Item>
                        <div className="justify--between">
                            <Checkbox defaultChecked>自动登录</Checkbox>
                            <Link to="/system/recovery-pwd">忘记密码</Link>
                        </div>
                    </Form.Item>
                    <Form.Item>
                        <Button type="primary" block htmlType="submit">
                            登录
                        </Button>
                    </Form.Item>
                    <Form.Item>
                        <div className="justify--between">
                            <div className={cx(style.login_others, 'align--center')}>
                                <span>其他登录方式</span>
                                <GithubOutlined className={style.login_others_icon} />
                                <ZhihuOutlined className={style.login_others_icon} />
                            </div>
                            <Link to="/system/register">注册账号</Link>
                        </div>
                    </Form.Item>
                </Form>
            </FormWrap>
        </>
    );
};

export default Login;
