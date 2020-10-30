<template>
  <div class="add_friend">
    <van-search
     @search="onSearch"
      v-model="value"
      placeholder="请输入搜索关键词"
      input-align="center"
    />
    <div class="result">
      <div class="user_item" v-show='show'>
        <div>
          <img :src="user.headerImg" alt="">
          <p>{{ user.name }}</p>
        </div>
        <i @click.stop='addFriend(user._id)'>+</i>
      </div>
    </div>
  </div>
</template>

<script>
import { Search, Toast } from 'vant';
export default {
  components: {
    [Search.name]: Search
  },
  data() {
    return {
      value: '',
      show: false,
      user: {}
    }
  },
  methods: {
    async onSearch() {
      try {
        const res = await this.$http.post('/searchUser', { username: this.value })
        this.user = res.data
        this.show = true
      } catch (err) {
        Toast(err)
      }
    },
    async addFriend(id) {
      try {
        const res = await this.$http.post('/addFriend', { id })
        Toast(res.data)
      } catch (err) {
        Toast(err)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.add_friend{
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
      >i{
        font-size 25px;
      }
    }
  }
}
</style>
