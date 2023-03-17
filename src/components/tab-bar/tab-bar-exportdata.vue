<template>
    <dic class="tab-bar">
        <template v-for="(item, index) in tabberDate">
            <div class="tab-bar-item" 
                :class="{ active: index === currentIndex }"
                @click="itemClick(index, item)">
                <!-- 在webpack中使用require(路径)实现动态解析路径 -->
                <!-- :src="require(item.image)" -->
                <!-- 在vite中，需要手动实现 -->
                <img :src="getAssetURL( (index === currentIndex) ? item.imageActive : item.image,
                     '/imgs/')" alt="">
                <span class="text">{{ item.text }}</span>
            </div>
        </template>

    </dic>
</template>

<script setup>
import tabberDate from '@/assets/data/tabbar';
import { getAssetURL } from '@/utils/load-assets-url'
import { ref } from 'vue'
import router from '@/router';

const currentIndex = ref(0);
const itemClick= (index, item) => {
    currentIndex.value = index;
    router.push(item.path);
}
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