import { request, config } from 'utils'

const { api } = config
const { getPosition,getTradeHistory,processProduct,getProductHistroy,getPortfolioRate,getMaxQuantity,getCashAndProductPrice,searchPosition } = api

export function queryPosition (params) {
  return request({
    url: getPosition,
    method: 'get',
    data: params,
    fetchType:'CORS',
  })
}



export function queryTradeHistory (params) {
  return request({
    url: getTradeHistory,
    method: 'get',
    data: params,
    fetchType:'CORS',
  })
}

//获取收益率曲线
export function queryPortfolioRate (params) {
  return request({
    url: getPortfolioRate,
    method: 'get',
    data: params,
    fetchType:'CORS',
  })
}




export function getBuyInfo (params){
  return request({
    url: getCashAndProductPrice,
    method: 'get',
    data: params,
    fetchType:'CORS',
  })
}

export function getSaleMax (params){
  return request({
    url: getMaxQuantity,
    method: 'get',
    data: params,
    fetchType:'CORS',
  })
}

export function getHistoryPrice (params){
  return request({
    url: getProductHistroy,
    method: 'get',
    data: params,
    fetchType:'CORS',
  })
}

export function saleOrBuy (params){
  return request({
    url: processProduct,
    method: 'get',
    data: params,
    fetchType:'CORS',
  })
}

export function searchPositions (params){
  debugger
  return request({
    url: searchPosition,
    method: 'get',
    data: params,
    fetchType:'CORS',
  })
}

