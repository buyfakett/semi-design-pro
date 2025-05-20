import { createAlova } from 'alova';
import adapterFetch from 'alova/fetch';
import ReactHook from 'alova/react';
import { getToken, removeToken } from "@/src/utils/auth";
import { Toast } from "@douyinfe/semi-ui";

let ENV_url: string;

try {
    const {ENV_url: importedUrl} = require('../../url.config');
    ENV_url = importedUrl;
} catch (error) {
    // 如果导入文件失败，将 ENV_url 设置为空字符串
    console.error('没有url.config.js文件:', error);
    ENV_url = '';
}

const nonvalidateRequiredApi = [
    '/api/user/login',
]

const alovaInstance = createAlova({
    requestAdapter: adapterFetch(),
    statesHook: ReactHook,
    baseURL: ENV_url,
    timeout: 30000,
    beforeRequest(method) {
        if (!nonvalidateRequiredApi.includes(method.url)) {
            method.config.headers.token = getToken();
        }
    },
    responded: {
        onSuccess: async (response, method) => {
            const json = await response.json();
            if (json.code !== 200) {
                // 抛出错误或返回reject状态的Promise实例时，此请求将抛出错误
                throw new Error(json.msg);
            } else if (response.status === 401) {
                // 401 未授权，跳转登录页
                Toast.error('登录已过期，请重新登录');
                removeToken();
                window.location.href = '/login';
            }
            return json;
        },
        onError: (err, method) => {
            Toast.error(err.msg)
            return err.json();
        },
    }
});

export const request = alovaInstance;