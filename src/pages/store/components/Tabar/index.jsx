import { View, Text, Input } from '@tarojs/components'
import BaseIcon from '../../../../components/Icon'

function Tabar(props) {
  return (
    <View className='tabar-container'>
      <View className='tabar-container__content'>
        <View className='info'>
          <View><Text>桌号{props.tableName}</Text>|{props.number}人就餐</View>
        </View>
        <View className='nav'>
          <View className='nav-item' onClick={props.onSearch}>
            <BaseIcon name='icon-search' />
          </View>
          <View className='nav-item' onClick={props.onPress}>
            <BaseIcon name='icon-user' />
          </View>
        </View>
      </View>
      {
        props.showSearch && (
          <View className='panel-container'>
            <View className='search-box' onClick={props.onSearch}>
              <Input placeholder='请输入菜品名称'></Input>
              <View className='search-box--icon'>
                <BaseIcon name='icon-search' size={14} />
              </View>
            </View>
            <View className='action'>
              <View className='action--item' onClick={props.onPress}>
                <BaseIcon name='icon-user' />
              </View>
              <View className='action--item icon-box--member' onClick={props.onMember}>
                <BaseIcon name='icon-member' />
              </View>
            </View>
          </View>
        )
      }
    </View>
  )
}

export default Tabar
