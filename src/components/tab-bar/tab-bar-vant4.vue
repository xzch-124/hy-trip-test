<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex">
            <van-tabbar-item icon="home-o">标签</van-tabbar-item>
            <van-tabbar-item icon="search">标签</van-tabbar-item>
            <van-tabbar-item icon="friends-o">标签</van-tabbar-item>
            <van-tabbar-item icon="setting-o">标签</van-tabbar-item>
        </van-tabbar>
    </div>
</template>

<script setup>

import { ref } from 'vue'

const currentIndex = ref(0);

</script>

<style lang="less" scoped>
.tab-bar {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 50px;
    display: flex;
}

.tab-bar-item {
    flex: 1;
    display: flex;
    justify-content: center;
    align-items: center;

    flex-direction: column;

    &.active {
        color: var(--primary-color);
    }

    .text {
        margin-top: 2px;
        font-size: 12px;
    }

    img {
        width: 36px;
    }
}
</style>