<template>

	<view class="content pt10 pl15">
		<view class="flex aic flex-col  pt35 mt35" v-if="shuju==[] ||shuju.length<1">
			<!-- <image src="/static/images/ma/dindanwu.png" mode="aspectFill" class="zans"></image> -->
			<text class="zanwu">您还没有银行卡哦</text>
		</view>
		<view class="" v-for="(item,index) in shuju" :key='index' @click='jump_fuc' :data-item="item" data-url='/pagesB_mxx/addbank_card/addbank_card'>
			<view class="mian p10 mb10">
				<view class="flex aic ju_b">
					<text class="fs16 cf">{{item.bank_deposit}}</text>
					<text class="icon-shezhi iconfont cf fs18"></text>
				</view>
				<view class="fs12 cf pt8">
					{{item.type}}
				</view>
				<view class="flex flex-right fs12 cf pt8">
					{{item.code}}
				</view>
			</view>
		</view>
		<view class="fun cf flex aic ju_c fs15" @click='jump' data-url='/pagesB_mxx/addbank_card/addbank_card'
			:data-shifou='true'>
			添加银行卡 +
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
				shuju: [],
				type:''
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this
			that.type=option.type||''
			let token = uni.getStorageSync('token');
			console.log(token)
			
			// uni.request({
			// 	url: 'http://jianyou365.com.a.800123456.vip/api/user/bank',
			// 	header: {
			// 		token: token,
			// 		'content-type': 'application/json'
			// 	},
			// 	method: 'POST',
			// 	success: (res) => {
			// 		// console.log(res)
			// 		this.shuju = res.data.data
			// 		console.log(this.shuju)
			// 	}
			// })
		},
		onShow() {
			that.getdata()
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getdata(){
				service.P_post("user/bank").then((res) => {
					console.log(res, '银行')
					if (res.code == 1) {
						this.shuju = res.data
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
			jump_fuc(e){
				console.log(e)
				
				uni.setStorageSync('back_msg',e.currentTarget.dataset.item)
				if(that.type=='1'){
					uni.navigateBack({
						delta: 1
					})
					return
				}
				return service.jump(e)
			},
			bankClick(i, bank) {
				console.log(i)
				uni.setStorageSync('backId', i);
				uni.setStorageSync('backName', bank);
				uni.navigateBack({
					delta: 1
				})
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
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}

	.mian {
		width: 691rpx;
		height: 174rpx;
		background: #F43B31;
		border-radius: 10rpx;
	}

	.fun {
		width: 690rpx;
		height: 80rpx;
		/* background: #DBDCDC; */
		background: #F43B31;
		border-radius: 4rpx;
		margin-top: 100rpx;
	}
</style>
