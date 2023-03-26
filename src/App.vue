<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component"></component>
      </keep-alive>
    </router-view>
    
    <TabBer v-show="!route.meta.hiddenNavbar"></TabBer>
    <loading></loading>

  </div>
</template>

<script setup>
  import TabBer from '@/components/tab-bar/tab-bar-myvant.vue'
  import loading from './components/loading/loading.vue';
  import { useRoute } from 'vue-router';
  
  const route = useRoute()
</script>

<style scoped>

</style>
