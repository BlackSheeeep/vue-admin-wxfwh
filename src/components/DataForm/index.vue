<template>
  <div class="add-new-reply">
    <el-form ref="form" :model="formData" :rules="formRules">
      <el-form-item v-if="/addnewkeyword$/i.test($route.path)" prop="keyword">
        <h3>关键字</h3>
        <el-input v-model="formData.keyword" placeholder="请输入关键字"></el-input>
      </el-form-item>
      <el-form-item prop="contentType">
        <h3>回复内容</h3>
        <el-radio-group v-model="formData.contentType" class="types" @change="changeContentType">
          <el-radio-button label="text">文本</el-radio-button>
          <el-radio-button label="cardLink">卡片链接</el-radio-button>
          <el-radio-button label="img">图片</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="formData.contentType==='text'" class="content" prop="content">
        <div class="link">
          <svg-icon slot="prefix-icon" class="link-icon" icon-class="chaolianjie"></svg-icon>
          <input placeholder="添加文字链接" class="text-link" type="text" @focus="showPopup" />

          <div v-if="showpopup" class="popup">
            <input
              v-model="text_link_cach.text"
              placeholder="请输入文字"
              class="text"
              type="text"
              style="display:block"
            />
            <input
              v-model="text_link_cach.link"
              placeholder="http://...."
              class="link"
              type="text"
              style="display:block"
            />
            <el-button class="ok" type="primary" @click="addTextLink">确认</el-button>
            <el-button class="cancel" plain @click="unshowPopup">取消</el-button>
          </div>
        </div>
        <div class="text" contenteditable @update="updateContent" @keyup="$emit('update')"></div>
      </el-form-item>

      <el-form-item v-else-if="formData.contentType==='cardLink'" class="content" prop="content">
        <!-- 暂无内容 -->
      </el-form-item>

      <el-form-item v-else class="content" prop="content">
        <el-upload
          class="uploader"
          action="http://localhost:9528"
          :show-file-list="true"
          :on-success="handleUploadSuccess"
          :before-upload="beforeUpload"
          @click.prevent=""
        >
          <img v-if="imgUrl" class="img" :src="imgUrl" alt />
          <i v-else class="el-icon-plus uploader-icon"></i>
        </el-upload>
      </el-form-item>

      <el-form-item v-if="/addnewkeyword$/i.test($route.path)" class="comment" prop="comment">
        <h3>备注</h3>
        <textarea v-model="formData.comment" class="text"></textarea>
      </el-form-item>
      <el-form-item v-else class="state">
        <h3>有效状态</h3>
        <el-radio-group v-model="formData.state">
          <el-radio-button :label="true">开启</el-radio-button>
          <el-radio-button :label="false">关闭</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="submit">确认提交</el-button>
        <el-button plain style="margin-left:50px" @click="back">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>
import path from "path";
import { isExternal } from "@/utils/validate.js";
let contentText;
export default {
  data() {
    return {
      formData: {
        keyword: "",
        contentType: "text",
        content: "",
        comment: "",
        state: true
      },
      formRules: {
        keyword: [
          {
            require: true,
            message: "关键字为英文或中文",
            trigger: "blur",
            pattern: /^[a-zA-Z\x00-\xff]$/i
          }
        ]
      },
      selectedType: "text",
      showpopup: false,
      text_link_cach: {
        text: "",
        link: ""
      },
      imgUrl: ""
    }
  },
  watch: {
    "formData.content": function(val, oldval) {
      if (val != oldval) {
        contentText.innerHTML = val;
      }
    }
  },
  mounted() {
    contentText = document.querySelector(".content .text");
  },
  methods: {
    showPopup() {
      this.showpopup = true;
    },
    unshowPopup() {
      this.showpopup = false;
    },
    addTextLink() {
      contentText.innerHTML += `<a href='${this.text_link_cach.link}' 
      target='_blank' 
      contenteditable='false'
      style='text-decoration:underline;color:lightblue;'>${this.text_link_cach.text}</a>`;
      this.$emit("update");
      this.showpopup = false;
    },
    changeContentType() {},
    updateContent() {
      this.formData.content = contentText.innerHTML;
    },
    submit() {
      this.$refs["form"].validate(valid => {
        if (valid) {
          return true;
        } else {
          console.log("error");
          return false;
        }
      });
    },
    back() {
      this.$router.go(-1);
    },
    handleUploadSuccess() {

    },
    beforeUpload() {
      return true;
    }
  }
};
</script>

<style lang="scss">
.add-new-reply {
  padding: 10px 20%;
  width: 1200px;
  .el-input {
    width: 100%;
  }
  .types {
    .el-radio-button {
      margin: 0 30px 0 0;
      span {
        border: 0.8px solid lightgray;
        border-radius: 5px;
      }
    }
  }
  .text-link {
    border: 1px solid lightgray;
    width: 100%;
    color: lightgray;
    outline: none;
    line-height: 34px;
    padding: 0 0 0 30px;
  }
  .link-icon {
    position: absolute;
    margin: 12px;
  }

  .content {
    height: 300px;
    margin: 0;
    .text-link {
      margin: 0;
    }
    .text {
      border: 1px solid lightgray;
      height: 240px;
      width: 100%;
      outline: none;
      padding: 10px 10px;
      margin: 0;
    }
    .uploader {
      .el-upload {
        border: 1px dashed #d9d9d9;
        border-radius: 6px;
        cursor: pointer;
        position: relative;
        overflow: hidden;
      }
      .el-upload:hover {
        border-color: #409eff;
      }
      .uploader-icon {
        font-size: 28px;
        color: #8c939d;
        width: 178px;
        height: 178px;
        line-height: 178px;
        text-align: center;
      }
      .img {
        width: 178px;
        height: 178px;
        display: block;
      }
    }
    .popup {
      position: fixed;
      padding: 40px 40px 0 40px;
      height: 250px;
      width: 400px;
      top: 30%;
      z-index: 999;
      background-color: white;
      left: 40%;
      border: 1px solid lightgray;
      .text,
      .link {
        width: 100%;
        height: 40px;
        margin: 0 0 40px 0;
      }
      .link {
        margin: 0 0 20px 0;
      }
      .ok {
        float: left;
      }
      .cancel {
        float: right;
      }
    }
  }

  .comment {
    .text {
      width: 100%;
      height: 70px;
    }
  }
  .state {
    margin: 0 0 150px 0;
  }
}
</style>
