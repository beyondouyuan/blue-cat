import { View, Text } from '@tarojs/components'
import classNames from 'classnames'
import BaseIcon from '../../../../components/Icon'

function Action ({onMember, onToggle, isOpenedOverlay}) {
  const rootClass = 'icon-box icon-box--arrow'
  const className = {
    'icon-box--arrow-active': isOpenedOverlay
  }
  const text = isOpenedOverlay ? '门店信息' : '查看门店信息'
  return (
    <View className='action-container'>
      <View className='action-container__content'>
        <View className='info' onClick={onToggle}>
          <View><Text>{text}</Text></View>
          <View className={classNames(rootClass, className)}>
            <BaseIcon name='icon-arrow' size={14} />
          </View>
        </View>
        <View className='nav' onClick={onMember}>
          <View className='icon-box icon-box--member'>
            <BaseIcon name='icon-member' size={14} />
          </View>
          <View className='desc'>
            <Text>加入会员</Text>
          </View>
          <View className='icon-box icon-box--arrow'>
            <BaseIcon name='icon-arrow' size={14} />
          </View>
        </View>
      </View>
    </View>
  )
}

export default Action
