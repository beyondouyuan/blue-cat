import { View } from '@tarojs/components'
import classNames from 'classnames'

import BaseButton from '../../../../components/Button'

function Footer({ data = {}, onPay, onCancel}) {
  const rootClass = 'footer-wrapper'
  const show = data?.productOrderStatusCode === 'SUCCESS' || data?.productOrderStatusCode === 'DOING'
  return show ? (
    <View className={classNames(rootClass)}>
      <View className='footer-wrapper__content'>
        <View className='button-list'>
          {
            data?.productOrderStatusCode === 'SUCCESS' ? (
              <View className='button-list--item'>
                <BaseButton type='info' size='small' circle onClick={() => onCancel(data)}>取消订单</BaseButton>
              </View>
            ) : null
          }
          {
            data?.productOrderStatusCode === 'DOING' ? (
              <View className='button-list--item'>
                <BaseButton type='warning' size='small' circle onClick={() => onPay(data)}>去支付</BaseButton>
              </View>
            ) : null
          }
        </View>
      </View>
    </View>
  ) : null
}

export default Footer
