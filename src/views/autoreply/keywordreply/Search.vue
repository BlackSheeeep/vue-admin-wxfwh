<template>
  <div class="search">
    <el-row>
      <el-col :span="6"><el-input v-model="searchStr" class="search-input"></el-input></el-col>
      <el-col :span="3"><el-button type="primary" class="search-start" @click="search">搜索</el-button></el-col>
      <el-col :span="3"><el-button type="primary" class="search-reset" @click="reset">重置</el-button></el-col>
      <el-col :span="12"><router-link :to="resolve('add-new-keyword')"><el-button type="primary" class="search-addnewkeyword">添加新关键字</el-button></router-link></el-col>
    </el-row>
  </div>
</template>
<script>
import path from 'path';
import { isExternal } from '@/utils/validate.js';
export default {
  data() {
    return {
      searchStr: ""
    }
  },
  methods: {
    resolve(routePath) {
      return path.resolve(this.$route.path, routePath);
    },
    search() {
      this.$store.dispatch("search", this.searchStr);
    },
    reset() {
      this.$store.dispatch("resetShowingList");
    }
  }
}
</script>

<style lang="scss" scoped>
.search{
    padding:5rem;
    .el-col{
    text-align: center;
}

}

</style>
