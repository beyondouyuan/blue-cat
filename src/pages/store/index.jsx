import { Component } from 'react'
import { View } from '@tarojs/components'

import Drawer from '../../components/Drawer'
import Tabar from './components/Tabar'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Action from './components/Action'
import Submit from './components/Submit'
import Board from './components/Board'

import food from '../../images/food.jpeg'

import './index.scss'
import { handleNavigateTo } from '../../shared/navigator'

const menus = [{
  label: '热销',
  value: '1'
}, {
  label: '骨汤粿条',
  value: '2'
}, {
  label: '米饭专区',
  value: '1'
}, {
  label: '特色小吃',
  value: '3'
}]

const goods = [{
  id: 1,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 2,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 3,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 4,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 5,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 6,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 6,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 7,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 9,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 10,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 11,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 12,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 13,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}, {
  id: 14,
  title: '五谷渔粉',
  desc: '人人都爱吃的鱼粉',
  sales: 100,
  price: 13,
  url: food
}]

const goodsDetail = {
  src: food,
  title: '五谷渔粉',
  desc: '本店爆品，绝对美味',
  size: [{
    value: '1',
    label: '大份'
  }, {
    value: '2',
    label: '中份'
  }, {
    value: '3',
    label: '小份'
  }],
  cate: [{
    value: '1',
    label: '打包'
  },{
    value: '2',
    label: '堂食'
  }],
  materials: [{
    value: '1',
    label: '牛肉丸',
    price: 6,
    desc: '3粒',
    num: 2
  }, {
    value: '2',
    label: '猪肉丸',
    price: 6,
    desc: '3粒',
    num: 0
  }, {
    value: '3',
    label: '肉饼',
    price: 6,
    desc: '3粒'
  }, {
    value: '4',
    label: '紫菜',
    price: 6,
    desc: '3粒'
  }, {
    value: '5',
    label: '粉',
    price: 6,
    desc: '3粒'
  }, {
    value: '6',
    label: '青菜',
    price: 6,
    desc: '3粒'
  }, {
    value: '7',
    label: '酸菜',
    price: 6,
    desc: '3粒'
  }, {
    value: '8',
    label: '鱼皮',
    price: 6,
    desc: '3粒'
  }, {
    value: '9',
    label: '廋肉',
    price: 6,
    desc: '3粒'
  }, {
    value: '10',
    label: '面',
    price: 6,
    desc: '3粒'
  }]
}

class StorePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearch: false,
      drawerVisible: false
    }
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handlSubmit = this.handlSubmit.bind(this)
  }
  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  handleOnScroll (data) {
    this.setState({
      showSearch: data.show
    })
  }

  handleCloseDrawer () {
    this.setState({
      drawerVisible: false
    })
  }

  handleSelect () {
    this.setState({
      drawerVisible: true
    })
  }

  handlSubmit () {
    handleNavigateTo({
      path: '/pages/book/index'
    })
  }

  render () {
    const {
      showSearch,
      drawerVisible
    } = this.state
    const info = {
      desk: 'B10',
      number: 2,
      showSearch
    }
    const sub = {
      menus
    }
    return (
      <View className='page-container store-page'>
        <View className='container'>
          <Tabar {...info} />
          <View className='body' style={{ 'marginTop': showSearch ? '-70px': '0px' }}>
            <Action />
            <View className='main'>
              <Sidebar {...sub} />
              <View className='list-wrapper'>
                <View className='list-wrapper__title'>当前选择的</View>
                <Content
                  sourceData={goods}
                  onScroll={this.handleOnScroll}
                  onSelect={this.handleSelect}
                />
              </View>
            </View>
          </View>
          <Submit
            onPress={this.handlSubmit}
          />
          <Drawer
            show={drawerVisible}
            onClose={this.handleCloseDrawer}
            direction='bottom'
          >
            <Board
              data={goodsDetail}
            />
          </Drawer>
        </View>
      </View>
    )
  }
}

export default StorePage

