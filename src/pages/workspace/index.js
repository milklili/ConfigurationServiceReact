import React from 'react'
import PropTypes from 'prop-types'
import { routerRedux } from 'dva/router'
import { connect } from 'dva'
import { Form, Button, Row, Col, DatePicker, Input, Select } from 'antd'
import { Page } from 'components'
import queryString from 'query-string'
import List from './components/List'
import Filter from './components/Filter'
import Modal from './components/Modal'


const Workspace = ({
  location, dispatch, workspace, loading,
}) => {
  const { query, pathname } = location
  const {
    portfolioId,showType,priceHistory,list, modalVisible, modalType,max,todayPrice,
  } = workspace

  const handleRefresh = (newQuery) => {//刷新整个列表页面
    dispatch(routerRedux.push({
      pathname,
      search: queryString.stringify({
        ...query,
        ...newQuery,
      }),
    }))
  }

  const modalProps = {
    priceHistory,
    modalType,
    max,
    todayPrice,
    visible: modalVisible,
    maskClosable: false,
    confirmLoading: loading.effects[`workspace/${modalType}`],
    title: `${modalType === 'update' ? 'Update Workspace' : 'Create Workspace'}`,
    wrapClassName: 'vertical-center-modal',
    onOk (data) {
      debugger
      dispatch({
        type: `workspace/${modalType}`,
        payload: data,
      })
        .then(() => {
          handleRefresh()
        })
    },
    onCancel () {
      dispatch({
        type: 'workspace/hideModal',
      })
    },
  }

  const filterProps = {
    filter: {
      ...query,
    },
    onFilterChange (value) {
      debugger
      dispatch({
        type: 'workspace/searchPositionOrTrade',
        payload:{
          type:value.type,
          productName:value.name,
          begin:value.createTime[0]?value.createTime[0].replace(/\-/g,"/"):'1900/01/01',
          end:value.createTime[1]?value.createTime[1].replace(/\-/g,"/"):'2100/01/01',
        },
      })
      // handleRefresh({
      //   ...value,
      //   //page: 1,
      // })
    },
    onSale () {
      dispatch({
        type: 'workspace/updateState',
        payload: {
          modalType: 'sale',
          modalVisible:true,
        },
      })
    },
    onBuy () {
      dispatch({
        type: 'workspace/updateState',
        payload: {
          modalType: 'buy',
          modalVisible:true,
        },
      })
    },
    onTypeChange (val){
      dispatch({
        type: 'workspace/updateState',
        payload: {
          showType: val,
        },
      })
      debugger
      if(val===1){
        dispatch({
          type: 'workspace/queryTradeHistory',
        })
      }else{
        dispatch({
          type: 'workspace/queryPosition',
        })
      }

    },
  }

  const listProps = {
    showType,
    dataSource: list,
    loading: loading.effects['workspace/query'],
    location,
    onDeleteItem (id) {
      dispatch({
        type: 'workspace/delete',
        payload: id,
      })
    },
    onEditItem (item) {
      dispatch({
        type: 'workspace/showModal',
        payload: {
          modalType: 'update',
          currentItem: item,
        },
      })
    },
  }



  return (
    <Page inner>
      <Filter {...filterProps} />
      <List {...listProps} />
      {modalVisible && <Modal {...modalProps} />}
    </Page>
  )
}

Workspace.propTypes = {
  workspace: PropTypes.object,
  location: PropTypes.object,
  dispatch: PropTypes.func,
  loading: PropTypes.object,
}

export default connect(({ workspace, loading }) => ({ workspace, loading }))(Workspace)
