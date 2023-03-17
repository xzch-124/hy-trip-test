export const getAssetURL = (image, pre = '/imgs/') => {
    // 参数一: 相对路径
    // 参数二: 当前路径的URL
    return new URL('../assets'+pre+image, import.meta.url).href
  }