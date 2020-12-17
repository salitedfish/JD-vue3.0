<template>
  <div class="maskpopup">
    <div class="mask_wrapper" @click="changeShowMask"></div>
    <div class="mask_content">
      <h3 class="mask_content_title">{{ title }}</h3>
      <p class="mask_content_desc">{{ desc }}</p>
      <div class="mask_content_btn">
        <button class="cancel" @click="changeShowMask">{{ cancel }}</button>
        <button class="comfirm" @click="comfirmOrder">{{ comfirm }}</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'maskpopup',
  props: {
    title: String,
    desc: String,
    cancel: String,
    comfirm: String,
  },
  setup(props, content) {
    const changeShowMask = () => {
      content.emit('changeShowMask')
    }
    const comfirmOrder = () => {
      content.emit('comfirmOrder')
    }
    return { changeShowMask, comfirmOrder }
  },
}
</script>

<style lang="scss">
.maskpopup {
  .mask_wrapper {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    right: 0;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 1000;
    opacity: 0.3;
  }
  .mask_content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 3rem;
    height: 1.56rem;
    background-color: #fff;
    border-radius: 0.04rem;
    z-index: 2000;
    text-align: center;
    .mask_content_title {
      font-size: 0.18rem;
      margin: 0.24rem 0 0 0;
      line-height: 0.26rem;
      color: #333;
    }
    .mask_content_desc {
      font-size: 0.14rem;
      color: #666;
      margin-top: 0.08rem;
    }
    .mask_content_btn {
      margin: 0.24rem 0.6rem 0 0.6rem;
      button {
        width: 0.8rem;
        height: 0.32rem;
        border-radius: 0.16rem;
      }
      .cancel {
        border: 0.01rem solid #4fb0f9;
        color: #4fb0f9;
      }
      .comfirm {
        margin-left: 0.2rem;
        border: none;
        outline: none;
        background-color: #4fb0f9;
        color: #fff;
      }
    }
  }
}
</style>