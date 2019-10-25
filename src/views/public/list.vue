<template>
  <el-table :data="tableData" stripe border style="width: 100%">
    <el-table-column
      v-for="item in tabInfo"
      :label="item.label"
      :width="item.width || 180"
      :key="item.value"
      :align="item.align || 'center'"
      :fixed="item.fixed || false"
    >
      <template
        slot-scope="scope"
        v-if="!item.type || item.type==='text'"
      >{{ scope.row[item.value] }}</template>

      <template slot-scope="scope" v-else-if="item.type==='a'">
        <a :href="scope.row[item.link]">{{scope.row[item.linkName]}}</a>
      </template>

      <template slot-scope="scope" v-else-if="item.type==='img'">
        <img :src="scope.row[item.value]" class="img" />
      </template>

      <template slot-scope="scope" v-else-if="item.type==='action'">
        <el-button
          :type="i.type || 'primary'"
          :size="i.size || 'mini'"
          v-for="i in scope.row[item.value]"
          :key="i.name"
        >{{i.name}}</el-button>
      </template>
    </el-table-column>
  </el-table>
</template>
<script>
export default {
  props: {
    tableData: {
      type: Array
    },
    tabInfo: {
      type: Array
    }
  },
  data() {
    return {};
  },
  methods: {}
};
</script>
<style lang="scss" scoped>
.img {
  display: inline-block;
  width: 100px;
  height: 100px;
}
</style>