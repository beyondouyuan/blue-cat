import { View } from '@tarojs/components'

import './style.scss'

function Header (props) {
  return (
    <View className='base-dialog__header'>
      <View className='base-dialog__header__content'>
        {props.children}
      </View>
    </View>
  )
}

export default Header
