<template>

	<view class="content">
		<topbar bg_img="/static/images/ma/qianb.png" text_color="#fff" :have_top="false">
			<text class="icon-fanhui iconfont pl10" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class="pl35">我的钱包</text>
			<text class="pr5 fs14" @click='jump' data-url='../money/money' :data-shifou='true'>收支明细 </text>
		</topbar>
		<view class="h_box" :style="'padding-top: '+CustomBar+'px;'">
			<view class="tou_img flex  ju_c aic">
				<image src="/static/images/ma/qianb.png" mode="aspectFill" class="img_backs" ></image>
				<view class="dis_flex_c aic  ju_a"
					style="z-index: 990;">
					<text class="fs12 cf" style="opacity: 0.8;">账户余额（元）</text>
					<text class="fs36 cf fwb" style="margin-top: 37upx;">{{userinfo.price}}</text>
					<view class="tixian fs14 cf flex aic ju_c" style="margin-top: 39upx;" @click='jump'
						data-url='../Withdrawal/Withdrawal' :data-shifou='true'>
						提现
					</view>
			
				</view>
			</view>
			<view class="bgcf mt5 flex ju_b aic pl15 pr15 pt10 pb10" @click='jump' data-url='../bank_card/bank_card'
				:data-shifou='true'>
				<view class="flex aic">
					<text class="icon-yinhangka1 iconfont" style="color: #F43B31;"></text>
					<text class="fs15 pl10  fwb">我的银行卡</text>
				</view>
				<view class="">
					<text class="fs13 c9">{{userinfo.bank_num}}张</text>
					<text class="icon-arrow iconfont fs14" style="color: #eee;"></text>
				</view>
			</view>
		</view>
		
	</view>
</template>

<script>
	import api from '../../components/service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				num: 0,
				price:''
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
		},
		onShow() {

		},
		onReady() {
			this.$store.state.userInfo;
			console.log(uni.getStorageSync('userInfo'))
			let userInfo = uni.getStorageSync('userInfo');
			this.num = userInfo.bank_num;
			this.price = userInfo.price;
			// let token = uni.getStorageSync('token');
			// uni.request({
			// 	url:'http://jianyou365.com.a.800123456.vip/api/user/bank',
			// 	header: {
			// 		token: token,
			// 		'content-type': 'application/json'
			// 	},
			// 	method:'POST',
			// 	success: (res) => {
			// 		// console.log(res)
			// 		this.num = res.data.data.length
			// 	}
			// })
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

	.img_backs {
		width: 100%;
		z-index: 1;
		height: 350rpx;
		position: absolute;
		top:0upx;
	}

	.tixian {
		width: 200rpx;
		height: 70rpx;
		border: 1px solid #FFFFFF;
		border-radius: 35rpx;
	}
	.h_box{
		position: relative;
	}
	.tou_img{
		position: relative;
		height: 350rpx;
	}
</style>
