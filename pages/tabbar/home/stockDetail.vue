<template>
	<view class="content">
		<view style="position: fixed;top: 0;width: 100%;" class="bg-white">
			<view class="status_bar bg-white">
			         <!-- 这里是状态栏 -->
			</view>
			<view class="" style="position: absolute;" @click="back">
				<text class="cuIcon-back" style="font-size: 22px;line-height: 112rpx;margin-left: 40rpx;color: #E7253A;" ></text>
			</view>
			<view class="flex justify-center align-center bg-white" style="height: 112rpx;">
				<text style="font-size: 19px;font-weight: 700;">{{stockDetail.stockCode}}-{{stockDetail.stockName}}</text>
			</view>
		</view>
		<view class="flex justify-center" style="padding-top:190rpx">
			<text style="border-radius: 10px;background-color: #F0F0F0;padding: 5rpx 30rpx;color: #B0B0B0;font-size: 12px;" >发布时间: {{stockDetail.createdTime}}</text>
		</view>
		<view class="text-center" style="font-size: 14px;margin-top: 30rpx;">
			<text class="block paytime">买入时间:{{stockDetail.buyTime ? stockDetail.buyTime : ''}}   价格: {{stockDetail.buyPrice ? stockDetail.buyPrice :''}}</text>
			<text class="block paytime">卖出时间:{{stockDetail.modifiedTime ? stockDetail.modifiedTime : ''}} 价格: {{stockDetail.sellPrice ? stockDetail.sellPrice :''}}</text>
		</view>
		<view class="text-center" style="font-size: 64rpx;font-weight: 500;margin-top: 50rpx;">
			<text>盈亏 :</text>
			<text style="color: #fa6400;margin-left: 5rpx;">{{stockDetail.profitAndLoss ?'+' + stockDetail.profitAndLoss + '%' : ''}}</text>
		</view>
		<view class="flex" style="padding:5rpx 32rpx;margin-top: 54rpx;">
			<view class="text-center " style="border: 1px solid #e7253a;border-right: 0;width: 33.3%;padding: 5rpx;border-radius: 10rpx 0 0 10rpx;" :data-id="1" :class="currentIndex == 1 ? 'text-white bg-red' : 'colorRed'" @click="viewImg(1,'Buy')">
				买入截图
			</view>
			<view class="text-center " style="border: 1px solid #e7253a;width: 33.3%;padding: 5rpx;" :data-id="2" :class="currentIndex == 2 ? 'text-white bg-red' : 'colorRed'" @click="viewImg(2,'Sell')">
				卖出截图
			</view>
			<view class="text-center " style="border: 1px solid #e7253a;border-left: 0;width: 33.3%;padding: 5rpx;border-radius:0 10rpx 10rpx 0;" :data-id="3" :class="currentIndex == 3 ? 'text-white bg-red' : 'colorRed'" @click="viewImg(3,'Profit')">
				持仓盈利
			</view>
		</view>
		<view class="" style="padding:15rpx 32rpx;">
			<view class="text-center" style="height: 284rpx;background-color: #f9f9f9;line-height: 284rpx;">
				<text style="color: #B0B0B0;" v-if="imgList.length <= 0 ">暂时还没图片</text>
				<view v-else class="" v-for="(item,index) in imgList" :key="index">
					<image :src="item.fileUrl" style="height: 284rpx;width: 100%;" mode=""></image>
				</view>
			</view>
		</view>
		<view class="" style="background-color: #f9f9f9;margin-top: 10rpx;min-height: 500upx;">
			<view class="" style="padding:38rpx 60rpx;">
				<view class="flex align-center">
					<text class="block" style="width: 3px;background-color:#e7253a ;height: 14px;"></text>
					<text style="margin-left: 10rpx;font-size: 15px;line-height: 48rpx;"> 交易的技术依据:</text>
				</view>
				<view class="" style="color: #666;">
					<view class="block"  style="line-height: 48rpx;white-space:pre-wrap">{{stockDetail.remark1}}</view>
				</view>
			</view>
			<view class="" style="padding:38rpx 60rpx;">
				<view class="flex align-center">
					<text class="block" style="width: 3px;background-color:#e7253a ;height: 14px;"></text>
					<text style="margin-left: 10rpx;font-size: 15px;line-height: 48rpx;"> 买入决策依据:</text>
				</view>
				<view class="" style="color: #666;">
					<view class="block"  style="line-height: 48rpx;white-space:pre-wrap">{{stockDetail.remark2}}</view>
				</view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				currentIndex:1,
				id:'',
				stockDetail:{},
				imgList:[],
				imgBuy:[],
				imgSell:[],
				imgProfit:[],
			};
		},
		onReady() {
			
		},
		onLoad(option) {
			this.id = option.id ;
		},
	
		onShow() {
			this.getStockDetail();
		},
		
		methods: {
			back(){
				uni.navigateBack({
				    delta: 1
				});
			},
			viewImg(index,type){
				this.currentIndex = index ;
				if(type == 'Buy'){
					this.imgList = this.imgBuy ;
				}else if(type == 'Sell'){
					this.imgList = this.imgSell ;
				}else{
					this.imgList = this.imgProfit ;
				}
			},
			getStockDetail(){
				this.latestData = {};
				this.listData = [];
				this.imgBuy = [];
				this.imgSell = [];
				this.imgProfit = [];
				this.$http.get('/StockSkyEyes/App/GetStock',{
					params: {
						id:this.id
					}
				}).then(res => {
					console.log(res);
					if (res.data && res.data.status === 200) {
						this.stockDetail = res.data.result ;
						const imgList = this.stockDetail.images ;
						for(let i = 0 ; i < imgList.length ; i ++){
							if(imgList[i].type == 'Buy'){
								this.imgBuy.push(imgList[i])
							}else if(imgList[i].type == 'Sell'){
								this.imgSell.push(imgList[i])
							}else{
								this.imgProfit.push(imgList[i])
							}
						}
						if(this.imgBuy && this.imgBuy.length > 0){
							this.imgList = this.imgBuy ;
						}else if(this.imgSell && this.imgSell.length > 0){
							this.imgList = this.imgSell ;
						}else{
							this.imgList = this.imgProfit ;
						}
					} 
					
					
				})
			},
			toFundsState(){
				uni.navigateTo({
						url: './successFunds'
					})
			}
		}
	};
	
</script>

<style>
	.content{
		height: 100vh;
		background-color: #FFFFFF;
	}
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
