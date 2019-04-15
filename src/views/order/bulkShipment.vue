<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>批量面单发货</span></p>
    </div>

    <div class="content">
      <el-row class="content-top">
        <span>友情提示：</span>
        <span>批量发货上传的内容可参照模版规则，另可参考 <span style="cursor: pointer;" @click="goShuoming">【下单教程】</span></span>
      </el-row>
      <el-row class="content-mid">
        <el-col :span="16">
          <el-form :label-position="labelPosition" label-width="120px">
            <el-row>
              <el-form-item label="选择快递">
                <el-radio-group v-model="typeName" size="mini">
                  <el-radio-button label="淘宝"></el-radio-button>
                  <el-radio-button label="拼多多"></el-radio-button>
                  <el-radio-button label="京东"></el-radio-button>
                </el-radio-group>
                <el-button size="mini" type="info" @click="getExcel">淘宝京东模版<i class="el-icon-download el-icon--right"></i></el-button>
                <el-button size="mini" type="info" @click="getExcel('pdd')">拼多多模版<i class="el-icon-download el-icon--right"></i></el-button>
                <span style="margin-left: 20px">剩余面单数&nbsp;&nbsp;{{expressNum}}</span>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="发货地址">
                <el-row>
                  <el-select v-model="addressId" placeholder="请选择">
                    <el-option v-for="(item,index) in address" :label="item.sendProv + item.sendCity + item.address" :value="item.id" :key="index"></el-option>
                  </el-select>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="物品信息">
                <el-row :gutter="10">
                  <el-col :span="7">
                    <el-input v-model="itemName" placeholder="请输入物品名称"></el-input>
                  </el-col>
                  <el-col :span="7">
                    <el-input type="tel" v-model="itemWeight" placeholder="请输入重量（数字）"></el-input>
                  </el-col>
                  <el-col :span="2">
                    <span>KG</span>
                  </el-col>
                </el-row>
              </el-form-item>
            </el-row>
            <el-row>
              <el-form-item label="操作">
                <el-upload
                  class="uploadClass"
                  :action="actionurl"
                  :before-remove="beforeRemove"
                  :before-upload="beforeUpload"
                  :on-success="uploadSuccess"
                  :on-error="uploadError"
                  :show-file-list="false"
                >
                  <el-button size="mini" type="primary">上传发货信息<i class="el-icon-upload el-icon--right"></i></el-button>
                </el-upload>
                <el-button size="mini" type="danger" @click="handleClick">提交发货</el-button>
                <el-button size="mini" type="primary" @click="downloadExcel" v-if="canDown">下载表格</el-button>
              </el-form-item>
            </el-row>
          </el-form>
        </el-col>
      </el-row>
      <!--<p><span>Excel 数据展示</span></p>-->
      <el-table :data="excelInfo" border style="width: 100%">
        <el-table-column type="index" label="序号" width="100"></el-table-column>
        <el-table-column prop="sendName" label="发件人姓名" width="120"></el-table-column>
        <el-table-column prop="sendMobile" label="发件人电话" width="120"></el-table-column>
        <el-table-column prop="sendAddress" label="发件人地址"></el-table-column>
        <el-table-column prop="tradeNo" label="订单号" width="120"></el-table-column>
        <!--        <el-table-column prop="wangwang" label="买家会员名" width="120"></el-table-column>-->
        <el-table-column prop="receiveName" label="收件人姓名" width="120"></el-table-column>
        <el-table-column prop="receiveMobile" label="收件人电话" width="120"></el-table-column>
        <el-table-column prop="receiveAddress" label="收件人地址"></el-table-column>
        <el-table-column prop="itemsWeight" label="物品重量" width="120"></el-table-column>
        <el-table-column prop="itemName" label="货品名称"></el-table-column>
      </el-table>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "bulkShipment",
    data() {
      return {
        typeName: '淘宝',
        types: ['淘宝', '拼多多', '京东'],
        type: 0,
        expressNum: 0,
        labelPosition: 'right',
        actionurl: URL.BASEURL + URL.BATCH_SENDEXPRESSINFO + '?type=0&itemName=&itemsWeight=0',
        canConfirm: false,
        excelInfo: null,
        loadingScreen: null,
        canDown: false,
        itemName: '',
        itemWeight: 0,
        address: [],
        addressId: ''
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.getExpressNum()
      this.getAdress()
    },
    methods: {
      getAdress() {
        this.$axios.doget(URL.GETUSERADDRESSES).then(res => {
          this.address = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      getExpressNum() {
        this.$axios.doget(URL.USER_GET_CLIENTID_EXPRESSNUM, {type: this.type}).then(res => {
          this.expressNum = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      getExcel(ss) {
        const link = document.createElement('a')
        if (ss == 'pdd') {
          link.download = '拼多多模版'
          link.href = '../../../static/tmpl/tmpl-pdd.xlsx'
        } else {
          link.download = '模版'
          link.href = '../../../static/tmpl/tmpl.xlsx'
        }
        link.click()
      },
      handleClick() {
        if (!this.canConfirm) {
          this.$message.error('请先上传文件')
          return;
        }
        if (!this.itemName || !this.itemWeight) {
          this.$message.error('请正确输入物品信息')
          return;
        }
        this.$axios.dopost(URL.BATCH_SENDEXPRESS +
          '?userAddressId=' + this.addressId +
          '&type=' + this.type +
          '&itemName=' + this.itemName +
          '&itemsWeight=' + this.itemWeight,
          this.excelInfo
        ).then(res => {
          this.excelInfo = []
          this.getExpressNum()
          this.canDown = true
          this.uuid = res
          this.$axios.getRemoteFile(URL.GET_EXCEL_UUID, {uuid: res}).catch(e => {
            this.$showErrorMessage(this, e)
          })
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      downloadExcel() {
        this.$axios.getRemoteFile(URL.GET_EXCEL_UUID, {uuid: this.uuid}).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      beforeRemove(file, fileList) {
        return this.$confirm(`确定移除 ${file.name}？`)
      },
      beforeUpload() {
        this.loadingScreen = this.$loading({
          lock: true,
          text: '上传中',
          spinner: 'el-icon-loading',
          background: 'rgba(0, 0, 0, 0.1)'
        });
      },
      uploadSuccess(res, file) {
        this.loadingScreen && this.loadingScreen.close()
        this.loadingScreen = null
        if (res.code == 99) {
          if (res.message) {
            this.$message.error(res.message)
          }
        } else {
          this.canConfirm = true
          this.excelInfo = res.data
          this.$message.success('上传成功')
        }
      },
      uploadError() {
        this.loadingScreen && this.loadingScreen.close()
        this.loadingScreen = null
        this.$message.error('上传失败')
      },
      goShuoming() {
        this.$router.push({
          name: 'orderCourse'
        });
      }
    },
    watch: {
      addressId(n, o) {
        this.actionurl = URL.BASEURL + URL.BATCH_SENDEXPRESSINFO +
          '?userAddressId=' + n +
          '&type=' + this.type +
          '&itemName=' + this.itemName +
          '&itemsWeight=' + this.itemWeight
      },
      typeName(n, o) {
        for (let i in this.types) {
          if (this.types[i] == n) {
            this.type = i
            this.actionurl = URL.BASEURL + URL.BATCH_SENDEXPRESSINFO +
              '?userAddressId=' + this.addressId +
              '&type=' + i +
              '&itemName=' + this.itemName +
              '&itemsWeight=' + this.itemWeight
            this.canConfirm = false
            this.excelInfo = null
            this.getExpressNum()
            return;
          }
        }
      },
      itemName(n, o) {
        this.actionurl = URL.BASEURL + URL.BATCH_SENDEXPRESSINFO +
          '?userAddressId=' + this.addressId +
          '&type=' + this.type +
          '&itemName=' + n +
          '&itemsWeight=' + this.itemWeight
      },
      itemWeight(n, o) {
        if (n < 0) {
          this.itemWeight = 0;
          return;
        }
        this.actionurl = URL.BASEURL + URL.BATCH_SENDEXPRESSINFO +
          '?userAddressId=' + this.addressId +
          '&type=' + this.type +
          '&itemName=' + this.itemName +
          '&itemsWeight=' + n
      }
    },
    filters: {
      confirmFilter(d) {
        if (d == 0) {
          d = '等待审核'
        }
        if (d == 1) {
          d = '通过'
        }
        if (d == 2) {
          d = '没通过'
        }
        if (d == '' || d == undefined) {
          d = '-'
        }
        return d;
      }
    },
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .title {
  }

  .content {
    flex-direction: column;
    align-items: center;

    .content-top {
      display: flex;
      justify-content: center;
      align-items: center;
      width: 100%;
      height: 50px;
      line-height: 50px;
      background: #FCF8E4;
      border-radius: 5px;
      border: 1px solid #F9EBCD;

      span {
        color: #999898;
        font-weight: bold;
      }

      span:last-child {
        color: #999898;
        font-weight: normal;
      }
    }

    .content-mid {
      margin-top: 20px;
      display: flex;
      justify-content: center;

      .uploadClass {
        display: inline-block;
      }

      .confirmBtn {
        margin-left: 120px;
      }
    }
  }
</style>
