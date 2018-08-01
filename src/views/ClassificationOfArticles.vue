<template>
  <div>
    <h3>客服电话设置</h3>
    <p v-if="!inEdit">{{phone}}</p>
    <p v-if="inEdit">
      <el-input v-model="phone"></el-input>
    </p>
    <p>
      <el-button type="primary" @click="handleClick">编&nbsp;&nbsp;辑</el-button>
    </p>
  </div>
</template>

<script>
  export default {
    name: "ClassificationOfArticles",
    data() {
      return {
        phone: '',
        inEdit: false
      }
    },
    mounted() {
      this.queryData();
    },
    methods: {
      queryData() {
        this.phone = '123456789';
      },
      handleClick() {
        this.inEdit = !this.inEdit;
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
