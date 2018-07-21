<template>
  <div>

  </div>
</template>
<script>
  import * as config from '../config'
  export default {
    data() {
      return {}
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
          this.$router.replace({path:'/Home',query:{info:res.data.info}})
        },
        errorback:err => {
          this.$toast({
            message:err.msg,
            pisition:'middle',
            duration:3000
          })
          this.$indicator.close()
          this.replace({path:'/Login'})
        }
      })
    }
  }
</script>
<style scoped>

</style>
