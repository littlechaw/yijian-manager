<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>充值统计</span></p>
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="手机号" v-if="userType != 2">
            <el-input placeholder="请输入手机号" v-model="searchData.mobile"></el-input>
          </el-form-item>
          <el-form-item label="类型" v-if="userType != 2">
            <el-select v-model="searchData.role" placeholder="请选择">
              <el-option
                v-for="(item,index) in roles"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="开始时间">
            <el-date-picker
              v-model="searchData.searchDate[0]"
              type="date"
              placeholder="开始时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="结束时间">
            <el-date-picker
              v-model="searchData.searchDate[1]"
              type="date"
              placeholder="结束时间">
            </el-date-picker>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="getRecord">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
          <!--<el-form-item>-->
          <!--<el-button size="small" type="danger" @click="exportRecord()">导&nbsp;&nbsp;出</el-button>-->
          <!--</el-form-item>-->
        </el-row>
      </el-form>
    </div>

    <div class="content">
      <span v-if="userType == 0 || userType == 1">客户充值统计</span>
      <ve-histogram :data="chartData" v-if="userType == 0 || userType == 1"></ve-histogram>
      <span v-if="userType == 2 || userType == 1">充值记录统计</span>
      <!--<ve-histogram :data="chartData2" v-if="userType == 2 || userType == 1"></ve-histogram>-->
      <el-table :data="tableData" border style="width: 100%" v-if="userType == 2 || userType == 1">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column label="购买时间">
          <template slot-scope="scope">{{scope.row.createTime | transferTime}}</template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">{{scope.row.type | typeFilter}}</template>
        </el-table-column>
        <el-table-column prop="buyMailNumber" label="数量"></el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "rechargeStatistics",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        searchData: {
          mobile: '',
          searchDate: [],
          role: 0
        },
        roles: ['用户', '管理员'],
        tableData: [],
        chartData: {
          columns: ['日期', '淘宝充值面单数', '京东充值面单数', '拼多多充值面单数'],
          rows: []
        },
        chartData2: {
          columns: ['日期', '淘宝充值面单数', '京东充值面单数', '拼多多充值面单数'],
          rows: []
        }
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.searchData.searchDate = [this.$getBeforeDays(6), new Date()];
      this.getRecord()
    },
    methods: {
      getRecord() {
        if (this.userType == 0 || this.userType == 1) {
          this.getRecharge()
        }
        if (this.userType == 1 || this.userType == 2) {
          this.getRecharged()
        }
      },
      getRecharge() {
        let url = URL.ADMIN_STAT_EXPRESS_BUY
        let searchDate = this.searchData.searchDate && this.searchData.searchDate.length > 0 ? this.searchData.searchDate : null
        let fromDate = this.$transferDate(searchDate ? searchDate[0] : '')
        let endDate = this.$transferDate(searchDate ? searchDate[1] : '')
        let mobile = this.searchData.mobile
        let role = this.searchData.role
        let data = {
          mobile,
          fromDate,
          endDate,
          role
        }
        this.$axios.doget(url, data).then(res => {
          if (!res || res.length == 0) return
          let temp = this.dealData(res)
          this.chartData = {
            columns: ['日期', '淘宝充值面单数', '拼多多充值面单数', '京东充值面单数'],
            rows: temp
          }
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      getRecharged() {
        let url
        if (this.userType == 2) {
          url = URL.USER_EXPRESS_BUY_LIST
        }
        if (this.userType == 1) {
          url = URL.ADMIN_MYEXPRESS_BUY_LIST
        }
        let searchDate = this.searchData.searchDate && this.searchData.searchDate.length > 0 ? this.searchData.searchDate : null
        let fromDate = this.$transferDate(searchDate ? searchDate[0] : '') + ' 00:00:00'
        let endDate = this.$transferDate(searchDate ? searchDate[1] : '') + ' 00:00:00'
        let data = {
          fromDate,
          endDate
        }
        this.$axios.doget(url, data).then(res => {
          if (!res || res.length == 0) return
          this.tableData = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      dealData(res) {
        let temp = []
        for (let i in res) {
          let obj = {
            '日期': res[i].key
          }
          let resChild = res[i].value
          for (let j in resChild) {
            if (resChild[j].key == 0) {
              obj['淘宝充值面单数'] = resChild[j].value
            }
            if (resChild[j].key == 1) {
              obj['拼多多充值面单数'] = resChild[j].value
            }
            if (resChild[j].key == 2) {
              obj['京东充值面单数'] = resChild[j].value
            }
          }
          temp.push(obj)
        }
        if (temp.length > 1) {
          let a = new Date(temp[0]['日期']).getTime()
          let b = new Date(temp[1]['日期']).getTime()
          if (a > b) {
            temp = temp.reverse()
          }
        }
        return temp
      }
    },
    filters: {
      typeFilter(d) {
        if (d == 0) {
          d = '淘宝'
        }
        if (d == 1) {
          d = '拼多多'
        }
        if (d == 2) {
          d = '京东'
        }
        return d
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .title {
  }

  .content {
  }
</style>
