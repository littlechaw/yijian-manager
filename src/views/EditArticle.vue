<template>
  <div>
    <headTop></headTop>
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
                    @change="onEditorChange($event)"
                    @ready="onEditorReady($event)">
      </quill-editor>
    </div>
    <div class="submit_btn">
      <el-button type="primary" @click="submit">提交</el-button>
    </div>
    <!-- 图片上传组件辅助-->
    <el-upload
      class="avatar-uploader"
      :action="serverUrl"
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
  import headTop from '@/components/HeadTop'


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
    name: 'EditArticle',
    data() {
      return {
        quillUpdateImg: false,
        header: '',
        token: {token: sessionStorage.token},
        content: '<h3>文本编辑</h3>',
        serverUrl: '/yijian/upload',
        imgUrl: this.$store.getters.getImgUrl,
        editorOption: {
          placeholder: '',
          theme: 'snow',  // or 'bubble'
          modules: {
            toolbar: {
              container: toolbarOptions,  // 工具栏
              handlers: {
                'image': function (value) {
                  if (value) {
                    document.querySelector('.avatar-uploader input').click()
                  } else {
                    this.quill.format('image', false);
                  }
                }
              }
            }
          }
        },
        articleClass: 0,
        articleClassList: []
      }
    },
    mounted() {
      this.getArticleClass();
    },
    components: {
      quillEditor,
      headTop
    },
    computed: {
      editor() {
        return this.$refs.myQuillEditor.quill
      }
    },
    methods: {
      beforeUpload() {
        this.quillUpdateImg = true;
      },
      uploadSuccess(res, file) {
        let quill = this.$refs.myQuillEditor.quill
        if (res.code == '1') {
          let length = quill.getSelection().index;
          quill.insertEmbed(length, 'image', this.imgUrl + res.body)
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
      },
      onEditorChange(d) {
      },
      submit() {
        let url = '/yijian/opRoot/saveInfomation.do';
        let header = this.header,
          text = this.content,
          type = this.articleClass,
          typeText = this.articleClassText,
          content = this.content.replace(/<[^>]*>|/g, "");
        if (!header) {
          this.$message.error("请输入标题");
          return;
        }
        let data = {
          header,
          text,
          type,
          typeText,
          content
        };
        this.$axios.dopost(url, data).then(res => {
          this.$message.success('提交成功!');
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      }
    },
    watch: {
      articleClass(n, o) {
        for (let i in this.articleClassList) {
          if (this.articleClassList[i].typeId == n) {
            this.articleClassText = this.articleClassList[i].typeName;
          }
        }
      }
    }
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
