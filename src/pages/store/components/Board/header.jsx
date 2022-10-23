import { View, Text, Image } from '@tarojs/components'

function Header({ data }) {
  return (
    <View className='header-container'>
      <View className='logo'>
        <Image className='image' src={data?.src ?? ''} />
      </View>
      <View className='content'>
        <View className='title'>
          <Text>{data?.title ?? 'biaoti'}</Text>
        </View>
        <View className='desc'>
          <Text>{data?.desc ?? 'miaoshu'}</Text>
        </View>
      </View>
    </View>
  )
}

export default Header
