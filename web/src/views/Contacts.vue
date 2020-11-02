<template>
  <div class="contacts">
    <div class="add">
      <span></span>
      <van-icon name="add-o" @click.stop='$router.push({ path: "/addFriend" })' />
    </div>

    <div class="header">
      <div @click.stop='$router.push({ path: "/newFriend" })'>
        <img src="../assets/images/icon_new_friend.png" alt="">
        <span>新的朋友</span>
      </div>
    </div>
    <div class="fill_box"></div>

    <div class="friends">
      <div class="item" v-for='item of list' :key='item._id'>
        <img :src="item.headerImg" alt="">
        <p>{{ item.name }}</p>
      </div>
    </div>
  </div>
</template>

<script>
import { IndexBar, IndexAnchor, Cell, Icon, Toast } from 'vant';
export default {
  components: {
    [IndexAnchor.name]: IndexAnchor,
    [IndexBar.name]: IndexBar,
    [Icon.name]: Icon,
    [Cell.name]: Cell
  },
  data() {
    return {
      list: []
    }
  },
  mounted() {
    this.loadFriends()
  },
  methods: {
    async loadFriends() {
      try {
        const res = await this.$http.post('/friends')
        this.list = res.data
      } catch (err) {
        Toast(err)
      }
    }
  }
}
</script>

<style lang='stylus' scoped>
.contacts{
  >.add{
    display flex;
    justify-content space-between;
    padding 10px 10px;
    >>>.van-icon{
      font-size 20px;
      color #ddd;
    }
  }
  >.fill_box{
    background #f2f2f2;
    height 8px;
  }
  >.header{
    padding 10px;
    >div{
      display flex;
      align-items center;
      padding 5px 0;
      >img{
        width 30px;
        height 30px;
        border-radius 5px;
      }
      >span{
        height 35px;
        line-height 35px;
        flex 1
        font-size 16px;
        margin-left 10px;
        color #aaa;
        border-bottom 1px solid #eee;
      }
    }
  }
  >.friends{
    padding 10px;
    >.item{
      display flex;
      align-items center;
      padding 5px 0;
      >img{
        width 30px;
        height 30px;
        border-radius 5px;
      }
      >p{
        height 35px;
        line-height 35px;
        flex 1
        font-size 16px;
        margin-left 10px;
        color #aaa;
        border-bottom 1px solid #eee;
      }
    }
  }
}
</style>