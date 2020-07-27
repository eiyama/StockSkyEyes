<template>
	<view>
		<view class="status_bar"></view>
		<view style="padding: 15px;height: 240px;background:linear-gradient(180deg,#393939 0%,#000000 100%);">			
			<view class="grid margin-bottom text-center" :class="'col-1'">
				<view style="padding: 5px;border-radius: 5px;position: relative;">
					<view class="openBack" @click="openBack">
						<image src="../../../static/img/back.png" style="width:9px;height: 15px;" mode=""></image>
					</view>
					<image :src="headImg" style="width: 80px;height: 80px;margin-top: 40px;border-radius: 50%;" @click="viewPersonageInfo()" ></image>
					<view style="margin-top: 20rpx;">
						<!-- <text style="color: #666;font-size: 12px;text-align: center;line-height: 20px;">点击头像，可修改</text> -->
					</view>
					<view class="flex justify-center align-center">
						<image v-if="Level == 'VIP'" style="width: 32upx;height: 32upx;" src="../../../static/img/icon-VIP.png" mode=""></image>
						<text style="color: #F0F0F0;font-size: 30rpx;text-align: center;line-height: 30px;margin-left: 10rpx;color:#eec363;">
						 {{userInfo.memberName}}
						</text>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu" style="margin-top: -50rpx;border-radius:30rpx 30rpx 0px 0px;">
			<view style="width: 100%;background-color: #FFFFFF;height: 15rpx;border: 0;">
			</view>
			<view class="cu-item arrow" style="padding: 0 46rpx;border-top:0 ;" @click="viewPersonageInfo()">
				<view class="content">
					<image style="width: 44rpx;height: 44rpx;" src="../../../static/img/mycenter/icon-user-red.png" mode=""></image>
					<text style="margin-left: 32rpx;font-size: 30rpx;font-weight: 700;">个人资料</text>
				</view>
			</view>
			<view class="cu-item arrow" style="padding: 0 46rpx;" @click="toConsult" v-if="Level == 'VIP'">
				<view class="content">
					<image style="width: 44rpx;height: 44rpx;" src="../../../static/img/mycenter/icon-infos.png" mode=""></image>
					<text style="margin-left: 32rpx;font-size: 30rpx;font-weight: 700;">我的咨询</text>
				</view>
			</view>
			<!-- <view class="cu-item arrow" style="padding: 0 46rpx;" @click="toLiveList" v-if="isKF">
				<view class="content">
					<image style="width: 44rpx;height: 44rpx;" src="../../../static/img/mycenter/icon-user-red.png" mode=""></image>
					<text style="margin-left: 32rpx;font-size: 30rpx;font-weight: 700;">我是客服</text>
				</view>
			</view> -->
			<view class="cu-item arrow" style="padding: 0 46rpx;"  @click="toliveshow">
				<view class="content">
					<image style="width: 44rpx;height: 44rpx;" src="../../../static/img/mycenter/icon-about.png" mode=""></image>
					<text style="margin-left: 32rpx;font-size: 30rpx;font-weight: 700;">关于</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				headImg: '../../../static/img/default-avatar.png',
				userInfo:{},
				Level:'',
				customer:{},
				isKF:false,
			}
		},
		onLoad() {
			
		},
		onShow() {
			this.customer = uni.getStorageSync('customer');
			const value = uni.getStorageSync('userInfo');
			this.isKF = uni.getStorageSync('userInfo').isKF;
			this.userInfo = value ;
			if (value.headImageUrl) {
				this.headImg = value.headImageUrl ;
			} else {
				this.headImg = '../../../static/img/default-avatar.png' ;
			}
			this.Level = uni.getStorageSync('Level');
		},
		methods: {
			viewPersonageInfo() {
				uni.navigateTo({
					url: './personalInfo'
				})
			},
			toLiveList(){
				uni.navigateTo({
					url: '../chat/liveshow/liveList'
				})
			},
			openBack(){
				uni.navigateBack();
			},
			toConsult(){
				if(this.Level == 'VIP'){
					if(uni.getStorageSync('userInfo').isKF){
							uni.navigateTo({
								url: './service'
							})
						}else{
							var userId = uni.getStorageSync('customer').kfId;
							this.$store.commit('createConversationActive', userId );
							uni.navigateTo({
								url: '../chat/customerService'
							})
						}					
				}
			},
										
			toliveshow(){
				uni.navigateTo({
					url: './about'
				})
			}							
		}
	}
</script>

<style scoped>
	.openBack{
		position: absolute;
		top: 0rpx;
		left: 0px;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
		background:#373737;
	}
</style>
