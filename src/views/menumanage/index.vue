<template>
  <div class="menu">
    <el-row style="font-size:20px">
      <el-col :span="12" class="menulist-title">菜单列表</el-col>
      <el-col :span="12" class="options-title">操作</el-col>
    </el-row>

    <Menu
      v-for="(item,index) in mainmenus"
      :key="index"
      :menudata="item"
      @set-menu-top="setTop(index)"
      @delete-menu="deleteMenu(index)"
    ></Menu>

    <el-button
      v-if="mainmenus.length<3"
      class="add-mainmenu"
      @click="addMainMenu"
    >
      <i class="el-icon-plus"></i>
      <h3>添加主菜单</h3>
    </el-button>
  </div>
</template>
<script>
import Menu from "./Menu";
import { mainMenu } from "@/utils/data-template.js"

export default {
  components: {
    Menu
  },
  data() {
    return { mainmenus: [mainMenu()] };
  },
  methods: {
    addMainMenu() {
      this.mainmenus.push(mainMenu());
    },
    setTop(index) {
      const arr = this.mainmenus;
      const o = arr[index];
      arr.splice(index, 1);
      arr.unshift(o);
    },
    deleteMenu(index) {
      this.mainmenus.splice(index, 1);
    }
  }
};
</script>

<style rel = "styleseet/scss" lang="scss"scoped>
.menu {
  width: 1200px;
  box-sizing:content-box;
  padding: 120px;
  font-size: 0.8rem;
  color: black;
  font-weight: bold;
  .options-title {
    text-align: center;
    padding: 0 2.5rem 0 0;
  }
  .add-mainmenu {
    width: 100%;
    margin: 1rem 0;
    border: 1 dotted black !important;
    .el-icon-plus {
      display: block;
      font-size: 50px;
    }
  }
}
</style>
