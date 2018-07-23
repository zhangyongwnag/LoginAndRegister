<template>
  <div>
    <mt-header :title="$route.meta.title">
      <div slot="left" @click="clearAll">清空</div>
      <div slot="right" @click="nextRegister">注册</div>
    </mt-header>

    <mt-field :state="phoneStatus" label="手机号" placeholder="请输入手机号" :attr="{maxlength:11}" type="tel" v-model.trim="phone"></mt-field>
    <mt-field :state="passwordStatus" label="密码" placeholder="请输入密码" type="password" v-model.trim="password" ></mt-field>
    <mt-field :state="captchaStatus" label="验证码" v-model.trim="captcha" type="number" :attr="{maxlength:4}" style="border-bottom: 1px #c3c3c3 solid">
      <span v-if="captchaStatis == '获取验证码'" @click="getCaptchaCode">{{captchaStatis}}</span>
      <span v-else>{{captchaStatis}}s</span>
    </mt-field>

    <div style="display:flex;justify-content:space-around;align-items: center;margin-top: 20px;">是否同意登录<mt-switch v-model.trim="switchStatus"></mt-switch></div>

    <mt-button @click="login" :disabled="disabledStatus" style="background-color: deepskyblue;color: white;margin-top: 20px;" size="large">登录</mt-button>
  </div>
</template>
<script>
  import * as config from '../config'
  import m from '../md5.min'
  export default {
    data() {
      return {
        phone:'',
        password:'',
        captcha:'',
        time:0,
        captchaStatis:'获取验证码',
        code:-1,//验证码
        phoneStatus:'',
        passwordStatus:'',
        captchaStatus:'',
        switchStatus:false,
        disabledStatus:true,
        MD5password:'',
      }
    },
    watch:{
      phone(v){
        if (v){
          v.length == 11 ? this.phoneStatus = 'success' : this.phoneStatus = ''
        }
      },
      password(v){
        v.length >= 1 ? this.passwordStatus = 'success' : this.passwordStatus = ''
      },
      captcha(v){
        if (v){
          v == this.code ? this.captchaStatus = 'success' : this.captchaStatus = 'warning'
        }else {
          this.captchaStatus = ''
        }

      },
      switchStatus(v){
        v ? this.disabledStatus = false : this.disabledStatus = true
      },
    },
    created(){
      this.phone = this.$route.query.phone
      this.phone ? this.password = 'asdasdasdasd' : this.password = ''
      this.MD5password = this.$route.query.password
    },
    mounted(){

    },
    methods:{
      clearAll(){
        this.phone = ''
        this.password = ''
        this.captcha = ''
        this.switchStatus = false
        this.disabledStatus = true
      },
      nextRegister(){
        this.$router.replace({path:'/Register'})
      },
      getCaptchaCode(){
        if(!this.phone) {
          this.$toast({
            message: '请输入手机号',
            pisition: 'middle',
            duration: 3000
          })
          return
        }else if (this.phone.length != 11){
          this.$toast({
            message: '请输入正确的手机号',
            pisition: 'middle',
            duration: 3000
          })
          return
        }
        //发请求得到验证码，这里假设验证码是2222，传给data
        this.code = 2222
        this.time = 60
        let int = setInterval(()=>{
          this.time --
          this.captchaStatis = this.time
          if (this.time == 0){
            clearInterval(int)
            this.code = -1 //清除验证码
            this.captcha = ''
            this.captchaStatis = '获取验证码'
          }
        },1000)
      },
      login(){
        if (!this.phone){
          this.$toast({
            message: '请输入手机号',
            position: 'middle',
            duration: 3000
          });
          return
        }else if (this.phone.length != 11){
          this.$toast({
            message: '请输入正确的手机号',
            position: 'middle',
            duration: 3000
          });
          return
        }
        if (!this.password){
          this.$toast({
            message:'请输入密码',
            pisition:'middle',
            duration:3000
          })
          return
        }
        if (!this.captcha){
          this.$toast({
            message:'请输入验证码',
            pisition:'middle',
            duration:3000
          })
          return
        }else if (this.code != this.captcha) {
          this.$toast({
            message:'请输入正确的验证码',
            pisition:'middle',
            duration:3000
          })
          return
        }
        this.$indicator.open({
          text: '登录中...',
          spinnerType: 'fading-circle'
        });
        let data = {
          username:this.phone,
          password:this.MD5password ? this.MD5password : m.md5(this.password),
        }
        this.$api_post({
          url:config.URL_LOGIN,
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
                localStorage.setItem('token',res.data.token)
                localStorage.setItem('userID',res.data.uuid)
                setTimeout(()=>{
                  this.$toast({
                    message:'登陆成功',
                    pisition:'middle',
                    duration:3000
                  })
                },1000)
                setTimeout(()=>{
                  this.$router.replace({path:'/Index'})
                },1500)
              }
            }else {
              this.$toast({
                message:res.msg,
                pisition:'middle',
                duration:3000
              })
            }
          },
          errorback:err => {
            console.log(err)
          }
        })
      }
    }
  }
</script>
<style scoped>
  body{
    margin: 0;
    padding: 0;
  }
  .bottom{
    height:50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
