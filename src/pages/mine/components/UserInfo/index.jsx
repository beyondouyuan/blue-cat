import { View, Text, Image } from '@tarojs/components'


function UserInfo({ data }) {
  return (
    <View className='account-container'>
      <View className='account-container__content'>
        <View className='account-container__content-avatar'>
          <Image className='avatar' src={data.avatarUrl}></Image>
        </View>
        <View className='account-user'>
          <View className='account-user__name'>
            <Text>{data.nickName}</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default UserInfo