import { Component } from 'react'
import { View } from '@tarojs/components'

import Drawer from '../../components/Drawer'
import Tabar from './components/Tabar'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Action from './components/Action'
import Submit from './components/Submit'
import Board from './components/Board'

import { handleNavigateTo } from '../../shared/navigator'
import { getCurrentInstance } from '../../shared/get-instance'

import './index.scss'
import { requestCreateShoppingCart, requestMerchantTable, requestProductDimension, requestProductList } from '../../service/store'
import { queryPhone, requestPhone } from '../../service/user'
import { initSourceData, initMaterialsSource, updateMaterialsSource } from '../../shared/cart'
import Compute from '../../shared/compute'

const cate = [{
  value: '1',
  label: '打包'
},{
  value: '2',
  label: '堂食'
}]

class StorePage extends Component {
  constructor(props) {
    super(props)
    this.state = {
      showSearch: false,
      drawerVisible: false,
      currentProduct: {},
      totalPrice: 0,
      productNumber: 1,
      storeInfo: {},
      sidebarList: [],
      productList: [],
      specVoMap: {},
      $$materialsSource: new Map(),
      sizeChecked: '',
      measureChecked: '',
      flavorChecked: '',
      consumeChecked: '1',
      sideList: [],
      basePrice: 0
    }
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handlSubmit = this.handlSubmit.bind(this)
    this.handleFetchProduct = this.handleFetchProduct.bind(this)
    this.handleAddCart = this.handleAddCart.bind(this)
    this.handleUpdateCounter = this.handleUpdateCounter.bind(this)
    this.handleUpdateVo = this.handleUpdateVo.bind(this)
    this.handlChangeVo = this.handlChangeVo.bind(this)
    this.handleUpdateSideList = this.handleUpdateSideList.bind(this)
  }

  componentDidMount () {
    this.handleQueryPhone()
    this.handleFetchData()
  }

  componentWillReceiveProps (nextProps) {
    console.log(this.props, nextProps)
  }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  $instance = getCurrentInstance()

  handleQueryPhone () {
    queryPhone()
      .then(res => {
        this.setState({
          phoneInfo: res
        })
      })
  }

  async handleFetchData () {
    try {
      const { tableId, dineNumber } = this.$instance.router.params
      const params = {
        tableId
      }
      const storeInfo = await requestMerchantTable(params)
      this.setState({
        storeInfo: storeInfo,
        dineNumber: dineNumber
      }, () => {
        this.handleFetchProduct()
      })
    } catch (error) {
      console.log(error)
    }
  }

  handleFetchProduct () {
    const { storeInfo } = this.state
    const params = {
      merchantNum: storeInfo.merchantNum
    }
    requestProductList(params)
      .then(res => {
        const { productList, sidebarList } = initSourceData(res)
        this.setState({
          sidebarList,
          productList
        })
      })
  }

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

  handleSelect (data) {
    this.setState({
      currentProduct: data
    })
    const params = {
      productId: data.merchantproductId
    }
    requestProductDimension(params)
      .then(res => {
        const {
          specVoMap,
          merchantProductSideVoList
        } = res
        const { $$materialsSource } = this.state
        const $$initSource = initMaterialsSource(merchantProductSideVoList)
        const newSource = $$materialsSource.set('materials', $$initSource)
        const sizeChecked = '' + specVoMap?.SIZE[0]?.productSpecId ?? ''
        const measureChecked = '' + specVoMap?.MEASURE[0]?.productSpecId ?? ''
        const flavorChecked = '' + specVoMap?.FLAVOR[0]?.productSpecId ?? ''
        this.setState({
          specVoMap,
          $$materialsSource: newSource,
          sizeChecked,
          measureChecked,
          flavorChecked
        }, () => {
          const specListPrice = this.getSpecListPrice()
          const totalPrice = Compute.add(specListPrice, data.price)
          this.setState({
            drawerVisible: true,
            totalPrice,
            basePrice: totalPrice
          })
        })
      })
    // this.setState({
    //   drawerVisible: true
    // })
  }

  handlSubmit () {
    handleNavigateTo({
      path: '/pages/book/index'
    })
  }

  handleGetAuthor (options) {
    const { type, detail, status } = options
    if (status === 'success' && type === 'phone') {
      const params = {
        code: detail.code
      }
      requestPhone(params)
        .then(res => {
          this.setState({
            phoneInfo: res
          })
        })
    }
  }

  getSpecListPrice () {
    const {
      specVoMap,
      sizeChecked,
      measureChecked,
      flavorChecked
    } = this.state
    const specIdChecked = {
      SIZE: sizeChecked,
      MEASURE: measureChecked,
      FLAVOR: flavorChecked
    }
    let specListPrice = 0
    const keys = Object.keys(specVoMap)
    keys.forEach(key => {
      const child = specVoMap[key]
      const selected = child.find((item) => {
        return '' + item.productSpecId === specIdChecked[key]
      })
      if (selected) {
        const price = selected['price'] || 0
        specListPrice = Compute.add(specListPrice, price)
      }
    })
    return specListPrice
  }

