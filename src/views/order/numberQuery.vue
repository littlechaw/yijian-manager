<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>单号查询</span></p>
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="类型">
            <el-select v-model="searchData.type">
              <el-option v-for="(item,index) in searchData.types" :label="item" :value="index" :key="index"></el-option>
            </el-select>
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
          <el-form-item label="快递号">
            <el-input v-model="searchData.mailNo" placeholder="请输入快递号"></el-input>
          </el-form-item>
          <el-form-item label="订单号">
            <el-input v-model="searchData.tradeNo" placeholder="请输入订单号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="getRecord">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="danger" @click="exportRecord">导&nbsp;&nbsp;出</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="sendName" label="发件人姓名" width="120"></el-table-column>
        <el-table-column prop="mailNo" label="快递号" width="120"></el-table-column>
        <el-table-column prop="sendMobile" label="发件人电话" width="120"></el-table-column>
        <el-table-column prop="sendAddress" label="发件人地址"></el-table-column>
        <el-table-column prop="tradeNo" label="订单号" width="120"></el-table-column>
<!--        <el-table-column prop="wangwangId" label="买家会员名" width="120"></el-table-column>-->
        <el-table-column prop="receiveName" label="收件人姓名" width="120"></el-table-column>
        <el-table-column prop="receiveMobile" label="收件人电话" width="120"></el-table-column>
        <el-table-column prop="receiveAddress" label="收件人地址"></el-table-column>
        <el-table-column prop="itemsWeight" label="物品重量" width="120"></el-table-column>
        <el-table-column prop="itemName" label="货品名称" width="120"></el-table-column>
        <el-table-column label="功能" width="100"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          layout="prev, pager, next"
          :page-size.sync="pageSize"
          :current-page.sync="currentPage"
          :total="totalPages"
          @current-change="handleCurrentChange"
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "numberQuery",
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
        totalPages: 1,
        pageSize: 20,
        currentPage: 1
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.searchData.searchDate = [new Date(), new Date()];
      // this.queryData();
    },
    methods: {
      queryData() {
        this.getRecord()
      },
      getRecord() {
        let url
        if (this.userType == 2) {
          url = URL.USER_EXPRESS_LIST
        }
        if (this.userType == 1 || this.userType == 0) {
          url = URL.ADMIN_EXPRESS_LIST
        }
        let searchDate = this.searchData.searchDate && this.searchData.searchDate.length > 0 ? this.searchData.searchDate : null
        let fromDate = this.$transferDate(searchDate ? searchDate[0] : '')
        let endDate = this.$transferDate(searchDate ? searchDate[1] : '')
        let mailNo = this.searchData.mailNo
        let tradeNo = this.searchData.tradeNo
        let type = this.searchData.type
        let pageIndex = (this.currentPage - 1) * this.pageSize
        let pageSize = this.pageSize
        let data = {
          fromDate,
          endDate,
          mailNo,
          tradeNo,
          type,
          pageIndex,
          pageSize
        }
        this.$axios.doget(url, data).then(res => {
          this.tableData = res.content
          this.totalPages = res.totalPages
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      handleCurrentChange() {
        this.getRecord()
      },
      exportRecord() {
        let url
        if (this.userType == 2) {
          url = URL.USER_EXCEL_EXPRESS_USED
        }
        if (this.userType == 1 || this.userType == 0) {
          url = URL.ADMIN_EXCEL_EXPRESS_USED
        }
        let searchDate = this.searchData.searchDate && this.searchData.searchDate.length > 0 ? this.searchData.searchDate : null
        let fromDate = this.$transferDate(searchDate ? searchDate[0] : '')
        let endDate = this.$transferDate(searchDate ? searchDate[1] : '')
        let type = this.searchData.type
        let data = {
          fromDate,
          endDate,
          type
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
