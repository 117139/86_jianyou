<!-- 圈子主页 -->
<template>
	<view class="CD">
		<view class="faQie dis_flex ju_c aic" @click="jump" :data-url="'/pagesA_lzc/faTie/faTie?id='+myPid"><text class="iconfont icon-plus "></text></view>
		<view class="CD_view">
			<view class="searchView dis_flex aic" @click.stop="jump" data-url="/pagesB_mxx/serch_circle/serch_circle">
				<text class="iconfont icon-sousou"></text>
				<text class="searchText">搜索更多精彩内容</text>
			</view>
			<!-- v-if="Object.keys(titleShu).length!=0" -->
			<view class="CD_cart" v-if="titleShu.list">
				<view class="CD_cart_item dis_flex aic">
					<image :src="getimg(titleShu.list.pic)" mode="aspectFill" @click.stop="jump"
						:data-url="'/pagesA_lzc/fuIndex/fuIndex?id='+titleShu.list.id"></image>
					<view class="cd_cart_center">
						<text class="3c_text">{{titleShu.list.title}}</text>
						<view class="cd_cc_sl dis_flex ju_b">
							<view class="">关注 {{titleShu.list.concerns_number}}</view>
							<view class="">帖子 {{titleShu.list.post_number}}</view>
						</view>
					</view>
					<view class="cd_cart_right dis_flex aic ju_c" @click="guanClick(titleShu.list.id,titleShu.type)">
						<text v-if="titleShu.type==2">关注</text>
						<text v-if="titleShu.type==1">已关注</text>
					</view>
				</view>
			</view>
		</view>

		<view class="" style="margin-top: 60upx;" v-if="czlist.length!=0">
			<view class="tbody" :data-url="`/pagesA_lzc/circleDetail2/circleDetail2?id=${cz.id}`"
				v-for="(cz,cindex) in czlist" :key="cindex" @click="jump">
				<view class="tbitem">
					<view class="tbitem_fl dis_flex aic">
						<image :src="getimg(cz.img)" mode="aspectFill"></image>
						<view class="tel">{{cz.phone}}</view>
						<view class="time">{{cz.create_time}}</view>
						<!-- <view class="flex-right isDelText" style="position: absolute;right: 0;" v-if="isZhu">
							<text>可删除</text>
						</view> -->
					</view>
					<view class="tbitem_sl oh4">
						<text>{{cz.content}}</text>
					</view>
					<view class="tbitem_lls dis_flex" style="flex-wrap: wrap;">
						<view class="tbitem_ll_imgs" v-for="(img,iIndex) in cz.banner" :key="iIndex" >
							<image :src="img" mode="aspectFill"></image>
						</view>
					</view>
					<view class="tbFoot dis_flex flex-right">
						<view class="tbFitem dis_flex aic ju_b">
							<view class="left_tb">
								<text class="iconfont icon-pinglun"></text>
								<text class="pinNum">{{cz.comment}}</text>
							</view>
							<view class="right_tb" @click.stop="zan(cz)">
								<text class="iconfont icon-zan-" v-if="cz.fans == 2"></text>
								<text class="iconfont icon-zan" style="color: #F43B31;" v-if="cz.fans == 1"></text>
								<text class="pinNum" :style="{color: cz.fans == 1?'#F43B31':'#ddd'}">{{cz.praise}}</text>
							</view>

						</view>
					</view>
				</view>
			</view>
			
			<view class="data_last" v-if="data_last">没有更多了</view>
		</view>
		<view class="zanwu" v-if="czlist.length == 0" style=" margin-top: 50upx;">
			暂无数据
		</view>

	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../components/service.js';
	import circleDetailCartLzc from '../../components/circle-detail-cart-lzc/circle-detail-cart-lzc';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			circleDetailCartLzc
		},
		data() {
			return {
				isZhu: true,
				isGuan: true,
				titleShu: {},
				czlist: [],
				myPage: 1,
				myPid: 0,
				meiyou: false,
				zanSou: false,
				loadCss: {
					mode: "loading2",
					status: "normal",
					showTitle: false,
					color: "#999",
					textColor: "#999",
					textSize: "20rpx",
					padding: "30rpx",
					loadTitle: {
						down: "1111",
						loading: "",
						normal: "1111"
					},
					shownum:0
				},
				
				
				
				btnkg: false,
				data_last:false
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			console.log(option, "id")
			this.myPid = option.id;
			if (option.id) {
				console.log(this.pid)
				this.getShowCircle();
				this.list();
			} else {
				this.pid = 0;
			}
		},
		onShow() {
			if(that.shownum>0){
				this.myPage = 1;
				this.data_last = false;
				this.list();
			}
			that.shownum++
		},
		onReachBottom() {
			console.log("触底了");
			this.list()
		},
		onPullDownRefresh() {
			this.myPage = 1;
			this.meiyou = false;
			this.getShowCircle();
			this.list();
			uni.stopPullDownRefresh();
			
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
			guanClick(id, type) {
				console.log(type)
				if (!this.guansuo) {
					this.guansuo = true;
					service.P_post("circle/follow_circle", {
						id: id
					}).then((res) => {
						if (res.code == 1) {
							console.log(res)
							if (type == 1) {
								
								this.getShowCircle();
								this.guansuo = false;
							} else {
								this.getShowCircle();
								this.guansuo = false;
							}

						} else {
							this.guansuo = false;
							uni.showToast({
								title: `${res.msg},请联系管理员`,
								icon: "none"
							})
						}
					}).catch((e) => {
						this.guansuo = false;
						uni.showToast({
							title: "服务器异常",
							icon: "none"
						})
					})
				}
				this.isGuan = !this.isGuan;
			},
			//点赞帖子
			zan(item) {
				if (this.zanSou) {
					return
				}
				this.zanSou = true;
				service.P_post("circle/follow_post", {
					id: item.id
				}).then((res) => {
					console.log(res)
					if (res.code == 1) {
						var newnum=item.praise
						if (item.fans == 1) {
							Vue.set(item,'fans',2)
							newnum--
							
						} else {
							Vue.set(item,'fans',1)
							newnum++
						}
						Vue.set(item,'praise',newnum)
						this.zanSou = false
					} else {
						this.zanSou = false;
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					this.zanSou = false;
					console.log(e)
					uni.showToast({
						title: "服务器异常11111",
						icon: "none"
					})
				})
			},
			list() {
				var data = {
					type:4,
					pid: this.myPid,
					page: that.myPage,
					limit: 20
				};
				if (this.btnkg==1) {
					return
				}
				this.btnkg = 1;
				service.P_post("circle/recommend_post", data).then((res) => {
					console.log(res, "圈子主页列表")
					if (res.code == 1) {
						if(res.data.length == 0){
							this.czlist = [];
							return
						}
						this.btnkg = 0;
						let data = res.data.data;
						if (that.myPage == 1) {
							
							this.czlist = [];
							this.czlist = data;
							
							if (data.length != 0) {
								that.myPage++
							}
						} else {
							
							if (data.length != 0) {
								for (var i = 0; i < data.length; i++) {
									this.czlist.push(data[i])
								}
								this.myPage++
								
							} else {
								this.data_last = true;
							}
						}


					} else {
						this.btnkg = 0;
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					this.btnkg = 0;
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
			},
			getShowCircle() {
				service.P_post("circle/show_circle", {
					id: that.myPid
				}).then((res) => {
					if (res.code == 1) {
						console.log(res)
						this.titleShu = res.data;
					}else{
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: "服务器异常",
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.faQie {
		width: 84upx;
		height: 84upx;
		background: #F43B31;
		border-radius: 50%;
		font-size: 67upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		line-height: 70upx;
		position: fixed;
		right: 30upx;
		bottom: 334upx;
		z-index: 999999;
	}
	.faQie text{
		font-size: 34upx;
	}
	.CD {
		width: 750upx;
		// height: 100vh;
		background-color: #f8f8f8;

		.CD_view {
			width: 750upx;
			height: 201upx;
			background-color: #F43B31;
			box-sizing: border-box;
			padding: 37upx 30upx 0 30upx;

			.searchView {
				width: 690upx;
				height: 60upx;
				background: #FFFFFF;
				border-radius: 30upx;
				box-sizing: border-box;
				padding: 0 30upx;

				.icon-sousou {
					font-size: 28upx;
					color: #eee;
				}

				.searchText {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #BBBBBB;
					margin-left: 11upx;
				}

			}

			.CD_cart {
				width: 690upx;
				height: 128upx;
				background: #fff;
				border-radius: 10upx;
				margin-top: 20upx;
				box-sizing: border-box;
				padding: 24upx 20upx;

				.CD_cart_item {
					width: 100%;
					height: 100%;

					image {
						width: 80upx;
						height: 80upx;
						border-radius: 10upx;
					}

					.cd_cart_center {
						width: 450upx;
						height: 100%;
						// background-color: #255250;
						box-sizing: border-box;
						padding-left: 27upx;

						.c3_text {
							font-size: 30upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
							line-height: 36upx;
							margin-top: -5upx;
						}

						.cd_cc_sl {
							width: 263upx;
							height: 23upx;
							font-size: 24upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #999999;
							line-height: 36upx;
						}
					}

					.cd_cart_right {
						width: 120upx;
						height: 60upx;
						background: #F43B31;
						border-radius: 30upx;

						text {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							line-height: 36upx;
						}
					}
				}
			}

		}
	}




	.tbody {
		width: 750upx;
		box-sizing: border-box;
		padding: 0 30upx;
		// margin-top: 60upx;
		background-color: #fff;
		margin-bottom: 22upx;
	}

	.tbitem {
		width: 690upx;
		box-sizing: border-box;
		padding-top: 28upx;
		position: relative;

		.isDelText {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}

		.tbitem_fl {
			width: 100%;
			height: 40upx;
			position: relative;

			image {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
			}

			.tel {
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-left: 10upx;
			}

			.time {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left: 22upx;
			}
		}

		.tbitem_sl {
			width: 100%;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 48upx;
			margin-top: 26upx;
		}

		.tbitem_ll {
			width: 100%;
			margin-top: 32upx;

			image {
				margin-right: 20upx;
			}
		}


	}

	.circleDetail2 {
		width: 750upx;
		background-color: #f8f8f8;
		box-sizing: border-box;
		padding-top: 10upx;
	}

	.tbFoot {
		width: 100%;
		height: 26upx;
		position: absolute;
		bottom: 42upx;

		// background-color: #112288;
		.tbFitem {
			width: 200upx;
			height: 100%;
			// background-color: #007AFF;
			font-size: 24upx;
			font-family: Arial;
			font-weight: 400;
			color: #DDDDDD;
			line-height: 48upx;
			margin-top: 30upx;

			.pinNum {
				margin-left: 10upx;
			}
		}
	}


	/deep/.tbitem_ll_img {
		height: 297upx !important;
	}

	.tbitem {
		margin-bottom: 10upx;
		background-color: #fff;
		z-index: 99;
		padding-bottom: 55upx;
		box-sizing: border-box;
	}
	.tbitem_lls{
		width: 100%;
		.tbitem_ll_imgs{
			width: 33%;
			max-width: 230upx;
			height: 227upx;
			padding: 8upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
	.CD{
		min-height: 100vh;
	}
</style>
