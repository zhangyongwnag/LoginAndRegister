<template>
  <div>
    <mt-header :title="$route.meta.title">
    </mt-header>
    <div class="info">
      <p style="text-align: center;color: red;font-size: 25px;display: block">用户类型：{{info.rolename}}</p>
      <p>手机号：{{info.username}}</p>
      <p>注册IP：{{info.register_ip}}</p>
      <p>唯一ID：{{info.uuid}}</p>
      <p>注册时间：{{info.register_time}}</p>
    </div>

    <div class="LoginAgain" @click="LoginAgain">重新登录</div>
  </div>
</template>
<script>
  import * as config from '../config'
  export default {
    data() {
      return {
        info:'',
      }
    },
    mounted(){
      this.$indicator.open({
        spinnerType: 'fading-circle'
      });
      let data = {
        uuid:localStorage.getItem('userID'),
        token:localStorage.getItem('token')
      }
      this.$api_post({
        url:config.URL_GET_USER_INFO,
        data:data,
        callback:res => {
          this.$indicator.close()
          if (res.ret == 200){
            if (res.data.err_code == 1){
              this.$toast({
                message:res.data.err_msg,
                pisition:'middle',
                duration:3000
              })
            }else {
              this.info = res.data.info
            }
          }else {
            this.$toast({
              message:res.msg,
              pisition:'middle',
              duration:3000
            })
            this.$router.replace({path:'/Login'})
          }
        },
        errorback:err => {
          console.log(err)
        }
      })
    },
    methods:{
      LoginAgain(){
        localStorage.removeItem('userID')
        localStorage.removeItem('token')
        location.reload()
      }
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
  .LoginAgain{
    position: fixed;
    left:0;
    bottom: 0;
    width: 100%;
    height:40px;
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: black;
    color: white;
  }
</style>
