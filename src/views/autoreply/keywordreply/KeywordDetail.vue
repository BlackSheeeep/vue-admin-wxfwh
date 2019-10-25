<template>
  <div class="keyword-detail">
    <div class="bg"></div>
    <div class="detail">
      <div class="close" @click="$emit('close',$event)"><i class="el-icon-close"></i></div>
      <div class="keyword">
        <h3 class="title">关键字</h3>
        <div>{{ row.keyword }}</div>
      </div>
      <div class="replyContent">
        <h3 class="title">回复内容</h3>
        <div v-if="row.contentType==='text'">{{ row.content }}</div>
        <div v-else-if="row.contentType==='img'">
          <img :src="row.content" alt />
        </div>
        <div v-else-if="row.contentType==='href'">
          <a :href="row.content">{{ row.content }}</a>
        </div>
        <div v-else>不支持该回复类型</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    row: {
      type: Object,
      require: true
    },
    show: {
      type: Boolean,
      default: false
    }
  }
};
</script>

<style scoped lang="scss">
.keyword-detail {
  .bg {
    position: fixed;
    z-index: 9990;
    top: 0;
    left: 0;
    height: 100%;
    width: 100%;
    background-color: black;
    opacity: 0.5;
  }
  .detail {
      padding:0 5px;
    background-color: white;
    z-index: 9999;
    box-shadow: 0 0 10px 2px rgba(0, 0, 0, 0.4);
    position: fixed;
    width: 800px;
    height: 600px;
    top: 180px;
    left: 400px;
    .title {
      color: lightgray;
    }
    .keyword {
        padding:50px 0;
    }
    .close{
        position:absolute;
        top:0;
        right:0;
        font-size:30px;
    }
  }
}
</style>
