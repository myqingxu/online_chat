<template>
  <div class="regist">
    <van-form @submit="onSubmit">
      <van-field
        v-model="username"
        name="用户名"
        label="用户名"
        placeholder="请输入用户名"
        :rules="[{ required: true, message: '请填写用户名' }]"
      />
      <van-field
        v-model="password"
        type="password"
        name="密码"
        label="密码"
        placeholder="请输入密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <van-field
        v-model="passwordAgain"
        type="password"
        name="确认密码"
        label="确认密码"
        placeholder="再次确认密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      />
      <div style="margin: 16px;">
        <van-button round block type="info" style='margin-top:15px;' native-type="submit">
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
      passwordAgain: '',
      password: ''
    }
  },
  methods: {
    async onSubmit() {
      try {
        if (this.passwordAgain !== this.password) {
          Toast('两次密码填写不一致，请重新输入')
          this.passwordAgain = ''
          return
        }
        const res = await this.$http.post('/reg', {
          'username': this.username,
          'password': this.password
        })
        this.$router.push({ path: '/login' })
        Toast(res.msg)
      } catch (err) {
        Toast(err)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.regist{
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
