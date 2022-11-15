import { View, Text, Image } from '@tarojs/components'

function Header({ data }) {
  return (
    <View className='header-container'>
      <View className='logo'>
        <Image className='image' src={data?.headurl ?? ''} />
      </View>
      <View className='content'>
        <View className='title'>
          <Text>{data?.productName ?? ''}</Text>
        </View>
        <View className='desc'>
          <Text>{data?.introduce ?? ''}</Text>
        </View>
      </View>
    </View>
  )
}

export default Header
