<template>
  <div>
    <headTop></headTop>
    <div class="header-top">
      <el-row>
        <el-button type="primary" @click="addTarget">新&nbsp;&nbsp;增</el-button>
      </el-row>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        border
        :header-cell-style="headerStyle"
        style="width: 100%;text-align:center">
        <el-table-column prop="typeId" label="序号"></el-table-column>
        <el-table-column prop="typeName" label="目标名称"></el-table-column>
        <el-table-column prop="createTime" label="添加时间"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click="handleClick(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'

  export default {
    name: "TargetSetting",
    data() {
      return {
        tableData: []
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
        let url = "/yijian/unLogin/findAllInfomationType.do";
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.tableData = res;
          this.total = res.length > 0 ? res.length : 1;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      addTarget() {
        this.$prompt('目标名称', '新增目标', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(({value}) => {
          let url = '/yijian/opRoot/addInformationType.do';
          let data = {
            typeName: value
          };
          if (!value) {
            this.$message.error("请输入目标");
            return false;
          }
          this.$axios.dopost(url, data).then(res => {
            this.$message({
              type: 'success',
              message: '添加成功!'
            });
            this.queryData();
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }).catch(() => {

        });
      },
      headerStyle: function () {
        return {
          "color": "#000",
          "font-weight": "normal",
          "text-align": "center"
        }
      },
      handleClick(d) {
        let typeId = d.typeId;
        this.$confirm('确认删除该目标吗?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          let url = '/yijian/opRoot/deleteInformationType.do';
          let data = {
            typeId
          };
          this.$axios.dopost(url, data).then(res => {
            this.$message({
              type: 'success',
              message: '删除成功!'
            });
            this.queryData();
          }).catch(e => {
            this.$showErrorMessage(this, e);
          })
        }).catch(() => {

        });
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
