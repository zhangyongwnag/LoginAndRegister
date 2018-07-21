<template>
  <div>
    <mt-header :title="$route.meta.title">
      <div slot="left" @click="clearAll">清空</div>
      <div slot="right" @click="nextLogin">登录</div>
    </mt-header>

    <mt-field label="手机号" :state="phoneStatus" :attr="{maxlength:11}" v-model="phone" placeholder="请输入手机号" type="tel"></mt-field>
    <mt-field label="密码" :state="passwordStatus" :attr="{maxlength:16}" v-model="password" placeholder="请输入密码" type="password"></mt-field>
    <mt-field label="确认密码" :state="passwordTrueStatus" :attr="{maxlength:16}" v-model="passwordTrue" placeholder="请确认密码" type="password"></mt-field>
    <mt-field label="验证码" :state="codeStatus" v-model="code" placeholder="输入验证码" style="border-bottom: 1px #c3c3c3 solid">
      <div class="code" @click="createCode">{{checkCode}}</div>
    </mt-field>

    <div style="display:flex;justify-content:space-around;align-items: center;margin-top: 20px;">我已同意注册该手机号<mt-switch v-model="switchStatus"></mt-switch></div>

    <p style="text-align: center;color: #c3c3c3;margin-top: 10px;">（同意则停止刷新图片验证码倒计时）</p>

    <mt-button @click="register" :disabled="disabledStatus" style="background-color: deepskyblue;color: white;margin-top: 20px;" size="large">注册</mt-button>

    <div class="time">自动刷新图片验证码：{{time}}S</div>
  </div>
</template>

<script>
  import * as config from '../config'
  import m from '../md5.min'
  export default {
    data(){
      return{
        phone:'',//输入的手机号
        phoneStatus:'',//手机号的状态
        password:'',//输入的密码
        passwordStatus:'',//密码的状态
        passwordTrue:'',//输入的确认密码
        passwordTrueStatus:'',//确认密码的状态
        code:'',//输入的验证码
        codeStatus:'',//图片验证码状态
        checkCode:'',//图片验证码
        switchStatus:false,//控制注册按钮的disabledStatus
        disabledStatus:true,//注册按钮的状态
        time:10,//10秒图片验证码切换一次
      }
    },
    watch:{
      //监听输入的手机号，改变phoneStatus
      phone(v){
        v.length == 11 ? this.phoneStatus = 'success' : this.phoneStatus = ''
      },
      //监听输入的密码，改变passwordStatus
      password(v){
        this.passwordTrue = ''
        v.length >= 1 ? this.passwordStatus = 'success' : this.passwordStatus = ''
      },
      //监听输入的二次密码，改变passwordTrue
      passwordTrue(v){
        if (!this.password){
          this.$toast({
            message:'请输入密码',
            pisition:'middle',
            duration:3000
          })
          return
        }
        if (v){
          v == this.password ? this.passwordTrueStatus = 'success' : this.passwordTrueStatus = 'warning'
        }else {
          this.passwordTrueStatus = ''
        }
      },
      //监听输入的验证码，改变codeStatus
      code(v){
        let V = v.toUpperCase()
        //如果等于四位，验证验证码是否做正确
        if (V.length == 4){
          V == this.checkCode ? this.codeStatus = 'success' : this.codeStatus = 'error'
        }else {
          this.codeStatus = ''
        }
      },
      //监听switch按钮控制注册按钮的可用性
      switchStatus(v){
        v ? this.disabledStatus = false : this.disabledStatus = true
      },
      //监听图片验证码的变化，改变codeStatus
      checkCode(v){
        if (this.code){
          this.codeStatus = 'error'
        }
      },
      //监听time，为0重置
      time(v){
        if (v == 0){
          this.time = 10
          this.timeReduce()
        }
      }
    },
    mounted(){
      //一进来图片验证码为空，所以页面渲染完毕获取一次图片二维码
      this.createCode()
      //每10秒自动刷新一次图片二维码
      this.timeReduce()
    },
    methods:{
      //页面左上角清除所有输入的信息
      clearAll(){
        this.phone = ''
        this.phoneStatus ='',
        setTimeout(()=>{
          this.password = ''
        },50)
        this.passwordStatus = '',
        this.passwordTrue = '',
        this.passwordTrueStatus = '',
        this.code = '',
        this.codeStatus = '',
        this.switchStatus = false
      },
      //跳转登录
      nextLogin(){
        this.$router.replace({path:'/Login'})
      },
      // 图片验证码
      createCode(){
        let code = "";
        var codeLength = 4;//验证码的长度
        var random = new Array(0,1,2,3,4,5,6,7,8,9,'A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R',
          'S','T','U','V','W','X','Y','Z');
        for(var i = 0; i < codeLength; i++) {
          var index = Math.floor(Math.random()*36);//取得随机数的索引（0~35）
          code += random[index];//根据索引取得随机数加到code上
        }
        this.checkCode = code;//把code值赋给验证码
      },
      //10秒刷新一次图二维码
      timeReduce(){
        let int = setInterval(()=>{
          if (this.switchStatus){
            return
          }
          this.time --
          if (this.time == 0){
            clearInterval(int)
            this.code = ''
            this.createCode()
          }
        },1000)
      },
      //注册
      register(){
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
        if (!this.passwordTrue){
          this.$toast({
            message:'请再次输入密码',
            pisition:'middle',
            duration:3000
          })
          return
        }else if (this.passwordTrue != this.password){
          this.$toast({
            message:'请确认俩次输入密码相同',
            pisition:'middle',
            duration:3000
          })
          return
        }
        if (!this.code){
          this.$toast({
            message:'请输入验证码',
            pisition:'middle',
            duration:3000
          })
          return
        }
        if (this.codeStatus == 'warning'){
          this.$toast({
            message:'请输入正确的验证码',
            pisition:'middle',
            duration:3000
          })
          return
        }
        this.$indicator.open({
          text: '注册中...',
          spinnerType: 'fading-circle'
        });
        let md5 = m.md5(this.password)
        let data = {
          username:this.phone,
          password:md5
        }
        this.$api_post({
          url:config.URL_REGISTER,
          data:data,
          callback:(res)=> {
            this.$indicator.close()
            if (res.ret == 200){
              if (res.data.err_code == 1){
                this.$toast({
                  message:res.data.err_msg,
                  pisition:'middle',
                  duration:3000
                })
              }else {
                localStorage.setItem('userID',res.data.uuid)
                setTimeout(()=>{
                  this.$toast({
                    message:'注册成功',
                    pisition:'middle',
                    duration:3000
                  })
                },1000)
                setTimeout(()=>{
                  this.$router.replace({path:'/Login',query:{phone:this.phone,password:m.md5(this.password)}})
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
          errorback:(err) => {
            console.log(err)
          }
        })
      },
    }
  };
</script>
<style scoped>
  .code{
    font-size: 25px;
    color: black;
    border: 1px #c3c3c3 solid;
    width: 100px;
    height:48px;
    display: flex;
    justify-content: space-around;
    align-items: center;
    background-color: rgba(0,0,1,0.2);
  }
  .time{
    font-size: 20px;
    color: white;
    background-color: black;
    position: fixed;
    bottom: 0;
    left:0;
    width: 100%;
    height:50px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
