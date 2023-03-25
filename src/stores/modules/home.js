import { getHomeHotSuggests, getHomeCategories, getHomeHouselist } from "@/service";
import { defineStore } from "pinia";

const useHomeStore = defineStore("home", {
  state: () => ({
    hotSuggests: [],
    categories: [],

    currentPage: 1,
    houseList: []
  }),
  actions: {
    async fetchGetHotSuggestData() {
      const res = await getHomeHotSuggests()
      this.hotSuggests = res.data
    },
    async fetchGetCategoriesData() {
      const res = await getHomeCategories()
      this.categories = res.data
      // console.log(this.categories)
    },
    async fetchGetHomeHouseListData() {
      const res = await getHomeHouselist(this.currentPage)
      this.houseList.push(...res.data)
      this.currentPage++
    }
  }
})

export default useHomeStore