<template>

	<view class="content ">
		<view class="b-t-1 pl15 pr15 pt20">
			<view class="mian  pl15 pr15 pt5 pb5">
				<textarea class="jb_content" value=""  v-model="minuit" placeholder="请输入举报内容" />
			</view>
			<view class="dis_flex aic ju_c fun cf fs16" style="margin-top: 150rpx;" @click="sub_fuc">
				保存
			</view>
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
				cycle_data:'',
				type:1,
				minuit:'',
			}
		},
		onHide() {

		},
		onLoad(option) {
			that=this
			
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			tiaozhuan(e) {
				return api.tiaozhuan(e)
			},
			
			sub_fuc(){
				
				if(!that.minuit){
					uni.showToast({
						title: '请输入举报内容',
						icon: 'none',
					});
					return
				}
				
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				uni.showLoading({
					mask:true,
					title:'正在提交数据'
				})
				
				
				setTimeout(function(){
					that.btn_kg=0
					uni.showToast({
						icon: 'none',
						title: '操作成功'
					})
					// service.login_tel(1)
					setTimeout(function(){
						uni.navigateBack({
							delta:1
						})
					},1000)
				},300)
				return
				var jkurl='/user/cycle'
				var data={
					token:that.userinfo.token,
					type:that.type,
					minuit:that.minuit
				}
				console.log(data)
				if(that.btn_kg==1){
					return
				}
				that.btn_kg=1
				// return
				uni.showLoading({
					mask:true,
					title:'正在提交数据'
				})
				service.P_post(jkurl, data).then(res => {
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						// that.$refs.htmlLoading.htmlReset_fuc(0)
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
						uni.showToast({
							icon: 'none',
							title: '操作成功'
						})
						service.login_tel(1)
						setTimeout(function(){
							uni.navigateBack({
								delta:1
							})
						},1000)
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
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '系统异常'
					})
				})
			},
			
		}
	}
</script>

<style scoped>
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
	.mian{
		
box-shadow: 0px 0px 10rpx 0px rgba(0, 0, 0, 0.1);
	}
	.jb_content{
		width: 100%;
		height: 200rpx;
	}
	.fun{
		width: 616rpx;
		height: 81rpx;
		background: linear-gradient(-90deg, #FF6003, #F9CAA2);
		border-radius: 41rpx;
		margin: 0 auto;
	}
</style>
