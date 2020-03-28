<style scoped>
    .index {
        width: 100%;
        position: absolute;
        top: 0;
        bottom: 0;
        left: 0;
        text-align: center;
    }

    #index_pc_bj {
        width: 100%;
        height: 100%;
        background-size: cover;
        overflow: hidden;
        background: url(../assets/images/error404.gif) no-repeat;
        background-position: center center;
        background-size: contain;
        box-shadow: 0 0px 3px rgba(0, 0, 0, 0.5);
        text-align: center;
    }
</style>
<template>
    <div class="index">
        <div id="index_pc_bj">

        </div>
    </div>
</template>
<script lang="ts">
    import {Component, Vue} from 'vue-property-decorator';

    @Component
    export default class Error404 extends Vue {

    }
</script>
