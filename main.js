import Vue from 'vue'
import App from './App'
import cuCustom from './colorui/components/cu-custom.vue'
import tim from './commen/tim/tim.js'
import commen from './commen/commen.js'
import TIM from 'tim-js-sdk'
import store from './store/index.js'


Vue.prototype.tim = tim.tim  			//tim sdk 引入后生成的tim服务
Vue.prototype.$TIM = TIM				//tim 的状态/事件 常量
Vue.prototype.$store = store
Vue.prototype.$commen = commen
// Vue.prototype.tim.on(TIM.EVENT.MESSAGE_RECEIVED, function(e) {
//   // 收到推送的单聊、群聊、群提示、群系统通知的新消息，可通过遍历 event.data 获取消息列表数据并渲染到页面
//   // event.name - TIM.EVENT.MESSAGE_RECEIVED
//   // event.data - 存储 Message 对象的数组 - [Message]
//   e.data.forEach(item=>{
// 		if(item.conversationType == "@TIM#SYSTEM")
// 	  store.commit('pushGroupMessageList', item)
//   })
 
//   e.data.forEach(item=>{
//   	  store.commit('pushCurrentMessageList', item)
//   })
  
// });


Vue.component('cu-custom',cuCustom)

import { http } from './js_sdk/luch-request/index.js' // 全局挂载引入，配置相关在该index.js文件里修改
Vue.prototype.$http = http

//配置APP相关信息
Vue.prototype.$versionCode = '100' ; //版本应用号
Vue.prototype.$versionName = '1.1.1' //版本号
Vue.config.productionTip = false

App.mpType = 'app'

const app = new Vue({
    ...App
})
app.$mount()
