import { createStore } from 'vuex'

//在本地通过localStorage存储商品信息
const setLocalStorage = (state) => {
  const cartList = state.cartList
  const cartListString = JSON.stringify(cartList)
  localStorage.cartList = cartListString
}

//初始化通过localStorage获取商品信息
const getLocalStorage = () => {
  let cartList = localStorage.cartList
  if (cartList) {
    return JSON.parse(localStorage.cartList)
  } else {
    return {}
  }
}

export default createStore({
  state: {
    cartList: getLocalStorage()
    // shopId: {
    //   shopName: '',
    //   productList: {
    //     productId: {}
    //     ....
    //   }
    // }
    // shopId: {
    //   shopName: '',
    //   productList: {
    //     productId: {}
    //     ....
    //   }
    // }
  },
  mutations: {
    //购物车加减数据
    changeItemToCart(state, payload) {
      const { shopId, product, num } = payload;
      //判断productInfo存不存在，如果存在，但是productInfo不一定存在
      let shopInfo = state.cartList[shopId].productList
      if (!shopInfo) {
        shopInfo = {}
      }
      //判断productInfo存不存在，如果不存在那count也一定不存在
      let productInfo = shopInfo[product._id]
      if (!productInfo) {
        productInfo = product
        productInfo.count = 0
      }
      //处理count的数量
      productInfo.count += num
      productInfo.checked = true
      //判断处理完的数量如果少于0了，就等于0
      if (productInfo.count <= 0) {
        productInfo.count = 0;
        productInfo = null;
      }
      state.cartList[shopId].productList = shopInfo
      state.cartList[shopId].productList[product._id] = productInfo
      setLocalStorage(state)
    },
    //改变商店名
    changeShopName(state, data) {
      const { shopId, shopName } = data
      const shopInfo = state.cartList[shopId] || {
        shopName: '',
        productList: {}
      }
      shopInfo.shopName = shopName
      state.cartList[shopId] = shopInfo
      setLocalStorage(state)
    },
    //点击勾选和取消购物车的商品
    changeProductCheck(state, payload) {
      const { shopId, productId } = payload
      state.cartList[shopId].productList[productId].checked = !state.cartList[shopId].productList[productId].checked
      setLocalStorage(state)
    },
    //全选或清空购物车
    clearOrAllCart(state, payload) {
      if (payload.type == 'clear') {
        state.cartList[payload.shopId] = {}
      } else {
        //判断购物车目前是什么状态，如果已经是全选则改为非全选
        let allCheck = true
        if (payload.isAllChecked == true) {
          allCheck = false
        }
        for (let index in state.cartList[payload.shopId].productList) {
          if (state.cartList[payload.shopId].productList[index]) state.cartList[payload.shopId].productList[index].checked = allCheck
        }
      }
      setLocalStorage(state)
    },
    //发送请求后清空对应的商品
    clearShop(state, payload) {
      const { productList, shopId } = payload
      const list = state.cartList[shopId].productList
      // for(let index in list) {
      //   if(list[index].checked) {
      //     list[index] = null
      //   }
      // }
      //循环遍历，找出已经创建了订单的产品，把他们从state中移除
      for (let index in list) {
        if (list[index] != null) {
          for (let j in productList) {
            if ( list[index] != null && list[index].name == productList[j].name) {
              list[index] = null
            }
          }
        }
      }
      state.cartList[shopId].productList = list
      setLocalStorage(state)
    }
  },
  actions: {
  },
  modules: {
  }
})
