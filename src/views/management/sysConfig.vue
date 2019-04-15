<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>系统配置</span></p>
    </div>

    <div class="content">
      <el-row>
        <el-col :span="8">
          <el-form :label-position="labelPosition" label-width="120px" :model="formData">
            <el-row>
              <el-form-item label="收款银行">
                <el-select v-model="formData.bankname" placeholder="请选择">
                  <el-option
                    v-for="(item,index) in banks"
                    :key="index"
                    :label="item"
                    :value="item">
                  </el-option>
                </el-select>
              </el-form-item>
              <el-form-item label="收款户名">
                <el-input v-model="formData.accountName" placeholder="请输入收款人姓名"></el-input>
              </el-form-item>
              <el-form-item label="收款账号">
                <el-input v-model="formData.banknumber" placeholder="请输入收款账号"></el-input>
              </el-form-item>
              <el-form-item label="收款银行支行">
                <el-input v-model="formData.bankBranch" placeholder="请输入收款银行支行"></el-input>
              </el-form-item>
              <el-form-item label="淘宝价格">
                <el-input v-model="formData.taobaoprice" placeholder="请输入淘宝价格"></el-input>
              </el-form-item>
              <el-form-item label="京东价格">
                <el-input v-model="formData.jingdongprice" placeholder="请输入京东价格"></el-input>
              </el-form-item>
              <el-form-item label="拼多多价格">
                <el-input v-model="formData.pinduoduoprice" placeholder="请输入拼多多价格"></el-input>
              </el-form-item>
              <el-form-item label="面单起冲量">
                <el-input v-model="formData.addbase" placeholder="请输入面单起冲量"></el-input>
              </el-form-item>
              <el-form-item label="客服QQ">
                <el-input v-model="formData.qq" placeholder="请输入客服QQ"></el-input>
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
    name: "sysConfig",
    data() {
      return {
        labelPosition: 'right',
        formData: {
          bankname: '',
          banknumber: '',
          bankBranch: '',
          accountName: '',
          taobaoprice: '',
          jingdongprice: '',
          pinduoduoprice: '',
          addbase: '',
          qq: ''
        },
        banks: []
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.getBanks()
      this.queryData();
    },
    methods: {
      getBanks() {
        this.$axios.doget(URL.GETBANKS).then(res => {
          this.banks = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      queryData() {
        this.$axios.doget(URL.ADMIN_GETMYADMINSETTING).then(res => {
          if (res) {
            this.formData = res
          }
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      handleClick() {
        let data = this.formData
        this.$axios.dopost(URL.ADMIN_SAVEADMINSETTING, data).then(res => {
          this.$message.success('保存成功')
          this.queryData()
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .title {
  }

  .content {
    .el-button {
      margin-left: 120px;
    }
  }
</style>
