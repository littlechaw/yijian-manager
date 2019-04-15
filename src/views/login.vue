<template>
  <div class="login_page fillcontain">
    <transition name="form-fade" mode="in-out">
      <section class="form_contianer">
        <div class="manage_tip">
          <p>Express Site</p>
        </div>
        <el-form ref="loginForm" v-if="show">
          <el-form-item>
            <el-input placeholder="用户名" v-model="mobile"></el-input>
          </el-form-item>
          <el-form-item>
            <el-input type="password" placeholder="密码" v-model="password"></el-input>
          </el-form-item>
          <el-form-item>
            <el-col :span="18">
              <el-input placeholder="验证码" v-model="randomcode" @keyup.enter.native="submitForm"></el-input>
            </el-col>
            <el-col :span="6">
              <img class="randomcode-image" :src="randomcodeImg" @click="changeImg" alt="">
            </el-col>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" class="submit_btn" @click="submitForm">登录</el-button>
          </el-form-item>
          <el-form-item>
            <p class="bottom-text">
              <span class="register" @click="goRegister">注册</span>
              <span class="forget" @click="goForgetPswForm">忘记密码?</span>
            </p>
          </el-form-item>
        </el-form>
        <el-form ref="loginForm" v-if="!show">
          <el-form-item>
            <el-row>请使用谷歌或者火狐浏览器</el-row>
            <el-row>下载地址</el-row>
            <el-row>
              <el-button type="text" @click="handleDownload">https://pc.qq.com/detail/1/detail_2661.html</el-button>
            </el-row>
          </el-form-item>
        </el-form>
      </section>
    </transition>
  </div>
</template>

<script>
  import * as URL from '@/URL'

  export default {
    name: "login",
    data() {
      return {
        mobile: '',
        password: '',
        randomcode: '',
        randomcodeImg: null,
        show: false
      }
    },
    mounted() {
      let bs = this.getBrowser();
      if (bs == 'Chrome' || bs == 'Firefox') {
        this.show = true
        this.getVir()
      } else {
        this.show = false
      }
    },
    methods: {
      changeImg() {
        this.getVir()
      },
      getBrowser() {
        let ua = window.navigator.userAgent;
        let isIE = window.ActiveXObject != undefined && ua.indexOf("MSIE") != -1;
        let isFirefox = ua.indexOf("Firefox") != -1;
        let isOpera = window.opr != undefined;
        let isChrome = ua.indexOf("Chrome") && window.chrome;
        let isSafari = ua.indexOf("Safari") != -1 && ua.indexOf("Version") != -1;
        if (isIE) {
          return "IE";
        } else if (isFirefox) {
          return "Firefox";
        } else if (isOpera) {
          return "Opera";
        } else if (isChrome) {
          return "Chrome";
        } else if (isSafari) {
          return "Safari";
        } else {
          return "Unkown";
        }
      },
      getVir() {
        this.$axios.get(URL.BASEURL + URL.GET_VERIFY, {
          responseType: 'arraybuffer'
        }).then(response => {
          return 'data:image/png;base64,' + btoa(
            new Uint8Array(response.data).reduce((data, byte) => data + String.fromCharCode(byte), '')
          )
        }).then(data => {
          this.randomcodeImg = data
        })
      },
      submitForm() {
        let mobile = this.mobile;
        let password = this.password;
        let randomcode = this.randomcode;
        let data = {
          mobile,
          password,
          randomcode
        };
        this.$axios.dopost(URL.LOGIN, data).then(res => {
          if (res && res.superAdmin == true) {
            res.userType = 0;
          }
          if (res && res.superAdmin == false) {
            res.userType = 1;
          }
          if (res && res.superAdmin == undefined) {
            res.userType = 2;
          }
          this.$axios.doget(res.userType == 2 ? URL.USER_GETADMINSETTING : URL.ADMIN_GETADMINSETTING).then(data => {
            if (data && data.qq) {
              res.qqChatUrl = `http://wpa.qq.com/msgrd?v=3&uin=${data.qq}&site=qq&menu=yes?`
            } else {
              res.qqChatUrl = ''
            }
            this.$store.dispatch('setStoreInfo', JSON.stringify(res));
            this.$router.push({
              name: 'accountInfo'
            });

          }).catch(e => {
            this.$showErrorMessage(this, e)
          })
        }).catch(e => {
          this.$showErrorMessage(this, e);
        });

      },
      goRegister() {
        this.$router.push({
          name: 'regForm'
        });
      },
      goForgetPswForm() {
        this.$router.push({
          name: 'forgetPsw'
        });
      },
      handleDownload() {
        window.location.href = 'https://pc.qq.com/detail/1/detail_2661.html'
      }
    },
    watch: {}
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
    .wh(320px, 280px);
    .ctp(320px, 280px);
    padding: 25px;
    border-radius: 5px;
    text-align: center;
    background-color: #fff;

    .randomcode-image {
      width: 80px;
      height: 30px;
    }

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
