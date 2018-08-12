<template>
  <div>
    <headTop></headTop>
    <h3>客服电话设置</h3>
    <p v-if="!inEdit">{{phone}}</p>
    <p v-if="inEdit">
      <el-input v-model="phone"></el-input>
    </p>
    <p>
      <el-button type="primary" @click="inEdit = true" v-if="!inEdit">编&nbsp;&nbsp;辑</el-button>
      <el-button type="primary" @click="handleClick" v-if="inEdit">保&nbsp;&nbsp;存</el-button>
    </p>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'

  export default {
    name: "ClassificationOfArticles",
    data() {
      return {
        phone: '',
        inEdit: false
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/getConsumerPhone.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.phone = res;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleClick() {
        let url = '/yijian/opRoot/updateConsumerPhone.do';
        let data = {phone: this.phone};
        this.$axios.dopost(url, data).then(res => {
          this.$message.success('修改成功');
          this.inEdit = false;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  h3 {
    margin: 20px;
  }

  p {
    margin: 10px 20px;
    .el-input {
      width: 30%;
    }
  }
</style>
