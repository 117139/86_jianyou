<template>

	<view class="content">
		<topbar bg_color="#FFFFFF" text_color="#fff" :have_top="true">
			<!-- <text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">收藏关注</text> -->

			<view class="bgcf pl8 pr15 pb5  pt12 dis_flex aic">
				<text class="fs15 iconfont icon-back-line" @click.stop="back"> </text>
				<view class="sou pl15 pr15 flex aic ">
					<text class="icon-sousuo iconfont c9 fwb fs16" style="color: #999999;"></text>
					<input type="text" class="fs12 pl10 width" placeholder="搜索更多精彩内容" v-model="searchView"
						@input="searchInput" />
				</view>
			</view>
			<text class="fs15" @click.stop="back">取消 </text>
		</topbar>
		<view class="  bgcf  pl15 pr15  ">
			<view class="b-b-1 flex ju_b aic pt12 pb12" v-for="(item,index) in shuju" :key="index" @click.stop="jump"
				:data-url="`/pagesA_lzc/circleDetail/circleDetail?id=${item.id}`">
				<view class="flex ju_b aic">
					<image :src="getimg(item.pic)" mode="aspectFill" class="img_hsuju"></image>
					<view class="flex  flex-col pl10" style="width: 420rpx;">
						<text class="fs15 oh1">{{item.title}}</text>
						<text class="fs12 c9  pt5 oh1">{{item.subtitle}}</text>
					</view>
				</view>

				<!-- <view class="yihuan fs12 flex aic ju_c" v-if="item.fans==1" @click.stop="guan(item.fans,item.id)">
					已关注
				</view>
				<view class="guan fs12 flex aic ju_c" v-if="item.fans==2" @click.stop="guan(item.fans,item.id)">
					关注
				</view> -->
				<view class="yihuan fs12 flex aic ju_c" v-if="item.fans==1">
					已关注
				</view>
				<view class="guan fs12 flex aic ju_c" v-if="item.fans==2">
					关注
				</view>
			</view>

		</view>
	</view>
</template>

<script>
	import service from '../../components/service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				myPage: 1,
				limit: 10,
				isLogin: false,
				searchView: "",
				shuju: [{
						img: '/static/images/ma/xue.jpg',
						indeu: false,
					},
					{
						img: '/static/images/ma/xue.jpg',
						indeu: false,
					},
					{
						img: '/static/images/ma/xue.jpg',
						indeu: true,
					}
				]
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
			// console.log(this.$store.state,"store")
			var state = this.$store.state;
			that.isLogin = state.hasLogin
			that.shuju = [];
			that.myPage = 1;
			that.getData()
		},
		onShow() {
			that.getData()
		},
		onReachBottom() {
			console.log("触底了")
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
				uni.switchTab({
					url:"/pages/circle/circle"
				})
			},
			guan(fans, id) {
				console.log(fans)
				if (!that.isLogin) {
					uni.showToast({
						title: "请先登录",
						icon: "none",
						success() {
							setTimeout(() => {
								uni.navigateTo({
									url: "../login/login"
								})
							}, 1000)

						}
					})
					return
				}
				// if (that.shuju[index].indeu == true) {
				// 	that.shuju[index].indeu = false
				// 	uni.showToast({
				// 		title: '已关注',
				// 		icon: 'none',
				// 	});
				// } else {
				// 	that.shuju[index].indeu = true
				// 	uni.showToast({
				// 		title: '已取消关注',
				// 		icon: 'none',
				// 	});
				// }
				var turl = "circle/follow_circle";
				var data = {
					id: id
				}
				service.P_post(turl, data).then(res => {
					if (res.code == 1) {
						if (fans == 2) {
							uni.showToast({
								title: '已关注',
								icon: 'none',
								success() {
									setTimeout(() => {
										that.myPage = 1;
										that.getData()
									}, 1000)

								}
							});
						} else {
							uni.showToast({
								title: '已取消关注',
								icon: 'none',
								success() {
									setTimeout(() => {
										that.myPage = 1;
										that.getData()
									}, 1000)
								}
							});
						}
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
			searchInput(e) {
				console.log(e.detail.value)
				this.searchView = e.detail.value;
				that.getData()
			},
			getData() {
				var turl = "circle/search_circle";
				var data = {
					page: that.myPage,
					limit: that.limit,
					search: that.searchView
				}
				service.P_post(turl, data).then(res => {
					if (res.code == 1) {
						if (that.myPage == 1) {
							that.shuju = res.data.data
						}
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
			}
		}
	}
</script>

<style>
	page {
		background-color: #FFFFFF;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #FFFFFF;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.sou {
		width: 580rpx;
		height: 60rpx;
		background: #F8F8F8;
		border-radius: 30rpx;
	}

	.img_hsuju {
		width: 80rpx;
		height: 80rpx;
		border-radius: 10rpx;
	}

	.guan {
		width: 108rpx;
		height: 50rpx;
		border: 1px solid #F43B31;
		border-radius: 25rpx;

		color: #F43B31;
	}

	.yihuan {
		width: 108rpx;
		height: 50rpx;
		border: 1px solid #999;
		border-radius: 25rpx;

		color: #999;
	}
</style>
