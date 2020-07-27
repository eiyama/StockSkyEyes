<template>
	<view class="">	
	<view @touchmove.stop.prevent="discard">	
		<view class="status_bar bg-white"></view>
		<view class="bg-white" :style="isScroll ? 'position: fixed' : ''" style="position: relative;top:0; width: 100%;z-index: 200;background-color: #FFFFFF;height: 112rpx;">
			<view class="bg-white">				
				<view class="flex justify-center align-center" style="height: 112rpx;" v-if="currentIndex == 1">
					<view class="openBack" @click="openBack">
						<image src="../../../static/img/back-break.png" style="width:9px;height: 15px;" mode=""></image>
					</view>
					<view class="text-center" style="border: 1px solid #505050;border-right: 0;width: 35.5%;padding: 5rpx;border-radius: 10rpx 0 0 10rpx;"
						:data-id="1"
						:class="currentIndex == 1 ? 'text-white chatBgColor' : 'bg-white'">
						<text>普通室</text>
						<view style="position: relative;" v-if="currentIndex == 1">
							<text
								class="block"
								:class="currentIndex == 1 ? 'text-white chatBgColor' : 'bg-white'"
								style="width: 7px;height:7px;position: absolute;transform: rotate(45deg);top: -3rpx;z-index: 999;left: 160rpx;"
							></text>
						</view>
					</view>
					<view class="text-center"
						style="border: 1px solid #E7C365;border-left: 0;width: 35.5%;padding: 5rpx;border-radius:0 10rpx 10rpx 0;"
						:data-id="2"
						:class="currentIndex == 2 ? 'text-white chatBgColorVip' : 'chatVipText'" @click="toApplyVip"
					>
						<text>VIP室</text>
						<view style="position: relative;" v-if="currentIndex == 2">
							<text
								class="block bg-red"
								:class="currentIndex == 2 ? 'text-white chatBgColorVip' : 'bg-white'"
								style="width: 7px;height:7px;position: absolute;transform: rotate(45deg);top: -3rpx;z-index: 999;left: 160rpx;"
							></text>
						</view>
					</view>
				</view>
				<view v-if="currentIndex == 2" class="flex align-center" style="height: 112rpx;">
					<view class="openBack" @click="openBack">
						<image src="../../../static/img/back-break.png" style="width:9px;height: 15px;" mode=""></image>
					</view>
					<view class="setCenter" style="font-weight: bold;font-size: 18px; color: #333333;justify-center">						
						VIP聊天室											
					</view>
				</view>
				<view class="foot flex" v-if="Level == 'VIP' && !isAnchor">
					<view class="liveBtn flex">
						<image style="margin-left: 30rpx;width: 24rpx;height: 22rpx;" src="../../../static/img/sheying.png" mode=""></image>
						<view style="color: #555555;font-size: 24rpx;margin-left: 14rpx;">
							查看直播
						</view>
					</view>
					
					<view class="flex liveBtn" @click="openLiveBtn">
						<image style="width:48rpx;height: 48rpx ;margin-right: 30rpx;" src="../../../static/img/icon-play.png" mode=""></image>	
					</view>
				</view>					
			</view>
		</view>
						
		<view class="content" @touchstart="hideDrawer"  >
			<view class="" style="position: fixed;z-index: 99;">
				<view class="" style="margin-top: 100rpx;" >					
					<image src="../../../static/img/icon-group-gray 2.png" style="width: 96rpx;height: 96rpx;margin-left: 30rpx;" mode="" v-if="currentIndex == 1"></image>
					<image src="../../../static/img/icon-group-yellow.png" style="width: 96rpx;height: 96rpx;margin-left: 30rpx;" mode="" v-if="currentIndex == 2"></image>
					<view class="" style="font-size: 11px;margin-left: 30px;color: #D2B56B;" v-if="currentIndex == 2">
						{{ memberNum }}人
					</view>
					<view class="" style="font-size: 11px;margin-left: 30px;color: #333;" v-if="currentIndex == 1">
						{{ memberNum }}人
					</view>
					<!-- <text style="font-size: 30rpx;margin-left: 30rpx;"></text> -->
				</view>
			</view>
			<scroll-view class="msg-list" :style="{top:msgTop,height:mesHeight}" scroll-y="true" :scroll-with-animation="scrollAnimation"
				:scroll-top="scrollTop"
				:scroll-into-view="scrollToView"
				:show-scrollbar = "false"
				@scrolltoupper="loadHistory"
				upper-threshold="50"
				@scroll="scrollClick"
			>
				<!-- 加载历史数据waitingUI -->
				<view class="loading" v-show="isHistoryLoading">
					<view class="spinner">
						<view class="rect1"></view>
						<view class="rect2"></view>
						<view class="rect3"></view>
						<view class="rect4"></view>
						<view class="rect5"></view>
					</view>
				</view>
				<!-- <view class="row" v-for="(row,index) in msgList" :key="index" :id="'msg'+row.msg.id"> -->
				<!-- 用户消息 -->
				<view class="row" v-for="(item, index) in msgList" :key="index" :id="item.id">
					<!-- 用户消息 -->
					<block>
						<!-- 自己发出的消息 -->
						<view class="my" v-if="item.flow == 'out'">
							<!-- 左-消息 -->
							<view class="left">
								<!-- 文字消息 -->
								<view v-if="item.type == 'TIMTextElem'" class="bubble"><rich-text :nodes="nodesFliter(item.payload.text)"></rich-text></view>
							</view>
							<!-- 右-头像 -->
							<view class="right"><image src="../../../static/img/default-avatar.png"></image></view>
						</view>
						<!-- 别人发出的消息 -->
						<view class="other" v-else>
							<!-- 左-头像 -->
							<view class="left"><image src="../../../static/img/default-avatar.png"></image></view>
							<!-- 右-用户名称-时间-消息 -->
							<view class="right">
								<view class="username">
									<view class="name">{{ '用户' + item.from }}</view>
									<view class="time">{{ timeFliter(item.time) }}</view>
								</view>
								<!-- 文字消息 -->
								<view v-if="item.type == 'TIMTextElem'" class="bubble"><rich-text :nodes="nodesFliter(item.payload.text)"></rich-text></view>
							</view>
						</view>
					</block>
				</view>
				<!-- </view> -->
			</scroll-view>
		</view>
		<!-- 抽屉栏 -->
		<!-- 抽屉栏 -->
		<view class="popup-layer-s" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- 表情 --> 
			<swiper class="emoji-swiper" :class="{hidden:hideEmoji}" indicator-dots="true" duration="150">
				<swiper-item v-for="(page,pid) in emojiList" :key="pid">
					<view v-for="(em,eid) in page" :key="eid" @tap="addEmoji(em)">
						<image mode="widthFix" :src="'/static/img/emoji/'+em.url"></image>
					</view>
				</swiper-item>
			</swiper>
			<!-- 更多功能 相册-拍照-红包 -->
			<view class="more-layer" :class="{hidden:hideMore}">
				<view class="list">
					<view class="box" @tap="chooseImage"><view class="icon tupian2"></view></view>
					<view class="box" @tap="camera"><view class="icon paizhao"></view></view>
					<view class="box" @tap="handRedEnvelopes"><view class="icon hongbao"></view></view>
				</view>
			</view>
		</view>
		<!-- 底部输入栏 -->
		<view class="input-box-s" :class="popupLayerClass" @touchmove.stop.prevent="discard">
			<!-- H5下不能录音，输入栏布局改动一下 -->
			<!-- #ifndef H5 -->
			<!-- <view class="voice">
				<view class="icon" :class="isVoice?'jianpan':'yuyin'" @tap="switchVoice"></view>
			</view> -->
			<!-- #endif -->
			<!-- #ifdef H5 -->
			<!-- <view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view> -->
			<!-- #endif -->
			<view class="textbox">
				<view class="voice-mode" :class="[isVoice?'':'hidden',recording?'recording':'']" @touchstart="voiceBegin" @touchmove.stop.prevent="voiceIng" @touchend="voiceEnd" @touchcancel="voiceCancel">{{voiceTis}}</view>
				<view class="text-mode"  :class="isVoice?'hidden':''">
					<view class="box ">
						<textarea  auto-height="true" cursor-spacing='10' v-model="textMsg" placeholder="来,想说点什么吗？" placeholder-style="font-size:13px" @blur="textareaBlur"  @focus="textareaFocus"/>
					</view>
					<view class="em" @tap="chooseEmoji">
						<image src="../../../static/img/mycenter/icon-emoj.png" style="width: 48rpx;height: 48rpx;" mode=""></image>
					</view>
				</view>
			</view>
			<!-- #ifndef H5 -->
			<!-- <view class="more" @tap="showMore">
				<view class="icon add"></view>
			</view> -->
			<!-- #endif -->
			<view class="send" :class="isVoice?'hidden':''" @tap="sendText">
				<!-- <view class="btn">发送</view> -->
				<image src="../../../static/img/mycenter/icon-send.png" style="width: 48rpx;height: 48rpx;margin-left: 10rpx;" mode=""></image>
			</view>
			<view class="send" :class="isVoice?'hidden':''" @click="openPushBtn" v-if="isAnchor">
				<image src="../../../static/img/icon-zhibo.png" style="width: 64rpx;height: 64rpx;" mode=""></image>
			</view>
		</view>
		<!-- 录音UI效果 -->
		<view class="record" :class="recording?'':'hidden'">
			<view class="ing" :class="willStop?'hidden':''"><view class="icon luyin2" ></view></view>
			<view class="cancel" :class="willStop?'':'hidden'"><view class="icon chehui" ></view></view>
			<view class="tis" :class="willStop?'change':''">{{recordTis}}</view>
		</view>
		<!-- 红包弹窗 -->
		<view class="windows" :class="windowsState">
			<!-- 遮罩层 -->
			<view class="mask" @touchmove.stop.prevent="discard" @tap="closeRedEnvelope"></view>
			<view class="layer" @touchmove.stop.prevent="discard">
				<view class="open-redenvelope">
					<view class="top">
						<view class="close-btn">
							<view class="icon close" @tap="closeRedEnvelope"></view>
						</view>
						<image src="/static/img/im/face/face_1.jpg"></image>
					</view>
					<view class="from">来自{{redenvelopeData.from}}</view>
					<view class="blessing">{{redenvelopeData.blessing}}</view>
					<view class="money">{{redenvelopeData.money}}</view>
					<view class="showDetails" @tap="toDetails(redenvelopeData.rid)">
						查看领取详情 <view class="icon to"></view>
					</view>
				</view>
			</view>
			
		</view>
		<!-- <view class="box" @click="openLiveBtn">
			<view class="">直播</view>
		</view>
		<view class="box" @click="openPushBtn" v-if="isKF">
			<view class="">主播开播</view>
		</view>	 -->
	</view>			
	</view>
	
