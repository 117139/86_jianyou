<template>
	<view class="box">
		<topbar :bg_img="img('/static/images/ct/login/loginbg.png')" :bg_color="'rgba(0,0,0,0)'">
			<text class="iconfont icon-back-line" @tap="back"></text>
			<text>登录</text>
			<text class="iconfont icon-back-line" style="opacity: 0;"></text>
		</topbar>
		<image class="bgimg" :src="img('/static/images/ct/login/loginbg.png')" mode="aspectFill"></image>
		<view class="contentbox dis_flex_c aic">
			<image class="logoimg" :src="img('/static/images/ct/login/logo.png')" mode="scaleToFill"></image>
			<text class="fiamily">羊羊当家</text>
			<image class="txt2" :src="img('/static/images/ct/login/tund.png')" mode="scaleToFill"></image>
			<view class="viewbox dis_flex_c">
				<view class="inputbox ">
					<input type="number" value="" placeholder="请输入您的手机号" v-model="tel" />
				</view>
				<view class="inputbox2 dis_flex aic" v-show="codeLogin">
					<input type="text" value="" placeholder="请输入验证码" v-model="code" />
					<button  v-if="yzm_type==0" @tap="getCode" >获取验证码</button>
					<button  v-if="yzm_type==1" disabled="disabled">{{yztime}}s</button>
				</view>
				<view class="inputbox" v-show="!codeLogin">
					<input type="text" value="" placeholder="请输入密码" v-model="psd" />
				</view>
				<view class="txt02 pt5" style="color: #FF6003;" @click="iscode">
					{{codeLogin?"密码登录":"验证码登录"}}
				</view>
				<text class="txt02">未注册的手机号验证后自动创建账号</text>
				<image class="goimg" :src="img('/static/images/ct/login/goimg.png')" mode="aspectFill" @click="login_fuc">
				</image>
				<view class="wxandqq dis_flex ju_a">
					<image :src="img('/static/images/ct/login/wx.png')" mode="aspectFill" @click="loginByWeixin">
					</image>
					<image :src="img('/static/images/ct/login/qq.png')" mode="aspectFill" @click="qqlogin"></image>
				</view>
				<view class="txt03">
					<text>登录即阅读并同同意</text><text class="sytk" @click="go" data-url='/pagesC_mxx/About/About?id=5'
						:data-shifou='false'>使用条款和服务协议</text>
				</view>
				<image class="bgyuan" :src="img('/static/images/ct/login/bgyuan.png')" mode="scaleToFill"></image>
			</view>
		</view>
	</view>
</template>

<script>
	let weixinAuthService

	import url from "../../components/url.js"
	import service from "../../components/service.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				tel: '',
				code: '',
				psd: '',
				disabled: false,
				codeLogin: true,

				hasWeixinAuth: false,
				yzm_type: 0,
				yztime: 60,
			}
		},
		onLoad() {
			that=this
			// #ifdef APP-PLUS
			// plus.oauth.getServices((services) => {
			// 	weixinAuthService = services.find((service) => {
			// 		return service.id === 'weixin'
			// 	})
			// 	if (weixinAuthService) {
			// 		this.hasWeixinAuth = true
			// 	}
			// });
			// #endif
		},
		methods: {
			...mapMutations(['login']),
			getCode() {
				let that = this
			
				if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '发送成功'
				// })
				// that.codetime()
				// that.btnkg = 0
				// return
				var jkurl = '/login/v_code'
				var data = {
					// type:that.login_type==0?2:that.login_type==2?1:1,
					type:1,
					phone: that.tel
				}
				service.P_post(jkurl, data).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
				
						uni.showToast({
							icon: 'none',
							title: '发送成功'
						})
						console.log(res)
						// that.verification_key = res.data.data.key
						that.codetime()
				
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
			codetime() {
				let that = this
				let time = 60
				let st = setInterval(function() {
					if (time == 0) {
						that.yzm_type = 0
						clearInterval(st);
					} else {
						let news = time--;
						// console.log(news)
						that.yzm_type = 1
						that.yztime = news
			
					}
				}, 1000);
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			




			img(i) {
				return url.getimg(i)
			},
			go(e) {
				return url.tiaozhuan(e)
			},
			
			iscode() {
				this.codeLogin = !this.codeLogin
			},
			login_fuc() {
				if (this.codeLogin) {
					if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
						wx.showToast({
							icon: 'none',
							title: '手机号有误'
						})
						return
					}
					if (this.code == '') {
						uni.showToast({
							title: '请输入验证码',
							icon: 'none',
						});
						return
					}
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// });
				} else {
					if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
						wx.showToast({
							icon: 'none',
							title: '手机号有误'
						})
						return
					}
					if (!this.psd) {
						uni.showToast({
							title: '请输入密码',
							icon: 'none',
						});
						return
					}
					// uni.switchTab({
					// 	url: '/pages/index/index'
					// });
				}
				var jkurl='/login'
				var datas
				if(this.codeLogin){
					datas={
						type:this.codeLogin?1:2,
						phone:this.tel,
						code:this.code,
					}
				}else{
					datas={
						type:this.codeLogin?1:2,
						phone:this.tel,
						password:this.psd,
					}
				}
				
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
			
			
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
				
						uni.showToast({
							icon: 'none',
							title: '登录成功'
						})
						console.log(res)
						uni.setStorageSync('tel', that.tel)
						uni.setStorageSync('password', that.pwd)
						uni.setStorageSync('token', datas.token)
						// uni.setStorageSync('userId', datas.id)
						// uni.setStorageSync('loginmsg', datas)
						that.login(datas)
						// setTimeout(()=>{
						// 	uni.navigateBack({
						// 		delta:1
						// 	})
						// },1000)
				
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

		
			// 倒计时
			
		}
	}
