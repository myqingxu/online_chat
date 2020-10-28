import Vue from 'vue'
import Router from 'vue-router'

import Tabbar from '../components/Tabbar.vue'
import DialogList from '../views/DialogList.vue'
import Contacts from '../views/Contacts.vue'
import My from '../views/My.vue'
import Login from '../views/Login.vue'
import Regist from '../views/Regist.vue'
Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/contacts',
      component: Tabbar,
      children: [
        {
          path: '/dialogList',
          component: DialogList,
          meta: {
            title: '对话列表',
            needLogin: true
          }          
        },
        {
          path: '/contacts',
          component: Contacts,
          meta: {
            title: '联系人',
            needLogin: true
          } 
        },
        {
          path: '/my',
          component: My,
          meta: {
            title: '我的',
            needLogin: true
          } 
        }
      ]
    },
    {
      path: '/login',
      component: Login,
      meta: {
        title: '登录',
        needLogin: false
      }
    },
    {
      path: '/regist',
      component: Regist,
      meta: {
        title: '注册',
        needLogin: false
      }
    }
  ]
})

require('./routerDeal')(router)

export default router
