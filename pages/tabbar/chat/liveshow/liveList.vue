<template>
	<view>
		<cu-custom bgColor="bg-red"  >
			<block slot="content" >客户经理列表</block>
			<!-- <block slot="backText" @click="openBack">返回</block> -->
		</cu-custom>
		<view class="item-msg-bottom" style="margin: 20px;" @click="toliveShow">
			全屏直播
		</view>
		<!-- <view class="item-msg-bottom" style="margin: 20px;" @click="topushShow">
			vip群直播
		</view> -->
		<view class="item-msg-bottom" style="margin: 20px;" @click="toscreenShow">
			录屏直播
		</view>
		<view class="item-msg-bottom" style="margin: 20px;" @click="toCoversation">
			消息列表
		</view>
	</view>
	
</template>

<script>
// simport userList from '../../../commen/tim/user.js';
	export default {
		data() {
			return {
				serialNo:'',
				windowHeight:0,
				pushUrl:''
			}
		},
		onLoad(params) {
				// this.getLiveRoom()
		},
		
	
		methods: {
			toCoversation(){
				uni.navigateTo({
					url: '../conversationList'
				})
			},
		    toliveShow(){
				uni.showLoading({})
				this.$http.post('/StockSkyEyes/App/CreateLiveRoom').then(res => {
				uni.hideLoading() ;
				if(res.data && res.data.status === 200){
						const pushUrl = res.data.result.pushUrl;												
						uni.setStorageSync('pushUrl',pushUrl);
						uni.navigateTo({
							url: './liveshow'
						})
					}
				})																
			},						
				
			toscreenShow(){
				uni.showLoading({})
				this.$http.post('/StockSkyEyes/App/CreateLiveRoom').then(res => {
				uni.hideLoading() ;
				if(res.data && res.data.status === 200){
						const pushUrl = res.data.result.pushUrl;												
						uni.setStorageSync('pushUrl',pushUrl)
						uni.navigateTo({
							url: './screen' 
						})
					}
				})				
			},
		}
	}
</script>

<style>
	
</style>
