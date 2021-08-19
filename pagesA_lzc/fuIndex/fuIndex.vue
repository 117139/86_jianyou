<template>

	<view class="content">
		<!-- <view class="">
			<image 
			style="width: 750upx;height: 337upx;position: fixed;"
			src="/static/images/lzc/fuIndex/bg.png" mode="aspectFill"></image>
		</view> -->
		<!-- <topbar :have_top="true">
			<text style="color: #fff;" @click="back" class="iconfont icon-back-line backIcon"></text>
			<text style="color: #fff; font-size: 32upx;">服务者主页</text>
			<text></text>
		</topbar> -->
		<view class="tbar">
			<view class="tabCart bs">
				<view class="tbci dis_flex aic">

					<image :src="getimg(shuju.img)" mode="aspectFill" class="tb_img"></image>
					<view class="tbci_view dis_flex_c">
						<view class="tbci_name">{{shuju.nick}}</view>
						<view class="tbci_sl dis_flex ju_b aic">
							<text class="tbci_left">综合评分</text>
							<rate :size="starStyle.size" :readonly="starStyle.readonly" :allowHalf="starStyle.allowHalf"
								:margin="starStyle.margin" :value="shuju.star"></rate>
							<text class="tbci_right">{{shuju.star}}</text>
						</view>
					</view>
				</view>
			</view>
		</view>
		<!-- 自定义导航栏 -->
		<!-- <topbar :bg_img="getimg('/static/images/lzc/fuIndex/bg.png')" text_color="#000" :have_top="true">
			<view class="tbView bs dis_flex_c aic">
				<view class="tbar dis_flex aic ju_c">
					<text style="color: #fff;" @click="back" class="iconfont icon-back-line backIcon"></text>
					<text style="color: #fff;">服务者主页</text>
				</view>
				<view class="tabCart bs">
					<view class="tbci dis_flex aic">
						<image src="/static/images/logo.png" mode="widthFix" class="tb_img"></image>
						<view class="tbci_view dis_flex_c">
							<view class="tbci_name">成**</view>
							<view class="tbci_sl dis_flex ju_b aic">
								<text class="tbci_left">综合评分</text>
								<rate :size="starStyle.size" :readonly="starStyle.readonly"
									:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="9.6"></rate>
								<text class="tbci_right">9.6</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</topbar> -->

		<!-- 导航 -->
		<view class="fuIndex_nav bs dis_flex ju_b">
			<view class="fuIndex_nav_item dis_flex_c aic ju_c">
				<image src="/static/images/lzc/fuIndex/1.png" mode="aspectFit"></image>
				<text class="fni_text1">总投标数量</text>
				<text class="fni_text2">{{shuju.view}}单</text>
			</view>
			<view class="fuIndex_nav_item dis_flex_c aic ju_c">
				<image src="/static/images/lzc/fuIndex/2.png" mode="aspectFit"></image>
				<text class="fni_text1">总中标数量</text>
				<text class="fni_text2">{{shuju.bidding_view}}单</text>
			</view>
			<view class="fuIndex_nav_item dis_flex_c aic ju_c">
				<image src="/static/images/lzc/fuIndex/fuwu-3.png" mode="aspectFit"></image>
				<text class="fni_text1">总服务数量</text>
				<text class="fni_text2">{{shuju.win_view}}单</text>
			</view>
			<view class="fuIndex_nav_item dis_flex_c aic ju_c">
				<image src="/static/images/lzc/fuIndex/shuliang.png" mode="aspectFit"></image>
				<text class="fni_text1">当前服务数量</text>
				<text class="fni_text2">{{shuju.now_view}}单</text>
			</view>
		</view>
		<!-- 个人简介 -->
		<view class="geRen bs">
			<view class="dis_flex aic">
				<view class="redGan"></view>
				<text class="titleRed">个人简介</text>
			</view>
			<view class="tajf gbody" :class="{'oh3':isShowQuan}">
				<text>{{shuju.content}}</text>
			</view>
			<view class="gfoot dis_flex aic ju_c" @click="showQuan">
				<text v-if="isShowQuan">查看全部</text>
				<text v-else>取消</text>
			</view>
		</view>
		<!-- 服务领域 -->
		<view class="ServiceArea bs">
			<view class="dis_flex aic">
				<view class="redGan"></view>
				<text class="titleRed">服务领域</text>
			</view>
			<view class="sa_body dis_flex aic" style="flex-wrap: wrap;">
				<view class="sa_body_item bs" v-for="item in shuju.service.split(',')">{{item}}</view>
			</view>
		</view>
		<!-- 个人资料 -->
		<view class="personal_data bs">
			<view class="dis_flex aic">
				<view class="redGan"></view>
				<text class="titleRed">个人资料</text>
			</view>
			<view class="personal_data_view dis_flex_c flex-left">
				<view class="pdi" style="margin-top: 20upx;">
					<text class="pd_text1">年龄:</text>
					<text class="pd_text1 pd_text3">{{shuju.age}}</text>
				</view>
				<view class="pdi">
					<text class="pd_text1">性别:</text>
					<text class="pd_text1 pd_text3">{{shuju.sex}}</text>
				</view>
				<view class="pdi">
					<text class="pd_text1">从业开始时间:</text>
					<text class="pd_text1 pd_text3 pd_text2">{{shuju.start_time.split('-')[0]}}</text>
					<text>年</text>
				</view>
				<view class="pdi">
					<text class="pd_text1">地区:</text>
					<text class="pd_text1 pd_text3">{{shuju.address}}</text>
				</view>
				<view class="pdi">
					<text class="pd_text1">订单交易金额:</text>
					<text class="pd_text1 pd_text3 pd_text2">{{shuju.total_price}}</text>
					<text>元</text>
				</view>
			</view>
		</view>
		<!-- 已完成订单 -->
		<view class="CompletedOrder bs">
			<view class="dis_flex aic">
				<view class="redGan"></view>
				<text class="titleRed">已完成订单</text>
			</view>
			<view v-if="pinList.data.length>0" class="co_nav">
				<view class="co_nav_item bs" :class="{'co_nav_item_active':activeOne==1,'co_nav_item_no':activeOne!=1}"
					@click="navListClick(1)">全部({{pinList.total}})</view>
				<view class="co_nav_item bs" :class="{'co_nav_item_active':activeOne==2,'co_nav_item_no':activeOne!=2}"
					@click="navListClick(2)">好评({{pinList.goods_num}})</view>
				<view class="co_nav_item bs" :class="{'co_nav_item_active':activeOne==3,'co_nav_item_no':activeOne!=3}"
					@click="navListClick(3)">中评({{pinList.middle_num}})</view>
				<view class="co_nav_item bs" :class="{'co_nav_item_active':activeOne==4,'co_nav_item_no':activeOne!=4}"
					@click="navListClick(4)">差评({{pinList.negative_num}})</view>
			</view>
			<view class="co_body bs" @click.stop="jump" :data-url="`/pagesA_lzc/biao1/biao1?id=${item.orderid}`"  
				 v-for="(item,index) in pinList.data" :key="index" v-if="pinList.data.length>0">
				<view class="co_body_fl bs dis_flex ju_b">
					<image class="cbf_img" :src="getimg(item.pimg)" mode="aspectFill"></image>
					<view class="cbf_view bs dis_flex ju_b aic">
						<view class="cdf_left fw400 dis_flex_c ju_c flex-left">
							<text class="cdf_gs">{{item.ptitle}}</text>
							<text class="cdf_tit">{{item.title}}</text>
						</view>
						<view class="cdf_right fw400">
							<view class="cdf_gs dis_flex flex-right"><text class="">{{item.create_time}}</text></view>
							<view class="dis_flex aic flex-right">
								<rate :size="starStyle.size" :readonly="starStyle.readonly"
									:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="item.star"></rate>
								<text class="pingNum" style="">{{item.star}}</text>
							</view>

						</view>
					</view>
				</view>
				<view class="co_body_sl bs dis_flex ju_b aic">
					<view class="co_body_sll">
						<text class="leftText">完成周期:</text>
						<text class="rightText">{{item.continued_time}}天</text>
					</view>
					<view class="co_body_slr">
						<text class="leftText">完成价格:</text>
						<text class="leftText">￥</text>
						<text class="rightText">{{item.price}}</text>
					</view>
				</view>
				<view class="co_body_ll bs dis_flex aic">
					<text>{{item.content}}</text>
				</view>
				<view class="co_body_hr"></view>
			</view>
			<view class="zanwu" v-if="pinList.data.length==0">暂无订单</view>
			<view class="zanwu" v-if="last_page&&pinList.data.length!=0">到底了</view>
		</view>
		
	</view>
