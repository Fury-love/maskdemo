import urls from './urls';
import api from "@/api/fetch";

export default {
    sendSMS: (params: any) => {
        return api.post(urls.sendSMS, params);
    },
    register: (params: any) => {
        return api.post(urls.register, params);
    },
    login: (params: any) => {
        return api.post(urls.login, params);
    },
    checkToken: (params: any) => {
        return api.post(urls.checkToken, params);
    },
    updateUserInfo: (params: any) => {
        return api.post(urls.updateUserInfo, params);
    },
}