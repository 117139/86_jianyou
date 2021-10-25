<template>

	<view class="content">
		<topbar bg_color="#FFFFFF" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #999999;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;"></text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar>
		<view class="pl30 pt25 fs20 fwb">
			忘记密码
		</view>
		<view class="pl30 pt35 pr30 mt12 ">
			<view class="flex b-b-1 pb5">
				<text class="icon-yonghu iconfont c2"></text>
				<!-- <input  class="pupu_shouj" type="text" placeholder="用户名/手机号" placeholder-class="c2 pl10 fs16"/> -->
				<input placeholder-class="c2 fs16 " type="text" placeholder="手机号"
					class="flex_1 pl10 fs16" v-model="phone" />
			</view>

			<view class="flex b-b-1 pt30 pb5">
				<text class="icon-mima1 iconfont c2 fwb"></text>
				<input placeholder-class="c2  fs16 " type="text" class="flex_1 pl10 fs16" placeholder="验证码" v-model="code" />
				<view @click='codeClick' v-if='changess' class="fs12 bgcf" style="color: #FF1919;"> 获取验证码</view>
				<view v-else class="fs12 " style="background-color: #ffffff;">{{second}}后重试</view>
			</view>
			<view class="flex b-b-1 pt30 pb5">
				<text class="icon-mima1 iconfont c2 fwb"></text>

				<!-- <input  class="pupu_shouj" :type="seen ? type_text : type_password" placeholder="密码" placeholder-class="c2 pl10 fs16 pupu_shouj" placeholder-style="width: 200rpx;"/> -->
				<input placeholder-class="c2 fs16  " type="password" class="flex_1 pl10 fs16" placeholder="新密码" v-model="password" />

			</view>
			<view class="flex b-b-1 pt30 pb5">
				<text class="icon-mima1 iconfont c2 fwb"></text>

				<!-- <input  class="pupu_shouj" :type="seen ? type_text : type_password" placeholder="密码" placeholder-class="c2 pl10 fs16 pupu_shouj" placeholder-style="width: 200rpx;"/> -->
				<input placeholder-class="c2 fs16  " type="password" class="flex_1 pl10 fs16" placeholder="重复新密码" v-model="repassword" />

			</view>
		</view>
		<view class="funs flex aic ju_c cf " @click="qued">
			确定
		</view>

	</view>
</template>

