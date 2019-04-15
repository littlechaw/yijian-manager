<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>用户注册</p>
        </div>
        <el-form ref="regForm">
          <el-form-item>
            <el-input placeholder="邀请码" v-model="inviteCode"></el-input>
          </el-form-item>
          <el-form-item :class="{ 'form-group--error': $v.mobile.$error }">
            <el-input v-model="mobile" placeholder="手机号" @blur="$v.mobile.$touch()"></el-input>
            <span class="form-group--message" v-if="$v.mobile.$error && !$v.mobile.required">请输入手机号码</span>
            <span class="form-group--message" v-if="$v.mobile.$error && !$v.mobile.phone">请输入正确手机号码</span>
          </el-form-item>
          <el-form-item>
            <el-input placeholder="验证码" v-model="smscode">
              <el-button slot="append" @click="getSMSCode">{{timerText}} <span v-if="timer">s</span></el-button>
            </el-input>
          </el-form-item>
          <!--<el-form-item>-->
          <!--<el-input placeholder="用户名" v-model="name"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item>
            <el-input type="password" placeholder="密码" v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm">注 册</el-button>
          </el-form-item>
          <el-form-item>
            <p class="bottom-text">
              <span class="register" @click="doLogin">登 录</span>
              <span class="forget" @click="goForgetPswForm">忘记密码?</span>
            </p>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
  import * as URL from '@/URL'
  import {required} from 'vuelidate/lib/validators'
  import {regex} from 'vuelidate/lib/validators/common'

  const phone = regex('phoneNumber', /^1(3|4|5|7|8)\d{9}$/)

  export default {
    name: "regForm",
    data() {
      return {
        mobile: '',
        name: '',
        smscode: '',
        password: '',
        inviteCode: '',
        timerText: '获 取',
        timer: ''
      }
    },
    validations: {
      mobile: {
        required,
        phone
      }

    },
    methods: {
      getSMSCode() {
        let data = {};
        if (this.mobile) {
          data = {
            mobilephone: this.mobile
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
      goForgetPswForm() {
        this.$router.push({
          name: 'forgetPsw'
        });
      },
      submitForm() {
        this.timer && clearInterval(this.timer)
        let inviteCode = this.inviteCode,
          mobile = this.mobile,
          smscode = this.smscode,
          password = this.password;
        if (!inviteCode) {
          this.$message.error("邀请码不能为空");
          return;
        }
        if (!mobile) {
          this.$message.error("手机号不能为空");
          return;
        }
        if (!smscode) {
          this.$message.error("验证码不能为空");
          return;
        }
        if (!password) {
          this.$message.error("密码不能为空");
          return;
        }
        let data = {
          inviteCode,
          mobile,
          smscode,
          password
        }
        this.$axios.dopost(URL.USER_REG, data).then(res => {
          this.$message({
            message: '注册成功',
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
    .wh(400px, 400px);
    .ctp(400px, 400px);
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
