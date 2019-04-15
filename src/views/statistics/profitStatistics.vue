<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>利润统计</span></p>
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
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
      <!--<ve-histogram :data="chartData"></ve-histogram>-->
      <el-table :data="tableData" border style="width: 100%" v-if="userType == 1">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column label="日期">
          <template slot-scope="scope">{{scope.row.createtime | timeFilter}}</template>
        </el-table-column>
        <el-table-column label="类型">
          <template slot-scope="scope">{{scope.row.inOrOut | inOrOutFilter}}</template>
        </el-table-column>
        <el-table-column prop="money" label="金额"></el-table-column>
        <el-table-column label="平台">
          <template slot-scope="scope">{{scope.row.type | typeFilter}}</template>
        </el-table-column>
        <el-table-column prop="number" label="面单数"></el-table-column>
      </el-table>
      <el-table :data="tableData" border style="width: 100%" v-if="userType == 0">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="adminAlias" label="用户名"></el-table-column>
        <!--<el-table-column label="日期">-->
          <!--<template slot-scope="scope">{{scope.row.createtime | timeFilter}}</template>-->
        <!--</el-table-column>-->
        <el-table-column prop="outNumber" label="售出面单数"></el-table-column>
        <el-table-column prop="inMoney" label="收入金额"></el-table-column>
        <el-table-column prop="inNumber" label="购买面单数"></el-table-column>
        <el-table-column prop="outMoney" label="支出金额"></el-table-column>
        <!--<el-table-column label="类型">-->
        <!--<template slot-scope="scope">{{scope.row.inOrOut | inOrOutFilter}}</template>-->
        <!--</el-table-column>-->
        <!--<el-table-column prop="money" label="金额"></el-table-column>-->
        <el-table-column label="平台">
          <template slot-scope="scope">{{scope.row.type | typeFilter}}</template>
        </el-table-column>
        <!--<el-table-column prop="number" label="面单数"></el-table-column>-->
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "profitStatistics",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        searchData: {
          searchDate: []
        },
        tableData: []
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.searchData.searchDate = [new Date(), new Date()];
      this.getRecord();
    },
    methods: {
      getRecord() {
        let url
        if (this.userType == 0) {
          url = URL.STATADMINPROFIT
        }
        if (this.userType == 1) {
          url = URL.GETMYPROFIT
        }
        let searchDate = this.searchData.searchDate && this.searchData.searchDate.length > 0 ? this.searchData.searchDate : null
        let sdate = this.$transferDate(searchDate ? searchDate[0] : '')
        let edate = this.$transferDate(searchDate ? searchDate[1] : '')
        let data = {
          sdate,
          edate
        }
        this.$axios.doget(url, data).then(res => {
          // let temp = this.dealData(res)
          // this.chartData.rows = temp
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
              obj['淘宝利润'] = resChild[j].value
            }
            if (resChild[j].key == 1) {
              obj['拼多多利润'] = resChild[j].value
            }
            if (resChild[j].key == 2) {
              obj['京东利润'] = resChild[j].value
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
      inOrOutFilter(d) {
        if (d == -1) {
          d = '支出'
        } else {
          d = '收入'
        }
        return d
      },
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

