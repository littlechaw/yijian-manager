<template>
  <div>
    <headTop></headTop>
    <div class="header-top">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="商家ID">
            <el-input v-model="searchData.storeID" placeholder="请输入商家ID"></el-input>
          </el-form-item>
          <el-form-item label="店名">
            <el-input v-model="searchData.storeName" placeholder="请输入店名"></el-input>
          </el-form-item>
          <el-form-item label="联系人">
            <el-input v-model="searchData.storeChat" placeholder="请输入联系人"></el-input>
          </el-form-item>
          <el-form-item label="联系人电话">
            <el-input v-model="searchData.storePhone" placeholder="请输入联系人电话"></el-input>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="审核状态">
            <el-select v-model="searchData.isOpen">
              <el-option v-for="item in searchData.openList" :label="item.value" :value="item.key" :key="item.key"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="申请时间">
            <el-date-picker class="date-picker-width" v-model="searchData.searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="商家BD">
            <el-input v-model="searchData.storeBD" placeholder="请输入商家BD"></el-input>
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
        <el-table-column prop="storeId" label="商家ID"></el-table-column>
        <el-table-column prop="name" label="店名"></el-table-column>
        <el-table-column prop="storeBD" label="BD"></el-table-column>
        <el-table-column prop="userName" label="联系人"></el-table-column>
        <el-table-column prop="userPhone" label="联系人电话"></el-table-column>
        <el-table-column prop="storeStatus" label="状态">
          <template slot-scope="scope">{{ scope.row.storeStatus | storeStatusFilter }}</template>
        </el-table-column>
        <el-table-column prop="createTime" label="申请时间"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-row>
              <el-button @click="handleClick(scope.row)" type="text" size="small">查看商家信息</el-button>
            </el-row>
            <el-row>
              <el-button @click="updateBD(scope.row)" type="text" size="small" v-if="scope.row.storeStatus == 1">修改BD</el-button>
            </el-row>
            <el-row>
              <el-button @click="changeStoreUser(scope.row)" type="text" size="small" v-if="scope.row.storeStatus == 1">修改登录账户</el-button>
            </el-row>
            <el-row>
              <el-button @click="resetPsd(scope.row)" type="text" size="small" v-if="scope.row.storeStatus == 1">重置平台密码</el-button>
            </el-row>
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

    <el-dialog title="商家信息" :visible.sync="centerDialogVisible" width="50%" center>
      <p><span>店名:</span><span>{{alertData.store.name}}</span></p>
      <p><span>品牌:</span><span>{{alertData.store.brands}}</span></p>
      <p><span>场地面积:</span><span>{{alertData.store.siteArea}}平方米</span></p>
      <p><span>场址:</span><span>{{alertData.store.address}}</span></p>
      <p><span>营业时间:</span><span>{{[alertData.storeSet.runTimeStart,alertData.storeSet.runTimeEnd,false] | timeFilter}}</span></p>
      <p><span>可预约时间段:</span><span>{{[alertData.storeSet.appointStartTime,alertData.storeSet.appointEndTime,false] | timeFilter}}</span></p>
      <p><span>单价:</span><span>{{alertData.store.price}}元/30分钟</span></p>
      <p><span>联系人:</span><span>{{alertData.store.userName}}</span></p>
      <p><span>联系电话:</span><span>{{alertData.store.userPhone}}</span></p>
      <p><span>营业执照:</span><span><img :src="imgUrl+alertData.store.businessLicense" style="width:500px"></span></p>
      <p><span>状态:</span><span>{{alertData.store.storeStatus | storeStatusFilter}}</span></p>
      <p><span>申请人:</span><span>{{alertData.user.name}}</span></p>
      <p><span>手机号:</span><span>{{alertData.user.mobile}}</span></p>
      <span slot="footer" class="dialog-footer" v-if="alertData.store.storeStatus == 0">
        <el-button @click="handleChangeStoreInfo(false)">拒绝申请</el-button>
        <el-button type="primary" @click="handleChangeStoreInfo(true)">通过审核</el-button>
      </span>
      <span slot="footer" class="dialog-footer" v-if="alertData.store.storeStatus == 2">
        <el-button type="primary" @click="handleChangeStoreInfo(true)">通过审核</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
  import {getBeforeDays} from "../utils/mUtils";
  import headTop from '@/components/HeadTop'

  export default {
    name: "MerchantList",
    data() {
      return {
        imgUrl: this.$store.getters.getImgUrl,
        searchData: {
          storeID: '',
          storeName: '',
          storeChat: '',
          storePhone: '',
          openList: [{
            key: 9,
            value: '全部'
          }, {
            key: 0,
            value: '待审核'
          }, {
            key: 1,
            value: '已审核'
          }, {
            key: 2,
            value: '已拒绝'
          }],
          isOpen: 9,
          searchDate: '',
          storeBD: ''
        },
        tableData: [],
        total: 5,
        currentPage: 1,
        alertData: {user: {}, store: {}, storeSet: {}},
        centerDialogVisible: false
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.searchData.searchDate = ["", ""];
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/searchStore.do';
        let storeId = this.searchData.storeID ? +this.searchData.storeID : 0,
          userName = this.searchData.storeChat,
          name = this.searchData.storeName,
          userPhone = this.searchData.storePhone,
          storeStatus = this.searchData.isOpen,
          createTimeStart = this.$transferDate(this.searchData.searchDate[0]),
          createTimeEnd = this.$transferDateAddsuffix(this.searchData.searchDate[1]),
          startIndex = (this.currentPage - 1) * 10,
          pageSize = 10,
          storeBD = this.searchData.storeBD;
        let data = {
          storeId,
          userName,
          name,
          userPhone,
          storeStatus,
          createTimeStart,
          createTimeEnd,
          startIndex,
          pageSize,
          storeBD
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
        let url = '/yijian/opRoot/getStoreDetail.do';
        let storeId = d.storeId;
        let data = {
          storeId
        };
        this.$axios.dopost(url, data).then(res => {
          this.centerDialogVisible = true;
          this.alertData = res;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      changeStoreUser(d) {
        this.$prompt('请输入新的账号', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(({value}) => {
          let url = '/yijian/opRoot/reSetStoreMobile.do';
          let storeId = d.storeId;
          let newMobile = value;
          if (!newMobile) {
            this.$message.error("请输入新账号");
            return false;
          }
          let data = {
            storeId,
            newMobile
          };
          this.$axios.dopost(url, data).then(res => {
            this.$message.success("修改成功！");
            this.queryData();
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }).catch(() => {
        });
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      },
      handleChangeStoreInfo(flag) {
        this.centerDialogVisible = false;
        let url = '/yijian/opRoot/updateStoreStatus.do';
        let data = {
          storeId: this.alertData.store.storeId,
          storeStatus: flag ? 1 : 2
        };
        this.$axios.dopost(url, data).then(res => {
          this.queryData();
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      resetPsd(d) {
        let url = '/yijian/opRoot/reSetStorePassword.do';
        let storeId = d.storeId;
        let data = {
          storeId
        };
        this.$axios.dopost(url, data).then(res => {
          this.$message.success("修改成功！")
          this.queryData();
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      updateBD(d) {
        this.$prompt('请输入商家BD', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputValue: d.storeBD
        }).then(({value}) => {
          let url = '/yijian/opRoot/updateStoreBD.do';
          let storeId = d.storeId;
          let storeBD = value;
          if (!storeBD) {
            this.$message.error("请输入商家BD");
            return false;
          }
          let data = {
            storeId,
            storeBD
          };
          this.$axios.dopost(url, data).then(res => {
            this.$message.success("修改成功！");
            this.queryData();
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }).catch(() => {
        });
      }
    },
    watch: {
      currentPage(nval, oval) {
        this.queryData();
      }
    },
    filters: {
      storeStatusFilter(d) {
        if (d == 0) {
          return '待审核';
        }
        if (d == 1) {
          return '已审核';
        }
        if (d == 2) {
          return '已拒绝';
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
