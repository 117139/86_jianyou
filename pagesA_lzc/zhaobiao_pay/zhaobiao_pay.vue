<template>

	<view class="content ">
		<view class="b-t-1 pl15 pr15 pt20">
			<view class="mian  pl15 pr15 pt5 pb5">
				<input type="number" v-model="minuit" placeholder="请输入金额" class=" fs15 pt15 pb15"/>
			</view>
			<view class="st_body_hr dis_flex  aic">
				<text>支付方式</text>
			</view>
			<view class="TO_price dis_flex aic ju_b">
				<view class="dis_flex aic">
					<image class="icon_img" :src="getimg('/static_s/images/lzc/pay/wei.png')" mode="aspectFit"></image>
					<text class="fs15 fw400 price1">微信支付</text>
				</view>
				<view class="dis_flex aic ju_c" :class="[isActive==1?'radio1':'radio2']" @click="radioClick(1)">
					<image class="rimg" :src="getimg('/static_s/images/lzc/commin/dui.png')" mode="aspectFit"></image>
				</view>
			</view>
			<view class="TO_price dis_flex aic ju_b">
				<view class="dis_flex aic">
					<image class="icon_img" :src="getimg('/static_s/images/lzc/pay/zhi.png')" mode="aspectFit"></image>
					<text class="fs15 fw400 price1">支付宝支付</text>
				</view>
				<view class="dis_flex aic ju_c" :class="[isActive==2?'radio1':'radio2']" @click="radioClick(2)">
					<image class="rimg" :src="getimg('/static_s/images/lzc/commin/dui.png')" mode="aspectFit"></image>
				</view>
			</view>
			<!-- <view v-if="platform != 'android'" class="TO_price dis_flex aic ju_b">
				<view class="dis_flex aic">
					<image class="icon_img" :src="getimg('/static_s/images/lzc/pay/ping.png')" mode="aspectFit"></image>
					<text class="fs15 fw400 price1">苹果支付</text>
				</view>
				<view class="dis_flex aic ju_c" :class="[isActive==3?'radio1':'radio2']" @click="radioClick(3)">
					<image class="rimg" :src="getimg('/static_s/images/lzc/commin/dui.png')" mode="aspectFit"></image>
				</view>
			</view> -->
			<view class="flex aic ju_c fun cf fs16" style="margin-top: 150rpx;" @click="sub_fuc">
				保存
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
	var productIds
	export default {
		data() {
			return {
				cycle_data:'',
				type:1,
				minuit:'',
				id:'',
				isActive:1
			}
		},
		onHide() {

		},
		onLoad(option) {
			that=this
			that.id=option.id
			
			
			
			
			productIds=uni.getStorageSync('apple')
			// #ifdef APP-PLUS
				plus.payment.getChannels((channels) => {
					console.log("获取到channel" + JSON.stringify(channels))
					for (var i in channels) {
						var channel = channels[i];
						if (channel.id === 'appleiap') {
							that.iapChannel = channel;
							that.requestOrder();
						}
					}
					if (!that.iapChannel) {
						console.log('暂不支持苹果 iap 支付')
					}
				}, (error) => {
					console.log('暂不支持苹果 iap 支付')
				});
			// #endif
			if(that.platform == 'android'){
				that.isActive=1
			}else{
				that.isActive=3
			}
		},
		onShow() {
			console.log(that.platform)
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','platform'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			tiaozhuan(e) {
				return service.tiaozhuan(e)
			},
			radioClick(index){
				that.isActive=index
				// for (var i = 0; i < this.payList.length; i++) {
				// 	if(i == index){
				// 		console.log(11)
				// 		this.payList[i].isActive = true;
				// 	}else{
				// 		console.log(22)
				// 		this.payList[i].isActive = false;
				// 	}
				// }
			},
			sub_fuc(){
				
				if(!that.minuit){
					uni.showToast({
						title: '请输入金额',
						icon: 'none',
					});
					return
				}
				var jkurl='/bidding_list/bidding_add'
				var data={
					pid:that.id,
					price:that.minuit,
					buy_status:that.isActive
				}
				console.log(data)
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				// return
				uni.showLoading({
					mask:true,
					title:'正在提交数据'
				})
				service.P_post(jkurl, data).then(res => {
					
					console.log(res)
					if (res.code == 1) {
						// that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						// wx.showToast({
						// 	title: '支付成功',
						// 	icon: 'none',
						// 	duration: 1000
						// });
						// setTimeout(function() {
						// 	that.btnkg = 0
						// 	service.wxlogin('token')
						// 	uni.redirectTo({
						// 		url:'/pagesB_mxx/My_order/My_order'
						// 	})
						// }, 1000)
						// return
						
						if (that.isActive == 3) {
							console.log(datas.code)
							that.no_id=datas.code
							that.apple_pro_id=datas.apple
							that.requestPayment_ios()
							return
						}
						// 支付宝
						if (that.isActive == 2) {
							uni.requestPayment({
								provider: 'alipay',
								orderInfo: datas, //微信、支付宝订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									that.shows =false
									wx.showToast({
										title: '支付成功',
										icon: 'none',
										duration: 1000
									});
									setTimeout(function() {
										that.btnkg = 0
										service.wxlogin('token')
										uni.redirectTo({
											url:'/pagesB_mxx/My_order/My_order'
										})
									}, 1000)
								},
								fail: function(err) {
									that.btnkg = 0
									console.log('fail:' + JSON.stringify(err));
									uni.showModal({
										content: "支付失败",
										showCancel: false
									})
								}
							});
						}
						//微信
						if (that.isActive == 1) {
							uni.requestPayment({
								provider: 'wxpay',
								orderInfo: datas, //微信、支付宝订单数据
								success: function(res) {
									console.log('success:' + JSON.stringify(res));
									that.shows =false
									wx.showToast({
										title: '支付成功',
										icon: 'none',
										duration: 1000
									});
									setTimeout(function() {
										that.btnkg = 0
										service.wxlogin('token')
										uni.redirectTo({
											url:'/pagesB_mxx/My_order/My_order'
										})
									}, 1000)
								},
								fail: function(err) {
									that.btnkg = 0
									console.log('fail:' + JSON.stringify(err));
									uni.showModal({
										content: "支付失败",
										showCancel: false
									})
								}
							});
						}
						
						
						
						
						
						
					
					} else {
						that.btn_kg = 0
						// that.$refs.htmlLoading.htmlReset_fuc(1)
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
						
						setTimeout(function(){
							that.btn_kg = 0
							uni.redirectTo({
								url:'/pagesB_mxx/My_order/My_order'
							})
						},1000)
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},
			iap_fuc(paymsg) {
				var that = this
				const data = {
					receipt: paymsg,
					orderSn: that.no_id
				}
				uni.showLoading({
					title: '正在进行校验',
					mask:true
				})
				var jkurl = '/pay/iphone_pay'
				console.log('开始校验')
				service.post(jkurl, data,
					function(res) {
						uni.hideLoading()
						that.btnkg = 0
						if (res.data.code == 1) {
							wx.showToast({
								title: '支付成功',
								icon: 'none',
								duration: 1000
							});
							setTimeout(function() {
								that.btnkg = 0
								service.login_tel('1')
							}, 1000)
						}
					},
					function(err) {
						uni.hideLoading()
						that.btnkg = 0
						if (err.data.msg) {
							uni.showToast({
								icon: 'none',
								title: err.data.msg
							})
						} else {
							uni.showToast({
								icon: 'none',
								title: '操作失败'
							})
						}
					}
				)
			
			},
			requestOrder() {
				var that = this
				uni.showLoading({
					title: '检测支付环境...'
				})
				console.log('productIds===>' + productIds)
				console.log('productIds.vip===>' + productIds.vip)
				that.iapChannel.requestOrder(productIds.vip, (orderList) => { //必须调用此方法才能进行 iap 支付
					this.disabled = false;
			
					console.log('requestOrder success666: ' + JSON.stringify(orderList));
					uni.hideLoading();
					// for (var index in orderList) {
					// 	var OrderItem = orderList[index];
					// 	console.log("Title:" + OrderItem.title + "Price:" + OrderItem.price + "Description:" + OrderItem.description +
					// 		"ProductID:" + OrderItem.productid);
					// }
				}, (e) => {
					console.log('requestOrder failed: ' + JSON.stringify(e));
					uni.showModal({
						content: JSON.stringify(e),
						showCancel: false
					})
					uni.hideLoading();
					// this.errorMsg();
				});
			},
			requestPayment_ios() {
				var that = this
				// console.log('正在进行苹果支付')
				uni.showLoading({
					title: '正在进行支付,请勿进行其他操作',
					mask:true
				})
				// return
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '正在发起支付'
				// });
				that.shows =false
				console.log('productid', that.apple_pro_id)
				console.log('productid', typeof that.apple_pro_id)
				uni.requestPayment({
					provider: 'appleiap',
					orderInfo: {
						productid: that.apple_pro_id
					},
					success: (e) => {
						uni.hideLoading()
						console.log(e)
						that.btnkg = 0
						console.log(JSON.stringify(e))
						console.log('苹果支付成功')
						that.iap_fuc(JSON.stringify(e))
						// uni.showModal({
						// 	content: "感谢您的赞助" + JSON.stringify(e),
						// 	showCancel: false
						// })
					},
					fail: (e) => {
						console.log(JSON.stringify(e))
						that.btnkg = 0
						uni.hideLoading()
						uni.showModal({
							icon: 'none',
							content: "支付失败,原因为: " + e.errMsg,
							showCancel: false
						})
					},
					complete: (e) => {
						console.log(e)
						console.log("payment结束")
						that.loading = false;
					}
				})
			
			},
		}
	}
</script>

<style scoped>
	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	.mian{
		
box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
	}
	
	.fun{
		width: 616rpx;
		height: 81rpx;
		background-color: #F43B31;
		border-radius: 41rpx;
		margin: 0 auto;
	}
	.st_body_hr {
		width: 100%;
		height: 80upx;
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #999999;
		line-height: 30upx;
		box-sizing: border-box;
	}
	
	.price1 {
		font-family: PingFang SC;
		color: #333333;
		line-height: 23upx;
		margin-left: 21upx;
	}
	
	.icon_img {
		width: 58upx;
		height: 58upx;
	}
	
	.icon_img1 {
		width: 58upx;
		height: 43upx;
	}
	
	.icon-weixinzhifu {
		color: #13B657;
	}
	
	.payBtn {
		width: 694upx;
		height: 80upx;
		background-color: #FF1919;
		border-radius: 10upx;
		line-height: 80upx;
		margin-top: 132upx;
	}
	
	.radio1 {
		width: 42upx;
		height: 42upx;
		border-radius: 50%;
		background-color: #FF1919;
	}
	.radio2 {
		width: 42upx;
		height: 42upx;
		border: 1px solid #999999;
		border-radius: 50%;
	}
	
	.rimg {
		width: 26upx;
		height: 26upx;
	}
</style>
