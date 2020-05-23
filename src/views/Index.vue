<template>
    <div class="index">
        <div class="page">
            <transition name="fade">
                <router-view/>
            </transition>
        </div>
        <van-tabbar v-model="active" active-color="#3effdb" route>
            <van-tabbar-item replace name="home" to="/home">
                <van-image width="25" height="25"
                           :src="active==='home'?require('../assets/images/icon/home_light.png'):require('../assets/images/icon/home.png')"/>
                <span class="tab">{{GLOBAL.HOME}}</span>
            </van-tabbar-item>
            <van-tabbar-item replace name="personal" to="/personal">
                <van-image width="25" height="25"
                           :src="active==='introduction'?require('../assets/images/icon/mime_light.png'):require('../assets/images/icon/mime.png')"/>
                <span class="tab">{{GLOBAL.PERSONAL_CENTER}}</span>
            </van-tabbar-item>
        </van-tabbar>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Index extends Vue {
        private active = '';

        private mounted(): void {
            this.active = 'home';
        }
    }
</script>
<style lang="scss" scoped>
    .page {
        position: relative;
        overflow: auto;
        height: calc(100vh - 50px);
    }

    .tab {
        display: inline-block;
        margin-top: .4em;
    }

    .van-image {
        display: block !important;
        margin: auto;
    }
</style>
