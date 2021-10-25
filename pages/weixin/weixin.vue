<template>
	<view class="content">
		<image class="my_bg" src="/static/images/login_bg.png" mode="widthFix"></image>
		<view class="my_box">
			<!-- <u-icon name="arrow-left" color="#333" size="40" class="inco"></u-icon> -->
			<view class="hdubf" v-if="type==2">您的微信账号 已通过验证</view>
			<view class="hdubf" v-if="type==3">您的QQ账号 已通过验证</view>
			<view class="h2" v-if="type==2">
				首次使用微信登录请先绑定手机号
			</view>
			<view class="h2"  v-if="type==3">
				首次使用QQ登录请先绑定手机号
			</view>

			<view class="input dis_flex aic">
				<image class="im" src="../../static/tel.png"
				 mode=""></image>
				<input class="cscv" type="number" placeholder="请输入手机号码" v-model="tel" />
			</view>
			<view class="input dis_flex aic">
				<image class="im" src="../../static/code.png"
				 mode=""></image>
				<input class="cscv" type="text" placeholder="请输入验证码"  v-model="code"/>
				<!-- <text class="cdsxc">|</text> -->
				<!-- <text class="ojink">获取验证码</text> -->
				<view v-if="yzm_type==0" class="getyzm" @tap="getCode">获取验证码</view>
				<view v-if="yzm_type==1" class="getyzm">{{yztime}}s</view>
			</view>
			<view class="deng" @tap="login_fuc">
			一键绑定
			</view>
			
			
			<!-- <view class="lihai">
				<text class="assd">登录即同意</text>
				<text class="iop" @tap="jump" data-url="/pages/about_xq/about_xq?type=yhxy">服务协议</text>
				<text class="on">和</text>
				<text class="iop" @tap="jump" data-url="/pages/about_xq/about_xq?type=ysxy">隐私政策</text>
				<text class="on">使用本机号码登录</text>

			</view> -->
		</view>
	</view>
</template>

