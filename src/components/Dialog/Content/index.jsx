import { View } from '@tarojs/components'

import './style.scss'

function Content (props) {
  return (
    <View className='base-dialog__content'>
      <View className='base-dialog__content__main'>
        {props.children}
      </View>
    </View>
  )
}

export default Content
