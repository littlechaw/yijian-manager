<template>
  <div>
    <div class="header-top">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-button type="primary" @click="dialogFormVisible = true">新&nbsp;&nbsp;增</el-button>
        </el-row>
        <el-row>
          <el-form-item label="手机号">
            <el-input v-model="searchData.telphone" placeholder="请输入手机号"></el-input>
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="searchData.name" placeholder="请输入名称"></el-input>
          </el-form-item>
          <el-form-item label="发放时间">
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
        <el-table-column prop="couponId" label="序号"></el-table-column>
        <el-table-column prop="name" label="优惠劵名称"></el-table-column>
        <el-table-column prop="name" label="优惠内容">
          <template slot-scope="scope">减免实际计费时间{{scope.row.derateTime}}分钟</template>
        </el-table-column>
        <el-table-column prop="mobile" label="用户手机号"></el-table-column>
        <el-table-column prop="createTime" label="发放时间"></el-table-column>
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
    <el-dialog title="新增发放" :visible.sync="dialogFormVisible" width="30%">
      <p>名称：
        <el-input v-model="alertData.name" size="small"></el-input>
      </p>
      <p>内容：减免实际计费时间
        <el-input v-model="alertData.derateTime" size="small"></el-input>
        分钟
      </p>
      <p>使用期限：自领取时起
        <el-input v-model="alertData.days" size="small"></el-input>
        日内
      </p>
      <p>
        指定用户：
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="mobiles">
        </el-input>
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {getBeforeDays} from "../utils/mUtils";

  export default {
    name: "CouponRecord",
    data() {
      return {
        tableData: [],
        searchData: {
          telphone: '',
          name: '',
          searchDate: ''
        },
        alertData: {
          name: '',
          derateTime: '',
          days: ''
        },
        mobiles: '',
        total: 5,
        currentPage: 1,
        dialogFormVisible: false
      }
    },
    mounted() {
      this.searchData.searchDate = [getBeforeDays(7), new Date()];
      this.queryData();
    },
    methods: {
      addCoupon() {

      },
      queryData() {
        let url = '/yijian/opRoot/findCoupon.do';
        let mobile = this.searchData.telphone,
          name = this.searchData.name,
          endTime = this.$transferDate(this.searchData.searchDate[1]),
          startTime = this.$transferDateAddsuffix(this.searchData.searchDate[0]),
          startIndex = this.currentPage == 1 ? 0 : this.currentPage * 10 - 1,
          pageSize = 10;
        let data = {
          mobile,
          name,
          endTime,
          startTime,
          startIndex,
          pageSize
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
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleClick() {
        let url = '/yijian/opRoot/addCoupons.do';
        let name = this.alertData.name ? this.alertData.name : '',
          derateTime = this.alertData.derateTime ? +this.alertData.derateTime : 0,
          days = this.alertData.days ? +this.alertData.days : 0,
          mobiles = this.mobiles.split(',');
        let data = {
          name,
          derateTime,
          days,
          mobiles
        };
        this.$axios.dopost(url, data).then(res => {
          this.dialogFormVisible = false;
          this.$message.success('修改成功!');
          this.queryData();
        }).catch(e => {
          this.dialogFormVisible = false;
          this.$showErrorMessage(this, e);
        })
      }
    },
    watch: {
      currentPage(val) {
        this.queryData();
      },
      mobiles(val) {
        if (!val) return;
        val = val.replace(/[^\d\,]/g, '');
        this.mobiles = val;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";

  .el-row {
    margin: 10px 0px;
  }

  .el-dialog {
    p {
      margin: 10px 0px;
    }
    .el-input {
      width: 50%;
    }
  }
</style>
