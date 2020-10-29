<template>
  <div class="personal_info">
    <van-cell title="头像" is-link>
      <template #default>
        <div class="img_box" @click.stop='triggerUpload'>
          <img :src="headerUrl" alt="">
        </div>
        <van-uploader v-show='false' class="img_box" v-model='fileList' :after-read="afterRead" max-count='1' :deletable='false' ref='upload'>
        </van-uploader>
      </template>
    </van-cell>
    <van-cell title="名字" is-link value="内容" />
    <van-cell title="用户名" is-link value="内容" />
  </div>
</template>

<script>
import { Cell, Toast, Uploader } from 'vant'
export default {
  components: {
    [Uploader.name]: Uploader,
    [Cell.name]: Cell
  },
  data() {
    return {
      fileList: [],
      headerUrl: ''
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
        console.log('res:', res)
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
  >>>.van-cell{
    align-items center;
    background #fff;
    >.van-cell__value{
      width 60px;
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
</style>