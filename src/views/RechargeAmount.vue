<template>
  <div class="header">
    <h3>设置充值金额</h3>
    <p v-for="(item,index) in priceList" :key="index">第{{index+1}}档：{{item}}元</p>
    <p>
      <el-button type="primary" @click="dialogFormVisible = true">编&nbsp;&nbsp;辑</el-button>
    </p>
    <el-dialog title="设置充值金额" :visible.sync="dialogFormVisible">
      <p v-for="(item,index) in form.priceList" :key="index">
        第{{index+1}}档：
        <el-input type="text" v-model="form.priceList[index]"></el-input>
        元
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "RechargeAmount",
    data() {
      return {
        priceList: [],
        dialogFormVisible: false,
        form: {
          priceList: []
        }
      }
    },
    mounted() {
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/getRechargeMonry.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.priceList = res;
          for (let i = 0; i < res.length; i++) {
            this.form.priceList.push('');
          }
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleClick() {
        let url='/yijian/opRoot/updateRechargeMoney.do';
        let data=this.form.priceList;
        this.$axios.dopost(url, data).then(res => {
          this.queryData();
          this.$message.success('修改成功!');
          this.dialogFormVisible = false;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
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
    .el-input {
      width: 80%;
    }
  }
</style>
