import React, { useState, useCallback, useReducer } from 'react';
import type { FC, Dispatch } from 'react';
import { Steps, Row, Col, Form, Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import FormWrap from '../component/FormWrap';
import LoginItem from '../component/LoginItem';
import style from './index.less';
interface Props {}

const { Step } = Steps;

interface State {
    mobile: string;
    code: string;
    password: string;
}
interface Actions {
    type: string;
    payload?: any;
}
const initialState: State = {
    mobile: '',
    code: '',
    password: ''
};

function reducer(state: State = initialState, actions: Actions): State {
    switch (actions.type) {
        case 'changeMobile':
            return { ...state, mobile: actions.payload };
        case 'changeCode':
            return { ...state, code: actions.payload };
        case 'changePassword':
            return { ...state, password: actions.payload };
        default:
            return { ...state };
    }
}

const RecoveryPwd: FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState<number>(0);
    const [state, dispatch]: [State, Dispatch<Actions>] = useReducer(reducer, initialState);

    const onSubmit = useCallback(() => {
        // 分开检测
        if (current === 0) {
            form.validateFields(['mobile', 'code']).then((res) => {
                if (res.mobile) {
                    dispatch({ type: 'changeMobile', payload: res.mobile });
                }
                if (res.code) {
                    dispatch({ type: 'changeCode', payload: res.code });
                }
            });
        }
        if (current === 1) {
            form.validateFields(['password']).then((res) => {
                if (res.password) {
                    //直接在这里掉的接口  没有修改redux
                    console.log({ ...state, password: res.password });
                    dispatch({ type: 'changePassword', payload: res.mobile });
                }
            });
        }
        setCurrent((current) => current + 1);
    }, [state]);

    return (
        <>
            <section className={style.step}>
                <Steps progressDot current={current}>
                    <Step title="验证手机号"></Step>
                    <Step title="填写新密码"></Step>
                    <Step title="完成修改"></Step>
                </Steps>
            </section>

            <FormWrap>
                <Form form={form} onFinish={onSubmit}>
                    {(() => {
                        switch (current) {
                            case 0:
                                return (
                                    <>
                                        <LoginItem.Mobile form={form}></LoginItem.Mobile>
                                        <LoginItem.Code form={form}></LoginItem.Code>
                                    </>
                                );
                            case 1:
                                return (
                                    <>
                                        <LoginItem.Password form={form}></LoginItem.Password>
                                        <LoginItem.Confirm form={form}></LoginItem.Confirm>
                                    </>
                                );
                            case 2:
                                return (
                                    <Result
                                        status="success"
                                        title="修改成功!"
                                        extra={[
                                            <Link to="/system/login" key="link">
                                                <Button type="primary" key="button">
                                                    去 登 录
                                                </Button>
                                            </Link>
                                        ]}
                                    ></Result>
                                );

                            default:
                                break;
                        }
                    })()}

                    {current < 2 ? (
                        <Form.Item>
                            <Button type="primary" htmlType="submit" block>
                                {current === 1 ? '提交' : '下一步'}
                            </Button>
                        </Form.Item>
                    ) : null}
                </Form>
            </FormWrap>
        </>
    );
};

export default RecoveryPwd;
