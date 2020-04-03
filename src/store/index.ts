import Vue from 'vue';
import Vuex from 'vuex';
import Api from '@/api';

Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        config: {open_share: 1},
        get userToken() {
            return localStorage.getItem("token");
        },
        set userToken(value: any) {
            localStorage.setItem("token", value);
        },
        get isLogin() {
            return localStorage.getItem("isLogin");
        },
        set isLogin(value: any) {
            localStorage.setItem("isLogin", value);
        },
        get userInfo() {
            return localStorage.getItem("userInfo");
        },
        set userInfo(value: any) {
            localStorage.setItem("userInfo", value);
        }
    },
    mutations: {
        LOGIN_IN(state, data) {
            console.log('login', data);
            state.userToken = data.token;
            state.userInfo = JSON.stringify(data.userInfo);
            state.isLogin = 'isLogin';
            console.log('userInfo', state.userInfo);
        },
        LOGIN_OUT(state) {
            state.userToken = '';
            state.userInfo = '';
            state.isLogin = '';
        },
        UPDATE_USER(state, data) {
            state.userInfo = data;
        }
    },
    actions: {
        updateUserInfo(context, val) {
            // 更新用户信息
            Api.updateUserInfo(val).then((res: any) => {
                context.commit("UPDATE_USER", JSON.stringify(res));
            })
        }
    },
    modules: {},
});
