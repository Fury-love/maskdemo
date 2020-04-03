<template>
    <div class="page member">
        <div class="user-poster">
            <van-row class="user-info">
                <van-col offset="2">
                    <van-image class="user-avatar" round width="4rem" height="4rem" fit="cover"
                               :src="require('../../assets/images/avatar.jpg')"></van-image>
                </van-col>
                <van-col span="12" class="user-info-text">
                    <div v-if="isLogin" class="user-nickname">
                        <span>{{member.nickname}}</span>
                        <!--                        <van-tag-->
                        <!--                                v-if="member.is_agent > 0"-->
                        <!--                                class="margin-left"-->
                        <!--                                type="primary"-->
                        <!--                        >{{member.agent.name}}-->
                        <!--                        </van-tag>-->
                    </div>
                    <template v-if="isLogin">
                        <!--                        <div v-if="openShare" class="user-acode">邀请码: {{member.agentcode}}</div>-->
                        <div class="user-mobile">{{GLOBAL.PHONE}}: {{member.phone}}</div>
                    </template>
                    <div v-if="!isLogin" class="logintip" @click="goLogin">{{GLOBAL.LOGIN_TIP}}</div>
                </van-col>
            </van-row>
            <van-icon size="24" class="right-icon" name="setting-o" @click="goProfile"></van-icon>
        </div>
        <div class="points-box">
            <van-grid :columnNum="3" size="16px">
                <van-grid-item icon="chart-trending-o" to="/member/award_log">
                    <div class="balance-text" slot="text">
                        <div class="balance-name">我的收益</div>
                        <div class="balance-value">{{formatMoney(member.totalReward )}}</div>
                    </div>
                </van-grid-item>
                <van-grid-item icon="diamond-o" @click="toMoneyLog('credit')">
                    <div class="balance-text" slot="text">
                        <div class="balance-name">我的积分</div>
                        <div class="balance-value">{{formatMoney(member.credit,0)}}</div>
                    </div>
                </van-grid-item>
                <van-grid-item icon="balance-o" @click="toMoneyLog('reward')">
                    <div class="balance-text" slot="text">
                        <div class="balance-name">我的佣金</div>
                        <div class="balance-value">{{formatMoney(member.reward)}}</div>
                    </div>
                </van-grid-item>
            </van-grid>
        </div>
        <div class="cblock user-links">
            <van-cell icon="records" title="我的订单" value="全部订单" is-link to="/member/order"></van-cell>
            <van-row>
                <van-col span="6">
                    <van-tag v-if="counts[0] > 0" round type="danger">{{counts[0]}}</van-tag>
                    <router-link to="/member/order?status=0">
                        <van-icon name="pending-payment"></van-icon>
                        待付款
                    </router-link>
                </van-col>
                <van-col span="6">
                    <van-tag v-if="counts[1] > 0" round type="danger">{{counts[1]}}</van-tag>
                    <router-link to="/member/order?status=1">
                        <van-icon name="records"></van-icon>
                        待发货
                    </router-link>
                </van-col>
                <van-col span="6">
                    <van-tag v-if="counts[2] > 0" round type="danger">{{counts[2]}}</van-tag>
                    <router-link to="/member/order?status=2">
                        <van-icon name="tosend"></van-icon>
                        待收货
                    </router-link>
                </van-col>
                <van-col span="6">
                    <router-link to="/member/order?status=4">
                        <van-icon name="logistics"></van-icon>
                        已完成
                    </router-link>
                </van-col>
            </van-row>
        </div>
        <div class="cblock margin-top">
            <van-cell-group>
                <!--                <van-cell-->
                <!--                        v-if="!isLogin || member.is_agent <= 1"-->
                <!--                        icon="friends-o"-->
                <!--                        to="/group/become"-->
                <!--                        title="成为团长"-->
                <!--                        is-link-->
                <!--                />-->
                <!--                <van-cell-->
                <!--                        v-else-->
                <!--                        icon="friends-o"-->
                <!--                        to="/group/become"-->
                <!--                        title="团长续约"-->
                <!--                        :value="'剩余额度 '+member.release_reward"-->
                <!--                        is-link-->
                <!--                />-->
                <!--                <van-cell icon="gift-card-o" to="/member/groupbuy_order" title="我的拼团" is-link>-->
                <!--                    <slot>-->
                <!--                        <van-tag v-if="groupOrder > 0" round type="danger">{{groupOrder}}</van-tag>-->
                <!--                    </slot>-->
                <!--                </van-cell>-->
                <van-cell icon="gift-card-o" to="/member/credit_order" title="积分订单" is-link>
                    <slot>
                        <van-tag v-if="groupOrder > 0" round type="danger">{{creditOrder}}</van-tag>
                    </slot>
                </van-cell>
                <van-cell v-if="openShare" icon="more-o" to="/member/share" title="我要分享" is-link></van-cell>
                <!--                <van-cell v-if="openShare" icon="cluster-o" to="/member/team" title="我的团队" is-link/>-->
            </van-cell-group>
        </div>
        <div class="cblock margin-top">
            <van-cell-group>
                <van-cell icon="gold-coin-o" @click="sorry" title="我的优惠券" is-link></van-cell>
                <van-cell icon="location-o" to="/member/address" title="我的收货地址" is-link></van-cell>
                <van-cell icon="info-o" to="/about/index" title="关于我们" is-link></van-cell>
                <van-cell icon="share" @click="quit" title="退出登录" is-link></van-cell>
            </van-cell-group>
        </div>
        <div class="margin-top"></div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Personal extends Vue {
        /**** data ****/
        private groupOrder = 0;
        private creditOrder = 0;
        private counts = [];
        private openShare = false;
        private member = {};

        /**** computed ****/
        get userInfo() {
            return JSON.parse(this.$store.state.userInfo);
        }

        get isLogin() {
            return this.$store.state.isLogin;
        }

        // get openShare() {
        //     return this.$store.state.config && this.$store.state.config.open_share === 1;
        // }

        /**** method ****/
        // 初始化数据
        private loadData() {
            // TODO 初始化数据

        }

        // 订单统计数据
        private loadCount() {
            // TODO 接口调用获取统计数据
        }

        private formatMoney(money: any, power = 2) {
            if (!money) {
                money = 0;
            }
            return (money / 100).toFixed(power);
        }

        // 跳转个人资料页面
        private goProfile() {
            this.$router.push({path: '/introduction'});
        }

        private goLogin() {
            this.$router.push('/login');
        }

        private toMoneyLog(type: any) {
            this.$router.push('/member/credit?type=' + type);
        }

        private quit() {
            this.$dialog.confirm({
                title: '提示',
                message: '确定退出登录?',
                beforeClose: this.beforeClose,
            });
        }

        private beforeClose(action: any, done: any) {
            if (action === 'confirm') {
                // 退出登录
                this.$store.commit('LOGIN_OUT');
                done();
            } else {
                done();
            }
        }

        private sorry() {
            this.$toast('功能暂未上线~');
        }

        // mounted
        private mounted() {
            this.loadData();
            if (this.userInfo) {
                this.member = this.userInfo;
                console.log('member:', this.member);
            }
        }
    }