</template>
<script>
import userList from '../../../commen/tim/user.js';
import { mapState } from 'vuex';
export default {
	data() {
		return {
			currentIndex: 1,
			isScroll: false,
			x: 0,
			y: 0,
			//文字消息
			textMsg: '',
			//消息列表
			isHistoryLoading: true,
			scrollAnimation: false,
			scrollTop: 0,
			scrollToView: '',
			msgList: [],
			msgImgList: [],
			myuid: 0,
			//录音相关参数
			// #ifndef H5
			//H5不能录音
			RECORDER: uni.getRecorderManager(),
			// #endif
			isVoice: false,
			voiceTis: '按住 说话',
			recordTis: '手指上滑 取消发送',
			recording: false,
			willStop: false,
			initPoint: { identifier: 0, Y: 0 },
			recordTimer: null,
			recordLength: 0,
			isShowLive:false,
			//播放语音相关参数
			AUDIO: uni.createInnerAudioContext(),
			playMsgid: null,
			VoiceTimer: null,
			// 抽屉参数
			popupLayerClass: '',
			// more参数
			hideMore: true,
			//表情定义
			hideEmoji: true,
			msgTop:'250upx',//200upx
			mesHeight:'74%',//78%
			emojiList: [
				[
					{ url: '100.gif', alt: '[微笑]' },
					{ url: '101.gif', alt: '[伤心]' },
					{ url: '102.gif', alt: '[美女]' },
					{ url: '103.gif', alt: '[发呆]' },
					{ url: '104.gif', alt: '[墨镜]' },
					{ url: '105.gif', alt: '[哭]' },
					{ url: '106.gif', alt: '[羞]' },
					{ url: '107.gif', alt: '[哑]' },
					{ url: '108.gif', alt: '[睡]' },
					{ url: '109.gif', alt: '[哭]' },
					{ url: '110.gif', alt: '[囧]' },
					{ url: '111.gif', alt: '[怒]' },
					{ url: '112.gif', alt: '[调皮]' },
					{ url: '113.gif', alt: '[笑]' },
					{ url: '114.gif', alt: '[惊讶]' },
					{ url: '115.gif', alt: '[难过]' },
					{ url: '116.gif', alt: '[酷]' },
					{ url: '117.gif', alt: '[汗]' },
					{ url: '118.gif', alt: '[抓狂]' },
					{ url: '119.gif', alt: '[吐]' },
					{ url: '120.gif', alt: '[笑]' },
					{ url: '121.gif', alt: '[快乐]' },
					{ url: '122.gif', alt: '[奇]' },
					{ url: '123.gif', alt: '[傲]' }
				],
				[
					{ url: '124.gif', alt: '[饿]' },
					{ url: '125.gif', alt: '[累]' },
					{ url: '126.gif', alt: '[吓]' },
					{ url: '127.gif', alt: '[汗]' },
					{ url: '128.gif', alt: '[高兴]' },
					{ url: '129.gif', alt: '[闲]' },
					{ url: '130.gif', alt: '[努力]' },
					{ url: '131.gif', alt: '[骂]' },
					{ url: '132.gif', alt: '[疑问]' },
					{ url: '133.gif', alt: '[秘密]' },
					{ url: '134.gif', alt: '[乱]' },
					{ url: '135.gif', alt: '[疯]' },
					{ url: '136.gif', alt: '[哀]' },
					{ url: '137.gif', alt: '[鬼]' },
					{ url: '138.gif', alt: '[打击]' },
					{ url: '139.gif', alt: '[bye]' },
					{ url: '140.gif', alt: '[汗]' },
					{ url: '141.gif', alt: '[抠]' },
					{ url: '142.gif', alt: '[鼓掌]' },
					{ url: '143.gif', alt: '[糟糕]' },
					{ url: '144.gif', alt: '[恶搞]' },
					{ url: '145.gif', alt: '[什么]' },
					{ url: '146.gif', alt: '[什么]' },
					{ url: '147.gif', alt: '[累]' }
				],
				[
					{ url: '148.gif', alt: '[看]' },
					{ url: '149.gif', alt: '[难过]' },
					{ url: '150.gif', alt: '[难过]' },
					{ url: '151.gif', alt: '[坏]' },
					{ url: '152.gif', alt: '[亲]' },
					{ url: '153.gif', alt: '[吓]' },
					{ url: '154.gif', alt: '[可怜]' },
					{ url: '155.gif', alt: '[刀]' },
					{ url: '156.gif', alt: '[水果]' },
					{ url: '157.gif', alt: '[酒]' },
					{ url: '158.gif', alt: '[篮球]' },
					{ url: '159.gif', alt: '[乒乓]' },
					{ url: '160.gif', alt: '[咖啡]' },
					{ url: '161.gif', alt: '[美食]' },
					{ url: '162.gif', alt: '[动物]' },
					{ url: '163.gif', alt: '[鲜花]' },
					{ url: '164.gif', alt: '[枯]' },
					{ url: '165.gif', alt: '[唇]' },
					{ url: '166.gif', alt: '[爱]' },
					{ url: '167.gif', alt: '[分手]' },
					{ url: '168.gif', alt: '[生日]' },
					{ url: '169.gif', alt: '[电]' },
					{ url: '170.gif', alt: '[炸弹]' },
					{ url: '171.gif', alt: '[刀子]' }
				],
				[
					{ url: '172.gif', alt: '[足球]' },
					{ url: '173.gif', alt: '[瓢虫]' },
					{ url: '174.gif', alt: '[翔]' },
					{ url: '175.gif', alt: '[月亮]' },
					{ url: '176.gif', alt: '[太阳]' },
					{ url: '177.gif', alt: '[礼物]' },
					{ url: '178.gif', alt: '[抱抱]' },
					{ url: '179.gif', alt: '[拇指]' },
					{ url: '180.gif', alt: '[贬低]' },
					{ url: '181.gif', alt: '[握手]' },
					{ url: '182.gif', alt: '[剪刀手]' },
					{ url: '183.gif', alt: '[抱拳]' },
					{ url: '184.gif', alt: '[勾引]' },
					{ url: '185.gif', alt: '[拳头]' },
					{ url: '186.gif', alt: '[小拇指]' },
					{ url: '187.gif', alt: '[拇指八]' },
					{ url: '188.gif', alt: '[食指]' },
					{ url: '189.gif', alt: '[ok]' },
					{ url: '190.gif', alt: '[情侣]' },
					{ url: '191.gif', alt: '[爱心]' },
					{ url: '192.gif', alt: '[蹦哒]' },
					{ url: '193.gif', alt: '[颤抖]' },
					{ url: '194.gif', alt: '[怄气]' },
					{ url: '195.gif', alt: '[跳舞]' }
				],
				[
					{ url: '196.gif', alt: '[发呆]' },
					{ url: '197.gif', alt: '[背着]' },
					{ url: '198.gif', alt: '[伸手]' },
					{ url: '199.gif', alt: '[耍帅]' },
					{ url: '200.png', alt: '[微笑]' },
					{ url: '201.png', alt: '[生病]' },
					{ url: '202.png', alt: '[哭泣]' },
					{ url: '203.png', alt: '[吐舌]' },
					{ url: '204.png', alt: '[迷糊]' },
					{ url: '205.png', alt: '[瞪眼]' },
					{ url: '206.png', alt: '[恐怖]' },
					{ url: '207.png', alt: '[忧愁]' },
					{ url: '208.png', alt: '[眨眉]' },
					{ url: '209.png', alt: '[闭眼]' },
					{ url: '210.png', alt: '[鄙视]' },
					{ url: '211.png', alt: '[阴暗]' },
					{ url: '212.png', alt: '[小鬼]' },
					{ url: '213.png', alt: '[礼物]' },
					{ url: '214.png', alt: '[拜佛]' },
					{ url: '215.png', alt: '[力量]' },
					{ url: '216.png', alt: '[金钱]' },
					{ url: '217.png', alt: '[蛋糕]' },
					{ url: '218.png', alt: '[彩带]' },
					{ url: '219.png', alt: '[礼物]' }
				]
			],
			//表情图片图床名称 ，由于我上传的第三方图床名称会有改变，所以有此数据来做对应，您实际应用中应该不需要
			onlineEmoji: {
				'100.gif': 'AbNQgA.gif',
				'101.gif': 'AbN3ut.gif',
				'102.gif': 'AbNM3d.gif',
				'103.gif': 'AbN8DP.gif',
				'104.gif': 'AbNljI.gif',
				'105.gif': 'AbNtUS.gif',
				'106.gif': 'AbNGHf.gif',
				'107.gif': 'AbNYE8.gif',
				'108.gif': 'AbNaCQ.gif',
				'109.gif': 'AbNN4g.gif',
				'110.gif': 'AbN0vn.gif',
				'111.gif': 'AbNd3j.gif',
				'112.gif': 'AbNsbV.gif',
				'113.gif': 'AbNwgs.gif',
				'114.gif': 'AbNrD0.gif',
				'115.gif': 'AbNDuq.gif',
				'116.gif': 'AbNg5F.gif',
				'117.gif': 'AbN6ET.gif',
				'118.gif': 'AbNcUU.gif',
				'119.gif': 'AbNRC4.gif',
				'120.gif': 'AbNhvR.gif',
				'121.gif': 'AbNf29.gif',
				'122.gif': 'AbNW8J.gif',
				'123.gif': 'AbNob6.gif',
				'124.gif': 'AbN5K1.gif',
				'125.gif': 'AbNHUO.gif',
				'126.gif': 'AbNIDx.gif',
				'127.gif': 'AbN7VK.gif',
				'128.gif': 'AbNb5D.gif',
				'129.gif': 'AbNX2d.gif',
				'130.gif': 'AbNLPe.gif',
				'131.gif': 'AbNjxA.gif',
				'132.gif': 'AbNO8H.gif',
				'133.gif': 'AbNxKI.gif',
				'134.gif': 'AbNzrt.gif',
				'135.gif': 'AbU9Vf.gif',
				'136.gif': 'AbUSqP.gif',
				'137.gif': 'AbUCa8.gif',
				'138.gif': 'AbUkGQ.gif',
				'139.gif': 'AbUFPg.gif',
				'140.gif': 'AbUPIS.gif',
				'141.gif': 'AbUZMn.gif',
				'142.gif': 'AbUExs.gif',
				'143.gif': 'AbUA2j.gif',
				'144.gif': 'AbUMIU.gif',
				'145.gif': 'AbUerq.gif',
				'146.gif': 'AbUKaT.gif',
				'147.gif': 'AbUmq0.gif',
				'148.gif': 'AbUuZV.gif',
				'149.gif': 'AbUliF.gif',
				'150.gif': 'AbU1G4.gif',
				'151.gif': 'AbU8z9.gif',
				'152.gif': 'AbU3RJ.gif',
				'153.gif': 'AbUYs1.gif',
				'154.gif': 'AbUJMR.gif',
				'155.gif': 'AbUadK.gif',
				'156.gif': 'AbUtqx.gif',
				'157.gif': 'AbUUZ6.gif',
				'158.gif': 'AbUBJe.gif',
				'159.gif': 'AbUdIO.gif',
				'160.gif': 'AbU0iD.gif',
				'161.gif': 'AbUrzd.gif',
				'162.gif': 'AbUDRH.gif',
				'163.gif': 'AbUyQA.gif',
				'164.gif': 'AbUWo8.gif',
				'165.gif': 'AbU6sI.gif',
				'166.gif': 'AbU2eP.gif',
				'167.gif': 'AbUcLt.gif',
				'168.gif': 'AbU4Jg.gif',
				'169.gif': 'AbURdf.gif',
				'170.gif': 'AbUhFS.gif',
				'171.gif': 'AbU5WQ.gif',
				'172.gif': 'AbULwV.gif',
				'173.gif': 'AbUIzj.gif',
				'174.gif': 'AbUTQs.gif',
				'175.gif': 'AbU7yn.gif',
				'176.gif': 'AbUqe0.gif',
				'177.gif': 'AbUHLq.gif',
				'178.gif': 'AbUOoT.gif',
				'179.gif': 'AbUvYF.gif',
				'180.gif': 'AbUjFU.gif',
				'181.gif': 'AbaSSJ.gif',
				'182.gif': 'AbUxW4.gif',
				'183.gif': 'AbaCO1.gif',
				'184.gif': 'Abapl9.gif',
				'185.gif': 'Aba9yR.gif',
				'186.gif': 'AbaFw6.gif',
				'187.gif': 'Abaiex.gif',
				'188.gif': 'AbakTK.gif',
				'189.gif': 'AbaZfe.png',
				'190.gif': 'AbaEFO.gif',
				'191.gif': 'AbaVYD.gif',
				'192.gif': 'AbamSH.gif',
				'193.gif': 'AbaKOI.gif',
				'194.gif': 'Abanld.gif',
				'195.gif': 'Abau6A.gif',
				'196.gif': 'AbaQmt.gif',
				'197.gif': 'Abal0P.gif',
				'198.gif': 'AbatpQ.gif',
				'199.gif': 'Aba1Tf.gif',
				'200.png': 'Aba8k8.png',
				'201.png': 'AbaGtS.png',
				'202.png': 'AbaJfg.png',
				'203.png': 'AbaNlj.png',
				'204.png': 'Abawmq.png',
				'205.png': 'AbaU6s.png',
				'206.png': 'AbaaXn.png',
				'207.png': 'Aba000.png',
				'208.png': 'AbarkT.png',
				'209.png': 'AbastU.png',
				'210.png': 'AbaB7V.png',
				'211.png': 'Abafn1.png',
				'212.png': 'Abacp4.png',
				'213.png': 'AbayhF.png',
				'214.png': 'Abag1J.png',
				'215.png': 'Aba2c9.png',
				'216.png': 'AbaRXR.png',
				'217.png': 'Aba476.png',
				'218.png': 'Abah0x.png',
				'219.png': 'Abdg58.png'
			},
			//红包相关参数
			windowsState: '',
			redenvelopeData: {
				rid: null, //红包ID
				from: null,
				face: null,
				blessing: null,
				money: null
			},
			grounpChat: {},
			groupID: '',
			memberNum: 0,
			appHeight:{
				"height": "480px"
			},
			isKF:false,
			userAddConversationList:[],
			openLive:false,
			Level:'',
			isAnchor:false,
		};
	},
	onPageScroll(e) {
		//nvue暂不支持滚动监听，可用bindingx代替
		// console.log(e);
		if (e.scrollTop > 0) {
			this.isScroll = true;
		} else {
			this.isScroll = false;
		}	
			// this.isScroll = false;
	},
	computed: {
		...mapState({
			groupMessageList: state => state.groupMessageList,			
			isLogin: state => state.isLogin,
			isSDKReady: state => state.isSDKReady,
			conversationList: state => state.conversationList,
			GroupList:state => state.GroupList,			
		})
	},
	watch: {
		groupMessageList(newVal, oldVal) {			
			this.msgList = newVal;					
			this.screenMsg(newVal, oldVal);		
			// console.log(this.msgList);
		},		
		// isSDKReady(val) {
		// 	//isSDKReady == true 请求会话列表
		// 	if (val) {
		// 		this.getConversationList()
		// 	}
		// },
		conversationList(val){
			this.getUserInfo(val)
		}
	},
	onLoad(option) {
		
		// this.isKF = uni.getStorageSync('userInfo').isKF;
		
		// 	this.$store.commit('createGrounpChat', uni.getStorageSync('groupID'));
		// 	this.getGroupList();
		// 	// this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		// 	this.groupID = this.$store.state.groupID;
		// 		console.log(this.groupID);
		// 	this.grounpChat = this.$store.state.grounpChat;
		// 	// //获取聊天对象的用户信息
		// 	this.getGroupInfor();
		// 	this.getMsgList();
			
		// //获取弹出软键盘高度
		// 		//#ifdef APP-PLUS
		// 			// uni.onKeyboardHeightChange(res => { 
		// 			// 	this.appHeight.height = 480 - res.height + "px";
		// 			// 	 // console.log(this.appHeight.height) 
		// 			// 	 })
		// 			uni.$on('pullLive', (data) => {
		// 				this.closeLive();
		// 			    // vm.title = data.title;  
		// 			    // vm.content = data.content;  
		// 			})
		// 			this.closeLive();
		// 			// if(isKF){
		// 			// 	this.closePush()
		// 			// }			
		// 			this.closePush()
		// 			uni.$on('pushLive', (data) => {
		// 				this.closePush()
		// 			    // vm.title = data.title;  
		// 			    // vm.content = data.content;  
		// 			})						 
		// 		// #endif
		// //语音自然播放结束
		// this.AUDIO.onEnded((res)=>{
		// 	this.playMsgid=null;
		// });
		// // #ifndef H5
		// //录音开始事件
		// this.RECORDER.onStart((e)=>{
		// 	this.recordBegin(e);
		// })
		// //录音结束事件
		// this.RECORDER.onStop((e)=>{
		// 	this.recordEnd(e);
		// })
		// // #endif
		// #ifdef APP-PLUS
			this.closeLive();		
			this.closePush();											 
		// #endif
	},
	onShow() {
		// const subNvue=uni.getSubNVueById('pullLive');
		// subNvue.hide();		
		//获取弹出软键盘高度
		// #ifdef APP-PLUS
			uni.$on('pullLive', (data) => {
				this.closeLive();					    
			})
			uni.$on('isHiddenLive',(data)=>{
				if(data.hiddenLive){
					this.closeLive();
					this.closePush()
				}
			})	
			uni.$on('pushLive', (data) => {
				this.closePush() 
			})						 
		// #endif
		this.$store.commit('createGrounpChat', uni.getStorageSync('groupID'));						
		const userInfo = uni.getStorageSync('userInfo');		
		const isKF = userInfo.isKF; 
		this.isAnchor =  userInfo.isAnchor
		var Level = uni.getStorageSync('Level');
		this.Level = Level;
		if(this.isAnchor || this.Level == 'Normal'){
			this.msgTop = '200rpx';
			this.mesHeight = '78%';
		}
		this.scrollTop = 99999999;
		this.isHistoryLoading = false;
		// console.log(Level);
		if (Level == 'Normal') {
			this.currentIndex = 1;
		} else {
			this.currentIndex = 2;
		}
		// this.getConversationList();	
		//获取弹出软键盘高度
		this.isKF = uni.getStorageSync('userInfo').isKF;				
		this.getGroupList();
		// this.userInfo = JSON.parse(uni.getStorageSync('userInfo'))
		this.groupID = this.$store.state.groupID;
		
		this.grounpChat = this.$store.state.grounpChat;
		
		// if(uni.getStorageSync('hiddenLive')){
		// 	uni.setStorageSync('hiddenLive',false);
		// 	uni.$emit('closeAll',{});
			
		// }
		 //获取聊天对象的用户信息
		this.getGroupInfor();
		this.getMsgList();			
					
		// uni.onKeyboardHeightChange(res => { console.log(res.height) })				
	},
	onUnload(){
		// uni.$off('openPush');
		// uni.$off('pullLive');
		
	},
	onHide(){
		this.textMsg = '';
	},
	methods: {	
		openLiveBtn(){			
			this.$http.get('/StockSkyEyes/App/QueryLiveRooms?online=true').then(res => {
				uni.hideLoading() ;
				if(res.data.result.length > 0 && res.data.status === 200){
					// const pushUrl = res.data.result.pushUrl;
					const serialNo = res.data.result[0].serialNo;
					uni.hideLoading() ;
					this.$http.get('/StockSkyEyes/App/GetLiveRoomUrl?serialNo=' + serialNo).then(res => {									
						if(res.data.status === 200){
							const playUrl = res.data.result.playUrl
							uni.$emit('pullUrl', {
								playUrl:playUrl
							});
							const subNvue=uni.getSubNVueById('pullLive');
							subNvue.show();	
							uni.$emit('isHiddenLive',{hiddenLive:false});
						}					
					})	
					this.mesHeight = '50%';
					this.msgTop = '628rpx';								
					this.scrollTop = 9999999;	
					this.isShowLive = true;
				}else{
					uni.showModal({					    
					    content: '抱歉，暂时没有主播开播',
						showCancel:false,
						confirmText:'我知道了',
					    success: function (res) {
					    }
					});
				}
			})				
			this.hideDrawer();
		},	
			
		// pushLiveBtn(){
		// 	uni.$emit('pushLiveOpen', (data) => {})
		// },	
			
		closeLive(){	
			if(this.isAnchor || this.Level == 'Normal'){
				this.msgTop = '150rpx';
				this.mesHeight = '80%';
			}else{
				this.mesHeight = '74%';
				this.msgTop = '260rpx';
			}			
			const subNvue=uni.getSubNVueById('pullLive');		
			subNvue.hide()  // 隐藏			
			this.isShowLive = false;
		},	
					
		openPushBtn(){
			
			this.isShowLive = true;
			this.$http.post('/StockSkyEyes/App/CreateLiveRoom').then(res => {
				uni.hideLoading() ;
				if(res.data && res.data.status === 200){
					const pushUrl = res.data.result.pushUrl;					
					uni.$emit('openPush', {					    
						pushUrl:pushUrl
					});
				}
			})			
			const subNvue=uni.getSubNVueById('popup');   //获取 
			subNvue.show()  // 显示	
			this.hideDrawer();
			uni.$emit('isHiddenLive',{hiddenLive:false});
			this.mesHeight = '50%';
			this.msgTop = '628rpx';			
		},
		openBack(){
			uni.navigateBack();
		},
		closePush(){
			if(this.isAnchor || this.Level == 'Normal'){
				this.msgTop = '150rpx';
				this.mesHeight = '80%';
			}else{
				this.mesHeight = '74%';
				this.msgTop = '260rpx';
			}
			this.isShowLive = false;
			 const subNvue=uni.getSubNVueById('popup');
			 subNvue.hide()  // 隐藏
		},	
		
		toliveShow(){
			uni.navigateTo({
				url: './liveshow/liveshow'
			})
		},
		
		topullShow(){
			uni.navigateTo({
				url: './liveshow/pull'
			})
		},		
		toscreenShow(){
			uni.navigateTo({
				url: './liveshow/screen'
			})
		},
		//根据消息列表请求聊天对象的用户信息 并完成数据拼接
		getUserInfo(conversationList) {
			 this.userAddConversationList = []
			conversationList.forEach(item => {
				let obj = {}
				obj.conversation = item
				userList.forEach(item1 => {
					if (item.toAccount == item1.userId) {
						obj.user = item1
					}
				})
				this.userAddConversationList.push(JSON.parse(JSON.stringify(obj)));			
			})
			// console.log( 'userAddConversationList', this.userAddConversationList)
		},
		// //获取消息列表
		// getConversationList() {
		// 	// 拉取会话列表
		// 	let promise = this.tim.getConversationList();
		// 	promise.then((res) => {
		// 		let conversationList = res.data.conversationList; // 会话列表，用该列表覆盖原有的会话列表
		// 		if (conversationList.length) {
		// 			//将返回的会话列表拼接上 用户的基本资料  
		// 			//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
		// 			this.$store.commit("updateConversationList", conversationList);
		// 		}
		
		// 	}).catch((err) => {
		// 		console.warn('getConversationList error:', err); // 获取会话列表失败的相关信息
		// 	});
		// },
		toApplyVip() {
			uni.navigateTo({
				url: '../home/applyVip'
			})
		},
		//聊天的节点加上外层的div
		scrollClick(e) {			
				// if(e.detail.deltaY < 0 && this.isShowLive){
				// 	this.mesHeight = '50%'
				// }
				
			// console.log('eeeee',e);
		},
		nodesFliter(str) {
			let nodeStr = '<div style="align-items: center;word-wrap:break-word;">' + str + '</div>';
			return nodeStr;
		},
		timeFliter(timer) {
			let timeData = new Date(timer * 1000);
			let str = this.$commen.dateTimeFliter(timeData);
			return str;
		},
		getGroupInfor() {
			// 若默认拉取的字段不满足需求，可以参考下述代码，拉取额外的资料字段。
			// let promise = this.tim.getGroupList({
			//    groupProfileFilter: [this.groupID],
			// });
			// promise.then(function(imResponse) {
			//   console.log('im:', imResponse.data.groupList); // 群组列表
			// }).catch(function(imError) {
			//   console.warn('getGroupList error:', imError); // 获取群组列表失败的相关信息
			// });
			var self = this;
			let promise = this.tim.getGroupProfile({ groupID: this.groupID, groupCustomFieldFilter: ['key1', 'key2'] });
			promise.then(function(imResponse) {
					// console.log('im', imResponse.data.group);
					self.memberNum = imResponse.data.group.memberNum;
				})
				.catch(function(imError) {
					// console.warn('getGroupProfile error:', imError); // 获取群详细资料失败的相关信息
				});
		},
		getGroupList() {
			// 拉取群会话列表
			let promise = this.tim.getGroupList();
			promise.then(imResponse => {
					// console.log(imResponse.data.groupList); // 群组列表
					let getGroupList = imResponse.data.groupList;
					this.groupList = getGroupList;
					if (getGroupList.length) {
						//将返回的会话列表拼接上 用户的基本资料
						//说明：如果已经将用户信息 提交到tim服务端了 就不需要再次拼接
						this.$store.commit('updategetGroupList', getGroupList);
					}
				})
				.catch(function(imError) {
					console.warn('getGroupList error:', imError); // 获取群组列表失败的相关信息
				});
		},	
		// 接受消息(定位消息)
		screenMsg(newVal, oldVal) {				
			// console.log('newVal',newVal);
			// console.log('oldVal',oldVal);			
			// 遍历用时间戳生成一个在线ID 插进去
			newVal.forEach(item => {
				var timestamp = new Date().getTime();
				var tiem_s = 'G' + timestamp;
				if (item.id && item.id.indexOf('G') > -1) {
				} else {
					item.id = tiem_s;
				}
			});
			if(newVal && oldVal){				
				if (newVal[0] && oldVal[0] && newVal[0].ID && oldVal[0].ID) {				
					if (newVal[0].ID != oldVal[0].ID && newVal.length >= this.count) {
						this.$nextTick(() => {
							this.scrollToView = newVal[newVal.length - 1].id;
						
						});
					} else {
						this.$nextTick(() => {
							this.scrollToView = newVal[newVal.length - 1].id;						
						});
					}
				}				
			} else {
				this.$nextTick(() => {
					this.scrollToView = newVal[newVal.length - 1].id;
					this.isHistoryLoading = false;		
				});
			}												
		},
		
		//触发滑动到顶部(加载历史信息记录)
		loadHistory(e) {
			// console.log('触发滑动到顶部');			
			this.isHistoryLoading = true;
			// 更多消息列表
			let conversationID = this.grounpChat.conversationID;			
			let promise = this.tim.getMessageList({ conversationID: conversationID, nextReqMessageID: this.nextReqMessageID, count: this.count });
			promise.then(res => {
				// console.log(res)
				this.$store.commit('unshiftGroupMessageList', res.data.messageList);				  
				this.nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
				this.isCompleted = res.data.isCompleted;
				var _messageList = res.data.messageList;
				if (_messageList && _messageList.length) {
					_messageList.forEach(item => {
						var timestamp = new Date().getTime();
						var tiem_s = 'G' + timestamp + Math.ceil(Math.random() * 100);
						if (item.id && item.id.indexOf('G') > -1) {
						} else {
							item.id = tiem_s;
						}
					});	
			    }
				this.$nextTick(function() {
					if (_messageList && _messageList.length) {
						this.scrollToView = _messageList[_messageList.length - 1].id;
					}
				});							
			});	
			this.isHistoryLoading = false;
		},
		// 发送文字消息
		sendText() {
			// this.hideDrawer();//隐藏抽屉
			if (!this.textMsg) {
				return;
			}
			let content = this.replaceEmoji(this.textMsg);
			let msg = { text: content };
			this.sendMsg(msg, 'text');
			this.textMsg = ''; //清空输入框
		},
		// 加载初始页面消息
		getMsgList() {
			
			let conversationID = this.grounpChat.conversationID;					
			let promise = this.tim.getMessageList({ conversationID: conversationID, count: this.count });
			promise.then(res => {				
				this.$store.commit('pushGroupMessageList', res.data.messageList);
				// console.log('触发了',res.data.messageList);			
				this.isCompleted = res.data.isCompleted;
				var messageList_s = res.data.messageList;
				this.nextReqMessageID = res.data.nextReqMessageID; // 用于续拉，分页续拉时需传入该字段。
				//遍历用时间戳生成一个在线ID 插进去
				messageList_s.forEach(item => {
					var timestamp = new Date().getTime();
					var tiem_s = 'G' + timestamp + Math.ceil(Math.random() * 100);
					if (item.id && item.id.indexOf('G') > -1) {
					} else {
						item.id = tiem_s;
					}
				});
				this.$nextTick(function() {
					if (messageList_s.length > 0) {
						this.scrollToView = messageList_s[messageList_s.length - 1].id;
					}
				});
				// console.log(this.scrollToView)
				// console.log('res.data.messageList',res.data.messageList)
			});		
			this.$nextTick(function() {				
				//进入页面滚动到底部
				this.scrollTop = 9999999;
				this.$nextTick(function() {
					this.scrollAnimation = true;
				});
			});
			// if(this.isAnchor || this.Level == 'Normal'){
			// 	this.mesHeight = '78%';
			// 	this.msgTop = '180rpx';
			// }else{
			// 	this.mesHeight = "74%";
			// }
			
		},
		
		//处理图片尺寸，如果不处理宽高，新进入页面加载图片时候会闪
		setPicSize(content) {
			// 让图片最长边等于设置的最大长度，短边等比例缩小，图片控件真实改变，区别于aspectFit方式。
			let maxW = uni.upx2px(350); //350是定义消息图片最大宽度
			let maxH = uni.upx2px(350); //350是定义消息图片最大高度
			if (content.w > maxW || content.h > maxH) {
				let scale = content.w / content.h;
				content.w = scale > 1 ? maxW : maxH * scale;
				content.h = scale > 1 ? maxW / scale : maxH;
			}
			return content;
		},

		//更多功能(点击+弹出)
		showMore() {
			this.isVoice = false;
			this.hideEmoji = true;
			if (this.hideMore) {
				this.hideMore = false;
				this.openDrawer();
			} else {
				this.hideDrawer();
			}
		},
		// 打开抽屉
		openDrawer() {
			this.popupLayerClass = 'showLayer';
		},
		// 隐藏抽屉
		hideDrawer() {
			this.popupLayerClass = '';
			setTimeout(() => {
				this.hideMore = true;
				this.hideEmoji = true;
			}, 150);
			// if(this.isAnchor || this.Level == 'Normal'){				
			// 	this.mesHeight = '80%';
			// }else{
			// 	this.mesHeight = "74%";
			// }
			// this.scrollTop = 9999999;
		},
		// 选择图片发送
		chooseImage() {
			this.getImage('album');
		},
		//拍照发送
		camera() {
			this.getImage('camera');
		},
		//发红包
		handRedEnvelopes() {
			uni.navigateTo({
				url: 'HM-hand/HM-hand'
			});
			this.hideDrawer();
		},
		//选照片 or 拍照
		getImage(type) {
			this.hideDrawer();
			uni.chooseImage({
				sourceType: [type],
				sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
				success: res => {
					for (let i = 0; i < res.tempFilePaths.length; i++) {
						uni.getImageInfo({
							src: res.tempFilePaths[i],
							success: image => {
								let msg = { url: res.tempFilePaths[i], w: image.width, h: image.height };
								// this.sendMsg(msg, 'img');
								let message = this.tim.createImageMessage({
								  to: this.groupID,
								  conversationType: TIM.TYPES.CONV_C2C,
								  // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
								  // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
								  // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
								  payload: {
								    file: msg ,
								  },
								  onProgress: function(event) { console.log('file uploading:', event) }
								});
								
								// 2. 发送消息
								let promise = this.tim.sendMessage(message);
								promise.then(function(imResponse) {
								  // 发送成功
								  // console.log(imResponse);
								}).catch(function(imError) {
								  // 发送失败
								  console.warn('sendMessage error:', imError);
								});
							}
						});
					}
				}
			});
		},
		// 选择表情
		chooseEmoji() {
			this.hideMore = true;		
			if (this.hideEmoji) {
				this.hideEmoji = false;
				this.openDrawer();
			} else {
				this.hideDrawer();
			}
			this.mesHeight = "50%";
			this.scrollTop = 99999999;
		},
		//添加表情
		addEmoji(em) {
			this.textMsg += em.alt;
		},

		//获取焦点，如果不是选表情ing,则关闭抽屉
		textareaFocus(event) {
			// console.log(event.detail.height);			
			this.hideMore = false;
			if (this.popupLayerClass == 'showLayer' && this.hideMore == false) {
				this.hideDrawer();
			}					
			this.$nextTick(function() {
				//进入页面滚动到底部
				this.scrollTop = 99999999;
				this.$nextTick(function() {
					this.scrollAnimation = true;
				});
			});
			if(this.isShowLive){
				this.mesHeight = '20%'
			}else{
				this.mesHeight = "60%";
			}
			
			// this.msgTop = '260rpx';
			this.scrollTop = 99999999;
		},
		textareaBlur(){	
			if(this.isShowLive){
				this.mesHeight = '50%'
			}else{
				if(this.isAnchor || this.Level == 'Normal'){
					this.mesHeight = '78%';
					this.msgTop = '180rpx';
				}else{
					this.mesHeight = "74%";			
				}	
			}				
			this.$nextTick(function() {
				//进入页面滚动到底部
				this.scrollTop = 99999999;
				this.$nextTick(function() {
					this.scrollAnimation = true;
				});
			});
		},
		// 发送文字消息
		// 发送消息
		sendMsg(content, type) {		
			let message = this.tim.createTextMessage({
				to: this.groupID,
				conversationType: 'GROUP',
				payload: {
					text: content.text
				}
			});
			this.$store.commit('pushGroupMessageList', message);
			// console.log('content',content);
			let pomise = this.tim.sendMessage(message);
			pomise.then(res => {
				this.$nextTick(() => {
					// 滚动到底
					this.scrollToView = res.data.message.id;
				});
			});
		},
		//替换表情符号为图片
		replaceEmoji(str) {
			let replacedStr = str.replace(/\[([^(\]|\[)]*)\]/g, (item, index) => {
				// console.log('item: ' + item);
				for (let i = 0; i < this.emojiList.length; i++) {
					let row = this.emojiList[i];
					for (let j = 0; j < row.length; j++) {
						let EM = row[j];
						if (EM.alt == item) {
							//在线表情路径，图文混排必须使用网络路径，请上传一份表情到你的服务器后再替换此路径
							//比如你上传服务器后，你的100.gif路径为https://www.xxx.com/emoji/100.gif 则替换onlinePath填写为https://www.xxx.com/emoji/
							let onlinePath = 'https://s2.ax1x.com/2019/04/12/';
							let imgstr = '<img src="' + onlinePath + this.onlineEmoji[EM.url] + '">';
							console.log('imgstr: ' + imgstr);
							return imgstr;
						}
					}
				}
			});
			return '<div style="display: flex;align-items: center;word-wrap:break-word;">' + replacedStr + '</div>';
		},

		// 添加文字消息到列表
		addTextMsg(msg) {
			this.msgList.push(msg);
		},
		// 添加语音消息到列表
		addVoiceMsg(msg) {
			this.msgList.push(msg);
		},
		// 添加图片消息到列表
		addImgMsg(msg) {
			msg.msg.content = this.setPicSize(msg.msg.content);
			this.msgImgList.push(msg.msg.content.url);
			this.msgList.push(msg);
		},
		addRedEnvelopeMsg(msg) {
			this.msgList.push(msg);
		},
		// 添加系统文字消息到列表
		addSystemTextMsg(msg) {
			this.msgList.push(msg);
		},
		// 添加系统红包消息到列表
		addSystemRedEnvelopeMsg(msg) {
			this.msgList.push(msg);
		},
		// 打开红包
		openRedEnvelope(msg, index) {
			let rid = msg.content.rid;
			uni.showLoading({
				title: '加载中...'
			});
			//模拟请求服务器效果
			setTimeout(() => {
				//加载数据
				if (rid == 0) {
					this.redenvelopeData = {
						rid: 0, //红包ID
						from: '大黑哥',
						face: '/static/img/im/face/face.jpg',
						blessing: '恭喜发财，大吉大利',
						money: '已领完'
					};
				} else {
					this.redenvelopeData = {
						rid: 1, //红包ID
						from: '售后客服008',
						face: '/static/img/im/face/face_2.jpg',
						blessing: '恭喜发财',
						money: '0.01'
					};
					if (!msg.content.isReceived) {
						// {type:"system",msg:{id:8,type:"redEnvelope",content:{text:"你领取了售后客服008的红包"}}},
						this.sendSystemMsg({ text: '你领取了' + (msg.userinfo.uid == this.myuid ? '自己' : msg.userinfo.username) + '的红包' }, 'redEnvelope');
						console.log('this.msgList[index]: ' + JSON.stringify(this.msgList[index]));
						this.msgList[index].msg.content.isReceived = true;
					}
				}
				uni.hideLoading();
				this.windowsState = 'show';
			}, 200);
		},
		// 关闭红包弹窗
		closeRedEnvelope() {
			this.windowsState = 'hide';
			setTimeout(() => {
				this.windowsState = '';
			}, 200);
		},
		sendSystemMsg(content, type) {
			let lastid = this.msgList[this.msgList.length - 1].msg.id;
			lastid++;
			let row = { type: 'system', msg: { id: lastid, type: type, content: content } };
			this.screenMsg(row);
		},
		//领取详情
		toDetails(rid) {
			uni.navigateTo({
				url: 'HM-details/HM-details?rid=' + rid
			});
		},
		// 预览图片
		showPic(msg) {
			uni.previewImage({
				indicator: 'none',
				current: msg.content.url,
				urls: this.msgImgList
			});
		},
		// 播放语音
		playVoice(msg) {
			this.playMsgid = msg.id;
			this.AUDIO.src = msg.content.url;
			this.$nextTick(function() {
				this.AUDIO.play();
			});
		},
		// 录音开始
		voiceBegin(e) {
			if (e.touches.length > 1) {
				return;
			}
			this.initPoint.Y = e.touches[0].clientY;
			this.initPoint.identifier = e.touches[0].identifier;
			this.RECORDER.start({ 			
				  duration: 60000, // 录音的时长，单位 ms，最大值 600000（10 分钟）
				  sampleRate: 44100, // 采样率
				  numberOfChannels: 1, // 录音通道数
				  encodeBitRate: 192000, // 编码码率
				  format: 'aac' // 音频格式，选择此格式创建的音频消息，可以在即时通信 IM 全平台（Android、iOS、微信小程序和Web）互通
				}); //录音开始,
		},
		//录音开始UI效果
		recordBegin(e) {
			this.recording = true;
			this.voiceTis = '松开 结束';
			this.recordLength = 0;
			this.recordTimer = setInterval(() => {
				this.recordLength++;
			}, 1000);
		},
		// 录音被打断
		voiceCancel() {
			this.recording = false;
			this.voiceTis = '按住 说话';
			this.recordTis = '手指上滑 取消发送';
			this.willStop = true; //不发送录音
			this.RECORDER.stop(); //录音结束
		},
		// 录音中(判断是否触发上滑取消发送)
		voiceIng(e) {
			if (!this.recording) {
				return;
			}
			let touche = e.touches[0];
			//上滑一个导航栏的高度触发上滑取消发送
			if (this.initPoint.Y - touche.clientY >= uni.upx2px(100)) {
				this.willStop = true;
				this.recordTis = '松开手指 取消发送';
			} else {
				this.willStop = false;
				this.recordTis = '手指上滑 取消发送';
			}
		},
		// 结束录音
		voiceEnd(e) {
			if (!this.recording) {
				return;
			}
			this.recording = false;
			this.voiceTis = '按住 说话';
			this.recordTis = '手指上滑 取消发送';
			this.RECORDER.stop(); //录音结束
		},
		//录音结束(回调文件)
		recordEnd(e) {
			// clearInterval(this.recordTimer);
			// if (!this.willStop) {
			// 	console.log('e: ' + JSON.stringify(e));
			// 	let msg = {
			// 		length: 0,
			// 		url: e.tempFilePath
			// 	};
			// 	let min = parseInt(this.recordLength / 60);
			// 	let sec = this.recordLength % 60;
			// 	min = min < 10 ? '0' + min : min;
			// 	sec = sec < 10 ? '0' + sec : sec;
			// 	msg.length = min + ':' + sec;
			// 	// this.sendMsg(msg, 'voice');	
			// 	console.log('e',e)
			// 	  // 4. 创建消息实例，接口返回的实例可以上屏
			// 	  const message = this.tim.createAudioMessage({
			// 	   to: this.groupID,
			// 	   conversationType: 'GROUP',
			// 	    // 消息优先级，用于群聊（v2.4.2起支持）。如果某个群的消息超过了频率限制，后台会优先下发高优先级的消息，详细请参考：https://cloud.tencent.com/document/product/269/3663#.E6.B6.88.E6.81.AF.E4.BC.98.E5.85.88.E7.BA.A7.E4.B8.8E.E9.A2.91.E7.8E.87.E6.8E.A7.E5.88.B6)
			// 	    // 支持的枚举值：TIM.TYPES.MSG_PRIORITY_HIGH, TIM.TYPES.MSG_PRIORITY_NORMAL（默认）, TIM.TYPES.MSG_PRIORITY_LOW, TIM.TYPES.MSG_PRIORITY_LOWEST
			// 	    // priority: TIM.TYPES.MSG_PRIORITY_NORMAL,
			// 	    payload: {
			// 	      file: e
			// 	    }
			// 	  });
			// 	  let promise = this.tim.sendMessage(message);
			// 	  promise.then(function(imResponse) {
			// 	    // 发送成功
			// 	    console.log(imResponse);
			// 	  }).catch(function(imError) {
			// 	    // 发送失败
			// 	    console.warn('sendMessage error:', imError);
			// 	  });
				
			// } else {
			// 	// console.log('取消发送录音');
			// }
			// this.willStop = false;
		},
		toRoom(item) {
			// console.log('item',item);
			if(item.conversation.type == 'C2C'){
					this.$store.commit('updateConversationActive', item);
					if(item.user){
						var userName = item.user.user
					}else{
						var userName = '用户' + item.conversation.userProfile.userID;
					}						
					uni.navigateTo({
						url: './customerRoom?userName=' + userName + '&userId=' + item.conversation.userProfile.userID
					})
			}	
		},
		// 发送录音消息
		sendvoiceMsg(content, type) {
			let message = this.tim.createTextMessage({
				to: this.groupID,
				conversationType: 'GROUP',
				payload: {
					type: content.text
				}
			});
			this.$store.commit('pushGroupMessageList', message);
			// console.log('content',content);
			let pomise = this.tim.sendMessage(message);
			pomise.then(res => {
				this.$nextTick(() => {
					// 滚动到底
					this.scrollToView = res.data.message.id;
				});
			});
		},
		// 切换语音/文字输入
		switchVoice() {
			this.hideDrawer();
			this.isVoice = this.isVoice ? false : true;
		},
		discard() {
			return;
		},
		viewCustomerService() {
			var userId = uni.getStorageSync('customer').kfId;
			this.$store.commit('createConversationActive', userId );
			uni.navigateTo({
				url: './customerService'
			});
		}
	}
};
</script>
<style lang="scss">
@import '@/static/chat/css/style.scss';


