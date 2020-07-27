<template>
	<view class="" style="background-color: #F9F9F9;">
		
		<cu-custom bgColor="bg-red" :isBack="true" >
			<block slot="content" >消息列表</block>
			<!-- <block slot="backText" @click="openBack">返回</block> -->
		</cu-custom>
		<view class="conversition-box" >
			<view class="list-box" v-if="userAddConversationList.length>0">
				<view class="item-box" v-for="(item,index) in userAddConversationList" :key="index" @click="toRoom(item)">
					<view class="item-img" v-if="item.user">
						<image :src="item.user.img" alt=""></image>
					</view>
					<view class="item-img" v-else>
						<image src="../../../static/img/default-avatar.png" alt=""></image>
					</view>
					<view class="">
						<view class="item-text">
							<view class="item-user" v-if="item.user">
								{{item.user.user}}							
							</view>
							<view class="item-user" v-else>
								{{'客户' + item.conversation.userProfile.userID}}							
							</view>							
							<view class="time" v-if="item.conversation.time">{{ timeFliter(item.conversation.time)   }}</view>
							<view class="time" v-if="item.conversation.lastMessage.lastTime">{{timeFliter(item.conversation.lastMessage.lastTime)}}</view>					
						</view>
						<view class="item-msg-bottom">
							<view class="item-text-info">
									<rich-text :nodes="nodesFliter(item.conversation.lastMessage.messageForShow)"></rich-text>							
							</view>
							<view class="item-msg">
								<view class="item-msg-icon" v-if="item.conversation.unreadCount">{{item.conversation.unreadCount}}</view>
							</view>						
						</view>						
					</view>										
				</view>
				<!-- <view class="item-msg-bottom" style="margin: 20px;" @click="toliveShow">
					liveShow
				</view>
				<view class="item-msg-bottom" style="margin: 20px;" @click="topullShow">
					pullShow
				</view>
				<view class="item-msg-bottom" style="margin: 20px;" @click="toscreenShow">
					录屏直播
				</view> -->
			</view>
			<view class="list-box" v-else>
				<span class="msg-box">暂无聊天记录，请选择好友进行聊天</span>
			</view>
		</view>
	</view>	
</template>

<script>
	// import userList from '../../../commen/tim/user.js';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				isKF:false,
				userAddConversationList:[],
				windowHeight:0,
			}
		},
		onLoad(params) {			
			this.isKF = uni.getStorageSync('userInfo').isKF;
				if (this.isSDKReady) {
					this.getConversationList()
				}								
		},
		onShow(){
			this.getConversationList();	
		},
		computed: {
			...mapState({									
				isSDKReady: state => state.isSDKReady,
				conversationList: state => state.conversationList,		
			})
		},
		watch: {
			groupMessageList(newVal, oldVal) {
				this.msgList = newVal;
				this.screenMsg(newVal, oldVal);
				// console.log(this.msgList);
			},
			isSDKReady(val) {
				//isSDKReady == true 请求会话列表
				if (val) {
					this.getConversationList()
				}
			},
			conversationList(val){
				this.getUserInfo(val)
			}
		},
	
		methods: {
			//根据消息列表请求聊天对象的用户信息 并完成数据拼接
		getUserInfo(conversationList) {
			this.userAddConversationList = []
			conversationList.forEach(item => {
				let obj = {}
				if(item.type == "C2C"){
						obj.conversation = item;
						this.userAddConversationList.push(JSON.parse(JSON.stringify(obj)));
				}
				// obj.conversation = item				
				// userList.forEach(item1 => {
				// 	if (item.toAccount == item1.userId) {
				// 		obj.user = item1
				// 	}
				// })							
			})
			console.log( 'userAddConversationList', this.userAddConversationList)
			//  this.userAddConversationList = []
			//  var arr= [];
			// conversationList.forEach(item => {
			// 	let obj = {}
			// 	obj.conversation = item
			// 	// userList.forEach(item1 => {
			// 	// 	if (item.toAccount == item1.userId) {
			// 	// 		obj.user = item1
			// 	// 	}
			// 	// })		
			// console.log(item)
			// 	if(item.type == "C2C"){
			// 		this.userAddConversationList.push(item);
			// 	}						
			// })			
			// console.log( 'userAddConversationList', this.userAddConversationList)
		},
			// 聊天列表
			toRoom(item) {
				console.log('item',item);
				if(item.conversation.type == 'C2C'){
						this.$store.commit('updateConversationActive', item);
						if(item.user){
							var userName = item.user.user
						}else{
							var userName = '用户' + item.conversation.userProfile.userID;
						}						
						uni.navigateTo({						
							url: '../chat/customerRoom?userName=' + userName + '&userId=' + item.conversation.userProfile.userID
						})
				}	
			},
			//获取消息列表
			getConversationList() {
				// 拉取会话列表
				let promise = this.tim.getConversationList();
				promise.then((res) => {
					let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
					if (conversationList.length) {
						//将返回的会话列表拼接上 用户的基本资料  
						//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
						this.$store.commit("updateConversationList", conversationList);
					}
			
				}).catch((err) => {
					console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
				});
			},
			// 接受消息(定位消息)
			screenMsg(newVal, oldVal) {
				// console.log('newVal',newVal);
				// console.log('oldVal',oldVal);
				//遍历用时间戳生成一个在线ID 插进去
				newVal.forEach(item => {
					var timestamp = new Date().getTime();
					var tiem_s = 'G' + timestamp;
					if (item.id && item.id.indexOf('G') > -1) {
					} else {
						item.id = tiem_s;
					}
				});
				if (newVal[0].ID && oldVal[0].ID) {
					if (newVal[0].ID != oldVal[0].ID && newVal.length >= this.count) {
						this.$nextTick(() => {
							this.scrollToView = newVal[newVal.length - 1].id;
						});
					} else {
						this.$nextTick(() => {
							this.scrollToView = newVal[newVal.length - 1].id;
						});
					}
				} else {
					this.$nextTick(() => {
						this.scrollToView = newVal[newVal.length - 1].id;
					});
				}
				// console.log('this.scrollToView',this.scrollToView);
			},
			//聊天的节点加上外层的div
			scrollClick(e) {
				// console.log('eeeee',e);
			},
			nodesFliter(str) {
				let nodeStr = '<div style="align-items: center;word-wrap:break-word;">' + str + '</div>';
				return nodeStr;
			},
			timeFliter(timer) {
				let timeData = new Date(timer * 1000);
				let str = this.$commen.dateTimeFliter(timeData);
				return str;
			},
			toliveShow(){
				uni.navigateTo({
					url: './liveshow/liveshow'
				})
			},
			
			topullShow(){
				uni.navigateTo({
					url: './liveshow/pull'
				})
			},		
			toscreenShow(){
				uni.navigateTo({
					url: './liveshow/screen'
				})
			},
		}
	}
