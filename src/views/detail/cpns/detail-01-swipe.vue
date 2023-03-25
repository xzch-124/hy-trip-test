<template>
  <div class="swipe">
    <h2>swipe</h2>
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swipeData" key="item.orderIndex">
        <van-swipe-item class="item">
          <img :src="item.url" alt="">
        </van-swipe-item>
      </template>

      <!-- 自定义插槽，即轮播图右下的显示 -->
      <template #indicator="{ active, total }">
        <!-- <div class="custom-indicator">{{ active + 1 }}/{{ total }}</div> -->
        <div class="indicator">
          <template v-for="(value, key, indey) in swipeGroup" key="key">
            <span 
              class="item" 
              :class="{ active: swipeData[active]?.enumPictureCategory == key }"
            >
                <!-- 上式中 swipeData[active]?.enumPictureCategory == key 是 -->
                <!-- 当前展示图片的 item.enumPictureCategory == 对应类别的标题展示key -->
              <span class="text">{{ getName(value[0].title) }}</span>
              <span class="count" v-if="swipeData[active]?.enumPictureCategory == key">
                {{ getItemIndex(swipeData[active]) }}/{{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>

    </van-swipe>
  </div>
</template>

<script setup>

const props = defineProps({
  swipeData: {
    type: Array,
    default: () => []
  }
})

// 右下角的数据展示
// 对数据进行转换
// swipeGroup: { 
// key: 所有的item.enumPictureCategory
// value: 符合.enumPictureCategory的item数组 }
const swipeGroup = {}
for (const item of props.swipeData) {
  let valueArray = swipeGroup[item.enumPictureCategory]
  if (!valueArray) {
    valueArray = []
    swipeGroup[item.enumPictureCategory] = valueArray
  }
  valueArray.push(item)
}

const nameReg = /【(.*?)】/i
const getName = (name) => {
  // return name.replace("：", "").replace("】", "").replace("【", "")
  const results = nameReg.exec(name)
  return results[1]
}

// 获取当前展示的图片是，此类别item数组中的第几个
const getItemIndex = (item) => {
  const enumKey = item.enumPictureCategory
  return swipeGroup[enumKey].findIndex((data) => data === item) + 1
}

</script>

<style lang="less" scoped>
.swipe {
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }

    .indicator {
      position: absolute;
      right: 5px;
      bottom: 5px;
      padding: 2px 5px;
      font-size: 12px;
      color: #fff;
      background: rgba(0, 0, 0, 0.8);

      display: flex;

      .item {
        margin: 0 3px;
      }

      .active {
        color: #333;
        padding: 0 3px;
        border-radius: 5px;
        background-color: #fff;
      }
    }
  }
}
</style>