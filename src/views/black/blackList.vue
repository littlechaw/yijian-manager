<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>黑名单列表</span></p>
      <el-form :inline="true" class="demo-form-inline">
        <el-row>
          <el-form-item>
            <el-button size="small" type="primary" @click="blackFormVisible = true">添加黑名单</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="content">
      <!-- <el-table :data="tableData" border style="width: 100%">
         <el-table-column prop="type" label="类型" width="50"></el-table-column>
         <el-table-column prop="item" label="账号"></el-table-column>
         <el-table-column label="提交时间" width="200">
           <template slot-scope="scope">{{scope.row.createtime | transferTime}}</template>
         </el-table-column>
       </el-table>
 -->
      <el-dialog title="添加黑名单" :visible.sync="blackFormVisible">
        <el-form :model="form">
          <!--<el-form-item label="请选择类型" :label-width="formLabelWidth">-->
            <!--<el-select v-model="form.type" placeholder="请选择账号类型">-->
            <!--<el-option label="手机号" value="0"></el-option>-->
            <!--<el-option label="旺旺号" value="1"></el-option>-->
            <!--</el-select>-->
          <!--</el-form-item>-->
          <el-form-item label="请输入手机号" :label-width="formLabelWidth">
            <el-input v-model="form.item"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="blackFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="submitBlack">确 定</el-button>
        </div>
      </el-dialog>
    </div>

  </div>
</template>
<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "blackList",
    data() {
      return {
        blackFormVisible: false,
        formLabelWidth: '100px',
        form: {
          item: '',
          type: ''
        },
        tableData: []
      };
    },
    components: {
      headTop
    },
    mounted() {
//      this.queryData();
    },
    methods: {
      queryData() {
        var param = {
          key: "",
          type: 0
        };
        this.$axios.doget(URL.BLACKUSER_GET, param).then(res => {
          this.tableData = res;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },

      submitBlack() {
        if (!this.form.item) {
          this.$message.error("请填写号码！");
          return;
        }
        // if (!this.form.type) {
        //   this.$message.error("请选择类型！");
        //   return;
        // }
        this.blackFormVisible = false;
        this.$axios.dopost(URL.BLACKUSER_ADD, this.form).then(res => {
          this.$message.success("提交成功！");
          this.reset();
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },

      reset() {
        this.form = {
          type: 0,
          item: ''
        }
      }
    }
  }
</script>

<style lang="less" type="text/less" scoped>
  @import "../../style/content.less";

  .title {
  }

  .content {
    .el-select {
      width: 100%;
    }
  }
</style>
