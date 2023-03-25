<template>
    <div class="city-group">
        <!-- <template v-for="(group, index) in props.cityGroupData.cities" key="index">
            <div class="groupitem">
                <h2 class="title">{{ group.group }}</h2>
                <div class="list">
                    <template v-for="(city, indey) in group.cities" key="indey">
                        <div class="city">{{ city.cityName }}</div>
                    </template>
                </div>
            </div>
        </template> -->

        <!-- 使用vant -->
        <van-index-bar :sticky="false" :index-list="indexList">
            <van-index-anchor index="热门" />
            <div class="list">
                <template v-for="(hotcity, indez) in props.cityGroupData.hotCities" key="indez">
                    <div class="hotCity" @click="cityClick(hotcity)">{{ hotcity.cityName }}</div>
                </template>
            </div>

            <template v-for="(group, index) in props.cityGroupData.cities" key="index">
                <div class="cityGroup">
                    <van-index-anchor :index="group.group" />
                    <template v-for="(city, indey) in group.cities" key="indey">
                        <van-cell :title="city.cityName" @click="cityClick(city)"/>
                    </template>
                </div>
            </template>
        </van-index-bar>

    </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import { computed } from 'vue';
import { useRouter } from 'vue-router';
// import { defineProps } from 'vue';
const props = defineProps({
    cityGroupData: {
        type: Object,
        default: {}
    }
})

const indexList = computed(() => {
    return ['#'].concat(props.cityGroupData.cities.map(item => item.group))
})

const router = useRouter()
const cityStore = useCityStore()
const cityClick = (city) => {
    cityStore.currentCity = city
    router.back()  
}

</script>

<style lang="less" scoped>
.list {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: space-between;

    margin: 0 10px;
    margin-right: 25px;

    .hotCity {
        height: 28px;
        width: 70px;
        font-size: 12px;
        line-height: 28px;
        text-align: center;

        margin: 6px 1px;
        border-radius: 14px;
        color: #000;
        background-color: #fff4ec;

    }
}
</style>