// input类型的formitem组件 带发送验证码

import React, { memo } from 'react';
import type { FC } from 'react';
import { Form, Input, Button, Row, Col } from 'antd';
import type { FormItemProps } from 'antd/lib/form';
import type { InputProps } from 'antd/lib/input';
import useCount from '@hooks/useCount';

// 继承多一个 visibilityToggle属性
export interface CurrInputProps extends InputProps {
    visibilityToggle?: boolean; // 是否显示密码
}

export interface OnGetMobileCode {
    (cb: () => void): void;
}

export interface IProps {
    formProps: FormItemProps; //   form.item 的属性name label rules...
    inputProps: CurrInputProps; // input的属性
    countStatic?: number; //初始化验证码数字
    onGetMobileCode?: OnGetMobileCode; // 开始倒计时回调
}

const COUNT_STATIC = 60;
const FormInputItem: FC<IProps> = (props: IProps) => {
    const [count, beginTimer, endTimer] = useCount<number>(COUNT_STATIC);
    const { formProps, inputProps, countStatic } = props;
    React.useEffect(() => {
        return () => {
            inputProps.type === 'code' && endTimer();
        };
    }, []);
    function onTimerClick() {
        const { onGetMobileCode } = props || {};
        if (onGetMobileCode) {
            onGetMobileCode(beginTimer);
        }
    }
    return (
        <div>
            {(() => {
                switch (inputProps.type) {
                    case 'password':
                        return (
                            <Form.Item {...formProps}>
                                <Input.Password {...inputProps}></Input.Password>
                            </Form.Item>
                        );
                    // 验证码
                    case 'code':
                        return (
                            <Row gutter={10}>
                                <Col span={16}>
                                    <Form.Item {...formProps}>
                                        <Input {...inputProps}></Input>
                                    </Form.Item>
                                </Col>
                                <Col span={8}>
                                    <Button
                                        block
                                        disabled={(countStatic || COUNT_STATIC) !== count}
                                        onClick={onTimerClick}
                                    >
                                        {count === COUNT_STATIC ? '验证码' : `${count}`}
                                    </Button>
                                </Col>
                            </Row>
                        );
                    default:
                        return (
                            <Form.Item {...formProps}>
                                <Input {...inputProps}></Input>
                            </Form.Item>
                        );
                }
            })()}
        </div>
    );
};

export default memo(FormInputItem);
