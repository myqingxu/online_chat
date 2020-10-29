<template>
  <div class="login">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" native-type="submit">
          登录
        </van-button>
        <van-button round block type="warning" native-type='button' style='margin-top:15px;' @click="toRegist">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { Form, Field, Button, Toast } from 'vant'
export default {
  components: {
    [Button.name]: Button,
    [Field.name]: Field,
    [Form.name]: Form
  },
  data() {
    return {
      username: '',
      password: ''
    }
  },
  methods: {
    toRegist() {
      this.$router.push({ path: '/regist' })
    },
    async onSubmit() {
      try {
        const res = await this.$http.post('/login', {
          'username': this.username,
          'password': this.password
        })
        window.localStorage.setItem("token",res.data);
        this.$router.push({ path: '/contacts' })
        Toast(res.msg)
      } catch (err) {
        Toast(err)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.login{
  min-height 100vh;
  display flex;
  align-items center;
  >>>.van-form{
    border 1px solid #ebedf0;
    border-radius 5px;
    width 320px;
    margin 0 auto;
    margin-bottom 200px;
  }
}
</style>
