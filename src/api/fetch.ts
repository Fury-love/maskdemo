import Message from '@/utils/Message';
import axios from 'axios';
import urls from './urls';

// 配置程序基础路径
axios.defaults.baseURL = urls.baseUrl;
// axios.defaults.baseURL = 'http://localhost:9099/maskdemoserver/';
axios.defaults.timeout = 10000;
axios.defaults.headers.post["Content-Type"] = "application/json";
// 请求拦截
axios.interceptors.request.use((request: any) => {
    // header添加token
    const token = localStorage.getItem("token");
    // request.headers['Access-Token'] = token;
    if (token) {
        request.headers.Authorization = token;
    }
    return request;
}, (error: any) => {
    return Promise.reject(error);
});
axios.interceptors.response.use((response: any) => {
    return response;
}, (error: any) => {
    return Promise.reject(error);
});

function fetch(url: any, params: any, method: any) {
    return new Promise((resolve, reject) => {
        // @ts-ignore
        axios[method](url, params).then((res: any) => {
            if (!navigator.onLine) {
                Message.error('网络状态异常！');
                return;
            } else {
                // 前后端对接报文统一格式
                const status = res.data.code;
                if (status == '200') {
                    resolve(res.data.data);
                } else {
                    Message.error(res.data.message);
                }
            }
        }, (error: any) => {
            Message.error('数据请求异常');
            reject(error);
        }).catch((error: any) => {
            Message.error('数据请求异常');
            reject(error);
        });
    });
}

const api: any = {
    post: (url: any, params: any): any => fetch(url, params, 'post'),
    put: (url: any, params: any) => fetch(url, params, 'put'),
    get: (url: any, params: any) => fetch(url, params, 'get'),
    batch: (queris: any) => { // 迭代、批量查询接口
        return queris.map((item: any) => {
            // @ts-ignore
            return Promise.all(this.post(item.url, item.params));
        });
    },
};
export default api;
