<template>


	<view class="index">
		<!-- 自定义导航 -->
		<topbar bg_color="#F43B31" :have_top="true">
			<view class="topbar">
				<view class="top_fl dis_flex aic ju_b">
					<!-- <view class="tfl_left dis_flex aic" @click="jump" :data-url="`/pagesA_lzc/city/city?city=${city}`"> -->
					<view class="tfl_left dis_flex aic flex_0" @click="getaddress">
						<text class="iconfont icon-weizhi"></text>
						<text class="address oh1">{{address.city}}</text>
					</view>
					<view class="tfl_center dis_flex aic" @click="jump" data-url="/pagesA_lzc/shopSearch/shopSearch">
						<text style="color: #999;font-size: 28upx;" class="iconfont icon-sousou"></text>
						<text class="fs12 fw400" style="color: #ddd;margin-left: 7upx;">请输入您需要的内容</text>
					</view>
					<view class="tfl_right dis_flex ju_b aic">
						<view class="" style="position: relative;">
							<text @click="jump" :data-url="newUrl" :data-login='true' :data-hasLogin='hasLogin' class="iconfont icon-pinglun"></text>
							<view class="dian"></view>
						</view>
						<!-- <text ></text> -->
						<!-- <text @click="call" :data-tel="kf_tel" :data-url="kefuUrl" class="iconfont icon-fuwudingdanxiangqing-kefu"></text> -->
						<text @click="jump" data-type="web" :data-tel="kf_tel" :data-url="kf_url" :data-login='true' :data-hasLogin='hasLogin' class="iconfont icon-fuwudingdanxiangqing-kefu"></text>
					</view>
				</view>
			</view>
		</topbar>
		<view class="top_sl dis_flex ju_b fixed " style="z-index: 99;">
			<view class="indexView dis_flex aic ju_b">
				<!-- <view class="dis_flex_c ju_c aic indexView2" v-for="item in navList" :key="item.id" @click="jump"
						:data-url="item.url" style="min-width: 4rem">
						<text>{{item.text}}</text>
						<image :src="getimg('/static/images/lzc/index/active.png')" mode="heightFix"
							style="width: 25upx;height: 11upx;" v-if="item.isActive"></image>
					</view> -->
				<view class="dis_flex_c ju_c aic indexView2" v-for="item in navList" :key="item.id"
					style="min-width: 4rem" @click.stop="go('indexView2',item.nUrl,item.id)">
					<text>{{item.text}}</text>
					<image src="/static/images/lzc/index/active.png" mode="heightFix"
						style="width: 25upx;height: 11upx;" v-if="item.isActive"></image>
				</view>
			</view>
		</view>
		<view style="height: 104upx;"></view>
		<scroll-view scroll-y="true" class="h_box" :style="'height:calc(100vh - '+CustomBar+'px - 104upx)'" :scroll-into-view="'a_'+h_id" :scroll-with-animation="true" @scrolltolower="getnew_list">
			<!-- <view  id="a_1" class="" style="width: 750upx;height: 140upx;background-color:#F43B31;"></view> -->
			<view  id="a_1" class="" style="width: 750upx;height: 40upx;background-color:#F43B31;"></view>
			<view class="indexBody mt10">
				<!-- {{'height:calc(100vh - '+CustomBar+' - 104upx)'}} -->
				<!-- banner -->
				<swiper :indicator-dots="false" :autoplay="false" :interval="3000" @change="bannerChange"
					:duration="1000">
					<swiper-item v-for="(item,index) in swiperList" :key="index">
						<view class="swiper-item">
							<view class="">
								<image @click="swiper_jump(item)" :src="getimg(item.img)" mode="aspectFill"
									style="width: 100%;height: 300rpx; border-radius:20rpx;">
								</image>
							</view>
						</view>
					</swiper-item>
				</swiper>

				<view class="dots">
					<block v-for="(item,index) in swiperList.length" :key="item">
						<view class="dot" :class="index==current ? ' active' : ''"></view>
					</block>
				</view>
				<!-- 滚动栏 -->
				<view class="gunView dis_flex aic">
					<image src="/static/images/lzc/index/jiao.png" mode="widthFix"></image>
					<view class="gunText dis_flex aic">
						<uni-notice-bar :background-color="uniNoticeBarAtt.background"
							:scrollable="uniNoticeBarAtt.scrollable" :color="uniNoticeBarAtt.color" single="true"
							style="" :text="uniNoticeBar_arr" :speed="10">
						</uni-notice-bar>
					</view>
				</view>
				<image @click="jump" data-type="web"  :data-url="'http://www.yunlang.club/#/'" class="gczb_btn" src="../../static/images/gczb.png" mode="aspectFit"  :data-login='true' :data-hasLogin='hasLogin'></image>
				<!-- 热门推荐 -->
				<view class="hotView" id="hotView">
					<!-- 热门推荐 -->
					<!-- <block v-if="htList.length>0"> -->
					<block>
						<view class="hotView_l hotView_fl bs dis_flex_c">
							<view class="hfl dis_flex ju_b aic">
								<view class="hfll bs dis_flex aic">
									<!-- <text>热门推荐</text> -->
									<text>转让专区</text>
								</view>
								<view class="hflr bs dis_flex aic"  @click="jump" 
							    :data-url="'/pagesA_lzc/shopList/shopList?type=4&buy_type=1'">
									<text>更多</text>
									<text class="iconfont icon-arrow"></text>
								</view>
							</view>
							<view class="hsl dis_flex fww">
								<view class="hsl_item dis_flex_c ju_c aic" v-for="(item,index) in htList" :key="index"
									@click="jump" :data-url="'/pagesA_lzc/shopList/shopList?type=4&buy_type=1&pid='+item.id">
									<image :src="getimg(item.img)" mode="aspectFill"></image>
									<text class="hsl_text oh1">{{item.title}}</text>
								</view>
								<view v-if="htList.length==0" class="zanwu" style="line-height: 130upx;">暂无数据</view>
							</view>
						</view>
						<view class="hr_lzc_e"></view>
					</block>

					<!-- 热门专区 -->
					<!-- <block v-if="hzList.length>0"> -->
					<block>
						<view class="hotView_l hotView_sl">
							<view class="hfl dis_flex ju_b aic">
								<view class="hsll bs dis_flex aic">
									<!-- <text>热门专区</text> -->
									<text>办理专区</text>
								</view>
								<view class="hflr bs dis_flex aic" @click="jump" 
							    :data-url="'/pagesA_lzc/zhao/zhao'">
									<text>更多</text>
									<text class="iconfont icon-arrow"></text>
								</view>
							</view>
							<view class="hsl dis_flex  fww">
								<view class="hsl_item dis_flex_c ju_c aic" v-for="(item,index) in hzList" :key="index"
									@click="jump" :data-url="'/pagesA_lzc/SendTender/SendTender?id='+item.id">
									<image :src="getimg(item.img)" mode="aspectFill"></image>
									<text class="hsl_text oh1">{{item.title}}</text>
								</view>
								<view v-if="hzList.length==0" class="zanwu" style="line-height: 130upx;">暂无数据</view>
							</view>
						</view>
					</block>

				</view>
				<!-- 求购专区 -->
				<view class="qiuView bs" >
					<view class="qfl dis_flex ju_b aic">
						<view class="qfll bs dis_flex aic">
							<text>求购专区</text>
						</view>
						<view class="qflr bs dis_flex aic"  @click="jump" 
							data-url="/pagesA_lzc/shopList/shopList?type=3" style="box-sizing: border-box;padding-right: 22upx;">
							<text>更多</text>
							<text class="iconfont icon-arrow"></text>
						</view>
					</view>
					<sbItemLzc :searchList="searchList"></sbItemLzc>
				</view>


				<!-- 交易市场 -->
				<view id="a_2" class="jiaoView bs" >
					<view class="jvfl dis_flex aic">
						<view class="jvfl_l dis_flex aic">
							<text :class="{'jvfl_l_text_active':item.active == true,'jvfl_l_text':item.active == false}"
								v-for="(item,index) in jiaoViewNav" :key="index" @click="jiaoTab(index)">
								{{item.text}}
							</text>
						</view>
						<view class="jvfl_r dis_flex aic flex-right"  @click="jump" 
							:data-url="'/pagesA_lzc/shopList/shopList?type=4&buy_type='+jiao1">
							<text>更多</text>
							<text class="iconfont icon-arrow"></text>
						</view>
					</view>
					<view v-if="deatail.length==0" class="zanwu">暂无数据</view>
					<view class="jvsl" @click="jump" :data-url="'/pagesA_lzc/TradingMarketD/TradingMarketD?id='+item.id"
						 v-for="(item,index) in deatail" :key="index">
						<view class="jvslView dis_flex ju_b bs">
							<view class="jvsl_fl dis_flex aic">
								<image :src="getimg(item.img)" mode="aspectFill"></image>
								<text class="tel">{{getTel(item.phone)}}</text>
							</view>
							<view class="jvsl_fr dis_flex aic">
								<text class="iconfont icon-yanjing"></text>
								<text class="tel">{{item.view}}</text>
								<text class="tel">浏览</text>
							</view>
						</view>
						<view class="ph_body_slfl dis_flex aicx">
							<image :src="getimg(item.classify_img)" mode="aspectFill"></image>
							<view class="oh2">
								<text class="biao">{{item.classify_title}}</text>
								<text style="margin-left: 0.25rem;" class="textBiao">{{item.title}}</text>
							</view>
						</view>
						<!-- 标签 -->
						<view v-if="item.label_arr&&item.label_arr.length>0" class="myTag bs dis_flex aic fww">
							<view class="tagItem" :style="{'background-color':item1.color}"
								v-for="(item1,index1) in item.label_arr">
								<text>{{item1.title}}</text>
							</view>
						</view>
						<!-- 基本属性 -->
						<!-- <view class="att">
							<view class="att_fl dis_flex ju_b aic">
								<view class="afll">
									<text class="att_type">组合类型:</text>
									<text class="att_text">{{item.type1}}</text>
								</view>
								<view class="afll">
									<text class="att_type">网店类目:</text>
									<text class="att_text">{{item.type2}}</text>
								</view>
							</view>
							<view class="att_sl dis_flex ju_b aic">
								<view class="afll">
									<text class="att_type">组合类型:</text>
									<text class="att_text">{{item.type3}}</text>
								</view>
								<view class="afll">
									<text class="att_type">网店类目:</text>
									<text class="att_text">{{item.type4}}</text>
								</view>
							</view>
						</view> -->
						<view class="price bs">
							<text style="font-size: 36upx;font-weight: bold;">{{item.price}}</text>
							<!-- <text style="font-size: 24upx;">万</text> -->
						</view>
					</view>
				</view>
				<!-- 招标市场 -->
				<view id="a_4" class="myBidding bs" @click="jump" data-url="/pagesB_mxx/Bidding_market/Bidding_market">
					<view class="bfl dis_flex ju_b aic">
						<view class="bfll bs dis_flex aic">
							<text>办理市场</text>
						</view>
						<view class="bflr bs dis_flex aic">
							<text>更多</text>
							<text class="iconfont icon-arrow"></text>
						</view>
					</view>
					<view class="bsl dis_flex">
						<view class="bsl_item dis_flex_c aic ju_c">
							<text class="bsl_title">已完成交易</text>
							<text class="bsl_num">{{myBidding.now?myBidding.now:0}}</text>
						</view>
						<view class="bsl_item dis_flex_c aic ju_c">
							<text class="bsl_title">正在交易</text>
							<text class="bsl_num">{{myBidding.complete?myBidding.complete:0}}</text>
						</view>
						<view class="bsl_item dis_flex_c aic ju_c">
							<text class="bsl_title">服务者数量</text>
							<text class="bsl_num">{{myBidding.user?myBidding.user:0}}</text>
						</view>
					</view>
					<view class="bll bs" v-for="(item,index) in myBidding.data" :key="index">
						<view class="bll_fl dis_flex aic">
							<view class="bll_fl_fc bs dis_flex aic ju_c oh1">{{item.classify_title}}</view>
							<view class="bll_fl_sc oh1">{{item.title}}</view>
							<uni-rate class="bll_star" :size="starStyle.size" :readonly="starStyle.readonly"
								:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="item.star">
							</uni-rate>
						</view>
						<view class="bll_sl dis_flex aic ju_b">
							<view class="bll_sl_left dis_flex aic">
								<view v-if="item.address">{{item.address}}</view>
								<view  v-if="item.address" class="" style="width: 1px;height: 100%;background-color: #ccc;margin: 0 0.5rem;">
								</view>
								<view>{{item.create_time}}</view>
							</view>
							<view class="bll_sl_right">
								<text class="fs18 fwb">{{item.pay_price}}</text>
								<text>元</text>
							</view>
						</view>
						<view class="bll_ll dis_flex  aic">
							<view class="bll4_left dis_flex jub aic">
								<view class="">
									<image v-if="index1<4" :src="getimg(item1.img)" mode="" v-for="(item1,index1) in item.data"></image>
								</view>
								<view class="flex_1">
									<text>等{{item.count}}人竞标</text>
								</view>
							</view>
							<view class="bll4_right dis_flex ju_b aic">
								<view class=""></view>
								<view class="">
									<text class="iconfont icon-yanjing"></text>
									<text class="tel">{{item.view}}</text>
									<text class="tel">浏览</text>
								</view>
							</view>
						</view>
					</view>

				</view>
				<!-- 优秀服务者 -->
				<view class="Eservice bs">
					<view class="commfl dis_flex ju_b aic">
						<view class="commfll bs dis_flex aic"
							style="background: linear-gradient(90deg, #FF9527 0%, #FF4C34 100%);">
							<text>优秀服务者</text>
						</view>
						<view class="commflr bs dis_flex aic" @click="jump" :data-url="fulist_url">
							<text>更多</text>
							<text class="iconfont icon-arrow"></text>
						</view>
					</view>
					<view class="eslView">
						<uni-swiper-dot :info="fuList" :current="fuCurrent" class="uniSwiperDot" mode="default"
							:dotsStyles="newsDotsStyles" style="width: 100%;height: 100%;">
							<swiper class="flex-1 eslViewItem" @change="fuChange">
								<swiper-item class="dis_flex ju_a" v-for="(fu,findex) in fuList" :key="findex">
									<view class=" esvitem bs dis_flex_c aic" @click="jump" :data-url="fulist_url"
										v-for="(item,index) in fu" :key="index">
										<image :src="getimg(item.img)" mode="aspectFit"></image>
										<text class="nameI">{{item.nick}}</text>
										<text class="renwu">竞标{{item.view}}单</text>
										<uni-rate :size="starStyle.size" :readonly="starStyle.readonly"
											:allowHalf="starStyle.allowHalf" :margin="starStyle.margin"
											:value="item.star">
										</uni-rate>
									</view>
								</swiper-item>
							</swiper>
						</uni-swiper-dot>
					</view>
				</view>
				<!-- 新闻中心 -->
				<view class="news bs" style="padding-bottom: 100upx;">
					<view class="commfl dis_flex ju_b aic">
						<view class="commfll bs dis_flex aic"
							style="background: linear-gradient(90deg, #FF9527 0%, #FF4C34 100%);">
							<text>新闻中心</text>
						</view>
					</view>
					<scroll-view scroll-x="true" class="newsNav">
						<view class="newsNav_item" v-for="(item,index) in newsNavS" :key="index"
							@click="newsNavClick(index)">
							<text v-if="!item.isActive" class="noActive">
								{{item.title}}
							</text>
							<text v-else class="itemActive">
								{{item.title}}
							</text>
							<!-- <view class="" v-if="item.isActive"
								style="width: 103upx;height: 5upx;background: #F43B31;border-radius: 5upx 5upx 0px 0px;">
							</view> -->
						</view>
					</scroll-view>
					<newsItemLzc class="bs" :zList="zList"></newsItemLzc>
					<view v-if="zList.length==0" class="zanwu">暂无数据</view>
					<view v-if="data_last" class="zanwu">到底了~~</view>
				</view>
			</view>
		</scroll-view>
	</view>
