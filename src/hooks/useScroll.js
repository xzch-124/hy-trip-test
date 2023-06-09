import { ref, onMounted, onUnmounted } from "vue";
import { throttle } from 'underscore'

export default function useScroll(elRef) {
  let el = window

  const isReachBottom = ref(false)

  const clientHeight = ref(0)
  const scrollTop = ref(0)
  const scrollHeight = ref(0)

  // 节流，若频繁出现请求，每秒只执行一次
  const scrollListenerHandler = throttle(() => {
    if (el === window) {
      clientHeight.value = document.documentElement.clientHeight
      scrollTop.value = document.documentElement.scrollTop
      scrollHeight.value = document.documentElement.scrollHeight
    } else {
      clientHeight.value = el.clientHeight
      scrollTop.value = el.scrollTop
      scrollHeight.value = el.scrollHeight
    }
    // console.log(scrollHeight, scrollTop, clientHeight)
    // +1防止clientTop为小数时比较不能成立
    if (scrollTop.value + clientHeight.value + 1 >= scrollHeight.value) {
      console.log("到达底部")
      isReachBottom.value = true
    }
  }, 1000)

  onMounted(() => {
    if (elRef) {
      el = elRef.value
      // console.log(elRef)
    }
    el.addEventListener("scroll", scrollListenerHandler)
  })

  onUnmounted(() => {
    el.removeEventListener("scroll", scrollListenerHandler)
  })

  return { isReachBottom, scrollHeight, scrollTop, clientHeight }
}