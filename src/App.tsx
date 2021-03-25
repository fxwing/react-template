import React, { Suspense } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { Spin } from 'antd';
import { config } from '@config/index';

import '@style/index.less';

function App() {
    const fallback = <Spin size="large" className="layout__loading"></Spin>;
    const basename = config.BASENAME!;
    return (
        <Suspense fallback={fallback}>
            <Router basename={basename}>
                <Switch>
                    <Route></Route>
                </Switch>
            </Router>
        </Suspense>
    );
}

export default App;
