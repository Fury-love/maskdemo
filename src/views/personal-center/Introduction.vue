<template>
    <div class="page page-profile">
        <van-nav-bar title="个人资料" left-text="返回" left-arrow @click-left="onClickLeft"></van-nav-bar>

        <div class="container">
            <van-cell-group>
                <van-cell style="align-items: center" @click="changeAvatar" title="头像" is-link>
                    <van-image class="avatar"
                               :src="member.avatar?member.avatar:require('../../assets/images/avatar.jpg')" width="40px"
                               height="40px" round></van-image>
                </van-cell>
                <van-cell style="padding-right: 37px" title="账号" :value="member.loginName"></van-cell>
                <van-cell title="昵称" is-link :value="member.nickname" @click="setField('nickname','请填写昵称')"></van-cell>
                <van-cell
                        title="手机"
                        is-link
                        :value="ifEmpty(member.phone,'未绑定')"
                        @click="setField('phone','请填写手机号')"></van-cell>
                <van-cell title="邮箱" is-link :value="ifEmpty(member.email,'未填写')"
                          @click="setField('email','请填写邮箱')"></van-cell>
            </van-cell-group>
            <van-cell-group class="margin-top">
                <van-cell
                        title="姓名"
                        is-link
                        :value="ifEmpty(member.realName)"
                        @click="setField('realName','请填写真实姓名')"></van-cell>
                <van-cell title="性别" is-link @click="pickGender" :value="fmtGender(member.gender)"></van-cell>
                <van-cell title="生日" is-link @click="pickDate" :value="fmtBirthday(member.birth)"></van-cell>
                <van-cell title="地区" is-link @click="pickAddress" :value="areas"></van-cell>
            </van-cell-group>

            <!--            <van-cell-group class="margin-top">-->
            <!--                <van-cell-->
            <!--                        title="登录密码"-->
            <!--                        :value="member.has_password?'修改密码':'设置密码'"-->
            <!--                        is-link-->
            <!--                        to="/member/password"></van-cell>-->
            <!--                <van-cell-->
            <!--                        title="安全密码"-->
            <!--                        :value="member.has_secpassword?'修改安全密码':'设置安全密码'"-->
            <!--                        is-link-->
            <!--                        to="/member/sec_password"></van-cell>-->
            <!--            </van-cell-group>-->
        </div>
        <van-popup v-model="showDatePicker" position="bottom">
            <van-datetime-picker
                    v-model="birthDay"
                    @confirm="setBirth"
                    @cancel="cancelBirthDay"
                    type="date"
                    :min-date="minDate"
                    :max-date="maxDate"></van-datetime-picker>
        </van-popup>
        <van-popup v-model="showGenderPicker" position="bottom">
            <van-picker
                    :show-toolbar="true"
                    :columns="genders"
                    :default-index="member.gender"
                    @confirm="setGender"></van-picker>
        </van-popup>
        <van-popup v-model="showAddressPicker" position="bottom">
            <van-area
                    :area-list="areaList"
                    :columns-placeholder="addressColumns"
                    @cancel="areaCancel"
                    @confirm="setAddress"
                    title="地区"
            />
        </van-popup>
        <van-dialog v-model="promptShow" :title="fieldTitle" show-cancel-button @confirm="updateField">
            <van-cell-group>
                <van-field class="prompt-input" ref="fieldInput" v-model="fieldValue"></van-field>
            </van-cell-group>
        </van-dialog>
    </div>
