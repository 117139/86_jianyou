<template>

	<view class="content">
		<!--bg_color="#ff0000"-->
		<topbar :have_top="true" bg_color="#F43B31">
			<text @click="back" style="color: #fff;" class="iconfont icon-back-line backIcon"></text>
			<text style="color: #fff;">正在服务</text>
			<text></text>
		</topbar>
		<view class="topBg">
			<image src="/static/images/lzc/biao/bg2.png" mode="scaleToFill"></image>
			<view class="topBody dis_flex aic ju_c">
				<text class="tbox2">已用时:</text>
				<text class="tbox1">{{hours<10?'0'+hours:hours}}</text>
				<text class="tbox2">时</text>
				<text class="tbox1">{{minute<10?'0'+minute:minute}}</text>
				<text class="tbox2">分</text>
				<text class="tbox1">{{second<10?'0'+second:second}}</text>
				<text class="tbox2">秒</text>
			</view>
			<view class="fl_body bs dis_flex">
				<view class="fl_body_item dis_flex_c aic ju_c bs">
					<text class="fw300 fs12 flb_text1">中标价格</text>
					<view>
						<text class="fwb fs18 flb_text2">3600.00</text>
						<text class="flb_text1 fs11">元</text>
					</view>
				</view>
				<view class="fl_body_item dis_flex_c aic ju_c bs">
					<text class="fw300 fs12 flb_text1">服务时长</text>
					<view>
						<text class="fwb fs18 flb_text2">38</text>
						<text class="flb_text1 fs11">天</text>
					</view>
				</view>
				<view class="fl_body_item dis_flex_c aic ju_c bs">
					<text class="fw300 fs12 flb_text1">竞标人数</text>
					<view>
						<text class="fwb fs18 flb_text2">8</text>
						<text class="flb_text1 fs11">人</text>
					</view>
				</view>
			</view>
		</view>
		<!--项目大概 -->
		<view class="AboutTheProject bs dis_flex_c">
			<view class="titleATP fs15 fwb">烟草经营许可证</view>
			<view class="textATP fs12">
				<text class="text1ATP">发布者:</text>
				<text>{{AboutTheProject.Publisher}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">联系信息:</text>
				<text>{{AboutTheProject.tel}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">信用评分:</text>
				<text>{{AboutTheProject.ren}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">办理地址:</text>
				<text>{{AboutTheProject.add}}</text>
			</view>
			<image class="sanjiao" src="/static/images/lzc/biao/fu.png" mode="heightFix"></image>
			<!-- <view class="sanjiao">
				<view class="sanjiao1" style="">
					<text class="text1">已完成</text>
				</view>
			</view> -->
			<!-- <div>
				<div class="topdirection"></div>
				<div style="margin:-50upx 0px 0px 90upx;transform: rotate(36deg);">重点</div>
			</div> -->

		</view>
		<!-- 项目进度 -->
		<view class="progress">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">项目进度</view>
			</view>
			<view class="pro_sl bs dis_flex aic ju_b">
				<view class="pro_sl_item bs dis_flex_c aic ju_c fs11">
					<text>2021.06.04</text>
					<text>选定服务者</text>
				</view>
				<view class="pro_sl_z dis_flex aic ju_c">
					<view class="pro_sl_hr dis_flex aic ju_c"></view>
					<text class="iconfont icon-link_lianjiedian"></text>
					<view style="border: 1px solid #fff;" class="pro_sl_hr dis_flex aic ju_c"></view>
				</view>
				<view class="pro_sl_item bs dis_flex_c aic ju_c fs11" style="background-color: #f8f8f8;color: #bbb;">
					<text>2021.06.04</text>
					<text>招标保证金</text>
				</view>
				<view class="pro_sl_z dis_flex aic ju_c">
					<view class="dis_flex aic ju_c"></view>
					<text style="color: #fff;" class="iconfont icon-link_lianjiedian"></text>
					<view class="dis_flex aic ju_c"></view>
				</view>
				<view class="pro_sl_item bs dis_flex_c aic ju_c fs11" style="background-color: #f8f8f8;color: #bbb;">
					<text>2021.06.04</text>
					<text>招标中</text>
				</view>
			</view>
		</view>
		<!-- 公司信息 -->
		<view class="CompanyInfo">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">公司信息</view>
			</view>
			<view class="cro_sl bs">
				<view class="textATP fs12">
					<text class="text1ATP">公司名称:</text>
					<text>{{CompanyInfo.name}}</text>
				</view>
				<view class="textATP fs12">
					<text class="text1ATP">注册时间:</text>
					<text>{{CompanyInfo.rtime}}</text>
				</view>
				<view class="textATP fs12">
					<text class="text1ATP">公司规模:</text>
					<text>{{CompanyInfo.scale}}</text>
				</view>
				<view class="textATP fs12">
					<text class="text1ATP">统一信用代码:</text>
					<text>{{CompanyInfo.idCard}}</text>
				</view>
				<view class="textATP fs12">
					<text class="text1ATP">注册地址:</text>
					<text>{{CompanyInfo.radd}}</text>
				</view>
				<view class="textATP fs12">
					<text class="text1ATP">注册资金:</text>
					<text>{{CompanyInfo.rprice}}</text>
				</view>
			</view>
		</view>
		<!-- 需求备注 -->
		<view class="demand">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">需求备注</view>
			</view>
			<view class="da_body bs">
				<text class="fw400 fs11">需要服务者尽快报价办理</text>
			</view>
		</view>
		<!-- 跟踪服务 -->
		<view class="demand dis_flex ju_b aic">
			<view class="pro_fl bs dis_flex aic" style="border: none;" @click="jump" :data-url="trackUrl">
				<view class="redGan"></view>
				<view class="redText">跟踪服务</view>
			</view>
			<text class="iconfont icon-arrow" style="font-size:20upx;color: #eee;margin-right: 23upx;"></text>
		</view>
		<!-- 中标服务者 -->
		<view class="WinningTheBid">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">中标服务者</view>
			</view>
			<view class="wtb_fl">
				<view class="wtb_view1 dis_flex ju_b aic" @click="jump" data-url="/pagesA_lzc/fuIndex/fuIndex">
					<view class="wtb_view1_left" >
						<image :src="getimg('/static/images/logo.png')" mode="aspectFill"></image>
					</view>
					<view class="wtb_view1_right">
						<view class="wtb_view1_right_fl dis_flex aic">
							<view>
								<text class="fs15">冯**</text>
								<text class="fs10">已中标</text>
							</view>
							<view class="flex-right">
								<text class="fw400 fs10">2021.12.15</text>
							</view>
						</view>
						<view class="wtb_view1_right_f2 dis_flex aic">
							<view class="dis_flex aic">
								<text>服务者评价</text>
								<uni-rate :size="starStyle.size" :readonly="starStyle.readonly"
									:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="9.0">
								</uni-rate>
								<text class="fen">9.0</text>
							</view>
						</view>
						<view class="wtb_view1_right_f3 dis_flex aic">
							<view class="dis_flex aic">
								<text class="fs12">服务者承诺:</text>
								<text class="fs10 oh1">每逾期4个工作日，扣除350.00元每逾期4个工作日</text>
							</view>
						</view>
					</view>
				</view>
				<view class="wtb_view2 dis_flex ju_b aic">
					<view class="wtb_view2_item fs10 fw400 dis_flex aic">
						<text>总锦标数量:</text>
						<text>20</text>
					</view>
					<view class="wtb_view2_item fs10 fw400 dis_flex aic ju_c">
						<text>总锦标数量:</text>
						<text>20</text>
					</view>
					<view class="wtb_view2_item fs10 fw400 dis_flex aic ju_c">
						<text>总锦标数量:</text>
						<text>20</text>
					</view>
				</view>
				<!-- <view class="wtb_view3 dis_flex ju_b aic">
					<view class="wtb_view3_item fs10 fw400 dis_flex aic">
						<text class="wtb_view3_item_text1">实际完成时间:</text>
						<text>2021.06.27</text>
					</view>
					<view class="wtb_view3_item fs10 fw400 dis_flex aic ju_c">
						<text class="wtb_view3_item_text2">实际用时:</text>
						<text>04天17小时</text>
					</view>
				</view> -->
				<!-- <view class="wtb_hr"></view> -->
				<!-- <view class="wtb_view4 dis_flex aic">
					<text class="fs12">客户评价</text>
					<uni-rate :size="starStyle.size" :readonly="starStyle.readonly" :allowHalf="starStyle.allowHalf"
						:margin="starStyle.margin" :value="9.0">
					</uni-rate>
					<text class="fen fs10">9.0</text>
				</view> -->
				<!-- <view class="wtb_view5 dis_flex aic">
					<text class="fs10 fw400 oh1">在平台上办理挺快的，也比较省心，很满意！</text>
				</view> -->
			</view>

		</view>
		<!-- 本期竞标服务者 -->
		<view class="theBidList">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">本期竞标服务者（3）</view>
			</view>
			<view class="wtb_view">
				<view class="wtb_view1 dis_flex ju_b aic" @click="jump" data-url="/pagesA_lzc/fuIndex/fuIndex">
					<view class="wtb_view1_left" >
						<image :src="getimg('/static/images/logo.png')" mode="aspectFill"></image>
					</view>
					<view class="wtb_view1_right">
						<view class="wtb_view1_right_fl dis_flex aic">
							<view>
								<text class="fs15">冯**</text>
							</view>
							<view class="flex-right">
								<text class="fw400 fs10">2021.12.15</text>
							</view>
						</view>
						<view class="wtb_view1_right_f2 dis_flex aic">
							<view class="dis_flex aic">
								<text>服务者评价</text>
								<uni-rate :size="starStyle.size" :readonly="starStyle.readonly"
									:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="9.0">
								</uni-rate>
								<text class="fen">9.0</text>
							</view>
						</view>
						<view class="wtb_view1_right_f3 dis_flex aic">
							<view class="dis_flex aic">
								<text class="fs12">服务者承诺:</text>
								<text class="fs10 oh1">每逾期4个工作日，扣除350.00元每逾期4个工作日</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="width: 750upx;height: 98upx;"></view>
		<view class="bfoot bs dis_flex aic ju_b">
			<view class="f_left dis_flex ju_b bs">
				<button class="dis_flex_c f_left_item aic ju_c" @click="share">
					<text class="iconfont icon-fenxiang"></text>
					<text class="fl_text">分享</text>
				</button>
				<button class="dis_flex_c f_left_item aic ju_c" @click.stop="guanClick">
					<text class="iconfont icon-guanzhu2"></text>
					<text class="fl_text">{{isGuan?'关注':'已关注'}}</text>
				</button>
				<button class="dis_flex_c f_left_item aic ju_c" @click.stop="jump" data-url="/pagesA_lzc/kefu/kefu">
					<text class="iconfont icon-fuwudingdanxiangqing-kefu"></text>
					<text class="fl_text">客服</text>
				</button>
			</view>
			<view class="f_right ju_c aic dis_flex" @click="jump" :data-url="SendTenderUrl">
				发布此类需求
			</view>
		</view>
	</view>
</template>

<script>
	import api from '../../components/service.js';
	import topbar from '@/components/top_bar/top_bar.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				isGuan:true,
				hours:4,
				minute:9,
				second:29,
				AboutTheProject: {
					Publisher: '**公司',
					tel: '151****1125',
					ren: 5,
					add: '天津梓龙乡'
				},
				CompanyInfo: {
					name: '**公司',
					rtime: '',
					scale: '',
					idCard: '',
					radd: '',
					rprice: ''
				},
				/* 星星样式 */
				starStyle: {
					size: 10,
					readonly: true,
					allowHalf: true,
					margin: 1
				},
				SendTenderUrl: '/pagesA_lzc/SendTender/SendTender',
				trackUrl: '/pagesA_lzc/track/track'

			}
		},
		onHide() {

		},
		onLoad() {
			that = this;
			setInterval(() => {
				this.second++;
				if(this.second == 60){
					this.second = 0;
					this.minute++;
					if(this.minute == 60){
						this.hours++;
					}
				}
			},1000)
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			guanClick(){
				this.isGuan = !this.isGuan;
			},
			share() {
				uni.shareWithSystem({
				  summary: '欢迎使用',
				  href: 'https://www.baidu.com/',
				  success(){
				    // 分享完成，请注意此时不一定是成功分享
				  },
				  fail(){
				    // 分享失败
				  }
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f8f8f8;
		width: 100vw;

		.topBg {
			width: 750upx;
			height: 176upx;
			background-position: center;
			background-size: cover;
			position: relative;

			image {
				width: 750upx;
				height: 176upx;
			}

			.topBody {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 750upx;

				.tbox1 {
					padding: 18upx 13upx;
					font-size: 40upx;
					font-family: Akzidenz-Grotesk BQ Condensed A;
					font-weight: bold;
					color: #F43B31;
					line-height: 23upx;
					background-color: #fff;
				}

				.tbox2 {
					padding: 18upx 13upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 23upx;
				}
			}

		}

		.fl_body {
			width: 690upx;
			height: 120upx;
			background-color: #fff;
			position: absolute;
			bottom: -90upx;
			z-index: 99;
			padding: 26upx 0upx;
			margin: 0 30upx;

			.fl_body_item {
				width: 33.3%;
				height: 100%;
				border-right: 1px solid #ccc;

				.flb_text1 {
					font-family: PingFang SC;
					color: #333333;
				}

				.flb_text2 {
					color: #F43B31;
				}
			}

			.fl_body_item:nth-child(3) {
				border-right: none;
			}
		}

		.AboutTheProject {
			width: 690upx;
			height: 266upx;
			margin: 110upx 30upx 0 30upx;
			background: #FFFFFF;
			border-radius: 10upx;
			padding: 22upx 24upx;
			position: relative;

			.titleATP {
				color: #333333;
			}

			.textATP {
				color: #666666;
				margin-top: 16upx;
				display: flex;
				align-items: center;
			}

			.text1ATP {
				margin-right: 0.5rem;
			}

			.topdirection {
				font-size: 0;
				width: 0;
				height: 0;
				line-height: 0;
				border-width: 136upx;
				border-style: solid;
				border-color: transparent transparent #A9DBF6 transparent;
				transform: rotate(180deg);
			}

			.sanjiao {
				width: 70upx;
				height: 70upx;
				position: absolute;
				top: 0;
				right: 0;

				.sanjiao1 {
					width: 136upx;
					height: 136upx;
					transform: rotate(360deg);
					position: absolute;
					top: -136upx;
					right: 0;
					border-left: 136upx solid green;
					border-top: 136upx solid transparent;
				}

				.text1 {
					position: absolute;
					top: 96upx;
					left: 690upx;
					transform: rotate(136deg);
					font-size: 20upx;
					font-weight: 400;
					background-color: #007AFF;
					z-index: 999999;
				}

			}

		}

		.progress {
			width: 690upx;
			height: 208upx;
			margin: 0 30upx;
			background-color: #fff;
			border-radius: 10upx;
			margin-top: 20upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.pro_sl {
				width: 100%;
				height: 137upx;
				padding: 0 24upx;

				.pro_sl_item {
					width: 157upx;
					height: 85upx;
					background: #FFAB0A;
					border-radius: 10upx;
					color: #fff;
				}

				.pro_sl_z {
					width: 96upx;
					height: 100%;
					.f33{
						color: #fff;
					}

					.pro_sl_hr {
						width: 35upx;
						height: 1px;
						border: 1px solid #FFAB0A;
					}

					.iconfont {
						color: #FFAB0A;
						font-size: 16upx;
						margin: 0 5upx;
					}
				}

			}
		}

		.CompanyInfo {
			width: 690upx;
			margin: 0 30upx;
			background-color: #fff;
			// border-radius: 10upx;
			margin-top: 20upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.cro_sl {
				width: 100%;
				height: 315upx;
				padding: 25upx 24upx;
			}
		}

		.demand {
			width: 690upx;
			margin: 0 30upx;
			background-color: #fff;
			// border-radius: 10upx;
			margin-top: 20upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.da_body {
				width: 100%;
				height: 84upx;
				padding: 0 30upx;
				color: #999999;
				line-height: 48upx;
			}
		}

		.WinningTheBid {
			width: 690upx;
			margin: 0 30upx;
			background-color: #fff;
			// border-radius: 10upx;
			margin-top: 20upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.wtb_fl {
				width: 100%;
				padding: 24upx;

				.wtb_view1 {
					width: 100%;
					// height: 126upx;

					.wtb_view1_left {
						width: 126upx;
						height: 126upx;
						border-radius: 10upx;

						image {
							width: 126upx;
							height: 126upx;
							border-radius: 10upx;
						}
					}

					.wtb_view1_right {
						width: 510upx;
						height: 100%;
						padding-left: 23upx;
						position: relative;

						.wtb_view1_right_fl {
							view:nth-child(1) {
								text:nth-child(1) {
									color: #333333;
								}

								text:nth-child(2) {
									display: inline-block;
									background: #FFB017;
									border-radius: 16upx;
									color: #FFFFFF;
									padding: 6upx 11upx;
									margin-left: 23upx;
								}
							}

							view:nth-child(2) {
								color: #bbb;
								position: absolute;
								right: 0;
							}
						}

						.wtb_view1_right_f2 {
							width: 100%;

							view:nth-child(1) {
								text:nth-child(1) {
									font-size: 24upx;
									font-family: PingFang SC;
									font-weight: 400;
									color: #666666;
									margin-right: 25upx;
								}

								.fen {
									font-size: 20upx;
									font-family: Arial;
									font-weight: 400;
									color: #F43B31;
									margin-left: 13upx;
								}
							}
						}

						.wtb_view1_right_f3 {
							view:nth-child(1) {
								font-family: PingFang SC;
								font-weight: 400;
								color: #666666;

								text:nth-child(1) {
									min-width: 5.5em;
								}

								text:nth-child(2) {
									// margin-left: 0.5rem;
								}
							}
						}
					}
				}

				.wtb_view2 {
					min-width: 583upx;
					max-width: 690upx;
					height: 21upx;
					margin-top: 17upx;

					.wtb_view2_item {
						width: 33.3%;
						height: 100%;
						color: #bbbbbb;
						border-right: 1px solid #eee;

						text:nth-child(1) {
							min-width: 5.5em;
						}
					}

					.wtb_view2_item:nth-child(1) {
						margin-left: 0rem;
					}

					.wtb_view2_item:nth-child(3) {
						border-right: 0px solid #eee;
					}

				}

				.wtb_view3 {
					width: 500upx;
					height: 21upx;
					margin-top: 17upx;

					.wtb_view3_item {
						width: 50%;
						height: 100%;
						color: #bbbbbb;
						border-right: 1px solid #eee;

						.wtb_view3_item_text1 {
							min-width: 6em;
						}

						.wtb_view3_item_text2 {
							min-width: 4em;
						}
					}

					.wtb_view3_item:nth-child(2) {
						border-right: 0px solid #eee;

						text:nth-child(1) {
							min-width: 5.5em;
						}
					}
				}

				.wtb_view4 {
					margin-top: 22upx;

					text:nth-child(1) {
						color: #666666;
						font-family: PingFang SC;
						margin-right: 23upx;
					}

					.fen {
						color: #F43B31;
						font-family: Arial;
						margin-left: 13upx;
					}
				}

				.wtb_view5 {
					margin-top: 18upx;

					text:nth-child(1) {
						font-family: PingFang SC;
						color: #BBBBBB;
					}
				}
			}

			.wtb_hr {
				width: 100%;
				height: 1px;
				background-color: #eee;
				margin-top: 19upx;
			}
		}

		.theBidList {
			width: 690upx;
			margin: 0 30upx;
			background-color: #fff;
			margin-top: 20upx;
			margin-bottom: 44upx;
		
			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}
		
			.wtb_view {
				width: 100%;
				padding: 0 24upx;
		
				.wtb_view1 {
					width: 100%;
					// height: 126upx;
					padding: 24upx 0 20upx 0;
					// border-bottom: 1px solid #eee;
		
					.wtb_view1_left {
						width: 126upx;
						height: 126upx;
						border-radius: 10upx;
		
						image {
							width: 126upx;
							height: 126upx;
							border-radius: 10upx;
						}
					}
		
					.wtb_view1_right {
						width: 510upx;
						height: 100%;
						padding-left: 23upx;
						position: relative;
		
						.wtb_view1_right_fl {
							view:nth-child(1) {
								text:nth-child(1) {
									color: #333333;
								}
		
								text:nth-child(2) {
									display: inline-block;
									background: #FFB017;
									border-radius: 16upx;
									color: #FFFFFF;
									padding: 6upx 11upx;
									margin-left: 23upx;
								}
							}
		
							view:nth-child(2) {
								color: #bbb;
								position: absolute;
								right: 0;
							}
						}
		
						.wtb_view1_right_f2 {
							width: 100%;
		
							view:nth-child(1) {
								text:nth-child(1) {
									font-size: 24upx;
									font-family: PingFang SC;
									font-weight: 400;
									color: #666666;
									margin-right: 25upx;
								}
		
								.fen {
									font-size: 20upx;
									font-family: Arial;
									font-weight: 400;
									color: #F43B31;
									margin-left: 13upx;
								}
							}
						}
		
						.wtb_view1_right_f3 {
							view:nth-child(1) {
								font-family: PingFang SC;
								font-weight: 400;
								color: #666666;
		
								text:nth-child(1) {
									min-width: 5.5em;
								}
		
								text:nth-child(2) {
									// margin-left: 0.5rem;
								}
							}
						}
					}
				}
			}
		
		}

		.bfoot {
			width: 750upx;
			// height: 98upx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			padding: 10upx 31upx;
			// bottom: 0;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			box-sizing: border-box;
		
			.f_right {
				// min-width: 376upx;
				width: 100%;
				height: 78upx;
				background: #F43B31;
				border-radius: 39upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 23upx;
			}
		
			.f_left {
				width: 100%;
				height: 100%;
				padding-right: 78upx;
				color: #666666;
		
				.f_left_item {
					min-width: 100upx;
		
					.icon-fenxiang {
						font-size: 31upx;
					}
		
					.icon-guanzhu2 {
						font-size: 31upx;
					}
		
					.icon-fuwudingdanxiangqing-kefu {
						font-size: 31upx;
					}
		
					.fl_text {
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 23upx;
					}
		
				}
			}
		}
	}

	// /deep/.dh_top[data-v-67478258] {
	// 	height: 315upx !important;
	// 	display: inline-block;

	// 	image {
	// 		width: 750upx;
	// 		height: 315upx;
	// 	}
	// }
	/deep/.dh_top_box[data-v-67478258] {
		justify-content: center;

		.backIcon {
			position: absolute;
			left: 30upx;
		}

		text {
			color: #FFFFFF;
		}
	}

	/* 页面公共样式 */
	.redGan {
		width: 5upx;
		height: 26upx;
		background: #F43B31;
	}

	.redText {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 48upx;
		margin-left: 10upx;
	}

	.titleATP {
		color: #333333;
	}

	.textATP {
		color: #666666;
		margin-top: 16upx;
		display: flex;
		align-items: center;
	}

	.text1ATP {
		margin-right: 0.5rem;
	}

	button {
		background-color: #fff;
		line-height: 1;
		padding-left: 0;
	}
</style>
