<template>
  <div class="new_friend">
    <div class="result">
      <div class="user_item" v-for='item of newFriends' :key='item._id'>
        <div>
          <img :src="item.headerImg" alt="">
          <p>{{ item.name }}</p>
        </div>
        <van-button type='primary' @click.stop='passNewFriend(item._id)'>同意</van-button>
      </div>
    </div>
  </div>
</template>

<script>
import { Toast, Button } from 'vant'
export default {
  components: {
    [Button.name]: Button
  },
  data() {
    return {
      newFriends: []
    }
  },
  mounted() {
    this.loadNewFriendList()
  },
  methods: {
    async loadNewFriendList() {
      try {
        const res = await this.$http.post('/newFriends')
        this.newFriends = res.data
        console.log(res)
      } catch (err) {
        Toast(err)
      }
    },
    async passNewFriend(id) {
      try {
        const res = await this.$http.post('/passNewFriend', { id })
        console.log(res);
        this.loadNewFriendList()
      } catch (err) {
        Toast(err)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.new_friend{
  >.result{
    padding 10px 15px;
    >p{
      text-align center;
      color #ddd;
      font-size 16px;
    }
    >.user_item{
      display flex;
      justify-content space-between;
      align-items center;
      margin-top 20px;
      >div{
        display flex;
        align-items center;
        >img{
          width 40px;
          height 40px;
          border-radius 5px;
        }
        >p{
          font-size 16px;
          margin-left 20px;
        }
      }
      >>>.van-button{
        font-size 14px;
        height 25px;
        border-radius 5px;
      }
    }
  }
}
</style>