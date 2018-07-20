<template>
  <div>
    <mt-field :state="phoneStatus" label="手机号" placeholder="请输入手机号" :attr="{maxlength:11}" type="tel" v-model="phone"></mt-field>
    <mt-field :state="passwordStatus" label="密码" placeholder="请输入密码" type="password" v-model="password" ></mt-field>
    <mt-field :state="captchaStatus" label="验证码" v-model="captcha" type="number" :attr="{maxlength:4}" style="border-bottom: 1px #c3c3c3 solid">
      <span v-if="captchaStatis == '获取验证码'" @click="getCaptchaCode">{{captchaStatis}}</span>
      <span v-else>{{captchaStatis}}s</span>
    </mt-field>

    <div style="display:flex;justify-content:space-around;align-items: center;margin-top: 20px;">是否同意登录<mt-switch v-model="switchStatus"></mt-switch></div>

    <mt-button @click="login" :disabled="disabledStatus" style="background-color: deepskyblue;color: white;margin-top: 20px;" size="large">登录</mt-button>

    <div style="display: flex;justify-content: center;align-items: center;margin-top: 100px;">
      <mt-checklist
        align="right"
        v-model="checkStatus"
        :options="checkList"
        style="width: 70%">
      </mt-checklist>
    </div>
  </div>
</template>
<script>
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
        checkStatus:[],
        checkList:[
          {
            label:'存储用户名密码',
            value:1
          }
          ],
      }
    },
    watch:{
      phone(v){
        v.length == 11 ? this.phoneStatus = 'success' : this.phoneStatus = ''
      },
      password(v){
        v.length >= 1 ? this.passwordStatus = 'success' : this.passwordStatus = ''
      },
      captcha(v){
        v == this.code ? this.captchaStatus = 'success' : this.captchaStatus = ''
      },
      switchStatus(v){
        v ? this.disabledStatus = false : this.disabledStatus = true
      },
    },
    mounted(){

    },
    methods:{
      getCaptchaCode(){
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
        }else if (this.code != this.captcha){
          this.$toast({
            message:'请输入正确的验证码',
            pisition:'middle',
            duration:3000
          })
          return
        }
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
