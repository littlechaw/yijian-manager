<template>
  <div>
    <div class="header">
      <h3>新用户注册优惠劵发放</h3>
      <p>名称：{{formData.name}}</p>
      <p>内容：减免实际计费时间{{formData.derateTime}}分钟</p>
      <p>使用期限：自领取时起{{formData.days}}日内</p>
      <p>
        <el-button @click="dialogFormVisible = true" type="primary">编&nbsp;&nbsp;辑</el-button>
      </p>
    </div>
    <el-dialog title="新用户注册优惠券发放" :visible.sync="dialogFormVisible">

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Coupon",
    data() {
      return {
        formData: {},
        dialogFormVisible: false
      }
    },
    mounted() {
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/getRegisteredCoupon.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.formData = res;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleClick(d) {

      }
    }
  }
</script>

<style lang="less" scoped>
  .header {
    margin: 20px;
    p {
      margin: 10px 0px;
    }
  }
</style>