</template>

<script>
	import service from '../../components/service.js';
	import topbar from '@/components/top_bar/top_bar.vue'
	import rate from '@/components/uni-rate/uni-rate.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			topbar,
			rate
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
				isShowQuan: true,
				shuju: {},
				myId: 0,
				activeOne: 1,
				pinList:{},
				page:1,
				limit:10,
				moreTrue:false,
				last_page:false

			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			if (option.id) {
				that.myId = option.id;
			}
			that.getData()
			that.getOrder()
		},
		onShow() {

		},
		onReachBottom() {
			console.log("触底了")
			that.getOrder();
		},
		onPullDownRefresh() {
			that.page = 1;
			that.getData();
			that.getOrder();
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			navListClick(index) {
				console.log(index)
				that.activeOne = index;
				that.page = 1;
				that.getOrder();
			},
			showQuan() {
				this.isShowQuan = !this.isShowQuan;
			},
			getData() {
				var turl = "user/service_detail";
				var data = {
					id: that.myId
				}
				service.P_post(turl, data).then(res => {
					console.log(res.data)
					if (res.code == 1) {
						that.shuju = res.data;
					} else {
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
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})

			},
			getOrder() {
				if(that.moreTrue){
					return
				}
				that.moreTrue = true;
				var turl = "user/service_order";
				var data = {
					id: that.myId,
					page:that.page,
					limit:that.limit,
					type:that.activeOne
				}
				uni.showLoading({
					mask: true,
					title: '正在获取数据'
				})
				service.P_post(turl, data).then(res => {
					console.log(res)
					if (res.code == 1) {
						that.pinList = res.data;
						var data = res.data.data;
						if(that.page == 1){
							that.moreTrue = false;
							that.pinList.data = data;
							if(data.length>0){
								that.page++
							}
						}else{
							that.moreTrue = false;
							if(data.length!=0){
								for (var i = 0; i < data.length; i++) {
									that.pinList.data.push(data[i])
								}
								that.page++
							}else{
								that.last_page = true;
								console.log("没有了")
							}
						}
					} else {
						that.moreTrue = false;
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
					that.moreTrue = false;
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	@import url("/static/css/lzc/commin.scss");

	page {
		background-color: #fff;
		width: 100vw;
		height: 100vh;
		margin: 0;
		padding: 0;
	}

	.tbar {
		width: 750upx;
		height: 220upx;
		background-image: url(../../static/images/lzc/fuIndex/bg.png);
		background-position: center;
		background-size: cover;
		position: relative;
	}

	.tabCart {
		width: 690upx;
		height: 151upx;
		background: #FFFFFF;
		border-radius: 20upx 20upx 0 0;
		position: absolute;
		bottom: 0;
		left: 30upx;
		right: 30upx;
		padding: 0upx 0 44upx 44upx;

		.tbci {
			width: 100%;
			height: 100%;

			.tb_img {
				flex: none;
				width: 146upx;
				height: 146upx;
				border-radius: 50%;
				margin-top: -58upx;
			}

			.tbci_view {
				width: 100%;
				height: 100%;
				padding-right: 169upx;
				padding-left: 43upx;

				.tbci_name {
					font-size: 32upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
				}

				.tbci_sl {
					width: 100%;
					height: 100%;

					.icon-Starmarker {
						margin-right: 0.25rem;
					}

					.tbci_left {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.tbci_right {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #F43D32;
					}
				}
			}
		}
	}


	.content {
		background-color: #fff;
		width: 100vw;
		min-height: 100vh;
		margin: 0;
		padding: 0;

		.tbView {
			// background: linear-gradient(0deg, #F43B31 0%, #F86F64 100%);
			width: 100%;
			height: 236upx;
			z-index: 1000;
			// padding: 36upx 22upx 0 22upx;
			position: relative;

			.tbar {
				width: 100%;
				position: relative;

				.backIcon {
					position: absolute;
					left: 31upx;
					width: 50upx;
					height: 100%;
				}
			}

			.tabCart {
				width: 690upx;
				height: 151upx;
				background: #FFFFFF;
				border-radius: 20upx 20upx 0 0;
				// position: absolute;
				// bottom: 0;
				padding: 0upx 0 44upx 44upx;


				.tbci {
					width: 100%;
					height: 100%;

					.tb_img {
						width: 146upx;
						height: 146upx;
						border-radius: 50%;
						margin-top: -68upx;
					}

					.tbci_view {
						width: 100%;
						height: 100%;
						padding-right: 169upx;
						padding-left: 43upx;

						.tbci_name {
							font-size: 32upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}

						.tbci_sl {
							width: 100%;
							height: 100%;

							.icon-Starmarker {
								margin-right: 0.25rem;
							}

							.tbci_left {
								font-size: 24upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #999999;
							}

							.tbci_right {
								font-size: 22upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #F43D32;
							}
						}
					}
				}
			}
		}

		.fuIndex_nav {
			width: 750upx;
			height: 184upx;
			background: #FFFFFF;
			border-radius: 10upx;
			padding: 0 40upx 0 52upx;
			border-bottom: 20upx solid #f8f8f8;

			.fuIndex_nav_item {
				// width: 25%;
				height: 100%;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;


				image {
					width: 44upx;
					height: 43upx;
				}

				.fni_text1 {
					color: #333333;
					margin-top: 7upx;
					margin-bottom: 13upx;
				}

				.fni_text2 {
					color: #999999;
				}
			}

		}

		.geRen {
			width: 750upx;
			// height: 305upx;
			border-radius: 10upx;
			padding: 31upx;
			border-bottom: 11upx solid #f8f8f8;

			.gbody {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 48upx;
				margin-top: 28upx;
			}

			.gfoot {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				line-height: 40upx;
				margin-top: 30upx;
			}

		}

		.ServiceArea {
			width: 750upx;
			border-radius: 10upx;
			padding: 31upx;
			border-bottom: 20upx solid #f8f8f8;

			.sa_body {
				width: 100%;
				// height: 42upx;
				margin-top: 27upx;

				.sa_body_item {
					display: inline-block;
					background: #F43B31;
					border-radius: 4upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					padding: 8upx;
					margin-bottom: 15upx;
					margin-right: 15upx;
				}
			}
		}

		.personal_data {
			width: 750upx;
			background: #FFFFFF;
			border-radius: 10upx;
			padding: 32upx 32upx 0upx 30upx;
			border-bottom: 20upx solid #f8f8f8;

			.personal_data_view {
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;

				.pdi {
					margin-bottom: 20upx;
				}

				.pd_text1 {
					color: #666666;
				}

				.pd_text2 {
					color: #F43B31;
				}

				.pd_text3 {
					margin-left: 0.5rem;
				}
			}
		}

		.CompletedOrder {
			width: 750upx;
			padding: 32upx 52upx 0 30upx;

			.co_nav {
				width: 100%;
				height: 44upx;
				margin-top: 31upx;

				.co_nav_item {
					display: inline-block;
					border-radius: 22upx;
					padding: 8upx 20upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					margin-right: 24upx;
				}

				.co_nav_item_active {
					background: #F43B31;
					color: #FFFFFF;
				}

				.co_nav_item_no {
					background: #FFFFFF;
					color: #F43B31;
					border: 1px solid #F43B31;
				}
			}

			.co_body {
				width: 100%;
				height: 251upx;
				padding: 32upx 0 20upx 0;
				margin-top: 22upx;

				.co_body_fl {
					width: 100%;

					.cbf_img {
						width: 87upx;
						height: 87upx;
						border-radius: 18upx;
					}

					.cbf_view {
						width: 600upx;
						height: 87upx;
						padding-left: 15upx;

						.cdf_left {
							.cdf_gs {
								font-size: 26upx;
								color: #999999;
								margin-bottom: 12upx;
							}

							.cdf_tit {
								font-size: 30upx;
								color: #333333;
							}
						}

						.cdf_right {
							.cdf_gs {
								font-size: 26upx;
								color: #999999;
								margin-bottom: 12upx;
							}

							.pingNum {
								font-size: 22upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #F43D32;
								margin-left: 22upx;
							}
						}
					}
				}

				.co_body_sl {
					width: 100%;
					height: 23upx;
					margin-top: 21upx;
					margin-bottom: 21upx;

					.co_body_sll,
					.co_body_slr {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
					}

					.leftText {
						color: #999999;
					}

					.rightText {
						color: #333333;
					}
				}

				.co_body_ll {
					width: 750upx;
					margin-left: -30upx;
					height: 66upx;
					padding: 0 30upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					border-top: 1px solid #eee;
				}

				.co_body_hr {
					width: 750upx;
					height: 20upx;
					background-color: #eee;
					margin-left: -30upx;
				}
			}
		}
	}

	/deep/.dh_top[data-v-67478258] {
		// background: linear-gradient(0deg, #F43B31 0%, #F43B31 100%);
		background: #F43B31;
		color: #fff;
	}

	//页面公共样式
	.redGan {
		width: 6upx;
		height: 31upx;
		background: #F43B31;
	}

	.titleRed {
		font-size: 32upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		margin-left: 15upx;
	}
</style>
