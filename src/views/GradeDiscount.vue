<template>
<div>
  <p>设置用户满额折扣</p>
  <p>当月消费满500元，下月所有消费折扣打9折</p>
  <p><el-button type="primary" @click="modify">编辑</el-button></p>
  <p>注：折扣月消费满额，下月无折扣</p>
</div>
</template>

<script>
    export default {
        name: "GradeDiscount",
      data() {
        return {}
      },
      methods: {
        modify() {

        }
      }
    }
</script>

<style scoped>

</style>
