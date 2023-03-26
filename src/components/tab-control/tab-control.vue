<template>
  <div class="tab-control">
    <template v-for="(item, index) in titles">
      <div 
        class="tab-control-item" 
        @click="showTitleClick(index)"
        :class="{active: index === currentIndex}">
        <span>{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import { ref } from 'vue'
const props = defineProps({
  titles: {
    type: Array,
    default: () => {[]}
  }
})

const currentIndex = ref(0)
const emits = defineEmits(["titleClick"])
const showTitleClick = (index) => {
  currentIndex.value = index
  emits("titleClick", index)
}

const changeIndex = (index) => {
  currentIndex.value = index
}

defineExpose({
  changeIndex
})
</script>

<style lang="less" scoped>
  .tab-control {
    display: flex;
    height: 44px;
    line-height: 44px;
    text-align: center;
    background-color: #fff;
  }

  .tab-control-item {
    flex: 1;
    margin: 0 10px;
  }

  .tab-control-item.active {
    color: var(--primary-color);
    font-weight: 700;
  }

  .tab-control-item.active span {
    border-bottom: 3px solid var(--primary-color);
    padding: 3px;
  }
</style>