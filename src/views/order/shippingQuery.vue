<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>发货查询</span></p>
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <!--<el-form-item label="用户名">-->
            <!--<el-input v-model="searchData.username" placeholder="请输入用户名"></el-input>-->
          <!--</el-form-item>-->
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
            <el-button size="small" type="primary" @click="queryData">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="username" label="用户名"></el-table-column>
        <el-table-column prop="type" label="类型"></el-table-column>
        <el-table-column prop="date" label="日期"></el-table-column>
        <el-table-column prop="number" label="发货面单数"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "shippingQuery",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        searchData: {
          username: '',
          searchDate: []
        },
        tableData: []
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.searchData.searchDate = [new Date(), new Date()]
      this.getUsers()
      this.queryData()
    },
    methods: {
      getUsers() {

      },
      queryData() {
        let userType = this.userType
        let url
        if (userType == 0) {
          url = URL.ADMIN_STATMAILBYCUSTOMER
        }
        if (userType == 1) {
          url = URL.ADMIN_STATMAILBYCUSTOMER
        }
        let sdate = this.$transferDate(this.searchData.searchDate[0])
        let edate = this.$transferDate(this.searchData.searchDate[1])
        let data = {
          sdate,
          edate
        }
        this.$axios.doget(url, data).then(res => {
          this.tableData = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
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