<script>
	import service from '../../components/service.js';
	var that
	var interval
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		name: "login",
		data() {
			return {
				showText: true,
				second: 59,
				disabled: false,
				changess: true,
				usr_pwd: "",
				seen: false,
				type_text: "text",
				password: "",
				repassword: '',
				phone: '',
				code: '',
				phoneYan: false,
				yYan: false,
				pYan: false,
				op:true
			};
		},
		onHide() {

		},
		onLoad() {
			that = this
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			jump(e) {
				return api.jump(e)
			},
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
			changeSeen() {
				this.seen = !this.seen;
			},
			
			qued() {
				// var data1={
				// 	pay_money:1,
				// 	token: 'ca295a841bee036b9daf330ba61af681'
				// }
				
				// service.P_post('https://www.dougong.com/api/User/pay', data1).then(res => {
					
				// 	console.log(res)
					
				// 	if (res.code == 1) {
				// 		var datas = res.data
				// 		console.log(typeof datas)
				
				// 		if (typeof datas == 'string') {
				// 			datas = JSON.parse(datas)
				// 		}
				// 		uni.requestPayment({
				// 			provider: 'alipay',
				// 			orderInfo: res.msg, //微信、支付宝订单数据
				// 			success: function(res) {
				// 				console.log('success:' + JSON.stringify(res));
				// 				// that.shows =false
				// 				wx.showToast({
				// 					title: '支付成功',
				// 					icon: 'none',
				// 					duration: 1000
				// 				});
				// 				setTimeout(function() {
				// 					that.btnkg = 0
				// 					service.login_tel('1')
				// 				}, 1000)
				// 			},
				// 			fail: function(err) {
				// 				that.btnkg = 0
				// 				console.log('fail:' + JSON.stringify(err));
				// 				uni.showModal({
				// 					content: "支付失败",
				// 					showCancel: false
				// 				})
				// 			}
				// 		});
						
				// 	} else {
				// 		that.btnkg = 0
				// 		if (res.msg) {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: res.msg
				// 			})
				// 		} else {
				// 			uni.showToast({
				// 				icon: 'none',
				// 				title: '操作失败'
				// 			})
				// 		}
				// 	}
				// }).catch(e => {
				// 	that.btnkg = 0
				// 	console.log(e)
				// 	uni.showToast({
				// 		icon: 'none',
				// 		title: '操作失败'
				// 	})
				// })
				// return
				// var  str='app_id=2021002160668484&format=JSON&charset=utf-8&sign_type=RSA2&version=1.0&return_url=https%3A%2F%2Fhuizetianxia.top.a.800123456.vip%2Fapi%2Fnotify%2Falipay&notify_url=https%3A%2F%2Fhuizetianxia.top.a.800123456.vip%2Fapi%2Fnotify%2Falipay&timestamp=2021-08-05+18%3A00%3A22&biz_content=%7B%22out_trade_no%22%3A%22V162814630966586%22%2C%22total_amount%22%3A0.01%2C%22subject%22%3A%22%5Cu624b%5Cu8868%5Cu5145%5Cu503c%22%2C%22product_code%22%3A%22QUICK_MSECURITY_PAY%22%7D&method=alipay.trade.app.pay&sign=XKyJC%2BUn7jqaE9EU45I1s%2BuOtqyQSnsP0DjIBUEQLaCobnkid%2B5%2FhFbIhWcosoNngPQkua7AOHA0P41Rx%2BaJkj4%2BOivj0Rrnw0bt76bI%2BcpfNdW1t0HIeohWhFVV%2BcDSa6rzyDODTD3lY%2BHn7v%2B74OYQAcKlOj7bsZrPZPYPfZ8yJ4CagWxlZMlOtfwY2CWkhuCRa1d3bZ6BbtegVEOx5trhqPP58A%2BNuOEiK9DYn7dGeEwmxL4b5S2JLAGsQONcnGIgqf%2BEYDsgrSALyQwSKYb4fOE4WYPu%2BwTHjzf0Rt3piG%2FQ2G%2FBIA53NzpaRtu9UhZ2UkS7BdLiJgmzWeIBlg%3D%3D'
				
				
				
				
				// return
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (!this.code) {
					wx.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return
				}
				if (that.password !== that.repassword && that.password.length>0&&that.repassword) {
					uni.showToast({
						icon: 'none',
						title: '两次密码输入不一致'
					})
					return
				}
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				let data = {
					phone:this.phone,
					code:this.code,
					password:this.password
				}
				this.phone = '';
				this.code = '';
				this.password = '';
				console.log('可以了')
				service.P_post('/sign/forget', data).then(res => {
					
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
				
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						setTimeout(()=>{
							that.btnkg = 0
							uni.navigateBack({
								delta:1
							})
								// uni.redirectTo({
								// 	url:'/pagesB_mxx/login/login'
								// })
						},1000)
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
			// 获取验证码
			codeClick() {
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				service.P_post('/sign/SmsCode', {
					phone: this.phone
				}).then((res) => {
					
					console.log(res)
					if(res.code == 1){
						that.btnkg = 0
						that.changess = false;
						that.disabled = true
						// console.log("1")
						that.showText = false
						interval = setInterval(() => {
							--that.second
						}, 1000)
						setTimeout(() => {
							clearInterval(interval)
							that.showText = true
							that.second = 60
							that.disabled = false
							that.changess = true;
						}, 60000)
					}else{
						that.btnkg = 0
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
		}
	}
</script>

<style>
	.c2 {
		color: #c2c2c2;
	}

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

	.funs {
		width: 600rpx;
		height: 90rpx;
		background: #FF1919;
		border-radius: 45rpx;
		margin-left: 70rpx;
		margin-top: 120rpx;
	}
</style>
