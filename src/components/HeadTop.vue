<template>
  <div class="header_container">
    <el-row>
      <el-col>
        <img src="../../static/qq.png" alt="" v-if="this.storeInfo.userType == 2">
        <a target="_blank" :href="qqChatUrl" v-if="this.storeInfo.userType == 2">QQ客服</a>
        <span @click="handleClick">退出登录</span>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import * as URL from '@/URL'

  export default {
    name: "HeadTop",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        qqChatUrl: JSON.parse(this.$store.getters.getStoreInfo).qqChatUrl
      }
    },
    mounted() {
    },
    methods: {
      handleClick() {
        this.$message({
          type: 'success',
          message: '退出成功'
        });
        this.$router.push('/');
      }
    }
  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .header_container {
    display: flex;
    height: 40px;
    line-height: 40px;
    justify-content: flex-end;
    align-items: center;
    background-color: white;

    .el-row .el-col {
      display: flex;
      align-items: center;
    }

    a {
      margin-right: 20px;
    }

    a:hover, a:visited, a:link, a:active {
      color: black;
    }

    img {
      width: 30px;
      height: 30px;
    }

    span {
      margin-right: 20px;
      cursor: pointer;
    }
  }

</style>
