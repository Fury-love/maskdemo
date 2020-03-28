<template>
    <div class="page page-login" id="page-login">
        <van-nav-bar style="background: #000" title-class="title-style" :title="GLOBAL.LOGIN" :left-text="GLOBAL.BACK"
                     left-arrow @click-left="onClickLeft"></van-nav-bar>
        <div class="loggin-box">
            <van-divider :style="{ fontSize:'.16rem',color: '#32caff', borderColor: '#32caff', padding: '0 16px' }">
                <van-icon size="large" name="certificate"/>
            </van-divider>
            <van-cell-group style="background: rgba(255,255,255,.4)">
                <van-field style="background: rgba(255,255,255,.4);color:#32caff"
                           v-model="username"
                           size="large"
                           :error-message="nameWarning"
                           :placeholder="GLOBAL.USERNAME"
                           left-icon="manager-o"/>
                <van-field style="background: rgba(255,255,255,.4);color:#32caff"
                           type="password"
                           size="large"
                           clearable
                           :error-message="passwordWarning"
                           v-model="password"
                           :placeholder="GLOBAL.PASSWORD"
                           left-icon="goods-collect-o"
                />
                <van-field style="background: rgba(255,255,255,.4);color:#32caff"
                           class="verify-field"
                           size="large"
                           :error-message="verifyWarning"
                           v-model="verifycode"
                           :placeholder="GLOBAL.VERIFY_CODE"
                           left-icon="certificate"
                >
                    <van-image slot="right-icon" class="verifycode" @click="getCaptchaPath" :src="verifyimg"/>
                </van-field>
            </van-cell-group>
            <van-row class="btn-box" type="flex" justify="center">
                <van-col span="18">
                    <van-button class="login-btn" :loading="isLoading" size="large" @click="doLogin">{{GLOBAL.LOGIN}}
                    </van-button>
                </van-col>
            </van-row>
            <van-row class="login-links">
                <van-col span="8" class="text-left">
                    <router-link to="/forget">{{GLOBAL.FORGET}}</router-link>
                </van-col>
                <van-col span="8"></van-col>
                <van-col span="8" class="text-right">
                    <router-link to="/register">{{GLOBAL.REGISTER_NEW}}</router-link>
                </van-col>
            </van-row>
            <van-divider :style="{ fontSize:'.16rem',color: '#32caff', borderColor: '#32caff', padding: '0 16px' }">
                {{GLOBAL.THIRD_LOGIN}}
            </van-divider>
            <a href="https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx42b3ddfdc238f513&redirect_uri=REDIRECT_URI&response_type=code&scope=snsapi_userinfo&state=#wechat_re">
                <van-image class="wxlogo" :src="require('../../assets/images/wxlogo.jpg')"></van-image>
            </a>
            <a href="">
                <van-image class="wxlogo" :src="require('../../assets/images/social-qq.svg')"></van-image>
            </a>
        </div>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import url from '@/api/urls';

    @Component
    export default class Login extends Vue {
        /**** data ****/
        private username = '';
        private password = '';
        private verifycode = '';
        private verifyimg = '';
        private nameWarning = '';
        private passwordWarning = '';
        private verifyWarning = '';
        private isLoading = false;
        private uuid = '';

        /**** method ****/
        private onClickLeft() {
            this.$router.push({path: '/'});
        }

        // 登录
        private doLogin() {
            this.isLoading = true;
            this.$nextTick(() => {
                this.nameWarning = this.username ? '' : this.GLOBAL.NAME_VERIFICATION;
                this.passwordWarning = this.password ? '' : this.GLOBAL.PASSWORD_VERIFICATION;
                this.verifyWarning = this.verifycode ? '' : this.GLOBAL.VERIFY_WARNING;
                if (this.username && this.password && this.verifycode) {
                    this.$Apis.login({
                        loginName: this.username,
                        password: this.password,
                        uuid: this.uuid,
                        verifycode: this.verifycode
                    }).then((data: any) => {
                        this.$store.commit('LOGIN_IN', data);
                        this.$toast.success(this.GLOBAL.LOGIN_SUCCESS_TIP);
                        this.$router.replace({path: '/personal'});
                    }, () => {
                        this.getCaptchaPath();
                    }).catch(() => {
                        this.$toast.fail(this.GLOBAL.LOGIN_FAIL_TIP);
                        this.getCaptchaPath();
                    })
                }
                this.isLoading = false;
            });
        }

        //获取动态验证码
        private getCaptchaPath() {
            this.uuid = this.$Utils.getUUID();
            this.$nextTick(() => {
                this.verifyimg = url.baseUrl + url.getCaptchaPath + '?uuid=' + this.uuid;
            })
        }

        /**** mounted ****/
        private mounted(): void {
            this.getCaptchaPath();
        }

    }
</script>

<style lang="scss" scoped>
    .page-login {
        background: url("../../assets/images/login_bac.jpg") no-repeat center center;
        /*opacity: .9;*/

        .logo {
            position: relative;
            margin-top: -50%;
        }

        h1, h2 {
            margin-top: 0;
            margin-bottom: 15px;
        }

        .van-hairline--top-bottom::after, .van-hairline-unset--top-bottom::after {
            border: none;
        }

        .verify-field {
            .van-cell__value {
                overflow: visible;
            }
        }
    }


    .verify-field {
        .van-image {
            display: block;
        }
    }

    .wxlogo {
        width: 25px;
        height: 25px;
        margin-right: 10px;
    }

    .login-btn:active::before {
        box-shadow: 0 0 20px 15px inset rgba(255, 255, 255, .3);
    }
</style>