<template>
  <div>
    <headTop></headTop>
    <div class="header-top">
      <el-row>
        <el-button type="primary" @click="dialogFormVisible=true">新&nbsp;&nbsp;增</el-button>
      </el-row>
    </div>
    <div class="content">
      <el-table
        :data="tableData"
        border
        :header-cell-style="headerStyle"
        style="width: 100%;text-align:center">
        <el-table-column prop="opUserId" label="userid"></el-table-column>
        <el-table-column prop="name" label="名字"></el-table-column>
      </el-table>
    </div>
    <el-dialog title="新增子账号" :visible.sync="dialogFormVisible" width="30%">
      <p>用户名：
        <el-input v-model="alertData.name" size="small"></el-input>
      </p>
      <p>密码：
        <el-input v-model="alertData.password" size="small" type="password"></el-input>
      </p>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="addStoreUser">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'

  export default {
    name: "StoreUserManage",
    data() {
      return {
        tableData: [],
        dialogFormVisible: false,
        alertData: {
          name: '',
          password: ''
        }
      }
    },
    components:{
      headTop
    },
    mounted() {
      this.getUsers();
    },
    methods: {
      getUsers() {
        let url = '/yijian/opRoot/findSubAccount.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.tableData = res;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      headerStyle() {
        return {
          "color": "#000",
          "font-weight": "normal",
          "text-align": "center"
        }
      },
      addStoreUser() {
        let url = '/yijian/opRoot/addSubAccount.do';
        let name = this.alertData.name;
        let password = this.alertData.password;
        let data = {
          name,
          password
        };
        this.$axios.dopost(url, data).then(res => {
          this.$message.success("添加成功！");
          this.getUsers();
          this.dialogFormVisible = false;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>
