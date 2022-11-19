import { View, Text } from '@tarojs/components'
import Detail from '../Detail'
import Item from '../Item'

function Content ({ sourceData = {} }) {
  const { detailVoList = [] } = sourceData
  const detailData = {
    ...sourceData
  }

  delete detailData['detailVoList']

  return (
    <View className='content-container'>
      <View className='status'>
        <Text className='txt-h2'>{detailData.productOrderStatus}</Text>
      </View>
      <View className='content-container--wrapper'>
        {
          detailVoList && detailVoList.map((item, $idx) => {
            return (
              <Item data={item} key={$idx} />
            )
          })
        }
      </View>
      <Detail data={detailData} />
    </View>
  )
}


export default Content