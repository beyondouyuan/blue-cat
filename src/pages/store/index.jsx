import { Component } from 'react'
import { View } from '@tarojs/components'
import Taro from '@tarojs/taro'

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
import { cleanShoppingCart, requestCreateShoppingCart, requestProductDimension, requestProductList, requestShoppingCartList } from '../../service/store'
import { queryPhone, requestPhone } from '../../service/user'
import { initSourceData, initMaterialsSource, updateMaterialsSource } from '../../shared/cart'
import Compute from '../../shared/compute'
import { getMerchantCacheSync, getOrderIdCacheSync } from '../../shared/global'
import Merchant from './components/Merchant'

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
      productConsumeType: {},
      sizeName: '',
      measureName: '',
      flavorName: '',
      consumeName: '堂食',
      scrollRef: 'scroll-screent',
      currentIntoView: '',
      currentProductTypeId: '',
      scrollByClick: false,
      currentProductTypeLabel: '',
      isOpenedOverlay: false
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
    this.handleSidebarClick = this.handleSidebarClick.bind(this)
    this.handleUpdateCurrentIntoView = this.handleUpdateCurrentIntoView.bind(this)
    this.handleToggleMerchant = this.handleToggleMerchant.bind(this)
  }

  componentDidMount() {
    this.handleQueryPhone()
    this.handleFetchProduct()
    this.fetchShopCartList()
  }

  componentWillUnmount() { }

  componentDidShow() {
    this.fetchShopCartList()
  }

  componentDidHide() { }

  $instance = getCurrentInstance()
  $merchantCache = getMerchantCacheSync() || {}

  handleQueryPhone() {
    queryPhone()
      .then(res => {
        this.setState({
          phoneInfo: res
        })
      })
  }

  handleFetchProduct() {
    const { merchantNum } = this.$instance.router.params
    const params = {
      merchantNum: merchantNum || this.$merchantCache.merchantNum
    }
    requestProductList(params)
      .then(res => {
        const { productList, sidebarList } = initSourceData(res)
        this.setState({
          sidebarList,
          productList,
          currentIntoView: sidebarList[0].value,
          currentProductTypeId: sidebarList[0].value,
          currentProductTypeLabel: sidebarList[0]?.label ?? ''
        })
      })
  }

  handleOnScroll(data) {
    this.setState({
      showSearch: data.show
    })
    if (this.state.scrollByClick) {
      setTimeout(() => {
        this.setState({
          scrollByClick: false
        })
      }, 200)
      return
    }
    // 若是由点击引起的滚动，则不做以下处理
    const _self = this
    const { sidebarList } = this.state
    const query = Taro.createSelectorQuery()
    query.selectAll('.content-wrapper').boundingClientRect()
    query.selectViewport().scrollOffset()
    query.exec(function (res) {
      const idList = []
      const topList = []
      res[0].map((item) => {
        if (item.top >= 0) {
          topList.push(item.top)
          idList.push(item.id)
        }
      })
      const shiftItem = idList[0]
      const value = shiftItem.match(/\d+/g)[0]
      const target = sidebarList.find((item) => {
        return item.value === +value
      })
      _self.setState({
        currentProductTypeId: +value,
        currentProductTypeLabel: target?.label ?? ''
      })
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
        const sizeChecked = '' + specVoMap?.SIZE?.[0]?.productSpecId ?? ''
        const measureChecked = '' + specVoMap?.MEASURE?.[0]?.productSpecId ?? ''
        const flavorChecked = '' + specVoMap?.FLAVOR?.[0]?.productSpecId ?? ''
        const sizeName = specVoMap?.SIZE?.[0]?.specName ?? ''
        const measureName = specVoMap?.MEASURE?.[0]?.specName ?? ''
        const flavorName = specVoMap?.FLAVOR?.[0]?.specName ?? ''
        this.setState({
          specVoMap,
          $$materialsSource: newSource,
          sizeChecked,
          measureChecked,
          flavorChecked,
          productConsumeType,
          sizeName,
          measureName,
          flavorName
        }, () => {
          const specListPrice = this.getSpecListPrice()
          let productPrice = Compute.add(specListPrice, data.price)
          let packPrice = 0
          let consumeName = '堂食'
          if (consumeChecked === '1') {
            packPrice = +productConsumeType['price'] || 0
            consumeName = '打包'
          }
          this.setState({
            drawerVisible: true,
            productPrice,
            packPrice,
            basePrice: productPrice,
            consumeName
          })
        })
      })
  }

  handleSubmit() {
    const { shoppingCartList } = this.state
    const { tableId, peopleNum, merchantNum, tableName } = this.$instance.router.params
    this.setState({
      drawerVisible: false
    })
    const payTag = this.$merchantCache?.payTag ?? false
    const orderIdCache = getOrderIdCacheSync()
    let isCreate = '1'
    // 若是先下单后支付，且已经下过单，即便没有选择新的商品也可以去下单页面
    if (payTag && orderIdCache && !shoppingCartList.length) {
      isCreate = '0'
    }

    handleNavigateTo({
      path: '/pages/book/index',
      params: {
        tableId: tableId || this.$merchantCache?.tableId || '',
        peopleNum: peopleNum || this.$merchantCache?.peopleNum || '',
        merchantNum: merchantNum || this.$merchantCache?.merchantNum || '',
        tableName: tableName || this.$merchantCache?.tableNane || '',
        isCreate
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
      packPrice,
      productConsumeType
    } = this.state
    const { tableId } = this.$instance.router.params
    const isPack = consumeChecked === '1'
    const totalPrice = Compute.mul(productPrice, productNumber)
    const totalPackPrice = Compute.mul(packPrice, productNumber)
    const allPrice = Compute.add(totalPrice, totalPackPrice)
    const specList = this.getSpecList()
    const params = {
      productId: currentProduct.merchantproductId,
      specList,
      totalAmount: allPrice,
      packFlag: isPack,
      chooseSum: productNumber,
      productName: currentProduct.productName,
      sideList: sideList,
      headUrl: currentProduct.headurl,
      tableId: tableId || this.$merchantCache.tableId || '',
      dabaoAmount: productConsumeType.price || 0
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
    const {
      specVoMap
    } = this.state
    const maps = {
      size: {
        source: 'SIZE',
        name: 'sizeName'
      },
      measure: {
        source: 'MEASURE',
        name: 'measureName',
      },
      flavor: {
        source: 'FLAVOR',
        name: 'flavorName'
      }
    }
    const target = specVoMap[maps[type]?.source]
    const selected = target?.find((item) => {
      return '' + item.productSpecId === '' + v
    })
    const name = maps[type]?.name ?? ''
    this.setState({
      [change]: '' + v
    })
    if (type !== 'pack' && name) {
      this.setState({
        [name]: selected.specName
      })
    }
    if (type === 'pack') {
      const { productConsumeType } = this.state
      this.setState({
        packPrice: v === '1' ? productConsumeType['price'] : 0,
        consumeName: v === '1' ? '打包' : '堂食',
      })
    }
  }

  fetchShopCartList() {
    const { shopCartLoading, showType, drawerVisible } = this.state
    const { tableId } = this.$instance.router.params
    const params = {
      tableId: tableId || this.$merchantCache.tableId || ''
    }
    if (shopCartLoading) return
    this.setState({
      shopCartLoading: true
    })
    requestShoppingCartList(params)
      .then(res => {
        const { shoppingCartList } = res
        if (!shoppingCartList.length && showType === 'cart' && drawerVisible) {
          this.setState({
            drawerVisible: false
          })
        }
        this.setState({
          shoppingCartList
        })
      })
      .catch(() => {
        this.setState({
          shoppingCartList: []
        })
      })
      .finally(() => {
        this.setState({
          shopCartLoading: false
        })
      })
  }

  handleShowCart() {
    this.setState({
      showType: 'cart',
      drawerVisible: true
    })
  }

  handlePress() {
    handleNavigateTo({
      path: '/pages/mine/index'
    })
  }

  handleCleanShopCart() {
    const { tableId } = this.$instance.router.params
    const params = {
      tableId: tableId || this.$merchantCache.tableId || ''
    }
    cleanShoppingCart(params)
      .then(() => {
        this.setState({
          drawerVisible: false
        })
        setTimeout(() => {
          this.setState({
            shoppingCartList: []
          })
        }, 500)
      })
  }

  handleUpdateShopCart(data, options) {
    const { shoppingCartId, productId } = data
    const { type } = options
    const { tableId } = this.$instance.router.params
    const params = {
      shoppingCartId,
      productId,
      tableId: tableId || this.$merchantCache.tableId || '',
      operation: type === 'add'
    }
    requestCreateShoppingCart(params)
      .then(() => {
        this.fetchShopCartList()
      })
  }

  handleSwitchMember() {
    handleNavigateTo({
      path: '/pages/member/index'
    })
  }

  handleSidebarClick(item) {
    this.handleUpdateCurrentIntoView(item.value)
  }

  handleUpdateCurrentIntoView(v) {
    const { currentIntoView, sidebarList } = this.state
    if (v === currentIntoView) return
    const target = sidebarList.find((item) => {
      return item.value === currentIntoView
    })
    this.setState({
      currentIntoView: v,
      scrollByClick: true,
      currentProductTypeId: v,
      currentProductTypeLabel: target?.label ?? ''
    })
  }

  handleToggleMerchant() {
    this.setState(prevState => ({
      isOpenedOverlay: !prevState.isOpenedOverlay
    }))
  }

  render() {
    const {
      showSearch,
      drawerVisible,
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
      phoneInfo,
      shoppingCartList,
      showType,
      productConsumeType,
      packPrice,
      sizeName,
      measureName,
      flavorName,
      consumeName,
      scrollRef,
      currentIntoView,
      currentProductTypeId,
      currentProductTypeLabel,
      isOpenedOverlay
    } = this.state
    const cartNum = shoppingCartList.length || 0
    const materialsSource = $$materialsSource.get('materials')
    const { tableNane, peopleNum } = this.$merchantCache
    const info = {
      tableName: tableNane,
      number: peopleNum,
      showSearch
    }
    const submitClass = showType === 'cart' ? 'hight' : ''
    const allPrice = Compute.add(productPrice, packPrice)
    const style = {
      marginTop: showSearch ? '-70px' : '0px'
    }
    const merchantData = {
      address: this.$merchantCache.address,
      linkPhone: this.$merchantCache.linkPhone
    }
    return (
      <View className='page-container store-page'>
        <View className='container'>
          <Tabar
            {...info}
            onPress={this.handlePress}
            onMember={this.handleSwitchMember}
          />
          <View className='body' style={style}>
            <Action
              onMember={this.handleSwitchMember}
              onToggle={this.handleToggleMerchant}
              isOpenedOverlay={isOpenedOverlay}
            />
            <View className='main'>
              <Sidebar
                sourceData={sidebarList}
                onSidebar={this.handleSidebarClick}
                currentIntoView={currentProductTypeId}
              />
              <View className='list-wrapper'>
                <View className='list-wrapper__title'>{currentProductTypeLabel}</View>
                <Content
                  sourceData={productList}
                  onScroll={this.handleOnScroll}
                  onSelect={this.handleSelect}
                  scrollRef={scrollRef}
                  currentIntoView={currentIntoView}
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
          <Merchant
            isOpenedOverlay={isOpenedOverlay}
            data={merchantData}
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
                  sizeName={sizeName}
                  measureName={measureName}
                  flavorName={flavorName}
                  consumeName={consumeName}
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

