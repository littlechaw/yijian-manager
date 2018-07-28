<template>
  <div>
    <div class="header-top">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="商家ID">
            <el-input v-model="searchData.storeID" placeholder="请输入商家ID"></el-input>
          </el-form-item>
          <el-form-item label="手机号">
            <el-input v-model="searchData.telphone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="昵称">
            <el-input v-model="searchData.userName" placeholder="请输入昵称"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="订单状态">
            <el-select v-model="searchData.orderStatus">
              <el-option v-for="(item,index) in searchData.statusList" :label="item.value" :value="item.key" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="订单生成时间">
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
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="appointId" label="订单编号"></el-table-column>
        <el-table-column prop="appointStatus" label="状态"></el-table-column>
        <el-table-column prop="requestTime" label="订单生成时间"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看订单详情</el-button>
          </template>
        </el-table-column>
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
  export default {
    name: "OrderManage",
    data() {
      return {
        searchData: {
          storeID: '',
          telphone: '',
          userName: '',
          statusList: [{
            key: '9',
            value: '全部'
          }, {
            key: '0',
            value: '待支付'
          }, {
            key: '1',
            value: '待参加'
          }, {
            key: '2',
            value: '进行中'
          }, {
            key: '3',
            value: '已完成'
          }, {
            key: '4',
            value: '已取消'
          }],
          orderStatus: '9',
          searchDate: ''
        },
        tableData: [],
        total: 5,

      }
    },
    mounted() {
      this.searchData.searchDate = [this.$getBeforeDays(7), new Date()];
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/getAppoint.do';
        let data = {
          userId: this.searchData.storeID,
          mobile: this.searchData.telphone,
          name: this.searchData.userName,
          appointStatus: this.searchData.orderStatus,
          startIndex: 0,
          pageSize: 10,
          requestTimeStart: this.$transferDate(this.searchData.searchDate[0]),
          requestTimeEnd: this.$transferDate(this.searchData.searchDate[1])
        };
        this.$axios.dopost(url, data).then(res => {
          this.tableData = res;
          this.total = res.length;
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
      handleCurrentChange() {

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
