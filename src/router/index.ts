import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/Index.vue';
import Login from '../views/login/Login.vue';
import Register from '../views/login/Register.vue';
import Error404 from '../views/error404.vue';
import Api from '@/api';
// 捕捉vue-router3.1以上版本重复跳转相同路由导致的报错
const originalPush = VueRouter.prototype.push;
VueRouter.prototype.push = function push(location: any) {
    // @ts-ignore
    return originalPush.call(this, location).catch((err: any) => err);
};
Vue.use(VueRouter);

const routes = [
    {
        path: '/',
        name: 'Index',
        component: Index,
        redirect: '/home',
        children: [{
            path: 'home',
            name: 'Home',
            component: () => import(/* webpackChunkName: "about" */ '../views/home/Index.vue'),
        }, {
            path: 'personal',
            name: 'Personal',
            component: () => import(/* webpackChunkName: "about" */ '../views/personal-center/Index.vue'),
        },{
            path: 'introduction',
            name: 'Introduction',
            component: () => import(/* webpackChunkName: "about" */ '../views/personal-center/Introduction.vue'),
        }],
    }, {
        path: '/login',
        name: 'Login',
        component: Login,
    }, {
        path: '/register',
        name: 'Register',
        component: Register,
    }, {
        path: '/error404',
        name: 'Error404',
        component: Error404,
    },
];

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes,
});

router.beforeEach((to, from, next) => {
    console.log(to);
    next();
    // const token = localStorage.getItem("token");
    // if (!token) {
    //     next();
    //     // TODO 权限控制
    //     // if (to.name != 'Login' && to.name != 'Register' && to.name != 'Error404') {
    //     //     next({name: 'Login',});
    //     // }
    // } else {
    //     // token校验
    //     Api.checkToken({
    //         stringParams: token
    //     }).then((res: any) => {
    //             next();
    //             console.log('res', res);
    //         }, () => {
    // next();
    //             next({name: 'Login',});
    //         }
    //     )
    // }
});

export default router;
