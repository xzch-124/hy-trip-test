import { defineStore } from "pinia";
import { getDetailInfos } from "@/service/module/detail";

const useDetailInfosStore = defineStore("detailInfos" ,{
  state: () => {
    detailInfos: {}
  },
  actions: {
    async fetchGetDetailInfosData(houseId) {
      const res = await getDetailInfos(houseId)
      this.detailInfos = res.data
    }
  }
})

export default useDetailInfosStore