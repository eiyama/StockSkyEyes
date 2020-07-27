<template>
	<view>
		<cu-custom bgColor="bg-red" :isBack="true">
			<block slot="content">个人资料</block>
		</cu-custom>
		<view>
			<view class="cu-form-group margin-top photo" @click="chooseImage()">
				<view class="title">头像</view>
				<view class="cu-avatar radius bg-gray circle">
					<image :src="headImg" style="width: 121rpx;height: 121rpx;border-radius: 50%;"></image>
				</view>
				<text class="cuIcon-right iconfontright"></text>
			</view>
		</view>
		<view class="from">
			<view class="cu-form-group margin-top">
				<view class="title">手机</view>
				<input disabled name="input">
				<text class="photo-num bookfont-size">{{userInfo.phoneNumber}}</text>
				</input>
			</view>
			<view class="cu-form-group" @tap="updateName" data-target="updateModal">
				<view class="title">昵称</view>
				<view class="">
					<text class="userName bookfont-size">{{UserNickName ? UserNickName : userInfo.memberName}}</text>
					<text class="cuIcon-right iconfontright jiantou"></text>
				</view>
			</view>
			<view class="cu-form-group">
				<view class="title">会员级别</view>
				<input disabled name="input">
				<text class="photo-num bookfont-size">{{userInfo.levelDisplay}}</text>
				</input>
			</view>
			<view class="cu-form-group">
				<view class="title">客户经理</view>
				<view class="">
					<text class="userName bookfont-size">{{userInfo.customerManagerName ? userInfo.customerManagerName : ''}}</text>
				</view>
			</view>
			<view class="" v-if="isVIP">
				<view class="cu-form-group margin-top">
					<view class="title">姓名</view>
					<input disabled name="input">
					<text class="photo-num bookfont-size">{{applyInfo.realname}}</text>
					</input>
				</view>
				<view class="cu-form-group">
					<view class="title">出生年月</view>
					<input disabled name="input">
					<text class="photo-num bookfont-size">{{applyInfo.birthday}}</text>
					</input>
				</view>
				<view class="cu-form-group">
					<view class="title">股龄</view>
					<input disabled name="input">
					<text class="photo-num bookfont-size">{{applyInfo.stockAge}}</text>
					</input>
				</view>
				<view class="cu-form-group">
					<view class="title">资金量</view>
					<input disabled name="input">
					<text class="photo-num bookfont-size">{{applyInfo.amountFunds}}</text>
					</input>
				</view>
				<view class="cu-form-group">
					<view class="title">开户券商</view>
					<input disabled name="input">
					<text class="photo-num bookfont-size">{{applyInfo.securitiesCompany}}</text>
					</input>
				</view>
						
				<view class="cu-form-group">
					<view class="title">股票账户</view>
					<input disabled name="input">
					<text class="photo-num bookfont-size">{{applyInfo.stockAccount}}</text>
					</input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件类型</view>
					<input disabled name="input">
					<text class="photo-num bookfont-size">{{applyInfo.identifyTypeDisplay}}</text>
					</input>
				</view>
				<view class="cu-form-group">
					<view class="title">证件号码</view>
					<input disabled name="input">
					<text class="photo-num bookfont-size">{{applyInfo.identifyNo}}</text>
					</input>
				</view>
			</view>
		</view>
	

		<view style="padding-top: 30px;padding-bottom: 15px;padding-left: 30px;padding-right: 30px">
			<button class='cu-btn block margin-tb-sm lg shadow text-white bg-red'
			 @click="logout()">退出登录</button>
		</view>

		<view class="cu-modal" :class="update=='updateModal'?'show':''">
			<view class="cu-dialog">
				<view class="cu-bar bg-white justify-end">
					<view class="content">修改昵称</view>
					<view class="action" @tap="hideModal">
						<text class="cuIcon-close"></text>
					</view>
				</view>
				<view class="">
					<input class="input-l" type="text" v-model="UserNickName" />
				</view>
				<view class="cu-bar bg-white justify-end">
					<view class="action">
						<button class="cu-btn" @tap="hideModal">取消</button>
						<button class="cu-btn margin-left bg-red text-white" @click="confirmName">确定</button>
					</view>
				</view>
			</view>
		</view>

	</view>
</template>

