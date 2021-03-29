import React, { useState, useCallback, Component, useEffect } from 'react';
import type { FC, MouseEvent } from 'react';
import { Button } from 'antd';

interface Props {}
const TestFunRender: FC<Props> = (props: Props) => {
    const [api, setApi] = useState<string>('');
    const fun = useCallback(() => {}, []);
    useFetch(api);
    const [state, setstate] = useState<number>(0);
    const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
        setApi((api) => api + '1');
    };
    return (
        <div>
            {state}
            <Button onClick={handleClick}>点击</Button>
            <Child fun={fun}></Child>
        </div>
    );
};

// const Child: FC<{ fun: () => void }> = () => {
//     console.log('render');
//     return <>Child</>;
// };

// interface Props {}
// interface State {}

// class TestFunRender extends Component<Props, State> {
//     state = {};

//     handleClick = (e: MouseEvent<HTMLButtonElement>) => {
//         this.setState({});
//     };

//     render() {
//         // 在这里声明每次就重新创建了一个函数  所以每次不一样
//         const fun = () => {};
//         return (
//             <div>
//                 <Button onClick={this.handleClick}>点击</Button>
//                 <Child fun={fun}></Child>
//             </div>
//         );
//     }
// }

interface IProps {
    fun(): void;
}
interface State {}

class Child extends Component<IProps, State> {
    state = {};
    componentDidUpdate(prevProps: IProps) {
        console.log(this.props.fun === prevProps.fun);
    }
    render() {
        return <div></div>;
    }
}

// 自定义一个hooks
function useFetch(api: string) {
    useEffect(() => {
        console.log('mounted', api);
        return () => {
            // 发生改变的时候这里也执行一下
            console.log('unmounted', api);
        };
    }, [api]);
}

export default TestFunRender;
