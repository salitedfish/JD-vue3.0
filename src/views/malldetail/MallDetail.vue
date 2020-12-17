<template>
  <div>
    <!-- //--------------------------------------------------- -->
    <div class="malldetail">
      <div class="search">
        <div class="search_back iconfont" @click="backToHome">&#xe60a;</div>
        <div class="search_content">
          <span class="search_icon iconfont">&#xe609;</span>
          <input
            class="search_input"
            type="text"
            placeholder="请输入商品名称"
          />
        </div>
      </div>
      <shop :item="data.item" v-if="data.item.imgUrl"></shop>
    </div>
    <!-- //---------------------------------------------------- -->
    <div class="goodList">
      <div class="left">
        <div
          class="left_item"
          :class="{ 'left_item-checked': goodList.leftList == 'all' }"
          @click="getGoodList('all')"
        >
          全部商品
        </div>
        <div
          class="left_item"
          :class="{ 'left_item-checked': goodList.leftList == 'seckill' }"
          @click="getGoodList('seckill')"
        >
          秒杀
        </div>
        <div
          class="left_item"
          :class="{ 'left_item-checked': goodList.leftList == 'fruit' }"
          @click="getGoodList('fruit')"
        >
          新鲜水果
        </div>
      </div>
      <div class="right">
        <div
          class="right_item"
          v-for="item in goodList.rightList"
          :key="item._id"
        >
          <img :src="item.imgUrl" class="right_item_img" />
          <div class="right_item_text">
            <h4 class="text_title">{{ item.name }}</h4>
            <p class="text_sales">月售{{ item.sales }}份</p>
            <p class="text_price">
              <span class="text_price_yen">
                <span class="yen">&yen;</span>{{ item.price }}</span
              >
              <span class="text_price_origin"
                ><span class="yen_origin">&yen;</span>{{ item.oldPrice }}</span
              >
            </p>
            <div class="good_number">
              <span
                class="number_minus"
                @click="changeItemToCart(shopId, item, -1, shopName)"
                >-</span
              >
              {{ getProductCount(cartList, shopId, item._id) }}
              <span
                class="number_plus"
                @click="changeItemToCart(shopId, item, 1, shopName)"
                >+</span
              >
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- //----------------------------------------------------- -->
    <cart-cpn></cart-cpn>
  </div>
</template>

<script>
import { reactive, toRefs,computed,ref} from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { useStore } from 'vuex'
import { get } from '../../utils/request.js'
import Shop from '../../components/shop/shop.vue'
import cartCpn from '../../components/cartcpn/cartCpn.vue'
//获取商家详情数据
const useMallDetailEffect = () => {
  const route = useRoute()
  const data = reactive({
    item: {},
  })
  get(`/api/shop/${route.params.id}`)
    .then((res) => {
      if (res.errno === 0 && res.data) {
        data.item = res.data
      } else {
        console.log('请求失败')
      }
    })
    .catch(() => {
      console.log('请求错误')
    })
    return { data }
}
//返回上一页
const useBackToHomeEffect = () => {
  const router = useRouter()
  const backToHome = () => {
    router.push('/home')
  }
  return { backToHome }
}
//获取商品详细数据
const useGetGoodListEffect = (id) => {
  const goodList = reactive({
    leftList: '',
    rightList: [],
  })
  //发送请求获取产品列表
  const getGoodList = (tab) => {
    goodList.leftList = tab
    get(`/api/shop/${id}/products`, {
      tab,
    })
      .then((res) => {
        if (res.errno == 0 && res.data) {
          goodList.rightList = res.data
        } else {
          console.log('请求失败')
        }
      })
      .catch(() => {
        console.log('请求错误')
      })
  }
  //获取每个产品的件数
  const getProductCount = (cartList, shopId, productId) => {
    return cartList[shopId]?.productList?.[productId]?.count || 0
  }
  return {
    goodList,
    getGoodList,
    getProductCount,
  }
}
//从store获取购物车列表，改变购物车数量
const useCartEffect = () => {
  const store = useStore()
  let cartList = reactive(store.state.cartList)
  const changeItemToCart = (shopId, product, num, shopName) => {
    store.commit('changeShopName', { shopId, shopName })
    store.commit('changeItemToCart', { shopId, product, num })
  }
  return { cartList, changeItemToCart }
}

