import { Component } from "react"
import { View, ScrollView, Text } from '@tarojs/components'
import classNames from 'classnames'

import BaseRadio from "../../../../components/Radio"
import { chunk } from "../../../../shared/array"
import BaseCounter from "../../../../components/Counter"

class Content extends Component {
  constructor(props) {
    super(props)
    this.state = {

    }
    this.handleOnPress = this.handleOnPress.bind(this)
    this.handleOnCounter = this.handleOnCounter.bind(this)
    this.handleOnRadio = this.handleOnRadio.bind(this)
  }
  handleScrollToLower() { }
  handleOnPress(e, data) {
    this.props.onSelect(data)
  }
  handleOnCounter(data, item) {
    this.props.onUpdateVo({ id: item.id, ...data })
  }
  handleOnRadio(v, type) {
    this.props.onChangeVo({ v, type })
  }

  render() {
    const {
      consumeCate = [],
      specVoMap = {},
      materials,
      sizeChecked = '',
      measureChecked = '',
      flavorChecked = '',
      consumeChecked = '',
      threshold = 100
    } = this.props
    const groupDines = chunk(materials, 2)
    return (
      <ScrollView
        className='board-content'
        scrollY
        scrollWithAnimation
        lowerThreshold={threshold}
        onScrollToLower={this.handleScrollToLower}
      >
        {
          specVoMap.SIZE && (
            <View className='section size'>
              <View className='title'><Text>尺寸</Text></View>
              <BaseRadio
                options={specVoMap.SIZE}
                labelName='specName'
                valueName='productSpecId'
                checked={sizeChecked}
              />
            </View>
          )
        }
        {
          specVoMap.MEASURE && (
            <View className='section size'>
              <View className='title'><Text>分量</Text></View>
              <BaseRadio
                options={specVoMap.MEASURE}
                labelName='specName'
                valueName='productSpecId'
                checked={measureChecked}
              />
            </View>
          )
        }
        {
          specVoMap.FLAVOR && (
            <View className='section size'>
              <View className='title'><Text>口味</Text></View>
              <BaseRadio
                options={specVoMap.FLAVOR}
                labelName='specName'
                valueName='productSpecId'
                checked={flavorChecked}
              />
            </View>
          )
        }
        <View className='section cate'>
          <View className='title'><Text>堂食 or 打包</Text></View>
          <BaseRadio
            options={consumeCate}
            checked={consumeChecked}
            onChange={(v) => this.handleOnRadio(v, 'pack')}
          />
        </View>
        {
          materials && (
            <View className='section materials'>
              <View className='title'><Text>加料区</Text></View>
              {
                groupDines.map((item, idx) => {
                  return (
                    <View
                      className='materials--wrapper'
                      key={idx}
                    >
                      {
                        item.map((child) => {
                          const selected = child.num > 0
                          const rootClassName = 'materials--item'
                          const classObject = {
                            'materials--item-active': selected
                          }
                          return (
                            <View
                              key={child.id}
                              className={classNames(rootClassName, classObject)}
                            >
                              <BaseCounter
                                counter={child.num ?? 0}
                                onCounter={(data) => this.handleOnCounter(data, child)}
                              >
                                <View className='inner'>
                                  <View className='main-label'>
                                    <Text className='mr8'>加</Text>
                                    <Text className='mr8'>{child.sideName}</Text>
                                    {/* <Text className='mr8 label--desc'>({child.remark})</Text> */}
                                  </View>
                                  <View className='mr8 txt-h3 price-red'>
                                    <Text className='price-red price-unit'>¥</Text>
                                    {child.price}
                                  </View>
                                </View>
                              </BaseCounter>
                              {
                                selected && (
                                  <View className='num'>
                                    <Text>{child.num}</Text>
                                  </View>
                                )
                              }
                            </View>
                          )
                        })
                      }
                    </View>
                  )
                })
              }
            </View>
          )
        }
      </ScrollView>
    )
  }
}

export default Content