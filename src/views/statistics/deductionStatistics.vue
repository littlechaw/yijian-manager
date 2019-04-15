<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>扣款统计</span></p>
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
      <ve-histogram :data="chartData"></ve-histogram>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "deductionStatistics",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        searchData: {
          searchDate: []
        },
        tableData: [],
        chartData: {
          columns: ['日期', '淘宝扣款', '京东扣款', '拼多多扣款'],
          rows: [
            {'日期': '1/1', '淘宝扣款': 1393, '京东扣款': 1093, '拼多多扣款': 1094},
            {'日期': '1/2', '淘宝扣款': 3530, '京东扣款': 3230, '拼多多扣款': 3231},
            {'日期': '1/3', '淘宝扣款': 2923, '京东扣款': 2623, '拼多多扣款': 2623},
            {'日期': '1/4', '淘宝扣款': 1723, '京东扣款': 1423, '拼多多扣款': 1456},
            {'日期': '1/5', '淘宝扣款': 3792, '京东扣款': 3492, '拼多多扣款': 3499},
            {'日期': '1/6', '淘宝扣款': 4593, '京东扣款': 4293, '拼多多扣款': 4289}
          ]
        }
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
        if (this.userType == 2) {
          url = URL.USER_EXPRESS_BUY_LIST
        }
        if (this.userType == 1 || this.userType == 0) {
          url = URL.ADMIN_EXPRESS_BUY_LIST
        }
        let searchDate = this.searchData.searchDate && this.searchData.searchDate.length > 0 ? this.searchData.searchDate : null
        let fromDate = this.$transferDate(searchDate ? searchDate[0] : '') + ' 00:00:00'
        let endDate = this.$transferDate(searchDate ? searchDate[1] : '') + ' 00:00:00'
        let data = {
          fromDate,
          endDate
        }
        if (this.userType == 0 || this.userType == 1) {
          data.userId = this.storeInfo.id
        }
        this.$axios.doget(url, data).then(res => {
          this.tableData = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
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


