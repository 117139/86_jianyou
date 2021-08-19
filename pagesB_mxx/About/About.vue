<template>
	<view>
	<!-- <htmlLoading ref="htmlLoading" @Retry='onRetry'> -->
		<view v-if="datas" class="xcx_fwb_img" v-html="datas.content"></view>
	<!-- </htmlLoading> -->
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
				id: '',
				key:'',
				datas:''
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this
			that.id = option.id
			if(option.key=='zcxy'){
				uni.setNavigationBarTitle({
					title:'注册协议'
				})
			}
			if(option.key=='ysxy'){
				uni.setNavigationBarTitle({
					title:'隐私协议'
				})
			}
			if(option.key=='gywm'){
				uni.setNavigationBarTitle({
					title:'关于我们'
				})
			}
			that.key = option.key
			
		
		},
		mounted() {
			this.onRetry();
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
			get_fwb(str){
				if(!str){
					return str
				}
				return service.get_fwb(str)
			},
			onRetry(){
				that.getdata(that.key)
			},
			getdata(key){
				var jkurl='/info/detail'
				var data={
					key:key
				}
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					// console.log(res)
					if (res.code == 1) {
						// that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						that.datas=datas
						uni.setNavigationBarTitle({
							title:datas.title
						})
					} else {
				
						// that.$refs.htmlLoading.htmlReset_fuc(1)
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
					// that.$refs.htmlLoading.htmlReset_fuc(1)
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '获取数据失败'
					})
				})
			},
			
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
		}
	}
</script>

<style>
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
	.tit{
		font-size: 34rpx;
		font-weight: bold;
		color: #444444;
		padding: 50rpx 0 78rpx 0;
		text-align: center;
	}
	.conPs{
		font-size: 28rpx;
		font-weight: 400;
		color: #444444;
	}
	.p1,.p2{
		margin-bottom: 50rpx;
		text-indent:2em;
	}
	.xcx_fwb_img{
		width: 100%;
		padding: 10upx 30upx;
	}
</style>
