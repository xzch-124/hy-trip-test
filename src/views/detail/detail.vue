<template>
  <div class="detail" ref="detailRef">
    <!-- <h2>detail: {{ $route.params.id }}</h2> -->

    <tab-control 
      ref="tabControlRef"
      :titles="names" 
      class="tabs"
      @titleClick="tabClick" 
      v-if="showTabControl"></tab-control>

    <!-- 顶部：返回与标题 -->
    <van-nav-bar 
      title="房屋详情" 
      left-text="旅途" 
      left-arrow @click-left="onClickLeft" />

    <!-- sections -->
    <div class="main" v-if="mainPart" v-memo="[mainPart]">
      <detail-swipe :swipe-data="mainPart.topModule.housePicture.housePics"></detail-swipe>
      <detail-infos name="描述" :ref="getSectionElRef" :topInfos="mainPart.topModule"></detail-infos>
      <detail-facility name="设施" :ref="getSectionElRef" :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"></detail-facility>
      <detail-landlord name="房东" :ref="getSectionElRef" :landlord="mainPart.dynamicModule.landlordModule"></detail-landlord>
      <detail-comment name="评论" :ref="getSectionElRef" :comment="mainPart.dynamicModule.commentModule"></detail-comment>
      <detail-notice name="须知" :ref="getSectionElRef" :order-rules="mainPart.dynamicModule.rulesModule.orderRules"></detail-notice>
      <detail-map name="周边" :ref="getSectionElRef"></detail-map>
      <detail-intro :price-intro="mainPart.introductionModule"></detail-intro>
    </div>

    <div class="footer">
      <img src="@/assets/imgs/detail/icon_ensure.png" alt="">
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import tabControl from '@/components/tab-control/tab-control.vue';
import DetailSwipe from './cpns/detail-01-swipe.vue';
import DetailInfos from './cpns/detail-02-infos.vue';
import DetailFacility from './cpns/detail-03-facility.vue';
import DetailLandlord from './cpns/detail-04-landlord.vue';
import DetailComment from './cpns/detail-05-comment.vue';
import DetailNotice from './cpns/detail-06-notice.vue';
import DetailMap from './cpns/detail-07-map.vue';
import DetailIntro from './cpns/detail-08-intro.vue';

import { useRoute, useRouter } from 'vue-router';
import { ref, computed, watch } from 'vue';
import useScroll from '@/hooks/useScroll';
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


// tab-control点击滑动至各section的锚点
// 监听元素detail的滚动
const detailRef = ref()
const { scrollTop } = useScroll(detailRef)
const showTabControl = computed(() => {
  return scrollTop.value >= 300
})
// 获取section
const sectionEls = ref({})
// 通过:ref="foo"将动态绑定的该元素/组件的ref对象作为参数传入函数
const getSectionElRef = (value) => {
  // console.log(value)
  // console.log(value.$el)
  if(!value) return
  const name = value.$el.getAttribute("name")
  sectionEls.value[name] = value.$el
}
// 获取titles，即各section的name
const names = computed(() => { return Object.keys(sectionEls.value) })

let isClick = false
let currentDistance = -1
const tabClick = (index) => {
  const key = Object.keys(sectionEls.value)[index]
  const el = sectionEls.value[key]
  let instance = el.offsetTop
  if(index !== 0) instance -= 44

  isClick = true
  currentDistance = instance

  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth"
  })
}

// 监听当前的scrollTop值，同步对应的tab-control
const tabControlRef = ref()
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false
  }
  if (isClick) return

  const els = Object.values(sectionEls.value)
  const offsetTops = els.map((el) => { return el.offsetTop })

  let index = offsetTops.length - 1
  // 找到第一个大于当前 scrollTop 的元素i，跳转至i-1
  for(let i = 0; i < offsetTops.length; i++) {
    if(offsetTops[i] > newValue + 44) {
      index = i - 1
      break
    }
  }
  console.log(index)
  // console.log(tabControlRef)
  tabControlRef?.value?.changeIndex(index)
})

</script>

<style lang="less" scoped>

.detail {
  height: 100vh;
  overflow-y: auto;
}
.tabs {
  position: fixed;
  z-index: 99;
  left: 0;
  right: 0;
  top: 0;
  background-color: #fff;
}

.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>