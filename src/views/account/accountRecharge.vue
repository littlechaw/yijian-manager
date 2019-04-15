<template>
  <div class="bgColor">
    <headTop></headTop>
    <div class="title">
      <p><span>账户充值</span></p>
    </div>

    <div class="content">
      <el-row class="content-top">
        <span>友情提示：</span>
        <span>先转账再提交转账信息，转账时仔细核对收款人姓名、银行卡号</span>
      </el-row>
      <div class="content-mid">
        <el-row :gutter="20">
          <el-col class="content-left-form" :span="10">
            <el-form :label-position="labelPosition" label-width="120px" :model="formData">
              <el-row>
                <el-form-item label="转账银行">
                  <el-select v-model="formData.bankName" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in banks"
                      :key="index"
                      :label="item"
                      :value="item">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="银行支行名称">
                  <el-input v-model="formData.bankBranch" placeholder="请输入银行支行名称"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="银行卡卡号">
                  <el-input v-model="formData.bankCard" placeholder="请输入银行卡卡号"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="持卡人姓名">
                  <el-input v-model="formData.cardName" placeholder="请输入持卡人姓名"></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="类型">
                  <el-select v-model="formData.type" placeholder="请选择">
                    <el-option
                      v-for="(item,index) in types"
                      :key="index"
                      :label="item"
                      :value="index">
                    </el-option>
                  </el-select>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="充值面单数">
                  <el-input v-model="formData.buyNumber" :placeholder="holderText"></el-input>
                  <span class="attention-color">单价：{{settingPrice[formData.type]}}</span>
                </el-form-item>
              </el-row>
              <el-row>
                <el-form-item label="充值金额">
                  <el-input v-model="formData.buyMoney" placeholder="0" disabled></el-input>
                </el-form-item>
              </el-row>
              <el-row>
                <el-button size="small" type="primary" @click="submitForm">提交审核</el-button>
              </el-row>
            </el-form>
          </el-col>
          <el-col class="content-right-form" :span="8">
            <el-row style="font-size: large;font-weight: bold">收款银行账号信息</el-row>
            <el-row class="marginVertical" :gutter="10">
              <el-col class="right-text" :span="9">转账银行:</el-col>
              <el-col :span="15">{{adminSetting.bankname}}</el-col>
            </el-row>
            <el-row class="marginVertical" :gutter="10">
              <el-col class="right-text" :span="9">银行支行:</el-col>
              <el-col :span="15">{{adminSetting.bankBranch}}</el-col>
            </el-row>
            <el-row class="marginVertical" :gutter="10">
              <el-col class="right-text" :span="9">银行卡卡号:</el-col>
              <el-col :span="15">{{adminSetting.banknumber}}</el-col>
            </el-row>
            <el-row class="marginVertical" :gutter="10">
              <el-col class="right-text" :span="9">持卡人姓名:</el-col>
              <el-col :span="15">{{adminSetting.accountName}}</el-col>
            </el-row>
            <!--<el-row class="marginVertical" :gutter="10">-->
            <!--<el-col class="right-text" :span="9">单价:</el-col>-->
            <!--<el-col :span="12">{{settingPrice[formData.type]}}</el-col>-->
            <!--</el-row>-->
          </el-col>
        </el-row>
      </div>
    </div>
    <div class="footer">
      <p><span>充值记录</span></p>
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="50"></el-table-column>
        <el-table-column prop="bankName" label="收款银行" width="120"></el-table-column>
        <el-table-column prop="bankBranch" label="收款支行" width="120"></el-table-column>
        <el-table-column prop="bankCard" label="收款账号"></el-table-column>
        <el-table-column prop="cardName" label="收款户名" width="120"></el-table-column>
        <el-table-column prop="buyNumber" label="充值面单数" width="120"></el-table-column>
        <el-table-column prop="buyMoney" label="充值金额" width="120"></el-table-column>
        <el-table-column label="类型" width="120">
          <template slot-scope="scope">{{scope.row.type | typeFilter}}</template>
        </el-table-column>
        <el-table-column label="提交时间" width="150">
          <template slot-scope="scope">{{scope.row.createtime | transferTime}}</template>
        </el-table-column>
        <el-table-column label="审核状态" width="120">
          <template slot-scope="scope">{{scope.row.confirm | confirmFilter}}</template>
        </el-table-column>
        <el-table-column label="审核时间" width="150">
          <template slot-scope="scope">{{scope.row.confirmTime | transferTime}}</template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "accountRecharge",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        labelPosition: 'right',
        banks: [],
        formData: {
          bankCard: '',
          bankName: '',
          buyMoney: '',
          buyNumber: '',
          cardName: '',
          type: 0,
        },
        types: ['淘宝', '拼多多', '京东'],
        adminSetting: {
          bankname: '',
          banknumber: '',
          accountName: ''
        },
        settingPrice: [],
        holderText: '',
        tableData: []
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.queryData()
      this.holderText = '最少充值' + this.storeInfo.addbase + '单'
    },
    methods: {
      queryData() {
        this.getBanks()
        this.getAdminSetting()
        this.getRecord()
      },
      getBanks() {
        this.$axios.doget(URL.GETBANKS).then(res => {
          this.banks = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      getAdminSetting() {
        this.$axios.doget(this.userType == 2 ? URL.USER_GETADMINSETTING : URL.ADMIN_GETADMINSETTING).then(res => {
          if (res && res.bankname) {
            this.adminSetting = res
          }
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
        this.settingPrice = [this.storeInfo.taobaoPrice, this.storeInfo.pinduoduoPrice, this.storeInfo.jingdongPrice]
      },
      getRecord() {
        let url
        if (this.userType == 2) {
          url = URL.USER_GETMYBANDTRANSFER
        }
        if (this.userType == 1) {
          url = URL.ADMIN_GETMYBANDTRANSFER
        }
        this.$axios.doget(url).then(res => {
          this.tableData = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      submitForm() {
        let data = this.formData;
        if (this.formData.buyNumber < this.storeInfo.addbase) {
          this.$message.error(`起充量为${this.storeInfo.addbase}`)
          return
        }
        let url = this.userType == 2 ? URL.USER_SUBMITBANKTRANSFER : (this.userType == 1 ? URL.ADMIN_SUBMITBANKTRANSFER : '')
        if (!url) return;
        this.$axios.dopost(url, data).then(res => {
          this.$message.success("提交成功！")
          this.reset()
          this.queryData()
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      reset() {
        this.formData = {
          bankCard: '',
          bankName: '',
          buyMoney: '',
          buyNumber: '',
          cardName: '',
          type: 0,
        }
      }
    },
    filters: {
      confirmFilter(d) {
        if (d == 0) {
          d = '等待审核'
        }
        if (d == 1) {
          d = '通过'
        }
        if (d == -1) {
          d = '没通过'
        }
        if (d == '' || d == undefined) {
          d = '-'
        }
        return d;
      },
      typeFilter(d) {
        if (d == 0) {
          d = '淘宝'
        }
        if (d == 1) {
          d = '拼多多'
        }
        if (d == 2) {
          d = '京东'
        }
        return d
      }
    },
    watch: {
      'formData.type'() {
        let price = this.settingPrice[this.formData.type]
        this.formData.buyMoney = Math.ceil(this.formData.buyNumber * (price * 100) / 100)
      },
      'formData.buyNumber'() {
        let price = this.settingPrice[this.formData.type]
        this.formData.buyMoney = Math.ceil(this.formData.buyNumber * (price * 100) / 100)
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .marginVertical {
    margin-top: 10px;
    margin-bottom: 10px;
  }

  .content {

    .content-top {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #FCF8E4;
      border-radius: 5px;
      border: 1px solid #F9EBCD;

      span {
        color: #999898;
        font-weight: bold;
      }

      span:last-child {
        color: #999898;
        font-weight: normal;
      }

    }

    .content-mid {
      margin-top: 20px;
    }

    .attention-color {
      color: #606266;
    }

    .content-left-form {
      .el-button {
        margin-left: 120px;
      }
    }

    .content-right-form {
      box-shadow: 0 2px 4px rgba(250, 0, 0, .4);

      .right-text {
        text-align: right;
      }
    }
  }

  .footer {
  }

</style>
