<template>
  <div class="tabbar">
    <span
      class="tabbar_item"
      :class="{ 'tabbar_item-checked': index == isChecked }"
      v-for="(item, index) in tabbarList"
      :key="index"
      @click="checked(index)"
    >
      <div class="iconfont" v-html="item.icon"></div>
      <div class="tabbar_text">{{ item.text }}</div>
    </span>
  </div>
</template>

<script>
import { reactive,ref } from 'vue'
export default {
  name: 'tabbar',
  setup() {
    
    const tabbarList = reactive([
      {
        icon: '&#xe603;',
        text: '首页',
      },
      {
        icon: '&#xe605;',
        text: '购物车',
      },
      {
        icon: '&#xe608;',
        text: '订单',
      },
      {
        icon: '&#xe601;',
        text: '我的',
      },
    ])
    let isChecked = ref('')
    const checked = (index)=>{
      isChecked.value = index
    }
    return { tabbarList,isChecked,checked }
  },
}
</script>

<style lang="scss">
@import '../../style/viriables.scss';

.tabbar {
  box-sizing: border-box;
  position: absolute;
  left: 0;
  bottom: 0;
  padding: 0 0.18rem;
  width: 100%;
  height: 0.49rem;
  border-top: 1px solid #f1f1f1;
  display: flex;
  color: $content-font-color;
  .tabbar_item {
    flex: 1;
    text-align: center;
    .iconfont {
      font-size: 0.18rem;
      margin: 0.07rem 0 0.02rem 0;
    }
    .tabbar_text {
      font-size: 0.2rem;
      transform: scale(0.5, 0.5);
      transform-origin: center top;
    }
  }
  .tabbar_item-checked {
    color: #1fa4fc;
  }
}
</style>
