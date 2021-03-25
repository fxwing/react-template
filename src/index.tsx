import React from 'react';
import ReactDOM from 'react-dom';
import { ConfigProvider } from 'antd';
import App from './App';
import zhCN from 'antd/es/locale/zh_CN';

const renderContent = (
    <ConfigProvider locale={zhCN}>
        <App />
    </ConfigProvider>
);

ReactDOM.render(renderContent, document.getElementById('root'));
