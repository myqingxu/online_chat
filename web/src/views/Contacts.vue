<template>
  <div class="contacts">
    <van-index-bar>
      <van-index-anchor index="A" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />

      <van-index-anchor index="B" />
      <van-cell title="文本" />
      <van-cell title="文本" />
      <van-cell title="文本" />
    </van-index-bar>
  </div>
</template>

<script>
import { IndexBar, IndexAnchor, Cell } from 'vant';
export default {
  components: {
    [IndexAnchor.name]: IndexAnchor,
    [IndexBar.name]: IndexBar,
    [Cell.name]: Cell
  }
}
</script>

<style>

</style>