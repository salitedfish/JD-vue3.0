<template>
  <div>
    <div class="wrapper">
      <!-- 以下为顶部区域 -->
      <div class="top">
        <div class="top_header">
          <div class="iconfont top_header_back" @click="backDetail">
            &#xe60a;
          </div>
          确认订单
        </div>
        <div class="top_receiver">
          <div class="top_receiver_header">收货地址</div>
          <div class="top_receiver_address">某省某市莫县</div>
          <div class="top_receiver_info">
            <span class="info_name">某某某</span>
            <span class="info_phone">110119120</span>
          </div>
          <div class="iconfont top_receiver_enter">&#xe60a;</div>
        </div>
      </div>
      <!-- 以下为商品详情 -->
      <div class="products">
        <!-- 下面为商店名 -->
        <div class="products_title">{{ shopName }}</div>
        <!-- 下面为商品列表 -->
        <div class="products_list">
          <div class="right_item" v-for="item in productList" :key="item._id">
            <img :src="item.imgUrl" class="right_item_img" />
            <div class="right_item_text">
              <h4 class="text_title">{{ item.name }}</h4>
              <p class="text_price">
                <span class="text_price_yen">
                  <span class="yen">&yen;</span>{{ item.price }}</span
                >
                <span class="text_price_origin"
                  ><span class="yen_origin">&times;</span>{{ item.count }}</span
                >
              </p>
            </div>
            <div class="right_item_totalPrice">
              <span>&yen;</span>{{ (item.price * item.count).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
      <div class="products">
        <!-- 下面为商店名 -->
        <div class="products_title">{{ shopName }}</div>
        <!-- 下面为商品列表 -->
        <div class="products_list">
          <div class="right_item" v-for="item in productList" :key="item._id">
            <img :src="item.imgUrl" class="right_item_img" />
            <div class="right_item_text">
              <h4 class="text_title">{{ item.name }}</h4>
              <p class="text_price">
                <span class="text_price_yen">
                  <span class="yen">&yen;</span>{{ item.price }}</span
                >
                <span class="text_price_origin"
                  ><span class="yen_origin">&times;</span>{{ item.count }}</span
                >
              </p>
            </div>
            <div class="right_item_totalPrice">
              <span>&yen;</span>{{ (item.price * item.count).toFixed(2) }}
            </div>
          </div>
          <div class="right_item" v-for="item in productList" :key="item._id">
            <img :src="item.imgUrl" class="right_item_img" />
            <div class="right_item_text">
              <h4 class="text_title">{{ item.name }}</h4>
              <p class="text_price">
                <span class="text_price_yen">
                  <span class="yen">&yen;</span>{{ item.price }}</span
                >
                <span class="text_price_origin"
                  ><span class="yen_origin">&times;</span>{{ item.count }}</span
                >
              </p>
            </div>
            <div class="right_item_totalPrice">
              <span>&yen;</span>{{ (item.price * item.count).toFixed(2) }}
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- 以下为地址tabbar -->
    <div class="cart_cpn">
      <div class="check">
        <div class="check_info">
          实际金额：
          <span class="check_info_price"
            >&yen; {{ totalPrice.toFixed(2) }}</span
          >
        </div>
        <div class="check_btn">
          <div @click="changeShowMask">去支付</div>
        </div>
      </div>
    </div>
    <!-- //以下为确认订单弹窗 -->
    <mask-popup
      title="确认要离开收银台？"
      desc="请尽快完成支付，否则将被取消"
      cancel="取消订单"
      comfirm="确认订单"
      v-if="showMask"
      @changeShowMask="createOrder(true)"
      @comfirmOrder="createOrder(false)"
    ></mask-popup>
  </div>
</template>

<script>
import { post } from '../../utils/request.js'
import MaskPopup from '../../components/mask/mask.vue'
import { ref } from 'vue'
import { useStore } from 'vuex'
import { useRoute, useRouter } from 'vue-router'
export default {
  components: {
    MaskPopup,
  },
  setup() {
    const store = useStore()
    const route = useRoute()
    const router = useRouter()
    const shopId = parseInt(route.params.id, 10)
    //因为在商品详情页面已经做过判断，必须要有商品选中才能跳转到结算页面
    const shopName = store.state.cartList[shopId].shopName
    //将商品数据不是null的商品放到productList里面
    const productList = {}
    const list = store.state.cartList[shopId].productList
    for (let i in list) {
      if (list[i] != null && list[i].checked) {
        productList[i] = list[i]
      }
    }
    //获取总金额
    const totalPrice = ref(0)
    for (let index in productList) {
      totalPrice.value += productList[index].price * productList[index].count
    }
    //mask弹出和影藏
    const showMask = ref(false)
    const changeShowMask = () => {
      showMask.value = !showMask.value
    }
    //用户确认或取消订单
    const createOrder = (type) => {
      showMask.value = !showMask.value
      const products = []
      for (let i in productList) {
        products.push({
          id: parseInt(productList[i]._id, 10),
          num: productList[i].count,
        })
      }
      post('/api/order', {
        addressId: 1,
        shopId,
        shopName,
        isCanceled: type,
        products,
      })
        .then(() => {
          router.push('/order')
          store.commit('clearShop', { productList, shopId })
        })
        .catch(() => {})
    }
    //点击返回商品详情
    const backDetail = () => {
      router.push(`/malldetail/${shopId}`)
    }
    return {
      backDetail,
      shopName,
      productList,
      totalPrice,
      showMask,
      changeShowMask,
      createOrder,
    }
  },
}
</script>

<style lang="scss">
.wrapper {
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #eee;
  overflow-y: scroll;
  padding-bottom: 0.6rem;
  .top {
    position: relative;
    height: 1.96rem;
    background-size: 100% 1.59rem;
    background-image: linear-gradient(
      0deg,
      rgba(0, 145, 255, 0) 4%,
      #0091ff 50%
    );
    background-repeat: no-repeat;

    .top_header {
      position: relative;
      padding-top: 0.25rem;
      line-height: 0.24rem;
      color: #fff;
      text-align: center;
      font-size: 0.16rem;
      .top_header_back {
        position: absolute;
        left: 0.18rem;
        font-size: 0.22rem;
      }
    }
    .top_receiver {
      position: absolute;
      left: 0.18rem;
      right: 0.18rem;
      bottom: 0;
      height: 1.11rem;
      background-color: #fff;
      border-radius: 0.04rem;
      .top_receiver_header {
        line-height: 0.22rem;
        padding: 0.16rem 0 0.14rem 0.16rem;
        font-size: 0.16rem;
        color: #333;
      }
      .top_receiver_address {
        line-height: 0.2rem;
        padding: 0 0.4rem 0 0.16rem;
        font-size: 0.14rem;
        color: #333;
      }
      .top_receiver_info {
        padding: 0.06rem 0 0 0.16rem;
        color: #666;

        .info_name {
          font-size: 0.12rem;
          line-height: 0.18rem;
          margin-right: 0.06rem;
        }
      }
      .top_receiver_enter {
        position: absolute;
        right: 0.16rem;
        top: 0.55rem;
        color: #666;
        font-size: 0.16rem;
        transform: rotate(180deg);
      }
    }
  }
  .products {
    position: relative;
    background-color: #fff;
    margin: 0.15rem 0.18rem 0 0.18rem;
    border-radius: 0.04rem;

    .products_title {
      // position: absolute;
      top: 0;
      right: 0;
      left: 0;
      background-color: #fff;
      z-index: 100;
      font-size: 0.16rem;
      line-height: 0.5rem;
      padding-left: 0.2rem;
      border-bottom: 0.01rem solid #f1f1f1;
    }
    .products_list {
      max-height: 3.5rem;
      overflow-y: scroll;
      .right_item {
        position: relative;
        display: flex;
        padding: 0.12rem 0;
        margin: 0 0.16rem;
        border-bottom: 0.01rem solid #f1f1f1;
        z-index: 10;
        .product_item_check {
          color: #0091ff;
          font-size: 0.2rem;
          line-height: 0.5rem;
          margin-right: 0.1rem;
        }
        .right_item_img {
          width: 0.46rem;
          height: 0.46rem;
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
          .text_price {
            margin: 0.06rem 0 0 0;
            color: #e93b3b;
            .text_price_yen {
              margin: 0;
              line-height: 0.2rem;
              font-size: 0.14rem;
              margin-right: 0.05rem;
              .yen {
                font-size: 0.12rem;
              }
            }
            .text_price_origin {
              font-size: 0.14rem;
              line-height: 0.2rem;
            }
          }
        }
        .right_item_totalPrice {
          position: absolute;
          right: 0.1rem;
          top: 0.3rem;
          font-size: 0.16rem;
          color: #000;
          span {
            font-size: 0.12rem;
          }
        }
      }
    }
  }
}
.cart_cpn {
  box-sizing: border-box;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0rem;
  height: 0.5rem;
  z-index: 20;
  background-color: #fff;
  .check {
    display: flex;
    height: 0.49rem;
    line-height: 0.49rem;
    border-top: 0.01rem solid #f1f1f1;
    .check_info {
      flex: 1;
      color: #333;
      font-size: 0.16rem;
      padding-left: 0.3rem;
      .check_info_price {
        color: #e93b3b;
        font-size: 0.18rem;
        font-weight: bold;
      }
    }
    .check_btn {
      width: 0.98rem;
      background-color: #4fb0f9;
      text-align: center;
      color: #fff;
      a {
        color: #fff;
        text-decoration: none;
      }
    }
  }
}
</style>