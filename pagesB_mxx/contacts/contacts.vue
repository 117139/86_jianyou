<template>

	<view class="content pt10">
		<view class="mb10  pl15 pr15 bgcf flex ju_b aic pt10 pb10" v-for="(item,index) in datas" :key='index' >
			<!--  @click='jump' data-url='/pagesA_lzc/SendTender/SendTender?id=1' :data-shifou='true' -->
			<view class="dis_flex_c" @click.stop="jumpfuc(item)">
				<view class="flex aic   pb10">
					<text class="fs15 fwb">{{item.name}}</text>
					<text class="fs14 pl12 " >{{item.phone}}</text>
					<text class="fs13 c9 pl12">{{item.position}}</text>
					<view class="mo flex aic ju_c fs11 ml10" v-if="item.is_default==1">
						默认
					</view>
					<view class="" v-else>
						
					</view>
				</view>
				<view class="fs12 cb oh1" style="width: 580rpx;">
					{{item.province}}{{item.city}}{{item.county}}{{item.address}}
				</view>
			</view>
			<view class="icon-icon-- iconfont cb" @click="quxiao(item)">

			</view>
		</view>
		<view class="zanwu" v-if="datas.length==0">暂无联系人</view>
		<view style="height: 200upx;"></view>
		<view class="funbao_box">
			<view class="funbao flex aic ju_c fs15" @click='jump' data-url='../addcontacts/addcontacts' :data-shifou='true'>
				新增联系人信息
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
				datas: [],
				type:''
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this
			that.type=option.type||''
		},
		onShow() {
			that.onRetry()
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			jumpfuc(item){
				uni.setStorageSync('lxr_msg',item);
				if(that.type==1){
					
					uni.navigateBack({
						delta:1
					})
					return
				}
				uni.navigateTo({
					url:'/pagesB_mxx/addcontacts/addcontacts'
				})
			},
			onRetry(index) {
				that.datas=[]
				that.page=1
				that.data_last=false
				that.getdata()
			},
			getdata(){
				
				var jkurl="/user/address"
				var datas={
					page: that.page,
					limit: 20,
				}
				if(that.data_last == true){
					return
				}
				if (that.btnkg == 1) {
					return
				} else {
					that.btnkg = 1
				}
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				var page_now=that.page
				service.P_post(jkurl, datas).then(res => {
					that.btnkg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
				
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
					
						if (page_now == 1) {
						
							that.datas = datas.data
						
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.datas = that.datas.concat(datas.data)
						}
						that.page++
				
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
				
			},
			
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
			backClick(title){
				console.log(title)
				uni.setStorageSync('contactInformation',title);
				uni.navigateBack({
					delta:1
				})
			},
			quxiao(item) {
				
				uni.showModal({
					title: '提示',
					content: '确定删除联系人吗',
					success: function(res) {
						if (res.confirm) {
							
							var jkurl="/user/address_del"
							var datas={
								token:that.userinfo.token,
								
								id:item.id,
							}
							if(that.btnkg==1){
								return
							}
							that.btnkg=1
							service.P_post(jkurl, datas).then(res => {
								
								console.log(res)
								if (res.code == 1) {
									var datas = res.data
									console.log(typeof datas)
							
									if (typeof datas == 'string') {
										datas = JSON.parse(datas)
									}
									uni.showToast({
										title: '删除成功',
										icon: 'none',
									});
									setTimeout(()=>{
										that.btnkg = 0
										that.onRetry()
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
						} else if (res.cancel) {
							
						}
					}
				});
			},
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

	.sxun {
		padding: 4rpx 10rpx;
		background: #4FACFE;
		border-radius: 4rpx;
	}

	.shen {
		padding: 4rpx 10rpx;
		background: #FFB017;
		border-radius: 4rpx;
	}

	.weir {
		padding: 4rpx 10rpx;
		background: #DDDDDD;
		border-radius: 4rpx;
	}
	.funbao {
		width: 690rpx;
		color: #fff;
		height: 80rpx;
		background: #F43B31;
		border-radius: 10rpx;
		/* position: absolute;
		bottom: 70rpx; */
	}
	.funbao_box{
		position: fixed;
		bottom: 0;
		left: 0;
		right: 0;
		background: #F8F8F8;
		height: 200upx;
		z-index: 900;
		display: flex;
		align-items: center;
		justify-content: center;
	}
	.mo {
		width: 66rpx;
		height: 32rpx;
		border: 1px solid #F43B31;
		border-radius: 4rpx;
color: #F43B31;
	}
</style>
