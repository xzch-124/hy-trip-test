<template>
    <div class="tab-bar">
        <van-tabbar v-model="currentIndex" active-color="#ff9854">
            <template v-for="(item, index) in tabbarData">
                <van-tabbar-item 
                    :to="item.path">
                    <template #default>
                        <span class="text">{{ item.text }}</span>
                    </template>
                    <template #icon>
                        <img :src="getAssetURL(
                            index === currentIndex ? item.imageActive : item.image
                        )" alt="">
                    </template>
                </van-tabbar-item>
            </template>
        </van-tabbar>
    </div>
</template>
  
<script setup>

import tabbarData from "@/assets/data/tabbar.js"
import { getAssetURL } from '@/utils/load-assets-url'
import { ref } from "vue";

const currentIndex = ref(0)

</script>
  
<style lang="less" scoped>

// 以下是使用icon属性时（即直接使用子组件元素），希望自定义子组件样式的尝试
.tab-bar {
    // 如何覆盖vant提供组件的css
    // 1. vant提供的<van-tabbar-item>其内部的数据由插槽写入
    //  其中默认插槽写入信息，icon具名插槽写入图标
    // 2. 在写入元素的情况下，我们可以直接对元素修改样式
    img {
        height: 26px;
    }

    // 3. 在引入icon属性的情况下，在浏览器中可以得知，
    // 引入的是一个字体，控制大小的属性为--van-tabbar-item-icon-size
    // 因此可以修改变量的值
    // 局部定义一个变量: 只针对.tab-bar子元素才生效
    // --van-tabbar-item-icon-size: 30px !important;

    // 4. 尝试直接修改图标的css属性
    // 但，由于使用scope导致父子组件的类名不同，因此需要使用:deep
    // 找到类, 对类中的CSS属性重写
    // :deep(.class)找到子组件的类, 让子组件的类也可以生效
    :deep(.van-tabbar-item__icon) {
        font-size: 50px;
    }

    // 小结：修改第三方UI组件库
    // 1. 在插槽中使用自己的元素时：
    // 此时直接修改自己的元素即可，在css作用域内
    // 2. 使用第三方库中子组件的元素时：
    // 2种方法：修改变量；修改css
    // 2.1 全局覆盖，修改其变量值( .root { --var: xxx; })
    // 此时可能会造成其它影响
    // 2.2 局部定义变量覆盖原有的值
    // 如，在使用<van-tabbar-item>的父组件css中局部定义
    // 局部定义一个变量: 只针对.tab-bar子元素才生效
    // --van-tabbar-item-icon-size: 30px !important;
    // 3. 找到子组件中的对应选择器，修改其中的值，即直接修改css
    // 此时由于 scope ，导致父子组件之间的类名添加了不同的hash值，不能覆盖
    // 使用 :deep()
    // 使得可以影响子组件中的类名
}
</style>
  