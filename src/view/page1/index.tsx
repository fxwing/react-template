import React from 'react';
import _ from 'lodash';
import type { RouteComponentProps } from 'react-router-dom';

interface Props extends RouteComponentProps {}

const page1 = (props: Props) => {
    function test(name: string, age: string, area: string) {
        return name + age + area;
    }
    const currTest = _.partial(test, _, _, 'wang');
    console.log(currTest('10', '111'));

    return <>page1</>;
};

export default page1;
