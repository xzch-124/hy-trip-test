<template>
  <div class="home-serch-box">
    <!-- 位置信息 -->
    <div class="location" @click="cityClick">
      <div class="city">{{ currentCity?.cityName }}</div>
      <div class="currentL" @click="positionClick">
        <span class="text">当前位置</span>
        <img src="@/assets/imgs/home/icon_location.png" alt="">
      </div>
    </div>

    <!-- 日期范围 -->
    <div class="section date-range bottom-gray-line " @click="showCalendar = true">
      <div class="start">
        <div class="date">
          <span class="tip">入住</span>
          <span class="time">{{ startDateStr }}</span>
        </div>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <div class="date">
          <span class="tip">离店</span>
          <span class="time">{{ endDateStr }}</span>
        </div>
      </div>
    </div>
    <van-calendar 
      v-model:show="showCalendar" 
      type="range" 
      color="#ff9854" 
      :round="false" 
      :show-confirm="false"
      @confirm="onConfirm" 
      :formatter="formatter" />

     <!-- 价格/人数选择 -->
     <div class="section price-counter bottom-gray-line">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <!-- 关键字 -->
    <div class="section keyword bottom-gray-line">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="section hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div 
          class="item"
          :style="{ color: item.tagText.color, background: item.tagText.background.color }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="section search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>

  </div>
</template>

<script setup>
import useCityStore from '@/stores/modules/city';
import useHomeStore from '@/stores/modules/home';
import useMainStore from '@/stores/modules/main';

import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { formatMonthDay, getDiffDays } from '@/utils/format-date.js';
import { ref, computed } from 'vue';

const router = useRouter()

// 位置信息
const cityClick = () => {
  router.push('/city')
}
// 获取位置，返回经纬度，需要再接入其它服务器获取具体城市（未实现）
const positionClick = () => {
  navigator.geolocation.getCurrentPosition((res) => {
    console.log("获取位置成功", res)
  }, (err) => {
    console.log("获取位置失败", err)
  }, {
    enableHighAccuracy: true,
    timeout: 5000,
    maximumAge: 0
  })
}

// 这里引入store是为了使用数据，发送网络请求的操作在其它组件
// fetchGetCityAll()在打开city.vue具体使用时，才发送请求
const cityStore = useCityStore()
const { currentCity } = storeToRefs(cityStore)

// 日期信息，多个组件要用，放入主store
const mainStore = useMainStore()
const { startDate, endDate } = storeToRefs(mainStore)

const startDateStr = computed(() => formatMonthDay(startDate.value))
const endDateStr = computed(() => formatMonthDay(endDate.value))
const stayCount = ref(getDiffDays(startDate.value, endDate.value))

// 选择日期
const showCalendar = ref(false)
const onConfirm = (value) => {
  // 1.设置日期
  const selectStartDate = value[0]
  const selectEndDate = value[1]
  startDate.value = selectStartDate
  endDate.value = selectEndDate
  stayCount.value = getDiffDays(selectStartDate, selectEndDate)
  // 2.隐藏日历
  showCalendar.value = false
}
const formatter = (day) => {
  if (day.type === 'start') {
    day.bottomInfo = '入住';
  } else if (day.type === 'end') {
    day.bottomInfo = '离店';
  }

  return day;
}

// 热门推荐
// 这里引入homeStore是为了使用数据
// fetchGetHotSuggestData()在home.vue中发送，获取数据
const homeStore = useHomeStore()
// homeStore.fetchGetHotSuggestData();
const { hotSuggests } = storeToRefs(homeStore)

// 搜索页面的跳转按钮，并传入一些信息（地区，计划的出行时间）
const searchBtnClick = () => {
  router.push({
    path: '/search',
    query: {
      startDate: startDate.value,
      endDate: endDate.value,
      currentCity: currentCity.cityName
    }
  })
}

</script>

<style lang="less" scoped>
.search-box {
  --van-calendar-popup-height: 100%;
}

.location {
  display: flex;
  align-items: center;
  height: 44px;
  padding: 0 20px;

  .city {
    flex: 1;
    font-size: 14px;
    color: #333;
  }


  .currentL {
    display: flex;
    width: 74px;
    align-items: center;

    .text {
      position: relative;
      top: 1px;
      font-size: 12px;
      color: #666;
    }

    img {
      margin-left: 5px;
      width: 18px;
      height: 18px;
    }
  }
}

.section {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  padding: 0 20px;
  color: #999;
  height: 44px;

  .start {
    flex: 1;
    display: flex;
    height: 44px;
    align-items: center;
  }

  .end {
    min-width: 30%;
    padding-left: 20px;
  }

  .date {
    display: flex;
    flex-direction: column;

    .tip {
      font-size: 12px;
      color: #999;
    }

    .time {
      margin-top: 3px;
      color: #333;
      font-size: 15px;
      font-weight: 500;
    }
  }
}

.date-range {
  height: 44px;

  .stay {
    flex: 1;
    text-align: center;
    font-size: 12px;
    color: #666;
  }
}

.price-counter {
  .start {
    border-right: 1px solid  var(--line-color);
  }
}

.hot-suggests {
  margin: 10px 0;
  height: auto;

  .item {
    padding: 4px 8px;
    margin: 4px;
    border-radius: 14px;
    font-size: 12px;
    line-height: 1;
  }
}

.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient);
  }
}

</style>