import { View, Text } from '@tarojs/components'
import classNames from 'classnames'

import BaseButton from '../../../../components/Button'
import MButton from '../../../../components/MButton'
import BaseIcon from '../../../../components/Icon'
import { getOrderIdCacheSync } from '../../../../shared/global'

function Submit ({ onGetAuthor, phoneInfo = {}, onPress, onShowCart, cartNum = 0, className }) {
  const disabled = !(cartNum || getOrderIdCacheSync())
  const buttonProps = {
    openType: 'getPhoneNumber',
    size: 'mini',
    type: 'primary',
    circle: true,
    full: true,
    'hover-class': 'none',
    disabled
  }
  const rootClass = 'submit-container'
  const cartClass = 'shop-icon'
  const cartActive = {
    'shop-icon--active': cartNum
  }
  return (
    <View className={classNames(rootClass, className)}>
      <View
        className='submit-container__content'
        onClick={(e) => {
          e.preventDefault()
          e.stopPropagation()
          if (disabled) return
          onShowCart(e)
        }}
      >
        <View className={classNames(cartClass, cartActive)}>
          <BaseIcon name='icon-cart' size={24} />
        </View>
        <View className='shop-content'>
          {
            cartNum ? (
              <Text>已选购{cartNum}件物品</Text>
            ) : null
          }
        </View>
        <View className='submit'>
          {
            phoneInfo.phoneTag ? (
              <BaseButton size='middle' circle disabled={disabled} onClick={onPress}>选好了</BaseButton>
            ) : (
              <MButton
                text='选好了'
                buttonProps={buttonProps}
                onGetAuthor={(options) => onGetAuthor(options)}
              ></MButton>
            )
          }
        </View>
      </View>
    </View>
  )
}

export default Submit
