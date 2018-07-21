// const debug = process.env.NODE_ENV !== 'production'
let host = 'http://hb5.api.okayapi.com'
// if (debug){
  host = '/api'
// }


export const URL_LOGIN = host + '/?s=App.User.Login'//用户登录
export const URL_GET_USER_INFO = host + '/?s=App.User.Profile'//获取用户信息
export const URL_REGISTER = host + '/?s=App.User.Register'//用户注册


//   app_key：735F59558122F70A35670715E8D27055
//
// app_secrect：K1vX5aeNEMdnOctoUIzZpLDJXMf3IfPAv8TRNcJjmndq2TKisdX09FWr7
