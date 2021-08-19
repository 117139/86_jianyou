<template>

	<view class="content">
		<topbar bg_color="#FFFFFF" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #999999;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;"></text>
			<text class="pr5 fs14 fs16" @click='jump' data-url='../zhuce/zhuce' :data-shifou='true'>注册 </text>
		</topbar>
		<view class="pl30 pt25 fs20 fwb">
			您好，

		</view>
		<view class="pl30  fs20 fwb">
			欢迎登陆建友咨询信息发布平台
		</view>
		<view class="pl30 pt35 pr30 mt12">
			<view class="flex b-b-1 pb5">
				<text class="icon-yonghu iconfont c2"></text>
				<input placeholder-class="c2 fs16" type="text" placeholder="手机号"
					class="flex_1 pl10 fs16" v-model="username"/>
			</view>
			<view class="flex b-b-1 pt35 pb5">
				<text class="icon-mima1 iconfont c2 fwb"></text>

				<!-- <input  class="pupu_shouj" :type="seen ? type_text : type_password" placeholder="密码" placeholder-class="c2 pl10 fs16 pupu_shouj" placeholder-style="width: 200rpx;"/> -->
				<input placeholder-class="c2 fs16  " :type="seen ? type_text : type_password"
					class="flex_1 pl10 fs16" placeholder="密码" v-model="pass" style="border: none ;"/>
				<!--以下为两个小眼睛按钮，点击的时候跟换input里面的type属性-->
				<view v-show='seen' @click="changeSeen">
					<text class="icon-zhengyan iconfont c2"></text>
				</view>
				<view v-show='!seen' @click="changeSeen">
					<text class="icon-biyan iconfont c2"></text>
				</view>

			</view>

		</view>
		<view class="funs fs17 flex aic ju_c cf " @click="denglu">
			登录
		</view>
		<view class="flex flex-right pt15 pr35 mr15" @click='jump' data-url='../wpassword/wpassword'
			:data-shifou='true'>
			<text class="fs14" style="color: #FF1919;">忘记密码</text>
		</view>
		<view class=" fs14 c2 flex aic ju_c pt35 mt35">
			——————— 其他登录方式 ——————
		</view>
		<!-- @click='jump' data-url='../shoujih/shoujih' :data-shifou='true' -->
		<view class="flex ju_c pt30">
			<image src="/static/images/ma/weix.png" mode="aspectFill" class="weix "></image>
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
				type_password: "password",
				pass: '',
				username: '',
				btnkg:0
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
			changeSeen() {
				this.seen = !this.seen;
			},
			denglu() {
				let data = {
					type: "3",
					phone: this.username,
					password: this.pass
				};
				if (that.username == '' || !(/^1\d{10}$/.test(that.username))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				if (!this.pass) {
					wx.showToast({
						icon: 'none',
						title: '请输入密码'
					})
					return
				}
				
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				service.P_post('/sign/sign', data).then(res => {
					console.log(that.btnkg)
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
				
						uni.setStorageSync('token',res.data.token);
						uni.setStorageSync('userInfo',res.data);
						this.login(res.data)
						uni.showToast({
							title:'登录成功',
							success: () => {
								uni.navigateBack({
									delta:1
								})
							}
						})
					} else {
						console.log(that.btnkg)
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
				// return
				// api.P_post('/sign', data).then((res) => {
				// 	console.log(res.data)
				// 	if(res.code == 1){
				// 		uni.setStorageSync('token',res.data.token);
				// 		uni.setStorageSync('userInfo',res.data);
				// 		this.login(res.data)
				// 		uni.showToast({
				// 			title:'登录成功',
				// 			success: () => {
				// 				this.login()
				// 				uni.navigateTo({
				// 					url: '../loge/loge',
				// 				});
				// 			}
				// 		})
				// 	}
				// })
				// uni.navigateTo({
				// 	url: '../loge/loge',
				// });
			},
			// 获取验证码
			codeClick() {

				that.changess = false;
				that.disabled = true
				// console.log("1")
				that.showText = false
				var interval = setInterval(() => {
					--that.second
				}, 1000)

				setTimeout(() => {
					clearInterval(interval)
					that.showText = true
					that.second = 60
					that.disabled = false
					that.changess = true;
				}, 60000)


			},
			
		}
	}
</script>

<style>
	.c2 {
		color: #c2c2c2;
	}
	input{
		outline: none!important;
	}
	input:focus-visible {
	    outline: none!important;
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
		margin-top: 80rpx;
	}

	.weix {
		width: 88rpx;
		height: 88rpx;
		background: #71CB44;
		border-radius: 50%;
	}
</style>
