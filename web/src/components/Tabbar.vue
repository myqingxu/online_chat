<template>
  <div class="tabbar">
    <router-view />
    <van-tabbar route v-model="active">
      <van-tabbar-item
        name="dialogList"
        icon="chat-o"
        to="/dialogList"
      >会话</van-tabbar-item>
      <van-tabbar-item
        name="contacts"
        icon="friends-o"
        to="/contacts"
      >联系人</van-tabbar-item>
      <van-tabbar-item
        name="my"
        icon="manager-o"
        to="/my"
      >我的</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
import { Tabbar, TabbarItem } from 'vant'
export default {
  name: 'Tabbar',
  components: {
    [TabbarItem.name]: TabbarItem,
    [Tabbar.name]: Tabbar
  },
  data() {
    return {
      active: 'contacts'
    }
  }
}
</script>

<style scoped>
</style>
