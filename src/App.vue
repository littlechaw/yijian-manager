<template>
  <div id="app" class="fillcontain">
    <router-view/>
  </div>
</template>

<script>
  export default {
    name: 'App'
  }
</script>

<style lang="less">
  @import './style/common';

  .form-group--message {
    color: #F56C6C;
  }

  .form-group--error input, .form-group--error input:focus, .form-group--error input:hover, .form-group--error textarea {
    border-color: #F56C6C;
  }
</style>
