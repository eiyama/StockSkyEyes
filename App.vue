<script>
import userlist from './commen/tim/user';
import Vue from 'vue';
import { mapState } from 'vuex';
export default {
	mounted() {
		/**官网有很多关于关于sdk 其他的监听方法（比如：有新的消息，用户资料更新等等）
		 * 详情可对照： https://imsdk-1252463788.file.myqcloud.com/IM_DOC/Web/SDK.html
		 * 监听的含义：服务端发生了数据变更---前端全局可以接收到变更通知--前端就可以自动触发某个事件来更新相应数据
		 * */
		// 登录成功后会触发 SDK_READY 事件，该事件触发后，可正常使用 SDK 接口
		this.tim.on(this.$TIM.EVENT.SDK_READY, this.onReadyStateUpdate, this);
		// 收到新消息
		this.tim.on(this.$TIM.EVENT.MESSAGE_RECEIVED, this.onReceiveMessage);
		// 会话列表更新
		this.tim.on(this.$TIM.EVENT.CONVERSATION_LIST_UPDATED, event => {
			this.$store.commit('updateConversationList', event.data);
		});
	},
	methods: {
		onReadyStateUpdate({ name }) {
			const isSDKReady = name === this.$TIM.EVENT.SDK_READY ? true : false;
			//自动监听并更新 sdk 的ready 状态 （未登录是 notReady  登录后是ready）
			this.$store.commit('toggleIsSDKReady', isSDKReady);
			//sdk ready 后  肯定完成了登录操作    这里可以获取用户存储在im的基础信息/离线消息/黑名单列表
		},

		onReceiveMessage({ data: messageList }) {
				console.log("mes:", messageList)
				this.$store.commit('pushGroupMessageList', messageList);			
				this.$store.commit('pushCurrentMessageList', messageList);
			
				
			// if(messageList.conversationType == "C2C"){
			// 	this.$store.commit('pushCurrentMessageList', messageList);
			// }
			
		}
		//根据消息列表请求聊天对象的用户信息 并完成数据拼接
		// onReceiveMessage({ data: messageList }) {
		// 	console.log( "messageList" ,messageList )
		// 	 store.commit('pushGroupMessageList', messageList)
		// }
		
	},
	onLaunch: function() {
		console.log('App Launch');
		uni.getSystemInfo({
			success: function(e) {
				console.log('设备详情', e);
				// #ifndef MP
				Vue.prototype.StatusBar = e.statusBarHeight;
				if (e.platform == 'android') {
					Vue.prototype.CustomBar = e.statusBarHeight + 50;
				} else {
					Vue.prototype.CustomBar = e.statusBarHeight + 45;
				}
				// #endif
				// #ifdef MP-WEIXIN
				Vue.prototype.StatusBar = e.statusBarHeight;
				console.log(e.statusBarHeight);
				let custom = wx.getMenuButtonBoundingClientRect();
				Vue.prototype.Custom = custom;
				Vue.prototype.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
				console.log(custom.bottom + custom.top - e.statusBarHeight);
				// #endif
				// #ifdef MP-ALIPAY
				Vue.prototype.StatusBar = e.statusBarHeight;
				Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
				// #endif
			}
		});
		uni.onTabBarMidButtonTap(()=>{
		   //监听tab中间按钮跳转到扫码识别页面
		    uni.navigateTo({
		     url:'/pages/tabbar/chat/newIndex',
		     animationType:'slide-in-bottom'
		    })
		   })
	},
	
	onShow: function() {
		// console.log('App Show');
	},
	onHide: function() {
		// console.log('App Hide');
	}
};
</script>

<style>
/* #ifndef APP-PLUS-NVUE */
   @import 'colorui/main.css';
   @import 'colorui/icon.css';
/* #endif*/
/*每个页面公共css */
</style>
