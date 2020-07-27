<template>
	<view class="content">
		<cu-custom bgColor="bg-white" :isBack="true" backColor="text-red">
				<block slot="content" >
					<text style="font-size: 19px;font-weight: 700;"></text>
				</block>
		</cu-custom>
		<view class="content-news">
			<view class="newTitle">
				{{newsDetail.title}}
			</view>
			<view class="" style="font-size: 22rpx;color: #B0B0B0;padding: 30rpx 0;border-bottom: 1px solid #eee;">
				<text>{{newsDetail.author}}</text>
				<text style="margin-left: 30rpx;">{{newsDetail.durationDisplay}}</text>
			</view>
			<view class="" style="margin-top: 30rpx;">
				<view style="font-size: 30rpx;line-height: 54rpx;color: #303030;" v-html="strings"></view>
			</view>
		</view>
	</view>
</template>

<script>
	export default {
		data() {
			return {
				newsDetail:{},
				id:'',
				strings:'',
			}
		},
		onLoad(option) {
			this.id = option.id ;
		},
		onShow() {
			this.getNewsDetail();
		},
		methods: {
			getNewsDetail(){
				this.$http.get('/StockSkyEyes/App/GetArticle', {
					params: {
						id:this.id 
					}
					/* 会加在url上 */
				}).then(res => {
					// console.log(res);
					if (res.data && res.data.status === 200) {
						this.newsDetail = res.data.result;
						if (res.data && res.data.status === 200) {
							if (res.data && res.data.status === 200) {
								var oneData = res.data.result
								// if(oneData.isUrlShow){
								// 	this.isShow = true;
								// }else{
									this.strings = oneData.content
									var regex = new RegExp('<img', 'gi')
									this.strings = this.strings.replace(regex, `<img style="max-width: 100%; height: auto"`)
									this.strings = this.strings.replace(new RegExp('<o:p', 'gi'), `<p style="dislay: none"`);
									this.isExist = false;
								// }
							}
						}
					}
				})
			}
			
		}
	}
</script>

<style>
	.content{
		background-color: #fff;
	}
	.content-news{
		padding: 10rpx 40rpx;
	}
	.newTitle{
		font-size: 36rpx;
		font-weight: 600;
	}
</style>
