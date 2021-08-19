<template>

	<view class="content">
		<!-- <topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">我的求购</text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar> -->
		<view class="bgcf p15 mb10" v-for="(item,index) in shuju" :key='index' v-if="shuju.length!=0" @click="jump"
			:data-url="`/pagesA_lzc/TradingMarketD/TradingMarketD?id=${item.id}`">
			<view class="dis_flex">
				<image :src="item.pinfo.img" mode="aspectFit" class="qina"></image>
				<view class="oh2" style="margin-left: 10upx;">
					<text class="zhaunrangs fs12 cf">{{item.pinfo.title}}</text>
					<text class="fs14" style="margin-left: 10upx;">{{item.title}}</text>
				</view>
			</view>

			<view class="pt8 bianji flex ju_b aic pt15">
				<view class="">
					<text class="fs18 fwb ">{{item.price}}</text>
					<text class="fs12">元</text>
				</view>
				<view class="flex">
					<!-- <view class="hongber fs12  flex ju_c aic" @click="jump" data-url="/pagesA_lzc/fabu2/fabu2">
						编辑
					</view> -->
					<view class="hongber fs12  flex ju_c aic ml10" @click.stop="quxiao(item.id)">
						删除
					</view>
				</view>
			</view>
		</view>
		<view class="flex aic flex-col  pt35  meiQiu" v-if="shuju.length==0">
			<image src="/static/images/ma/dindanwu.png" mode="aspectFit" class="zans"></image>
			<text class="zanwu">您还没有任何求购</text>
		</view>
		<view class="zanwu" v-if="last_page">
			<text class="zanwu">到底了</text>
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
				shuju: [],
				limit: 10,
				page: 1,
				moreTrue: false,
				last_page: false,
				delTrue: false
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
			// console.log(that.$store.state.hasLogin)
			var hasLogin = that.$store.state.hasLogin;
			if (!hasLogin) {
				that.shuju = [];
				uni.showToast({
					title: "未登录，请先登录",
					icon: "none",
					success() {
						setTimeout(() => {
							uni.navigateTo({
								url: "../login/login"
							})
						}, 1000)
					}
				})
			} else {
				that.getData();
			}

		},
		onShow() {

		},
		onReachBottom() {
			console.log("触底了")
			if (that.moreTrue) {
				return
			}
			that.moreTrue = true;
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
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
			quxiao(id) {
				if (that.delTrue) {
					return
				}
				that.delTrue = true;
				var turl = "transaction_list/sell_del";
				var data = {
					id: id
				};
				uni.showModal({
					title: '提示',
					content: '确定删除吗',
					success: function(res) {
						if (res.confirm) {
							service.P_post(turl, data).then(res => {
								if (res.code == 1) {
									uni.showToast({
										title: "删除成功",
										icon: "none",
										success() {
											setTimeout(() => {
												that.delTrue = false;
												that.page = 1;
												that.shuju = [];
												that.getData();
											}, 1000)
										}
									})
								} else {
									that.delTrue = false;
									uni.showToast({
										title: res.msg,
										icon: "none"
									})
								}
							}).catch(e => {
								console.log(e)
								uni.showToast({
									title: "服务器异常",
									icon: "none"
								})
							})
							// uni.request({
							// 	url: api.IPurl + 'user/changeDel',
							// 	method: 'POST',
							// 	data: {
							// 		id: id
							// 	},
							// 	success: (res) => {
							// 		if (res.code == 1) {
							// 			uni.showToast({
							// 				title: '删除成功',
							// 				icon: 'none',
							// 				success() {
							// 					uni.reLaunch({
							// 						url: '/pages/my/my'
							// 					})
							// 				}
							// 			});
							// 		}
							// 	},
							// 	fail: (e) => {
							// 		console.log(e)
							// 	}
							// })
						} else if (res.cancel) {
							uni.showToast({
								title: '取消删除',
								icon: 'none',
							});
						}
					}
				});
			},
			getData() {
				var turl = "user/buy";
				var data = {
					page: that.page,
					limit: that.limit,
				}
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				var now=that.page
				service.P_post(turl, data).then((res) => {
					console.log(res, "求购")
					if (res.code == 1) {
						var datas = res.data.data;
						if (now == 1) {
							this.shuju = datas;
							if (data.length != 0) {
								that.page++
							}
						} else {
							if (datas.length != 0) {
								that.shuju=that.shuju.concat(datas)
								that.page++
								that.moreTrue = false
							} else {
								that.last_page = true
								that.moreTrue = false
							}

						}

					} else {
						that.moreTrue = false
						uni.showToast({
							title: res.msg,
							icon: 'none'
						})
					}
				}).catch((e) => {
					that.moreTrue = false
					this.shuju = [];
					uni.showToast({
						title: "服务器异常",
						icon: 'none'
					})
				})
			}
		},

	}
</script>

<style scoped>
	.zans {
		width: 365rpx;
		height: 313rpx;
	}

	.meiQiu {
		/* #ifndef H5 */
		top: 70upx;
		/* #endif */
	}

	page {
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #F8F8F8;
		width: 100%;
		/* height: 100%; */
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.qina {
		width: 87rpx;
		height: 87rpx;
		border-radius: 18rpx;
		min-width: 87upx;
	}

	.zhaunrangs {
		max-width: 100rpx;
		background: #B7D0F8;
		border-radius: 4px;
		padding: 0 15rpx;
		box-sizing: border-box;
	}

	.bianji {
		color: #F43B31;
	}

	.hongber {
		width: 155rpx;
		height: 60rpx;
		border-radius: 30rpx;
		border: 1px solid #FF1919;
	}

	.qut {
		/* width: 200rpx; */
		min-width: 40upx;
		max-width: 200rpx;
		height: 36rpx;
		box-sizing: border-box;
		padding: 7upx;
		background: #B7D0F8;
		border-radius: 6rpx;
	}
</style>
