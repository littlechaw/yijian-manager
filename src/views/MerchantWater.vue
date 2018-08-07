<template>
  <div>
    <div class="header-top">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="商家ID">
            <el-input v-model="searchData.storeID" placeholder="请输入商家ID"></el-input>
          </el-form-item>
          <el-form-item label="店名">
            <el-input v-model="searchData.storeName" placeholder="请输入店名"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="searchData.storeChat" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="申请人">
            <el-input v-model="searchData.storeApply" placeholder="请输入申请人"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="交易时间">
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
        <el-table-column prop="storeId" label="商家ID"></el-table-column>
        <el-table-column prop="name" label="店名"></el-table-column>
        <el-table-column prop="userName" label="联系人"></el-table-column>
        <el-table-column prop="requestName" label="申请人"></el-table-column>
        <el-table-column prop="price" label="交易金额"></el-table-column>
        <el-table-column prop="createTime" label="交易时间"></el-table-column>
        <el-table-column prop="outTradeNo" label="订单编号"></el-table-column>
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

  export default {
    name: "MerchantWater",
    data() {
      return {
        searchData: {
          storeID: '',
          storeName: '',
          storeChat: '',
          storeApply: '',
          searchDate: ''
        },
        tableData: [],
        total: 5,
        currentPage: 1,
      }
    },
    mounted() {
      this.searchData.searchDate = [getBeforeDays(7), new Date()];
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/getStoreTradingFlow.do';
        let storeId = this.searchData.storeID ? this.searchData.storeID : 0,
          name = this.searchData.storeName,
          userName = this.searchData.storeChat,
          requestName = this.searchData.storeApply,
          startIndex = this.currentPage == 1 ? 0 : this.currentPage * 10 - 1,
          pageSize = 10,
          createTimeStart = this.$transferDate(this.searchData.searchDate[0]),
          createTimeEnd = this.$transferDateAddsuffix(this.searchData.searchDate[1]);
        let data = {
          storeId,
          name,
          userName,
          requestName,
          startIndex,
          pageSize,
          createTimeStart,
          createTimeEnd
        };
        this.$axios.dopost(url, data).then(res => {
          this.tableData = res;
          this.total = res.length > 0 ? res.length : 1;
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
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
    watch: {
      currentPage(nval, oval) {
        this.queryData();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
