<template>
  <div class="keywordlist">
    <el-table :data="showingList" class="cell-center">
      <el-table-column label="序号">
        <template slot-scope="scope">
          <div class="cell">{{ scope.$index+1 }}</div>
        </template>
      </el-table-column>
      <el-table-column prop="keyword" label="关键字"></el-table-column>
      <el-table-column prop="contentType" label="回复内容"></el-table-column>
      <el-table-column prop="comment" label="备注"></el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button type="text" @click="$emit('show-detail',Object.assign({},$event,scope.row))">查看</el-button>
          <el-button
            type="text"
            @click="$emit('edit-content',Object.assign({},$event,scope.row))"
          >编辑</el-button>
          <el-button type="text" @click="$emit('delete-row',Object.assign({},$event,scope.row))">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="pag">
      <el-pagination
        :current-page.sync="currpage"
        :total="keywordList.length"
        :page-size="pageSize"
        :page-sizes="pageSizes"
        layout="total,sizes,prev,pager,next,jumper"
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
      ></el-pagination>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      currpage: 1,
      pageSize: 2,
      pageSizes: [2, 4, 6, 8, 10],
      searchTotal: 0
    };
  },
  computed: {
    keywordList() {
      return this.$store.getters.keywordList;
    },
    showingList() {
      const start = (this.currpage - 1) * this.pageSize;
      const end = this.pageSize + start;
      return this.keywordList.slice(start, end);
    }
  },
  methods: {
    handleSizeChange(size) {
      this.pageSize = size;
    },
    handleCurrentChange(curr) {
      this.currpage = curr;
    }
  }
};
</script>

<style lang="scss" >
.keywordlist {
  .cell-center .cell {
    text-align: center !important;
  }
  .pag{
      .el-pagination{
          display:flex;
          margin:50px 0;
          justify-content: center;
          justify-items: center;
      }
  }
}
</style>
