<template>
  <div>
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
    </div>

  </div>
</template>

<script>
  import {getBeforeDays} from '@/utils/mUtils'

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
    mounted() {
      this.searchData.searchDate = [this.$getBeforeDays(7), new Date()];
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
        let createTimeEnd = this.$transferDate(this.searchData.searchDate[1]);
        let startIndex = this.currentPage == 1 ? 0 : this.currentPage * 10 - 1;
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
          res = [
            {
              "userId": 1,
              "mobile": "18806719676",
              "password": "234234",
              "avatar": "1",
              "name": "土豆2",
              "sex": 0,
              "height": "178.2",
              "weight": "77.2",
              "age": "22",
              "balance": 20,
              "grade": 1,
              "token": "017539rj6an903",
              "createTime": "2018-06-19 22:38:12",
              "introduction": "woshitudoune",
              "openId": null,
              "qqId": "",
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 6,
              "mobile": "15897809567",
              "password": "888888",
              "avatar": "1532443187715file",
              "name": "<表情>",
              "sex": 1,
              "height": "174.0",
              "weight": "73.0",
              "age": "28",
              "balance": 0,
              "grade": 1,
              "token": "6146618m299ox4",
              "createTime": null,
              "introduction": "别改我签名",
              "openId": null,
              "qqId": "",
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 7,
              "mobile": "15897809566",
              "password": "111111",
              "avatar": null,
              "name": "??",
              "sex": 0,
              "height": "170.0",
              "weight": "70.0",
              "age": "18",
              "balance": 0,
              "grade": 1,
              "token": "519808nsez9775",
              "createTime": null,
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 9,
              "mobile": "15897809562",
              "password": "1111111",
              "avatar": "1530430569609file",
              "name": "??",
              "sex": 0,
              "height": "170.0",
              "weight": "70.0",
              "age": "18",
              "balance": 0,
              "grade": 1,
              "token": "69784v53f022ew",
              "createTime": null,
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 10,
              "mobile": "17682310966",
              "password": "888888",
              "avatar": "1530533032146file",
              "name": "????",
              "sex": 1,
              "height": "190.0",
              "weight": "75.0",
              "age": "18",
              "balance": 0,
              "grade": 1,
              "token": "85821r742z5p3d",
              "createTime": null,
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 14,
              "mobile": "12548697788",
              "password": "123456",
              "avatar": null,
              "name": null,
              "sex": 1,
              "height": "31",
              "weight": "11.0",
              "age": "11",
              "balance": 0,
              "grade": 1,
              "token": "94495b3h4t880l",
              "createTime": null,
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 15,
              "mobile": "15715715740",
              "password": "123456",
              "avatar": null,
              "name": null,
              "sex": 1,
              "height": "31",
              "weight": "11.0",
              "age": "11",
              "balance": 0,
              "grade": 1,
              "token": "560561zas0i4dz",
              "createTime": null,
              "introduction": "v",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 20,
              "mobile": "15715715715",
              "password": "",
              "avatar": null,
              "name": null,
              "sex": 1,
              "height": "189",
              "weight": "73.9",
              "age": "30",
              "balance": 0,
              "grade": 1,
              "token": "00627w55607dpi",
              "createTime": null,
              "introduction": "v",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 21,
              "mobile": "17681833622",
              "password": "888888",
              "avatar": "1532006395977file",
              "name": "啦啦啦",
              "sex": 1,
              "height": "170.0",
              "weight": "70.0",
              "age": "17",
              "balance": 0,
              "grade": 1,
              "token": "35870zx7n1r4jr",
              "createTime": null,
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 29,
              "mobile": "18806713",
              "password": "456456",
              "avatar": null,
              "name": "啊啊啊啊",
              "sex": 1,
              "height": "177.1",
              "weight": "135.22",
              "age": "11",
              "balance": 0,
              "grade": 1,
              "token": "08687bujhdx8rz",
              "createTime": null,
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 30,
              "mobile": "188067113",
              "password": "456456",
              "avatar": null,
              "name": "啊啊啊啊",
              "sex": 1,
              "height": "177.1",
              "weight": "135.22",
              "age": "11",
              "balance": 0,
              "grade": 1,
              "token": "26650c54b4hudn",
              "createTime": null,
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 36,
              "mobile": "15555555555",
              "password": "123456",
              "avatar": "1532398411050file",
              "name": "Aaa8888811",
              "sex": 1,
              "height": "31",
              "weight": "11.0",
              "age": "11",
              "balance": 0,
              "grade": 1,
              "token": "9269051pz51011",
              "createTime": "2018-07-23 20:50:57",
              "introduction": "用户未输入",
              "openId": "oQcJH0hlc7O",
              "qqId": "null",
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 37,
              "mobile": "15555666666",
              "password": "123456",
              "avatar": null,
              "name": "111",
              "sex": 1,
              "height": "31",
              "weight": "31cm",
              "age": "11",
              "balance": 0,
              "grade": 1,
              "token": "42861xe430089e",
              "createTime": "2018-07-23 21:32:54",
              "introduction": "用户未输入vbnnn",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 38,
              "mobile": "15664889966",
              "password": "123456",
              "avatar": "1532354231195file",
              "name": "Cvbn",
              "sex": 1,
              "height": "31",
              "weight": "11.0",
              "age": "11",
              "balance": 0,
              "grade": 1,
              "token": "45284sh2fag8c5",
              "createTime": "2018-07-23 21:57:18",
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 39,
              "mobile": "45867855666",
              "password": "",
              "avatar": "1532354275685thirdUserAvatar",
              "name": "Mr≯H'",
              "sex": 1,
              "height": "31",
              "weight": "11.0",
              "age": "11",
              "balance": 0,
              "grade": 1,
              "token": "7570278y1275l2",
              "createTime": "2018-07-23 21:57:55",
              "introduction": "用户未输入",
              "openId": "oQcJH0hlc7O",
              "qqId": null,
              "avatarUrl": "http://thirdwx.qlogo.cn/mmopen/vi_32/AsCOBwoTdNvLDAGduzctH5YbONYLwIh3N8lWsdtUqdZ80b5HpKWQLVe7MQZ94A1xt3sM2WPDQzWyR1qtwOeg6Q/132",
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 40,
              "mobile": "15058082500",
              "password": "123456",
              "avatar": "1532411378615file",
              "name": "萧炎",
              "sex": 1,
              "height": "164",
              "weight": "40.0",
              "age": "15",
              "balance": 0,
              "grade": 1,
              "token": "12010r3036r178",
              "createTime": "2018-07-24 13:53:04",
              "introduction": "用户未输入",
              "openId": null,
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 41,
              "mobile": "17681893248",
              "password": "893248",
              "avatar": "1532434754985file",
              "name": "车市打分",
              "sex": 0,
              "height": "177.1",
              "weight": "135.22",
              "age": "20",
              "balance": 0,
              "grade": 1,
              "token": "78075gu614jn2t",
              "createTime": "2018-07-24 20:02:58",
              "introduction": "哈哈哈哈哈哈",
              "openId": "oGNgu5bd9OEbfVBU7MuX78MWGEwQ",
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            },
            {
              "userId": 42,
              "mobile": "13656692384",
              "password": "692384",
              "avatar": "",
              "name": "LOLO",
              "sex": 1,
              "height": "177",
              "weight": "135.22",
              "age": "20",
              "balance": 0,
              "grade": 1,
              "token": "82373300ij7g7g",
              "createTime": "2018-07-24 20:03:02",
              "introduction": "用户未输入32132",
              "openId": "oGNgu5SVhIT_xiw3no8u_a87De2c",
              "qqId": null,
              "avatarUrl": null,
              "userStatus": 1,
              "storeId": 0,
              "storeStatus": null,
              "consumerPhone": null
            }
          ];
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
        let text = d.isJingyong ? '确认禁用该用户吗？' : '确认启用该用户吗？';
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          this.$message({
            type: 'success',
            message: '删除成功!'
          });
        }).catch(() => {
          this.$message({
            type: 'info',
            message: '已取消删除'
          });
        });
      }
    },
    filters: {
      userStatusFilter(d) {
        if (d == 1) {
          return '启用'
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
