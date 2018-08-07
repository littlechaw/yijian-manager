<template>
  <div>
    <div class="header-top">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="发布人">
            <el-input v-model="searchData.auth" placeholder="请输入发布人"></el-input>
          </el-form-item>
          <el-form-item label="发布时间">
            <el-date-picker class="date-picker-width" v-model="searchData.searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="是否完成">
            <el-select v-model="searchData.isDone">
              <el-option v-for="item in searchData.statusList" :label="item.value" :value="item.key" :key="item.key"></el-option>
            </el-select>
          </el-form-item>
          <!--<el-form-item label="活动目标">-->
          <!--<el-select v-model="searchData.aim">-->
          <!--<el-option v-for="item in searchData.aimList" :label="item.value" :value="item.key" :key="item.key"></el-option>-->
          <!--</el-select>-->
          <!--</el-form-item>-->
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
        <el-table-column prop="activityId" label="序号"></el-table-column>
        <el-table-column prop="header" label="活动标题"></el-table-column>
        <el-table-column prop="name" label="发布人"></el-table-column>
        <el-table-column prop="activityStatus" label="状态"></el-table-column>
        <el-table-column prop="createTime" label="发布时间"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">查看活动详情</el-button>
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
    <el-dialog title="订单详情" :visible.sync="centerDialogVisible" width="30%" center>
      <p><span>活动标题:</span><span>{{alertData.activity.header}}</span></p>
      <p><span>活动目标:</span><span>{{alertData.activity.target}}</span></p>
      <p><span>发起人:</span><span>{{alertData.user.name}}</span></p>
      <p><span>手机号:</span><span>{{alertData.user.mobile}}</span></p>
      <p><span>发起人订单编号:</span><span>{{alertData.activity.appointId}}</span></p>
      <p><span>商家:</span><span>{{alertData.store.name}}</span></p>
      <p><span>商家地址:</span><span>{{alertData.store.address}}</span></p>
      <p><span>预约时间:</span><span>{{[alertData.activity.startTime,alertData.activity.endTime,false] | timeFilter}}</span></p>
      <p><span>计费时间:</span><span>{{[alertData.activity.startTime,alertData.activity.endTime,false] | timeFilter}}</span></p>
      <p><span>其他参与人:</span></p>
      <p v-for="item in alertData.applyActivity"><span>{{item.userName}}</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;手机号：{{item.userPhoto}}</p>
      <p><span>活动状态:</span><span>{{alertData.activity.activityStatus | activityStatusFilter}}</span></p>
    </el-dialog>
  </div>
</template>

<script>
  import {getBeforeDays} from "../utils/mUtils";

  export default {
    name: "ActivityManage",
    data() {
      return {
        searchData: {
          auth: '',
          isDone: 9,
          statusList: [{
            key: 9,
            value: '全部'
          }, {
            key: 0,
            value: '未开始'
          }, {
            key: 1,
            value: '进行中'
          }, {
            key: 2,
            value: '已结束'
          }],
          searchDate: ''
        },
        tableData: [],
        total: 5,
        currentPage: 1,
        alertData: {activity: {}, store: {}, applyActivity: {}, user: {}},
        centerDialogVisible: false
      }
    },
    mounted() {
      this.searchData.searchDate = [getBeforeDays(7), new Date()];
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/findActivity.do';
        let userName = this.searchData.auth,
          startTime = this.$transferDate(this.searchData.searchDate[0]),
          endTime = this.$transferDateAddsuffix(this.searchData.searchDate[1]),
          status = this.searchData.isDone,
          startIndex = this.currentPage == 1 ? 0 : this.currentPage * 10 - 1,
          pageSize = 10;
        let data = {
          userName,
          startTime,
          endTime,
          status,
          startIndex,
          pageSize
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
      handleClick(d) {
        let activityId = d.activityId;
        let url = '/yijian/opRoot/getActivityDetail.do';
        let data = {activityId};
        this.$axios.dopost(url, data).then(res => {
          this.alertData = res;
          this.centerDialogVisible = true;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
    watch: {
      currentPage(n, o) {
        this.queryData();
      }
    },
    filters: {
      activityStatusFilter(d) {
        if (d == 0) {
          return '未开始';
        }
        if (d == 1) {
          return '进行中';
        }
        if (d == 2) {
          return '已结束';
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
