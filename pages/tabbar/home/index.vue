<template>
	<view>		
		<view class="" style="background-color: #E7253A;">
			<view class="status_bar">
				<!-- 这里是状态栏 -->
			</view>
			<view class="header-title" style="background-color: #E7253A;">
				<view class=""> Hi{{customer.name}} </view>			
					<image  @click="tomyInfor" style="width: 20px;height: 20px;" src="../../../static/img/my.png" mode=""></image>
					<!-- 我的 -->				
			</view>
			<view class="flex justify-center align-center text-white bg-red" style="height: 112rpx;">
				<!-- <text style="font-size: 19px;font-weight: 700;">知识改变命运 实盘创作奇迹</text> -->
				<image src="../../../static/img/title-txt-01.png" style="width:598rpx;height:44rpx ;" mode=""></image>				
			</view>
		</view>
		<movable-area style="width: 100%;height: 80vh;z-index: 999;pointer-events: none;position: fixed;">
			<view class="" style="pointer-events: auto">
				<view class="" style="background-color:#E7253A ;">
					<view class="text-center" v-if="userInfo.level == 'Normal'">
						<image src="../../../static/img/segment-VIP.png" style="width: 280rpx;height:62rpx;" @click="toApplyVip" mode=""></image>						
						<!-- <view class="flex justify-center align-center">
							<view class="text-center" style="width: 22%;padding: 5rpx;border-radius: 10rpx 0 0 10rpx;background: linear-gradient(171deg, #EEEEEE, #F9F9F9, #A8A8A8);"
							 :data-id="1">
								<text style="color: #8B8B8B;">普通用户</text>
								<view style="position: relative;z-index: 2;" v-if="currentUserIndex == 1">
									<text class="block" style="width: 7px;height:7px;position: absolute;transform: rotate(45deg);top: -6rpx;left: 74rpx;background: #cecece;"></text>
								</view>
							</view>
							<view class="text-center" style="width: 22%;padding: 5rpx;border-radius:0 10rpx 10rpx 0;background: linear-gradient(168deg, #E4D5CE, #F7E1D8, #B98D7B)"
							 @click="toApplyVip">
								<text style="color: #AD693D;">VIP用户</text>
							</view>
						</view> -->
					</view>
					<!-- echats -->

					<view class="flex justify-center" style="margin-top: -15px;">
						<view class="qiun-charts" style="margin-top: 30rpx;">
							<!--#ifdef MP-ALIPAY -->
							<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" :width="cWidth*pixelRatio" :height="cHeight*pixelRatio"
							 :style="{'width':cWidth+'px','height':cHeight+'px'}" @touchstart="touchLineA" @touchmove="moveLineA" @touchend="touchEndLineA"></canvas>
							<!--#endif-->
							<!--#ifndef MP-ALIPAY -->
							<canvas canvas-id="canvasLineA" id="canvasLineA" class="charts" @touchstart="touchLineA" @touchmove="moveLineA"
							 @touchend="touchEndLineA"></canvas>
							<!--#endif-->
						</view>
					</view>

				</view>
				<view style="position: relative;">
					<image src="../../../static/img/bg-tuchu2.png" style="height: 48rpx;width: 100%;" mode=""></image>
					<text class="block" style="position: absolute;z-index: 999;top: 0;color:rgba(255,255,255,0.50);font-size: 24rpx;left: 50%;margin-left: -228rpx;">点击下方持仓股票可查看对应净值曲线范围</text>
				</view>
				<view class="bg-white fristShadow" style="margin: 30rpx;border-radius: 10px;">
					<view class="flex">
						<view>
							<view  style="width: 10rpx;height: 100%; border-radius: 12px 0 0 12px;">
							</view>
							<view style="position: relative;">
								<text class="block"  style="width: 10rpx;height:10rpx;position: absolute;transform: rotate(45deg);top: -92rpx;z-index: 99;left: 4rpx;"></text>
							</view>
						</view>
						<view class="flex shadow-lg" style="background-color: #fff;padding: 44rpx 60rpx;position: relative;" @click="viewDetails(-1)">
							<view class="" style="width: 370rpx;">
								<text class="block text-black" style="font-size: 40rpx;font-weight: 600;">{{latestData.stockCode ? latestData.stockCode : ''}}-{{latestData.stockName ? latestData.stockName : ''}}</text>
								<text class="block" style="color: #909090;font-size: 14px;">买入日期：{{latestData.buyTime ? latestData.buyTime.slice(0,10) : ''}}</text>
							</view>						
							<view style="position: absolute;top: 0;left: 10rpx;">
								<image src="../../../static/img/mark-new.png" style="width: 42rpx;height: 48rpx;" mode=""></image>
								<!-- <text style="position: absolute;top: 2rpx;left: 27rpx;color: #fff;font-size: 24rpx;">新</text> -->
							</view>
						</view>
						<view class="flex justify-center align-center" style="width: 100rpx;background-color: #F5F5F5;border-radius: 0px 12px 12px 0px;margin-left: 100rpx;"
						 @click="toStockDetail(-1,latestData.id)">
							<text class="cuIcon-right" style="color: #999;"></text>
						</view>
					</view>
				</view>

				<view class="" style="border-bottom: 1px solid #ddd;">
					<view class="text-center" style="padding: 15rpx;">
						<text style="font-size: 12px;color: #C8C7CC;">历史持仓情况</text>
					</view>
				</view>


				<mescroll-uni :fixed="true" top="980" :down="downOption" @down="downCallback" :up="upOption" @up="upCallback" @init="mescrollInit">
					<view class="flex" :class="index === currentIndex ? 'boxShadow' : ''"  style="margin: 30rpx;border-radius: 10px;border: 1px solid #f0f0f0;border-left: 0;" v-for="(item,index) in listData" :key="index">
						<view>
							<view :class="index === currentIndex ? 'bg-red' : 'bg-white'" style="width: 10rpx;height: 100%; border-radius: 12px 0 0 12px;">
							</view>
							<view style="position: relative;">
								<text class="block" :class="index === currentIndex ? 'bg-red' : 'bg-white'" style="width: 10rpx;height:10rpx;position: absolute;transform: rotate(45deg);top: -76rpx;z-index: 99;left: 6rpx;"></text>
							</view>
						</view>
						<view class="flex" style="background-color: #fff;padding: 30rpx 20rpx;" @click="viewDetail(index,item)">
							<view class="" style="width: 450rpx;">
								<text class="block" style="font-size: 36rpx;font-weight: 600;">{{item.stockCode ? item.stockCode : ''}}-{{item.stockName ? item.stockName : ''}}</text>
								<text class="block" style="color: #909090;font-size: 12px;">持仓期：{{item.buyTime ? item.buyTime.slice(0,10) : ''}}~{{item.sellTime ? item.sellTime.slice(0,10) : ''}}</text>
							</view>
							<view class="flex justify-center align-center" style="width: 110rpx;">
								<text style="font-size: 32rpx;color: #FA6400;font-weight: 600;">{{item.profitAndLoss ? item.profitAndLoss > 0 ? '+' + item.profitAndLoss+ '%' : item.profitAndLoss+ '%' : ''}}</text>
							</view>
						</view>
						<view class="flex justify-center align-center" style="width: 84rpx;background-color:#F5F5F5;border-radius: 0px 12px 12px 0px;"
						 @click="toStockDetail(index,item.id)">
							<text class="cuIcon-right" style="color: #999;"></text>
						</view>
					</view>
				</mescroll-uni>
			</view>
			<movable-view :x="x" :y="y" direction="vertical" @change="onChange" style="pointer-events: auto;position: absolute;z-index: 9999;left: 79%;top: 73%;">
				<view style="width: 160rpx;height: 115rpx;z-index: 2;" @click="toFunds">
					<view class="flex">
						<image src="../../../static/img/qiang.png" style="width: 160rpx;height: 115rpx;" mode=""></image>
					</view>
				</view>
			</movable-view>
		</movable-area>
	</view>
