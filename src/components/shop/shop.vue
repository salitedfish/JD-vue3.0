<template>
  <div class="nearmall_item">
    <img :src="item.imgUrl" alt="" class="nearmall_item_img" />
    <div class="nearmall_item_text" :class="{'nearmall_item_text-border':haveBorder}">
      <div class="nearmall_item_title" >{{ item.name }}</div>
      <div class="nearmall_tags">
        <span class="nearmall_tag"> 基础运费：{{ item.expressPrice }} </span>
        <span class="nearmall_tag"> 起送：{{ item.expressLimit }} </span>
        <span class="nearmall_tag"> 月售：{{ item.sales }} </span>
      </div>
      <p class="nearmall_highlight">{{ item.slogan }}</p>
    </div>
  </div>
</template>

<script>

export default {
  name: 'Shop',
  props: {
    item: Object,
    haveBorder: String,
  },
  setup() {

  },
}
</script>

<style lang="scss">
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
  .nearmall_item_text-border {
    border-bottom: 1px solid #f1f1f1;
  }
}
</style>