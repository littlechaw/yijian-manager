<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>充值审核</span></p>
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="类型">
            <el-select v-model="searchData.type">
              <el-option v-for="item in searchData.types" :label="item.value" :value="item.key" :key="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="searchData.mobile" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="银行卡号">
            <el-input v-model="searchData.bankcard" placeholder="请输入银行卡号"></el-input>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="searchData.searchDate[0]"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="searchData.searchDate[1]"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="queryData">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <!--<el-table-column prop="adminName" label="用户名" v-if="userType == 0"></el-table-column>-->
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="bankCard" label="银行账号"></el-table-column>
        <el-table-column prop="cardName" label="银行账号姓名" width="120"></el-table-column>
        <el-table-column prop="bankName" label="银行名称" width="120"></el-table-column>
        <el-table-column prop="bankBranch" label="银行支行"></el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">{{scope.row.type | typeFilter}}</template>
        </el-table-column>
        <el-table-column prop="buyNumber" label="充值面单数" width="120"></el-table-column>
        <el-table-column prop="buyMoney" label="充值金额" width="120"></el-table-column>
        <el-table-column label="提交时间" width="120">
          <template slot-scope="scope">{{scope.row.createtime | transferTime}}</template>
        </el-table-column>
        <el-table-column label="审核状态" width="120">
          <template slot-scope="scope">{{scope.row.confirm | confirmFilter}}</template>
        </el-table-column>
        <el-table-column label="审核时间">
          <template slot-scope="scope">{{scope.row.confirmTime | transferTime}}</template>
        </el-table-column>
        <el-table-column label="操作" width="120">
          <template slot-scope="scope">
            <el-button @click="agreeClick(scope.row)" type="text" size="small" v-if="scope.row.confirm == 0">同意</el-button>
            <el-button @click="refuseClick(scope.row)" type="text" size="small" v-if="scope.row.confirm == 0">驳回</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "rechargeAudit",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        searchData: {
          type: 0,
          types: [{key: 0, value: '等待'}, {key: 1, value: '同意'}, {key: -1, value: '不同意'}],
          bankcard: '',
          mobile: '',
          searchDate: []
        },
        tableData: []
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.searchData.searchDate = [new Date(), new Date()];
      this.queryData();
    },
    methods: {
      queryData() {
        let url = URL.GETUNCONFIRMBANKTRANSFERS
        let userType = this.userType
        // if (userType == 1) {
        //   url = URL.GETUNCONFIRMBANKTRANSFERS
        // }
        // if (userType == 0) {
        //   url = URL.GETUNCONFIRMBANKTRANSFERSADMIN
        // }
        let data = {
          bankcard: this.searchData.bankcard,
          confirm: this.searchData.type,
          mobile: this.searchData.mobile,
          sdate: this.$transferDate(this.searchData.searchDate[0]),
          edate: this.$transferDate(this.searchData.searchDate[1])
        }
        this.$axios.doget(url, data).then(res => {
          this.tableData = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      agreeClick(data) {
        let url = URL.CONFIRMBANKTRANSFERS
        // if (this.userType == 0) {
        //   url = URL.CONFIRMBANKTRANSFERSADMIN
        // }
        // if (this.userType == 1) {
        //   url = URL.CONFIRMBANKTRANSFERS
        // }
        let temp = Object.assign({}, data)
        temp.confirm = 1
        this.$axios.dopost(url, temp).then(res => {
          this.$message.success('操作成功')
          this.queryData()
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      refuseClick(data) {
        let url = URL.CONFIRMBANKTRANSFERS
        // if (this.userType == 0) {
        //   url = URL.CONFIRMBANKTRANSFERSADMIN
        // }
        // if (this.userType == 1) {
        //   url = URL.CONFIRMBANKTRANSFERS
        // }
        data.confirm = -1
        this.$axios.dopost(url, data).then(res => {
          this.$message.success('操作成功')
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
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
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .title {
  }

  .content {
  }
</style>
