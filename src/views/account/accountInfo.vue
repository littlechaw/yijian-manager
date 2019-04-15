<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>首页</span></p>
    </div>
    <div class="content" v-if="userType==2">
      <el-row v-for="(item,index) in formData" :key="index">
        <el-col :span="6">
          <el-row class="area-grid white-block">
            <el-col :offset="2" :span="8">
              <img class="area-logo" :src="item.type | dealImgUrl" alt="">
            </el-col>
            <el-col :span="10">
              <el-row>
                <span>账号类型</span>
                <span>{{item.clientId}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="area-grid white-block">
            <el-col :span="8">
              <img class="inner-img" src="../../../static/mineorder/qian_hong.png" alt="">
            </el-col>
            <el-col :span="16">
              <el-row>
                <span>累计充值数量</span>
                <span class="font-bigger">{{item.mailNumber}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="area-grid white-block">
            <el-col :span="8">
              <img class="inner-img" src="../../../static/mineorder/qian_lv.png" alt="">
            </el-col>
            <el-col :span="16">
              <el-row>
                <span>今日使用数量</span>
                <span class="font-bigger">{{item.receivedNumber}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="area-grid white-block">
            <el-col :span="8">
              <img class="inner-img" src="../../../static/mineorder/qian_shegnyu.png" alt="">
            </el-col>
            <el-col :span="16">
              <el-row>
                <span>剩余数量</span>
                <span class="font-bigger">{{item.mailNumber-item.receivedNumber}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
    </div>
    <div class="content" v-if="userType!=2">
      <el-row :gutter="20">
        <el-col :span="8">
          <el-row class="grid-content yellow-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>淘宝剩余面单数</span>
                <span class="font-bigger">{{todayInfo.taobao_remain}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row class="grid-content blue-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>京东剩余面单数</span>
                <span class="font-bigger">{{todayInfo.jingdong_remain}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row class="grid-content green-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>拼多多剩余面单数</span>
                <span class="font-bigger">{{todayInfo.pinduoduo_remain}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="8">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>淘宝累计使用面单数</span>
                <span class="font-bigger">{{todayInfo.taobao_usedsum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>京东累计使用面单数</span>
                <span class="font-bigger">{{todayInfo.jingdong_usedsum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="8">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>拼多多累计使用面单数</span>
                <span class="font-bigger">{{todayInfo.pinduoduo_usedsum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="userType != 0">
        <el-col :span="6">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>累计购买数量</span>
                <span class="font-bigger">{{todayInfo.out_mail_num_sum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>累计购买金额</span>
                <span class="font-bigger">{{todayInfo.out_mail_money_sum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>累计售出数量</span>
                <span class="font-bigger">{{todayInfo.in_mail_num_sum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="6">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>累计收入金额</span>
                <span class="font-bigger">{{todayInfo.in_mail_money_sum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20" v-if="userType == 0">
        <el-col :span="12">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>累计售出数量</span>
                <span class="font-bigger">{{todayInfo.in_mail_num_sum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
        <el-col :span="12">
          <el-row class="grid-content white-block">
            <!--<el-col :span="8">-->
            <!--<el-row type="flex" justify="center">-->
            <!--<div class='inner-img'></div>-->
            <!--</el-row>-->
            <!--</el-col>-->
            <!--<el-col :span="16">-->
            <el-col :span="20">
              <el-row type="flex" justify="center" align="middle">
                <span>累计收入金额</span>
                <span class="font-bigger">{{todayInfo.in_mail_money_sum}}</span>
              </el-row>
            </el-col>
          </el-row>
        </el-col>
      </el-row>
      <el-row :gutter="20">
        <el-col :span="18">
          <div class="chart-height white-block">
            <span>最近{{day}}天使用面单数量情况</span>
            <el-select class="f-left" v-model="day">
              <el-option
                v-for="(item,index) in days"
                :key="index"
                :label="item"
                :value="item">
              </el-option>
            </el-select>
            <ve-line :data="chartData"></ve-line>
          </div>
        </el-col>
        <el-col :span="6">
          <div class="chart-height white-block">
            <span>今日使用面单数量</span>
            <el-row type="flex" align="middle">
              <el-col :offset="2" :span="8">
                <img class="inner-img" src="../../../static/mineorder/tb.png" alt="">
              </el-col>
              <el-col :span="7">淘宝</el-col>
              <el-col :span="7">{{todayInfo.taobao_used}}</el-col>
            </el-row>
            <el-row type="flex" align="middle">
              <el-col :offset="2" :span="8">
                <img class="inner-img" src="../../../static/mineorder/jd.png" alt="">
              </el-col>
              <el-col :span="7">京东</el-col>
              <el-col :span="7">{{todayInfo.jingdong_used}}</el-col>
            </el-row>
            <el-row type="flex" align="middle">
              <el-col :offset="2" :span="8">
                <img class="inner-img" src="../../../static/mineorder/pdd.png" alt="">
              </el-col>
              <el-col :span="7">拼多多</el-col>
              <el-col :span="7">{{todayInfo.pinduoduo_used}}</el-col>
            </el-row>
          </div>
        </el-col>
      </el-row>
    </div>

  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'

  export default {
    name: "accountInfo",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        formData: [],
        chartData: {},
        todayInfo: {},
        day: 7,
        days: [7, 10, 15]
      }
    },
    components: {
      headTop
    },
    mounted() {
      this.userType == 2 ? this.queryData() : this.queryAdminData()
      this.userType != 2 && this.showMessage()
    },
    methods: {
      showMessage() {
        this.$axios.doget(URL.ADMIN_GETMYADMINSETTING).then(res => {
          if (!res || !res.taobaoprice) {
            this.$message.error('请设置淘宝价格')
            return
          }
          if (!res || !res.jingdongprice) {
            this.$message.error('请设置京东价格')
            return
          }
          if (!res || !res.pinduoduoprice) {
            this.$message.error('请设置拼多多价格')
            return
          }
        })
      },
      queryData() {
        this.$axios.doget(URL.EXPRESS_NUM).then(res => {
          let types = ['淘宝', '拼多多', '京东']
          let temp = []
          for (let i in types) {
            for (let j in res) {
              if (res[j].type == types[i]) {
                temp.push(res[j])
              }
            }
          }
          this.formData = temp;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      queryAdminData() {
        this.getToday()
        this.getVeline()
      },
      getToday() {
        this.$axios.doget(URL.GETYTOREMAINCOUNT).then(res => {
          this.todayInfo = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      getVeline() {
        let data = {
          day: this.day
        }
        this.$axios.doget(URL.STATMAILUSEDBYDAYANDTYPE, data).then(res => {
          if (!res || res.length == 0) return
          let temp = []
          for (let i in res) {
            let obj = {
              '日期': res[i].key
            }
            let resChild = res[i].value
            for (let j in resChild) {
              if (resChild[j].key == 0) {
                obj['淘宝'] = resChild[j].value
              }
              if (resChild[j].key == 1) {
                obj['拼多多'] = resChild[j].value
              }
              if (resChild[j].key == 2) {
                obj['京东'] = resChild[j].value
              }
              if (resChild[j].key == 3) {
                obj['合计'] = resChild[j].value
              }
            }
            temp.push(obj)
          }
          if (temp.length > 1) {
            let a = new Date(temp[0]['日期']).getTime()
            let b = new Date(temp[1]['日期']).getTime()
            if (a > b) {
              temp = temp.reverse()
            }
          }
          this.chartData = {
            columns: ['日期', '淘宝', '拼多多', '京东', '合计'],
            rows: temp
          }
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      }
    },
    watch: {
      day() {
        this.getVeline()
      }
    },
    filters: {
      dealImgUrl(d) {
        let url = '';
        if (d == '京东') {
          url = '../../static/mineorder/jd.png'
        }
        if (d == '淘宝') {
          url = '../../static/mineorder/tb.png'

        }
        if (d == '拼多多') {
          url = '../../static/mineorder/pdd.png'
        }
        return url;
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .content {
    padding: 0px;
    background: @EEF5F9;
  }

  .font-bigger {
    margin-left: 10px;
    font-size: x-large;
    font-weight: bold;
  }

  .area-grid {
    display: flex;
    align-items: center;
    height: 140px;
    margin-bottom: 20px;
    border-radius: 5px;

    .area-logo {
      width: 80px;
      height: 80px;
    }

    .inner-img {
      width: 50px;
      height: 50px;
    }
  }

  .grid-content {
    display: flex;
    align-items: center;
    height: 90px;
    margin-bottom: 20px;
    border-radius: 5px;

    .inner-img {
      width: 50px;
      height: 50px;
    }
  }

  .chart-height {
    height: 500px;
    overflow: hidden;

    .inner-img {
      width: 50px;
      height: 50px;
    }

    .f-left {
      display: inline-block;
    }

    span {
      display: inline-block;
      margin: 20px;
    }
  }

  .yellow-block {
    background-image: -webkit-linear-gradient(0deg, #FDBA4F, #EB9A47);
  }

  .blue-block {
    background-image: -webkit-linear-gradient(0deg, #5CBAF5, #46A7E5);
  }

  .green-block {
    background-image: -webkit-linear-gradient(0deg, #76CF8A, #44B45C);
  }

  .white-block {
    background: white;
  }

</style>
