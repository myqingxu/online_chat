<template>
  <div class="personal_info">
   <div class="main">
      <van-cell title="头像" is-link>
        <template #default>
          <div class="img_box" @click.stop='triggerUpload'>
            <img :src="headerUrl" alt="">
          </div>
          <van-uploader v-show='false' class="img_box" v-model='fileList' :after-read="afterRead" max-count='1' :deletable='false' ref='upload'>
          </van-uploader>
        </template>
      </van-cell>
      <van-cell title="名字" is-link :value="name" @click.stop='namePopup = true' />
      <van-cell title="用户名" is-link :value="username" />
   </div>
    <van-popup v-model="namePopup" class="name_popup">
      <div class="box">
        <van-field v-model="newName" placeholder="请输入新的名字" maxlength='8' clearable/>
        <div class="btn_box">
          <van-button class="cancel" @click.stop='namePopup = false' >取消</van-button>
          <van-button class="submit" type='info' @click.stop='submitNewName'>确认</van-button>
        </div>
      </div>
    </van-popup>
  </div>
</template>

<script>
import { Cell, Toast, Uploader, Popup, Field, Button } from 'vant'
export default {
  components: {
    [Uploader.name]: Uploader,
    [Button.name]: Button,
    [Popup.name]: Popup,
    [Field.name]: Field,
    [Cell.name]: Cell
  },
  data() {
    return {
      fileList: [],
      headerUrl: '',
      namePopup: false,
      username: '',
      name: '',
      newName: ''
    }
  },
  mounted() {
    this.loadInfo()
  },
  methods: {
    async loadInfo() {
      try {
        const res = await this.$http.post('/getUserInfo')
        this.headerUrl = res.data.headerImg
        this.name = res.data.name
        this.username = res.data.username
        console.log('res:', res)
      } catch (err) {
        Toast(err)
      }
    },
    async submitNewName() {
      try {
        if (!this.newName) {
          Toast('请输入新的姓名')
          return
        }
        const res = await this.$http.post('updateUserName', { name: this.newName })
        this.namePopup = false
        this.loadInfo()
        Toast(res.msg)
      } catch (err) {
        Toast(err)
      }
    },
    async afterRead(val) {
      try {
        const params = new FormData()
        params.append('file', val.file)
        val.status = 'uploading';
        val.message = '上传中...';
        const res = await this.$http.post('/upload', params, {
          headers: {'Content-Type': 'multipart/form-data'}
        })
        val.status = 'success';
        const url = res.data // 上传图片后的图片路径
        this.headerUrl = url
        await this.$http.post('/uploadHeader', { url })
        this.fileList.length = 0
        Toast('上传成功')
      } catch (err) {
        this.fileList.length = 0
        Toast(err)
      }
    },
    triggerUpload() {
      this.$refs.upload.chooseFile()
    }
  }
}
</script>

<style lang='stylus' scoped>
.personal_info{
  >.main{
    >>>.van-cell{
      align-items center;
      background #fff;
      >.van-cell__value{
        min-width 60px;
        flex none
        margin-right 10px;
        >.img_box{
          width 60px;
          height 60px;
          >.van-uploader__wrapper, .van-uploader__preview, .van-image{
            width 100%;
            height 100%;
            margin 0
          }
          img{
            width 100%;
            height  100%;
            border-radius 6px;
          }
        }
      }
    }
  }

  >>>.name_popup{
    overflow hidden
    >.box{
      width 300px;
      padding 20px;
      border-radius 6px;
      overflow hidden
      >.btn_box{
        width 100%;
        display flex;
        justify-content center;
        padding-top 10px;
        >.van-button{
          border-radius 5px;
          height 35px;
        }
        >.submit{
          margin-left 20px;
        }
      }
      >.van-cell{
        .van-cell__title>span, .van-field__control{
          font-size 14px;
        }
      }
    }
  }
}
</style>