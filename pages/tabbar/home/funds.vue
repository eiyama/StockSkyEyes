<template>
	<view class="content">
		<cu-custom bgColor="bg-orange" :isBack="true">
			<block slot="content">
			</block>
		</cu-custom>
		<view class="">
			<view class="text-center">
				<!-- <text class="block" style="color: #B4863B;font-size: 21px;font-weight: 600;">知识改变命运 基金简化过程</text>
				<view class="" style="font-size: 22px;font-weight: 600;color: #fff;font-style: italic;letter-spacing:4px;margin-top: 40rpx;">
					<text class="block">最新超强盈利基金</text>
					<text class="block">上线抢购中...</text>
				</view> -->
				<image src="../../../static/img/top-txt.png" style="width:554rpx;height:196rpx ;" mode=""></image>								
				
			</view>
			<view v-if="!isBuy">
				<view style="background-image: url(../../../static/img/img-cards.png);background-size:100% 100%;width: 100%;height: 600rpx;margin-top: 60rpx;">
					<view class="text-center" style="font-size: 24px;color:#FFFFFF;padding-top: 154rpx;">
						<view>
							<text>起跳金额 ：</text>
							<text style="margin-left: 10rpx;">10万元</text>
						</view>
						<view>
							<text>余额 ：</text>
							<text style="margin-left: 10rpx;">1200万元</text>
						</view>
					</view>
				</view>
				<view style="margin-left: 92rpx;color: #F7E9CB;margin-top: -100rpx;">
					<view>
						<text style="font-size: 16px;font-weight: 600;line-height: 48rpx;">抢购规则：</text>
					</view>
					<view style="font-size: 14px;">
						<text class="block" style="line-height: 48rpx;">1. 先举手登记抢购名额</text>
						<text class="block" style="line-height: 48rpx;">2. 客服会尽快电话联系您</text>
						<text class="block" style="line-height: 48rpx;">3. 可预约线下面对面进行交易洽谈</text>
					</view>
				</view>
				<view class="flex justify-center" style="margin-top: 20rpx;">
					<button class='cu-btn margin-tb-sm lg text-white round' style="background-color: #e6972e;width: 560rpx;height: 104rpx;font-size: 20px;color:#F7E9CB;font-weight: 600;"
					 @click="buyFunds">举手抢购</button>
				</view>
			</view>
			<view v-if="isBuy">
				<view class="flex justify-center" style="margin-top: 126rpx;">
					<image src="../../../static/img/success.png" style="width: 176rpx;height: 176rpx;" mode=""></image>
				</view>
				<view class="text-center" style="color: #F7E9CB;margin-top: 26rpx;">
					<text>举手时间: {{dataDetail.createdTime}}</text>
				</view>
				<view class="text-center" style="color: #F7E9CB;margin-top: 20rpx;font-size: 32rpx;font-weight: bold;">
					<text class="block" style="line-height:48rpx;height: 48rpx;">已成功举手抢购</text>
					<text class="block" style="line-height:48rpx;height: 48rpx;">清耐心等待客服电话与您联系</text>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				dataDetail: {},
				isBuy:false
			};
		},
		onReady() {

		},
		onLoad() {

		},

		onShow() {
			this.getbuyFundsState();
		},

		methods: {
			getbuyFundsState() {
				this.$http.get('/StockSkyEyes/App/GetPurchaseFunds').then(res => {
					console.log(res);
					if (res.data && res.data.result) {
						this.dataDetail = res.data.result;
						this.isBuy = true ;
					}
				})
			},
			buyFunds() {
				this.$http.post('/StockSkyEyes/App/PurchaseFunds').then(res => {
					console.log(res);
					if (res.data.status == 200) {
						const userInfo = res.data.result;
						uni.setStorageSync('userInfo', userInfo);
						uni.showToast({
							icon: 'none',
							title: '举手抢购成功！！！',
							duration: 2000,
						});
						this.getbuyFundsState();
					}
				})
			}
		}
	};
</script>

<style>
	.content {
		height: 100vh;
		background-color: #e5be6d;
	}
</style>
