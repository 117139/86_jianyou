<template>

	<view class="content">
		<!-- <topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">收藏关注</text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar> -->
		<view class="p15">
			<view class=" harder flex mb15">
				<view class="fuwu flex  flex-1 aic ju_c" :class="currentIndex== 1?'active':'activeNo'" @click="bian(1)">
					交易市场
				</view>
				<view class="fuwu flex  flex-1 aic ju_c" :class="currentIndex== 2?'actives':'activesNo'"
					@click="bian(2)">
					招标
				</view>
			</view>
			<view class="bgcf pl12 pr12 pt8 pb5" v-for="(item,index) in datas" :key='index'
				 @click="jump" :data-type="3"
				:data-url="item.type==2?'/pagesA_lzc/TradingMarketD/TradingMarketD?id='+item.goods_id:'/pagesA_lzc/zhaobiao_xq/zhaobiao_xq?id='+item.goods_id">
				<view class="">

					<view v-if="item.info&&item.info.userInfo" class="bian pb10  ">
						<view class="flex aic ju_b b-b-1 pt10 pb10 pl10  pr10">
							<view class="flex">
								<image :src="getimg(item.info.userInfo.img)" mode="aspectFill" class="touxiang br20">
								</image>
								<text class="c9 fs11 pl5">{{item.info.userInfo.phone}}</text>
							</view>
							<view class="flex c9 aic">
								<text class="icon-yanjing1 iconfont fs11"></text>
								<text class="fs11 pl5">{{item.info.view}}浏览</text>
							</view>
						</view>
						<view class="flex pt10 pb1 pl10  pr10">
							<view class="gongsia flex flex-col aic">

								<image :src="getimg(item.info.pInfo.img)" mode="aspectFill" class="gongsi">
								</image>
								<!-- <text class="cf fs11 pt5">公司注册</text> -->
							</view>
							<view class="sc_title oh2">
								<text class="qut cf fs11 ml5 flex aic ju_c">
									{{item.info.pInfo.title}}
								</text>
								<text>
									{{item.info.title}}
								</text>
							</view>
						</view>
						<view  class="flex pl10  pr10 pt10 fww">
							<view v-for="(item,index) in item.info.label_arr" :style="{'background-color':item1.color}" class="cf  fs11 flex aic ju_c">
								可议价
							</view>
						</view>
						<!-- <view class="flex flex-between pl10  pr10">
							<view class="flex flex-col  pt10 lh13">
								<view class="">
									<text class=" fs12 " style="color: #DDDDDD;">组合类型：</text>
									<text class="fs12 c9">中文+拼音</text>
								</view>
								<view class="">
									<text class=" fs12 " style="color: #DDDDDD;">商标类型：</text>
									<text class="fs12 c9">R标</text>
								</view>

							</view>
							<view class="flex flex-col pt10 lh13">
								<view class="">
									<text class=" fs12 " style="color: #DDDDDD;">网店类目：</text>
									<text class="fs12 c9">家装家具</text>
								</view>
								<view class="">
									<text class=" fs12 " style="color: #DDDDDD;">创店时间：</text>
									<text class="fs12 c9">{{item.chutime}}</text>
								</view>

							</view>
						</view> -->
						<view class="pt12 pl10  pr10" style="color: #F43B31;">
							<text class="fs18">{{item.info.price}}</text>
							<text class="fs12">元</text>
						</view>
					</view>
				</view>

			</view>
			<view class="zanwu" v-if="datas.length==0">暂无数据</view>
			<view class="zanwu" v-if="data_last" >到底了</view>
			


			<!-- <view class="mb10 bgcf pl10 pr10 " v-for="(item,index) in gaunzhu" :key='index' v-if="currentIndex ==1"
				@click="jump" data-url="/pagesA_lzc/circleDetail/circleDetail">
				<view class="flex ju_b aic b-b-1 p10">
					<text class="fs14 flex">质量管理体系ISO9001</text>
					<text class="fs12 flex c9">{{item.time}}</text>
				</view>
				<view class="flex ju_b aic p10">
					<text class="fs12 flex c9">北京北京市海淀区｜*****公司</text>
					<text class="fs12 flex c9">5人竞标</text>
				</view>
			</view> -->
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
				
				
				currentIndex: 1,
				page:1,
				data_last:false,
				datas:[]
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
			that.onRetry()
		},
		onShow() {

		},
		onReachBottom() {
			console.log("触底了")
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
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
			
			bian(index) {
				
				that.currentIndex = index
				that.onRetry()
			},
			onRetry(){
				that.datas=[]
				that.data_last=false
				that.page=1
				this.getData()
			},
			getData() {
				var turl = "/user/collection";
				var data = {
					type: that.currentIndex,
					limit: 20,
					page: that.page
				}
				var newapge=that.page
				uni.showLoading({
					mask:true,
					title:'正在请求数据'
				})
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				service.P_post(turl, data).then(res => {
					if (res.code == 1) {
						var datas = res.data;
						that.btnkg=0
						if (newapge == 1) {
								that.datas = datas.data;
							console.log("第一页");
							
						} else {
							
							if (datas.data.length != 0) {
								that.datas=that.datas.concat(datas.data)
							} else {
								that.data_last = true;
							}
						}
						that.page++
					} else {
						that.btnkg=0
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

	.harder {
		width: 690rpx;
		height: 72rpx;
		border-radius: 40rpx;
		border: 1rpx solid #F43B31;
		background: #fff;
		font-size: 28rpx;
		box-sizing: content-box;
	}

	.fuwu {
		height: 72rpx;
		margin-left: -5rpx;
	}

	.active {
		height: 72rpx;
		font-size: 28rpx;
		background: #F43B31 !important;
		color: #fff !important;

		border-radius: 36px 0 0 36px;
	}

	.activeNo {
		height: 72rpx;
		font-size: 28rpx;
		color: #F43B31 !important;
		border-radius: 36px 0 0 36px;
	}

	.actives {
		height: 72rpx;
		font-size: 28rpx;
		background: #F43B31 !important;
		color: #fff !important;

		border-radius: 0 36px 36px 0;
	}

	.activesNo {
		height: 72rpx;
		font-size: 28rpx;
		color: #F43B31 !important;
		border-radius: 0 36px 36px 0;
	}

	.touxiang {
		width: 40rpx;
		height: 40rpx;
	}

	.gongsi {
		width: 87rpx;
		height: 87rpx;
	}

	.gongsia {
		padding: 10rpx;
		/* background: linear-gradient(150deg, #E9C79A 0%, #E7BD88 100%); */
		border-radius: 18rpx;
	}

	

	.sxun {
		padding: 4rpx 10rpx;
		background: #FFB017;
		border-radius: 16rpx;
	}

	.guo {
		padding: 4rpx 10rpx;

		background: #FF908A;
		border-radius: 16rpx;
	}

	.you {
		padding: 4rpx 10rpx;

		background: #8AB3FF;
		border-radius: 16rpx;
	}

	.bian {

		border: 1px solid #EEEEEE;

		border-radius: 10rpx;
	}
	.sc_title{
		font-size: 28upx;
		line-height: 32upx;
		max-height: 64upx;
	}
	.qut {
		display: inline-flex;
		padding: 0 10upx;
		height: 36rpx;
		background: #B7D0F8;
		border-radius: 6rpx;
		margin-right: 10upx;
	}
</style>
