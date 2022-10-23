import { View, Text, Input } from '@tarojs/components'

function Tabar (props) {
  return (
    <View className='tabar-container'>
      <View className='tabar-container__content'>
        <View className='info'>
          <View><Text>桌号{props.desk}</Text>|{props.number}人就餐</View>
        </View>
        <View className='nav'></View>
      </View>
      {
        props.showSearch && (
          <View className='panel-container'>
            <View className='search-box'>
              <Input placeholder='请输入菜品名称'></Input>
            </View>
            <View className='action'></View>
          </View>
        )
      }
    </View>
  )
}

export default Tabar