</script>

<style>
	@import '@/static/chat/css/style.scss';
	.chatBgColor {
		background-color: #505050;
	}
	.chatBgColorVip {
		background-color: #e7c365;
	}
	.chatVipText {
		color: #d2b56b;
	}
	.chatText {
		color: #909090;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
		.list-box {
			width: 94%;
			margin: 40rpx auto;
		}
	
		.item-box {
			display: flex;
			width: auto;
			height: 130rpx;
			padding: 20rpx;
			overflow: hidden;
			border-bottom: 1px solid #eee;
		}
	
		.item-img {
			/* float: left; */
			/* margin-top: 20rpx; */
			width: 90rpx;
			height: 90rpx;
		}
	
		.item-img image {
			border-radius: 50%;
			width: 90rpx;
			height: 90rpx;
		}
	
		.item-text {
			    /* float: left; */
			    margin-left: 15px;
			    width: 550rpx;
			    /* height: 50px; */
			    color: #666;
			    font-size: 14px;
			    display: flex;
			    justify-content: space-between;
		}
	
		.item-user {
			width: auto;
			height: 40rpx;
			line-height: 40rpx;
			color: #333;
			font-weight: bold;
			font-size: 32rpx;
	
		}
		
		
	
		.item-text-info {
			width: auto;
			height: 40rpx;
			line-height: 40rpx;
			color: #666;
			font-size: 24rpx;
			overflow: hidden;
			text-overflow: ellipsis;
			white-space: nowrap;
			
		}
	
		.user-box {
			width: auto;
			height: 80rpx;
			padding: 0 20rpx;
		}
	
		.nav-tab {
			padding-top: 20rpx;
			background: #fff;
			height: 80rpx;
	
		}
	
		.tab-item {
			float: left;
			height: 70rpx;
			padding: 0 20rpx;
			line-height: 70rpx;
			color: #666;
			font-size: 28rpx;
			border: 1px solid #F56C6C;
			border-top-left-radius: 25rpx;
			border-bottom-left-radius: 25rpx;
		}
	
		.tab-item1 {
			float: left;
			height: 70rpx;
			padding: 0 20rpx;
			line-height: 70rpx;
			color: #666;
			font-size: 28rpx;
			border: 1px solid #F56C6C;
			border-top-right-radius: 25rpx;
			border-bottom-right-radius: 25rpx;
		}
	
		.tab-item-active {
			color: #fff;
			background: #F56C6C;
		}
	
		.msg-box {
			line-height: 30rpx;
			font-size: 28rpx;
			color: #666;
		}
	
		.user-item-box {
			padding: 20rpx 0;
			width: auto;
			height: 70rpx;
			line-height: 70rpx;
			cursor: pointer;
			border-bottom: 1px solid #eee;
		}
	
		.user-img {
			float: left;
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
			overflow: hidden;
		}
	
		.user-img image {
			width: 70rpx;
			height: 70rpx;
			border-radius: 50%;
		}
	
		.user-name {
			float: left;
			margin-left: 20rpx;
			width: 250rpx;
			height: 70rpx;
			line-height: 70rpx;
			color: #666;
			font-weight: 500;
		}
		.item-msg{
			float: left;
			width: 40rpx;
			/* height: 100rpx; */
		}
		.item-msg-icon{
			width: 40rpx;
			height: 40rpx;
			border-radius: 50%;
			background: #f06c7a;
			color: #fff;
			line-height: 40rpx;
			/* margin-top: 30rpx; */
			text-align: center;
			font-size: 24rpx;
		}
		.item-msg-bottom{
			display: flex;
			justify-content: space-between;
			margin-left: 30rpx
		}
		.clear-box {
			clear: both;
		}
		.out-login{
			float: right;
			margin-right:20rpx;
			height: 70rpx;
			line-height: 70rpx;
			padding: 0 40rpx;
			border-radius: 25rpx;
			color: #fff;
			background: #F56C6C;
			font-size: 26rpx;
		}
</style>
