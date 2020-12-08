<template>
  <div class="login">
    <img
      src="http://www.dell-lee.com/imgs/vue3/user.png"
      alt=""
      class="wrapper_img"
    />
    <div class="wrapper_input">
      <input
        type="text"
        class="wrapper_input_content"
        placeholder="请输入用户名"
        v-model="data.username"
      />
    </div>
    <div class="wrapper_input">
      <input
        type="password"
        class="wrapper_input_content"
        placeholder="请输入密码"
        v-model="data.password"
      />
    </div>
    <div class="wrapper_login-button" @click="handLogin">登录</div>
    <div class="wrapper_login_link" @click="handToRegister">立即注册</div>
    <popup v-if="showPopup.state" :content="showPopup.value"></popup>
  </div>
</template>

<script>
import { useRouter } from 'vue-router'
import { reactive, ref } from 'vue'
import { post } from '../../utils/request.js'
import popup,{usePopup} from '../../components/popup/popup.vue'
export default {
  name: 'vue',
  components: {
    popup,
  }, 
  setup() {
    let router = useRouter()
    const data = reactive({
      username: '',
      password: '',
    })
    const { showPopup, changeShowPopup } = usePopup()
    const handLogin = () => {
      if (!data.username || !data.password) {
        changeShowPopup('请输入正确用户名和密码')
      } else {
        post('/api/user/login', {
          username: data.username,
          password: data.password,
        })
          .then((res) => {
            if (res.errno === 0) {
              localStorage.isLogin = true
              router.push({ name: 'Home' })
            } else {
              changeShowPopup('登陆失败')
            }
          })
          .catch(() => {
            changeShowPopup('请求失败')
          })
      }
    }
    const handToRegister = () => {
      router.push({ name: 'Register' })
    }
    return {
      handLogin,
      handToRegister,
      data,
      showPopup,
    }
  },
}
</script>

<style lang="scss">
.login {
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  transform: translateY(-50%);
  text-align: center;
  .wrapper_img {
    display: block;
    margin: 0 auto 0.4rem auto;
    width: 0.66rem;
    height: 0.66rem;
  }
  .wrapper_input {
    background-color: #f9f9f9;
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 0.06rem;
    height: 0.48rem;
    margin: 0 0.4rem 0.16rem 0.4rem;
    .wrapper_input_content {
      box-sizing: border-box;
      line-height: 0.48rem;
      outline: none;
      width: 100%;
      border: none;
      background: none;
      border-radius: 0.06rem;
      padding: 0 0.2rem;
      font-size: 0.16rem;
      &::placeholder {
        color: rgba(0, 0, 0, 0.5);
      }
    }
  }
  .wrapper_login-button {
    background-color: #0091ff;
    box-shadow: 0 0.04rem 0.08rem 0 rgba(0, 145, 255, 0.32);
    margin: 0.32rem 0.4rem 0rem 0.4rem;
    line-height: 0.48rem;
    border-radius: 0.04rem;
    color: #fff;
    font-size: 0.16rem;
  }
  .wrapper_login_link {
    margin-top: 0.16rem;
    font-size: 0.14rem;
    color: rgba(0, 0, 0, 0.5);
  }
}
</style>