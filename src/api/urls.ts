export default {
    /**
     * 通用地址
     */
    // @ts-ignore
    // baseUrl: process.env.NODE_ENV !== 'production' && process.env.OPEN_PROXY ? '/maskdemoserver/' : window.configUrl.baseUrl,
    baseUrl: 'http://localhost:9099/maskdemoserver/',

    /**
     * 用户模块
     */
    // 获取动态验证码
    getCaptchaPath: 'captcha/authcode.jpg',
    // 短信验证
    sendSMS: 'user/sendSMS',
    // 注册
    register: 'user/register',
    // 登录
    login: 'user/login',
    // token验证
    checkToken: 'user/checklogin',
    // 更新信息
    updateUserInfo: 'user/update',

    /**
     * 商品模块
     */
    queryProducts: '/product/querylist',


};
