<!-- 交易市场 -->
<template>

	<view class="index">
		<!-- 自定义导航 -->
		<topbar bg_color="#F43B31" have_top="false">
			<view class="topbar">
				<view class="top_fl dis_flex aic ju_b">
					<view class="tfl_left dis_flex aic">

					</view>
					<view class="tfl_center fs16">
						交易市场
					</view>
					<view class="tfl_right dis_flex ju_b aic">
						<view class="" style="position: relative;">
							<text @click="jump" :data-url="newUrl" class="iconfont icon-pinglun"></text>
							<view class="dian"></view>
						</view>
						<button @click="jump" :data-url="kefuUrl"
							class="iconfont icon-fuwudingdanxiangqing-kefu"></button>
					</view>
				</view>
			</view>
		</topbar>
		<view class="fixed dis_flex" style="width: 750upx;background-color: #F43B31;z-index: 99999;">
			<view class="searchView dis_flex aic" @click="jump" data-url="/pagesA_lzc/shopSearch/shopSearch">
				<text style="color: #999;font-size: 28upx;" class="iconfont icon-sousou"></text>
				<text class="fs12 fw400" style="color: #ddd;margin-left: 7upx;">请输入您需要的内容</text>
			</view>
		</view>
		<view class="" style="width: 750upx;height: 50upx;background-color:#F43B31;"></view>
		<view class="indexBody">
			<swiper :indicator-dots="false" :autoplay="false" :interval="3000" @change="bannerChange" :duration="1000">
				<swiper-item v-for="item,index in swiperList" :key="index">
					<view class="swiper-item">
						<view class="">
							<image :src="getimg(item.img)" mode="aspectFill"
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
				<image :src="getimg('/static/images/lzc/index/wanq.png')" mode="widthFix"></image>
				<view class="gunText dis_flex aic">
					<uni-notice-bar :background-color="uniNoticeBarAtt.background"
						:scrollable="uniNoticeBarAtt.scrollable" :color="uniNoticeBarAtt.color" single="true"
						style="margin:  10upx 0;" :text="uniNoticeBarAtt.text">
					</uni-notice-bar>
				</view>
			</view>
			<!-- 热门推荐 -->
			<view class="hotView">
				<!-- 热门推荐 -->
				<view class="hotView_l hotView_fl bs dis_flex_c ju_c">
					<uni-swiper-dot :info="htList" :current="current" class="uniSwiperDot" mode="round"
						:dotsStyles="bannerDotsStyles">
						<swiper @change="bannerChange" class="dis_flex aic">
							<swiper-item class="hsl dis_flex ju_b" :key="index" v-for="(item,index) in hzList">
								<view class="hsl_item dis_flex_c ju_c aic" @click.stop="jump"
									data-url="/pages/circle/circle" data-type=2 v-for="(item1,index1) in item"
									:key="index1">
									<image :src="getimg(item1.img)" mode="aspectFit"></image>
									<text class="hsl_text">{{item1.text}}</text>
								</view>
							</swiper-item>
						</swiper>
					</uni-swiper-dot>
				</view>
			</view>

			<!-- 交易市场 -->
			<view class="jiaoView bs">
				<view class="commfl dis_flex ju_b aic">
					<view class="commfll bs dis_flex aic"
						style="background: linear-gradient(90deg, #FF1818 0%, #FF6B5F 100%)">
						<text>资质出售</text>
					</view>
					<view class="commflr bs dis_flex aic" @click.stop="jump" data-url="/pagesA_lzc/shopList/shopList">
						<text>更多</text>
						<text class="iconfont icon-arrow"></text>
					</view>
				</view>
				<view class="jvsl" @click.stop="jump" :data-url="tmd_url">
					<view class="jvslView dis_flex ju_b bs">
						<view class="jvsl_fl dis_flex aic">
							<image src="/static/images/logo.png" mode="widthFix"></image>
							<text class="tel">{{getTel(15135725603)}}</text>
						</view>
						<view class="jvsl_fr dis_flex aic">
							<text class="iconfont icon-yanjing"></text>
							<text class="tel">256</text>
							<text class="tel">浏览</text>
						</view>
					</view>
					<view class="jvsl_sl dis_flex">
						<image :src="getimg('/static/images/logo.png')" mode="heightFix"></image>
						<view class="jvsl_slr bs">
							<view class="dis_flex">
								<view class="biao dis_flex ju_c aic">
									<text>普通公司</text>
								</view>
								<view class="jvsl_slr_title oh1">
									<text>南京某某商贸有限公司 低价转让</text>
								</view>
							</view>
							<!-- <view class="jvsl_slr_title">
								<text>已下证</text>
							</view> -->
						</view>
					</view>
					<!-- 标签 -->
					<view class="myTag bs dis_flex aic">
						<view class="tagItem">
							<text>可议价</text>
						</view>
						<view class="tagItem">
							<text>可议价</text>
						</view>
						<view class="tagItem">
							<text>可议价</text>
						</view>
						<view class="tagItem">
							<text>可议价</text>
						</view>
					</view>
					<!-- 基本属性 -->
					<view class="flex flex-between pl10  pr10">
						<view class="flex flex-col  pt10 lh13">
							<view class="">
								<text class=" fs12 " style="color: #DDDDDD;">组合类型：</text>
								<text class="fs12 c9">中文+拼音</text>
							</view>
							<view class="">
								<text class=" fs12 " style="color: #DDDDDD;">商标类型：</text>
								<text class="fs12 c9">R标</text>
							</view>
					
						</view>
						<view class="flex flex-col pt10 lh13">
							<view class="">
								<text class=" fs12 " style="color: #DDDDDD;">网店类目：</text>
								<text class="fs12 c9">家装家具</text>
							</view>
							<view class="">
								<text class=" fs12 " style="color: #DDDDDD;">创店时间：</text>
								<text class="fs12 c9">2021-12-11</text>
							</view>
											
						</view>
						</view>
					<view class="price bs">
						<text style="font-size: 36upx;font-weight: bold;">19.00</text>
						<text style="font-size: 24upx;">万</text>
					</view>
				</view>
			</view>
			<!-- 资质求购 -->
			<view class="qiuView bs">
				<view class="qfl dis_flex ju_b aic">
					<view class="qfll bs dis_flex aic">
						<text>资质求购</text>
					</view>
					<view class="qflr bs dis_flex aic">
						<text>更多</text>
						<text class="iconfont icon-arrow"></text>
					</view>
				</view>
				<sbItemLzc :searchList="searchList" isShou="交易"></sbItemLzc>
			</view>
			<!-- 资质转让 -->
			<view class="jiaoView bs">
				<view class="commfl dis_flex ju_b aic">
					<view class="commfll bs dis_flex aic"
						style="background: linear-gradient(90deg, #F28E26 0%, #FD644F 100%)">
						<text>资质转让</text>
					</view>
					<view class="commflr bs dis_flex aic" @click="jump" :data-url="tmd_url">
						<text>更多</text>
						<text class="iconfont icon-arrow"></text>
					</view>
				</view>
				<view class="jvsl" @click="jump" :data-url="tmd_url">
					<view class="jvslView dis_flex ju_b bs">
						<view class="jvsl_fl dis_flex aic">
							<image src="/static/images/logo.png" mode="widthFix"></image>
							<text class="tel">{{getTel(15135725603)}}</text>
						</view>
						<view class="jvsl_fr dis_flex aic">
							<text class="iconfont icon-yanjing"></text>
							<text class="tel">256</text>
							<text class="tel">浏览</text>
						</view>
					</view>
					<view class="jvsl_sl dis_flex">
						<image :src="getimg('/static/images/logo.png')" mode="heightFix"></image>
						<view class="jvsl_slr bs">
							<view class="dis_flex">
								<view class="biao dis_flex ju_c aic">
									<text>普通公司</text>
								</view>
								<view class="jvsl_slr_title oh1">
									<text>南京某某商贸有限公司 低价转让</text>
								</view>
							</view>
							<view class="jvsl_slr_title">
								<text>已下证</text>
							</view>
						</view>
					</view>
					<!-- 标签 -->
					<view class="myTag bs dis_flex aic">
						<view class="tagItem">
							<text>可议价</text>
						</view>
						<view class="tagItem">
							<text>可议价</text>
						</view>
						<view class="tagItem">
							<text>可议价</text>
						</view>
						<view class="tagItem">
							<text>可议价</text>
						</view>
					</view>
					<!-- 基本属性 -->
					<view class="flex flex-between pl10  pr10">
						<view class="flex flex-col  pt10 lh13">
							<view class="">
								<text class=" fs12 " style="color: #DDDDDD;">组合类型：</text>
								<text class="fs12 c9">中文+拼音</text>
							</view>
							<view class="">
								<text class=" fs12 " style="color: #DDDDDD;">商标类型：</text>
								<text class="fs12 c9">R标</text>
							</view>
					
						</view>
						<view class="flex flex-col pt10 lh13">
							<view class="">
								<text class=" fs12 " style="color: #DDDDDD;">网店类目：</text>
								<text class="fs12 c9">家装家具</text>
							</view>
							<view class="">
								<text class=" fs12 " style="color: #DDDDDD;">创店时间：</text>
								<text class="fs12 c9">2021-12-11</text>
							</view>
											
						</view>
						</view>
					<view class="price bs">
						<text style="font-size: 36upx;font-weight: bold;">19.00</text>
						<text style="font-size: 24upx;">万</text>
					</view>
				</view>
			</view>
			<view class="dis_flex ju_c aic" style="padding-top: 31upx;">
				<text class="fs10 fw400" style="color: #bbb;">没有更多内容了亲～</text>
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../components/service.js';
	import topbar from '@/components/top_bar/top_bar.vue'
	import tel from '@/components/data.js'
	import newsItemLzc from '@/components/news_item_lzc/news_item_lzc.vue'
	import sbItemLzc from '@/components/sbItemLzc/sbItemLzc.vue'
	import uniSwiperDot from '@/components/uni-swiper-dot/uni-swiper-dot.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			topbar,
			newsItemLzc,
			sbItemLzc,
			uniSwiperDot
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
				kefuUrl: '/pagesA_lzc/kefu/kefu',
				/* 服务者主页地址 */
				fu_index_url: '/pagesA_lzc/fuIndex/fuIndex',
				/* 交易市场详情页 */
				tmd_url: '/pagesA_lzc/TradingMarketD/TradingMarketD',
				// 服务者列表
				fulist_url: '/pagesA_lzc/fuList/fuList',
				//消息页面
				newUrl: '/pagesA_lzc/news/news',
				uniNoticeBarAtt: {
					text: '用户152****916刚刚发布了店铺出售信息',
					background: '#f8f8f8',
					color: '#666666',
					scrollable: true
				},
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
				current: 2,
				navList: [{
						id: 1,
						text: '交易市场',
						url: ''
					},
					{
						id: 2,
						text: '招标市场',
						url: ''
					},
					{
						id: 3,
						text: '往期成交',
						url: '/pagesA_lzc/biao1/biao1'
					}
				],
				bannerConfig: {
					mode: 'round',
					dotsStyles: {

					}
				},
				swiperList: [{
						img: 'https://img0.baidu.com/it/u=2186694782,2058262177&fm=26&fmt=auto&gp=0.jpg',
					},
					{
						img: 'https://img0.baidu.com/it/u=2186694782,2058262177&fm=26&fmt=auto&gp=0.jpg',
					},
					{
						img: 'https://img0.baidu.com/it/u=2186694782,2058262177&fm=26&fmt=auto&gp=0.jpg',
					}

				],
				htList: [
					[{
							img: '/static/images/lzc/index/gongsi_.png',
							text: '企业注册'
						},
						{
							img: '/static/images/lzc/index/zi.png',
							text: '资质转让'
						},
						{
							img: '/static/images/lzc/index/tuoguan.png',
							text: '资质托管'
						},
						{
							img: '/static/images/lzc/index/gongsi2.png',
							text: '普通公司'
						},
						{
							img: '/static/images/lzc/index/gongsi_.png',
							text: '商标转让'
						}
					]
				],
				hzList: [
					[{
							img: '/static/images/lzc/index/gongsi_.png',
							text: '企业注册'
						},
						{
							img: '/static/images/lzc/index/zi.png',
							text: '资质转让'
						},
						{
							img: '/static/images/lzc/index/tuoguan.png',
							text: '资质托管'
						},
						{
							img: '/static/images/lzc/index/gongsi2.png',
							text: '普通公司'
						},
						{
							img: '/static/images/lzc/index/gongsi_.png',
							text: '商标转让'
						}
					],
					[{
							img: '/static/images/lzc/index/gongsi_.png',
							text: '企业注册'
						},
						{
							img: '/static/images/lzc/index/zi.png',
							text: '资质转让'
						},
						{
							img: '/static/images/lzc/index/tuoguan.png',
							text: '资质托管'
						},
						{
							img: '/static/images/lzc/index/gongsi2.png',
							text: '普通公司'
						},
						{
							img: '/static/images/lzc/index/gongsi_.png',
							text: '商标转让'
						}
					]
				],
				myBidding: {
					jiaoEnd: 13562,
					jiao: 6656,
					fu: 117568,
					myBiddingList: [{
						type: '许可证办理',
						title: '烟草经营许可证',
						star: 5,
						add: '山东省济南市历下区',
						time: ' 04小时12分',
						pirce: 19000,
						BiddingNum: [{
								hpic: '/static/images/logo.png'
							},
							{
								hpic: '/static/images/logo.png'
							},
							{
								hpic: '/static/images/logo.png'
							}

						],
						liuNum: 256
					}, {
						type: '许可证办理',
						title: '烟草经营许可证',
						star: 5,
						add: '山东省济南市历下区',
						time: ' 04小时12分',
						pirce: 19000,
						BiddingNum: [{
								hpic: '/static/images/logo.png'
							},
							{
								hpic: '/static/images/logo.png'
							},
							{
								hpic: '/static/images/logo.png'
							}

						],
						liuNum: 256
					}]
				},
				newsNavS: [{
						text: '服务攻略',
						isActive: true
					},
					{
						text: '服务攻略',
						isActive: false
					},
					{
						text: '服务攻略',
						isActive: false
					},
					{
						text: '服务攻略',
						isActive: false
					},
					{
						text: '服务攻略',
						isActive: false
					},
					{
						text: '服务攻略',
						isActive: false
					}
				],
				zList: [{
						img: '/static/images/logo.png',
						cont: '天猫店铺违规扣分，对参与活动有什么影响？天猫店铺违规扣分，对参与活动有什么影响？天猫店铺违规扣分，对参与活动有什么影响？',
						time: '2021-05-27',
						num: 289
					},
					{
						img: '/static/images/logo.png',
						cont: '天猫店铺违规扣分，对参与活动有什么影响？天猫店铺违规扣分，对参与活动有什么影响？天猫店铺违规扣分，对参与活动有什么影响？',
						time: '2021-05-27',
						num: 289
					}
				],
				searchList: [{
						img: '/static/images/logo.png',
						type: '普通公司',
						title: '求购一家19年成立的科技类公司',
						hpic: '/static/images/logo.png',
						tel: '15135725603',
						price: 1.812
					},
					{
						img: '/static/images/logo.png',
						type: '普通公司',
						title: '求购一家19年成立的科技类公司',
						hpic: '/static/images/logo.png',
						tel: '15135725603',
						price: 1.812
					},
					{
						img: '/static/images/logo.png',
						type: '普通公司',
						title: '求购一家19年成立的科技类公司',
						hpic: '/static/images/logo.png',
						tel: '15135725603',
						price: 1.812
					}
				],
				jiaoViewNav: [{
						text: '交易市场',
						active: true
					},
					{
						text: '往期提交',
						active: false
					}
				]
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			jump(e) {
				return api.jump(e)
			},
			getTel(phone) {
				return tel.tel(phone);
			},
			bannerChange(e) {
				this.current = e.detail.current;
			},
			jiaoTab(index) {
				for (let i = 0; i < this.jiaoViewNav.length; i++) {
					if (i == index) {
						this.jiaoViewNav[i].active = true;
					} else {
						this.jiaoViewNav[i].active = false;
					}
				}
			},
			newsNavClick(index) {
				console.log(index)
				for (let i = 0; i < this.newsNavS.length; i++) {
					if (i == index) {
						this.newsNavS[i].isActive = true;
					} else {
						this.newsNavS[i].isActive = false;
					}
				}
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("/static/css/lzc/commin.scss");
	
	.index {
		padding-bottom: 20upx;
		background-color: #F43B31;
	}

	.topbar {
		width: 100%;
		height: 100%;
		position: relative;

		.top_fl {
			width: 100%;
			height: 60upx;

			.tfl_left {
				width: 113upx;
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
				color: #fff;
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

		.top_sl {
			width: 100%;
			height: 104upx;

			.indexView {
				width: 200upx;
				height: 100%;

				.indexView2 {
					position: relative;
					height: 100%;
					width: 65upx;

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
	}

	.indexBody {
		width: 750upx;
		position: relative;
		background-color: #f8f8f8;
		top: 70upx;
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



		.hotView {
			width: 690upx;
			height: 172upx;
			background-color: #FFFFFF;
			border-radius: 10upx;


			.hotView_l {
				width: 690upx;
				height: 172upx;
				// padding: 20upx 19upx 27upx 0;

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
					box-sizing: border-box;


					.hsl_item {
						height: 146upx;
						margin-top: 24upx;

						image {
							height: 41upx;
							width: 40upx;
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



		.jiaoView {
			width: 690upx;
			// height: 1334upx;
			background-color: #FFFFFF;
			margin-top: 24upx;
			// padding: 0 25upx;
			padding-top: 24upx;
			padding-bottom: 19upx;

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
				margin: 18upx;

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
					height: 35upx;
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
				padding: 0 18upx;
				border-bottom: 1px solid #eee;

				.bll_fl {
					position: relative;

					// border-bottom: 1px solid #eee;
					.bll_fl_fc {
						height: 36upx;
						background-color: #FFB017;
						border-radius: 4upx;
						padding: 7upx 11upx;
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}

					.bll_fl_sc {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 40upx;
						margin-left: 18upx;
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
					width: 690upx;
					margin-top: 23upx;
					position: relative;

					.bll4_left {
						width: 50%;
						height: 100%;

						view:nth-child(1) {
							width: 100%;
							margin-left: 20upx;

							image {
								width: 40upx;
								height: 40upx;
								border-radius: 50%;
								margin-left: -20upx;
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

			.eslView {
				width: 100%;
				height: 338upx;
				padding: 0 63upx;

				/deep/.uni-swiper-wrapper {
					height: 338upx;
				}

				/deep/.uni-swiper__dots-box[data-v-039811b8] {
					z-index: 9999999;
					height: 6upx;
				}

				/deep/ uni-swiper {
					height: 100upx !important;
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
				margin-left: 18upx;
				margin-bottom: 20upx;

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
				}

				.itemActive {
					color: #000;
				}
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
				padding-right: 19upx;

				.iconfont {
					font-size: 15upx;
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

	.searchView {
		width: 690upx;
		height: 60upx;
		background: #fff;
		border-radius: 30upx;
		// margin: 37upx 22upx 0 22upx;
		// position: absolute;
		// bottom: 22upx;
		margin: 37upx 30upx 22upx 30upx;
		padding-left: 34upx;
		box-sizing: border-box;

	}

	.myC3 {
		color: #333;
	}

	/deep/.dh_top {
		// height: 218upx !important;
	}

	/deep/.dh_top_box {
		// height: 185upx !important;
		// padding-top: 10upx;
		// box-sizing: border-box;
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
	button {
		background-color: rgba($color: #ffffff, $alpha:0);
		margin: 0;
		padding: 0;
	}
</style>
