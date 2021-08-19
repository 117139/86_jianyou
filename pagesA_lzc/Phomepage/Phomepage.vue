<!-- 个人主页 -->
<template>
	<view class="content">
		<topbar :bg_color="'linear-gradient(to right, #F43B31,#FC686F)'" :have_top="true">
			<text style="font-size: 36upx;color: #fff;"  @click="back" class="iconfont icon-back-line"></text>
			<text style="font-size: 32upx;color: #fff;">个人主页</text>
			<text style="font-size: 36upx;opacity: 0;"   class="iconfont icon-back-line"></text>
		</topbar>
		<view class="ph_header dis_flex_c aic ju_c">
			<image :src="info.img" mode="aspectFill"></image>
			<text>{{info.phone}}</text>
		</view>
		<view class="ph_hr"></view>
		<view class="ph_body">
			<view class="ph_body_fl dis_flex ju_b aic">
				<view class="ph_body_fl_item dis_flex_c aic" @click="navQie(index)" v-for="(item,index) in navList"
					:key="index">
					<text :style="{color:c_index==index?'#333':'#666'}">{{item.text}}</text>
					<view v-if="c_index==index"
						style="width: 42upx;height: 5upx;background: #F43B31;border-radius: 3px;">
					</view>
				</view>
			</view>
			<view class="ph_body_sl" v-for="(item,index) in datas" :key="index" v-if="datas.length!=0" @click="jump" :data-url="'/pagesA_lzc/TradingMarketD/TradingMarketD?id='+item.id">
				<view class="ph_body_slfl dis_flex aicx">
					<image :src="getimg(item.pinfo.img)" mode="aspectFill"></image>
					<view class="oh2">
						<text class="biao">{{item.pinfo.title}}</text>
						<text class="textBiao">{{item.title}}</text>
					</view>
				</view>
				<view class="ph_body_ll">
					<view class="ph_body_llfl dis_flex ju_b">
						<text class="price">{{item.price}}<text class="fs12 fw400">元</text></text>
						<view v-if="info.change_type==1" class="ph_body_llfl_btn dis_flex aic">
							<!-- <text class="btn_text1">编辑</text> -->
							<text class="btn_text1" @click.stop="xia(item.id)" v-if="c_index==0">下架</text>
							<text class="btn_text1" @click.stop="xia(item.id)" v-if="c_index==2">上架</text>
							<text class="btn_text2" @click.stop="del(item.id)">删除</text>
						</view>
					</view>
				</view>
			</view>
			
			<view class="zanwu" v-if="datas.length==0">
				<text>暂无数据</text>
				
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
				isActive:0, 
				navList: [{
						text: '已发布',
						isActive: true
					},
					{
						text: '已售出',
						isActive: false
					},
					{
						text: '已下架',
						isActive: false
					}
				],
				info: {},
				phomepageList: [],
				
				id:'',
				c_index:0,
				datas:[],
				page:1,
				data_last:false
			}
		},
		onHide() {

		},
		onLoad(option) {
			that=this
			console.log(uni.getStorageSync('userinfo'))
			if (option.id) {
				that.id=option.id
			} else {
				
			}
			this.onRetry()
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			onRetry(){
				that.page=1
				that.datas=[]
				that.data_last=false
				that.getdata()
			},
			getdata(){
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
				service.P_post("user/my", {
					uid:that.id,
					type: that.c_index==0?1:that.c_index==1?2:3,
					page: that.page,
					limit: 20
				}).then((res) => {
					if (res.code == 1) {
						that.info = res.data.user;
						that.btnkg = 0
						var datas=res.data.list
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
					}
				})
			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			del(index) {

				uni.showModal({
					title: '你确定要删除吗',
					success: function(res) {
						if (res.confirm) {
							service.P_post("user/changeDel", {
								id: index
							}, {
								token: uni.getStorageSync('token')
							}).then((res) => {
								console.log(res)
								if(res.code == 1){
									uni.showToast({
										title:"删除成功",
										icon:'none',
										success() {
											setTimeout((res) => {
												location.reload()
											},1000)
											
										}
									})
								}
							})
						} else if (res.cancel) {
							uni.showToast({
								title: '取消删除',
								icon: 'none'
							})
						}
					}
				});
			},
			xia(index) {
				var  title=''
				if(that.isActive==0){
					title='你确定要下架该商品吗'
				}else{
					title='你确定要上架架该商品吗'
				}
				uni.showModal({
					title: title,
					success: function(res) {
						if (res.confirm) {
							service.P_post("user/showChange", {
								id: index
							}, {
								token: uni.getStorageSync('token')
							}).then((res) => {
								console.log(res)
								if(res.code == 1){
									that.onRetry()
								}
							})
						} else if (res.cancel) {
						
						}
					}
				});
			},
			navQie(index) {
				that.c_index=index
				that.onRetry()
				return
				this.urlRequest(i + 1, 1, 5);
				for (let i = 0; i < this.navList.length; i++) {
					if (i == index) {
						this.navList[i].isActive = true;
						
						this.isActive = i;
					} else {
						this.navList[i].isActive = false;
					}
				}
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			urlRequest(type, page, limit) {
				service.P_post("user/my", {
					type: type,
					page: page,
					limit: limit
				}).then((res) => {
					if (res.code == 1) {
						this.info = res.data.user;
						console.log(res.data.list.data.length)
						if (res.data.list.data.length != 0) {
							this.phomepageList = res.data.list.data;
							console.log(this.phomepageList)
						}else{
							this.phomepageList = []
						}
					}
				})
				// uni.request({
				// 	url: api.IPurl + 'user/my',
				// 	header: {
				// 		token: uni.getStorageSync('token')
				// 	},
				// 	data: {
				// 		type: type,
				// 		page: page,
				// 		limit: limit
				// 	},
				// 	method: 'POST',
				// 	success: (res) => {
				// 		console.log(res)
				// 		if (res.data.code == -1) {
				// 			uni.redirectTo({
				// 				url: '/pagesB_mxx/login/login'
				// 			})
				// 		} else if (res.data.code == 1) {
				// 			this.info = res.data.data.user;
				// 			if (res.data.data.list.data.length != 0) {
				// 				this.phomepageList = res.data.data.list.data;
				// 				console.log(this.phomepageList)
				// 			}
				// 		}
				// 	}
				// })
			}
		}
	}
</script>

<style scoped lang="scss">
	.content {
		background-color: #fff;
		width: 100vw;

		.ph_header {
			width: 750upx;
			height: 272upx;
			background-image: linear-gradient(to right, #F43B31, #FC686F);

			image {
				width: 120upx;
				height: 120upx;
				border-radius: 50%;
				min-width: 120upx;
			}

			text {
				font-size: 32upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				margin-top: 31upx;
			}
		}

		.ph_hr {
			width: 750upx;
			height: 50upx;
			background-image: linear-gradient(to right, #F43B31, #FC686F);
		}

		.ph_body {
			width: 750upx;
			// height: 100vh;
			margin-top: -40upx;
			background-color: #fff;
			border-radius: 20upx 20upx 0upx 0upx;

			.ph_body_fl {
				width: 100%;
				height: 88upx;
				box-sizing: border-box;
				padding: 0 118upx;
				background-color: #fff;
				border-radius: 20upx 20upx 0upx 0upx;
				border-bottom: 1px solid #eee;
			}

			.ph_body_sl {
				width: 690upx;
				min-height: 181upx;
				margin: 0 30upx;
				border-bottom: 1px solid #eee;
				margin-top: 22upx;

				.ph_body_slfl {
					width: 100%;
					min-height: 87upx;

					image {
						width: 87upx;
						height: 87upx;
						border-radius: 18upx;
						min-width: 87upx;
					}

					view {
						box-sizing: border-box;
						padding-left: 10upx;
						line-height: 32upx;
						max-height: 64upx;
						.biao {
							padding:0 7upx;
							background: #B7D0F8;
							border-radius: 4upx;
							font-size: 22upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #FFFFFF;
							display: inline-block;
							// min-width: 100upx;
							text-align: center;
						}

						.textBiao {
							font-size: 28upx;
							font-family: PingFang SC;
							font-weight: 400;
							color: #333333;
						}
					}
				}
			}

			.ph_body_ll {
				margin-top: 21upx;
				width: 100%;

				.price {
					font-size: 36upx;
					font-family: Akzidenz-Grotesk BQ Condensed A;
					font-weight: bold;
					color: #F43B31;
				}

				.ph_body_llfl_btn {
					// width: 240upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					line-height: 36upx;

					.btn_text1 {
						color: #F43B31;
						padding: 0 10upx;
					}

					.btn_text2 {
						color: #999999;
						padding: 0 10upx;
					}
				}
			}
		}
	}
</style>
