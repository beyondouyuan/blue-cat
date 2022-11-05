export function initSourceData(sourceData) {
  const sidebarList = []
  const productList = []
  for (let i = 0; i < sourceData.length; i++) {
    const item = sourceData[i]
    const sidebarTarget = {
      label: item['typeName'],
      value: item['productTypeId']
    }
    const list = item['productList'] || []
    list.forEach(child => {
      return {
        ...child,
        total: 0
      }
    })
    const productTarget = {
      list: list,
      value: item['productTypeId']
    }
    sidebarList.push(sidebarTarget)
    productList.push(productTarget)
  }

  return {
    productList,
    sidebarList
  }
}

export function initMaterialsSource (sourceData) {
  sourceData.forEach(item => {
    item.num = 0
    return item
  })
  return sourceData
}

export function updateMaterialsSource ($$sourceData, params) {
  const list = $$sourceData.get('materials')
  const { counter, id } = params
  list.forEach(item => {
    if (item.id === id) {
      item.num = counter
    }
    return item
  })
  return list
}