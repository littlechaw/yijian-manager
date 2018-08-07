<template>
  <div>
    <div class="header-top">
      <el-form :inline="true" :model="searchData" class="demo-form-inline">
        <el-row>
          <el-form-item label="文章标题">
            <el-input v-model="searchData.articleTitle" placeholder="请输入文章标题"></el-input>
          </el-form-item>
          <!--<el-form-item label="发布人">-->
          <!--<el-input v-model="searchData.auth" placeholder="请输入发布人"></el-input>-->
          <!--</el-form-item>-->
          <el-form-item label="发布时间">
            <el-date-picker class="date-picker-width" v-model="searchData.searchDate" type="daterange" range-separator="至" start-placeholder="开始日期" end-placeholder="结束日期">
            </el-date-picker>
          </el-form-item>
        </el-row>
        <el-row>
          <el-form-item label="文章分类">
            <el-select v-model="searchData.articleClass">
              <el-option v-for="(item,index) in searchData.articleClassList" :label="item.typeName" :value="item.typeId" :key="index"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="queryData">查&nbsp;&nbsp;询</el-button>
          </el-form-item>
        </el-row>
      </el-form>
    </div>

    <div class="content">
      <el-table
        :data="tableData"
        border
        :header-cell-style="headerStyle"
        style="width: 100%;text-align:center">
        <el-table-column prop="informationId" label="序号"></el-table-column>
        <el-table-column prop="header" label="文章标题"></el-table-column>
        <el-table-column prop="typeText" label="文章目标"></el-table-column>
        <el-table-column prop="createTime" label="申请时间"></el-table-column>
        <el-table-column prop="" label="操作">
          <template slot-scope="scope">
            <el-button @click="deleteArticle(scope.row)" type="text" size="small">删除</el-button>
            <el-button @click="articleDetail(scope.row)" type="text" size="small">查看文章详情</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="block">
        <el-pagination
          @current-change="handleCurrentChange"
          :page-size="10"
          layout="prev, pager, next, jumper"
          :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog title="文章详情" :visible.sync="dialogTableVisible">
      <div v-html="alertData"></div>
    </el-dialog>
  </div>
</template>

<script>
  import {getBeforeDays} from "../utils/mUtils";

  export default {
    name: "ArticleList",
    data() {
      return {
        searchData: {
          articleTitle: '',
          auth: '',
          articleClassList: [],
          articleClass: 0,
          searchDate: ''
        },
        tableData: [],
        total: 5,
        currentPage: 1,
        dialogTableVisible: false,
        alertData: ''
      }
    },
    mounted() {
      this.searchData.searchDate = [getBeforeDays(7), new Date()];
      this.getArticleClass();
    },
    methods: {
      getArticleClass() {
        let url = '/yijian/unLogin/findAllInfomationType.do';
        let data = {};
        this.$axios.dopost(url, data).then(res => {
          this.searchData.articleClassList = res;
          this.searchData.articleClass = res[0].typeId;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      queryData() {
        let url = '/yijian/opRoot/findInformation.do';
        let header = this.searchData.articleTitle,
          timeStart = this.$transferDate(this.searchData.searchDate[0]),
          timeEnd = this.$transferDateAddsuffix(this.searchData.searchDate[1]),
          type = this.searchData.articleClass,
          startIndex = (this.currentPage-1) * 10,
          pageSize = 10;
        let data = {
          header,
          timeStart,
          timeEnd,
          type,
          startIndex,
          pageSize
        };
        this.$axios.dopost(url, data).then(res => {
          this.tableData = res.data;
          this.total = res.total;
        }).catch(e => {
          this.$showErrorMessage(this, e);
        })
      },
      headerStyle: function () {
        return {
          "color": "#000",
          "font-weight": "normal",
          "text-align": "center"
        }
      },
      deleteArticle(d) {
        this.$confirm('确认删除该文章吗？', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消'
        }).then(() => {
          let url = '/yijian/opRoot/deleteInfomation.do';
          let informationId = d.informationId;
          let data = {
            informationId
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
      },
      articleDetail(d) {
        this.dialogTableVisible = true;
        this.alertData = d.text;
      },
      handleCurrentChange(val) {
        this.currentPage = val;
      }
    },
    filters: {},
    watch: {
      currentPage(n, o) {
        this.queryData();
      },
      "searchData.articleClass"(n, o) {
        if (o == 0) {
          this.queryData();
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../style/header";
  @import "../style/content";
</style>