</template>
<script lang="ts">
    import axios from "axios";
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Introduction extends Vue {
        /**** data ****/
        private areaList = null;
        private areaTree = {};
        private loaded = false;
        private areaDelay = 0;
        private showDatePicker = false;
        private minDate = new Date('1900-01-01');
        private maxDate = new Date();
        private birthDay = new Date();
        private showGenderPicker = false;
        private genders = ['保密', '男', '女'];
        private showBindType = '';
        private step = 0;
        private smsCode = '';
        private iscounting = 0;
        private phone = '';
        private emailCode = '';
        private email = '';
        private showAddressPicker = false;
        private addressColumns = ['省', '市', '区'];
        private promptShow = false;
        private fieldName = "";
        private fieldTitle = "";
        private fieldValue = "";

        /**** data ****/
        get member() {
            return JSON.parse(this.$store.state.userInfo);
        }

        get areas() {
            let vals: any = [];
            if (this.member.province) {
                vals.push(this.member.province);
                if (this.member.city) {
                    vals.push(this.member.city);
                    if (this.member.county) {
                        vals.push(this.member.county);
                    }
                }
            }
            return vals.length > 0 ? vals.join("/") : "未填写";
        }

        /**** mounted ****/
        private mounted(): void {
            // @ts-ignore
            // if (!store.state.userInfo.id) {
            //     // store.dispatch("updateUserinfo").then(() => {
            //     //     this.initBirthDay();
            //     // });
            // } else {
            //     this.initBirthDay();
            // }
        }

        private destroyed() {
            this.loaded = false;
            this.areaList = null;
            this.areaTree = {};
        }

        /**** method ****/
        private onClickLeft() {
            this.$router.back();
        }

        private changeAvatar() {

        }

        private ifEmpty(val: any, dft = "未填写") {
            return val ? val : dft;
        }

        private cancelBirthDay() {
            this.showDatePicker = false;
        }

        private fmtGender(gender: any) {
            if (gender == 1) {
                return "男";
            } else if (gender == 2) {
                return "女";
            }
            return "未知";
        }

        private fmtBirthday(timestamp: any) {
            return timestamp ? timestamp : "未填写";
            // let date = new Date(timestamp * 1000);
            // return (
            //     date.getFullYear() + "-" + (date.getMonth() + 1) + "-" + date.getDate()
            // );
        }

        // private sendSMS() {
        // }
        //
        // private bindMobile() {
        // }
        //
        // private unbindMobile() {
        // }

        private pickDate() {
            this.showDatePicker = true;
            // @ts-ignore
            if (this.$store.state.userInfo.birth) {
                // @ts-ignore
                this.birthDay = new Date(store.state.userinfo.birth);
            }
        }

        private setBirth(val: any) {
            const birth = new Date(val);
            this.updateInfo({birth: this.$Utils.dateFormat('Y-m-d',birth)});
            this.cancelBirthDay();
        }

        private pickGender() {
            this.showGenderPicker = true;
        }

        private setGender(value: any, index: any) {
            this.showGenderPicker = false;
            this.updateInfo({gender: index});
        }

        private loadAddress() {
            axios
                .get("/area.json", {baseURL: "/"})
                .then((res: any) => {
                    this.areaList = res.data;
                })
                .catch(() => {
                    this.$toast.fail("地区信息加载失败");
                    this.loaded = false;
                });
        }

        private onUpdate() {
        }

        private initAddress() {

        }

        private areaCancel() {

        }

        private pickAddress() {
            this.showAddressPicker = true;
            this.loadAddress();
        }

        private setAddress(values: any) {
            this.updateInfo({
                province: values[0].name,
                city: values[1].name,
                county: values[2].name
            });
            this.showAddressPicker = false;
        }

        private setField(field: any, title: any) {
            this.promptShow = true;
            this.fieldName = field;
            this.fieldTitle = title;
            this.fieldValue = this.member[field];
            // @ts-ignore
            this.$refs.fieldInput && this.$refs.fieldInput.focus();
        }

        private updateField() {
            this.updateInfo({
                [this.fieldName]: this.fieldValue
            });
            this.promptShow = false;
        }

        private updateInfo(params: any) {
            const temp = {
                ...params,
                id: this.member.id,
                loginName: this.member.loginName
            };
            this.$store.dispatch("updateUserInfo", temp);
        }
    }
</script>
<style lang="scss">

    .page-profile {
        .prompt-input {
            border: 1px #ddd solid;
            margin: auto;
            width: calc(100% - 40px);
        }

        .submit-btn .van-button {
            width: 100%;
        }
    }
</style>