<template>
  <div>

    <div class="edit_container">
      <el-row type="flex" :gutter="20">
        <el-col class="inner-title" style="width: 100px;">文章标题:</el-col>
        <el-col :span="13">
          <el-input size="small" v-model="header" placeholder="请输入文章标题，最多不超过30字"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col class="inner-title" style="width: 100px;">文章目标:</el-col>
        <el-select v-model="articleClass" size="small">
          <el-option v-for="(item,index) in articleClassList" :label="item.typeName" :value="item.typeId" :key="index"></el-option>
        </el-select>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col class="inner-title" style="width: 100px;">文章内容:</el-col>
      </el-row>
      <quill-editor v-model="content"
                    ref="myQuillEditor"
                    class="editer"
                    :options="editorOption"
                    @ready="onEditorReady($event)">
      </quill-editor>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    name: 'EditArticle',
    data() {
      return {
        header: '',
        content: '<h3>文本编辑</h3>',
        editorOption: {},
        articleClass: 0,
        articleClassList: []
      }
    },
    mounted() {
      this.getArticleClass();
    },
    components: {
      quillEditor,
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      getArticleClass() {
        let url = '/yijian/unLogin/findAllInfomationType.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.articleClassList = res;
          this.articleClass = res[0].typeId;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      submit() {
        let url = '/yijian/opRoot/saveInfomation.do';
        let header = this.header,
          text = this.content,
          type = this.articleClass;
        let data = {
          header,
          text,
          type
        };
        this.$axios.dopost(url, data).then(res => {
          this.$message.success('提交成功!');
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      }
    },
  }
</script>

<style lang="less">
  @import '../style/mixin';

  .edit_container {
    padding: 40px;
    margin-bottom: 40px;
    .inner-title {
      padding: 4px 0px;
    }
    .el-row {
      margin: 20px 0px;
    }
  }

  .editer {
    height: 350px;
  }

  .submit_btn {
    text-align: center;
  }

  .el-select {
    padding-left: 10px;
  }
</style>
