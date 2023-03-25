<template>
    <div class="content">
      <h2 class="title">热门精选</h2>
      <div class="list">
        <template v-for="(item, index) in houseList" :key="item.data.houseId">
          <house-item-v9 
            v-if="item.discoveryContentType === 9" 
            :item-data="item.data"
            @click="itemClick(item.data)"/>
          <house-item-v3 
            v-else-if="item.discoveryContentType === 3" 
            :item-data="item.data" 
            @click="itemClick(item.data)"/>
        </template>
      </div>
    </div>
</template>

<script setup>
import houseItemV3 from '@/components/house-item-v3/house-item-v3.vue';
import houseItemV9 from '@/components/house-item-v9/house-item-v9.vue';

import useHomeStore from '@/stores/modules/home';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';

// 获取要显示的数据列表
const homeStore = useHomeStore()
const { houseList } = storeToRefs(homeStore)

// 获取路由，点击跳转到详细信息
const router = useRouter()

const itemClick = (data) => {
  router.push('/detail/' + data.houseId)
}


</script>

<style lang="less" scoped>
.content {
  padding: 10px 8px;

  .title {
    font-size: 22px;
    padding: 10px;
  }

  .list {
    display: flex;
    flex-wrap: wrap;
  }
}
</style>