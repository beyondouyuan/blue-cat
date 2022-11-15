import { View } from '@tarojs/components'

import './style.scss'

function Content (props) {
  const rootClass = props.center ? 'base-dialog__content base-dialog__content--center' : `base-dialog__content`
  return (
    <View className={rootClass}>
      <View className='base-dialog__content__main'>
        {props.children}
      </View>
    </View>
  )
}

export default Content
