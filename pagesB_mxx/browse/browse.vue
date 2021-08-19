<template>

	<view class="content">
		<topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class="pl30 " style="color: #FFFFFF;">浏览记录</text>
			<text class="pr5 fs14" style="color: #FFFFFF;" @click="quxiao">清空 </text>
		</topbar>
		<view class="p15">
			<view class="p12 bgcf mb12 br5" v-for="(item,index) in datas" :key='index' @click="jump"
				:data-url="`/pagesA_lzc/TradingMarketD/TradingMarketD?id=${item.goods_id}`">
				<view class="time flex aic fs12 pb10">
					{{item.create_time}}
					
				</view>
				<view class="bian pb10  ">
					<view class="flex aic ju_b b-b-1 pt10 pb10 pl10  pr10">
						<view class="flex">
							<image :src="getimg(item.info.userInfo.img)" mode="aspectFill" class="touxiang br20">
							</image>
							<text class="c9 fs11 pl5">{{item.info.userInfo.phone}}</text>
						</view>
						<view class="flex c9 aic">
							<text class="icon-yanjing1 iconfont fs11"></text>
							<text class="fs11 pl5">{{item.info.view}}浏览</text>
						</view>
					</view>
					<view class="flex pt10 pb1 pl10  pr10">
						<view class="flex flex-col aic">
							<image :src="item.info.pInfo.img" mode="aspectFill" class="gongsi">
							</image>
							<!-- <text class="cf fs11 pt5">公司注册</text> -->
						</view>
							<view class="oh2 list_tit">
								<text class="qut">
									{{item.info.pInfo.title}}
								</text>
								<text>
									{{item.info.title}}
								</text>
							</view>
					</view>
					<!-- <view class="flex pl10  pr10 pt10">
						<view class="cf sxun fs11 flex aic ju_c">
							可议价
						</view>
						<view class="cf guo fs11 ml8 flex aic ju_c">
							包过户费
						</view>
						<view class="cf you fs11 ml8 flex aic ju_c">
							服务费优惠
						</view>
					</view> -->
					<!-- <view class="flex flex-between pl10  pr10">
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
								<text class="fs12 c9">{{item.chutime}}</text>
							</view>
											
						</view>
						</view> -->
					<view class="pt12 pl10  pr10" style="color: #F43B31;">
						<text class="fs18">{{item.info.price}}</text>
						<text class="fs12">元</text>
					</view>
				</view>
			</view>
		</view>
		<view class="zanwu" v-if="datas.length==0">暂无数据</view>
		<view class="data_last" v-if="data_last">到底了</view>
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
				datas: [{
					time: '2021-06-07',
					img_name: '/static/images/ma/xue.jpg',
					shou: '151****5678',
					exe: 205,
					qutong: '普通公司',
					title: '汽车用品/电子/清洗/改装专营店 汽车用品/电子/清洗/改装专营店',
					chutime: '2020-11-25',
					nem: '20.00'
				}],
				data_last: false,
				page: 1,
				limit:4
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
			let token = uni.getStorageSync('token')
			that.onRetry()
		},
		onShow() {

		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			onRetry(index) {
				that.datas = []
				that.page = 1
				that.data_last = false
				that.getdata()
			},
			getdata() {
				var jkurl = "/user/browse"
				var datas = {
					page: that.page,
					limit: that.limit
				}
				if (that.data_last == true) {
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showLoading({
					mask: true,
					title: '正在获取数据'
				})
				var page_now = that.page
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
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
					that.btnkg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})

			},

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
			quxiao() {
				uni.showModal({
					title: '提示',
					content: '确定清空吗',
					success: function(res) {
						if (res.confirm) {
							if(that.btnkg==1){
								return
							}
							that.btnkg=1
							service.P_post("user/browse_del").then(res => {
								if (res.code == 1) {
									uni.showToast({
										title: '清空成功',
										icon: 'none',
										success: () => {
											setTimeout(() => {
												that.btnkg=0
												that.onRetry()
											},1000)
										}
									});
								} else {
									that.btnkg=0
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
								that.btnkg=0
								console.log(e)
								uni.showToast({
									icon: 'none',
									title: '系统异常'
								})
							})

						} else if (res.cancel) {
							uni.showToast({
								title: '取消清空',
								icon: 'none',
							});
						}
					}
				});
			},
		}
	}
</script>

<style scoped>
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
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.time {
		padding-left: 20rpx;
	}

	.time:before {
		content: '';
		position: absolute;
		width: 5rpx;
		height: 25rpx;
		left: 52rpx;
		background: #F43B31;
	}

	.bian {

		border: 1px solid #EEEEEE;

		border-radius: 10rpx;
	}

	.touxiang {
		width: 40rpx;
		height: 40rpx;
	}

	.gongsi {
		width: 87rpx;
		height: 87rpx;
		min-width: 87rpx;
	}

	.gongsia {
		padding: 10rpx;
		background: linear-gradient(150deg, #E9C79A 0%, #E7BD88 100%);
		border-radius: 18rpx;
	}



	.sxun {
		padding: 4rpx 10rpx;
		background: #FFB017;
		border-radius: 16rpx;
	}

	.guo {
		padding: 4rpx 10rpx;

		background: #FF908A;
		border-radius: 16rpx;
	}

	.you {
		padding: 4rpx 10rpx;

		background: #8AB3FF;
		border-radius: 16rpx;
	}
	.list_tit{
		line-height: 34upx;
		font-size: 28upx;
		max-height: 68upx;
	}
	.qut {
		color: #fff;
		padding: 2upx 10upx;
		box-sizing: border-box;
		background: #B7D0F8;
		border-radius: 6rpx;
		font-size: 24upx;
		margin-right: 8upx;
	}
</style>
