<template>
  <div class="detail">
    <h2>detail: {{ $route.params.id }}</h2>
    <!-- 顶部：返回与标题 -->
    <van-nav-bar 
      title="房屋详情" 
      left-text="旅途" 
      left-arrow @click-left="onClickLeft" />

    <!-- 轮播图 -->
    <div class="main" v-if="mainPart">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
      <detail-infos :topInfos="mainPart.topModule"></detail-infos>
      <detail-facility :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
    </div>

  </div>
</template>

<script setup>
import DetailSwipe from './cpns/detail-01-swipe.vue';
import DetailInfos from './cpns/detail-02-infos.vue';
import DetailFacility from './cpns/detail-03-facility.vue'

import { useRoute, useRouter } from 'vue-router';
import { ref, computed } from 'vue';

import { getDetailInfos } from '@/service/index'
import useDetailInfosStore from '@/stores/modules/detail'

// 获取传入本页面对应路由的信息
const route = useRoute()
const houseId = route.params.id

// 设置返回home的路由
const router = useRouter()
const onClickLeft = () => {
  router.back()
}

// 根据传入的houseId向服务器请求数据
const detailInfos = ref({})
getDetailInfos(houseId).then(res => {
  detailInfos.value = res.data;
  // console.log(res.data)
})
// 另一种写法，保存在store
// const detailInfosStore = useDetailInfosStore()
// detailInfosStore.fetchGetDetailInfosData(houseId)

// 获取的信息传入轮播图
// http://codercba.com:1888/api/detail/infos?houseId=44173741
const mainPart = computed(() => detailInfos.value.mainPart)

</script>

<style lang="less" scoped></style>