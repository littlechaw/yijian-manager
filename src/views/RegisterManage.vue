<template>
  <div>
    <headTop></headTop>
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
        <el-table-column prop="userId" label="用户ID"></el-table-column>
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column prop="name" label="昵称"></el-table-column>
        <el-table-column prop="userStatus" label="禁用状态">
          <template slot-scope="scope">{{ scope.row.userStatus | userStatusFilter }}</template>
        </el-table-column>
        <el-table-column prop="balance" label="账户余额"></el-table-column>
        <el-table-column prop="createTime" label="注册时间"></el-table-column>
        <el-table-column prop="monitorDynamicApplyPCT" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.userStatus==1">禁用</el-button>
            <el-button @click="handleClick(scope.row)" type="text" size="small" v-if="scope.row.userStatus==2">启用</el-button>
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
  import {getBeforeDays} from '@/utils/mUtils'
  import headTop from '@/components/HeadTop'

  export default {
    name: "RegisterManage",
    data() {
      return {
        searchData: {
          userid: '',
          telphone: '',
          username: '',
          jinyongList: [{
            key: 0,
            value: '全部'
          }, {
            key: 1,
            value: '正常'
          }, {
            key: 2,
            value: '禁用'
          }],
          isJinyong: 0,
          searchDate: '',
        },
        tableData: [],
        currentPage: 1,
        total: 5
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
        let url = '/yijian/opRoot/searchUser.do';
        let userId = this.searchData.userid ? this.searchData.userid : 0;
        let mobile = this.searchData.telphone;
        let name = this.searchData.username;
        let userStatus = this.searchData.isJinyong;
        let createTimeStart = this.$transferDate(this.searchData.searchDate[0]);
        let createTimeEnd = this.$transferDateAddsuffix(this.searchData.searchDate[1]);
        let startIndex = (this.currentPage-1) * 10;
        let pageSize = 10;
        let data = {
          userId,
          mobile,
          name,
          userStatus,
          createTimeStart,
          createTimeEnd,
          pageSize,
          startIndex
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
        let text = d.userStatus == 1 ? '确认禁用该用户吗？' : '确认启用该用户吗？';
        this.$confirm(text, '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          let url = '/yijian/opRoot/updateUserStatus.do';
          let userId = d.userId;
          let userStatus = d.userStatus == 1 ? 2 : 1;
          let data = {
            userId,
            userStatus
          };
          this.$axios.dopost(url, data).then(res => {
            this.$message({
              type: 'success',
              message: '修改成功!'
            });
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })

        }).catch(() => {

        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
    watch: {
      currentPage(nval, oval) {
        this.queryData();
      }
    },
    filters: {
      userStatusFilter(d) {
        if (d == 1) {
          return '正常'
        }
        if (d == 2) {
          return '禁用'
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
