<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>修改密码</span></p>
    </div>
    <div class="content">
      <el-row>
        <el-col :span="6">
          <el-form :label-position="labelPosition" label-width="120px" :model="formData">
            <el-row>
              <el-form-item label="原始密码">
                <el-input type="password" v-model="formData.oldPsd" placeholder="请输入原始密码"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="新密码">
                <el-input type="password" v-model="formData.newPsd" placeholder="请输入新密码"></el-input>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="重复新密码">
                <el-input type="password" v-model="formData.newPsdAgain" placeholder="请再次输入新密码"></el-input>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <el-row>
        <el-button size="small" type="primary" @click="handleClick">确 认</el-button>
      </el-row>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "changePsw",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        formData: {
          oldPsd: '',
          newPsd: '',
          newPsdAgain: ''
        },
        canChange: false,
        labelPosition: 'right'
      }
    },
    components: {
      headTop
    },
    methods: {
      handleClick() {
        if (this.formData.newPsd != this.formData.newPsdAgain) {
          this.$message.error("新密码请保持一致！");
          return;
        } else {
          let userType = this.storeInfo.userType;
          let mobile = this.storeInfo.mobile;
          let oldpassword = this.formData.oldPsd;
          let password = this.formData.newPsd;
          let data = {
            mobile,
            oldpassword,
            password
          };
          let url = userType == 2 ? URL.UPDATE_USERPASSWORD : URL.UPDATE_ADMINPASSWORD;
          this.$axios.dopost(url, data).then(res => {
            this.$message.success("密码修改成功！")
            this.reset();
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }
      },
      reset() {
        this.formData = {
          oldPsd: '',
          newPsd: '',
          newPsdAgain: ''
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .el-button {
    margin-left: 120px;
  }

</style>
