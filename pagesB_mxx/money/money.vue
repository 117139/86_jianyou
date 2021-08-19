<template>

	<view class="content pt12">
		<view class="bgcf  pl15 pr15" v-for="(item,index) in datas" :key='index' v-if="datas.length>0">
			<view class="flex ju_b pt15 pb15 aic b-b-1 ">
				<view class="dis_flex_c">
					<text class="fs14">{{item.title}}</text>
					<text class="fs12 pt5">{{item.create_time}}</text>
				</view>
				<view class="fs14">
					<!-- <text v-if="item.type==1">+</text>
					<text v-if="item.type==2">-</text> -->
					{{item.num_title}}
				</view>
			</view>

		</view>
		<view class="pl15 pr15 dis_flex ju_c zanwu" v-if="datas.length==0">
			暂无记录
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
				datas: []
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
			let token = uni.getStorageSync('token');
			that.onRetry()
			
			// uni.request({
			// 	url: 'http://jianyou365.com.a.800123456.vip/service/user/history',
			// 	data: {
			// 		page: 1,
			// 		limit: 3
			// 	},
			// 	header: {
			// 		token: token
			// 	},
			// 	method: 'POST',
			// 	success: (res) => {
			// 		console.log(res)
					
			// 	}
			// })
		},
		onShow() {
			
		},
		onReachBottom() {
			that.getdata()
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			onRetry(index) {
				that.datas=[]
				that.page=1
				that.data_last=false
				that.getdata()
			},
			getdata(){
				
				var jkurl="/user/history"
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
</style>
