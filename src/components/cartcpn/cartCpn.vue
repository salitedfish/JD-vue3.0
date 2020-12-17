<template>
  <div>
    <!-- 以下为弹出的购物车组件 -->
    <div class="check_detail" v-show="showCheckDetail">
      <!-- 购物车的顶部 -->
      <div class="cart_header">
        <div
          class="cart_all"
          v-on:click="clearOrAllCart(shopId, 'all', isAllChecked)"
        >
          <span class="cart_all-check iconfont" v-show="isAllChecked"
            >&#xe613;</span
          >
          <span class="cart_all-check iconfont" v-show="!isAllChecked"
            >&#xe65a;</span
          >
          全选
        </div>
        <div class="cart_clear">
          <span
            class="cart_clear_btn"
            v-on:click="clearOrAllCart(shopId, 'clear')"
            >清空购物车</span
          >
        </div>
      </div>
      <!-- 购物车列表项 -->
      <div class="right_item" v-for="item in cartTopList" :key="item._id">
        <div
          class="product_item_check iconfont"
          v-html="item.checked ? '&#xe613;' : '&#xe65a;'"
          v-on:click="changeProductCheck(shopId, item._id)"
        ></div>
        <img :src="item.imgUrl" class="right_item_img" />
        <div class="right_item_text">
          <h4 class="text_title">{{ item.name }}</h4>
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
              @click="changeItemToCart(shopId, item, -1)"
              >-</span
            >
            {{ item.count || 0 }}
            <span class="number_plus" @click="changeItemToCart(shopId, item, 1)"
              >+</span
            >
          </div>
        </div>
      </div>
    </div>
    <!-- 购物车蒙层 -->
    <div
      class="mask"
      v-show="showCheckDetail"
      @click="changeShowCheckDetail()"
    ></div>
    <!-- 以下为底部购物车组件 -->
    <div class="cart_cpn">
      <div class="check">
        <div class="check_icon">
          <img
            src="http://www.dell-lee.com/imgs/vue3/basket.png"
            alt=""
            class="check_icon_img"
            @click="changeShowCheckDetail()"
          />
          <div class="check_icon_num">{{ totalCount }}</div>
        </div>
        <div class="check_info">
          总计：
          <span class="check_info_price">&yen; {{ totalPrice }}</span>
        </div>
        <div class="check_btn" @click="gotoOrderComfirm(shopId)">
          去结算
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { computed, reactive, ref } from 'vue'
import { useRoute,useRouter } from 'vue-router'
import { useStore } from 'vuex'

export default {
  name: 'cartCpn',
  setup() {
    const store = useStore()
    const router = useRouter()
    const shopId = useRoute().params.id
    const cartList = store.state.cartList
    //获取本商店的选取商品总数
    const totalCount = computed(() => {
      const productList = cartList[shopId]?.productList
      let count = 0
      if (productList) {
        for (let i in productList) {
          if (productList[i]) {
            count += productList[i].count
          }
        }
      }
      return count
    })
    //获取本商店的选取商品的总金额
    const totalPrice = computed(() => {
      const productList = cartList[shopId]?.productList
      let price = 0
      if (productList) {
        for (let i in productList) {
          //判断购物车被勾选上才加钱
          if (productList[i] && productList[i].checked) {
            price += productList[i].count * productList[i].price
          }
        }
      }
      return price.toFixed(2)
    })
    //获取购物车列表数据
    const cartTopList = computed(() => {
      let productList = {}
      if (!cartList[shopId] || !cartList[shopId].productList) {
        productList = {}
      } else {
        const list = {}
        for (let index in cartList[shopId].productList) {
          if (cartList[shopId].productList[index]) {
            list[index] = cartList[shopId].productList[index]
          }
        }
        productList = list
      }
      return productList
    })
    //购物车详情内加减物品个数
    const changeItemToCart = (shopId, product, num) => {
      store.commit('changeItemToCart', { shopId, product, num })
    }
    //点击显示影藏购物车详情
    let showCheckDetail = ref(false)
    const changeShowCheckDetail = () => {
        showCheckDetail.value = !showCheckDetail.value
    }
    //改变store内购物车checked字段的值
    const changeProductCheck = (shopId, productId, isAllChecked) => {
      store.commit('changeProductCheck', { shopId, productId, isAllChecked })
    }
    //购物车全选相关
    const isAllChecked = computed(() => {
      let result = true
      for (let index in cartList[shopId]?.productList) {
        //判断购物车列表里是否存在checked=false，有的话，把全选变为false
        if (
          cartList[shopId].productList[index] &&
          cartList[shopId].productList[index].checked == false
        ) {
          result = false
        }
      }
      return result
    })
    //清空购物车
    const clearOrAllCart = (shopId, type, isAllChecked) => {
      store.commit('clearOrAllCart', { shopId, type, isAllChecked })
    }
    //跳转到订单确认页面 
    const gotoOrderComfirm = (shopId)=>{
      if(totalPrice.value == 0) {
        console.log('您必须选择一件商品')
      }else {
        router.push(`/ordercomfirm/${shopId}`)
      }
    }
    //导出需要的变量
    return {
      totalCount,
      totalPrice,
      cartTopList,
      shopId,
      changeItemToCart,
      showCheckDetail,
      changeShowCheckDetail,
      changeProductCheck,
      clearOrAllCart,
      isAllChecked,
      gotoOrderComfirm
    }
  },
}
</script>

<style lang="scss">
@import '../../style/viriables.scss';
.check_detail {
  overflow-y: scroll;
  flex: 1;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0.5rem;
  background-color: #fff;
  z-index: 10;
  //蒙层
  .cart_header {
    display: flex;
    line-height: 0.52rem;
    border-bottom: 0.01rem solid #f1f1f1;
    .cart_all {
      width: 0.65rem;
      font-size: 0.16rem;
      margin-left: 0.16rem;
      .cart_all-check {
        font-size: 0.2rem;
        color: #0091ff;
        margin-right: 0.05rem;
        vertical-align: center;
      }
    }
    .cart_clear {
      flex: 1;
      text-align: right;
      padding-right: 0.16rem;
      font-size: 0.16rem;
      color: #333;
      z-index: 10;
      .cart_clear_btn {
        display: inline-block;
      }
    }
  }
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
.mask {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 0;
}
.cart_cpn {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
  height: 0.5rem;
  z-index: 20;
  background-color: #fff;
  .check {
    display: flex;
    height: 0.49rem;
    line-height: 0.49rem;
    border-top: 0.01rem solid #f1f1f1;

    .check_icon {
      position: relative;
      width: 0.84rem;
      img {
        display: block;
        margin: 0.12rem auto;
        width: 0.28rem;
        height: 0.26rem;
      }
      .check_icon_num {
        position: absolute;
        top: 0.03rem;
        right: 0.2rem;
        min-width: 0.2rem;
        height: 0.2rem;
        border-radius: 0.1rem;
        background-color: #e93b3b;
        color: #fff;
        line-height: 0.2rem;
        text-align: center;
        transform: scale(0.5, 0.5);
        transform-origin: right center;
      }
    }
    .check_info {
      flex: 1;
      color: #333;
      font-size: 0.12rem;
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
    }
  }
}
</style>