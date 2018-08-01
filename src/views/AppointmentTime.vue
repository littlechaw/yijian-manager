<template>
  <div>
    <div class="edit_container">
      <h3>用户协议</h3>
      <el-row>
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      class="editer"
                      :options="editorOption"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </el-row>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  export default {
    name: "AppointmentTime",
    data() {
      return {
        header: '',
        content: '<h3>12345上山打老虎</h3>',
        editorOption: {},
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
        let url = '';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.$message.success('提交成功!');
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .edit_container {
    padding: 40px;
    margin-bottom: 40px;
  }

  .editer {
    height: 350px;
  }
</style>
