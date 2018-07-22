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
          <el-form-item label="审核状态">
            <el-select v-model="searchData.isOpen">
              <el-option v-for="item in searchData.openList" :label="item.value" :value="item.key" :key="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
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
        <el-table-column prop="monitorDynamicRegisterCount" label="商家ID"></el-table-column>
        <el-table-column prop="monitorDynamicAuthInfoCount" label="店名"></el-table-column>
        <el-table-column prop="monitorDynamicAuthBankCount" label="联系人"></el-table-column>
        <el-table-column prop="monitorDynamicApplyCount" label="申请人"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="状态"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="申请时间"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看商家信息</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import {getBeforeDays} from "../utils/mUtils";

  export default {
    name: "MerchantList",
    data() {
      return {
        searchData:{
          storeID: '',
          storeName: '',
          storeChat: '',
          storeApply:'',
          openList: [{
            key: '0',
            value: '全部'
          }, {
            key: '1',
            value: '待审核'
          }, {
            key: '2',
            value: '已审核'
          }, {
            key: '3',
            value: '已拒绝'
          }],
          isOpen: '0',
          searchDate: ''
        },
        tableData: []
      }
    },
    mounted() {
      this.searchData.searchDate = [getBeforeDays(7), new Date()];
    },
    methods: {
      queryData() {

      },
      headerStyle: function () {
        return {
          "color": "#000",
          "font-weight": "normal",
          "text-align": "center"
        }
      },
      handleClick(d){

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
