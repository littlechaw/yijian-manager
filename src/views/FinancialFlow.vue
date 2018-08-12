<template>
  <div>
    <headTop></headTop>
    <div class="header-top">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="订单编号">
            <el-input v-model="searchData.orderID" placeholder="请输入订单编号"></el-input>
          </el-form-item>
          <el-form-item label="店名">
            <el-input v-model="searchData.storeName" placeholder="请输入店名"></el-input>
          </el-form-item>
          <el-form-item label="订单结算日期">
            <el-date-picker class="date-picker-width" v-model="searchData.searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="content">
      <el-table
        :data="tableData"
        border
        :header-cell-style="headerStyle"
        style="width: 100%;text-align:center">
        <el-table-column prop="outTradeNo" label="订单编号"></el-table-column>
        <el-table-column prop="name" label="店名"></el-table-column>
        <el-table-column prop="price" label="结算金额"></el-table-column>
        <el-table-column prop="profit" label="抽成"></el-table-column>
        <el-table-column prop="createTime" label="订单结算时间"></el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
  import {getBeforeDays} from "../utils/mUtils";
  import headTop from '@/components/HeadTop'


  export default {
    name: "FinancialFlow",
    data() {
      return {
        searchData: {
          orderID: '',
          storeName: '',
          searchDate: ''
        },
        tableData: [],
        total: 5,
        currentPage: 1
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.searchData.searchDate = [getBeforeDays(7), new Date()];
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/findServiceFlow.do';
        let outTradeNo = this.searchData.orderID ? this.searchData.orderID : 0,
          name = this.searchData.storeName,
          startIndex = (this.currentPage-1) * 10,
          pageSize = 10,
          createTimeStart = this.$transferDate(this.searchData.searchDate[0]),
          createTimeEnd = this.$transferDateAddsuffix(this.searchData.searchDate[1]);
        let data = {
          outTradeNo,
          name,
          startIndex,
          pageSize,
          createTimeStart,
          createTimeEnd
        };
        this.$axios.dopost(url, data).then(res => {
          this.tableData = res.data;
          this.total = res.total;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      headerStyle: function () {
        return {
          "color": "#000",
          "font-weight": "normal",
          "text-align": "center"
        }
      },
      handleClick(d) {

      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
    watch: {
      currentPage() {
        this.queryData();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
