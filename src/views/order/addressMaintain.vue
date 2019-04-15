<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>发货地址</span></p>
      <el-form :inline="true" class="demo-form-inline">
        <el-row>
          <el-form-item>
            <el-button size="small" type="primary" @click="addFormVisible = true">新增</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>
    <div class="content">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column type="index" label="序号"></el-table-column>
        <el-table-column prop="sendName" label="发件人"></el-table-column>
        <el-table-column prop="mobile" label="联系方式"></el-table-column>
        <el-table-column prop="address" label="发货地址"></el-table-column>
        <el-table-column label="是否默认">
          <template slot-scope="scope">{{scope.row.defaultAddress | defaultFilter}}</template>
        </el-table-column>
        <el-table-column label="创建时间">
          <template slot-scope="scope">{{scope.row.createtime | transferTime}}</template>
        </el-table-column>
        <el-table-column fixed="right" label="操作" width="150">
          <template slot-scope="scope">
            <el-button @click="handleDeleteAddress(scope.row)" type="text" size="small">删除</el-button>
          </template>
        </el-table-column>
      </el-table>

      <el-dialog title="添加地址" :visible.sync="addFormVisible">
        <el-form :model="form">
          <el-form-item label="发件人" :label-width="formLabelWidth">
            <el-input v-model="form.sendName" placeholder="请输入发件人"></el-input>
          </el-form-item>
          <el-form-item label="联系方式" :label-width="formLabelWidth">
            <el-input v-model="form.mobile" placeholder="请输入联系方式"></el-input>
          </el-form-item>
          <el-form-item label="省" :label-width="formLabelWidth">
            <el-select v-model="form.sendProv" placeholder="请选择">
              <el-option v-for="(item,index) in form.arr" :value="item.name" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="市" :label-width="formLabelWidth">
            <el-select v-model="form.sendCity" placeholder="请选择">
              <el-option v-for="(item,index) in form.cityArr" :value="item.name" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="区" :label-width="formLabelWidth">
            <el-select v-model="form.sendDistrict" placeholder="请选择">
              <el-option v-for="(item,index) in form.districtArr" :value="item.name" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label="发货地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" placeholder="请输入发货地址"></el-input>
          </el-form-item>
          <el-form-item label="是否默认" :label-width="formLabelWidth">
            <el-select v-model="form.defaultAddress" placeholder="请选择账号类型">
              <el-option label="是" value="true"></el-option>
              <el-option label="否" value="false"></el-option>
            </el-select>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="addFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="addAdress">确 定</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'
  import * as URL from '@/URL'
  import arrAll from '@/components/city'

  export default {
    name: "addressMaintain",
    data() {
      return {
        storeInfo: JSON.parse(this.$store.getters.getStoreInfo),
        userType: JSON.parse(this.$store.getters.getStoreInfo).userType,
        addFormVisible: false,
        formLabelWidth: '100px',
        form: {
          sendName: '',
          mobile: '',
          arr: arrAll,
          sendProv: '北京',
          sendCity: '北京',
          sendDistrict: '东城区',
          cityArr: [],
          districtArr: [],
          address: '',
          defaultAddress: '',
        },
        tableData: [],
      };
    },
    components: {
      headTop
    },
    mounted() {
      this.queryData()
      this.updateCity()
      this.updateDistrict()
    },
    methods: {
      queryData() {
        this.$axios.doget(URL.GETUSERADDRESSES).then(res => {
          this.tableData = res
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      addAdress() {
        let data = this.form
        this.$axios.dopost(URL.SAVEADDRESS, data).then(res => {
          this.addFormVisible = false
          this.$message.success('添加成功')
          this.queryData()
          this.reset()
        }).catch(e => {
          this.$showErrorMessage(this, e)
        })
      },
      handleDeleteAddress(r) {
        this.$confirm('此操作将删除该发货地址, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        }).then(() => {
          let data = {
            addressId: r.id
          }
          this.$axios.doget(URL.DELETEADDRESS, data).then(res => {
            this.addFormVisible = false
            this.$message.success('删除成功')
            this.queryData()
          }).catch(e => {
            this.$showErrorMessage(this, e)
          })
        }).catch(() => {
        });
      },
      updateCity: function () {
        for (var i in this.form.arr) {
          var obj = this.form.arr[i]
          if (obj.name == this.form.sendProv) {
            this.form.cityArr = obj.sub
            break
          }
        }
        this.form.sendCity = this.form.cityArr[1].name
      },
      updateDistrict: function () {
        for (var i in this.form.cityArr) {
          var obj = this.form.cityArr[i]
          if (obj.name == this.form.sendCity) {
            this.form.districtArr = obj.sub
            break
          }
        }
        if (this.form.districtArr && this.form.districtArr.length > 0 && this.form.districtArr[1].name) {
          this.form.sendDistrict = this.form.districtArr[1].name
        } else {
          this.form.sendDistrict = ''
        }
      },
      reset() {
        this.form = {
          sendName: '',
          mobile: '',
          arr: arrAll,
          sendProv: '北京',
          sendCity: '北京',
          sendDistrict: '东城区',
          cityArr: [],
          districtArr: [],
          address: '',
          defaultAddress: '',
        }
      }
    },
    watch: {
      'form.sendProv'() {
        this.updateCity();
        this.updateDistrict();
      },
      'form.sendCity'() {
        this.updateDistrict();
      }
    },
    filters: {
      defaultFilter(d) {
        if (d == 1) {
          d = '是'
        } else {
          d = '否'
        }
        return d
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
