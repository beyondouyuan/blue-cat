import { View, Text } from '@tarojs/components'
import BaseCounter from '../../../../components/Counter'

function Item ({ data, onCounter }) {
  return (
    <View className='cart-item'>
      <View className='cart-body'>
        <View className='image'></View>
        <View className='content'>
          <View className='title txt-h3'>
            <Text>{ data.productName }</Text>
          </View>
          <View className='remark txt-h4 txt-secondary'>
            <Text>{ data.specificationRemark }</Text>
          </View>
          <View className='price'>
            <Text>{ data.totalAmount }</Text>
          </View>
        </View>
      </View>
      <View className='action'>
        <BaseCounter
          counter={data.chooseSum}
          onCounter={(options) => onCounter(data, options)}
        />
      </View>
    </View>
  )
}

export default Item