<template>
    <div class="loading" v-if="isLoading" @clisk="loadingClick">
      <div class="bg">
        <img src="@/assets/imgs/home/full-screen-loading.gif" alt="">
      </div>
    </div>
</template>

<script setup>
import useMainStore from '@/stores/modules/main'
import { storeToRefs } from 'pinia';

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);

const loadingClick = () => {
  isLoading.value = false
}
</script>

<style lang="less" scoped>
.loading {
  display: flex;
  justify-content: center;
  align-items: center;

  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;

  background-color: rgba(0,0,0,.2);

  .bg {
    width: 104px;
    height: 104px;

    display: flex;
    justify-content: center;
    align-items: center;

    background: url(@/assets/imgs/home/loading-bg.png)  0 0 / 100% 100%;


    img {
      width: 70px;
      height: 70px;
    }
  }
}
</style>