export default {
  name: 'MallDetail',
  components: {
    Shop,
    cartCpn,
  },
  setup() {
    const route = useRoute()
    const shopId = route.params.id
    //调用获取商家详情数据
    const { data } = useMallDetailEffect()
    const shopName = computed(()=>{
      return data.item.name
    })
    //返回上一页的方法
    const { backToHome } = useBackToHomeEffect()
    //获取具体产品数据
    const { goodList, getGoodList, getProductCount } = useGetGoodListEffect(
      shopId
    )
    getGoodList('all')
    //从store获取购物车列表，改变购物车数量
    const { cartList, changeItemToCart } = useCartEffect()
    //导出模板需要的数据
    return {
      data,
      backToHome,
      getGoodList,
      goodList,
      cartList,
      shopId,
      shopName,
      changeItemToCart,
      getProductCount,
    }
  },
}
</script>

<style lang="scss">
@import '../../style/iconfont.scss';
.malldetail {
  padding: 0 0.18rem;
  .search {
    margin: 0.2rem 0 0.16rem 0;
    display: flex;
    height: 0.32rem;
    line-height: 0.32rem;
    .search_back {
      width: 0.3rem;
      font-size: 0.2rem;
    }
    .search_content {
      display: flex;
      flex: 1;
      border-radius: 0.16rem;
      background-color: #f5f5f5;
      .search_icon {
        width: 0.4rem;
        text-align: center;
      }
      .search_input {
        outline: none;
        background-color: #f5f5f5;
        border: none;
        width: 75%;
      }
    }
  }
}
.goodList {
  display: flex;
  position: absolute;
  top: 1.66rem;
  bottom: .5rem;
  width: 100%;
  .left {
    overflow-y: scroll;
    width: 0.76rem;
    background-color: #f5f5f5;
    .left_item {
      line-height: 0.4rem;
      text-align: center;
      font-size: 0.14rem;
      color: #333;
      &-checked {
        background-color: #fff;
      }
    }
  }
  .right {
    overflow-y: scroll;
    flex: 1;
    .right_item {
      position: relative;
      display: flex;
      padding: 0.12rem 0;
      margin: 0 0.16rem;
      border-bottom: 0.01rem solid #f1f1f1;
      .right_item_img {
        width: 0.68rem;
        height: 0.68rem;
        margin-right: 0.16rem;
      }
      .right_item_text {
        overflow: hidden;
        .text_title {
          line-height: 0.2rem;
          font-size: 0.14rem;
          color: #333;
          margin: 0;
          overflow: hidden;
          white-space: nowrap;
          text-overflow: ellipsis;
        }
        .text_sales {
          margin: 0.06rem 0;
          line-height: 0.16rem;
          font-size: 0.12rem;
          color: #333;
        }
        .text_price {
          margin-bottom: 0;
          .text_price_yen {
            margin: 0;
            line-height: 0.2rem;
            font-size: 0.14rem;
            color: #e93b3b;
            margin-right: 0.05rem;
            .yen {
              font-size: 0.12rem;
            }
          }
          .text_price_origin {
            font-size: 0.12rem;
            line-height: 0.2rem;
            color: #999;
            text-decoration: line-through;
          }
        }
        .good_number {
          position: absolute;
          right: 0rem;
          bottom: 0.1rem;
          font-size: 0.2rem;
          .number_minus,
          .number_plus {
            display: inline-block;
            width: 0.2rem;
            height: 0.2rem;
            border-radius: 50%;
            text-align: center;
            line-height: 0.18rem;
          }
          .number_minus {
            border: 0.01rem solid #666;
            color: #666;
            margin-right: 0.05rem;
          }
          .number_plus {
            background-color: #0091ff;
            color: #fff;
            margin-left: 0.05rem;
          }
        }
      }
    }
  }
}
</style>