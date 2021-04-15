//  封装的request
import axios from 'axios';
import _ from 'lodash';
import store from '@store/index';
import { Modal, message } from 'antd';
import { config } from '@config/index';
import { getToken } from '@/utils/cookie';
import { setUserLogout } from '@store/module/user';
import { removeSideBarRoutes } from '@store/module/app';
import type {
    AxiosInstance,
    AxiosRequestConfig,
    AxiosPromise,
    AxiosError,
    AxiosResponse
} from 'axios';

interface ResponseData<T> {
    data?: T;
    msg?: string;
    code: number;
}
// 添加默认配置
// 是否为生产模式
const isProduction = process.env.NODE_ENV === 'production';
// 创建axios实例
const server: AxiosInstance = axios.create({
    headers: { 'Content-type': 'application/json;charset=utf-8' },
    baseURL: isProduction ? config.API_URL : '',
    timeout: 5000, // 超时时间
    withCredentials: true // 是否允许携带cookie
});
// 添加请求拦截器
server.interceptors.request.use(
    (config: AxiosRequestConfig) => {
        const token = getToken();
        // 请求带上 token
        if (token) {
            config.headers.token = token;
        }

        // return config
        return new Promise((resolve) => {
            // resolve(config)
            _.debounce(() => resolve(config), 1000)();
        });
    },
    (error: AxiosError) => {
        if (!isProduction) console.log(error);
        message.error(error.response, 1000);
        return Promise.reject(error);
    }
);

// 响应拦截器
server.interceptors.response.use(
    // 状态码 2开头
    (response: AxiosResponse<ResponseData<any>>) => {
        if (response.status === 200) {
            if (response.data.code !== 0) {
                message.error(response.data.msg, 1000);
            }
            return Promise.resolve(response.data as any);
        } else {
            return Promise.reject(response);
        }
    },

    (error: AxiosError): AxiosPromise<AxiosError> => {
        if (!isProduction) console.error(error);
        switch (error.response?.status) {
            // 未登录
            case 401:
            // token过期
            case 403:
                Modal.confirm({
                    title: '系统提示',
                    content: error.response.data.msg,
                    okText: '重新登录',
                    onOk() {
                        // 清楚登录的信息
                        store.dispatch(setUserLogout());
                        // 清楚路由信息
                        store.dispatch(removeSideBarRoutes());
                        const origin = window.location.origin;
                        window.location.href = `${origin}/system/login?redirectUrl=${encodeURIComponent(
                            window.location.href
                        )}`;
                    },
                    onCancel() {}
                });
                return Promise.reject(new Error(error.response.data.msg));
            default:
                return Promise.reject(new Error(error?.response?.data?.msg));
        }
        return Promise.reject(error);
    }
);
// T为返回的值
export default function request<T>(options: AxiosRequestConfig) {
    return server.request<T>(options);
}