</template>

<script>
	import service from '../../components/service.js';
	import tel from '@/components/data.js'
	import newsItemLzc from '@/components/news_item_lzc/news_item_lzc.vue'
	import sbItemLzc from '@/components/sbItemLzc/sbItemLzc.vue'
	import uniRate from '@/components/uni-rate/uni-rate.vue'
	import Vue from 'vue'
	var that
	var query
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			newsItemLzc,
			sbItemLzc,
			uniRate
		},
		data() {
			return {
				/* 星星样式 */
				starStyle: {
					size: 10,
					readonly: true,
					allowHalf: true,
					margin: 1
				},
				city: '北京',
				jiao1: 1,
				oneClick: 0,
				/* 服务者主页地址 */
				fu_index_url: '/pagesA_lzc/fuIndex/fuIndex',
				/* 交易市场详情页 */
				tmd_url: '/pagesA_lzc/TradingMarketD/TradingMarketD',
				/* 交易市场 */
				jiaoUrl: '/pages/market/market',
				/* 服务者列表 */
				fulist_url: '/pagesA_lzc/fuList/fuList',
				kefuUrl: '/pagesA_lzc/kefu/kefu',
				/* 商品列表 */
				slUrl: '/pagesA_lzc/shopList/shopList',
				/* 消息页面 */
				newUrl: '/pagesA_lzc/news/news',
				/* 求购 */
				qiuGou: '/pagesA_lzc/faQiu/faQiu',
				zhaoBiao: '/pagesA_lzc/zhao/zhao',
				uniNoticeBarAtt: {

					background: '#f8f8f8',
					color: '#666666',
					scrollable: true
				},
				uniNoticeBar_arr: '',
				bannerDotsStyles: {
					backgroundColor: 'rgba(255,255,255,0.5)',
					selectedBackgroundColor: '#fff',
					border: 'rgba(255,255,255,0.5)',
					selectedBorder: '#fff'
				},
				newsDotsStyles: {
					backgroundColor: '#EEEEEE',
					selectedBackgroundColor: '#F43B31',
					border: '#EEEEEE',
					selectedBorder: '#F43B31'
				},
				current: 0,
				fuCurrent: 0,
				navList: [{
						id: 1,
						text: '首页',
						url: '/pagesA_lzc/jiao/jiao',
						isActive: true,
						nUrl: 'indexView2'
					},
					{
						id: 2,
						text: '交易市场',
						url: '/pagesA_lzc/jiao/jiao',
						isActive: false,
						nUrl: 'jiaoView'
					},
					{
						id: 3,
						text: '办理市场',
						url: '/pagesB_mxx/Bidding_market/Bidding_market',
						isActive: false,
						nUrl: 'myBidding'
					},
					{
						id: 4,
						text: '往期成交',
						url: '/pagesA_lzc/biao1/biao1',
						isActive: false,
						nUrl: 'jiaoView'
					}
				],
				bannerConfig: {
					mode: 'round',
					dotsStyles: {

					}
				},
				swiperList: [],
				htList: [],
				hzList: [],
				myBidding: {
				},
				
				
				searchList: [],
				jiaoViewNav: [{
						id: 1,
						text: '交易市场',
						active: true
					},
					{
						text: '往期成交',
						active: false,
						id: 2

					}
				],
				fuList: [],
				xxxx1: 0,
				xxxx2: 0,
				xxxnum: 0,
				x1: 0,
				x2: 0,
				x3: 0,
				zzShu: [],
				jysc_H: '',
				new_H: '',


				h_id: 1,
				page:1,
				newsNavS: [],
				zList: [],
				data_last:false,
				
				
				
				
				deatail: [],
				address:'',
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			console.log(uni.getStorageInfoSync('city'))
			if (option.city) {
				console.log(1111)
				this.city = option.city;
			}

			that.getbanner()
			that.getqiugou()
			that.getjiaoyi(1)
			that.getzhaobiao()


			that.getservice()
			that.getnew()
		},
		onShow() {
			that.data_last=false
			that.btnkg=0
			uni.getLocation({
			    type: 'gcj02',
					geocode:true,
			    success: function (res) {
			        console.log('当前位置的经度：' + res.longitude);
			        console.log('当前位置的纬度：' + res.latitude);
			        console.log('当前位置的msg：' + res.address);
							that.address=res.address
			    }
			});
		},
		onReady() {
			query = uni.createSelectorQuery().in(this);
			// setTimeout(() => {
			// 	query.select('.jiaoView').boundingClientRect(data => {
			// 		this.x1 = data.top;
			// 		// that.jysc_H=data.height

			// 		this.x2 = this.x1 + data.height;
			// 	}).exec();
			// }, 500);
			// setTimeout(() => {
			// 	query.select('.myBidding').boundingClientRect(res => {
			// 		console.log('res',res)
			// 		this.x2 = res.top;
			// 	}).exec();
			// }, 500);
			// let token = this.$store.state.hasLogin;
			// console.log(token,'11111111111111111111111')
			// console.log(this.$store.state.userinfo)
			// if(token){
			// 	console.log('登录状态:true')
			// }else{
			// 	uni.reLaunch({
			// 		url:'/pagesB_mxx/login/login'
			// 	})
			// }

		},
		
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','kf_tel','kf_url'])
		},
		onPageScroll(res) {
			console.log(res.scrollTop);
			// if (res.scrollTop >= parseInt(this.x1 - 120) && res.scrollTop < parseInt(this.x2 - 200)) {
			// 	console.log('大于770');
			// 	if (this.jiaoViewNav[0].active) {
			// 		this.go1(2);
			// 	}
			// 	if (this.jiaoViewNav[1].active) {
			// 		this.go1(4);
			// 	}
			// }
			// if (res.scrollTop >= parseInt(this.x2 - 120)) {
			// 	console.log('大于1280');
			// 	this.go1(3);
			// }
			// if (res.scrollTop < parseInt(this.x1 - 200)) {
			// 	console.log('小于770');
			// 	this.go1(1);
			// }


		},
		methods: {
			...mapMutations(['logout', 'login','setkf_tel','setkf_url']),
			getaddress(){
				uni.getLocation({
				    type: 'gcj02',
						geocode:true,
				    success: function (res) {
				        console.log('当前位置的经度：' + res.longitude);
				        console.log('当前位置的纬度：' + res.latitude);
				        console.log('当前位置的msg：' + res.address);
								that.address=res.address
				    }
				});
			},
			call(e){
				service.call(e)
			},
			swiper_jump(item){
				service.swiper_jump(item)
			},
			// 获取banner
			getbanner() {
				service.P_post(service.IPurl).then((res) => {
					console.log(res, 'res')
					if (res.code == 1) {
						console.log(res.data.banner_list)
						this.swiperList = res.data.banner_list
						this.hzList = res.data.hot_bidding
						this.htList = res.data.hot_transaction
						this.uniNoticeBar_arr = res.data.notice.join(',    ')
						that.setkf_tel(res.data.kf_tel)
						that.setkf_url(res.data.kf_url)
					} else {
						that.btnkg = 0
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},
			getqiugou() {
				service.P_post('trade/list', {
					type: "3",
					limit: "3"
				}).then((res) => {
					if (res.code == 1) {
						this.searchList = res.data.data
					} else {
						that.btnkg = 0

					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},

			jiaoTab(index) {
				if (index == 0) {
					this.go1(2)
					that.getjiaoyi(1)
				}
				if (index == 1) {
					this.go1(4)
					that.getjiaoyi(2)
				}
				for (let i = 0; i < this.jiaoViewNav.length; i++) {
					if (i == index) {
						this.jiaoViewNav[i].active = true;
						this.jiao1 = i + 1;
						console.log(this.jiao1);
					} else {
						this.jiaoViewNav[i].active = false;
					}
				}
			},
			getjiaoyi(buy_type) {
				that.jysc_H = that.new_H
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				service.P_post('trade/list', {
					buy_type: buy_type,
					type: "4",
					limit: "3"
				}).then((res) => {
					if (res.code == 1) {
						that.deatail = res.data.data
						that.btnkg = 0
					} else {
						that.btnkg = 0

					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},
			getzhaobiao() {
				service.P_post('/bidding', {}).then((res) => {
					if (res.code == 1) {
						this.myBidding = res.data
					} else {
						that.btnkg = 0

					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},

			getservice() {
				service.P_post('/service', {}).then((res) => {
					if (res.code == 1) {
						var datas=res.data.data
						var arr=[]
						for(var i=0;i<datas.length;i=i+3){
							var arr_i=[]
							if(i<datas.length){
								arr_i.push(datas[i])
							}
							var a=i-1+2
							if(a<datas.length){
								arr_i.push(datas[a])
							}
							var b=a-1+2
							if(b<datas.length){
								arr_i.push(datas[b])
							}
							arr.push(arr_i)
						}
						that.fuList = arr
						console.log('that.fuList--------------------------------')
						console.log(that.fuList)
					} else {
						that.btnkg = 0

					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},
			getnew(){
				var jkurl="/news_classify"
				
				service.P_post(jkurl, {}).then((res) => {
					if (res.code == 1) {
						that.newsNavS = res.data
						if(res.data.length>0){
							Vue.set(that.newsNavS[0],'isActive',true)
							that.page=1
							that.data_last=false
							that.getnew_list(that.newsNavS[0])
						}
					} else {
						that.btnkg = 0
				
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},
			getnew_list(item){
				var jkurl="/news_list"
				var datas={
					pid:item.id,
					page:that.page,
					limit:20
				}
				if(that.data_last == true){
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				var page_now=that.page
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						
						that.btnkg = 0
						if (page_now == 1) {
						
							that.zList = datas.data
						
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.zList = that.zList.concat(datas.data)
						}
						that.page++
				
					} else {
						that.btnkg = 0
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				}).catch(e => {
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				
			},
			
			go1(index) {
				for (var i = 0; i < this.navList.length; i++) {
					if (i == index - 1) {
						this.navList[i].isActive = true;
					} else {
						this.navList[i].isActive = false;
					}
				}

			},
			go(id1, id2, index) {
				if (index == 1) {
					that.h_id = 1
				}
				if (index == 2) {
					that.h_id = 2
					this.jiaoViewNav[0].active = true;
					this.jiaoViewNav[1].active = false;
					this.jiao1 = 1;
					that.getjiaoyi(1)
				}
				if (index == 4) {
					that.h_id = 2
					this.jiaoViewNav[1].active = true;
					this.jiaoViewNav[0].active = false;
					this.jiao1 = 2;
					that.getjiaoyi(2)
				}
				if (index == 3) {
					that.h_id = 4
				}
				console.log('a_'+that.h_id)
				this.go1(index);
				return
				if (index == 2) {
					uni.pageScrollTo({
						scrollTop: parseInt(this.x1 - 120)
					})
					
				} else if (index == 3) {
					uni.pageScrollTo({
						scrollTop: parseInt(this.x2 - 120)
					})
				} else if (index == 4) {
					that.getjiaoyi(2)
					uni.pageScrollTo({
						scrollTop: parseInt(this.x1 - 120)
					})
					this.jiaoViewNav[1].active = true;
					this.jiaoViewNav[0].active = false;
					this.jiao1 = 2;
				} else {
					uni.pageScrollTo({
						scrollTop: 0
					})
				}

				this.go1(index);


			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			getTel(phone) {
				return tel.tel(phone);
			},
			bannerChange(e) {
				this.current = e.detail.current;
			},

			newsNavClick(index) {
				console.log(index)
				for (let i = 0; i < this.newsNavS.length; i++) {
					if (i == index) {
						this.newsNavS[i].isActive = true;
						that.page=1
						that.data_last=false
						console.log(that.newsNavS[i])
						that.getnew_list(that.newsNavS[i])
					} else {
						this.newsNavS[i].isActive = false;
					}
				}
				
			},
			fuChange(e) {
				this.fuCurrent = e.detail.current;
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("/static/css/lzc/commin.scss");

	.index {
		padding-bottom: 20upx;

		.top_sl {
			width: 750upx;
			height: 104upx;
			background-color: #F43B31;
			padding-right: 30upx;

			.indexView {
				width: 100%;
				height: 100%;

				.indexView2 {
					position: relative;
					height: 100%;
					width: 65upx;

					image {
						position: absolute;
						bottom: 23upx;
					}

					text {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}
			}

			.indexNav2 {
				width: 100%;
				height: 100%;
				box-sizing: border-box;

				.navText>text {
					font-size: 30upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					opacity: 0.7;
				}
			}
		}

		.topbar {
			width: 100%;
			height: 100%;

			.top_fl {
				width: 100%;
				height: 60upx;

				.tfl_left {
					max-width: 150upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: bold;
					line-height: 35upx;

					.icon-weizhi {
						color: #FFFFFF;
					}

					.address {
						color: #FFFFFF;
						margin-left: 12upx;
					}
				}

				.tfl_center {
					width: 462upx;
					height: 60upx;
					background: #FFFFFF;
					border-radius: 30upx;
					padding-left: 34upx;
				}

				.tfl_right {
					width: 115upx;
					height: 60upx;
					border-radius: 30upx;

					.icon-pinglun {
						font-size: 50upx;
						color: #fff;
					}

					.icon-fuwudingdanxiangqing-kefu {
						font-size: 40upx;
						color: #fff;
					}
				}

			}


		}

		.indexBody {
			width: 750upx;
			position: relative;
			background-color: #f8f8f8;
			top: -50upx;
			border-radius: 20upx;
			box-sizing: border-box;
			padding: 26upx 29upx 50upx 30upx;
			margin-bottom: -70upx;
			z-index: 98;

			.banner {
				width: 690upx;
				height: 400upx;
				// margin-bottom: 100upx;

				/deep/.uni-swiper-slides {
					height: 400rpx;
				}

				/deep/.uni-swiper__dots-box[data-v-039811b8] {
					z-index: 9999999;
				}

				/deep/uni-swiper {
					height: 400rpx;
					z-index: 999999;
					background-color: #fff;
				}

				.swiperItem {
					width: 690upx;
					height: 400upx;
					border-radius: 20upx;

					image {
						width: 690upx;
						height: 300upx;
						border-radius: 20upx;
					}
				}
			}

			.gunView {
				width: 690upx;
				height: 78upx;

				image {
					width: 132upx;
					height: 32upx;
					min-width: 132upx;
				}

				.gunText {
					width: 100%;
					margin-left: 22upx;
					font-size: 24upx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #666666;
				}
			}

			.hotView {
				width: 690upx;
				height: 426upx;
				background-color: #FFFFFF;
				border-radius: 10upx;

				.hotView_l {
					width: 690upx;
					height: 210upx;
					padding: 20upx 19upx 27upx 0;

					.hfl {
						width: 100%;
						height: 44upx;

						.hfll {
							width: 126upx;
							height: 44upx;
							background: linear-gradient(90deg, #FF7D48 0%, #FF9935 98%);
							border-radius: 0upx 22upx 22upx 0upx;
							font-size: 24upx;
							font-family: FZZhengHeiS-DB-GB;
							font-weight: 400;
							font-style: italic;
							color: #FFFFFF;
							padding: 0 13upx 0 13upx;
						}

						.hsll {
							width: 126upx;
							height: 44upx;
							background: linear-gradient(90deg, #FF1717 0%, #FF6B5F 97%);
							border-radius: 0upx 22upx 22upx 0upx;
							font-size: 24upx;
							font-family: FZZhengHeiS-DB-GB;
							font-weight: 400;
							font-style: italic;
							color: #FFFFFF;
							padding: 0 13upx 0 13upx;
						}

						.hflr {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #BBBBBB;
							line-height: 40upx;

							.iconfont {
								font-size: 15upx;
							}
						}
					}

					.hsl {
						width: 690upx;
						height: 146upx;
						padding: 0 15upx;

						.hsl_item {
							width: 20%;
							height: 100%;

							image {
								height: 60upx;
								width: 60upx;
							}

							.hsl_text {
								font-size: 22upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;
								margin-top: 20upx;
							}
						}
					}
				}

			}

			.qiuView {
				width: 690upx;
				background-color: #FFFFFF;
				margin-top: 22upx;
				padding-top: 24upx;

				.qfl {
					width: 100%;
					height: 44upx;

					.qfll {
						width: 126upx;
						height: 44upx;
						background: linear-gradient(90deg, #4FACFE 0%, #00BFFE 100%);
						border-radius: 0upx 22upx 22upx 0upx;
						font-size: 24upx;
						font-family: FZZhengHeiS-DB-GB;
						font-weight: 400;
						font-style: italic;
						color: #FFFFFF;
						padding: 0 13upx 0 13upx;
					}

					.qflr {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #BBBBBB;
						line-height: 40upx;

						.iconfont {
							font-size: 15upx;
						}
					}
				}
			}

			.jiaoView {
				width: 690upx;
				// height: 1070upx;
				// height: 1334upx;
				background-color: #FFFFFF;
				margin-top: 24upx;
				padding: 0 25upx 25upx 25upx;

				.jvfl {
					width: 100%;
					height: 76upx;

					.jvfl_l {
						width: 100%;
						height: 100%;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 40upx;

						text {
							margin-right: 27upx;
						}

						.jvfl_l_text {
							font-size: 24upx;
							color: #999999;
						}

						.jvfl_l_text_active {
							font-size: 28upx;
							font-weight: bold;
							color: #F43B31;
						}
					}

					.jvfl_r {
						width: 100%;
						height: 100%;
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #BBBBBB;
						line-height: 40upx;

						.iconfont {
							font-size: 15upx;
							color: #BBBBBB;
						}
					}
				}

				.jvsl {
					width: 654upx;
					// height: 404upx;
					border: 1px solid #EEEEEE;
					border-radius: 10upx;

					.jvslView {
						width: 654upx;
						height: 64upx;
						padding: 0 19upx 0 25upx;
						border-bottom: 1px solid #eee;

						.jvsl_fl {
							height: 100%;

							image {
								width: 40upx;
								height: 40upx;
								border-radius: 50%;
							}

							.tel {
								font-size: 22upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999999;
								margin-left: 10upx;
							}
						}

						.jvsl_fr {
							// width: 100%;
							font-size: 22upx;
							font-family: Arial;
							font-weight: 400;
							color: #999999;
							opacity: 0.3;

							text:nth-child(2) {
								margin-left: 5upx;
							}

							text:nth-child(3) {
								margin-left: 5upx;
							}
						}
					}

					.jvsl_sl {
						width: 100%;
						height: 87upx;
						padding: 0 13upx;
						margin-top: 12upx;

						image {
							height: 87upx;
							width: 87upx;
							border-radius: 18upx;
						}

						.jvsl_slr {
							width: 100%;
							height: 100%;
							padding-top: 10upx;

							.biao {
								width: 100upx;
								height: 36upx;
								background: #B7D0F8;
								border-radius: 4upx;
								font-size: 22upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #FFFFFF;
								margin-left: 11upx;
								min-width: 100upx;

							}

							.jvsl_slr_title {
								font-size: 28upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #333333;
								line-height: 40upx;
								margin-left: 15upx;
							}
						}
					}

					.myTag {
						width: 100%;
						// height: 35upx;
						margin-top: 22upx;
						padding: 0 13upx;

						.tagItem {
							display: inline-block;
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							background: #FFB017;
							border-radius: 16upx;
							box-sizing: border-box;
							padding: 6upx 11upx;
							margin-right: 19upx;
							margin-bottom: 10upx;
						}

					}

					.att {
						width: 100%;
						margin-top: 34upx;
						padding: 0 30upx;

						.att_fl,
						.att_sl {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
						}

						.att_sl {
							margin-top: 20upx;
						}

						.att_type {
							color: #DDDDDD;
						}

						.att_text {
							color: #999999;
							margin-left: 0.5rem;
						}
					}

					.price {
						width: 100%;
						color: #F43B31;
						margin-top: 20upx;
						margin-bottom: 26upx;
						padding: 0 30upx 0 30upx;
					}
				}

				.jvsl+.jvsl {
					margin-top: 10upx;
				}
			}

			.myBidding {
				width: 100%;
				// height: 956upx;
				margin-top: 22upx;
				padding-top: 24upx;
				// padding-right: 19upx;
				background-color: #fff;

				.bfl {
					width: 100%;
					height: 44upx;

					.bfll {
						width: 126upx;
						height: 44upx;
						background: linear-gradient(90deg, #4FACFE 0%, #00BFFE 100%);
						border-radius: 0upx 22upx 22upx 0upx;
						font-size: 24upx;
						font-family: FZZhengHeiS-DB-GB;
						font-weight: 400;
						font-style: italic;
						color: #FFFFFF;
						padding: 0 13upx 0 13upx;
					}

					.bflr {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #BBBBBB;
						line-height: 40upx;
						padding-right: 19upx;

						.iconfont {
							font-size: 15upx;
						}
					}
				}

				.bsl {
					width: 100%;
					height: 144upx;
					border-bottom: 1px solid #eee;

					.bsl_item {
						width: 33.3%;
						height: 100%;

						.bsl_title {
							font-size: 22upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
						}

						.bsl_num {
							font-size: 48upx;
							font-family: Akzidenz-Grotesk BQ Condensed A;
							font-weight: bold;
							color: #F43B31;
						}

					}
				}

				.bll {
					width: 100%;
					margin-top: 28upx;
					padding: 0 18upx 10upx;
					border-bottom: 1px solid #eee;

					.bll_fl {
						position: relative;

						// border-bottom: 1px solid #eee;
						.bll_fl_fc {
							// height: 36upx;
							background-color: #FFB017;
							border-radius: 4upx;
							padding: 7upx 11upx;
							font-size: 22upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							max-width: 180upx;
						}

						.bll_fl_sc {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 40upx;
							margin-left: 18upx;
							max-width: 250upx;
						}

						.bll_star {
							position: absolute;
							right: 0;
						}
					}

					.bll_sl {
						width: 100%;
						margin-top: 21upx;

						.bll_sl_left {
							// width: 326upx;
							height: 21upx;
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #BBBBBB;
							line-height: 40upx;
						}

						.bll_sl_right {
							font-size: 24upx;
							font-family: Akzidenz-Grotesk BQ Condensed A;
							color: #F43B31;
						}
					}

					.bll_ll {
						width: 100%;
						margin-top: 23upx;
						position: relative;
						
						.bll4_left {
							width: 50%;
							height: 100%;

							view:nth-child(1) {
								// width: 100%;
								margin-left: 20upx;
								margin-right: 20upx;
								image {
									width: 40upx;
									height: 40upx;
									border-radius: 50%;
									margin-left: -20upx;
									vertical-align: middle;
								}
							}

							view:nth-child(2) {
								width: 100%;
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #C5C5C5;
							}

						}

						.bll4_right {
							height: 100%;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #BBBBBB;
							line-height: 40upx;
							position: absolute;
							right: 36upx;

							.iconfont {
								font-size: 29upx;
								color: #BBBBBB;
							}
						}
					}
				}
			}

			.Eservice {
				width: 690upx;
				height: 408upx;
				background-color: rgba($color: #ffffff, $alpha: 1.0);
				margin-top: 20upx;
				padding-top: 24upx;

				.eslViewItem {
					width: 690upx;
					height: 338upx;
					box-sizing: border-box;
				}

				.eslView {
					width: 690upx;
					height: 338upx;
					// padding-right:200upx ;
					box-sizing: border-box;

					/deep/.uni-swiper-wrapper {
						height: 338upx;
					}

					/deep/.uni-swiper__dots-box[data-v-039811b8] {
						z-index: 9999999;
						height: 6upx;
					}

					/deep/ uni-swiper {
						height: 100upx;
					}

					.esvitem {
						width: 126upx;
						height: 100%;
						padding-top: 33upx;

						image {
							width: 126upx;
							height: 126upx;
							border-radius: 10px;
						}

						.renwu {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #666666;
							margin-top: 8upx;
							margin-bottom: 11upx;
						}

						.nameI {
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							margin-top: 10upx;
						}
					}
				}
			}

			.news {
				width: 690upx;
				// height: 995upx;
				background-color: #FFFFFF;
				margin-top: 20upx;
				padding: 24upx 0 0 0;

				.newsNav {
					width: 100%;
					// height: 50upx;
					// background-color: #00C5D8;
					overflow: hidden;
					white-space: nowrap;
					padding-left: 18upx;
					padding-bottom: 20upx;
					padding-right: 30upx;
					box-sizing: border-box;

					.newsNav_item {
						display: inline-block;
						// background: #0062CC;
						margin: 0 auto;
						margin-right: 44upx;
						font-size: 26upx;
						font-family: PingFang SC;
						font-weight: 400;
						line-height: 36upx;
						line-height: 36upx;
					}

					.noActive {
						color: #BBBBBB;
						border-bottom: 1px solid rgba(0,0,0,0);
					}

					.itemActive {
						color: #000;
						border-bottom: 1px solid rgb(244, 59, 49);
					}
				}
			}
		}
	}

	.dian {
		width: 14upx;
		height: 14upx;
		background: #FFD904;
		border-radius: 50%;
		position: absolute;
		top: 5upx;
		right: 0;
	}

	/deep/.dh_top {
		// height: 60upx !important;
		// height: 218upx !important;
	}

	/deep/.dh_top_box {
		// height: 60upx !important;
		padding-top: 10upx;
		box-sizing: border-box;
	}

	/* 页面公共样式 */
	.commfl {
		width: 100%;
		height: 44upx;

		.commfll {
			height: 44upx;
			border-radius: 0upx 22upx 22upx 0upx;
			font-size: 24upx;
			font-family: FZZhengHeiS-DB-GB;
			font-weight: 400;
			font-style: italic;
			color: #FFFFFF;
			padding: 0 13upx 0 13upx;
		}

		.commsll {
			width: 126upx;
			height: 44upx;
			background: linear-gradient(90deg, #FF1717 0%, #FF6B5F 97%);
			border-radius: 0upx 22upx 22upx 0upx;
			font-size: 24upx;
			font-family: FZZhengHeiS-DB-GB;
			font-weight: 400;
			font-style: italic;
			color: #FFFFFF;
			padding: 0 13upx 0 13upx;
		}

		.commflr {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #BBBBBB;
			line-height: 40upx;
			padding-right: 19upx;

			.iconfont {
				font-size: 15upx;
			}
		}
	}

	button {
		background-color: rgba($color: #ffffff, $alpha:0);
		margin: 0;
		padding: 0;
	}

	/deep/.citem {
		width: 690upx;
		padding: 26upx 21upx 24upx 18upx;
	}

	/deep/.uni-noticebar[data-v-a1596656] {
		margin-bottom: 0 !important;
	}




	.dots {
		position: absolute;
		margin-top: -38rpx;
		left: 50%;
		// 这里一定要注意兼容不然很可能踩坑          
		transform: translate(-50%, 0);
		-webkit-transform: translate(-50%, 0);
		z-index: 99;
		display: flex;
		flex-direction: row;
		justify-content: center;

		.dot {
			width: 12rpx;
			height: 12rpx;
			border-radius: 50%;
			background: rgba(255, 255, 255, .5);
			margin-right: 10rpx;
		}

		.active {
			width: 28rpx;
			height: 12rpx;
			background: rgba(255, 255, 255, 1);
			border-radius: 6px;
		}
	}

	.ph_body_slfl {
		width: 100%;
		min-height: 87upx;
		padding: 12upx 0 0 12upx;
		box-sizing: border-box;

		image {
			width: 87upx;
			height: 87upx;
			border-radius: 18upx;
			min-width: 87upx;
		}

		view {
			box-sizing: border-box;
			padding-left: 10upx;

			.biao {
				padding: 2upx 10upx;
				background: #B7D0F8;
				border-radius: 4upx;
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				display: inline-block;
				// min-width: 100upx;
				text-align: center;
			}

			.textBiao {
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 40upx;
			}
		}
	}


	.h_box {
		// height: calc(100vh - 104upx);
		// position: fixed;
		// top: calc(104upx + 45px);
		// /* #ifdef H5 */
		// height:  calc(100vh - 104upx - 45px);
		// top: calc(104upx + 45px);
		// /* #endif */
	}
	
	
	
	.gczb_btn{
		width: 690rpx;
		height: 120rpx;
		margin-top: 20rpx;
	}
</style>
