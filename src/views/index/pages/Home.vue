<template>
  <div id="home">
    <div class="wrapper">
      <!-- 以下是定位区域---------------------------------------------------------- -->
      <div class="position">
        <span class="iconfont position_icon">&#xe60f;</span>
        北京理工大学国防科技园2号楼10层
        <span class="iconfont position_notice">&#xe62e;</span>
      </div>
      <!-- 以下是搜索框区域-------------------------------------------------------- -->
      <div class="search">
        <span class="iconfont search_icon">&#xe609;</span>
        <input type="text" placeholder="山姆会员商品优惠商品" />
      </div>
      <!-- 以下是banner区域-------------------------------------------------------- -->
      <div class="banner">
        <img src="http://www.dell-lee.com/imgs/vue3/banner.jpg" alt="" />
      </div>
      <!-- 以下是菜单区域---------------------------------------------------------- -->
      <div class="icons">
        <div class="icons_item" v-for="(item, index) in iconsList" :key="index">
          <img :src="item.src" alt="" class="icons_item_img" />
          <p class="icon_item_text">{{ item.text }}</p>
        </div>
      </div>
      <!-- 以下是灰条区域---------------------------------------------------------- -->
      <div class="gap"></div>
      <!-- 以下为附近商铺区域------------------------------------------------------ -->
      <div class="nearmall">
        <h3 class="nearmall_title">附近店铺</h3>
        <div
          class="nearmall_item"
          v-for="(item, index) in mallList"
          :key="index"
        >
          <img :src="item.src" alt="" class="nearmall_item_img" />
          <div class="nearmall_item_text">
            <div class="nearmall_item_title">{{ item.title }}</div>
            <div class="nearmall_tags">
              <span
                class="nearmall_tag"
                v-for="(tagItem, index) in item.tags"
                :key="index"
              >
                {{ tagItem }}
              </span>
            </div>
            <p class="nearmall_highlight">{{ item.highlight }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue'
export default {
  name: 'home',
  setup() {
    const iconsList = reactive([
      {
        src: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        text: '超市便利',
      },
      {
        src: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        text: '超市便利',
      },
      {
        src: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        text: '超市便利',
      },
      {
        src: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        text: '超市便利',
      },
      {
        src: 'http://www.dell-lee.com/imgs/vue3/超市.png',
        text: '超市便利',
      },
    ])
    const mallList = reactive([
      {
        src: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售十万+', '月售十万+', '月售十万+'],
        highlight: 'VIP尊享',
      },
      {
        src: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售十万+', '月售十万+', '月售十万+'],
        highlight: 'VIP尊享',
      },
      {
        src: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售十万+', '月售十万+', '月售十万+'],
        highlight: 'VIP尊享',
      },
      {
        src: 'http://www.dell-lee.com/imgs/vue3/near.png',
        title: '沃尔玛',
        tags: ['月售十万+', '月售十万+', '月售十万+'],
        highlight: 'VIP尊享',
      },
    ])
    return {
      iconsList,
      mallList,
    }
  },
}
</script>

<style lang="scss">
@import '../../../style/viriables.scss';

.wrapper {
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0.5rem;
  right: 0;
  // background-color: green;
  padding: 0 0.18rem 0.2rem 0.18rem;
  overflow-y: auto;
  // <!-- 以下是定位区域---------------------------------- -->
  .position {
    padding: 0.16rem 0;
    line-height: 0.22rem;
    font-size: 0.16rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    margin-right: 0.24rem;
    color: $content-font-color;
    .position_icon {
      position: relative;
      top: 0.02rem;
      font-size: 0.2rem;
    }
    .position_notice {
      position: absolute;
      right: 0.18rem;
      top: 0.17rem;
      font-size: 0.2rem;
    }
  }
  // <!-- 以下是搜索框区域-------------------------------- -->
  .search {
    position: relative;
    box-sizing: border-box;
    height: 0.32rem;
    line-height: 0.32rem;
    background-color: #f5f5f5;
    border-radius: 0.16rem;
    width: 100%;
    padding: 0 0.3rem 0 0.5rem;
    font-size: 0.14rem;
    .search_icon {
      position: absolute;
      top: 0.01rem;
      left: 0.25rem;
    }
    input {
      border: none;
      outline: none;
      width: 100%;
      height: 0.15rem;
      background-color: #f5f5f5;
    }
  }
  // <!-- 以下是banner区域-------------------------------- -->
  .banner {
    margin-top: 0.1rem;
    height: 0;
    overflow: hidden;
    padding-bottom: 25.4%;
    img {
      width: 100%;
    }
  }
  // <!-- 以下是菜单区域---------------------------------- -->
  .icons {
    margin-top: 0.16rem;
    display: flex;
    flex-wrap: wrap;
    .icons_item {
      text-align: center;
      width: 20%;
      .icons_item_img {
        width: 0.4rem;
      }
      .icon_item_text {
        margin-top: 0.06rem;
        margin-bottom: 0.16rem;
      }
    }
  }
  // <!-- 以下是灰条区域---------------------------------- -->
  .gap {
    margin: 0 -0.18rem;
    height: 0.1rem;
    background-color: #f1f1f1;
  }
  // <!-- 以下是附近商铺区域---------------------------------- -->
  .nearmall {
    .nearmall_title {
      margin: 0.16rem 0 0.02rem 0;
      font-size: 0.18rem;
      color: #333;
      font-weight: normal;
    }
    .nearmall_item {
      display: flex;
      padding-top: 0.12rem;
      .nearmall_item_img {
        width: 0.56rem;
        height: 0.56rem;
        margin-right: 0.16rem;
      }
      .nearmall_item_text {
        flex: 1;
        border-bottom: 1px solid #f1f1f1;
        padding-bottom: 0.12rem;
        .nearmall_item_title {
          line-height: 0.22rem;
          font-size: 0.16rem;
        }
        .nearmall_tags {
          margin-top: 0.08rem;
          line-height: 0.18rem;
          font-size: 0.13rem;
          color: #333;
          .nearmall_tag {
            margin-right: 0.16rem;
          }
        }
        .nearmall_highlight {
          color: #e93b3b;
          margin: 0.08rem 0 0 0;
          line-height: 0.18rem;
          font-size: 0.13rem;
        }
      }
    }
  }
}
</style>
