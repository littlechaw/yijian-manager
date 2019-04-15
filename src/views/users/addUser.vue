<template>
  <div>
    <headTop></headTop>
    <div class="title">
      <p><span>添加用户</span></p>
    </div>

    <div class="content">
      asdfasdfasdf
    </div>
  </div>
</template>

<script>
  import headTop from '@/components/HeadTop'

  export default {
    name: "addUser",
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
      queryData(){

      }
    }
  }
</script>

<style lang="less" scoped>
  @import "../../style/content";

  .title {
  }

  .content {
  }
</style>
