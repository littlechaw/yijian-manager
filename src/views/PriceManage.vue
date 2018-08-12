<template>
  <div>
    <headTop></headTop>
    <div class="header">
      <p>最低消费：{{minConsumption}}元</p>
      <p>单价：{{price}}元/30分钟</p>
      <p>
        <el-button @click="dialogFormVisible = true" type="primary" size="small">编&nbsp;&nbsp;辑</el-button>
      </p>
    </div>
    <el-dialog title="定价管理" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="最低消费：" :label-width="formLabelWidth">
          <el-input v-model="form.minConsumption" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="单价：" :label-width="formLabelWidth">
          <el-input v-model="form.price" auto-complete="off"></el-input>
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
  import headTop from '@/components/HeadTop'

  export default {
    name: "PriceManage",
    data() {
      return {
        minConsumption: '',
        price: '',
        form: {
          minConsumption: '',
          price: ''
        },
        formLabelWidth: '120px',
        dialogFormVisible: false
      };
    },
    components: {
      headTop
    },
    mounted() {
      this.queryData();
    },
    methods: {
      queryData() {
        let url = '/yijian/opRoot/getPlatformMinConsumptionAndPrice.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          if (res && res.minConsumption && res.price) {
            this.minConsumption = res.minConsumption;
            this.price = res.price;
          }
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleClick() {
        let url = '/yijian/opRoot/updatePlatformMinConsumptionAndPrice.do';
        let data = {
          minConsumption: this.form.minConsumption,
          price: this.form.price
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
      margin: 10px;
    }
  }
</style>
