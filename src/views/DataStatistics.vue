<template>
  <div>
    <headTop></headTop>
    <div class="header-top">
      <h3>用户统计：</h3>
    </div>
    <div class="content">
      <el-form :inline="true" :model="searchData1" class="demo-form-inline">
        <el-row>
          <el-form-item label="日期">
            <el-date-picker class="date-picker-width" v-model="searchData1.searchDate1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="getRigesterNumber(false)">搜索</el-button>
        </el-row>
        <el-row>
          注册用户数：{{searchData1.rigesterNumber}}
          <el-button type="primary" @click="getRigesterNumber(true)">导出</el-button>
        </el-row>
        <el-row>
          <el-form-item label="日期">
            <el-date-picker class="date-picker-width" v-model="searchData1.searchDate2" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="getRechargeUserNumber(false)">搜索</el-button>
        </el-row>
        <el-row>
          充值用户数：{{searchData1.rechargeMoney}}
          <el-button type="primary" @click="getRechargeUserNumber(true)">导出</el-button>
        </el-row>
        <el-row>
          <el-form-item label="日期">
            <el-date-picker class="date-picker-width" v-model="searchData1.searchDate3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="getTransactionUserNumber(false)">搜索</el-button>
        </el-row>
        <el-row>
          交易用户数：{{searchData1.transactionUserNumber}}
          <el-button type="primary" @click="getTransactionUserNumber(true)">导出</el-button>
        </el-row>
      </el-form>
    </div>
    <div class="header-top">
      <h3>资金统计：</h3>
    </div>
    <div class="content">
      <el-form :inline="true" :model="searchData2" class="demo-form-inline">
        <el-row>
          <el-form-item label="日期">
            <el-date-picker class="date-picker-width" v-model="searchData2.searchDate1" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="getSumRechargeUserNumber(false)">搜索</el-button>
        </el-row>
        <el-row>
          总充值金额：{{searchData2.sumRechargeUserNumber}}
          <el-button type="primary" @click="getSumRechargeUserNumber(true)">导出</el-button>
        </el-row>
        <el-row>
          <el-form-item label="日期">
            <el-date-picker
              v-model="searchData2.searchDate2"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="getStationFund(false)">搜索</el-button>
        </el-row>
        <el-row>
          站岗资金：{{searchData2.stationFund}}
          <el-button type="primary" @click="getStationFund(true)">导出</el-button>
        </el-row>
        <el-row>
          <el-form-item label="日期">
            <el-date-picker class="date-picker-width" v-model="searchData2.searchDate3" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-button type="primary" @click="getBusinessRunningWater(false)">搜索</el-button>
        </el-row>
        <el-row>
          营业流水：{{searchData2.businessRunningWater}}
          <el-button type="primary" @click="getBusinessRunningWater(true)">导出</el-button>
        </el-row>
      </el-form>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'

  export default {
    name: "DataStatistics",
    data() {
      return {
        serverUrl: 'http://212.64.16.120',
        searchData1: {
          searchDate1: '',
          searchDate2: '',
          searchDate3: '',
          rigesterNumber: '',
          rechargeMoney: '',
          transactionUserNumber: ''
        },
        searchData2: {
          searchDate1: '',
          searchDate2: '',
          searchDate3: '',
          sumRechargeUserNumber: '',
          stationFund: '',
          businessRunningWater: ''
        }
      }
    },
    mounted() {
      this.searchData1.searchDate1 = [new Date('2018-01-01'), new Date()];
      this.searchData1.searchDate2 = [new Date('2018-01-01'), new Date()];
      this.searchData1.searchDate3 = [new Date('2018-01-01'), new Date()];
      this.searchData2.searchDate1 = [new Date('2018-01-01'), new Date()];
      this.searchData2.searchDate2 = new Date();
      this.searchData2.searchDate3 = [new Date('2018-01-01'), new Date()];
      this.getRigesterNumber();
      this.getRechargeUserNumber();
      this.getTransactionUserNumber();
      this.getSumRechargeUserNumber();
      this.getStationFund();
      this.getBusinessRunningWater();
    },
    components: {
      headTop
    },
    methods: {
      getRigesterNumber(flag) {
        let startTime = this.$transferDate(this.searchData1.searchDate1[0]);
        let endTime = this.$transferDate(this.searchData1.searchDate1[1]);
        if (flag) {
          let url = '/yijian/opRoot/getRegisNumForExcel.do';
          var a1 = document.createElement('a');
          a1.setAttribute('href', this.serverUrl + url + '?startTime=' + startTime + '&endTime=' + endTime);
          var body = document.querySelector('body');
          body.appendChild(a1);
          a1.click();
          a1.remove();
        } else {
          let url = '/yijian/opRoot/getRegisNum.do';
          let data = {
            startTime,
            endTime
          };
          this.$axios.dopost(url, data).then(res => {
            this.searchData1.rigesterNumber = res;
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }
      },
      getRechargeUserNumber(flag) {
        if (flag) {

        } else {
          let url = '/yijian/opRoot/getRechargeNum.do';
          let startTime = this.$transferDate(this.searchData1.searchDate1[0]);
          let endTime = this.$transferDate(this.searchData1.searchDate1[1]);
          let data = {
            startTime,
            endTime
          };
          this.$axios.dopost(url, data).then(res => {
            this.searchData1.rechargeMoney = res;
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }
      },
      getTransactionUserNumber(flag) {
        if (flag) {

        } else {
          let url = '/yijian/opRoot/getTransactionNum.do';
          let startTime = this.$transferDate(this.searchData1.searchDate1[0]);
          let endTime = this.$transferDate(this.searchData1.searchDate1[1]);
          let data = {
            startTime,
            endTime
          };
          this.$axios.dopost(url, data).then(res => {
            this.searchData1.transactionUserNumber = res;
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }
      },
      getSumRechargeUserNumber(flag) {
        if (flag) {

        } else {
          let url = '/yijian/opRoot/getRechargeMoney.do';
          let startTime = this.$transferDate(this.searchData1.searchDate1[0]);
          let endTime = this.$transferDate(this.searchData1.searchDate1[1]);
          let data = {
            startTime,
            endTime
          };
          this.$axios.dopost(url, data).then(res => {
            this.searchData2.sumRechargeUserNumber = res;
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }
      },
      getStationFund(flag) {
        console.info(flag);
        if (flag) {

        } else {
          let url = '/yijian/opRoot/getStandingFunds.do';
          let startTime = this.$transferDate(this.searchData1.searchDate1[0]);
          let endTime = this.$transferDate(this.searchData1.searchDate1[1]);
          let data = {
            startTime,
            endTime
          };
          this.$axios.dopost(url, data).then(res => {
            this.searchData2.stationFund = res;
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }
      },
      getBusinessRunningWater(flag) {
        if (flag) {

        } else {
          let url = '/yijian/opRoot/getTransactionMoney.do';
          let startTime = this.$transferDate(this.searchData1.searchDate1[0]);
          let endTime = this.$transferDate(this.searchData1.searchDate1[1]);
          let data = {
            startTime,
            endTime
          };
          this.$axios.dopost(url, data).then(res => {
            this.searchData2.businessRunningWater = res;
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";

  .el-row {
    margin-top: 10px;
    .el-form-item {
      margin-bottom: 0px;
    }
  }
</style>
