/* global window */
//import modelExtend from 'dva-model-extend'
import pathToRegexp from 'path-to-regexp'
import { config } from 'utils'
import { queryPosition, queryTradeHistory, queryPortfolioRate,getBuyInfo,getSaleMax,getHistoryPrice,saleOrBuy,searchPositions } from './service'
//import * as usersService from './services/users'
//import { pageModel } from 'utils/model'

//const { query } = usersService
//const { prefix } = config

export default {
  namespace: 'workspace',

  state: {
    portfolioId:0,
    showType:0,//默认显示position
    currentItem: {},//选择买入或卖出的股票的信息
    list:[],
    modalVisible: false,
    modalType: 'buy',
    maxSale:100,
    maxBuy:200,
    todayPrice:1,
    priceHistory:{
      time:[],
      prices:[],
    },

  },

  subscriptions: {
    // setup ({ dispatch, history }) {
    //   history.listen((location) => {
    //     if (location.pathname === '/portfolioDetail') {
    //       const payload = location.query || { page: 1, pageSize: 10 }
    //       dispatch({
    //         type: 'query',
    //         payload,
    //       })
    //     }
    //   })
    // },
    setup ({ dispatch, history }) {
      history.listen(({ pathname }) => {

        // const match = pathToRegexp('/workspace/:id').exec(pathname)
        // debugger
        // if (match) {
        //   dispatch({type:'updateState',payload: { portfolioId: match[1] }})
        //   dispatch({ type: 'queryPosition'})
        // }
      })
    },
  },

  effects: {

    * queryPosition ({ payload = {} }, { call, put,select }) {
      const { portfolioId } = yield select(_ => _.workspace)
      const data = yield call(queryPosition, {portfolioId})
      debugger
      yield put({ type: 'updateState', payload: { list: data.data.data } })
    },

    * queryTradeHistory ({ payload = {} }, { call, put,select }) {
      const { portfolioId } = yield select(_ => _.workspace)
      const data = yield call(queryTradeHistory, {portfolioId})
      yield put({ type: 'updateState', payload: { list: data.data.data } })
    },

    *queryBuyInfo ({ payload }, { select, call, put }){

      const data = yield call(getBuyInfo, payload)
      const {cash,price}=data.data.data
      let max=Math.floor(cash/price)
      let history=yield call(getHistoryPrice, {productName:payload.productName})

      let datas=history.data.data.filter((val)=>{
        return !(!val || val === "")
      })
      let time=datas.map((ele)=>{
        return ele.generateDate
      })

      let prices=datas.map((ele)=>{
        return ele.price
      })
      history={
        time,
        prices,
      }
      debugger
      yield put({ type: 'updateState', payload: { max,todayPrice: price,priceHistory:history} })
    },

    *querySaleInfo ({ payload }, { select, call, put }){

      const data = yield call(getSaleMax, payload)
      const{todayPrice,totalQTY}=data.data.data
      let history=yield call(getHistoryPrice, {productName:payload.productName})
      let datas=history.data.data.filter((val)=>{
        return !(!val || val === "")
      })
      let time=datas.map((ele)=>{
        return ele.generateDate
      })

      let prices=datas.map((ele)=>{
        return ele.price
      })
      history={
        time,
        prices,
      }
      debugger
      yield put({ type: 'updateState', payload: { max: totalQTY ,todayPrice,priceHistory:history} })
    },

    *sale ({ payload }, { select, call, put }){
      const { portfolioId } = yield select(_ => _.workspace)
      const data = yield call(saleOrBuy, {portfolioId,side:1,...payload})
      yield put({ type: 'hideModal' })
    },

    *buy ({ payload }, { select, call, put }){
      const { portfolioId } = yield select(_ => _.workspace)
      const data = yield call(saleOrBuy, {portfolioId,side:0,...payload})
      yield put({ type: 'hideModal' })
    },

    *searchPositionOrTrade ({ payload }, { select, call, put }){
      const data = yield call(searchPositions, payload)
      debugger
      yield put({ type: 'updateState', payload: { list:data.data.data} })
    },



  },

  reducers: {
    updateState (state, { payload }) {
      return {
        ...state,
        ...payload,
      }
    },

    showModal (state, { payload }) {
      return { ...state, ...payload, modalVisible: true }
    },

    hideModal (state) {
      return { ...state, modalVisible: false }
    },


  },
}
