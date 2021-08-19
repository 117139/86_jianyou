<!-- 资质详情 -->
<template>
	<view class="qfdetail bs">
		<view class="" v-if="fuwu">
			<view class="af_fl dis_flex ju_b aic">
				<text class="fwb fs18" style="color: #333;">{{shuju.title}}</text>
				<text class="fw400 fs12 c9 flex_0">{{shuju.create_time}}</text>
			</view>
			<view class="xmfwb_box">
				<rich-text :nodes="shuju.content" class="af_sl"></rich-text>
			</view>
		</view>
		<view class="zanwu" v-else>
				服务器异常
		</view>
		
		
		
	</view>
</template>

<script>
	import service from '@/components/service.js'
	export default {
		data() {
			return {
				img: 'https://img0.baidu.com/it/u=2186694782,2058262177&fm=26&fmt=auto&gp=0.jpg',
				text1: '公司注册时开始创业的第一步，当我们有了项目，开始创业时，会需要用到公司的营业执照及相关资质证书，例如：入住天猫、京东等都需要提供营业执照',
				text2: '公司注册时开始创业的第一步，当我们有了项目，开始创业时，会需要用到公司的营业执照及相关资质证书，例如：入住天猫、京东等都需要提供营业执照跟合作伙伴签合同时公司注册时开始创业的第一步，当我们有了项目，开始创业时，会需要用到公司的营业执照及相关资质证书，例如：入住天猫、京东等都需要提供营业执照；跟合作伙伴签合同时例如：入住天猫、京东等都需要提供营业执照；跟合作伙伴签合同时',
				myId: 0,
				shuju:{},
				fuwu:true

			};
		},
		onLoad(option) {
			console.log(option)
			if (option.id) {
				this.myId = option.id;
				let token = uni.getStorageSync('token');
				console.log(this.$store.state)
				if (this.$store.state.hasLogin) {
					this.getdata()
				}else{
					this.getDta1()
				}
			} else {
				this.myId = 0;
			}
		},
		methods:{
			getdata(){
				service.P_post("news/details", {
					id: this.myId
				}).then((res) => {
					console.log(res)
					if(res.code == 1){
						this.shuju = res.data;
					}else{
						uni.showToast({
							title:`${res.msg},请联系管理员`,
							icon:"none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title:"服务器异常",
						icon:"none"
					})
				})
			},
			getDta1(){
				service.P_post("news/details", {
					id: this.myId
				}).then((res) => {
					console.log(res)
					this.fuwu = true;
					if(res.code == 1){
						this.shuju = res.data;
					}else{
						uni.showToast({
							title:`${res.msg},请联系管理员`,
							icon:"none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title:"服务器异常",
						icon:"none"
					})
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	@import url("/static/css/lzc/commin.scss");

	.qfdetail {
		width: 100vw;
		height: 100vh;
		padding: 34upx 30upx 0 30upx;

		.af_fl {
			width: 100%;
			height: 35upx;
		}

		.af_sl {
			min-width: 100upx;
			max-width: 690upx;
			margin-top: 30upx;
		}

		image {
			width: 690upx;
			height: 297upx;
			border-radius: 4px;
		}
	}
	
	.xmfwb_box{
		margin-top: 20upx;
		max-width: 100%;
		padding: 20upx 0upx;
	}
</style>
