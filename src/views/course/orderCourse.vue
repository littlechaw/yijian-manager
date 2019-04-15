<template>
  <div style="height: 90%">
    <headTop></headTop>
    <div class="content">
      <object data="../../../static/tmpl/fhsm.pdf" type="application/pdf" width="100%" height="100%">
        <iframe src="../../../static/tmpl/fhsm.pdf" width="100%" height="100%" style="border: none;">
          This browser does not support PDFs. Please download the PDF to view it: <a href="../../../static/tmpl/fhsm.pdf">Download PDF</a>
        </iframe>
      </object>
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'

  export default {
    name: "orderCourse",
    data() {
      return {}
    },
    components: {
      headTop
    },
    mounted() {
      this.queryData();
    },
    methods: {
      queryData() {

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .title {
  }

  .content {
    height: 100%;
  }
</style>