  getSpecList () {
    const {
      specVoMap,
      sizeChecked,
      measureChecked,
      flavorChecked
    } = this.state
    const specIdChecked = {
      SIZE: sizeChecked,
      MEASURE: measureChecked,
      FLAVOR: flavorChecked
    }
    const targetList = []
    const keys = Object.keys(specVoMap)
    keys.forEach(key => {
      const child = specVoMap[key]
      const selected = child.find((item) => {
        return '' + item.productSpecId === specIdChecked[key]
      })
      if (selected) {
        const target = {
          id: selected['productSpecId'],
          specName: selected['specName'],
          specNum: selected['specNum'],
          price: selected['price'] || 0
        }
        targetList.push(target)
      }
    })
    return targetList
  }

  handleUpdateSideList () {
    const { $$materialsSource, basePrice } = this.state
    const sourceData = $$materialsSource.get('materials') || []
    const targetList = []
    let sidePirce = 0
    for(let i = 0; i < sourceData.length; i++) {
      const item = sourceData[i]
      if (item.num) {
        const target = {
          price: item.price,
          id: item.id,
          sideName: item.sideName,
          chooseSum: item.num
        }
        const _price = Compute.mul(item.price, item.num)
        sidePirce = Compute.add(sidePirce, _price)
        targetList.push(target)
      }
    }
    const allPrice = Compute.add(basePrice, sidePirce)
    this.setState({
      sideList: targetList,
      totalPrice: allPrice
    })
  }

  handleAddCart () {
    const {
      totalPrice,
      currentProduct,
      consumeChecked,
      productNumber,
      sideList
    } = this.state
    const allPrice = Compute.mul(totalPrice, productNumber)
    const specList = this.getSpecList()
    const params = {
      productId: currentProduct.merchantproductId,
      specList,
      totalPrice: allPrice,
      packFlag: consumeChecked === '1',
      chooseSum: productNumber,
      productName: currentProduct.productName,
      operation: true,
      sideList: sideList
    }
    requestCreateShoppingCart(params)
      .then(res => {
        console.log(res)
      })
  }

  handleUpdateCounter({ counter }) {
    this.setState({
      productNumber: counter
    })
  }

  handleUpdateVo ({ id, counter, type }) {
    const { $$materialsSource } = this.state
    const result = updateMaterialsSource($$materialsSource, { id, counter })
    const newSource = $$materialsSource.set('materials', result)
    this.setState({
      $$materialsSource: newSource
    }, () => {
      this.handleUpdateSideList(type)
    })
  }

  handlChangeVo ({v, type}) {
    const options = {
      pack: 'consumeChecked'
    }
    const change = options[type]
    this.setState({
      [change]: v
    })
  }

  render () {
    const {
      showSearch,
      drawerVisible,
      storeInfo,
      sidebarList,
      productList,
      specVoMap,
      sizeChecked,
      measureChecked,
      flavorChecked,
      consumeChecked,
      productNumber,
      totalPrice,
      $$materialsSource,
      currentProduct,
      dineNumber,
      phoneInfo
    } = this.state
    const materialsSource = $$materialsSource.get('materials')
    const info = {
      desk: storeInfo.tableNane,
      number: dineNumber,
      showSearch
    }
    // const style = {
    //   marginTop: showSearch ? '-70px' : '0px'
    // }
    return (
      <View className='page-container store-page'>
        <View className='container'>
          <Tabar {...info} />
          <View className='body'>
            <Action />
            <View className='main'>
              <Sidebar sourceData={sidebarList} />
              <View className='list-wrapper'>
                <View className='list-wrapper__title'>当前选择的</View>
                <Content
                  sourceData={productList}
                  onScroll={this.handleOnScroll}
                  onSelect={this.handleSelect}
                />
              </View>
            </View>
          </View>
          <Submit
            onPress={this.handlSubmit}
            onGetAuthor={this.handleGetAuthor}
            phoneInfo={phoneInfo}
          />
          <Drawer
            show={drawerVisible}
            onClose={this.handleCloseDrawer}
            direction='bottom'
          >
            <Board
              data={{
                materials: materialsSource,
                specVoMap,
                consumeCate: cate
              }}
              sizeChecked={sizeChecked}
              measureChecked={measureChecked}
              flavorChecked={flavorChecked}
              consumeChecked={consumeChecked}
              onAddCart={this.handleAddCart}
              onCounter={this.handleUpdateCounter}
              onUpdateVo={this.handleUpdateVo}
              onChangeVo={this.handlChangeVo}
              productNumber={productNumber}
              totalPrice={totalPrice}
              currentProduct={currentProduct}
            />
          </Drawer>
        </View>
      </View>
    )
  }
}

export default StorePage

