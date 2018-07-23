import axios from 'axios'
import qs from 'qs'
import m from '../md5.min'

function encryptparam(obj) {
  var keys = [];
  typeof (obj) == "object" ? "" : obj = {};

  obj.app_key = '735F59558122F70A35670715E8D27055'//需要传的app_key
  for (var key in obj) {
    keys.push(key);
  }
  keys = keys.sort();
  var sortData = {}

  var strSign = "";
  if (keys.length > 0) {
    for (var k in keys) {
      if (keys[k] == 'sign') {
        continue;
      }
      if (typeof (keys[k]) == "undefined") {
        continue;
      }
      strSign += "&" + keys[k] + "=" + encodeURIComponent(obj[keys[k]]);
    }
  }
  var appkey = "K1vX5aeNEMdnOctoUIzZpLDJXMf3IfPAv8TRNcJjmndq2TKisdX09FWr7";
  strSign = strSign.substr(1);
  console.log(strSign + appkey)
  obj['sign'] = m.md5(strSign + appkey).toLowerCase();
  return obj
}

function toSign(obj) {
  obj.app_key = '735F59558122F70A35670715E8D27055'//需要传的app_key
  let objArray = []
  for (var i in obj){
    objArray.push(obj[i])
  }
  objArray.sort()
  let sign = objArray.join("")
  let app_secrect = 'K1vX5aeNEMdnOctoUIzZpLDJXMf3IfPAv8TRNcJjmndq2TKisdX09FWr7'
  console.log(sign + app_secrect)
  sign = m.md5(sign + app_secrect).toUpperCase()
  return sign
}

//通用post
export const api_post = (option) => {
  // var baseURL = ''; //生产环境/开发、测试时打包时路径(变量写在全局url.js中在index.html中引入)
  var option = {
    url: option.url || '',
    data: option.data || {},
    //请求成功的回调
    callback: option.callback || function () {},
    //请求未响应时的处理
    errorback: option.errorback || function () {}
  }
  option.data.app_key = '735F59558122F70A35670715E8D27055'//需要传的app_key
  // option.data.sign = toSign(option.data) // sign签名：后台设置已不需要签名
  return axios({
    method: 'post', //方法
    url: option.url, //地址
    data: option.data,
    timeout: 10000,
    //`headers`选项是需要被发送的自定义请求头信息
    //ajax传中文的时候，必须加这个，否则后台接受到的中文都是乱码
    // headers: {
    //'Content-Type': 'application/x-www-form-urlencoded;charset=utf-8'
    //},

    //   headers: {
    //     // 'X-Requested-With': 'XMLHttpRequest',
    //     'Authorization': login_token
    //   },
    transformRequest: [function (data) {
      //依自己的需求对请求数据进行处理
      return qs.stringify(data)
    }],
  })
    .then(function (response) { //成功之后回调

      if (response.status == 200) {
        //只有成功的时候才回调函数
        // 不管状态如何，回调函数必须执行
        option.callback(response.data);
        if(response.data.code != "00"){

        }
      } else {

      }
    })
    .catch(function (error) { //失败之后回调
      option.errorback(error)
      // alert("忙不过来了，客官请稍后")
    });
}
