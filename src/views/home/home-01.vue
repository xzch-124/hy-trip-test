<template>
    <div class="home">
        <homeNavBar></homeNavBar>
        <div class="banner">
            <img src="@/assets/imgs/home/banner.webp" alt="">
        </div>
        <div class="location">
            <div class="city">广州</div>
            <div class="currentL">
                <span class="text">当前位置</span>
                <img src="@/assets/imgs/home/icon_location.png" alt="">
            </div>
        </div>
    </div>
</template>

<script setup>
import homeNavBar from './cpns/home-nav-bar.vue';
</script>

<style lang="less" scoped>
.banner {
    img {
        width: 100%;
    }
}

.location {
    display: flex;
    align-items: center;
    height: 44px;
    padding: 0 20px;

    .city {
        flex: 1;
    }


    .currentL {
        display: flex;
        width: 74px;
        align-items: center;

        .text {
            position: relative;
            top: 1px;
            font-size: 12px;
        }

        img {
            margin-left: 5px;
            width: 18px;
            height: 18px;
        }
    }
}
</style>