<template>

	<view class="content">
		<view class="pt10 pb10 bgcf mt10" v-for="(item,index) in shuju" :key='index' v-if="shuju.length!=0">
			<view class="fs12 c9 b-b-1 pb10 pl10">
				订单号：{{item.code}}
			</view>
			<view class="flex aic ju_b pt10">
				<view class="time fs14 flex aic">
					{{item.title}}
				</view>
				<view class="pr10">
					<text class="iconfont icon-xingxing fs15" style="color: #FFAB0A;" v-for="item in star"></text>
					<text class="iconfont icon-xingxing fs15" style="color: #ccc;" v-for="item in 5-star"></text>
					<!-- <text class="iconfont icon-xingxing fs15" style="color: #FFAB0A;"></text>
					<text class="iconfont icon-xingxing fs15" style="color: #FFAB0A;"></text>
					<text class="iconfont icon-xingxing fs15" style="color: #FFAB0A;"></text>
					<text class="iconfont icon-xingxing fs15" style="color: #ccc;"></text> -->

				</view>
			</view>
			<view class="fs12 c9 pl12 pt10">
				{{item.content}}
			</view>
		</view>
		<view class="zanwu" v-if="shuju.length==0">暂无评论</view>
		<view class="zanwu" v-if="last_page">到底了</view>
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
				limit: 6,
				page: 1,
				last_page:false,
				shangTrue:false,
				star:2
			}
		},
		onHide() {

		},
		onLoad() {
			that = this;
			that.getData()
		},
		onShow() {

		},
		onPullDownRefresh() {
			that.page = 1;
			that.last_page=false;
			that.getData();
			
		},
		onReachBottom() {
			if(that.shangTrue){
				return
			}
			that.shangTrue = true;
			that.getData()
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
			getData() {
				var turl = "user/mine_comment";
				var data = {
					limit: that.limit,
					page: that.page
				};
				service.P_post(turl, data).then(res => {
					console.log(res)
					if (res.code == 1) {
						var data = res.data.data;
						if (that.page == 1) {
							that.shuju = data;
							if(data.length!=0){
								that.page++
							}
						} else {
							if(data.length!=0){
								for (var i = 0; i < data.length; i++) {
									that.shuju.push(data[i])
								}
								that.page++
								that.shangTrue = false;
							}else{
								that.last_page = true
								that.shangTrue = false;
							}
							
						}
					} else {
						that.shangTrue = false;
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(e => {
					that.shangTrue = false;
					console.log(e);
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
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

	.time {
		padding-left: 40rpx;
	}

	.time:before {
		content: '';
		position: absolute;
		width: 6rpx;
		height: 26rpx;
		left: 22rpx;
		background: #F43B31;
	}
</style>
