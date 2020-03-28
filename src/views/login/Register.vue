<template>
    <div class="page page-login">
        <van-nav-bar style="background: #000" title-class="title-style" :title="GLOBAL.REGISTER"
                     :left-text="GLOBAL.BACK"
                     left-arrow @click-left="onClickLeft"/>
        <div class="container">
            <div class="loggin-box">
                <van-divider :style="{ fontSize:'.16rem',color: '#32caff', borderColor: '#32caff', padding: '0 16px' }">
                    <van-icon size="large" name="certificate"/>
                </van-divider>
                <van-cell-group style="background: rgba(255,255,255,.4)">
                    <van-field style="background: rgba(255,255,255,.4);color:#32caff"
                               required
                               v-model="username"
                               :placeholder="GLOBAL.USERNAME"
                               :error-message="nameWarning"
                               @blur="verifyForm"
                               left-icon="manager-o"/>
                    <van-field style="background: rgba(255,255,255,.4);color:#32caff"
                               required
                               type="password"
                               v-model="password"
                               :error-message="passwordWarning"
                               @blur="verifyForm"
                               :placeholder="GLOBAL.PASSWORD"
                               left-icon="goods-collect-o"/>
                    <van-field style="background: rgba(255,255,255,.4);color:#32caff"
                               required
                               type="password"
                               v-model="repassword"
                               :error-message="repasswordWarning"
                               @blur="verifyForm"
                               :placeholder="GLOBAL.REPASSWORD" left-icon="goods-collect-o"/>
                    <van-field style="background: rgba(255,255,255,.4);color:#32caff"
                               required
                               v-model="mobile"
                               left-icon="phone-o"
                               :error-message="phoneWarning"
                               @blur="verifyForm"
                               :placeholder="GLOBAL.PHONE_HOLDER"/>
                    <van-field style="background: rgba(255,255,255,.4);color:#32caff"
                               required
                               v-model="captchaRequest.code"
                               center
                               clearable
                               left-icon="certificate"
                               :placeholder="GLOBAL.VERIFY_CODE"
                    >
                        <van-image
                                slot="right-icon"
                                class="verifycode"
                                @click="getVerifyImage"
                                :src="verifyimg"
                        />
                        <!--                        <van-button-->
                        <!--                                slot="button"-->
                        <!--                                size="small"-->
                        <!--                                :disabled="iscounting > 0"-->
                        <!--                                class="code-box"-->
                        <!--                                @click="openSMS"-->
                        <!--                        >-->
                        <!--                            发送短信验证-->
                        <!--                            <span v-if="iscounting>0">({{iscounting}})</span>-->
                        <!--                        </van-button>-->
                    </van-field>
                </van-cell-group>
                <van-row class="btn-box" type="flex" justify="center">
                    <van-col span="18">
                        <van-button class="login-btn" :loading="isLoading" size="large" @click="doRegister">
                            {{GLOBAL.REGISTER}}
                        </van-button>
                    </van-col>
                </van-row>
                <van-divider :style="{ fontSize:'.16rem',color: '#32caff', borderColor: '#32caff', padding: '0 16px' }">
                </van-divider>
                <van-row class="login-links">
                    <van-col span="8" class="text-left"></van-col>
                    <van-col span="8"></van-col>
                    <van-col span="8" class="text-right">
                        <router-link to="/login">{{GLOBAL.BACK_TO_LOGIN}}</router-link>
                    </van-col>
                </van-row>
            </div>
        </div>
        <!--        <van-popup v-model="openSMSPopup" position="bottom">-->
        <!--            <div class="padding-tb-40">-->
        <!--                <van-cell-group>-->
        <!--                    <van-field-->
        <!--                            class="verify-field"-->
        <!--                            v-model="captchaRequest.code"-->
        <!--                            placeholder="图形验证码"-->
        <!--                            type="text"-->
        <!--                            clearable-->
        <!--                            left-icon="certificate"-->
        <!--                    >-->
        <!--                        <van-image-->
        <!--                                slot="right-icon"-->
        <!--                                class="verifycode"-->
        <!--                                @click="getVerifyImage"-->
        <!--                                :src="verifyimg"-->
        <!--                        />-->
        <!--                    </van-field>-->
        <!--                </van-cell-group>-->
        <!--                <div class="submit-btn">-->
        <!--                    <van-button type="info" :disabled="iscounting>0" @click="sendSMS">-->
        <!--                        发送验证码-->
        <!--                    </van-button>-->
        <!--                </div>-->
        <!--            </div>-->
        <!--        </van-popup>-->
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import url from '@/api/urls';

    @Component
    export default class Register extends Vue {
        private interval = 0; // 短信倒计时
        private username = '';
        private password = '';
        private repassword = '';
        private verifycode = '';
        private verifyimg = '';
        private smsCode = '';
        private mobile = '';
        private captcha = '';
        private iscounting = 0;
        private isLoading = false;
        private needMobile = false;
        private openSMSPopup = false;
        private passwordPattern = /^(?=.*[a-zA-Z])(?=.*[0-9])[A-Za-z0-9]{8,18}$/;
        private phonePattern = /^1(3|4|5|7|8)\d{9}$/;
        private nameWarning = '';
        private passwordWarning = '';
        private repasswordWarning = '';
        private phoneWarning = '';
        private captchaRequest = {
            uuid: '',
            code: ''
        };


        private mounted(): void {
            this.getVerifyImage();
            // this.interval = setInterval(() => {
            //     if (this.iscounting > 0) {
            //         this.iscounting -= 1;
            //     }
            // }, 1000);
        }

        private destroyed(): void {
            clearInterval(this.interval);
        }

        private onClickLeft() {
            this.$router.back();
        }

        // 表单验证
        private verifyForm() {
            this.$nextTick(() => {
                const pwFlag = new RegExp(this.passwordPattern).test(this.password);
                const rpwFlag = this.repassword === this.password;
                const phwFlag = new RegExp(this.phonePattern).test(this.mobile);
                this.nameWarning = (!this.username) || this.username.length < 6 ? this.GLOBAL.NAME_VERIFICATION : '';
                this.passwordWarning = pwFlag ? '' : this.GLOBAL.PASSWORD_VERIFICATION;
                this.repasswordWarning = rpwFlag ? '' : this.GLOBAL.REPASSWORD_VERIFICATION;
                this.phoneWarning = phwFlag ? '' : this.GLOBAL.PHONE_VERIFICATION;
            });
        }

        private doRegister() {
            this.isLoading = true;
            this.$Apis.register({
                loginname: this.username,
                password: this.password,
                uuid: this.captchaRequest.uuid,
                code: this.captchaRequest.code,
                phone: this.mobile
            }).then((res: any) => {
                this.isLoading = false;
                this.goBack();
                this.$toast.success(this.GLOBAL.REGISTER_SUCCESS_TIP);
            }, (error: any) => {
                this.$toast.fail(error);
            })
        }

        private goBack() {
            this.$router.replace({path: '/login'})
        }

        private getVerifyImage() {
            this.captchaRequest.uuid = this.$Utils.getUUID();
            this.$nextTick(() => {
                this.verifyimg = url.baseUrl + url.getCaptchaPath + '?uuid=' + this.captchaRequest.uuid;
            })
        }

        // private openSMS() {
        //     this.getVerifyImage();
        //     this.openSMSPopup = true;
        // }
        //
        // private sendSMS() {
        //     if (!this.captcha) {
        //         this.$toast.fail("请填写图形验证码");
        //         return;
        //     }
        //     // TODO 发送验证
        //
        // }
    }
</script>

<style lang="scss" scoped>

    .code-box {
        color: #fff;
        background: #1fc8db;
    }

    .page-login {
        background: url("../../assets/images/register.jpeg") no-repeat center center;
    }

    .text-right {
        font-size: 16px;
        padding: 4px 10px;
        border-radius: 50% / 50%;
        box-shadow: 0 0 10px 2px inset rgba(31, 200, 219, .8), 0 0 10px 2px rgba(0, 0, 0, .2);

        & a {
            color: #fff;
        }
    }
</style>