</script>

<style lang="scss">
    .points-box .van-grid .van-grid-item {
        &:first-of-type {
            .van-grid-item__content {
                border-radius: 15px 0 0 0 !important;
            }
        }

        &:last-of-type {
            .van-grid-item__content {
                border-radius: 0 15px 0 0 !important;
            }
        }
    }
</style>
<style lang="scss" scoped>
    .points-box .van-grid {
        overflow: visible !important;

    }


    .user {
        &-poster {
            width: 100%;
            height: 220px;
            background: #3effdb center top no-repeat;
            background-size: cover;
            text-align: center;
            position: relative;

            .right-icon {
                position: absolute;
                right: 20px;
                top: 20px;
                color: #fff;
                text-shadow: 1px 1px 5px rgba(0, 0, 0, .1)
            }
        }

        &-info {
            padding-top: 4rem;
        }

        &-avatar {
            align-items: center;
            margin-right: 10px;
        }

        &-info-text {
            text-align: left;
            color: #fff;
            font-size: 14px;
            line-height: 1.8;
        }

        &-nickname {
            font-size: 20px;
            font-weight: bold;
        }

        &-group {
            margin-top: 15px;
        }

        &-links {
            margin-top: 15px;
            text-align: left;
            background-color: #fff;

            a {
                color: #444;
            }

            .van-row {
                padding: 15px 0;
                font-size: 12px;
                text-align: center;

                .van-col {
                    position: relative;
                }

                .van-tag {
                    position: absolute;
                    left: 60%;
                    top: -5px;
                }

                .van-icon {
                    display: block;
                    font-size: 24px;
                    color: #af8755;
                }
            }
        }
    }

    .points-box {
        height: 70px;
        margin: 0 10px;
        text-align: center;

        .van-grid {
            border-radius: 5px;
            margin-top: -35px;
            height: 70px;
            overflow: hidden;

            .van-grid-item__content {
                padding: 4px;
            }

            .balance-text {
                margin-top: 0;
                font-size: 10px;

                .balance-name {
                    color: #666;
                }

                .balance-value {
                    font-size: 12px;
                    font-weight: bold;
                    margin-top: 4px;
                    color: #b00;
                }
            }
        }
    }
</style>