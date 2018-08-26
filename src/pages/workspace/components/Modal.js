import React from 'react'
import PropTypes from 'prop-types'
import { Form, Input, InputNumber,  Modal, Select,Card } from 'antd'
//import echarts from 'echarts'
import LineChart from './LineChart.js'
//import city from 'utils/city'

const FormItem = Form.Item
const { Search } = Input
const Option = Select.Option

const formItemLayout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 14,
  },
}

const modal = ({
  priceHistory,
  max,
  todayPrice,
  onOk,
  onStockChange,
  form: {
    getFieldDecorator,
    validateFields,
    getFieldsValue,
  },
  ...modalProps
}) => {
  const handleOk = () => {
    validateFields((errors) => {
      if (errors) {
        return
      }
      const data = {
        ...getFieldsValue(),
      }
      onOk(data)
    })
  }

  const modalOpts = {
    ...modalProps,
    onOk: handleOk,
  }


  return (
    <Modal {...modalOpts}>
      <Form layout="horizontal">
        <FormItem label="Name"  {...formItemLayout}>
        {getFieldDecorator('Name', {
            initialValue: null,
            rules: [
              {
                required: true,
              },
            ],
          })(<Input />)}
        </FormItem>
      </Form>
    </Modal>
  )
}

modal.propTypes = {
  form: PropTypes.object.isRequired,
  type: PropTypes.string,
  item: PropTypes.object,
  onOk: PropTypes.func,
}

export default Form.create()(modal)
