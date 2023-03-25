import hyRequest from '../request'

export const getDetailInfos = (houseId) => {
  return hyRequest.get({
    url: "detail/infos",
    params: {
      houseId
    }
  })
}