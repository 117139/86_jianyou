<template>
	<view class="content" style="height: 1000px;">
		<view class=" flex ju_c aic  pl10 pr10  width harder  fixed top ">
			<!-- <view class=" flex aic ju_c"> -->
			<view class="fuwu flex-1 flex " v-for="(item,index) in title" :key="index" @click="bian(index)">

				<text class="" :class="currentIndex== index?'active':''">{{item.ti}}</text>
				<image src="/static/images/ma/daindanqua.png" mode="aspectFill" class="quna "
					v-if="currentIndex== index"></image>
			</view>
			<!-- </view> -->

		</view>

		<view class="mianu">

			<view class="flex aic flex-col  pt35 mt35" v-if="shuju==[] ||shuju.length<1">
				<image src="/static/images/ma/dindanwu.png" mode="aspectFill" class="zans"></image>
				<text class="zanwu">您还没有相关订单哦</text>
			</view>
			<view class="" v-else>
				<view class="shuju pl15 pr15 pb15 pt10 mt12" v-for="(item,index) in shuju" :key="index" @click='jump'
					:data-url="'/pagesA_lzc/zhaobiao_xq/zhaobiao_xq?id='+item.id" :data-shifou='true'>
					<view class="flex ju_b aic b-b-1 pb10 pt5">
						<text class="fs12 c6 flex">订单编号：{{item.code}}</text>
					</view>
					<view class=" pt5">

						<view class="flex aic">
							<view class="zhao flex fs11 cf" v-if="item.status=='招标中' && item.pay_type==1">招标中</view>
							<view class="zhao flex fs11 cf" v-if="item.status=='招标中' && item.pay_type==2">待付保证金</view>
							<view class="fuwus flex fs11" v-if="item.status==4">服务中</view>
							<view class="ping flex fs11" v-if="item.status==5">待评价</view>
							<view class="quxi flex fs11" v-if="item.status=='已退单'">已取消</view>
							<view class="quxi flex fs11" v-if="item.status==6">已完成</view>
							<view class="oh1 fs14 pl12 pr12" style="width: 550rpx;line-height: 80rpx;">
								{{item.title}}
							</view>
						</view>
						<view class="flex ju_b aic pb10 ">
							<text class="fs12 c9 flex">发标时间：{{item.create_time}}</text>
						</view>
						<view class="flex ju_b aic">
							<view class="">
								<text class="fs12">合计：</text>
								<text class="fs18 fwb" style="color: #F43B31;">{{item.price}}</text>
								<text class="fs12" style="color: #F43B31;">元</text>
							</view>
							<view class="flex   flex-right">

								<view class="flex" v-if="item.status=='招标中' && item.pay_type==1" @click.stop="jump"
									:data-url="`/pagesA_lzc/zhaobiao_xq/zhaobiao_xq?id=${item.id}`">
									<view class="quxiao flex align-items-center justify-center fs13  ">
										去选择
									</view>
									<view class="quxiao flex align-items-center justify-center fs13  "
										@click.stop="quxiao(item.code)">
										取消招标
									</view>
								</view>
								<view class="quxiao flex align-items-center justify-center fs13 "
									v-if="item.status=='招标中' && item.pay_type==2">
									去付款
								</view>
								<view class="flex" v-if="item.status==4">
									<view class="quxiao flex align-items-center justify-center fs13 "
										@click.stop="shouhuo(item.code)">
										确认完成
									</view>
								</view>
								<view class="flex" v-if="item.status==5" @click.stop='jump'
									:data-url="`../evaluate/evaluate?id=${item.id}&type=招标`" :data-shifou='true'>
									<view class="quxiao flex align-items-center justify-center fs13  ">
										去评价
									</view>
								</view>
								<view class="flex" v-if="item.stst==4">

								</view>
							</view>

						</view>
					</view>

				</view>
				<view class="zanwu" v-if="last_page">到底了</view>
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
				title: [{
						ti: '全部',
						id: 1
					},
					{
						ti: '招标中',
						id: 2
					},
					{
						ti: '服务中',
						id: 2
					},
					{
						ti: '待评价',
						id: 2
					},
					{
						ti: '已取消',
						id: 2
					},
				],


				shuju: [],
				currentIndex: 0,
				index: 0,
				status: 2,
				limit: 10,
				page: 1,
				myStatus: 0,
				last_page: false,
				moreTrue: false,
				bianTrue: false

			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			that = this
			console.log(option)
			that.shuju = [];
			that.getData()

		},
		onReachBottom() {
			if (that.moreTrue) {
				return
			}
			that.moreTrue = true;
			that.getData();
			console.log("触底了")
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			bian(index) {
				if (that.bianTrue) {
					return
				}
				that.bianTrue = false;
				that.page = 1;
				that.currentIndex = index;
				that.index = index;
				that.last_page = false;
				console.log(this.currentIndex)
				if (that.currentIndex == 0) {
					that.myStatus = 0;
				}
				if (that.currentIndex == 1) {
					that.myStatus = 1
				}
				if (that.currentIndex == 2) {
					that.myStatus = 4
				}
				if (that.currentIndex == 3) {
					that.myStatus = 5
				}
				if (that.currentIndex == 4) {
					that.myStatus = 3
				}

				that.getData();



			},
			quxiao(code) {

				uni.showModal({
					title: '提示',
					content: '确定取消订单吗',
					success: function(res) {
						if (res.confirm) {
							var turl = "bidding_list/bidding_cancel";
							var data = {
								code: code
							}
							service.P_post(turl, data).then(res => {
								console.log(res.data.data)
								var data = res.data.data;
								if (res.code == 1) {
									uni.showToast({
										title: '已取消',
										icon: 'none',
										success() {
											setTimeout(() => {
												that.page = 1;
												that.getData()
											}, 1000)

										}
									});
								} else {
									that.moreTrue = false;
									that.bianTrue = false;
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
								that.bianTrue = false;
								console.log(e)
								uni.showToast({
									title: "服务器异常",
									icon: "none"
								})
							})
							

							// uni.showToast({
							// 	title: '取消订单成功',
							// 	icon: 'none',
							// });
						} else if (res.cancel) {
							uni.showToast({
								title: '取消订单失败',
								icon: 'none',
							});
						}
					}
				});
			},
			shouhuo(code) {
				var turl = "bidding_list/bidding_sure";
				var data = {
					code: code
				}
				service.P_post(turl, data).then(res => {
					console.log(res.data.data)
					var data = res.data.data;
					if (res.code == 1) {
						uni.showToast({
							title: '已确认完成',
							icon: 'none',
							success() {
								that.page = 1;
								that.getData()
							}
						});
					} else {
						that.moreTrue = false;
						that.bianTrue = false;
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
					that.bianTrue = false;
					console.log(e)
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
				uni.showToast({
					title: '已确认完成',
					icon: 'none',
				});

			},
			getData() {
				var turl = "user/bidding_order";
				var data = {
					limit: that.limit,
					page: that.page,
					status: that.myStatus
				}
				uni.showLoading({
					mask: true,
					title: '正在获取数据'
				})
				var nowpage = that.page
				service.P_post(turl, data).then(res => {
					console.log(res.data.data)
					var data = res.data.data;
					if (res.code == 1) {
						if (nowpage == 1) {
							that.bianTrue = false;
							console.log("第一页")
							if (data.length != 0) {
								that.page++
							}
							that.shuju = res.data.data
						} else {
							console.log("第二页")
							that.moreTrue = false;
							if (data.length != 0) {
								for (var i = 0; i < data.length; i++) {
									that.shuju.push(data[i])
								}
								that.page++
							} else {
								console.log("没有了");
								that.last_page = true;
							}

						}
					} else {
						that.moreTrue = false;
						that.bianTrue = false;
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
					that.bianTrue = false;
					console.log(e)
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
			}


		}
	}
</script>

<style>
	.mianu {
		padding-top: 95rpx;
	}

	.fuwus {
		padding: 0 15rpx;
		height: 36rpx;
		background: #FFB017;
		border-radius: 4px;
		color: #fff;
	}

	.ping {
		padding: 0 15rpx;
		height: 36rpx;
		background: #2DD1A9;
		border-radius: 4px;
		color: #fff;
	}

	.quxi {
		padding: 0 15rpx;
		height: 36rpx;
		background: #BBBBBB;
		border-radius: 4px;
		color: #fff;
	}

	.zhao {
		padding: 0 15rpx;
		height: 36rpx;
		background: #4CADFE;
		border-radius: 4rpx;
	}

	.quna {
		width: 25rpx;
		height: 12rpx;
		margin-top: 8rpx;
	}

	.fu {
		width: 178upx;
		height: 60upx;
		border: 1px solid #EB4C50;
		border-radius: 30upx;
	}

	.quxiao {
		width: 155rpx;
		height: 60rpx;
		background: #F43B31;
		border-radius: 30rpx;
		color: #fff;
	}

	.img {
		width: 200upx;
		height: 200upx
	}

	.blle {

		color: #A2B76A;
	}

	.shuju {
		background: #FFFFFF;

	}

	page {
		background-color: #F5F5F5;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.dai {
		color: #EB4C50;
	}

	.content {
		background-color: #F5F5F5;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	.active {
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: bold;
		color: #000 !important;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 16rpx;
	}

	/* .active:after {
		content: "";
		width: 35rpx;
		height: 5rpx;
		background: #EB4C50;
		border-radius: 3rpx;
		display: flex;
		margin-top: 18rpx;
	} */

	.fuwu {
		text-align: center;
		font-size: 28rpx;
		font-family: PingFang;
		font-weight: 500;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #999;
	}



	.harder {
		height: 97rpx;
		background-color: #fff;
		top: 0;
		/* #ifdef H5 */
		top: 88upx;
		/* #endif */
	}

	.zans {
		width: 365rpx;
		height: 313rpx;
	}
</style>
