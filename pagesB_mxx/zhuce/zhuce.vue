<template>

	<view class="content">
		<topbar bg_color="#FFFFFF" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #999999;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;"></text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar>
		<view class="pl30 pt25 fs20 fwb">
			注册
		</view>
		<view class="pl30 pt35 pr30 mt12">
			<view class="flex b-b-1">
				<text class="icon-yonghu iconfont c2"></text>
				<!-- <input  class="pupu_shouj" type="text" placeholder="用户名/手机号" placeholder-class="c2 pl10 fs16"/> -->
				<input placeholder-style="color:#c2c2c2;" type="text" placeholder="手机号"
					class="flex_1 pl10 fs16" v-model="phone" />
			</view>
			<view class="flex b-b-1 pt30">
				<text class="icon-mima1 iconfont c2 fwb"></text>
			
				<!-- <input  class="pupu_shouj" :type="seen ? type_text : type_password" placeholder="密码" placeholder-class="c2 pl10 fs16 pupu_shouj" placeholder-style="width: 200rpx;"/> -->
				<input placeholder-style="color:#c2c2c2;" :type="seen ? type_text : type_password"
					class="flex_1 pl10 fs16" placeholder="密码" v-model="pass" style="border: none;" />
				<!--以下为两个小眼睛按钮，点击的时候跟换input里面的type属性-->
				<view v-show='seen' @click="changeSeen">
					<text class="icon-zhengyan iconfont c2"></text>
				</view>
				<view v-show='!seen' @click="changeSeen">
					<text class="icon-biyan iconfont c2"></text>
				</view>

			</view>
			<view class="flex b-b-1 pt30">
				<text class="icon-mima1 iconfont c2 fwb"></text>
				<input placeholder-class="c2  fs16 " type="text" class="flex_1 pl10 fs16" placeholder="验证码"
					v-model="code" />
				<view @click='codeClick' v-if='changess' class="fs12 bgcf" style="color: #FF1919;"> 获取验证码</view>
				<view :disabled='disabled' v-else class="fs12 "
					style="background-color: #ffffff;">{{second}}后重试</view>
			</view>
		</view>
		<view class="funs flex aic ju_c cf ml35 mt35" @click="zhuce">
			注册
		</view>
		<view class="dis_flex aic ju_c pt12" @click="yd_type=!yd_type">
			<text class="iconfont icon-link_lianjiedian yd_btn" :class="{active:yd_type==true}"></text>
			<text class="fs14 c9">我已阅读并同意</text>
			<text class="fs14" style="color: #FF1919;" @click='jump' data-url='../About/About?key=zcxy'
				:data-shifou='true'>《用户注册协议》</text>
			<text class="fs14" style="color: #FF1919;" @click='jump' data-url='../About/About?key=ysxy'
				:data-shifou='true'>《隐私协议》</text>
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
				type_password: "password",
				phone: '',
				code: '',
				pass: '',
				yd_type:false
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
			// 获取验证码
			codeClick() {
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
					wx.showToast({
						icon: 'none',
						title: '手机号有误'
					})
					return
				}
				
				var data={
					phone: this.phone
				}
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				service.P_post('/sign/SmsCode', data).then(res => {
						that.btnkg=0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
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
			
			zhuce() {
				// console.log(111111111111111)
				let data = {
					type: "1",
					phone: this.phone,
					password:this.pass,
					code: this.code
				};
				console.log(typeof(data.type))
				if(!that.yd_type){
					wx.showToast({
						icon: 'none',
						title: '请先阅读注册协议和隐私协议'
					})
					return
				}
				if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
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
				if (!this.code) {
					wx.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return
				}
				
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				service.P_post('/sign/register', data).then(res => {
					
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
				
						uni.showToast({
							icon: 'none',
							title: '注册成功'
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
				

			}
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
	}
	.yd_btn{
		color: #999;
		margin-right: 8rpx;
	}
	.active{
		color: #FF1919;
	}
</style>
