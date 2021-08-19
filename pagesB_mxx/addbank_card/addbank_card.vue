<template>

	<view class="content">
		<view class="bgcf">
			<view class=" b-t-1">
				<view class="flex pl15 pt10 pr15 pb10 aic">
					<text class="fs16 fwb li_lbox">姓名</text>
					<!-- <text class="fs16 fwb cf">姓名</text> -->
					<input type="text" class="fs14 pl10 flex_1" v-model="xingm" placeholder="请输入姓名"
						placeholder-style="color: #ddd;"/>
				</view>

			</view>
			<view class=" b-t-1">
				<view class="flex pl15 pt10 pr15 pb10 aic">
					<text class="fs16 fwb li_lbox">银行卡号</text>
					<input type="text" class="fs14 pl10 flex_1" v-model="yinh" placeholder="请输入银行卡号"
						placeholder-style="color: #ddd;"/>
				</view>

			</view>
			<view class=" b-t-1">
				<view class="flex pl15 pt10 pr15 pb10 aic">
					<text class="fs16 fwb li_lbox">手机号</text>
					<input type="text" class="fs14 pl10  flex_1" v-model="shouj" placeholder="请输入手机号"
						placeholder-style="color: #ddd;"/>
				</view>

			</view>
			<view class=" b-t-1">
				<view class="flex pl15 pt10 pr15 pb10 aic">
					<text style="min-width: 3rem;" class="fs16 fwb li_lbox">验证码</text>
					<input type="text" v-model="yanz" class="fs14 pl10  yanzhengma_input" placeholder="请输入验证码"
						placeholder-style="color: #ddd;" />
					<button @click='codeClick' v-if='changess' class="fs12 bgcf"
						style="color: #F43B31;min-width: 6rem;"> 发送验证码</button>
					<button  v-else class="fs12 "
						style="background-color: #ffffff;">{{second}}后重试</button>
				</view>

			</view>
		</view>
		<view class="fun flex aic ju_c cf fs15" @click="tijiao">
			提交
		</view>
	</view>
</template>

<script>
	import service from '../../components/service.js';
	import back from '../../components/back.js'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				showText: true,
				second: 59,
				disabled: false,
				changess: true,
				value: '',
				yanz: '',
				xingm: '',
				shouj: '',
				yinh: '',
				id:''
			}
		},
		onHide() {
			uni.setStorageSync('back_msg','')
		},
		onLoad() {
			that = this
			var bank_msg=uni.getStorageSync('back_msg')
			that.xingm=bank_msg.name||''
			that.yinh=bank_msg.code||''
			that.shouj=bank_msg.phone||''
			that.id=bank_msg.id||''
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
			userBlur(){
				if (that.xingm == '') {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none',
					});
					return
				}
			},
			bankBlur(){
				if (that.yinh == '') {
					uni.showToast({
						title: '银行卡号不能为空',
						icon: 'none',
					});
					return
				}
			},
			
			
			tijiao() {
				let token = uni.getStorageSync('token')
				if (that.xingm == '') {
					uni.showToast({
						title: '姓名不能为空',
						icon: 'none',
					});
					return
				} 
				if (that.yinh == '') {
					uni.showToast({
						title: '银行卡号不能为空',
						icon: 'none',
					});
					return
				} 
				if (that.shouj == '' || !(/^1\d{10}$/.test(that.shouj))){
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					return
				}
				if (that.yanz == '') {
					uni.showToast({
						title: '验证码不能为空',
						icon: 'none',
					});
					return
				} 
				var jkurl='/user/add_bank'
				var datas={
					code: this.yinh,
					name: this.xingm,
					phone: this.shouj,
					// bank_deposit: this.bank(this.yinh),
					smscode: this.yanz
				}
				if(that.id){
					jkurl='/user/edit_bank'
					datas={
						id:that.id,
						code: this.yinh,
						name: this.xingm,
						phone: this.shouj,
						// bank_deposit: this.bank(this.yinh),
						smscode: this.yanz
					}
				}
				if(that.btnkg ==1){
					return
				}
				that.btnkg =1
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
							title: '提交成功',
							icon:'none',
							success() {
								setTimeout(() => {
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							}
						})
				
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
				return
					uni.request({
						url: 'http://jianyou365.com.a.800123456.vip/api/user/add_bank',
						method: 'POST',
						data: {
							code: this.yinh,
							name: this.xingm,
							phone: this.shouj,
							bank_deposit: this.bank(this.yinh),
							smscode: this.yanz
						},
						header: {
							token: token
						},
						success: (res) => {
							console.log(res)
							if (res.data.code == 1) {
								uni.showToast({
									title: '绑定成功',
									icon:'none',
									success() {
										setTimeout(() => {
											uni.navigateBack({
												delta: 1
											})
										}, 2000)
									}
								})
							}else{
								uni.showToast({
									title: res.data.msg,
									icon:'none'
								})
							}
						}
					})
				
				// uni.showToast({
				// 	title: '提交成功',
				// 	icon: 'none',
				// });
				// setTimeout(function() {
				// 	wx.navigateBack({
				// 		delta: 1
				// 	})
				// },500)
			},
			// 获取验证码
			codeClick() {
				// let phoneTest = /^1(3[0-9]|4[01456879]|5[0-35-9]|6[2567]|7[0-8]|8[0-9]|9[0-35-9])\d{8}$/;
				if (that.shouj == '' || !(/^1\d{10}$/.test(that.shouj))){
					uni.showToast({
						title: '手机号格式不正确',
						icon: 'none'
					})
					return
				}
				service.P_post('/sign/SmsCode',{
					phone:this.shouj
				}).then((res) => {
					if(res.code == 1){
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
					}else{
						if(res.msg){
							uni.showToast({
								title:res.msg,
								icon:'none'
							})
						}
					}
				}).catch((e) => {
						this.navTrue = false;
						uni.showToast({
							title: `服务器异常,请联系管理员`,
							icon: "none"
						})
					})
				
				

			},
			bank(num) {
				// console.log(back.bank('6217568000062153158'))
				return back.bank(num);
			}
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.fun {
		width: 694rpx;
		height: 80rpx;
		background: #F43B31;
		border-radius: 10rpx;
		margin-left: 30rpx;
		margin-top: 80rpx;
	}
	.li_lbox{
		width: 6em;
	}
</style>
