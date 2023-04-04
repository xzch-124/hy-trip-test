export default function throttle(fn, delay = 300) {
  let timeout = null
  return function (...args) {
    if (timer == null) {
      timeout = setTimeout(() => {
        fn.call(this, ...args)

        clearTimeout(timeout)
        timeout = null
      }, delay);
    }
  }
}