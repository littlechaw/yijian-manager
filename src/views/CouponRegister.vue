<template>
  <div>
    <headTop></headTop>
    <div class="header">
      <h3>新用户注册优惠劵发放</h3>
      <p>名称：{{formData.name}}</p>
      <p>内容：减免实际计费时间{{formData.derateTime}}分钟</p>
      <p>使用期限：自领取时起{{formData.days}}日内</p>
      <el-switch
        v-model="formData.openFlag"
        active-text="开启"
        inactive-text="关闭"
        disabled>
      </el-switch>
      <p>
        <el-button @click="dialogFormVisible = true" type="primary">编&nbsp;&nbsp;辑</el-button>
      </p>
    </div>
    <el-dialog title="新用户注册优惠券发放" :visible.sync="dialogFormVisible">
      <p>名称：
        <el-input v-model="alertData.name"></el-input>
      </p>
      <p>内容：减免实际计费时间
        <el-input v-model="alertData.derateTime"></el-input>
        分钟
      </p>
      <p>使用期限：自领取时起
        <el-input v-model="alertData.days"></el-input>
        日内
      </p>
      <el-switch
        v-model="alertData.openFlag"
        active-text="开启"
        inactive-text="关闭">
      </el-switch>
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
    name: "Coupon",
    data() {
      return {
        formData: {},
        dialogFormVisible: false,
        alertData: {}
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
        let url = '/yijian/opRoot/getRegisteredCoupon.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          res.openFlag == 1 ? res.openFlag = true : res.openFlag = false;
          this.formData = res;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      handleClick(d) {
        let url = '/yijian/opRoot/updateRegisteredCoupon.do';
        let openFlag = this.alertData.openFlag ? 1 : 0,
          name = this.alertData.name ? this.alertData.name : '',
          derateTime = this.alertData.derateTime ? +this.alertData.derateTime : 0,
          days = this.alertData.days ? +this.alertData.days : 0;

        let data = {
          openFlag,
          name,
          derateTime,
          days
        };
        this.$axios.dopost(url, data).then(res => {
          this.dialogFormVisible = false;
          this.$message.success('修改成功!');
          this.queryData();
        }).catch(e => {
          this.dialogFormVisible = false;
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

  .el-dialog {
    p {
      margin: 10px 0px;
    }
    .el-input {
      width: 50%;
    }
  }
</style>
