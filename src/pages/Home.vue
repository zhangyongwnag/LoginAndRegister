<template>
  <div>
    <div class="info">
      <p style="text-align: center;color: red;font-size: 30px;display: block">用户类型：{{info.rolename}}</p>
      <p>手机号：{{info.username}}</p>
      <p>注册IP：{{info.register_ip}}</p>
      <p>唯一ID：{{info.uuid}}</p>
      <p>注册时间：{{info.register_time}}</p>
    </div>
  </div>
</template>
<script>
  export default {
    data() {
      return {
        info:'',
      }
    },
    created(){
      this.info = this.$route.query.info
    }
  }
</script>
<style scoped>
  .info{
    font-size: 20px;
    font-weight: bold;
    display: flex;
    flex-direction: column;
    justify-content:center;;
  }
  .info p{
    margin-top: 20px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    display: flex;
    align-items: center;
    justify-content: flex-start;
  }
</style>
