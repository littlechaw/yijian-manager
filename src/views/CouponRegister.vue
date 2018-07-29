<template>
  <div>
    <div class="header-top">
      <el-row>
        <el-button type="primary" @click="queryData">新&nbsp;&nbsp;增</el-button>
      </el-row>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        border
        :header-cell-style="headerStyle"
        style="width: 100%;text-align:center">
        <el-table-column prop="monitorDynamicRegisterCount" label="序号"></el-table-column>
        <el-table-column prop="monitorDynamicAuthInfoCount" label="优惠券名称"></el-table-column>
        <el-table-column prop="monitorDynamicAuthBankCount" label="优惠内容"></el-table-column>
        <el-table-column prop="monitorDynamicAuthBankCount" label="有效时间"></el-table-column>
        <el-table-column prop="monitorDynamicAuthBankCount" label="状态"></el-table-column>
        <el-table-column prop="monitorDynamicAuthBankCount" label="使用数量/发放数量"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  export default {
    name: "Coupon",
    data() {
      return {
        tableData: []
      }
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
      handleClick(d) {

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
