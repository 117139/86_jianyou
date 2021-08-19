<template>

	<view class="content">
		<view class="track_view" v-for="(item,index) in datas" :key="item.id">
			<view class="track_item dis_flex ju_b">
				<view class="track_left dis_flex_c aic ju_c fs12 fw400">
					<view class="line1">
						<view :class="{'line1-2':index==0,'line1-1':index!=0}"></view>
					</view>
					<view class="dis_flex aic ju_b" style="width: 100%;height:22upx;">
						<text class="fs12 fw400" style="color: #666;">{{item.create_time}}</text>
						<text class="fs11 iconfont icon-link_lianjiedian"></text>
					</view>
					<view class="line1">
						<view :class="{'line1-2':index==datas.length-1,'line1-1':index!=datas.length-1}"></view>
					</view>
				</view>
				<view class="track_right">
					<text class="fs12">{{item.create_time}}</text>
					<!-- <view class="dis_flex_c"> -->
						<text class="fs12" style="text-align: justify;">{{item.title}}</text>
						<!-- <view class="track_right_add dis_flex_c" v-if="JSON.stringify(item.detail) != '{}'">
							<view class="fs11">
								<text class="tra1">竞价人:</text>
								<text class="tra2">{{item.detail.name}}</text>
							</view>
							<view class="fs11">
								<text class="tra1">服务报价:</text>
								<text class="tra2">{{item.detail.price}}</text>
							</view>
							<view class="fs11">
								<text class="tra1">承诺时长:</text>
								<text class="tra2">{{item.detail.time}}</text>
							</view>
							<view class="fs11">
								<text class="tra1">竞标保证金:</text>
								<text class="tra2" v-if="item.detail.isPay">已支付</text>
								<text class="tra2" v-else>未支付</text>
							</view>
							<view class="fs11">
								<text class="tra1">备注:</text>
								<text class="tra2">{{item.detail.bei}}</text>
							</view>
						</view> -->
					<!-- </view> -->
				</view>
			</view>
			<view class="track_item dis_flex ju_b" v-if="index!=datas.length-1">
				<view class="track_left dis_flex_c aic ju_c fs12 fw400">
					<view class="line1">
						<view class="line1-1"></view>
					</view>
				</view>
				<view class="track_right ju_b dis_flex" style="background-color: #fff;">
				</view>
			</view>
		</view>

	</view>

</template>

<script>
	import service from '../../components/service.js';
	import topbar from '@/components/top_bar/top_bar.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				myid:'',
				datas: []
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this
			that.myid=option.id
			that.getData()
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			/* 获取数据 */
			getData(id) {
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				service.P_post("/bidding_list/bidding_history", {
					id: that.myid,
				}).then((res) => {
					if (res.code == 1) {
						that.datas = res.data;
						console.log(res.data)
					} else {
						uni.showToast({
							title: `${res.msg},请检查`,
							icon: "none"
						})
					}
				}).catch(e => {
					console.log(e);
					uni.showToast({
						title: "服务器异常",
						icon: "none"
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
		padding: 20upx 30upx;
		box-sizing: border-box;

	}

	.track_item {
		/* width: 750upx; */
		width: 100%;
		/* margin-bottom: 23upx; */
	}

	.track_left {
		width: 213upx;
		color: #666666;
		box-sizing: border-box;
		padding: 0 18upx 0 0;
	}

	.track_right {
		/* width: 507upx; */
		flex: 1;
		box-sizing: border-box;
		padding: 19upx 25upx 22upx 22upx;
		color: #333333;
		background-color: #F8F8F8;
	}

	.track_right text:nth-child(1) {
		min-width: 75upx;
	}

	.icon-link_lianjiedian {
		/* margin-left: 22upx; */
		color: #F43B31;
	}

	.line1 {
		width: 100%;
		height: 100%;
		box-sizing: border-box;
		padding-right: 11upx;
	}

	.line1-1 {
		width: 100%;
		height: 100%;
		border-right: 1px solid #eee;
	}

	.line1-2 {
		width: 70%;
		height: 100%;
		border-right: 1px solid #fff;
	}

	.track_right_add {
		width: 100%;
		margin-top: 29upx;
		color: #BBBBBB;
	}
	.tra2{
		margin-left: 0.25rem;
	}
</style>
