<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>用户管理</span></p>
      <el-form :inline="true" class="demo-form-inline">
        <el-row>
          <el-form-item label="手机号">
            <el-input v-model="mobile" placeholder="请输入用户手机号"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="handleQuery">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="userFormVisible = true">添加用户</el-button>
          </el-form-item>
          <el-form-item>
            <el-button size="small" type="primary" @click="changeMailNumber = true" v-if="userType == 0">修改平台面单数</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%" @expand-change="expandChange">
        <el-table-column type="expand">
          <template slot-scope="props">
            <el-form label-position="left" inline class="demo-table-expand">
              <el-form-item label="淘宝价格">
                <span>{{ props.row.otherData.taobao.price }}</span>
              </el-form-item>
              <el-form-item label="京东价格">
                <span>{{ props.row.otherData.jingdong.price }}</span>
              </el-form-item>
              <el-form-item label="拼多多价格">
                <span>{{ props.row.otherData.pinduoduo.price }}</span>
              </el-form-item>
              <el-form-item label="淘宝剩余面单数">
                <span>{{ props.row.otherData.taobao.mailNumber - props.row.otherData.taobao.usedMailNumber }}</span>
              </el-form-item>
              <el-form-item label="京东剩余面单数">
                <span>{{ props.row.otherData.jingdong.mailNumber - props.row.otherData.jingdong.usedMailNumber }}</span>
              </el-form-item>
              <el-form-item label="拼多多剩余面单数">
                <span>{{ props.row.otherData.pinduoduo.mailNumber - props.row.otherData.pinduoduo.usedMailNumber }}</span>
              </el-form-item>
              <el-form-item label="淘宝累计使用面单数">
                <span>{{ props.row.otherData.taobao.usedMailNumber }}</span>
              </el-form-item>
              <el-form-item label="京东累计使用面单数">
                <span>{{ props.row.otherData.jingdong.usedMailNumber }}</span>
              </el-form-item>
              <el-form-item label="拼多多累计使用面单数">
                <span>{{ props.row.otherData.pinduoduo.usedMailNumber }}</span>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column type="index" label="序号"></el-table-column>
        <!--<el-table-column prop="name" label="用户名"></el-table-column>-->
        <el-table-column prop="mobile" label="手机号"></el-table-column>
        <el-table-column label="角色">
          <template slot-scope="scope">{{scope.row.role | roleFilter}}</template>
        </el-table-column>
        <el-table-column prop="spreadNumber" label="推广人数" v-if="userType == 0"></el-table-column>
        <el-table-column prop="addbase" label="起充量"></el-table-column>
        <el-table-column label="注册时间">
          <template slot-scope="scope">{{scope.row.createtime | transferTime}}</template>
        </el-table-column>
        <el-table-column prop="alias" label="备注"></el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleUpdatePrice(scope.row)" type="text" size="small">修改</el-button>
            <el-button @click="handleRemove(scope.row)" type="text" size="small" v-if="scope.row.valid">停用</el-button>
            <el-button class="red-btn" @click="handleRecovery(scope.row)" type="text" size="small" v-if="!scope.row.valid">启用</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-dialog title="修改价格" :visible.sync="userInfoFormVisible">
        <el-form :model="priceInfo">
          <el-form-item label="起充量" :label-width="formLabelWidth">
            <el-input v-model="priceInfo.addbase"></el-input>
          </el-form-item>
          <el-form-item label="淘宝价格" :label-width="formLabelWidth">
            <el-input v-model="priceInfo.taobaoPrice"></el-input>
          </el-form-item>
          <el-form-item label="京东价格" :label-width="formLabelWidth">
            <el-input v-model="priceInfo.jingdongPrice"></el-input>
          </el-form-item>
          <el-form-item label="拼多多价格" :label-width="formLabelWidth">
            <el-input v-model="priceInfo.pinduoduoPrice"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="priceInfo.alias" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userInfoFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="doUpdatePrice">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="添加用户" :visible.sync="userFormVisible">
        <el-form :model="form">
          <!--<el-form-item label="用户名" :label-width="formLabelWidth">-->
          <!--<el-input v-model="form.name" placeholder="请输入用户名"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="角色" :label-width="formLabelWidth" v-if="userType == 0">
            <el-select v-model="form.type" placeholder="请选择账号类型">
              <el-option label="管理员" value="1"></el-option>
              <el-option label="用户" value="0"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :class="{ 'form-group--error': $v.form.mobile.$error }" label="手机号码" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" placeholder="请输入手机号码" @blur="$v.form.mobile.$touch()"></el-input>
            <span class="form-group--message" v-if="$v.form.mobile.$error && !$v.form.mobile.required">请输入手机号码</span>
            <span class="form-group--message" v-if="$v.form.mobile.$error && !$v.form.mobile.phone">请输入正确手机号码</span>
          </el-form-item>
          <el-form-item label="密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" placeholder="请输入密码"></el-input>
          </el-form-item>
          <el-form-item label="备注" :label-width="formLabelWidth">
            <el-input v-model="form.alias" placeholder="请输入备注"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="userFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addUser">确 定</el-button>
        </div>
      </el-dialog>

      <el-dialog title="修改平台面单数" :visible.sync="changeMailNumber">
        <el-form :model="mailForm">
          <el-form-item label="平台类型" :label-width="formLabelWidth">
            <el-select v-model="mailForm.type" placeholder="请选择">
              <el-option
                v-for="(item,index) in mailForm.types"
                :key="index"
                :label="item"
                :value="index">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="数量" :label-width="formLabelWidth">
            <el-input v-model="mailForm.number" placeholder="请输入数量"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="changeMailNumber = false">取 消</el-button>
          <el-button type="primary" @click="addNumber">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>
