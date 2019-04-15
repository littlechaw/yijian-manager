<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="$route.name" style="min-height: 100%;" background-color="#324057" text-color="#fff" active-text-color="#ffd04b" router>
          <el-row class="usr-area">
            <el-col>
              <el-row type="flex" justify="center">
                <img class="usr-img" src="../../static/user.png" alt="">
              </el-row>
            </el-col>
            <el-col>
              <el-row type="flex" justify="center">
                <span class="usr-span" v-if="userType != 0">{{storeInfo.mobile}}</span>
                <span class="usr-span" v-if="userType == 0">{{storeInfo.name}}</span>
              </el-row>
            </el-col>
          </el-row>
          <hr>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>账户管理</template>
            <el-menu-item index="accountInfo">账户信息</el-menu-item>
            <el-menu-item index="accountRecharge" v-if="userType == 1 || userType == 2">账户充值</el-menu-item>
            <el-menu-item index="rechargeAudit" v-if="userType == 0 || userType == 1">充值审核</el-menu-item>
            <el-menu-item index="changePsw">修改密码</el-menu-item>
          </el-submenu>
          <el-submenu index="2" v-if="userType == 0 || userType == 1">
            <template slot="title"><i class="el-icon-document"></i>用户管理</template>
            <!--<el-menu-item index="addUser">添加用户</el-menu-item>-->
            <el-menu-item index="userInfo">用户信息</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>面单管理</template>
            <el-menu-item index="addressmaintain" v-if="userType == 1 || userType == 2">发货地址</el-menu-item>
            <el-menu-item index="bulkShipment" v-if="userType == 2">批量发货</el-menu-item>
            <el-menu-item index="numberQuery">单号查询</el-menu-item>
            <el-menu-item index="shippingQuery" v-if="userType == 0 || userType == 1">发货查询</el-menu-item>
            <el-menu-item index="sheetManage" v-if="userType == 0">底单管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>下单教程</template>
            <el-menu-item index="orderCourse">下单教程</el-menu-item>
          </el-submenu>
          <el-submenu index="5" v-if="userType == 0 || userType == 1">
            <template slot="title"><i class="el-icon-edit"></i>后台管理</template>
            <el-menu-item index="sysConfig">系统配置</el-menu-item>
            <!--<el-menu-item index="noticeManage">公告管理</el-menu-item>-->
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-location"></i>数据统计</template>
            <el-menu-item index="sendStatistics">发货统计</el-menu-item>
            <el-menu-item index="rechargeStatistics">充值统计</el-menu-item>
            <!--<el-menu-item index="deductionStatistics" v-if="userType == 0 || userType == 1">扣款统计</el-menu-item>-->
            <el-menu-item index="profitStatistics" v-if="userType == 0 || userType == 1">利润统计</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-setting"></i>黑名单管理</template>
            <el-menu-item index="blackList">黑名单管理</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;background: #EEF5F9;">
        <!--<keep-alive>-->
        <router-view></router-view>
        <!--</keep-alive>-->
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "slider",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType
      }
    },
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .manage_page {
    .usr-area {
      margin-top: 20px;
    }

    .usr-img {
      width: 50px;
      height: 50px;
    }

    .usr-span {
      margin-top: 20px;
      color: white;
    }
  }
</style>