</template>

<script>
	import uCharts from '@/components/u-charts/u-charts.js';
	// import {isJSON} from '@/common/checker.js';
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	var _self;
	var canvaLineA = null;
	var lastMoveTime = null; //最后执行移动的时间戳
	export default {
		components: {
			MescrollUni,
		},
		data() {
			return {
				labelCount:0,
				aggregateData: {},
				x: 0,
				y: 0,
				userInfo: {},
				cWidth: '',
				cHeight: '',
				pixelRatio: 1,
				textarea: '',
				Interactive: '', //交互显示的数据
				currentUserIndex: 1,
				currentIndex: -1,
				isUpdate: false,
				UpdateConten: '',
				UpdateUrl: '',
				isScroll: false,
				topHeight: '',
				latestData: {},
				customer:{},
				listData: [],
				// 下拉刷新的常用配置
				downOption: {
					use: true, // 是否启用下拉刷新; 默认true
					auto: true, // 是否在初始化完毕之后自动执行下拉刷新的回调; 默认true
				},
				// 上拉加载的常用配置
				upOption: {
					use: true, // 是否启用上拉加载; 默认true
					auto: true, // 是否在初始化完毕之后自动执行上拉加载的回调; 默认true
					textNoMore: "~ 我是有底线的 ~",
					page: {
						num: 0, // 当前页码,默认0,回调之前会加1,即callback(page)会从1开始
						size: 10 // 每页数据的数量,默认10
					},
					noMoreSize: 0, // 配置列表的总数量要大于等于5条才显示'-- END --'的提示
					empty: {
						use: false, // 是否显示空布局
						//icon: "https://ss0.bdstatic.com/70cFvHSh_Q1YnxGkpoWK1HF6hhy/it/u=3241362042,118478454&fm=26&gp=0.jpg", // 图标路径
						tip: '~ 暂无数据 ~', // 提示
						//btnText: '点一下试试 >', // 按钮
						fixed: true, // 是否使用fixed定位,默认false; 配置fixed为true,以下的top和zIndex才生效
						top: "75%", // fixed定位的top值 (完整的单位值,如 "35%"; "300upx")
						zIndex: 99 // fixed定位z-index值
					}
				},
			};
		},
		mounted() {
			// console.log(this.CustomBar);
		},
		onPageScroll(e) { //nvue暂不支持滚动监听，可用bindingx代替

		},
		onReady() {
			// #ifdef APP-PLUS
			// #endif
		},
		onLoad() {
			_self = this;
			//#ifdef MP-ALIPAY
			uni.getSystemInfo({
				success: function(res) {
					if (res.pixelRatio > 1) {
						//正常这里给2就行，如果pixelRatio=3性能会降低一点
						//_self.pixelRatio =res.pixelRatio;
						_self.pixelRatio = 2;
					}
				}
			});
			//#endif
			// #ifdef MP-WEIXIN
			 this.topHeight = this.CustomBar
			// #endif	
			this.cWidth = uni.upx2px(700);
			this.cHeight = uni.upx2px(330);
			const value = uni.getStorageSync('accountInfo');
			if (!value) {
				uni.navigateTo({
					url: '../mycenter/login'
				});
			}
		},

	  onShow() {
		  //#ifdef APP-PLUS
		  	this.getTCloudConfigs();
			// this.goods = []// 先置空列表,显示加载进度
			// this.mescroll.resetUpScroll() // 再刷新列表数据
		  //#endif
		  const value = uni.getStorageSync('accountInfo');
		  if (!value) {		  	
			return
		  }else{
			  uni.showLoading({
			  	title: '加载中'
			  });			
			  this.GetStockProfitAndLoss(true);
			  this.getUserInfoData();
			  this.goods = []// 先置空列表,显示加载进度
			  this.mescroll.resetUpScroll() // 再刷新列表数据
		  }		
		},

		methods: {			
			getTimIngor(){
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.get('/StockSkyEyes/App/GetChatGroup').then(res => {
					uni.hideLoading();
					// console.log(res.data.result)
					if (res.data.result) {						
						uni.setStorageSync('groupID', res.data.result.chatGroupId);						
						uni.setStorageSync('userId', res.data.result.chatUserId);
						uni.setStorageSync('userSig', res.data.result.chatUserSig);						
						uni.setStorageSync('Level', res.data.result.chatLevel);						
						this.loginTim();					
					}					
				})				
			},
			// 未登录登录
			loginTim(){
				const isLogin = this.$store.state.isLogin;
				var self = this;	
				var userId = '';
				var userSig = '';			 					
				userId = uni.getStorageSync('userId');
				userSig = uni.getStorageSync('userSig');															
				// console.log('isLogin',isLogin)							
				if(isLogin == false){					
					let promise = this.tim.login({
						userID: userId,
						userSig: userSig
					});
					promise.then((item) => {
						//登录成功后 更新登录状态
						self.$store.commit("toggleIsLogin", true);
						//tim 返回的用户信息
						uni.setStorageSync('userTIMInfo', JSON.stringify(item.data))
					}).catch((err) => {
						console.warn('login error:', err); // 登录失败的相关信息
					});
				}
				
			},	
			onChange: function(e) {
			},
			getTCloudConfigs(){
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.get('/StockSkyEyes/App/GetTCloudConfigs').then(res => {
					// console.log(res);
					uni.hideLoading() ;
					if(res.data && res.data.status === 200){
						uni.setStorageSync('licenceURL', res.data.result.liveLicenseUrl );	
						uni.setStorageSync('licenceKey', res.data.result.liveLicenseKey);
						uni.setStorageSync('liveAppId', res.data.result.liveAppId);
							
					}
				})
				
			},
			GetStockProfitAndLoss(tpye) {
				uni.showLoading({
					title: '加载中...'
				});
				this.$http.get('/StockSkyEyes/App/GetStockProfitAndLoss').then(res => {
					// console.log(res);
					uni.hideLoading() ;
					if (res.data && res.data.status === 200) {
						const content = res.data.result;
						var chartsTemplate = {
							categories: [],
							series: []
						};
						var chartsSeries = {
							name: '',
							color: '#ffffff',
							data: []
						};
						for (let i = 0; i < content.length; i++) {
							//替换“-” 新拼接的时间格式
							let newFormatDate = content[i].date.replace(/\-/g, ".");
							newFormatDate = newFormatDate.slice(2, 10);
							chartsTemplate.categories.push(newFormatDate);
							chartsSeries.data.push(content[i].value);
						}
						const categoriesLength = chartsTemplate.categories.length ;
						if(categoriesLength % 5 == 0){
							this.labelCount = 5 ;
						}else if((categoriesLength - 1) % 4 == 0){
							this.labelCount = 4 ;
						}else{
							this.labelCount = 3 ;
						}
						chartsTemplate.series.push(chartsSeries);
						this.aggregateData = chartsTemplate;
						this.showLineA("canvasLineA", this.aggregateData,tpye);
					}
				})

			},
			/*下拉刷新的回调, 有三种处理方式: */
			downCallback(mescroll) {
				this.listData = [];
				//隐藏下拉
				mescroll.resetUpScroll()
				// mescroll.endErr()
			},
			/*上拉加载的回调*/
			upCallback(mescroll) {
				// 先清空列表,显示加载进度
				if (mescroll.num == 1) this.listData = []; //如果是第一页需手动制空列表
				//联网加载数据
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData) => {
					//联网成功的回调,隐藏下拉刷新和上拉加载的状态;
					mescroll.endSuccess(curPageData.length);
					//追加新数据
					this.listData = this.listData.concat(curPageData);
				}, () => {
					//联网失败的回调,隐藏下拉刷新的状态
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				var newData = [];
				this.latestData = {};				
				this.$http.get('/StockSkyEyes/App/GetStocks', {
					params: {
						offset: pageNum,
						limit: pageSize
					}
					/* 会加在url上 */
				}).then(res => {
					// console.log(res);
					if (res.data && res.data.status === 200) {
						this.upOption.noMoreSize = res.data.result.length;
						const stockData = res.data.result;
						for (let i = 0; i < stockData.length; i++) {
							if (stockData[i].isLatest) {
								this.latestData = stockData[i];
							} else {
								newData.push(stockData[i]) ;
							}
						}
					}
					successCallback && successCallback(newData);
				}).catch(err => {
					// console.log(err);
					errorCallback && errorCallback();
					uni.showToast({
						icon: 'none',
						title: err,
						duration: 2000
					});
				});
			},
			mescrollInit(mescroll) {
				this.mescroll = mescroll;
			},
		   getUserInfoData() {
				this.$http.get('/StockSkyEyes/App/GetSelfInfo').then(res => {
					uni.hideLoading();
					if (res.data && res.data.status === 200) {
						const userInfo = res.data.result;
						this.userInfo = userInfo;
						uni.setStorageSync('userInfo', userInfo);
						this.getTimIngor();
						if(res.data.result.level == 'VIP'){
							this.$http.get('/StockSkyEyes/App/GetKFInfo').then(res => {
								if(res.data.result){
									this.customer = res.data.result
									uni.setStorageSync('customer', res.data.result);									
								}
							})
						}
					}
				})
			},
			toApplyVip() {
				uni.navigateTo({
					url: './applyVip'
				})
			},
			showLineA(canvasId, chartData,animation) {
				canvaLineA = new uCharts({
					$this: _self,
					canvasId: canvasId,
					type: 'line',
					colors: ['#facc14', '#8543e0', '#8543e0', '#8543e0'],
					fontSize: 11,
					padding: [15, 15, 0, 15],
					legend: {
						show: false,
						padding: 5,
						lineHeight: 11,
						margin: 0,
						fontColor: '#Fff'
					},
					dataLabel: false,
					dataPointShape: true,
					background: '#e7253a',
					pixelRatio: _self.pixelRatio,
					categories: chartData.categories,
					series: chartData.series,
					animation: animation,
					xAxis: {
						type: 'grid',
						gridColor: 'rgba(255,255,255,0.15)',
						gridType: 'solid',
						dashLength: 8,
						disableGrid: true,
						fontColor: '#ffffff',
						calibration:true,
						gridEval:2,
						// textStyle: {
						//     color: '#a0a0a0', //更改坐标轴文字颜色
						//     fontSize: 12 //更改坐标轴文字大小
						// },
						labelCount:_self.labelCount
					},
					yAxis: {
						gridType: 'solid',
						gridColor: 'rgba(255,255,255,0.15)',
						dashLength: 8,
						disableGrid: false,						
						// splitNumber:2,
						data: [{
							fontColor: '#ffffff',
							format: (val) => {
								return val.toFixed(2)
							}
						}]
					},
					width: _self.cWidth * _self.pixelRatio,
					height: _self.cHeight * _self.pixelRatio,
					extra: {
						line: {
							type: 'straight',
							data: {
								fontColor: '#fff'
							}

						}
					}
				});

			},
			touchLineA(e) {
				lastMoveTime = Date.now();
			},
			moveLineA(e) {
				let currMoveTime = Date.now();
				let duration = currMoveTime - lastMoveTime;
				if (duration < Math.floor(1000 / 60)) return; //每秒60帧
				lastMoveTime = currMoveTime;
				let currIndex = canvaLineA.getCurrentDataIndex(e);
				if (currIndex > -1 && currIndex < canvaLineA.opts.categories.length) {
					let riqi = canvaLineA.opts.categories[currIndex];
					let leibie = canvaLineA.opts.series[0].name;
					let shuju = canvaLineA.opts.series[0].data[currIndex];
					this.Interactive = leibie + ':' + riqi + '-' + shuju + '元';
				}
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			touchEndLineA(e) {
				let currIndex = canvaLineA.getCurrentDataIndex(e);
				if (currIndex > -1 && currIndex < canvaLineA.opts.categories.length) {
					let riqi = canvaLineA.opts.categories[currIndex];
					let leibie = canvaLineA.opts.series[0].name;
					let shuju = canvaLineA.opts.series[0].data[currIndex];
					this.Interactive = leibie + ':' + riqi + '-' + shuju + '元';
				}
				canvaLineA.touchLegend(e);
				canvaLineA.showToolTip(e, {
					format: function(item, category) {
						return category + ' ' + item.name + ':' + item.data
					}
				});
			},
			toStockDetail(index, id) {
				this.currentIndex = index;
				uni.navigateTo({
					url: './stockDetail?id=' + id
				})
			},
			viewDetail(index, item) {
				let buyTime = item.buyTime.slice(2,10);
				let sellTime = item.sellTime.slice(2,10);
				buyTime = buyTime.replace(/\-/g, ".");
				sellTime = sellTime.replace(/\-/g, ".");
				this.currentIndex = index;
				this.viewStockDetail(buyTime, sellTime)
			},
			viewStockDetail(buyTime, sellTime) {
				//获取总数据
				const categories = this.aggregateData.categories;
				//获取总数据长度
				const categoriesLength = this.aggregateData.categories.length;
				var end_Index = categories.indexOf(sellTime);
				var newArrData = [];
				//拼接时用的第一个空数组
				var jointArrfirst = [];
				//拼接时用的第二个空数组
				var jointArrSecond = [];
				if(end_Index == 0){
				   const newSeries = {
				   	color: '#facc14',
					
				   };
				   newSeries.name = '';
				   newSeries.data = newArrData;
				   if (this.aggregateData.series.length > 1) {
				   	this.aggregateData.series[1] = newSeries;
				   } else {
				   	this.aggregateData.series.push(newSeries);
				   }
				   this.showLineA("canvasLineA", this.aggregateData,false);
				}else{
					for (let i = 0; i < end_Index -1; i++) {
						jointArrfirst.push(null) ;
					}
					//截取出来的值
					const trunData = this.aggregateData.series[0].data.slice(end_Index - 1, end_Index + 1);
					//第二个下标到最后的长度
					const residueLength = categoriesLength - end_Index;
					for (let i = 0; i < residueLength; i++) {
						jointArrSecond.push(null);
					}
					//新拼接的数组
					newArrData = jointArrfirst.concat(trunData).concat(jointArrSecond)
					const newSeries = {
						color: '#facc14'
					};
					newSeries.name = '';
					newSeries.data = newArrData;
					if (this.aggregateData.series.length > 1) {
						this.aggregateData.series[1] = newSeries;
					} else {
						this.aggregateData.series.push(newSeries);
					}
					this.showLineA("canvasLineA", this.aggregateData,false);
				}
			},
			tomyInfor(){
				uni.navigateTo({
					url:'../mycenter/index'
				})
			},
			viewDetails(index) {
				this.currentIndex = index;
				this.GetStockProfitAndLoss(false);
			},
			toFunds() {
				uni.navigateTo({
					url: './funds'
				})
			}
		}
	};
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}

	/*样式的width和height一定要与定义的cWidth和cHeight相对应*/
	.qiun-charts {
		width: 700upx;
		height: 330upx;
		background-color: #e7253a;
	}

	.charts {
		width: 700upx;
		height: 330upx;
		background-color: #e7253a;
	}
	.header-title{
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30rpx;
		color: #FFFFFF;
		height: 80rpx;
		line-height: 40px;
		font-size: 14px;
	}
</style>
