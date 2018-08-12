<template>
  <div>
    <headTop></headTop>
    <div class="header">
      <h3>价格区间配置</h3>
      <p v-for="(item,index) in priceList" :key="index">
        区间{{index+1}}：{{item.start}}元～{{item.end}}元
      </p>
      <p>
        <el-button @click="dialogFormVisible = true" type="primary">编&nbsp;&nbsp;辑</el-button>
      </p>
      <el-dialog title="价格区间配置" :visible.sync="dialogFormVisible">
        <p v-for="(item,index) in form.priceList" :key="index">
          区间{{index+1}}：
          <el-input type="text" v-model="item.start"></el-input>
          元～
          <el-input type="text" v-model="item.end"></el-input>
          元
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
    name: "PriceRange",
    data() {
      return {
        priceList: [],
        dialogFormVisible: false,
        form: {priceList: []}
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
        let url = '/yijian/opRoot/getPriceInterVal.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          let j = 0, temp = [], temp2 = [];
          for (let i in res) {
            j++;
          }
          for (let i = 0; i < j / 2; i++) {
            temp.push({
              start: res['start' + (i + 1)],
              end: res['end' + (i + 1)]
            });
            temp2.push({
              start: '',
              end: ''
            })
          }
          this.priceList = temp;
          this.form.priceList = temp2;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleClick() {
        let url = '/yijian/opRoot/updatePriceInterval.do';
        let temp = this.form.priceList;
        let data = {};
        for (let i = 0; i < temp.length; i++) {
          data['start' + (i + 1)] = temp[i].start;
          data['end' + (i + 1)] = temp[i].end;
        }
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
      width: 20%;
    }
  }
</style>