</script>

<style scoped lang="scss">
	.box {
		.bgimg {
			width: 100%;
			height: 100%;
			position: absolute;
			top: 0;
			left: 0
		}

		.logoimg {
			width: 145rpx;
			height: 145rpx;
			border-radius: 10rpx;
			margin-top: 20%;
		}

		.fiamily {
			font-size: 40rpx;
			font-weight: 800;
			padding: 30rpx 0 20rpx 0;
			color: #FFFFFF;
			olor: #FFFFFF;
			z-index: 1;
		}

		.txt2 {
			margin-top: 10rpx;
			width: 506rpx;
			height: 56rpx;
		}

		.viewbox {
			width: 710rpx;
			border-top-right-radius: 10rpx;
			border-top-left-radius: 10rpx;
			z-index: 1;
			padding: 0 40rpx;
			background-color: #FFFFFF;
			position: absolute;
			bottom: 0rpx;

			padding-bottom: 0;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);

			input {
				font-size: 40rpx;
				font-weight: 500;
			}

			button {
				background: linear-gradient(90deg, #F9CAA2, #FF6003);
				box-shadow: 0rpx 0rpx 6rpx 0rpx rgba(0, 0, 0, 0.1);
				border-radius: 34rpx;
				font-size: 28rpx;
				font-weight: 500;
				color: #FFFFFF;
				width: 200rpx;
				margin-left: 10rpx;
				white-space: nowrap;
			}

			.bgyuan {
				position: absolute;
				bottom: 0;
				left: 0;
				width: 30rpx;
				height: 251rpx;
			}
		}

		.inputbox {
			border-bottom: 1rpx solid #ECEDF0;
			padding: 27rpx 0 27rpx 0;
		}

		.inputbox2 {
			border-bottom: 1rpx solid #ECEDF0;
			padding: 30rpx 0 27rpx 0;
		}

		.txt02 {
			margin-top: 20rpx;
			font-size: 26rpx;
			font-weight: 500;
			color: #9CA0B2;
		}

		.goimg {
			margin: 0 auto;
			margin-top: 45rpx;
			width: 108rpx;
			height: 108rpx;
			border-radius: 50%;
		}

		.wxandqq {
			image {
				width: 76rpx;
				height: 76rpx;
				border-radius: 50%;
			}
		}

		.txt03 {
			font-size: 26rpx;
			font-weight: 500;
			color: #333333;
			margin: 0 auto;
			margin-top: 29rpx;
			padding-bottom: 20rpx;

			.sytk {
				color: #FF660C;
				text-decoration: underline;
			}
		}
	}
</style>
