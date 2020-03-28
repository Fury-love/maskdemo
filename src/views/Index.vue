<template>
    <div class="">
        <div class="page">
            <transition name="fade">
                <router-view/>
            </transition>
        </div>
        <van-tabbar v-model="active" active-color="#3effdb" route>
            <van-tabbar-item replace name="home" to="/home" :icon="active==='home'?'wap-home':'wap-home-o'">
                {{GLOBAL.HOME}}
            </van-tabbar-item>
            <van-tabbar-item replace name="personal" to="/personal"
                             :icon="active==='introduction'?'manager':'manager-o'">
                {{GLOBAL.PERSONAL_CENTER}}
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
</style>
