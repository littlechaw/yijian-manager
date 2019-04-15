<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>找回密码</p>
        </div>
        <el-form ref="loginForm">
          <el-form-item>
            <el-input placeholder="手机号" v-model="mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="验证码" v-model="smscode">
              <el-button slot="append" @click="getSMSCode">{{timerText}} <span v-if="timer">s</span></el-button>
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="重置密码" v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="确认密码" v-model="againPassword"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm">确定重置</el-button>
          </el-form-item>
          <el-form-item>
            <p class="bottom-text">
              <span class="register" @click="doLogin">登 录</span>
              <span class="forget" @click="doReg">注 册</span>
            </p>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
  import * as URL from '@/URL'

  export default {
    name: "forgetPsw",
    data() {
      return {
        mobile: '',
        smscode: '',
        password: '',
        againPassword: '',
        timerText: '获 取',
        timer: ''
      }
    },
    methods: {
      getSMSCode() {
        let data = {};
        if (this.mobile) {
          data = {
            mobilephone: this.mobile,
            forgetPassword: 1
          }
        } else {
          this.$message.error("手机号不能为空");
          return;
        }
        this.timerText = 60
        this.timer = setInterval(() => {
          if (+this.timerText == 0) {
            clearInterval(this.timer)
          } else {
            this.timerText = --this.timerText
          }
        }, 1000)
        this.$axios.doget(URL.SMS_SEND, data).catch(e => {
          clearInterval(this.timer)
          this.$showErrorMessage(this, e)
          this.timerText = '获 取'
        })
      },
      doLogin() {
        this.$router.push({
          name: 'login'
        });
      },
      doReg() {
        this.$router.push({
          name: 'regForm'
        });
      },
      submitForm() {
        this.timer && clearInterval(this.timer)
        let mobile = this.mobile,
          smscode = this.smscode,
          password = this.password,
          againPassword = this.againPassword;
        if (!mobile) {
          this.$message.error("手机号不能为空");
          return;
        }
        if (!smscode) {
          this.$message.error("验证码不能为空");
          return;
        }
        if (!password) {
          this.$message.error("重置密码不能为空");
          return;
        }
        if (!againPassword) {
          this.$message.error("确认密码不能为空");
          return;
        }
        if (password != againPassword) {
          this.$message.error("密码和确认密码不一致");
          return;
        }
        let data = {
          mobile,
          smscode,
          password
        }
        this.$axios.dopost(URL.REPLACE_PASSWORD, data).then(res => {
          this.$message({
            message: '修改成功',
            type: 'success'
          });
          this.$router.push({
            name: 'login'
          });
        }).catch(e => {
          this.$showErrorMessage(this, e);
        });
      }
    }

  }
</script>

<style lang="less" scoped>
  @import '../style/mixin';

  .login_page {
    background-color: #324057;
  }

  .manage_tip {
    position: absolute;
    width: 100%;
    top: -100px;
    left: 0;

    p {
      font-size: 34px;
      color: #fff;
    }
  }

  .form_contianer {
    .wh(400px, 350px);
    .ctp(400px, 350px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;

    .submit_btn {
      width: 100%;
      font-size: 16px;
    }

    .bottom-text {
      display: flex;
      justify-content: space-between;
      align-items: center;
      color: #909399;

      .register {
        cursor: pointer;
      }

      .forget {
        cursor: pointer;
      }
    }
  }

  .tip {
    font-size: 12px;
    color: red;
  }

  .form-fade-enter-active, .form-fade-leave-active {
    transition: all 1s;
  }

  .form-fade-enter, .form-fade-leave-active {
    transform: translate3d(0, -50px, 0);
    opacity: 0;
  }
</style>
