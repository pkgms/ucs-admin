import Axios from 'axios';
import { Message } from 'element-ui';
import { getToken } from './auth';

const httpServer = (opts: any) => {
    const httpDefaultOpts = { // http默认配置
        method: opts.method,
        baseURL: 'http://192.168.1.7:8080',
        url: opts.url,
        timeout: 100000,
        params: opts.params,
        data: opts.params,
        headers: opts.method === 'get' ? {
            'X-Requested-With': 'XMLHttpRequest',
            'Accept': 'application/x-www-form-urlencoded',
            'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8',
            'systoken': '',
        } : {
                'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8',
                'systoken': '',
            },
    };
    if (getToken()) {
        const token: any = getToken();
        httpDefaultOpts.headers.systoken = token;
    }
    if (opts.method === 'get') {
        delete httpDefaultOpts.data;
    } else {
        delete httpDefaultOpts.params;
    }
    const promise = new Promise((resolve, reject) => {
        Axios(httpDefaultOpts).then(
            (res) => {
                if (res.data.code === -3) {
                    resolve(res.data);
                } else {
                    resolve(res.data);
                }
            },
        ).catch(
            (response) => {
                reject(response);
            },
        );
    });
    return promise;
};

export default httpServer;
