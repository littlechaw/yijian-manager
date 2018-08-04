<template>
  <div class="header">
    <h3>设置抽成比例</h3>
    <p>当前抽成比例：{{percent}} </p>
    <p>
      <el-button type="primary" @click="dialogFormVisible = true">修改抽成比例</el-button>
    </p>
    <el-dialog title="设置抽成比例" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="抽成比例：" :label-width="formLabelWidth">
          <el-input v-model="form.percent" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleClick">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: "Proportionate",
    data() {
      return {
        percent: '',
        dialogFormVisible: false,
        form: {
          percent: ''
        },
        formLabelWidth: '120px'
      }
    },
    mounted() {
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/getProportion.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.percent = res;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleClick() {
        let url = '/yijian/opRoot/updateProportion.do';
        if (isNaN(this.form.percent)) {
          this.$message.error('请输入数字')
          return;
        }
        if (!isNaN(+this.form.percent) && +this.form.percent > 1) {
          this.$message.error('请输入小于1的数字')
          return;
        }
        let data = {
          proportion: this.form.percent
        };
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
  }
</style>
