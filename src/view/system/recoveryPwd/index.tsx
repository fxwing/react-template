import React, { useState, useCallback, useReducer } from 'react';
import type { FC, Dispatch } from 'react';
import { Steps, Row, Col, Form, Result, Button } from 'antd';
import { Link } from 'react-router-dom';
import FormWrap from '../component/FormWrap';
import LoginItem from '../component/LoginItem';
import style from './index.less';
interface Props {}

const { Step } = Steps;

interface InitIalState {
    mobile: string;
    code: string;
    password: string;
}
interface Actions {
    type: string;
    payload?: any;
}
const initialState: InitIalState = {
    mobile: '',
    code: '',
    password: ''
};

function reducer(initialState: InitIalState, actions: Actions): InitIalState {
    switch (actions.type) {
        case 'changeMobile':
            return { ...initialState, mobile: actions.payload };
        case 'changeCode':
            return { ...initialState, code: actions.payload };
        case 'changePassword':
            return { ...initialState, password: actions.payload };
        default:
            return { ...initialState };
    }
}

const RecoveryPwd: FC<Props> = (props: Props) => {
    const [form] = Form.useForm();
    const [current, setCurrent] = useState<number>(0);
    const [state, dispatch]: [InitIalState, Dispatch<Actions>] = useReducer(reducer, initialState);

    const onSubmit = useCallback(() => {
        form.validateFields().then((res) => {
            if (res.mobile) {
                dispatch({ type: 'changeMobile', payload: res.mobile });
            }
            if (res.code) {
                dispatch({ type: 'changeCode', payload: res.code });
            }
            if (res.password) {
                dispatch({ type: 'changePassword', payload: res.password });
                console.log(state);
            }

            if (current === 0) setCurrent((current) => current + 1);
        });
    }, []);

    return (
        <>
            <Row justify="center">
                <Col>
                    <Steps progressDot current={current}>
                        <Step title="验证手机号"></Step>
                        <Step title="填写新密码"></Step>
                        <Step title="完成修改"></Step>
                    </Steps>
                </Col>
            </Row>
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
                                            <Link to="/system/login">
                                                <Button type="primary">去 登 录</Button>
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