<script>
	import service from "../../components/service.js"
	import {
		mapState,
		mapMutations
	} from 'vuex'
	var that
	export default {
		data() {
			return {
				tel:'',
				code: '',
				yzm_type: 0,
				yztime: 60,
				
				openid:'',
				type:2
			}
		},
		computed: {
			...mapState(['hasLogin', 'userName', 'loginDatas']),
		},
		onLoad(option) {
			that=this
			this.openid=option.openid
			this.type=option.type
		},
		methods: {
			...mapMutations(['login', 'logindata']),
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
				var jkurl = '/sign/SmsCode'
				var data = {
					type:3,
					
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
			
			login_fuc() {
				if (that.tel == '' || !(/^1\d{10}$/.test(that.tel))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
			
				
				if (!that.code) {
					uni.showToast({
						icon: 'none',
						title: '请输入验证码'
					});
					return;
				}
				var datas = {
					type:that.type,
					phone: that.tel,
					code: that.code,
					wx_applet_openid:that.openid
				}
				var jkurl='/sign/register'
				console.log(datas)
				// uni.showToast({
				// 	icon: 'none',
				// 	title: '登录成功'
				// });
			
				// that.logindata(data)
				// that.login('问心')
				uni.showLoading({
					mask:true,
					title:'正在绑定'
				})
				
				service.P_post(jkurl, datas).then(res => {
					that.btn_kg = 0
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
						});
						
						uni.setStorageSync('tel', that.tel)
						uni.setStorageSync('token', datas.token)
						uni.setStorageSync('userinfo', datas)
						that.login(datas)
						setTimeout(()=>{
							uni.switchTab({
								url:'../index/index'
							})
						},1000)
				
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
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				
			},
			jump(e) {
				var that = this
			
				if (that.btn_kg == 1) {
					return
				} else {
					that.btn_kg = 1
					setTimeout(function() {
						that.btn_kg = 0
					}, 1000)
				}
			
				service.jump(e)
			},
			getimg(img) {
				return service.getimg(img)
			},
			getime(time) {
				if(!time){
					return
				}
				time=time.split(' ')
				time=time[0]
				return time
				// return service.getime(time)
			},
			
			
	
		}
	}
</script>

<style>
	.content {

		width: 100%;
		height: 1300rpx;
		/* background-color: pink; */
		/* background: url(../../static/SketchPng4fe019879e70117ec5a446b5bfca5bd81a47bb4d2d6ecd59acd55c5bd242be67.png) no-repeat; */
		background-size: 750rpx;
	}
	.my_bg {
			position: fixed;
			top: 0;
			left: 0;
			width: 100%;
			bottom: 0;
			z-index: 0;
			height: 100px;
		}
	.my_box{
		position: relative;
		height: 1300rpx;
		z-index: 10;
	}
	.deng {
		width: 544rpx;
		height: 86rpx;
		
		border-radius: 60rpx;
		margin: 30upx auto;
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 86rpx;
		text-align: center;
		/* position: absolute;
		top: 750rpx; */
	}

	.inco {
		    margin-top: 40rpx;
		    margin-left: 20rpx;

	}

	.h2 {
		font-size: 32rpx;
		font-weight: 600;
		/* position: absolute;
		top: 318rpx;
		left: 102rpx; */
		/* width: 100%; */
		padding: 10upx 102rpx 10upx;
	}

	.hdubf {
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #999999;
		/* position: absolute;
		top: 263rpx;
		left: 102rpx; */
		padding: 260upx 102rpx 10upx;
	}
	.asdee {
		width: 112rpx;
		height: 220rpx;
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		margin-top: 26%;
	}
	
	
	
	.deng {
		width: 544rpx;
		height: 86rpx;
		background: linear-gradient( 90deg , #F9CAA2, #FF6003);
		border-radius: 60rpx;
		margin-left: 50%;
		transform: translate(-50%);
		font-size: 28rpx;
		font-family: PingFangSC-Medium, PingFang SC;
		font-weight: 500;
		color: #FFFFFF;
		line-height: 86rpx;
		text-align: center;
		position: absolute;
		top:693rpx;
	}
	
	.assd {
		color: #666;
		font-size: 22rpx;
		margin-left: 20rpx;
	}
	
	.on {
		color: #666;
		font-size: 22rpx;
	}
	
	.iop {
		color: #002FA7;
		font-size: 22rpx;
	}
	
	.imgpop {
		width: 22rpx;
		height: 22rpx;
		vertical-align: middle;
		margin-left: 30rpx;
	}
	
	.lihai {
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		bottom:108rpx;
		width: 100%;
		text-align: center;
	}
	
	.dsadc {
		width: 60rpx;
		height: 60rpx;
		opacity: 0.5;
		position: absolute;
		left: 50%;
		transform: translate(-50%);
		top: 1200rpx;
	}
	
	.dd {
		font-size: 24rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #C1C1C1;
		line-height: 33rpx;
		text-align: center;
		width: 100%;
		position: absolute;
		top: 1100rpx;
	}
	
	.ojink {
		font-size: 26rpx;
		font-family: PingFangSC-Regular, PingFang SC;
		font-weight: 400;
		color: #666666;
		position: absolute;
		top: 28rpx;
		left: 390rpx;
	}
	
	.cdsxc {
	position: absolute;
	top: 26rpx;
	color: #ccc;
	left: 66%;
	}
	
	.cscv {
		height: 100%;
background: #FFFFFF;
		display: inline-block;
		padding: 4rpx 0 0 65rpx;
		font-size: 28rpx;
		
color: #333;
	}
	.uni-input-placeholder{
		color: #CCCCCC !important;
	}
	.im {
		width: 35rpx;
		height: 35rpx;
		/* position: absolute;
		top: 35%;
		left: 2%; */
		margin: 3px 20upx;
	}
	
	.input {
		width: 544rpx;
				height: 86rpx;
				
		border-radius: 8rpx;
		background: #FFFFFF;
		/* position: relative; */
		margin: 30rpx 105rpx;
		/* top: 300rpx; */
	}
	
	.getyzm {
		width: 164upx;
		height: 47upx;
		/* background: #FF7A0A; */
		/* background: linear-gradient(-90deg, #FC5534, #FFBE33); */
		border-radius: 24upx;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #333;
		font-size: 26upx;
	}
</style>
