<template>

	<view class="content">
		
		<view class="pl30 pt35 pr30 mt12">
			<view class="flex b-b-1 pb5">
				<text class="icon-shouji iconfont fs20 c2"></text>
				<!-- <input  class="pupu_shouj" type="text" placeholder="用户名/手机号" placeholder-class="c2 pl10 fs16"/> -->
				<input disabled="" type="text" placeholder="请输入手机号" :value="'原手机号：'+userinfo.phone" class="flex_1 pl10 fs16" />
			</view>
			<view class="flex b-b-1 pt30">
				<text class="icon-mima1 iconfont c2 "></text>
				<input placeholder-class="c2  fs16 " type="text" class="flex_1 pl10 fs16" placeholder="原手机验证码"  v-model="code"/>
				<view @click='codeClick(0)' v-if='changess' class="fs12 bgcf" style="color: #FF1919;"> 获取验证码</view>
				<view v-else class="fs12 " style="background-color: #ffffff;">{{second}}后重试</view>
			</view>
			<view class="flex b-b-1 pb5 pt30">
				<text class="icon-shouji iconfont fs20 c2"></text>
				<!-- <input  class="pupu_shouj" type="text" placeholder="用户名/手机号" placeholder-class="c2 pl10 fs16"/> -->
				<input placeholder-class="c2 fs16 " type="text" placeholder="请输入新手机号" v-model="phone" class="flex_1 pl10 fs16" />
			</view>
			<view class="flex b-b-1 pt30">
				<text class="icon-mima1 iconfont c2 "></text>
				<input placeholder-class="c2  fs16 " type="text" class="flex_1 pl10 fs16" placeholder="新手机号验证码"  v-model="code1"/>
				<view @click='codeClick(1)' v-if='changess1' class="fs12 bgcf" style="color: #FF1919;"> 获取验证码</view>
				<view v-else class="fs12 " style="background-color: #ffffff;">{{second1}}后重试</view>
			</view>
			
		</view>
		<view class="funs fs17 flex aic ju_c cf "@click="denglu">
			提交
		</view>
		
	</view>
</template>

<script>
	import service from '../../components/service.js';
	var that
	var interval
	var interval1
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
				usr_pwd: "",
				seen: false,
				type_text: "text",
				type_password: "password",
				
				
				phone:'',
				changess: true,
				changess1: true,
				second: 59,
				second1: 59,
				code:'',
				code1:''
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
			codeClick(code_type) {
				var data
				if(code_type==0){
					data={
						phone: this.userinfo.real_phone
					}
				}else{
					if (that.phone == '' || !(/^1\d{10}$/.test(that.phone))) {
						wx.showToast({
							icon: 'none',
							title: '手机号有误'
						})
						return
					}
					
					data={
						phone: this.phone
					}
				}
				if(that.bntkg==1){
					return
				}
				that.bntkg=1
				service.P_post('/sign/SmsCode', data).then(res => {
					
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.bntkg=0
						if(code_type==1){
							that.changess1 = false;
							interval1 = setInterval(() => {
								--that.second1
							}, 1000)
										
							setTimeout(() => {
								clearInterval(interval)
								that.second1 = 60
								that.changess1 = true;
							}, 60000)
						}else{
							that.changess = false;
							interval = setInterval(() => {
								--that.second
							}, 1000)
										
							setTimeout(() => {
								clearInterval(interval)
								that.second = 60
								that.changess = true;
							}, 60000)
						}
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
			changeSeen() {
				this.seen = !this.seen;
			},
			denglu() {
				let data = {
					phone: that.userinfo.real_phone,
					code: this.code,
					new_phone:this.phone,
					new_code: this.code1
				};
				console.log(typeof(data.type))
				if (!this.code) {
					wx.showToast({
						icon: 'none',
						title: '请输入验证码'
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
				if (!this.code1) {
					wx.showToast({
						icon: 'none',
						title: '请输入验证码'
					})
					return
				}
				if(that.bntkg==1){
					return
				}
				that.bntkg=1
				service.P_post('/user/set_phone', data).then(res => {
					
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
						service.wxlogin('token')
						setTimeout(()=>{
							that.btnkg = 0
							uni.navigateBack({
								delta:1
							})
							
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
		margin-top: 80rpx;
	}
	.weix {
		width: 88rpx;
		height: 88rpx;
		background: #71CB44;
		border-radius: 50%;
	}
</style>
