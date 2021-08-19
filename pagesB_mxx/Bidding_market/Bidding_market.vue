<template>

	<view class="content">
		<topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">招标市场</text>
			<text class="pr10 fs14" style="color: #FFFFFF;"> </text>
		</topbar>
		<view class=" pl15 pr15 pb35  pt12" style="background-color: #F43B31;">
			<view class="sou pl15 pr15 flex aic " @click.stop="jump" data-url="/pagesA_lzc/shopSearch/shopSearch">
				<text class="icon-sousuo iconfont c9 fwb fs16"></text>
				<text class="fs12 c9 pl10">搜索更多精彩内容</text>
			</view>
		</view>
		<view class=" mian p15">
			<swiper style="height: 300rpx;" :indicator-dots="true" :circular="true" autoplay interval=3000 @change='lunbo' 
				indicator-color="rgba(255,255,255,.5)" indicator-active-color="#ffffff">
				<swiper-item v-for="(item,index) in swipers" :key="index" class="swipt_item_imgs" style="height: 300rpx; ">
					<image @click="swiper_jump(item)" :src="item.img" mode="aspectFill" class="width br8" style="height: 300rpx;"></image>
				</swiper-item>
			</swiper>
			<view class="bgcf mt15 br5">
				<view class="harder b-b-1 flex ju_b aic pl15 pr15">
					<view class="fuwu  aic flex" :class="currentIndex== item.id?'active':''"
						v-for="(item,index) in title" :key="index" @click="bian(item.id)">
						{{item.ti}}
					</view>
				</view>
				<view class=" pl10 pr10">
					
					<view class="b-b-1  pt12 pb12 " v-for="(item,index) in datas" :key="index"
					  @click='jump' :data-url="'/pagesA_lzc/zhaobiao_xq/zhaobiao_xq?id='+item.id" :data-login='true' >
						<view class="flex aic ju_b">
							<view class="flex aic">
								<view class="banli cf fs11 oh1">
									{{item.classify_title}}
								</view>
								<view class="fs14 oh1 pl10" style="width: 330rpx;">
									{{item.title}}
								</view>
							</view>
							<view class="">
								<text  class="iconfont icon-xingxing fs15" :style="item.star>0?'color: #FFAB0A;':'color: #ccc;'"></text>
								<text class="iconfont icon-xingxing fs15" :style="item.star>1?'color: #FFAB0A;':'color: #ccc;'"></text>
								<text class="iconfont icon-xingxing fs15" :style="item.star>2?'color: #FFAB0A;':'color: #ccc;'"></text>
								<text class="iconfont icon-xingxing fs15" :style="item.star>3?'color: #FFAB0A;':'color: #ccc;'"></text>
								<text class="iconfont icon-xingxing fs15" :style="item.star>4?'color: #FFAB0A;':'color: #ccc;'"></text>

							</view>
						</view>
						<view class="flex aic ju_b pt5">
							<view class="flex aic fs11 cb">
								<!-- 山东省济南市历下区 ｜ 04小时12分 -->
								{{item.create_times}}
							</view>
							<view class="" style="color:#F43B31 ;">
								<text class="fs18 fwb">9000</text>
								<text class="fs12">元</text>
							</view>
						</view>
						<view class="flex aic ju_b pt8">
							<view class="flex aic">
								<view v-if="item.count>0" class=" cf fs11 ">
									<image v-for="(item1,index1) in item.data" :src="getimg(item1.img)" mode="aspectFill" class="tou_img br20"></image>
									<image v-if="item.count>1" :src="getimg('/static_s/images/ma/deng.png')" mode="aspectFill"
										class="tou_img ml12"></image>
								</view>
								<view v-if="item.count>0" class="  pl10 fs12 c5">
									等{{item.count}}人竞标
								</view>
								
							</view>
							<view class="flex c9 aic">
								<text class="icon-yanjing1 iconfont fs10"></text>
								<text class="fs11 pl5">{{item.view}}浏览</text>
							</view>

						</view>
					</view>
					
				</view>
				
			</view>
			<view class="zanwu" v-if="datas.length==0">暂无数据</view>
			<view class="data_last" v-if="data_last">到底了</view>
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
				title: [{
						ti: '服务中',
						id: 4
					},
					{
						ti: '招标中',
						id: 1
					},
					{
						ti: '已完成',
						id: 6
					},

				],

				datas: [],
				currentIndex: 4,
				swipers: []
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
			that.getbanner()
			that.onRetry()
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			swiper_jump(item){
				service.swiper_jump(item)
			},
			getbanner(){
				service.P_post('/bid/index').then((res) => {
					console.log(res, 'res')
					if (res.code == 1) {
						console.log(res.data.banner_list)
						this.swipers = res.data.banner_list
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
						title: '系统异常'
					})
				})
			},
			onRetry(){
				that.data_last=false
				that.page=1
				that.datas=[]
				that.getdata()
			},
			getdata(){
				var jkurl="/bid/list"
				var datas={
					type:that.currentIndex,
					
					page:that.page,
					limit:20,
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
						
						that.btnkg = 0
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
			lunbo(e) {
				that.index = e.detail.current
			},
			bian(index) {
				this.currentIndex = index
				that.onRetry()
				console.log(this.currentIndex)
				

			},
		}
	}
</script>

<style>
	.tou_img {
		width: 40rpx;
		height: 40rpx;
	}

	.tou_imgs {
		width: 40rpx;
		height: 40rpx;
		margin-left: -20rpx;
	}

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

	.sou {
		width: 690rpx;
		height: 60rpx;
		background: #fff;
		border-radius: 30rpx;
	}

	.mian {
		position: relative;

		border-radius: 20rpx 20rpx 0px 0px;

		background: #F8F8F8;
		margin-top: -45rpx;
	}

	.fu {
		width: 178upx;
		height: 60upx;
		border: 1px solid #EB4C50;
		border-radius: 30upx;
	}

	.quxiao {
		width: 178rpx;
		height: 60rpx;
		border: 1px solid #666666;
		border-radius: 30rpx;
	}

	.img {
		width: 200upx;
		height: 200upx
	}

	.blle {

		color: #A2B76A;
	}




	.dai {
		color: #EB4C50;
	}



	.active {
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #000 !important;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		margin-top: 10px;
	}

	.active:after {
		content: "";
		width: 79rpx;
		height: 5rpx;
		background: #EB4C50;
		border-radius: 3rpx;
		display: flex;
		margin-top: 18rpx;
	}

	.fuwu {
		text-align: center;
		font-size: 30rpx;
		font-family: PingFang;
		font-weight: 500;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		color: #999;
	}



	.harder {
		height: 97rpx;
		background-color: #fff;
	}

	.banli {
		padding: 3rpx 15rpx;
		background: #FFB017;
		border-radius: 4rpx;
	}
	
	
</style>
