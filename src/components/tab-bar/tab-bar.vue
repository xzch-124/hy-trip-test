<template>
    <dic class="tab-bar">
        <div class="tab-bar-item">
            <img src="@/assets/imgs/tabbar/tab_home.png" alt="">
            <span class="text">首页</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/imgs/tabbar/tab_favor.png" alt="">
            <span class="text">收藏</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/imgs/tabbar/tab_order.png" alt="">
            <span class="text">订单</span>
        </div>
        <div class="tab-bar-item">
            <img src="@/assets/imgs/tabbar/tab_message.png" alt="">
            <span class="text">消息</span>
        </div>

    </dic>
</template>

<script setup>

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

        .text {
            margin-top: 2px;
            font-size: 12px;
        }

        img {
            width: 36px;
        }
    }
</style>