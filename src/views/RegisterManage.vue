<template>
  <div>
    <div class="header-top">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="用户ID">
            <el-input v-model="searchData.userid" placeholder="请输入用户ID"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="searchData.telphone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="searchData.username" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="禁用状态">
            <el-select v-model="searchData.isJinyong">
              <el-option v-for="item in searchData.jinyongList" :label="item.value" :value="item.key" :key="item.key"></el-option>
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
        <el-table-column prop="monitorDynamicRegisterCount" label="用户ID"></el-table-column>
        <el-table-column prop="monitorDynamicAuthInfoCount" label="手机号"></el-table-column>
        <el-table-column prop="monitorDynamicAuthBankCount" label="昵称"></el-table-column>
        <el-table-column prop="monitorDynamicApplyCount" label="禁用状态"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="账户余额"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="注册时间"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">禁用</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>

  </div>
</template>

<script>
  import {getBeforeDays} from '@/utils/mUtils'

  export default {
    name: "RegisterManage",
    data() {
      return {
        searchData:{
          userid: '',
          telphone: '',
          username: '',
          jinyongList: [{
            key: '0',
            value: '全部'
          }, {
            key: '1',
            value: '正常'
          }, {
            key: '2',
            value: '禁用'
          }],
          isJinyong: '0',
          searchDate: '',
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
        let text=d.isJingyong?'确认禁用该用户吗？':'确认启用该用户吗？';
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
