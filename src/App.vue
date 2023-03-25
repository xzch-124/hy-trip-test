<template>
  <div class="app">
    <RouterView/>
    
    <TabBer v-if="!route.meta.hiddenNavbar"></TabBer>
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
