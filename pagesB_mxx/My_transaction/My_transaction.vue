<template>

	<view class="content">
		<topbar bg_color="#fff" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #999;" @click="fanhui"> </text>
			<text class=" fs18 pl35 fwb">我买到的</text>
			<text class="pr5 fs14 fwb" @click='jump' data-url="../My_transactions/My_transactions" :data-type="3">我卖出的
			</text>
		</topbar>
		<!-- 	<view class="harder flex ju_c aic ">
			
			<view class="fuwu flex-1 flex"  v-for="(item,index) in title"
				:key="index" @click="bian(index)">
				
				<text class="" :class="currentIndex== index?'active':''">{{item.ti}}</text>
				<image src="/static/images/ma/daindanqua.png" mode="aspectFill" class="quna " v-if="currentIndex== index"></image>
			</view>
		</view> -->

		<view class="flex ju_c aic width harder fixed top25  " :style="'top: '+CustomBar+'px;'">
			<view class="fuwu flex-1 flex " v-for="(item,index) in title" :key="index" @click="bian(index)">
				<text class="" :class="currentIndex== index?'active':''">{{item.ti}}</text>
				<image src="/static/images/ma/daindanqua.png" mode="aspectFill" class="quna "
					v-if="currentIndex== index"></image>
			</view>
		</view>

		<view class="data_concent" style="padding-top: 95rpx;">
			<!-- <view class="  "> -->

			<view class="flex aic flex-col  pt35 mt35" v-if="datas.length < 1">
				<image src="/static/images/ma/dindanwu.png" mode="aspectFill" class="zans"></image>
				<text class="zanwu">您还没有相关订单哦</text>
			</view>
			<view class="" v-else>
				<view class="shuju pl15 pr15 pb15 pt10 mt12" v-for="(item,index) in datas" :key="index">
					<view class="bian   ">
						<view class="flex  aic">
							<image :src="getimg(item.pinfo.img)" mode="aspectFill" class="qina"></image>
							<view class="pl10" style="width: 592rpx;">
								<text class="zhaunrang cf  fs12">{{item.pinfo.title}}</text>
								<text class="fs14 pl15">{{item.title}} </text>
							</view>
						</view>
						<view class="flex pr10 pt10" style="flex-wrap: wrap;">
							<view class="cf sxun fs11 flex aic ju_c" v-for="(item1,index1) in item.label_arr"
								:style="'background:'+item1.color" style="margin-right: 8upx; margin-bottom: 8upx;">
								{{item1.title}}
							</view>
						</view>
						<view class="flex flex-between pt15">
							<view class="flex aic" style="color:#F43B31;">
								<text class="fs18 fwb">{{item.price}}</text>
								<!-- <text class="fs12">万</text> -->
							</view>
							<view class="fu flex aic ju_c fs13" v-if="item.buy_type==1" @click.stop="jump"
								:data-url="`/pagesA_lzc/pay/pay?id=${item.id}&price=${item.price}`">
								去付款
							</view>
							<!-- <view class="fu flex aic ju_c fs13" @click.stop="shouhuo(item.code)"
								v-if="item.buy_type==3 || item.buy_type==2">
								确认完成
							</view> -->
							<view class="fu flex aic ju_c fs13" v-if="item.buy_type==4" @click='jump'
								data-url="../evaluate/evaluate" :data-shifou='true'>
								去评价
							</view>
						</view>
					</view>

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
				StatusBar: this.StatusBar,
				CustomBar: this.CustomBar,
				title: [{
						ti: '全部',
						id: 6
					},
					{
						ti: '待付款',
						id: 1
					},
					{
						ti: '待交易完成',
						id: 2
					},
					{
						ti: '待评价',
						id: 4
					},
				],

				datas: [{
					time: '2021-06-07',
					img_name: '/static/images/ma/xue.jpg',
					shou: '151****5678',
					exe: 205,
					qutong: '普通公司',
					title: '汽车用品/电子/清洗/改装专营店 汽车用品/电子/清洗/改装专营店',
					chutime: '2020-11-25',
					nem: '20.00',
					stst: 1,
				}],
				currentIndex: 0,
				// index: 0,
				status: 2,
				page: 1,
				size: 20,
				shownum:0

			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			console.log(service.IPurl + 'user/order')
			let token = uni.getStorageSync('token');
			that = this
			console.log(option)
			that.onRetry()

		},
		onShow() {
			if(that.shownum>0){
				that.onRetry()
			}
			that.shownum++
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		onReachBottom() {
			that.getdata()
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
				var jkurl = "/user/order"
				var datas = {
					type: 1,
					page: that.page,
					limit: 20,
					buy_type: that.title[that.currentIndex].id
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
			gettime(img, type) {
				return service.gettime(img, '.', type)
			},
			jump(e) {
				service.jump(e)
			},
			bian(index) {
				this.currentIndex = index
				// this.index = index
				console.log(this.currentIndex)
				that.onRetry()
			},
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
			quxiao() {
				uni.showModal({
					title: '提示',
					content: '确定取消订单吗',
					success: function(res) {
						if (res.confirm) {
							uni.showToast({
								title: '取消订单成功',
								icon: 'none',
							});
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
				console.log(code)
				var turl = "user/orderSure";
				var data = {
					code: code
				}
				service.P_post(turl, data).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: '已确认完成',
							icon: 'none',
							success() {
								setTimeout(function() {
									that.page = 1;
									that.getdata()
								}, 1000)

							}
						});
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
				// uni.showToast({
				// 	title: '已确认收货',
				// 	icon: 'none',
				// });
				// setTimeout(function() {
				// 	uni.navigateTo({
				// 		url: '../Successful_trade/Successful_trade?id=' + 3
				// 	})
				// }, 1000)

			},



		}
	}
</script>

<style>
	.yig {
		padding: 0 15rpx;
		height: 36rpx;
		background: #F9661E;
		border-radius: 7px;
		color: #fff;
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

		color: #F43B31;
	}

	.zhaunrang {
		width: 100rpx;
		background: #B7D0F8;
		border-radius: 4px;
		padding: 0 15rpx;
		height: 36rpx;
	}

	.qina {
		width: 87rpx;
		height: 87rpx;

		border-radius: 18rpx;
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
		position: fixed;

		top: 0;

		z-index: 900;
		left: 0;
		right: 0;
	}

	.zans {
		width: 365rpx;
		height: 313rpx;
	}

	.bian {


		border-radius: 10rpx;
	}

	.touxiang {
		width: 40rpx;
		height: 40rpx;
	}

	.gongsi {
		width: 87rpx;
		height: 87rpx;
	}

	.gongsia {
		padding: 10rpx;
		background: linear-gradient(150deg, #E9C79A 0%, #E7BD88 100%);
		border-radius: 18rpx;
	}

	.qut {

		width: 200rpx;
		height: 36rpx;
		background: #B7D0F8;
		border-radius: 6rpx;
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

	.data_concent {
		min-height: 100vh;
		/* #ifdef H5 */
		min-height: calc(100vh - 90upx);
		/* #endif */
	}
</style>
