import { Component } from 'react'
import { View } from '@tarojs/components'

import Drawer from '../../components/Drawer'
import Tabar from './components/Tabar'
import Sidebar from './components/Sidebar'
import Content from './components/Content'
import Action from './components/Action'
import Submit from './components/Submit'
import Board from './components/Board'
import Cart from './components/Cart'

import { handleNavigateTo } from '../../shared/navigator'
import { getCurrentInstance } from '../../shared/get-instance'

import './index.scss'
import { cleanShoppingCart, requestCreateShoppingCart, requestMerchantTable, requestProductDimension, requestProductList, requestShoppingCartList } from '../../service/store'
import { queryPhone, requestPhone } from '../../service/user'
import { initSourceData, initMaterialsSource, updateMaterialsSource } from '../../shared/cart'
import Compute from '../../shared/compute'
import { getTableCacheSync } from '../../shared/global'

const cate = [{
  value: '1',
  label: '打包'
}, {
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
      productPrice: 0,
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
      basePrice: 0,
      packPrice: 0,
      shoppingCartList: [],
      showType: 'select',
      productConsumeType: {}
    }
    this.handleOnScroll = this.handleOnScroll.bind(this)
    this.handleCloseDrawer = this.handleCloseDrawer.bind(this)
    this.handleSelect = this.handleSelect.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
    this.handleFetchProduct = this.handleFetchProduct.bind(this)
    this.handleAddCart = this.handleAddCart.bind(this)
    this.handleUpdateCounter = this.handleUpdateCounter.bind(this)
    this.handleUpdateVo = this.handleUpdateVo.bind(this)
    this.handleChangeVo = this.handleChangeVo.bind(this)
    this.handleUpdateSideList = this.handleUpdateSideList.bind(this)
    this.handleGetAuthor = this.handleGetAuthor.bind(this)
    this.fetchShopCartList = this.fetchShopCartList.bind(this)
    this.handleShowCart = this.handleShowCart.bind(this)
    this.handleUpdateShopCart = this.handleUpdateShopCart.bind(this)
    this.handleCleanShopCart = this.handleCleanShopCart.bind(this)
  }

  componentDidMount() {
    this.handleQueryPhone()
    this.handleFetchData()
    this.fetchShopCartList()
  }

  componentWillUnmount() { }

  componentDidShow() { }

  componentDidHide() { }

  $instance = getCurrentInstance()

  handleQueryPhone() {
    queryPhone()
      .then(res => {
        this.setState({
          phoneInfo: res
        })
      })
  }

  async handleFetchData() {
    try {
      const { tableId, dineNumber } = this.$instance.router.params
      const params = {
        tableId: tableId || getTableCacheSync() || ''
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

  handleFetchProduct() {
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

  handleOnScroll(data) {
    this.setState({
      showSearch: data.show
    })
  }

  handleCloseDrawer() {
    this.setState({
      drawerVisible: false
    })
  }

  handleSelect(data) {
    this.setState({
      currentProduct: data,
      showType: 'select'
    })
    const params = {
      productId: data.merchantproductId
    }
    requestProductDimension(params)
      .then(res => {
        const {
          specVoMap,
          merchantProductSideVoList,
          productConsumeType
        } = res
        const { $$materialsSource, consumeChecked } = this.state
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
          flavorChecked,
          productConsumeType
        }, () => {
          const specListPrice = this.getSpecListPrice()
          let productPrice = Compute.add(specListPrice, data.price)
          let packPrice = 0
          if (consumeChecked === '1') {
            packPrice = +productConsumeType['price'] || 0
          }
          this.setState({
            drawerVisible: true,
            productPrice,
            packPrice,
            basePrice: productPrice
          })
        })
      })
  }

  handleSubmit() {
    const { storeInfo } = this.state
    const { tableId, dineNumber } = this.$instance.router.params
    handleNavigateTo({
      path: '/pages/book/index',
      params: {
        tableId: tableId || getTableCacheSync() || '',
        dineNumber,
        merchantNum: storeInfo.merchantNum
      }
    })
  }

  handleGetAuthor(options) {
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

  getSpecListPrice() {
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

  getSpecList() {
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

  handleUpdateSideList() {
    const { $$materialsSource, basePrice } = this.state
    const sourceData = $$materialsSource.get('materials') || []
    const targetList = []
    let sidePirce = 0
    for (let i = 0; i < sourceData.length; i++) {
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
    const productPrice = Compute.add(basePrice, sidePirce)
    this.setState({
      sideList: targetList,
      productPrice: productPrice
    })
  }

  handleAddCart() {
    const {
      productPrice,
      currentProduct,
      consumeChecked,
      productNumber,
      sideList,
      packPrice
    } = this.state
    const isPack = consumeChecked === '1'
    const totalPrice = Compute.mul(productPrice, productNumber)
    const allPrice = Compute.add(totalPrice, packPrice)
    const specList = this.getSpecList()
    const params = {
      productId: currentProduct.merchantproductId,
      specList,
      totalAmount: allPrice,
      packFlag: isPack,
      chooseSum: productNumber,
      productName: currentProduct.productName,
      sideList: sideList,
      headUrl: currentProduct.headUrl
    }
    requestCreateShoppingCart(params)
      .then(() => {
        this.fetchShopCartList()
        this.setState({
          drawerVisible: false
        })
      })
  }

  handleUpdateCounter({ counter }) {
    this.setState({
      productNumber: counter
    })
  }

  handleUpdateVo({ id, counter, type }) {
    const { $$materialsSource } = this.state
    const result = updateMaterialsSource($$materialsSource, { id, counter })
    const newSource = $$materialsSource.set('materials', result)
    this.setState({
      $$materialsSource: newSource
    }, () => {
      this.handleUpdateSideList(type)
    })
  }

  handleChangeVo({ v, type }) {
    const options = {
      size: 'sizeChecked',
      measure: 'measureChecked',
      flavor: 'flavorChecked',
      pack: 'consumeChecked'
    }
    const change = options[type]
    this.setState({
      [change]: '' + v
    })
    if (type === 'pack') {
      const { productConsumeType } = this.state
      this.setState({
        packPrice: v === '1' ? productConsumeType['price'] : 0
      })
    }
  }

  fetchShopCartList() {
    requestShoppingCartList()
      .then(res => {
        const { shoppingCartList } = res
        this.setState({
          shoppingCartList
        })
      })
  }

  handleShowCart() {
    this.setState({
      showType: 'cart',
      drawerVisible: true
    })
  }

  handlePress () {
    handleNavigateTo({
      path: '/pages/mine/index'
    })
  }

  handleCleanShopCart () {
    cleanShoppingCart()
      .then(() => {
        this.setState({
          shoppingCartList: [],
          drawerVisible: false
        })
      })
  }

  handleUpdateShopCart (data, options) {
    const { shoppingCartId, productId } = data
    const { type } = options
    const params = {
      shoppingCartId,
      productId,
      operation: type === 'add'
    }
    requestCreateShoppingCart(params)
      .then(() => {
        this.fetchShopCartList()
      })
  }

  render() {
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
      productPrice,
      $$materialsSource,
      currentProduct,
      dineNumber,
      phoneInfo,
      shoppingCartList,
      showType,
      productConsumeType,
      packPrice
    } = this.state
    const cartNum = shoppingCartList.length || 0
    const materialsSource = $$materialsSource.get('materials')
    const info = {
      desk: storeInfo.tableNane,
      number: dineNumber,
      showSearch
    }
    const submitClass = showType === 'cart' ? 'hight' : ''
    const allPrice = Compute.add(productPrice, packPrice)
    // const style = {
    //   marginTop: showSearch ? '-70px' : '0px'
    // }
    return (
      <View className='page-container store-page'>
        <View className='container'>
          <Tabar
            {...info}
            onPress={this.handlePress}
          />
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
            onPress={this.handleSubmit}
            onGetAuthor={this.handleGetAuthor}
            phoneInfo={phoneInfo}
            cartNum={cartNum}
            onShowCart={this.handleShowCart}
            className={submitClass}
          />
          <Drawer
            show={drawerVisible}
            onClose={this.handleCloseDrawer}
            direction='bottom'
          >
            {
              showType === 'cart' ? (
                <Cart
                  shoppingCartList={shoppingCartList}
                  onClean={this.handleCleanShopCart}
                  onUpdate={this.handleUpdateShopCart}
                />
              ) : (
                <Board
                  data={{
                    materials: materialsSource,
                    specVoMap,
                    consumeCate: cate,
                    consumeType: productConsumeType
                  }}
                  sizeChecked={sizeChecked}
                  measureChecked={measureChecked}
                  flavorChecked={flavorChecked}
                  consumeChecked={consumeChecked}
                  onAddCart={this.handleAddCart}
                  onCounter={this.handleUpdateCounter}
                  onUpdateVo={this.handleUpdateVo}
                  onChangeVo={this.handleChangeVo}
                  productNumber={productNumber}
                  totalPrice={allPrice}
                  currentProduct={currentProduct}
                />
              )
            }

          </Drawer>
        </View>
      </View>
    )
  }
}

export default StorePage

