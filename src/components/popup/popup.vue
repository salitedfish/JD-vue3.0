<template>
  <div class="popup">{{ content }}</div>
</template>

<script>
import {reactive} from "vue";
export default {
  name: 'popup',
  props: {
    content: String,
  },
  setup(props) {},
}
//导出Popup的参数和逻辑
export const usePopup = () => {
  const showPopup = reactive({
    state: false,
    value: '',
  })
  const changeShowPopup = (message) => {
    showPopup.state = true
    showPopup.value = message
    setTimeout(() => {
      showPopup.state = false
    }, 2000)
  }
  return { showPopup, changeShowPopup }
}
</script>

<style lang="scss">
.popup {
  position: fixed;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  background-color: rgba(0, 0, 0, 0.35);
  padding: 0.1rem;
  border-radius: 0.05rem;
  color: #fff;
}
</style>