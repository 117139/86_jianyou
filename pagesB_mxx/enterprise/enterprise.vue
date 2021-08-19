<template>

	<view class="content pt10">
		<view class="mb10  pl15 pr15 bgcf flex ju_b aic pt10 pb10" v-for="(item,index) in datas" :key='index' >
			<!-- @click='jump' data-url='../enterprise_auth/enterprise_auth?id=1' :data-shifou='true' -->
			<!-- @click='jump' data-url='/pagesA_lzc/SendTender/SendTender?id=1' :data-shifou='true' -->
			<view class="dis_flex_c" @click.stop="backClick(item)">
				<view class="flex aic   pb10">
					<view class="cf sxun fs11 flex aic ju_c " v-if="item.status==2">
						已认证
					</view>
					<view class="cf weir fs11 flex aic ju_c " v-if="item.status==3">
						未认证
					</view>
					<view class="cf shen fs11 flex aic ju_c " v-if="item.status==1">
						审核中
					</view>
					<text class="fs14 pl12 oh1" style="width: 400rpx;">{{item.title}}</text>
					<text class="fs13 cb pl10">{{item.name}}</text>
				</view>
				<view class="fs12 cb oh1" style="width: 580rpx;">
					{{item.address}}
				</view>
			</view>
			<view class="icon-icon-- iconfont cb" @click="quxiao(item)">

			</view>
		</view>
		<view class="zanwu" v-if="datas.length==0">暂无数据</view>
		<view style="height: 200upx;"></view>
		<view class="funbao_box">
			<view class="funbao flex aic ju_c fs15" @click='jump' data-url='../enterprise_auth/enterprise_auth?id=2' :data-shifou='true'>
				新增企业认证
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
				
				var jkurl="/enterprise/show"
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
			quxiao(item) {
				uni.showModal({
					title: '提示',
					content: '确定删除该企业信息吗',
					success: function(res) {
						if (res.confirm) {
							
							var jkurl="/enterprise/del"
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
			backClick(title){
				console.log(title)
				if(that.type==1){
					uni.setStorageSync('TenderSubject',title);
					uni.navigateBack({
						delta:1
					})
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
</style>
