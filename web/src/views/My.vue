<template>
  <div class="my">
    <div class="header" @click.stop.prevent='$router.push({ path: "/personalInfo" })'>
      <div class="header_img">
        <img src="https://img.yzcdn.cn/vant/cat.jpeg" alt="">
      </div>
      <div class="content">
        <p class="name">用</p>
        <p class="user_name"><span>用户名：xxxxx</span><van-icon name="arrow" /></p>
      </div>
    </div>
    <div class="fill_box"></div>
  </div>
</template>

<script>
import { Icon, Toast } from 'vant'
export default {
  components: {
    [Icon.name]: Icon
  },
  data() {
    return {}
  },
  mounted() {
    this.loadInfo()
  },
  methods: {
    async loadInfo() {
      try {
        const res = await this.$http.post('/getUserInfo')
        console.log('res:', res)
      } catch (err) {
        Toast(err)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.fill_box{
  background #f2f2f2;
  height 8px;
}
.my{
  min-height 100vh;
  >.header{
    display flex;
    padding 0px 20px;
    margin 40px 0;
    >.header_img{
      width 70px;
      height 70px;
      margin-right 20px;
      >img{
        width 100%;
        height 100%;
        border-radius 7px;
      }
    }
    >.content{
      flex 1
      padding 10px 0;
      height 50px;
      display flex;
      flex-direction column;
      justify-content space-between;
      >.name{
        font-weight bold;
        font-size 20px;
      }
      >.user_name{
        font-size 16px;
        color #bbb;
        display flex;
        justify-content space-between;
        align-items center;
        >>>.van-icon{
          font-size 15px;
          color #bbb;
        }
      }
    }
  }
}
</style>