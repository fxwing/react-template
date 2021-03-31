import React, { useState, useCallback, ChangeEventHandler } from 'react';
import { Link, RouteComponentProps } from 'react-router-dom';
import { nanoid } from 'nanoid';
import classNames from 'classnames/bind';
import { Form, Tabs, Button, Checkbox } from 'antd';
import { connect } from 'react-redux';
import { GithubOutlined, ZhihuOutlined } from '@ant-design/icons';
import { setToken } from '@/utils/cookie';
import { localStore } from '@/utils/store';
import { config } from '@config/index';
import FormWrap from '../component/FormWrap';
import LoginItem from '../component/LoginItem';
import { setUserInfo } from '@/store/module/user';
import style from './index.less';
// 引入type
import type { MouseEvent, ChangeEvent } from 'react';
import type { UserState } from '@store/module/user';

const { TabPane } = Tabs;
const cx = classNames.bind(style);
interface Props extends RouteComponentProps {
    setUserInfo(userInfo: UserState): void;
}
interface FormProps {
    account?: string;
    password?: string;
    mobile?: string;
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
            // 这里模拟一个  token  存到cookie
            const token = nanoid();
            setToken(token);
            // 将用户的信息存到本地
            const localData: UserState = {
                id: nanoid(),
                token,
                account: res.account!,
                mobile: res.mobile!
            };
            localStore.setValue(config.USER_LOCAL_KEY, localData);
            props.setUserInfo(localData);
            console.log(res);
            props.history.push('/');
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

export default connect(
    (state) => {
        return {};
    },
    { setUserInfo }
)(Login);
