<template>
	<view class="content-s">
		<cu-custom bgColor="bg-black" :isBack="true">
			<block slot="content">
				<text style="font-size: 19px;font-weight: 700;color: #d6b793;">VIP 申请</text>
			</block>
		</cu-custom>
		<view v-if="!isApply">
			<view>
				<view style="padding: 28rpx;position: relative;">
					<view style="height: 218rpx;background-color: #443e35;width: 100%;border: 2px solid #5c5447;">
						<view style="padding: 30rpx 50rpx;color: #e6c185;">
							<text class="block" style="font-size: 18px;">加入VIP的权益 ： </text>
							<text class="block" style="margin-top: 10rpx;font-size: 14px;color: #cdad79;">一、可阅览VIP专属操盘股票信息</text>
							<text class="block" style="margin-top: 10rpx;font-size: 14px;color: #cdad79;">二、提供VIP专属的股票教学课程</text>
						</view>
					</view>
					<view>
						<text class="block" style="width: 22px;height: 22px; border-radius: 50%;background-color: #202020;position: absolute;top: 5px;left:5px;"></text>
						<text class="block" style="width: 22px;height: 22px; border-radius: 50%;background-color: #202020;position: absolute;top: 5px;right:5px;"></text>
						<text class="block" style="width: 22px;height: 22px; border-radius: 50%;background-color: #202020;position: absolute;bottom: 5px;left:5px;"></text>
						<text class="block" style="width: 22px;height: 22px; border-radius: 50%;background-color: #202020;position: absolute;bottom: 5px;right:5px;"></text>
					</view>
				</view>
				<view class="flex justify-center" style="margin-top: 10rpx;">
					<text class="block" style="height: 1px;background-color: #666;width: 100%;"></text>
				</view>
				<view>
					<view class="from">
						<view class="cu-form-group input-vip">
							<view class="title">姓名</view>
							<input name="input" style="color: #fff;" placeholder="输入姓名" v-model="vipForm.Realname">
							</input>
						</view>
						<view class="cu-form-group input-vip">
							<view class="title">证件类型</view>
							<picker @change="changeCertificateType" :value="indexnum" :range="certificateTypeValue">
								<view class="picker bookfont-size text-white" style="text-align: left;">
									{{certificateTypeValue[indexnum] ? certificateTypeValue[indexnum] : certificateTypeValue[0]}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group input-vip">
							<view class="title">证件号码</view>
							<input name="input"  @blur="getStandard" maxlength="18" style="color: #fff;" placeholder="请输入证件号码"
							 v-model="vipForm.IdentifyNo">
							</input>

						</view>
						<view class="cu-form-group input-vip">
							<view class="title">出生年月日</view>
							<picker mode="date" :value="date" start="1950-09-01" end="2020-09-01" @change="DateChange">
								<view class="picker bookfont-size" style="text-align: left;" :class="date ? ' text-white' : 'fontColor-text'">
									{{date ? date : '请选择出生日期'}}
								</view>
							</picker>
						</view>
						<view class="cu-form-group input-vip">
							<view class="title">股龄</view>
							<input name="input" type="number" style="color: #fff;" maxlength="2" placeholder="输入股龄" v-model="vipForm.StockAge">
							</input>
							<view class="fontColor-text">
								(年)
							</view>
						</view>
						<view class="cu-form-group input-vip">
							<view class="title">资金量</view>
							<input name="input" style="color: #fff;" placeholder="请输入资金量" v-model="vipForm.AmountFunds">
							</input>
							<view class="fontColor-text">
								(万)
							</view>
						</view>
						<view class="cu-form-group input-vip">
							<view class="title">开户券商</view>
							<input name="input" style="color: #fff;" placeholder="请输入开户卷商" v-model="vipForm.SecuritiesCompany">
							</input>
						</view>
						<view class="cu-form-group input-vip">
							<view class="title">股票账户</view>
							<input name="input" style="color: #fff;" placeholder="请输入股票账户" v-model="vipForm.StockAccount">
							</input>
						</view>

					</view>
				</view>
				<view>
					<view style="padding: 30rpx;">
						<view style="color: #909090;">
							请上传您的股票账户截图，资产需
							<text style="color: #9c8560;">大于100万元</text>才可申请成为VIP
						</view>
					</view>
					<view class="cu-form-group" style="background-color: #202020;">
						<view class="grid col-4 grid-square flex-sub flex justify-center">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
								<image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red " @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="chooseImage" v-if="!screenshotImg">
								<text class='cuIcon-cameraadd'></text>
							</view>
							<view v-if="screenshotImg">
								<image :src="screenshotImg" style="width: 155rpx;height: 155rpx;"></image>
							</view>
						</view>
					</view>
					<view class="text-center" style="padding-bottom: 140rpx;">
						<text v-if="!screenshotImg">请上传.jpg/.png格式的图片</text>
					</view>
				</view>
				<view :style="{ height: screenHeight + 'px' }">

				</view>
			</view>
			<view style="position: fixed;bottom: 0;width: 100%;">
				<button class='cu-btn lg text-black' style="background-color: #dbb983;height: 104rpx;font-size: 20px;width: 100%;border-radius: 0;"
				 @click="submitApplyVIP">提交申请</button>
			</view>
		</view>


		<view v-if="isApply">
			<view class="flex justify-center" style="margin-top: 150rpx;">
				<image src="../../../static/img/successApply.png" style="width: 144rpx;height: 144rpx;" mode=""></image>
			</view>
			<view class="text-center" style="margin-top: 34rpx;">
				<text>提交时间:{{applyInfo.createdTime}}</text>
			</view>
			<view class="text-center" style="margin-top: 40rpx;color: #909090;font-size: 14px;">
				<view>
					资料已成功提交，2个工作日内完成审核
				</view>
				<view>
					审核成功后，您会收到短信通知
				</view>
				<view>
					届时重新登录系统，即可看到VIP权益
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	import helper from '../../../common/helper.js';
	export default {
		data() {
			return {
				date: "",
				screenshotImg: '',
				imgList: [],
				index: 0,
				indexnum: 0,
				vipForm: {
					Realname: "",
					IdentifyType: "",
					IdentifyNo: "",
					Birthday: "",
					StockAge: "",
					SecuritiesCompany: "",
					StockAccount: "",
					AmountFunds: "",
					AccountImages: []
				},
				token: '',
				certificateTypeValue: ['身份证', '港澳身份证', '台胞证', '中国护照'],
				certificateTypeLabel: ['IdCard', 'GAIdCard', 'TaiwanesePassport', 'ChinaPassPort'],
				isApply: false,
				applyInfo: {},
				screenHeight: ''
			};
		},
		onReady() {

		},
		onLoad() {
			const value = uni.getStorageSync('accountInfo');
			this.token = value.token;
			this.vipForm.IdentifyType = this.certificateTypeLabel[this.indexnum];
		},

		onShow() {
			this.getApplyInfo();
			let _this = this;
			uni.onKeyboardHeightChange(res => {
				console.log(res.height)
				_this.screenHeight = res.height;
			})
		},

		methods: {
			isCardNo(card) {
				// 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X 
				var verifyIdentity = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (verifyIdentity.test(card) === false) {
					uni.showToast({
						icon: 'none',
						title: '身份证输入不合法',
						duration: 2000
					});
					this.vipForm.IdentifyNo = ''
					return;
				}
			},
			getApplyInfo() {
				this.$http.get('/StockSkyEyes/App/GetVipInfo').then(res => {
					if (res.data && res.data.result) {
						this.isApply = true;
						this.applyInfo = res.data.result;
					}
				})
			},
			changeCertificateType(e) {
				this.indexnum = e.detail.value;
				this.vipForm.IdentifyType = this.certificateTypeLabel[this.indexnum];
			},
			getStandard(e) {
				if (this.vipForm.IdentifyType == 'IdCard') {
					const birthday = e.detail.value;
					this.isCardNo(birthday);
					const date = this.getBirthdayFromIdCard(birthday)
					this.date = date;
					this.vipForm.Birthday = date;
				}
			},
			getBirthdayFromIdCard: function(idCard) {
				var birthday = "";
				if (idCard != null && idCard != "") {
					if (idCard.length == 15) {
						birthday = "19" + idCard.substr(6, 6);
					} else if (idCard.length == 18) {
						birthday = idCard.substr(6, 8);
					}

					birthday = birthday.replace(/(.{4})(.{2})/, "$1-$2-");
				}

				return birthday;
			},
			DateChange(e) {
				this.date = e.detail.value;
				this.vipForm.Birthday = this.date;
			},
			SecuritiesCompany(e) {
				this.vipForm.SecuritiesCompany = this.SecuritiesCompanyList[this.index]
			},
			submitForm() {

			},
			submitApplyVIP() {
				if (!this.vipForm.Realname) {
					uni.showToast({
						icon: 'none',
						title: '请输入姓名',
						duration: 2000
					});
					return
				}
				if (!this.vipForm.Birthday) {
					uni.showToast({
						icon: 'none',
						title: '请输入出生年月',
						duration: 2000
					});
					return
				}
				if (!this.vipForm.StockAge) {
					uni.showToast({
						icon: 'none',
						title: '请输入股龄',
						duration: 2000
					});
					return
				}

				if (!this.vipForm.AmountFunds) {
					uni.showToast({
						icon: 'none',
						title: '请输入资金量',
						duration: 2000
					});
					return
				}
				if (!this.vipForm.SecuritiesCompany) {
					uni.showToast({
						icon: 'none',
						title: '请输入开户卷商',
						duration: 2000
					});
					return
				}
				if (!this.vipForm.StockAccount) {
					uni.showToast({
						icon: 'none',
						title: '请输入股票账户',
						duration: 2000
					});
					return
				}
				if (!this.vipForm.IdentifyType) {
					uni.showToast({
						icon: 'none',
						title: '请选择证件类型',
						duration: 2000
					});
					return
				}
				if (!this.vipForm.IdentifyNo) {
					uni.showToast({
						icon: 'none',
						title: '请输入证件号码',
						duration: 2000
					});
					return
				}
				if (this.vipForm.AccountImages.length <= 0) {
					uni.showToast({
						icon: 'none',
						title: '请上传股票账户截图',
						duration: 2000
					});
					return
				}
				this.$http.post('/StockSkyEyes/App/VIPApply', this.vipForm).then(res => {
					if (res.data && res.data.result) {
						this.getApplyInfo();
					}
				})
			},
			ageChange() {

			},
			chooseImage: async function() {
				var self = this;
				self.vipForm.AccountImages = [];
				uni.chooseImage({
					sizeType: ["compressed"],
					success: (chooseImageRes) => {
						uni.showLoading({
							title: '加载中'
						});
						var imgSrc = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: helper.apiHost + '/StockSkyEyes/App/Upload?catalog=AssetImages',
							filePath: imgSrc[0],
							name: 'file1',
							header: {
								"Authorization": self.token
							},
							success: (uploadFileRes) => {
								uni.hideLoading();
								if (uploadFileRes && uploadFileRes.data) {
									let imgData;
									imgData = JSON.parse(uploadFileRes.data)
									self.screenshotImg = imgData.result[0].url;
									let imgId = imgData.result[0].id;
									self.vipForm.AccountImages.push(imgId);
								}
							}
						});
					}
				});
			},
			toFundsState() {
				uni.navigateTo({
					url: './successFunds'
				})
			}
		}
	};
</script>

<style>
	.content-s {
		background-color: #202020;
		min-height: 100vh;
	}

	.title {
		width: 236rpx;
		color: #909090;
	}

	.input-vip {
		background-color: #181818;
		border-top: 1px solid #808080 !important;
	}

	.applyVip-nput {}

	.fontColor-text {
		color: #808080;
	}
</style>
