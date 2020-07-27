<template>
	<view>
		<view class="">
			<view class="status_bar bg-red">
			         <!-- 这里是状态栏 -->
			</view>
			<view class="flex justify-center align-center text-white bg-red" style="height: 112rpx;">
				<!-- <text style="font-size: 19px;font-weight: 700;">第一时间把握中国股市全动向</text> -->
				<image src="../../../static/img/title-txt-02.png" style="width:598rpx;height:44rpx ;" mode=""></image>				
			</view>
		</view>
		
		<mescroll-uni :fixed="true" top="185" :down="downOption" @down="downCallback" :up="upOption"  @up="upCallback" @init="mescrollInit">
			<view class="bg-white" style="display: flex;padding: 30rpx;justify-content: space-between;border-top: 1px solid #eee;" v-for="(item, index) in listData"
			 :key="index" @click="viewDetail(item.id)">
				<view class="content" style="width: 432rpx;">
					<view class="text-black" style="font-size: 15px;">{{item.title}}</view>
					<view class="text-gray text-sm flex margin-tb-sm">
					
					</view>
					<view class="text-detail">
						<view style="font-size: 13px;">
							<view style="font-size: 13px;color: #B0B0B0;">
							<text>{{item.author}}</text> 
							<text style="margin-left: 30rpx;">{{item.durationDisplay.slice(0,10)}}</text> 
							</view>
							
						</view>
					</view>
				</view>
				<view>
					<image :src="item.coverMediaUrl" :lazy-load='true' style="width: 200rpx;height: 140rpx;"></image>
				</view>
			</view>
		</mescroll-uni>
	</view>
</template>

<script>
	import MescrollUni from "@/components/mescroll-uni/mescroll-uni.vue";
	export default {
		components: {
			MescrollUni,
		},
		data() {
			return {
				listData: [],
				
				downOption: {
					use: true, 
					auto: true,
				},
				
				upOption: {
					use: true, 
					auto: true,
					textNoMore: "~ 我是有底线的 ~",
					page: {
						num: 0, 
						size: 10 
					},
					noMoreSize: 0,
					empty: {
						use: true,
						tip: '~ 暂无数据 ~', 
						fixed: true, 
						top: "35%", 
						zIndex: 99, 
					}
				},
				catogery: [],
				bgImgs:[],
				fontColor:[],
			};
		},
		onLoad() {
		},
		onShow() {
		},
		methods: {
			viewDetail(id){
				uni.navigateTo({
					url: './newDetail?id='+id
				});
			},
			
			downCallback(mescroll) {
				this.listData = [];
				this.mescroll.resetUpScroll();
			},
			
			upCallback(mescroll) {
				uni.showLoading({
					title: '加载中'
				});
				
				if (mescroll.num == 1) this.listData = []; 
				
				this.getListDataFromNet(mescroll.num, mescroll.size, (curPageData) => {
					mescroll.endSuccess(curPageData.length);
					this.listData = this.listData.concat(curPageData);
					// console.log(mescroll.num);
				}, () => {
					mescroll.endErr();
				})
			},
			getListDataFromNet(pageNum, pageSize, successCallback, errorCallback) {
				this.$http.get('/StockSkyEyes/App/GetArticles', {
					params: {
						offset: 0,
						limit: 10,
					}
				}).then(res => {
					uni.hideLoading();
					// console.log(res);
					let newData = []
					if (res.data && res.data.status === 200) {
						this.upOption.noMoreSize = res.data.page.totalRows;
						newData = res.data.result;
					}
					successCallback && successCallback(newData);
				}).catch(err => {
					uni.hideLoading();
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
			getData() {
				uni.showLoading({
					title: '加载中'
				});
				uni.hideLoading();
			},

		}
	};
</script>

<style>
	.status_bar {
		height: var(--status-bar-height);
		width: 100%;
	}
</style>