<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'
  import {required} from 'vuelidate/lib/validators'
  import {regex} from 'vuelidate/lib/validators/common'

  const phone = regex('phoneNumber', /^1(3|4|5|7|8)\d{9}$/)

  export default {
    name: "userInfo",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        userFormVisible: false,
        userInfoFormVisible: false,
        changeMailNumber: false,
        formLabelWidth: '100px',
        form: {
          name: '',
          type: '',
          mobile: '',
          password: '',
          alias: ''
        },
        priceInfo: {},
        tableData: [],
        mobile: '',
        mailForm: {
          type: 0,
          types: ['淘宝', '拼多多', '京东'],
          number: 0
        }
      };
    },
    validations: {
      form: {
        mobile: {
          required,
          phone
        }
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.queryData();
    },
    methods: {
      handleQuery() {
        if (this.mobile) {
          let temp = []
          for (let i = 0; i < this.tableData.length; i++) {
            if (this.tableData[i].mobile == this.mobile) {
              temp.push(this.tableData[i])
            }
          }
          this.tableData = temp
        } else {
          this.queryData()
        }
      },
      queryData() {
        this.$axios.doget(URL.ADMIN_USERLIST, {}).then(res => {
          if (res && res.length > 0) {
            for (var i in res) {
              res[i].otherData = {
                taobao: {},
                jingdong: {},
                pinduoduo: {}
              }
            }
          }
          this.tableData = res;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      addUser() {
        if (!this.$v.form.mobile.required) {
          this.$message.error('手机号不能为空')
          return
        }
        if (!this.$v.form.mobile.phone) {
          this.$message.error('请输入正确的手机号码')
          return
        }
        let url
        if (this.form.type == 1) {
          url = URL.ADMIN_ADD_ADMIN
        } else {
          url = URL.ADMIN_ADD_USER
        }
        this.$axios.dopost(url, this.form).then(res => {
          this.$message.success("提交成功！");
          this.reset();
          this.userFormVisible = false;
          this.queryData();
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      addNumber() {
        if (isNaN(this.mailForm.number)) {
          this.$message.success('请输入数字')
          return;
        }
        let data = {
          type: this.mailForm.type,
          number: +this.mailForm.number
        }
        this.$axios.doget(URL.ADDYTONUMBER, data).then(res => {
          this.changeMailNumber = false
          this.$message.success('修改成功')
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      handleRemove(row) {
        this.$confirm('此操作将禁用该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          var param = {
            id: row.id
          };
          this.$axios.dopost(URL.ADMIN_DEL_USER + '?id=' + row.id).then(res => {
            this.$message.success("禁用成功！");
            this.queryData();
          }).catch(e => {
            this.$showErrorMessage(this, e);
          });
        }).catch(() => {
        });
      },
      handleRecovery(row) {
        this.$confirm('此操作将启用该用户, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          var param = {
            id: row.id
          };
          this.$axios.dopost(URL.ADMIN_RECOVERY_USER + '?id=' + row.id).then(res => {
            this.$message.success("恢复成功！");
            this.queryData();
          }).catch(e => {
            this.$showErrorMessage(this, e);
          });
        }).catch(() => {
        });
      },
      handleUpdatePrice(row) {
        this.userInfoFormVisible = true
        this.priceInfo = row
      },
      expandChange(row, expandedRows) {
        let data = {
          userId: row.id,
          usertype: row.role
        }
        this.$axios.doget(URL.GETCLIENTBANALCEINFO, data).then(res => {
          let temp = {
            taobao: {},
            jingdong: {},
            pinduoduo: {}
          }
          if (res && res.length > 0) {
            for (let j in res) {
              if (res[j].type == 0) {
                temp.taobao = res[j]
              } else if (res[j].type == 1) {
                temp.pinduoduo = res[j]
              } else {
                temp.jingdong = res[j]
              }
            }
            for (let i in this.tableData) {
              if (this.tableData[i].id == row.id) {
                this.tableData[i].otherData = temp;
              }
            }
          }
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      doUpdatePrice() {
        let data = {
          id: this.priceInfo.id,
          addbase: this.priceInfo.addbase,
          taobaoPrice: this.priceInfo.taobaoPrice,
          jingdongPrice: this.priceInfo.jingdongPrice,
          pinduoduoPrice: this.priceInfo.pinduoduoPrice,
          alias: this.priceInfo.alias
        }
        let url = URL.ADMIN_UPDATE_USER
        if (this.priceInfo.role == 1) {
          url = URL.ADMIN_UPDATE_ADMIN
        }
        this.$axios.dopost(url, data).then(res => {
          this.$message.success('修改价格成功')
          this.userInfoFormVisible = false
          this.queryData()
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      reset() {
        this.form = {
          name: '',
          type: '',
          mobile: '',
          password: '',
          alias: ''
        }
      }
    },
    filters: {
      roleFilter(d) {
        if (d == 0) {
          d = '商户'
        } else {
          d = '管理员'
        }
        return d
      }
    }
  };
</script>

<style lang="less" type="text/less" scoped>
  @import "../../style/content.less";

  .title {
  }

  .content {
    .el-select {
      width: 100%;
    }

    .red-btn {
      color: #F56C6C;
    }

    .demo-table-expand {
      font-size: 0;
    }

    .demo-table-expand label {
      width: 90px;
      color: #99a9bf;
    }

    .demo-table-expand .el-form-item {
      margin-right: 0;
      margin-bottom: 0;
      width: 30%;
    }
  }
</style>
