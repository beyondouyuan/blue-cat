import { View, Text } from '@tarojs/components'

function Action () {
  return (
    <View className='action-container'>
      <View className='action-container__content'>
        <View className='info'>
          <View><Text>查看门店信息</Text></View>
          <View><Text>更多</Text></View>
        </View>
        <View className='nav'>
          <Text>登录会员</Text>
        </View>
      </View>
    </View>
  )
}

export default Action
