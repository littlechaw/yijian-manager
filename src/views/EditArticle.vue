<template>
  <div>

    <div class="edit_container">
      <el-row type="flex" :gutter="20">
        <el-col class="inner-title" style="width: 100px;">文章标题:</el-col>
        <el-col :span="13">
          <el-input size="small" placeholder="请输入文章标题，最多不超过30字"></el-input>
        </el-col>
      </el-row>
      <el-row type="flex" :gutter="20">
        <el-col class="inner-title" style="width: 100px;">文章分类:</el-col>
        <el-col :span="4">
          <el-input size="small" placeholder="请输入文章标题，最多不超过30字"></el-input>
        </el-col>
        <el-col class="inner-title el-col-md-offset-2" style="width: 100px;">所属目标:</el-col>
        <el-col :span="4">
          <el-input size="small" placeholder="请输入文章标题，最多不超过30字"></el-input>
        </el-col>
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
        input21: '',
        content: '<h3>文本编辑</h3>',
        editorOption: {}
      }
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
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      submit() {
        console.log(this.content);
        this.$message.success('提交成功！');
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
</style>
