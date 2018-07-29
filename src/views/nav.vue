<template>
  <div class="manage_page fillcontain">
    <el-row style="height: 100%;">
      <el-col :span="4" style="min-height: 100%; background-color: #324057;">
        <el-menu :default-active="$route.name" style="min-height: 100%;" background-color="#324057" text-color="#fff" active-text-color="#ffd04b" router>
          <el-submenu index="1">
            <template slot="title"><i class="el-icon-menu"></i>用户管理</template>
            <el-menu-item index="registermanage">注册用户管理</el-menu-item>
          </el-submenu>
          <el-submenu index="2">
            <template slot="title"><i class="el-icon-document"></i>商家管理</template>
            <el-menu-item index="merchantlist">商家列表</el-menu-item>
            <el-menu-item index="merchantwater">商家流水</el-menu-item>
            <el-menu-item index="pricemanage">定价管理</el-menu-item>
          </el-submenu>
          <el-submenu index="3">
            <template slot="title"><i class="el-icon-plus"></i>订单管理</template>
            <el-menu-item index="ordermanage">订单管理</el-menu-item>
          </el-submenu>
          <el-submenu index="4">
            <template slot="title"><i class="el-icon-star-on"></i>财务管理</template>
            <el-menu-item index="financialflow">财务流水</el-menu-item>
          </el-submenu>
          <el-submenu index="5">
            <template slot="title"><i class="el-icon-edit"></i>文章管理</template>
            <el-menu-item index="editarticle">发布文章</el-menu-item>
            <el-menu-item index="articlelist">文章列表</el-menu-item>
            <el-menu-item index="targetsetting">目标管理</el-menu-item>
          </el-submenu>
          <el-submenu index="6">
            <template slot="title"><i class="el-icon-location"></i>活动管理</template>
            <el-menu-item index="activitymanage">活动管理</el-menu-item>
          </el-submenu>
          <el-submenu index="7">
            <template slot="title"><i class="el-icon-setting"></i>配置</template>
            <!--<el-menu-item index="classificationofarticles">文章分类设置</el-menu-item>-->
            <el-menu-item index="couponregister">注册优惠券</el-menu-item>
            <el-menu-item index="couponrecord">优惠券记录</el-menu-item>
            <el-menu-item index="proportionate">抽成比例</el-menu-item>
            <el-menu-item index="rechargeamount">充值金额</el-menu-item>
            <!--<el-menu-item index="appointmenttime">预约时间</el-menu-item>-->
            <el-menu-item index="gradediscount">满额折扣</el-menu-item>
            <el-menu-item index="pricerange">价格区间</el-menu-item>
          </el-submenu>
          <el-submenu index="8">
            <template slot="title"><i class="el-icon-more"></i>数据统计</template>
            <el-menu-item index="datastatistics">数据统计</el-menu-item>
          </el-submenu>
        </el-menu>
      </el-col>
      <el-col :span="20" style="height: 100%;overflow: auto;">
        <keep-alive>
          <router-view></router-view>
        </keep-alive>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default {
    name: "slider",
    mounted() {
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .manage_page {

  }
</style>
