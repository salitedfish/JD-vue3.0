<template>
  <div id="index">
    <router-view></router-view>
    <tab-bar></tab-bar>
  </div>
</template>

<script>
import TabBar from '../../components/tabbar/TabBar.vue'
export default {
  name: 'app',
  components: {
    TabBar
  }
}
</script>

<style lang="scss">

</style>
