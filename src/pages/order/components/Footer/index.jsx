import { View } from '@tarojs/components'
import classNames from 'classnames'

import BaseButton from '../../../../components/Button'

function Footer({ onPay, onCancel}) {
  const rootClass = 'footer-wrapper'
  return (
    <View className={classNames(rootClass)}>
      <View className='footer-wrapper__content'>
        <View className='button-list'>
          <View className='button-list--item'>
            <BaseButton type='info' size='middle' circle onClick={onCancel}>取消订单</BaseButton>
          </View>
          <View className='button-list--item'>
            <BaseButton type='warning' size='middle' circle onClick={onPay}>去支付</BaseButton>
          </View>
        </View>
      </View>
    </View>
  )
}

export default Footer
