<template>
    <div id="app">
        <router-view/>
    </div>
</template>

<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';
    import router from "@/router";

    @Component({
        components: {},
    })
    export default class App extends Vue {
        private mounted(): void {
            // if (!/(iPhone|iPad|iPod|iOS|Android)/i.test(navigator.userAgent)) { //PC端
            //     alert("请在移动端打开");
            //     router.push({name:'Error404'});
            // }
        }
    }
</script>

<style lang="scss">
    @import "assets/style/main.scss";
    #app {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        color: #2c3e50;
        width: 100vw;
        height: 100vh;
        background: #f7f7f7;
    }
</style>
