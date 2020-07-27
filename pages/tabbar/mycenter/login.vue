<template>
	<view class="content">
		<view class="text-center text-white">
			<view class="">
				<image src="../../../static/img/logo.png" style="height: 60rpx;width: 340rpx;" mode=""></image>
			</view>
		</view>
		<view class="" style="margin-left: 15px;margin-right: 15px;margin-top: 50px;border-radius: 8px;padding-top: 30px;">
			<view class="cu-form-group login-input" style="border-radius: 8px 8px 0px 0px;background-color:#E7253A ;padding: 0;">
				<view class="title" style="width: 80rpx;">
					<image src="../../../static/img/icon-phone.png" style="width: 50rpx;height: 80%;margin-top: 10rpx;" mode=""></image>
				</view>
				<input placeholder="请输入手机号" name="input" placeholder-style="color:#FC8793" style="color:#ffffff;" type="text"
				 v-model="loginData.phoneNumber" maxlength="11"></input>
			</view>
			<view class="cu-form-group login-input" style="background-color:#E7253A ;padding: 0;">
				<view class="title" style="width: 80rpx;">
					<image src="../../../static/img/icon-PW.png" style="width: 50rpx;height: 80%;margin-top: 10rpx;" mode=""></image>
				</view>
				<input placeholder="请输入密码" name="input" placeholder-style="color:#FC8793;" style="color:#ffffff;" v-model="loginData.Captcha"></input>

				<view class="flex justify-between" style="width: 170rpx;">
					<view class="" style="width: 1px;height: 34rpx;background-color: rgba(255,255,255,0.20);">

					</view>
					<text v-show="showTimer" style="font-size: 26rpx;color: #fff;" @click="getCode">获取验证码</text>
					<view v-show="!showTimer" class="text-gray" style="font-size: 26rpx;">{{'还剩' + count + '秒'}}</view>
				</view>
			</view>

			<view style="padding-top: 80rpx;padding-bottom: 30rpx;">
				<button class='cu-btn block margin-tb-sm line-blue lg' style="color: #FFFFFF;" @click="onLogin()">登录</button>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from './../../../common/helper.js';
	var TIME_COUNT = 60;
	export default {
		data() {
			return {
				count: '',
				switchC: false,
				loginData: {
					phoneNumber: '',
					Captcha: '',
				},
				showTimer: true,
			}
		},
		onLoad(d) {
			const value = uni.getStorageSync('accountInfo');
			if (value) {
				uni.switchTab({
					url: '/pages/tabbar/home/index'
				});
			}
		},
		methods: {
			SwitchC(e) {
				this.switchC = e.detail.value
			},
			getCode() {
				if (!this.loginData.phoneNumber) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号码',
						duration: 2000
					});
					return
				} else {
					if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.loginData.phoneNumber)) {
						uni.showToast({
							icon: 'none',
							title: '手机号格式不正确',
							duration: 2000
						});
						return
					}
				}
				this.$http.post('/StockSkyEyes/App/Captcha?phoneNumber=' + this.loginData.phoneNumber)
					.then(res => {
						console.log(res);
						if (res.data && res.data.status === 200) {
							this.loginData.Captcha = res.data.result.captcha;
						} else {
							helper.showErrorDialog(res.data.errMsg);
						}

					}).catch(err => {
						console.log(err);
						helper.showErrorDialog(err);
					});
				if (this.timer == null) {
					this.count = TIME_COUNT;
					this.showTimer = false;
					this.timer = setInterval(() => {
						if (this.count > 0 && this.count <= TIME_COUNT) {
							this.count--;
						} else {
							this.showTimer = true;
							clearInterval(this.timer);
							this.timer = null;
						}
					}, 1000)
				}
			},
			onLogin() {
				if (!this.loginData.phoneNumber) {
					uni.showToast({
						icon: 'none',
						title: '请输入手机号',
						duration: 2000
					});
					return
				}else {
					if (!/^((1[3,5,8][0-9])|(14[5,7])|(17[0,6,7,8])|(19[7]))\d{8}$/.test(this.loginData.phoneNumber)) {
						uni.showToast({
							icon: 'none',
							title: '手机号格式不正确',
							duration: 2000
						});
						return
					}
				}
				
				if (!this.loginData.Captcha) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码',
						duration: 2000
					});
					return
				}
				//发送post请求
				this.$http.post('/StockSkyEyes/App/Token', this.loginData)
					.then(res => {
						console.log(res);
						if (res.data && res.data.status === 200) {
							let UserInfo = {};
							UserInfo = res.data.result;
							uni.setStorageSync('accountInfo', UserInfo);
							uni.switchTab({
								url: '/pages/tabbar/home/index'
							});
						} else {
							helper.showErrorDialog(res.data.errMsg);
						}

					}).catch(err => {
						console.log(err);
						helper.showErrorDialog(err);
					});
			},
			onRegUser(param) {
				uni.navigateTo({
					url: './regStepOne?isForgot=' + param
				});
			}
		}
	}
</script>

<style>
	.content {
		background-color: #E7253A;
		height: 100vh;
		padding: 90rpx;
		padding-top: 260rpx;
	}

	.login-input {
		border-bottom: 1px solid rgba(255, 255, 255, 0.20) !important;
		border-top: 0px solid rgba(255, 255, 255, 0.20) !important;
	}
</style>
