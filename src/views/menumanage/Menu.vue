<template>
  <el-form class="menus">
    <div class="menulist">
      <el-button style="color:black;font-weight:bold;font-size:16px" type="text" @click="changeHidden">
        主菜单
        <i :class="hidden?'el-icon-arrow-down':'el-icon-arrow-up'"></i>
      </el-button>
      <transition name="fade">
        <div v-if="!hidden" class="menuSettings">
          <el-row>
            <el-form-item>
              <el-col :span="8" :md="6" style="display:inline-block;font-size:.8rem">主菜单名称</el-col>
              <el-col :span="8" :md="6" class="title">
                <el-input v-model="menudata.name"></el-input>
              </el-col>
              <el-col :span="8" :md="6" class="options">
                <el-button type="primary" @click="$emit('set-menu-top',Object.assign({},$event))">置顶</el-button>
                <el-button type="primary" @click="$emit('delete-menu',Object.assign({},$event))">删除</el-button>
              </el-col>
            </el-form-item>
          </el-row>

          <el-row>
            <el-form-item>
              <el-col :span="6" :md="6" style="display:inline-block;font-size:.8rem">启用子菜单</el-col>
              <el-col :span="18" :md="18" style="text-align:left" class="options">
                <el-radio-group v-model="menudata.enablechildren">
                  <el-radio-button :label="true">是</el-radio-button>
                  <el-radio-button :label="false">否</el-radio-button>
                </el-radio-group>
              </el-col>
            </el-form-item>
          </el-row>
          <el-row v-for="(child,index) in children" :key="index">
            <el-form-item>
              <el-col :span="8" :md="6" class="title">
                <h4>子菜单名称</h4>
                <h4>跳转链接</h4>
              </el-col>
              <el-col :span="8" :md="6" class="sub-input">
                <el-input v-model="child.name" name="name"></el-input>
                <el-input v-model="child.linkto" name="linkto"></el-input>
              </el-col>
              <el-col style="padding:2rem 0;" :span="8" :md="6" class="options">
                <el-button type="primary" @click="setTop(index)">置顶</el-button>
                <el-button type="primary" @click="deleteSubMenu(index)">删除</el-button>
              </el-col>
            </el-form-item>
          </el-row>

          <el-button
            v-if="menudata.children.length<5"
            class="add-submenu"
            @click="addSubmenu"
          >
            <i class="el-icon-plus"></i>
            <h3>添加子菜单</h3>
          </el-button>
        </div>
      </transition>
    </div>
  </el-form>
</template>
<script>
import { mainMenu, subMenu } from "@/utils/data-template.js"
export default {
  props: {
    menudata: {
      type: Object,
      default() {
        // return{
        //   name:'',
        //   enablechildren:false,
        //   children:[
        //     {name:"hello",linkto:"www.baidu.com"}
        //     ]
        // };
        return mainMenu();
      }
    }
  },
  data() {
    return {
      hidden: true
    };
  },
  computed: {
    children() {
      console.log(this.menudata.enablechildren);
      return this.menudata.enablechildren
        ? this.menudata.children
        : [];
    }
  },
  methods: {
    changeHidden() {
      this.hidden = !this.hidden;
    },
    addSubmenu() {
      this.menudata.children.push(subMenu("hello", "www.baidu.com"));
    },
    setTop(index) {
      const arr = this.menudata.children;
      const o = arr[index];
      arr.splice(index, 1);
      arr.unshift(o);
      this.menudata.children = arr;
    },
    setChildProperty(event, index) {
      const o = { [event.target.name]: event.target.value };
      this.$set(this.menudata.children, index, Object.assign({}, this.menudata.children[index], o));
    },
    deleteSubMenu(index) {
      this.$delete(this.menudata.children, index);
    }
  }
};
</script>

<style lang="scss">
.fade-enter{
  opacity:0;
}
.fade-enter-to{
  opacity:1;
}
.fade-leave{
  opacity:1;
}
.fade-leave-to{
  opacity:0;
}
.fade-enter-active{
  transition:all .6s ease;
}
.fade-leave-active{
  transition:all .6s ease;
}

.menus {
  width: 1200px;

  .menulist {
    width: 1200px;
    .hidden {
      display: none;
    }

    .menuSettings {
      line-height: 70px;
      .title {
        display: inline-block;
        height:100%;

      }
      .options {
        display: inline-block;
        text-align: right;
        height:100%;
      }
      .sub-input{
        div{
          margin:15px 0;
        }
      }
      .add-submenu {
        width: 100%;
        border: 1 dotted black !important;
        .el-icon-plus {
          display: block;
          font-size: 50px;
        }
      }
    }
  }
}
</style>
