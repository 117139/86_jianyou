<template>

	<view class="content">
		<view class="p15 c6 fs12">
			余额提现
		</view>
		<view class="bgcf pt10 pb10 pl15 pr15 flex aic ">
			<text class="fs14 c6">姓名</text>
			<input type="text" class="pl15" placeholder="请输入您的姓名" placeholder-style="width:500rpx;"
				v-model="user" />
		</view>
		<view class="bgcf pt12 pb12 pl15 pr15 mt10 flex aic ju_b" @click='jump' data-url='../bank_card/bank_card?type=1'
			:data-shifou='true'>
			<text class="fs14 c6">银行卡</text>
			<view class="">
				<text class="fs11 c9 pl5">{{bank}}</text>
				<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
			</view>
		</view>
		<view class="bgcf pt12 pb12 pl15 pr15 mt10 flex aic ju_b">
			<text class="fs14 c6">提现金额</text>
			<input type="text" placeholder="请输入您的提现金额" class="fs14 " placeholder-class="cb" @blur="tilur"
				v-model="price" />
			<text class="fs12" style="color: #F43B31;" @click="price=price1">全部提现</text>
		</view>
		<view class="fs12 c9 pt10 pl15">
			可提现余额：{{price1}}元,当前手续费为{{withdrawal_service}}%
		</view>
		<view class="funs ml15 flex aic ju_c cf fs13  mt35" @click="tixian">
			提现
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
				price: '',
				price1:'',
				user: '',
				withdrawal_min: '',
				withdrawal_service: '',
				bankTrue: false,
				bank: '',
				bank_id:'',
				//是否大于最低金额
				nimTrue: false
			}
		},
		onHide() {
			uni.removeStorageSync('back_msg')
			// uni.removeStorageSync('backId')
		},
		onLoad() {
			that = this
			let token = uni.getStorageSync('token')
		
			let userInfo = uni.getStorageSync('userInfo');
			this.price1 = userInfo.price;
			that.getdata()
		},
		onShow() {
			var bank_msg=uni.getStorageSync('back_msg')
			if(bank_msg){
				that.bank=bank_msg.code
				that.bank_id=bank_msg.id
			}
		},
		onReady() {
			console.log(uni.getStorageSync('backName'))

			// if (uni.getStorageSync('backId')) {
			// 	this.bankTrue = true;
			// 	console.log(uni.getStorageSync('backId'))
			// 	this.bank = uni.getStorageSync('backName')

			// } else {
			// 	this.bankTrue = false;
			// }
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getdata(){
				service.P_post("/user/reflect",{}).then((res) => {
					console.log(res, '银行')
					if (res.code == 1) {
						if(res.data.withdrawal_type==2){
							uni.showToast({
								icon:'none',
								title:'暂未开启提现功能'
							})
							return
						}
						
						this.withdrawal_min = res.data.withdrawal_min;
						this.withdrawal_service = res.data.withdrawal_service;
					} else {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
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
			tixian() {
				var data={
							price: this.price,
							bank_id: that.bank_id
						}
						if(!that.user){
							uni.showToast({
								title: '请输入您的姓名',
								icon: 'none'
								
							});
							return
						}
						if(!that.bank){
							uni.showToast({
								title: '请选择银行卡',
								icon: 'none'
								
							});
							return
						}
						if(this.price<that.withdrawal_min){
							uni.showToast({
								title: '小于最低提现金额('+that.withdrawal_min+')',
								icon: 'none'
								
							});
							return
						}
						if(that.btnkg==1){
							return
						}
						that.btnkg=1
				service.P_post("/user/withdraw",data).then((res) => {
					console.log(res, '银行')
					if (res.code == 1) {
						uni.showToast({
							icon:'none',
							title:'申请已提交，请耐心等待'
						})
						service.wxlogin('token')
						setTimeout(function(){
							that.btnkg=
							uni.navigateBack({
								delta:1
							})
						},1000)
						
					} else {
						uni.showToast({
							title:res.msg,
							icon:'none'
						})
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
				let token = uni.getStorageSync('token');
				let id = uni.getStorageSync('backId');
				if (this.nimTrue) {
					uni.request({
						url: 'http://jianyou365.com.a.800123456.vip/api/user/withdraw',
						data: {
							price: this.price,
							bank_id: id
						},
						header: {
							token: token
						},
						method: 'POST',
						success: (res) => {
							console.log(res)
							if (res.data.code == 1) {
								uni.showToast({
									title: '提现成功',
									icon: 'none',
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
									icon: 'none'
								})
							}
						}
					})
				} else {
					uni.showToast({
						title: '小于最低提现金额',
						icon: 'none',
						success: () => {
							this.nimTrue = false
						}
					});
				}


			},
			tilur() {
				if (this.price.length == 0) {
					uni.showToast({
						title: '请输入提现金额',
						icon: 'none',
					});
				} else {
					if (parseInt(this.price) < this.withdrawal_min) {
						uni.showToast({
							title: '小于最低提现金额',
							icon: 'none',
							success: () => {
								this.nimTrue = false
							}
						});

					} else {
						this.nimTrue = true
					}
				}
			},
			nameBlur() {
				if (this.user.length == 0) {
					uni.showToast({
						title: '请输入姓名',
						icon: 'none',
					});
				}
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

	.funs {
		width: 694rpx;
		height: 80rpx;
		background: #F43B31;
		border-radius: 10rpx;
	}
</style>
