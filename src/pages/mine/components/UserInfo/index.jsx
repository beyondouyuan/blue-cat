import { View, Text, Image } from '@tarojs/components'


function UserInfo({ data }) {
  return (
    <View className='member-container'>
      <View className='member-container__content'>
        <View className='member-container__content-avatar'>
          <Image className='avatar' src={data.avatarUrl}></Image>
        </View>
        <View className='member-user'>
          <View className='member-user__name'>
            <Text>{data?.memberList?.memberNum ?? ''}</Text>
          </View>
          <View className='member-user__name'>
            <Text>{data?.memberList?.userName ? `会员名: ${data?.memberList?.userName}` : data?.nickName ?? ''}</Text>
          </View>
        </View>
      </View>
      <View className='member-wrapper'>
        <View className='member-item coupon'>
          <View className='value'>
            <Text>{data?.couponList?.couponNum ?? 0}</Text>
          </View>
          <View className='label'>
            <Text>优惠券</Text>
          </View>
        </View>
        <View className='member-item account'>
          <View className='value'>
          <Text>{data?.accountList?.balance ?? 0}</Text>
          </View>
          <View className='label'>
            <Text>账户</Text>
          </View>
        </View>
        <View className='member-item integral'>
          <View className='value'>
          <Text>{data?.integralList?.integral ?? 0}</Text>
          </View>
          <View className='label'>
            <Text>积分</Text>
          </View>
        </View>
      </View>
    </View>
  )
}

export default UserInfo