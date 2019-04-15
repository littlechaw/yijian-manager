<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>底单管理</span></p>
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="订单号">
            <el-input v-model="searchData.mailNo" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <!--<el-form-item label="订单号">-->
          <!--<el-input v-model="searchData.tradeNo" placeholder="请输入订单号"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-button size="small" type="primary" @click="getRecord">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
          <!--<el-form-item>-->
          <!--<el-button size="small" type="primary" @click="exportRecord">导&nbsp;&nbsp;出</el-button>-->
          <!--</el-form-item>-->
          <el-form-item v-if="userType == 0">
            <el-button size="small" type="primary" @click="getSanDuan">查询三段码</el-button>
          </el-form-item>
          <el-form-item v-if="userType == 0">
            <el-button size="small" type="danger" @click="exportSanduan">导出三段码</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" v-if="isNormal">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="adminName" label="管理员账户"></el-table-column>
        <el-table-column prop="alias" label="用户名"></el-table-column>
        <el-table-column label="发货日期">
          <template slot-scope="scope">{{scope.row.ytoMailno.createtime | transferTime}}</template>
        </el-table-column>
        <el-table-column label="发件人信息">
          <template slot-scope="scope">{{scope.row.ytoMailno.sendName}}</template>
        </el-table-column>
        <el-table-column label="收件人信息">
          <template slot-scope="scope">{{scope.row.ytoMailno.receiveName}}</template>
        </el-table-column>
        <el-table-column label="操作" width="100">
          <template slot-scope="scope">
            <el-button @click="exportRecord(scope.row)" type="text" size="small">导出</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-table :data="tableData2" border style="width: 100%" v-if="!isNormal">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="mailNo" label="快递单号号"></el-table-column>
        <el-table-column prop="tradeNo" label="订单号"></el-table-column>
        <el-table-column prop="sendName" label="发件人"></el-table-column>
        <el-table-column prop="sendMobile" label="发件人电话"></el-table-column>
        <el-table-column prop="receiveName" label="收件人"></el-table-column>
        <el-table-column prop="receiveMobile" label="收件人电话"></el-table-column>
        <el-table-column prop="itemName" label="快递物品"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'


  export default {
    name: "sheetManage",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        searchData: {
          mailNo: '',
          tradeNo: '',
          type: 0,
          types: ['淘宝', '拼多多', '京东'],
          searchDate: []
        },
        tableData: [],
        tableData2: [],
        isNormal: true
      }
    },
    components: {headTop},
    mounted() {
      this.searchData.searchDate = [new Date(), new Date()];
    },
    methods: {
      queryData() {

      },
      getRecord() {
        this.isNormal = true
        let url = URL.GETADMINOFMAILNO
        let mailno = this.searchData.mailNo
        let data = {
          mailno
        }
        this.$axios.doget(url, data).then(res => {
          this.tableData = []
          if (res) {
            this.tableData.push(res)
          }
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      exportRecord(data) {
        console.info(data);
      },
      getSanDuan() {
        this.isNormal = false
        let url = URL.GETMAILNOINFO
        let data = {
          mailno: this.searchData.mailNo
        }
        this.$axios.doget(url, data).then(res => {
          this.tableData2 = []
          if (res) {
            this.tableData2.push(res)
          }
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      exportSanduan() {
        let url = URL.EXCELYTOMAIL
        let data = {
          mailno: this.searchData.mailNo
        }
        this.$axios.getRemoteFile(url, data).catch(e => {
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
        if (d == 2) {
          d = '没通过'
        }
        if (d == '' || d == undefined) {
          d = '-'
        }
        return d;
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .title {
  }

  .content {
    flex-direction: column;
  }
</style>
