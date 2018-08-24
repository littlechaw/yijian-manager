<template>
  <div>
    <headTop></headTop>
    <div class="header">
      <h3>设置用户满额折扣</h3>
      <p>当月消费满{{consume}}元，下月所有消费折扣打{{discount}}折</p>
      <p>
        <el-button type="primary" @click="dialogFormVisible = true">编辑</el-button>
      </p>
      <p class="smallFont">注：折扣月消费满额，下月无折扣</p>
      <el-dialog title="定价管理" :visible.sync="dialogFormVisible">
        <p>
          当月消费
          <el-input type="text" v-model="form.consume"></el-input>
          元
        </p>
        <p>
          下月折扣
          <el-input type="text" v-model="form.discount"></el-input>
          折
        </p>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="handleClick">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'

  export default {
    name: "GradeDiscount",
    data() {
      return {
        discount: '',
        consume: '',
        dialogFormVisible: false,
        form: {}
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
        let url = '/yijian/opRoot/getConsumeDiscount.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.discount = res.discount;
          this.consume = res.consume;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleClick() {
        let url='/yijian/opRoot/updateConsumeDiscount.do';
        let consume=this.form.consume,
          discount=this.form.discount;
        if(!consume || !discount){
          this.$message.error("输入值不能为空");
          return false;
        }
        if(isNaN(+consume) || isNaN(+discount)){
          this.$message.error('请输入数值');
          return false;
        }
        if(+consume<0 || +discount<0){
          this.$message.error("请输入大于0的数字");
          return false;
        }
        let data=this.form;
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
    .smallFont {
      font-size: 12px;
    }
    .el-input {
      width: 80%;
    }
  }
</style>
