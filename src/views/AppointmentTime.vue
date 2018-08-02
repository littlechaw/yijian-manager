<template>
  <div>
    <div class="edit_container">
      <h3>用户协议</h3>
      <el-row>
        <quill-editor v-model="content"
                      ref="myQuillEditor"
                      class="editer"
                      :options="editorOption"
                      @change="onEditorChange($event)"
                      @ready="onEditorReady($event)">
        </quill-editor>
      </el-row>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">保存</el-button>
    </div>
    <!-- 图片上传组件辅助-->
    <el-upload
      class="avatar-uploader"
      :action="serverUrl"
      name="img"
      :headers="token"
      :show-file-list="false"
      :on-success="uploadSuccess"
      :on-error="uploadError"
      :before-upload="beforeUpload">
    </el-upload>
  </div>
</template>

<script>
  import {quillEditor} from 'vue-quill-editor'
  import 'quill/dist/quill.core.css'
  import 'quill/dist/quill.snow.css'
  import 'quill/dist/quill.bubble.css'

  const toolbarOptions = [
    ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
    ['blockquote', 'code-block'],

    [{'header': 1}, {'header': 2}],               // custom button values
    [{'list': 'ordered'}, {'list': 'bullet'}],
    [{'script': 'sub'}, {'script': 'super'}],      // superscript/subscript
    [{'indent': '-1'}, {'indent': '+1'}],          // outdent/indent
    [{'direction': 'rtl'}],                         // text direction

    [{'size': ['small', false, 'large', 'huge']}],  // custom dropdown
    [{'header': [1, 2, 3, 4, 5, 6, false]}],

    [{'color': []}, {'background': []}],          // dropdown with defaults from theme
    [{'font': []}],
    [{'align': []}],
    ['link', 'image', 'video'],
    ['clean']                                         // remove formatting button
  ]

  export default {
    name: "AppointmentTime",
    data() {
      return {
        quillUpdateImg: false,
        header: '',
        token: {token: sessionStorage.token},
        content: '<h3>文本编辑</h3>',
        serverUrl: '/yijian/upload',
        editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    // 触发input框选择图片文件
                    document.querySelector('.avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        }
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
      beforeUpload() {
        this.quillUpdateImg = true
      },

      uploadSuccess(res, file) {
        let quill = this.$refs.myQuillEditor.quill
        if (res.code === '200' && res.info !== null) {
          let length = quill.getSelection().index;
          quill.insertEmbed(length, 'image', res.info)
          quill.setSelection(length + 1)
        } else {
          this.$message.error('图片插入失败')
        }
        this.quillUpdateImg = false
      },

      uploadError() {
        this.quillUpdateImg = false
        this.$message.error('图片插入失败')
      },
      onEditorReady(editor) {
        console.log('editor ready!', editor)
      },
      onEditorChange(d) {
        console.log(d);
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
