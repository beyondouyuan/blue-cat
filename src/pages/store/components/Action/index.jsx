import { View, Text } from '@tarojs/components'
import BaseIcon from '../../../../components/Icon'

function Action ({onMember}) {
  return (
    <View className='action-container'>
      <View className='action-container__content'>
        <View className='info'>
          <View><Text>查看门店信息</Text></View>
          <View className='icon-box icon-box--arrow'>
            <BaseIcon name='icon-arrow' size={14} />
          </View>
        </View>
        <View className='nav' onClick={onMember}>
          <View className='icon-box icon-box--member'>
            <BaseIcon name='icon-member' size={14} />
          </View>
          <View className='desc'>
            <Text>登录会员</Text>
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
