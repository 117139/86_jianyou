<template>

	<view class="shopSearch">
		<!-- 自定义导航 -->
		<topbar bg_color="#F43B31">
			<view class="topbar dis_flex aic">
				<text class="iconfont icon-back-line" @click="back" style="color: #fff;"></text>
				<view class="searchView dis_flex aic">
					<text class="iconfont icon-sousou sicon"></text>
					<input class="stext" type="text" v-model="searchView" placeholder="搜索更多精彩内容"
						placeholder-class="fs12 fw400" placeholder-style="color:#bbb;" @input="searchChange" />
				</view>
			</view>
		</topbar>
		<view class="navTop dis_flex  aic ju_b fixed" style="z-index: 99;">
			<view class="navTopItem dis_flex_c aic ju_c" @click.stop="tabSwitch(nindex)" v-for="(nav,nindex) in navList"
				:key="nindex">
				<text :class="{'navText':activeOne!=nindex,'navTextActive':activeOne==nindex}">{{nav.text}}</text>
				<image class="navImg" v-if="activeOne==nindex" src="/static/images/lzc/index/active.png"
					mode="heightFix" style=""></image>
			</view>
		</view>

		<!-- 主体 -->
		<view class="shopBody">
			<view class=""></view>
			<view class="sbItem" v-if="datas.length!=0&&activeOne!=3" v-for="(search,sindex) in datas"
				:key="sindex" @click="jump" :data-url="'/pagesA_lzc/TradingMarketD/TradingMarketD?id='+search.id">
				<view class="sb_fl dis_flex">
					<view class="dis_flex aic">
						<image :src="getimg(search.classify_img)" mode="aspectFill"></image>
					</view>
					<view class="sb_fl_sc oh2">
						<text class="sb_biao">{{search.classify_title}}</text>
						<text class="sb_con ">
							{{search.title}}
						</text>
					</view>
				</view>
				<view class="sb_sl dis_flex ju_b">
					<view class="sb_sll dis_flex aic">
						<image :src="getimg(search.img)" mode="aspectFill"></image>
						<text class="tel">{{search.phone}}</text>
					</view>
					<view class="sb_slr dis_flex aic">
						<view class="yx dis_flex aic ju_c">
							<text>意向价</text>
						</view>
						<view class="price">
							<text style="font-size: 36upx;font-weight: bold;">{{search.price}}</text>
							<text>元</text>
						</view>
					</view>
				</view>
			</view>
			<view class="sbItem" v-if="datas.length!=0&&activeOne==3" v-for="(search,sindex) in datas"
				:key="sindex" @click="jump" :data-url="'/pagesA_lzc/zhaobiao_xq/zhaobiao_xq?id='+search.id">
				<view class="bll_fl dis_flex aic">
					<view class="bll_fl_fc bs dis_flex aic ju_c">{{search.classify_title}}</view>
					<view class="bll_fl_sc">{{search.title}}</view>
					<uni-rate class="bll_star" :size="starStyle.size" :readonly="starStyle.readonly"
						:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="search.star">
					</uni-rate>
				</view>
				<view class="bll_sl dis_flex aic ju_b">
					<view class="bll_sl_left dis_flex aic">
						<!-- <view>{{item.add}}</view>
						<view class="" style="width: 1px;height: 100%;background-color: #ccc;margin: 0 0.5rem;"> -->
						<!-- </view> -->
						<view>{{search.create_time}}</view>
					</view>
					<view class="bll_sl_right">
						<text class="fs18 fwb">{{search.price}}</text>
						<text>元</text>
					</view>
				</view>
				<view class="bll_ll dis_flex jub aic">
					<view v-if="search.count>0" class="bll4_left dis_flex jub aic">
						<view class="" style="width: auto;margin-right: 8upx;">
							<image :src="getimg(img.img)" mode="aspectFill" v-for="img in search.data.slice(0,3)"></image>
						</view>
						<view class="">
							<text>等{{search.count}}人竞标</text>
						</view>
					</view>
					<view class="bll4_right dis_flex aic" style="justify-content: flex-end;">
						<view class=""></view>
						<view class="">
							<text class="iconfont icon-yanjing"></text>
							<text class="tel">{{search.view}}</text>
							<text class="tel">浏览</text>
						</view>
					</view>
				</view>
			</view>
			<view class="zanwu" v-if="datas.length==0">暂无数据</view>
			<view class="data_last" v-if="data_last">到底了~~</view>
		</view>
	</view>
</template>