<script>
	import helper from '../../../common/helper.js';
	import { mapState } from 'vuex';
	export default {
		data() {
			return {
				errMsg: '',
				update:null,
				index: 0,
				indexnum: 0,
				categoryName: "个人资料",
				headImg: "../../../static/img/default-avatar.png",
				UserNickName:'',
				token: '',
				userId: '',
				userInfo:{},
				vipUserInfo:{},
				isVIP:false,
				applyInfo:{},
			}
		},
		onLoad() {
			const value = uni.getStorageSync('accountInfo');
			this.token = value.token;
		},
		onShow() {
			this.getUserInfoData();
		},
		methods: {
			getUserInfoData(){
				uni.showLoading({
					title: '加载中'
				});
				this.$http.get('/StockSkyEyes/App/GetSelfInfo').then(res => {
					console.log(res);
					uni.hideLoading() ;
					if (res.data && res.data.status === 200) {
						this.userInfo = res.data.result ;
						this.UserNickName = res.data.result.memberName ;
						if(this.userInfo.headImageUrl){
							this.headImg = this.userInfo.headImageUrl;
						}
						if(this.userInfo.level != 'Normal'){
							this.getVipUserInfo();
						}
					} else{
						
					}
				})
			},
			getVipUserInfo(){
				this.isVIP = true ;
					this.$http.get('/StockSkyEyes/App/GetVipInfo').then(res => {
						if(res.data && res.data.result){
							console.log(res);
							this.applyInfo = res.data.result;
						}
					})
			},
			setInfoData(userInfo) {
					this.$http.post('/StockSkyEyes/App/UpdateSelfInfo',userInfo).then(res => {
						if(res.data.status == 200){
							this.update = null ;
							const userInfo = res.data.result ;
							uni.setStorageSync('userInfo', userInfo);
							uni.showToast({
								icon: 'none',
								title: '个人资料修改成功',
								duration: 2000,
							});
						}
					})
			},
			hideModal(e) {
				this.update = null ;
			},
			updateName(e){
				this.update = 'updateModal';
			},
			confirmName(){
				let form = {
					MemberName:this.UserNickName
				}
				this.setInfoData(form);
			},
			chooseImage: async function() {
				var self = this;
				uni.chooseImage({
					sizeType: ["compressed"],
					success: (chooseImageRes) => {
						uni.showLoading({
						    title: '加载中'
						});
						var imgSrc = chooseImageRes.tempFilePaths;
						uni.uploadFile({
							url: helper.apiHost + '/StockSkyEyes/App/Upload?catalog=HeadImage', 
							filePath: imgSrc[0],
							name: 'file1',
							header: {
								"Authorization": self.token
							},
							success: (uploadFileRes) => {
								let imgData;
								imgData = JSON.parse(uploadFileRes.data)
								self.headImg = imgData.result[0].url
								let imgId = imgData.result[0].id
								uni.showToast({
									icon: 'none',
									title: '头像修改成功',
									duration: 2000,
								});
								let form ={
									HeadImageId : imgId
								};
								self.$http.post('/StockSkyEyes/App/UpdateSelfInfo',form).then(res => {
									console.log('res',res);
									uni.hideLoading();
									if(res.data.status == 200){
										self.headImg =  res.data.result.headImageUrl ;
										const userInfo = res.data.result ;
										uni.setStorageSync('userInfo', userInfo);
									}
								})
							}
						});
					}
				});
			},
			
			logout() {
				var self = this;				
				uni.showModal({
					title: '温馨提示',
					content: "确定要退出登录吗？",
					cancelText: '再看看',
					cancelColor: '#2fb2da',
					confirmText: '离开',
					confirmColor: '#999',
					success: function(res) {
						if (res.confirm) {
							uni.clearStorageSync();						
							uni.removeStorageSync('accountInfo');
							uni.removeStorageSync('userInfo');
							uni.removeStorageSync('userId');
							uni.removeStorageSync('userSig');
							uni.removeStorageSync('groupID');
							uni.removeStorageSync('customer');						
							uni.removeStorageSync('Level');
							uni.$emit('isHiddenLive',{hiddenLive:true});
							uni.setStorageSync('hiddenLive',true);
							uni.redirectTo({
								url: './login'
							});
							let promise = self.tim.logout();
							promise.then(res=> {
								self.$store.commit('reset')								
							}).catch(err=> {
							   console.log('退出失败')
							});							
						}
					}
				});
			},
		}
	}
</script>

<style>
	.photo {
		height: 160rpx;
	}

	.circle {
		height: 120rpx;
		width: 120rpx;
		border-radius: 50%;
		position: relative;
		left: 200rpx;
	}

	.from {
		margin-top: 20rpx;
	}

	.iconfontright {
		color: #8799a3;
		position: relative;
		left: 6rpx;
	}

	.photo-num {
		margin-right: 20rpx;
	}

	.jiantou {
		font-size: 36rpx;
	}

	.userName {
		margin-right: 8rpx;
	}

	.bookfont-size {
		font-size: 13px;
	}

	.bookfont-color {
		color: #2fb2da;
	}

	.title-width {
		width: 90px;
	}

	.form-content {
		padding: 10rpx;
	}
	.input-l {
		width: 100%;
		height: 80rpx;
		background-color: #FFFFFF;
		padding-left: 30rpx;
		border: 1px solid #eee;
	}
</style>
