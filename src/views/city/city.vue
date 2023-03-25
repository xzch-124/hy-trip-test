<template>
    <div class="city">
        <div class="top">
            <van-search 
                v-model="searchValue" 
                placeholder="城市/区域/位置" 
                shape="round" 
                show-action="" 
                @cancel="cancelClick()" />

            <van-tabs v-model:active="tabActive">
                <template v-for="(value, key, index) in allCities" key="key">
                    <van-tab :title="value.title" :name="key"></van-tab>
                </template>
            </van-tabs>
        </div>
        <div class="content">
            <!-- <cityGroup :city-group-data="currentGroup"></cityGroup> -->
            <!-- 另一种实现思路 -->
            <template v-for="(value, key, index) in allCities" key="index">
                <cityGroup v-show="key === tabActive" :city-group-data="value"></cityGroup>
            </template>
        </div>
    </div>
</template>

<script setup>
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
// import { getCityAll } from '@/service/index';
import useCityStore from '@/stores/modules/city';
import { storeToRefs } from 'pinia';
import cityGroup from './cpns/city-group.vue';

const router = useRouter()
const searchValue = ref('')
const tabActive = ref()

const cancelClick = () => {
    router.back()
}


// 获取数据
// getCityAll() -> service/module/city.js -> HYaxios.get('http://123.207.32.32:1888/api/city/all')
// 1. 直接使用网络请求
// import { getCityAll } from '@/service/index';
// const allCity = ref({ }) // 空对象，防止v-for时遍历到undefined
// getCityAll().then( res => {
//     allCity.value = res.data
//     // console.log(res.data)
// })
// 2. 在stores/city.js中使用action进行管理
const cityStore = useCityStore()
// cityStore.fetchGetCityAll()
const { allCities } = storeToRefs(cityStore)

// 获取列表数据
// 目的：获取当前tab下应当在.content中展示的数据
// 使用<van-tab>的name属性，此时将name的值作为每个tab的索引，赋给tabActive
// 此时可以用allCities.value[tabActive.value]获取对应要展示的值
const currentGroup = computed( () => { return allCities.value[tabActive.value]} )

</script>

<style lang="less" scoped>
.city {
    --van-search-left-icon-color: var(--primary-color);
    --van-tabs-bottom-bar-color: var(--primary-color);
}

.content {
    height: calc(100vh - 98px);
    overflow-y: auto;
}

</style>