<script>
	import service from '../../components/service.js';
	import topbar from '@/components/top_bar/top_bar'
	var that
	var inputt
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
				/* 星星样式 */
				starStyle: {
					size: 10,
					readonly: true,
					allowHalf: true,
					margin: 1
				},
				/*nav选择 */
				activeOne: 0,
				myPage: 1,
				searchView: "",
				MyType: 3,
				/* 是否还有数据 */
				isNoSearch: false,
				have_top: false,
				/* 商品列表 */
				slUrl: '/pagesA_lzc/shopList/shopList',
				navList: [{
						text: '求购',
						url: '',
						isActive: true
					},
					// {
					// 	text: '出售',
					// 	url: '',
					// 	isActive: false
					// },
					{
						text: '转让',
						url: '',
						isActive: false
					},
					{
						text: '招标',
						url: '',
						isActive: false
					}
				],
				datas: [],
				page:1,
				data_last:false
			}
		},
		onHide() {

		},
		onLoad() {
			that = this;
			that.myPage = 1;
			this.activeOne = 0;
			that.isNoSearch = false;
			
			that.onRetry()
		},
		onShow() {

		},
		onReachBottom() {
			console.log("触底了")
			that.getData()
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
			/* tab切换 */
			tabSwitch(index) {
				this.activeOne = index;
				if (that.activeOne == 0) {
					that.MyType = 3;
				}
				// if (that.activeOne == 1) {
				// 	that.MyType = 1;
				// }
				// if (that.activeOne == 2) {
				// 	that.MyType = 2;
				// }
				// if (that.activeOne == 3) {
				// 	that.MyType = 0;
				// }
				if (that.activeOne == 1) {
					that.MyType = 2;
				}
				if (that.activeOne == 2) {
					that.MyType = 0;
				}
				that.onRetry()
			},
			searchChange(e) {
				// console.log(e);
				inputt = setTimeout(function() {
					var kw = that.searchView
					console.log(kw.length)
					if (kw.length > 0) {
						
						that.onRetry()
				
					} else {
						that.onRetry()
						// that.qy_show = that.qy_arr3
					}
				}, 800)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			onRetry(){
				that.page=1
				that.datas=[]
				that.btnkg=0
				that.data_last=false
				that.getData()
			},
			getData() {
				var turl = "trade/list";
				
				var data = {
					limit: 10,
					type: that.MyType,
					search: that.searchView,
					page: that.page
				};
				if(that.MyType == 0){
					turl ="bid/list"
				}
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				var  page_now=that.page
				service.P_post(turl, data).then(res => {
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
										
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
											
						if (page_now == 1) {
						
							that.datas = datas.data
						
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas.data)
						}
						that.page++
						
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
			
		}
	}
</script>

<style scoped lang="scss">
	.navTop {
		width: 750upx;
		height: 105upx;
		background-color: #F43B31;
		z-index: 99999;
		padding: 0 30upx;
		box-sizing: border-box;
		// margin-left: 200upx;
		// margin-top: 600upx;

		.navTopItem {
			height: 100%;
			position: relative;

			.navText {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				opacity: 0.7;
			}

			.navImg {
				width: 25upx;
				height: 11upx;
				position: absolute;
				bottom: 23upx;
			}

			.navTextActive {
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
			}

			.navView {
				width: 25upx;
				height: 11upx;
				background-color: #fff;
				position: absolute;
				bottom: 24upx;
			}
		}

	}

	.shopSearch {
		width: 100vw;
		background-color: #fff;

		.topbar {
			width: 100%;
			height: 100%;

			.searchView {
				width: 690upx;
				height: 60upx;
				background: #FFFFFF;
				border-radius: 30upx;
				box-sizing: border-box;
				padding-left: 27upx;
				margin: 0 22upx;

				.sicon {
					font-size: 28upx;
					color: #BBBBBB;
				}

				.stext {
					width: 100%;
					box-sizing: border-box;
					padding-right: 20upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #BBBBBB;
					margin-left: 7upx;
				}
			}

			.navTop {
				width: 100%;
				height: 108upx;

				.navTopItem {
					height: 100%;
					position: relative;

					.navText {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						opacity: 0.7;
					}

					.navImg {
						width: 25upx;
						height: 11upx;
						position: absolute;
						bottom: 23upx;
					}

					.navTextActive {
						font-size: 30upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}

					.navView {
						width: 25upx;
						height: 11upx;
						background-color: #fff;
						position: absolute;
						bottom: 24upx;
					}
				}

			}
		}

		.shopBody {
			width: 750upx;
			height: 100%;
			box-sizing: border-box;
			margin-top: 110upx;
			// padding-top: 110upx;
			background-color: #FFFFFF;

			.sbItem {
				width: 100%;
				// background-color: #00C5D8;
				box-sizing: border-box;
				padding: 24upx 30upx;
				border-bottom: 1px solid #eee;

				.sb_fl {
					width: 100%;
					height: 88upx;
					margin-bottom: 24upx;

					image {
						width: 88upx;
						height: 88upx;
						border-radius: 18upx;
					}

					.sb_fl_sc {
						width: 100%;
						// height: 34upx;
						line-height: 34upx;
						max-height: 68upx;
						padding-left: 18upx;
						margin-top: 7upx;

						.sb_biao {
							
							height: 34upx;
							background: #B7D0F8;
							border-radius: 4upx;
							font-size: 20upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							text-align: center;
							line-height: 34upx;
							padding: 0 8upx;
						}

						.sb_con {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							
						}
					}
				}

				.sb_sl {
					width: 100%;

					.sb_sll {
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

					.sb_slr {
						.yx {
							width: 80upx;
							height: 32upx;
							background: #FFB017;
							border-radius: 16upx;

							text {
								font-size: 20upx;
								font-family: PingFang SC;
								font-weight: 400;
								color: #FFFFFF;
							}
						}

						.price {
							font-size: 24upx;
							font-family: Akzidenz-Grotesk BQ Condensed A;
							// font-weight: bold;
							color: #F43B31;
							margin-left: 24upx;
						}
					}
				}
			}

			.searchBottom {
				width: 750upx;
				height: 79upx;
				background-color: #F8F8F8;
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #BBBBBB;
				line-height: 40upx;
			}
		}
	}

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
			right: 0upx;

			.iconfont {
				font-size: 29upx;
				color: #BBBBBB;
			}
		}
	}

	/deep/.dh_top {
		// height: 218upx !important;
	}

	/deep/.dh_top_box {
		// box-sizing: border-box;
		// padding-top: 10upx !important;
		// width: 690upx;
		// height: 185upx !important;
	}
</style>
