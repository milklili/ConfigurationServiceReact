import React from 'react'
//import PropTypes from 'prop-types'
import { Table,Modal } from 'antd'
// import classnames from 'classnames'
import { DropOption } from 'components'
import { Link } from 'react-router-dom'
// import AnimTableBody from 'components/DataTable/AnimTableBody'
// import styles from './List.less'

const { confirm } = Modal

const List = ({
  onDeleteItem, onEditItem,showType,dataSource,loading,
}) => {

  const handleMenuClick = (record, e) => {
    if (e.key === '1') {
      onEditItem(record)
    } else if (e.key === '3') {
      confirm({
        title: 'Are you sure delete this record?',
        onOk () {
          onDeleteItem(record.id)
        },
      })
    }
  }
  const columns = [
    {
      title: 'Id',
      dataIndex: 'id',
      width:100,
    },
    {
    title: 'WorkspaceName',
    dataIndex: 'workspaceName',
    render: (text, record) => <Link to={`workspace/${record.id}`}>{text}</Link>,
    },
    {
      title: 'CreateDate',
      dataIndex: 'createDate',
      width:200,
    },
    {
      title: 'Owner',
      dataIndex: 'curPrice',
      width:200,
    },
    {
      title: 'Operation',
      key: 'operation',
      width: 100,
      render: (text, record) => {
        return <DropOption onMenuClick={e => handleMenuClick(record, e)} menuOptions={[{ key: '1', name: 'Update' },{ key: '2', name: 'Transfer' }, { key: '3', name: 'Delete' }]} />
      },
    },
  ]


  const data = [
    {
      buyPrice:849.27,
      curPrice:851.00,
      id:1,
      positionId:35,
      createDate:"2017/02/21",
      workspaceName:"GOOGL",
      quantity:354,
      rateOfreturn:0.00203704,
      totalValue:301254.00,
    },
    {
      buyPrice:849.27,
      curPrice:851.00,
      id:2,
      positionId:35,
      createDate:"2017/02/21",
      workspaceName:"GOOGL",
      quantity:354,
      rateOfreturn:0.00203704,
      totalValue:301254.00,
    },
  ]

  return (
    <Table
      bordered
      columns={columns}
      dataSource={data}
      rowKey={record => showType===1?record.tradeId:record.positionId}
      pagination={false}
    />
  )
}

// List.propTypes = {
//   onDeleteItem: PropTypes.func,
//   onEditItem: PropTypes.func,
//   isMotion: PropTypes.bool,
//   location: PropTypes.object,
// }

export default List