.chatBgColor {
	background-color: #505050;
}
.chatBgColorVip {
	background-color: #e7c365;
}
.chatVipText {
	color: #d2b56b;
}
.chatText {
	color: #909090;
}
.status_bar {
	height: var(--status-bar-height);
	width: 100%;
}
	.list-box {
		width: 94%;
		margin: 40rpx auto;
	}

	.item-box {
		display: flex;
		width: auto;
		height: 130rpx;
		padding: 20rpx;
		overflow: hidden;
		border-bottom: 1px solid #eee;
	}

	.item-img {
		/* float: left; */
		/* margin-top: 20rpx; */
		width: 90rpx;
		height: 90rpx;
	}

	.item-img image {
		border-radius: 50%;
		width: 90rpx;
		height: 90rpx;
	}

	.item-text {
		    /* float: left; */
		    margin-left: 15px;
		    width: 550rpx;
		    /* height: 50px; */
		    color: #666;
		    font-size: 14px;
		    display: flex;
		    justify-content: space-between;
	}

	.item-user {
		width: auto;
		height: 40rpx;
		line-height: 40rpx;
		color: #333;
		font-weight: bold;
		font-size: 32rpx;

	}
	
	

	.item-text-info {
		width: auto;
		height: 40rpx;
		line-height: 40rpx;
		color: #666;
		font-size: 24rpx;
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
		
	}

	.user-box {
		width: auto;
		height: 80rpx;
		padding: 0 20rpx;
	}

	.nav-tab {
		padding-top: 20rpx;
		background: #fff;
		height: 80rpx;

	}

	.tab-item {
		float: left;
		height: 70rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #666;
		font-size: 28rpx;
		border: 1px solid #F56C6C;
		border-top-left-radius: 25rpx;
		border-bottom-left-radius: 25rpx;
	}

	.tab-item1 {
		float: left;
		height: 70rpx;
		padding: 0 20rpx;
		line-height: 70rpx;
		color: #666;
		font-size: 28rpx;
		border: 1px solid #F56C6C;
		border-top-right-radius: 25rpx;
		border-bottom-right-radius: 25rpx;
	}

	.tab-item-active {
		color: #fff;
		background: #F56C6C;
	}

	.msg-box {
		line-height: 30rpx;
		font-size: 28rpx;
		color: #666;
	}

	.user-item-box {
		padding: 20rpx 0;
		width: auto;
		height: 70rpx;
		line-height: 70rpx;
		cursor: pointer;
		border-bottom: 1px solid #eee;
	}

	.user-img {
		float: left;
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
		overflow: hidden;
	}

	.user-img image {
		width: 70rpx;
		height: 70rpx;
		border-radius: 50%;
	}

	.user-name {
		float: left;
		margin-left: 20rpx;
		width: 250rpx;
		height: 70rpx;
		line-height: 70rpx;
		color: #666;
		font-weight: 500;
	}
	.item-msg{
		float: left;
		width: 40rpx;
		/* height: 100rpx; */
	}
	.item-msg-icon{
		width: 40rpx;
		height: 40rpx;
		border-radius: 50%;
		background: #f06c7a;
		color: #fff;
		line-height: 40rpx;
		/* margin-top: 30rpx; */
		text-align: center;
		font-size: 24rpx;
	}
	.item-msg-bottom{
		display: flex;
		justify-content: space-between;
		margin-left: 30rpx
	}
	.clear-box {
		clear: both;
	}
	.out-login{
		float: right;
		margin-right:20rpx;
		height: 70rpx;
		line-height: 70rpx;
		padding: 0 40rpx;
		border-radius: 25rpx;
		color: #fff;
		background: #F56C6C;
		font-size: 26rpx;
	}
	
	.foot{
		height: 88rpx;
		width: 750rpx;
		// position: fixed;
		// right: 0rpx;
		// left: 0rpx;
		// top:192rpx;
		justify-content: space-between;
		align-items: center;
		flex-direction: row;
		background-color:  #F0F0F0;
	}
	.openBack{
		position: absolute;
		left: 20rpx;		
	}
	.setCenter{
		display: flex;
		justify-content: center;
		flex: 1;
	}
	.liveBtn{
		display: flex;
		flex-direction: row;
		justify-content: center;
		align-items: center;		
	}
	.openLiveBtn{
		background-color: #E8C873;
		border: 1rpx solid #DFB853;
		border-radius: 16rpx;
		width: 108rpx;
		height: 64rpx;
		line-height: 64rpx;
		color:#fff;
		font-size:28rpx;
		text-align: center;
		margin-right: 30rpx;
	}
</style>
