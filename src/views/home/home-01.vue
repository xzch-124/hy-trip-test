<template>
    <div class="home">
        <homeNavBar></homeNavBar>
        <div class="banner">
            <img src="@/assets/imgs/home/banner.webp" alt="">
        </div>
        <homeSerchBox></homeSerchBox>
        <home-categories></home-categories>

        <div v-if="isShowSearchBar" class="homeSearchBar">
          <search-bar></search-bar>
        </div>

        <home-content></home-content>       
        <button @click="moreData">加载更多</button>
    </div>
</template>

<script setup>
import homeNavBar from './cpns/home-nav-bar.vue';
import homeSerchBox from './cpns/home-serch-box.vue';
import homeCategories from './cpns/home-categories.vue';
import homeContent from './cpns/home-content.vue';
import searchBar from '@/components/SearchBar/search-bar.vue';

import useHomeStore from '@/stores/modules/home';
import useScroll from '@/hooks/useScroll'

import { watch, computed } from 'vue';

const homeStore = useHomeStore();
homeStore.fetchGetHotSuggestData(); // 获取在子组件<homeSerchBox>中使用的网络数据
homeStore.fetchGetCategoriesData(); // 获取在子组件<home-categories>中使用的网络数据
homeStore.fetchGetHomeHouseListData(); // 获取在子组件<home-content>中使用的网络数据


const moreData = () => {
    homeStore.fetchGetHomeHouseListData()
}

const { isReachBottom, scrollTop } = useScroll()
watch(isReachBottom, (newValue) => {
  if (newValue) {
    homeStore.fetchGetHomeHouseListData().then(() => {
      isReachBottom.value = false
    })
  }
})

const isShowSearchBar = computed(() => {
    return scrollTop.value >= 360
})



</script>

<style lang="less" scoped>

.home {
  padding-bottom: 60px;
}
.banner {
    img {
        width: 100%;
    }
}

.homeSearchBar {
  z-index: 9;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  box-sizing: border-box;
  padding: 16px 10px 10px;

  height: 71px;
  background-color: #fff;
}
</style>