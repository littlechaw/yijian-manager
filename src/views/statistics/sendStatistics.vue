<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>发货统计</span></p>
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="手机号" v-if="userType == 0 || userType == 1">
            <el-input v-model="searchData.mobile" placeholder="请输入手机号"></el-input>
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
          <el-form-item label="角色" v-if="userType == 0">
            <el-select v-model="searchData.type" placeholder="请选择角色类型">
              <el-option v-for="(item,index) in types" :label="item" :value="index" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="getRecord">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="content">
      <ve-histogram :data="chartData" v-if="userType != 2"></ve-histogram>
      <el-table :data="tableData" border style="width: 100%" v-if="userType == 2">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="name" label="用户名"></el-table-column>
        <el-table-column prop="typeStr" label="类型"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="usedNumber" label="发货面单数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "sendStatistics",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        searchData: {
          type: 2,
          mobile: '',
          searchDate: []
        },
        types: ['用户', '管理员', '全部'],
        tableData: [],
        total: 5,
        currentPage: 1,
        chartData: {
          columns: ['日期', '淘宝发货面单数', '京东发货面单数', '拼多多发货面单数'],
          rows: []
        }
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.searchData.searchDate = [new Date(), new Date()];
      this.queryData();
    },
    methods: {
      queryData() {
        this.getRecord()
      },
      getRecord() {
        let url = URL.STATMAILUSEDBYDAYANDTYPEANDUSER
        let data = {}
        if (this.userType == 2) {
          url = URL.USER_STAT_EXPRESS_USED
          data = {
            fromDate: this.$transferDate(this.searchData.searchDate[0]),
            endDate: this.$transferDate(this.searchData.searchDate[1])
          }
        } else {
          data = {
            sdate: this.$transferDate(this.searchData.searchDate[0]),
            edate: this.$transferDate(this.searchData.searchDate[1]),
            mobile: this.searchData.mobile,
            role: this.searchData.type
          }
        }
        this.$axios.doget(url, data).then(res => {
          if (!res || res.length == 0) return
          if (this.userType == 2) {
            this.tableData = res
          } else {
            let temp = this.dealData(res)
            this.chartData = {
              columns: ['日期', '淘宝发货面单数', '京东发货面单数', '拼多多发货面单数', '合计'],
              rows: temp
            }
          }
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
              obj['淘宝发货面单数'] = resChild[j].value
            }
            if (resChild[j].key == 1) {
              obj['拼多多发货面单数'] = resChild[j].value
            }
            if (resChild[j].key == 2) {
              obj['京东发货面单数'] = resChild[j].value
            }
            if (resChild[j].key == 3) {
              obj['合计'] = resChild[j].value
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
    watch: {
      currentPage(n, o) {
        this.getRecord();
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .title {
  }

  .content {
    flex-direction: column;
    align-items: center;
  }
</style>
