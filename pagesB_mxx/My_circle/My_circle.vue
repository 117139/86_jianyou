<template>
	<view class="content">
		<!-- 	<view class="harder flex justify-center align-items-center  pl10 pr10">
			<view class="fuwu flex-1 flex b-t-1 pt10" :class="currentIndex== index?'active':''"
				v-for="(item,index) in title" :key="index" @click="bian(index)">
				{{item.ti}}
			</view>
		</view> -->
		<view class=" flex ju_c aic  pl10 pr10  width harder  fixed top ">
			<!-- <view class=" flex aic ju_c"> -->
			<!-- <view class="fuwu flex-1 flex b-t-1 pt12" v-for="(item,index) in title" :key="index" @click="bian(index)" -->
			<view class="fuwu flex-1 flex pt12" v-for="(item,index) in title" :key="index" @click="bian(index)"
				:class="currentIndex== index?'active':''">

				{{item.ti}}
			</view>
			<!-- </view> -->

		</view>

		<view class="" style="padding-top: 95rpx;">
			<view class="bgcf pl15 pr15 pb5  pt12" @click='jump' data-url='/pagesB_mxx/serch_circle/serch_circle'
				:data-shifou='true'>
				<view class="sou pl15 pr15 flex aic ">
					<text class="icon-sousuo iconfont c9 fwb fs16"></text>
					<text class="fs12 c9 pl10">搜索更多精彩内容</text>
				</view>
			</view>
			<!-- v-if=" item.stst == currentIndex" -->
			<!-- {{datas}} -->
			<view class="" v-for="(item,index) in datas" :key="index">
				<view class=" pl15 pr15 mb10  pt12 pb12 bgcf  " v-if="currentIndex==2" @click.stop='jump'
					:data-url="`/pagesA_lzc/circleDetail2/circleDetail2?id=${item.id}`" :data-shifou='true'>
					<view class="flex ju_b aic c9">
						<view class="flex aic">
							<text class="fs14 ">{{item.phone}}</text>
							<text class="fs13 pl10">{{item.create_time}}</text>
						</view>
						<text class="fs13" @click.stop="quxiao(item.id)">删除</text>
					</view>
					<view class="oh2 fs15 pt10 lh15">
						{{item.content}}
					</view>
					<view class="dis_flex fww mt8 tbitem_lls">
						<view v-for="(img1,index1) in item.pic" :key="index1" class="shuju_imgs">
							<image :src="getimg(img1)" mode="aspectFill"></image>
						</view>
						<view v-for="(img1,index1) in item.pic" :key="index1" class="shuju_imgs">
							<image :src="getimg(img1)" mode="aspectFill"></image>
						</view>
					</view>
					<view class="flex flex-right aic" style="color: #DDDDDD;">
						<view class="">
							<text class="icon-pinglun iconfont fs15"></text>
							<text class="fs12 pl3">{{item.comment}}</text>
						</view>
						<view class="pl15" v-if="item.fans==1" @click.stop="zan(item)">
							<text class="icon-zan iconfont fs15" style="color: #ff0000;"></text>
							<text class="fs12 pl3" style="color: #ff0000;">{{item.praise}}</text>
						</view>
						<view class="pl15" v-else @click.stop="zan(item)">
							<text class="icon-zan- iconfont fs15"></text>
							<text class="fs12 pl3">{{item.praise}}</text>
						</view>
					</view>
				</view>
				<view class="  bgcf  pl15 pr15  " v-else>
					<view class="b-b-1 flex ju_b aic pt12 pb12" @click.stop="jump"
						:data-url="`/pagesA_lzc/circleDetail/circleDetail?id=${item.id}`">
						<view class="flex ju_b aic">
							<image :src="getimg(item.pic)" mode="aspectFill" class="img_hsuju"></image>
							<view class="flex  flex-col pl10" style="width: 420rpx;">
								<text class="fs15 oh1">{{item.title}}</text>
								<text class="fs12 c9  pt5 oh1">{{item.subtitle}}</text>
							</view>
						</view>
						<view class="guan fs12 flex aic ju_c" v-if="currentIndex == 0" @click.stop='jump'
							:data-url="'../Circle_management/Circle_management?id='+item.id" :data-shifou='true'>
							管理
						</view>
						<view class="yihuan fs12 flex aic ju_c" v-if="currentIndex == 1">
							已关注
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
	import Vue from 'vue'
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
						ti: '我的创建',
						id: 1
					},
					{
						ti: '我的关注',
						id: 2
					},
					{
						ti: '我的帖子',
						id: 2
					},

				],

				datas: [],
				currentIndex: 0,
				status: 2,
				type: 1,
				page: 1,
				zanTrue: false,
				deltrue: false,
				data_last: false,
				shownum:0
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onLoad(option) {
			// console.log(uni.getStorageInfoSync('token'));
			let token = uni.getStorageSync('token');
			that = this
			console.log(token)
			that.onRetry()

		},
		onShow() {
			if(that.shownum>0){
				that.onRetry()
			}
			that.shownum++
		},
		onReachBottom() {
			console.log(that.btnkg)
			that.getdata()
		},
		onPullDownRefresh() {
			
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
				var jkurl = "/circle/mine_circle"
				var datas = {
					type: that.type,
					search: '',
					page: that.page,
					limit: 4
				}
				console.log(that.data_last)
				if (that.data_last == true) {
					return
				}
				console.log(that.btnkg)
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

						that.btnkg = 0
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
						that.btnkg = 0
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
			bian(index) {
				let token = uni.getStorageSync('token');
				this.currentIndex = index
				console.log(this.currentIndex)
				if (this.currentIndex == 2) {
					this.type = 3;
				} else if (this.currentIndex == 1) {
					this.type = 2;
				} else {
					this.type = 1;
				}
				that.onRetry()

			},
			getMyTie() {
				var jkurl = "circle/mine_circle";
				var datas = {
					type: 3,
					page: 1,
					limit: 4
				}

				service.P_post(jkurl, datas).then(res => {
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						that.datas = datas.data

					}else{
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
					that.deltrue = false;
					uni.showToast({
						title: "服务器异常",
						icon: 'none'
					})
				})
			},
			quxiao(id) {
				if (that.deltrue) {
					return
				}
				that.deltrue = true;
				var jkurl = "circle/del_post";
				var datas = {
					id: id
				}
				var page_now = that.page
				let token = uni.getStorageSync('token');
				uni.showModal({
					title: '提示',
					content: '确定删除帖子吗',
					success: function(res) {
						if (res.confirm) {
							service.P_post("circle/del_post", {
								id: id
							}).then((res) => {
								if (res.code == 1) {
									uni.showToast({
										title: "删除成功",
										icon: 'none',
										success: () => {
											setTimeout(() => {
												that.getMyTie();
												that.deltrue = false;
											}, 1000)
										}
									})
								} else {
									that.deltrue = false;
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
								that.deltrue = false;
								uni.showToast({
									title: "服务器异常",
									icon: 'none'
								})
							})
						} else if (res.cancel) {
							that.deltrue = false;
						}
					}

				});
			},
			/* 点赞 */
			zan(item) {
				var id = item.id;
				var fans = item.fans;
				console.log(fans)
				if (this.zanTrue) {
					return
				}
				this.zanTrue = true;
				service.P_post("circle/follow_post", {
					id: id
				}).then((res) => {
					if (res.code == 1) {
						var  new_num=item.praise
						if (item.fans == 1) {
							Vue.set(item,'fans',2)
							new_num--
							console.log(new_num)
							Vue.set(item,'praise',new_num)
							this.zansTrue = false;
						} else {
							Vue.set(item,'fans',1)
							new_num++
							console.log(new_num)
							Vue.set(item,'praise',new_num)
							this.zansTrue = false;
						}
					} else {
						this.zanTrue = false;
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
					this.zanTrue = false;
					console.log(e)
					uni.showToast({
						title: "服务器异常",
						icon: 'none'
					})
				})
				// if(this.iszan){
				// 	this.znum --;
				// }else{
				// 	this.znum ++;
				// }
				// console.log(111)
			},
			


		}
	}
</script>

<style scoped>
	.sou {
		width: 690rpx;
		height: 60rpx;
		background: #F8F8F8;
		border-radius: 30rpx;
	}

	.fu {
		width: 178upx;
		height: 60upx;
		border: 1px solid #EB4C50;
		border-radius: 30upx;
	}

	.quxiao {
		width: 178rpx;
		height: 60rpx;
		border: 1px solid #666666;
		border-radius: 30rpx;
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
		box-shadow: 0px 10rpx 19rpx 3px rgba(153, 153, 153, 0.08);
		border-radius: 8px;
	}

	page {
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.dai {
		color: #EB4C50;
	}

	.content {
		background-color: #F8F8F8;
		width: 100%;
		/* height: 100%; */
		min-height: 100vh;
		margin: 0;
		padding: 0;
		overflow-x: hidden;
	}

	.active {
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #000 !important;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 10px;
	}

	.active:after {
		content: "";
		width: 46rpx;
		height: 5rpx;
		background: #F43B31;
		border-radius: 3rpx;
		display: flex;
		margin-top: 18rpx;
	}

	.fuwu {
		text-align: center;
		font-size: 30rpx;
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
		z-index: 900;
		left: 0;
		right: 0;
		top: 0;
		/* #ifdef H5 */
		top: 88upx;
		/* #endif */
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
		border: 1px solid #999999;
		border-radius: 25rpx;

		color: #999999;
	}

	.shuju_imgs {
		width: 220rpx;
		height: 220rpx;
		min-width: 220rpx;
		border-radius: 4rpx;
		padding: 5upx;
	}

	.shuju_imgs image {
		width: 100%;
		height: 100%;
	}

	.tbitem_lls {
		width: 100%;
		flex-wrap: wrap;
	}
</style>
