import { View, Text, Image } from '@tarojs/components'
import BaseIcon from '../../../../components/Icon'


function UserInfo({ data, sourceData, onCode, onScan }) {
  return (
    <View className='member-container'>
      <View className='member-container__content'>
        <View className='member-container__content-avatar'>
          <Image className='avatar' src={data.avatarUrl}></Image>
        </View>
        <View className='member-user'>
          <View className='member-user__name'>
            <Text>{sourceData?.memberNum ?? ''}</Text>
          </View>
          <View className='member-user__name'>
            <Text>{sourceData?.userName ?? `会员名: ${sourceData?.userName }` ?? ''}</Text>
          </View>
        </View>
        <View className='action-panel'>
          <View
            className='action-panel--item'
            onClick={onScan}
          >
            <BaseIcon name='icon-scan' size={24} />
          </View>
          <View
            className='action-panel--item'
            onClick={onCode}
          >
            <BaseIcon name='icon-qrcode' size={24} />
          </View>
        </View>
      </View>
      <View className='member-wrapper'>
        <View className='member-item coupon'>
          <View className='value'>
            <Text>{sourceData?.couponList?.couponNum ?? 0}</Text>
          </View>
          <View className='label'>
            <Text>优惠券</Text>
          </View>
        </View>
        <View className='member-item account'>
          <View className='value'>
          <Text>{sourceData?.accountList?.balance ?? 0}</Text>
          </View>
          <View className='label'>
            <Text>账户</Text>
          </View>
        </View>
        <View className='member-item integral'>
          <View className='value'>
          <Text>{sourceData?.integralList?.integral ?? 0}</Text>
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