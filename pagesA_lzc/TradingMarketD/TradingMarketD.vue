<template>

	<view class="content">
		<view class="liu1" v-if="isLiu">
			<view class="flS dis_flex aic ju_b">
				<view class=""></view>
				<text v-if="shuju.message" class="title_text fwb">全部留言（{{shuju.message.count}}）</text>
				<text @click="delLiu" class="iconfont icon-shanchu" style="color: #333;"></text>
			</view>
			<scroll-view scroll-y="true" style="height: 500upx;" @scrolltolower="gun2">
				<view class="sls" v-for="(item,index) in liuList" :key="index" @click="jump"
					data-url="/pagesA_lzc/Phomepage/Phomepage" v-if="liuList.length!=0">
					<view class="sls_fc bs dis_flex">
						<image :src="getimg(item.userInfo.img)" mode="aspectFill"></image>
						<text class="tel" style="margin: 0 45upx 0 10upx;">{{item.userInfo.phone}}</text>
						<text class="time">{{item.create_time}}</text>
					</view>
					<view class="sls_sc">
						<text>{{item.content}}</text>
					</view>
				</view>
				<view class="sls zanwu" v-if="liuList.length==0">
					暂无数据
				</view>
			</scroll-view>



			<view class="dis_flex aic" style="position: absolute;bottom: 50upx;">
				<input type="text" v-model="liuText" placeholder="请输入留言内容" class="liuInput" />
				<button @click.stop="liuBtn(myid)" class="dis_flex ju_c aic fs14"
					style="min-width: 150upx;color: #ff5500;">留言</button>
			</view>
		</view>
		<!--bg_color="#ff0000"-->
		<view v-if="shuju&&shuju.info" class="jvsl">
			<view class="jvsl_sl dis_flex">
				<image :src="getimg(shuju.info.pInfo.img)" mode="aspectFill"></image>
				<view class="jvsl_slr bs">
					<view class="">
						<text class="biao dis_flex ju_c aic">{{shuju.info.pInfo.title}}</text>
						<text class="jvsl_slr_title">{{shuju.info.title}}</text>
					</view>
				</view>
			</view>
			<!-- 标签 -->
			<view v-if="shuju.info&&shuju.info.label.length>0" class="myTag bs dis_flex aic fww">
				<view class="tagItem" v-for="label in shuju.info.label" :style="{'background-color': label.color}">
					<text>{{label.title}}</text>
				</view>
			</view>
			<view class="price bs dis_flex aic">
				<text style="font-size: 36upx;font-weight: bold;">{{shuju.info.price}}</text>
				<text style="font-size: 24upx;">元</text>
				<view class="jvsl_fr dis_flex aic">
					<text class="iconfont icon-yanjing"></text>
					<text class="tel">{{shuju.info.view}}</text>
					<text class="tel">浏览</text>
				</view>
			</view>
		</view>
		<view v-if="shuju.userInfo" class="dis_flex ju_b  aic info bs">
			<view class="imgI">
				<image :src="getimg(shuju.userInfo.img)" mode="aspectFill"></image>
			</view>
			<view class="textI dis_flex_c">
				<view class="telI dis_flex aic">
					<text>{{shuju.userInfo.phone}}</text>
					<text class="shi" v-if="shuju.userInfo.is_rz==1">已认证</text>
					<text class="shi" style="background-color: #eee;" v-if="shuju.userInfo.is_rz==2">未认证</text>
				</view>
				<view class="tel2 dis_flex aic">
					<text class="times">{{info.time}}来过</text>
				</view>
			</view>
			<view class="btn_right dis_flex aic ju_c" @click="jump"
				:data-url="`/pagesA_lzc/Phomepage/Phomepage?id=${shuju.userInfo.id}`">
				进入主页
			</view>
		</view>
		<!-- 商品详情 -->
		<view v-if="shuju.info" class="shopDetail">
			<view class="" v-for="(item,index) in shuju.info.params_arr">
				<view class="flS dis_flex">
					<image class="title_image" src="/static/images/lzc/fuIndex/biao1.png" mode="aspectFill">
					</image>
					<text class="title_text fwb">{{item.category[0]}}</text>
				</view>
				<view class="sls">
					<!-- {{item.info[0]}} -->
					<view class="dis_flex ju_b" v-for="(item1,index1) in item.info" v-if="item1.type!=6">
						<text class="flex_0" style="width:5em;margin-right: 8upx;">{{item1.title}}：</text>
						<view class="flex_1">
							<text>{{item1.c_value.toString()}}</text>
							<text v-if="item1.type==8">{{item1.value}}</text>
						</view>
					</view>
					<view class="dis_flex ju_b" v-for="(item1,index1) in item.info" v-if="item1.type==6">
						<text class="flex_0" style="width:5em">{{item1.title}}：</text>
						<view class="flex_1 dis_flex fww">
							<view class="xq_img" v-for="item2,index in item1.c_value">
								<image   :src="getimg(item2)" mode="aspectFill"></image>
							</view>
						</view>
					</view>
					
				</view>
			</view>
			
		</view>
		
		<!-- 留言 -->
		<view class="liu">
			<view class="flS dis_flex aic">
				<image class="title_image" src="/static/images/lzc/fuIndex/biao1.png" mode="aspectFill">
				</image>
				<text  v-if="shuju.message" class="title_text fwb">全部留言（{{shuju.message.count}}）</text>
			</view>
			<view class="sls" v-for="(item,index) in liuList" :key="index" @click="jump"
				data-url="/pagesA_lzc/Phomepage/Phomepage" v-if="shuju.message.list.length!=0">
				<view class="sls_fc bs dis_flex">
					<image :src="getimg(item.userInfo.img)" mode="aspectFill"></image>
					<text class="tel" style="margin: 0 45upx 0 10upx;">{{item.userInfo.phone}}</text>
					<text class="time">{{item.create_time}}</text>
				</view>
				<view class="sls_sc">
					<text>{{item.content}}</text>
				</view>
			</view>
			<view class="sls zanwu" v-if="liuList.length==0">
				暂无数据
			</view>
		</view>
		<view class="" style="width:750upx;height: 98upx;"></view>
		<!-- foot -->
		<view class="foot dis_flex ju_b aic">
			<view class="footLeft dis_flex flex_1" style="width: auto;">
				<button class="dis_flex_c litem aic ju_c" @click="ShouClick">
					<text class="iconfont icon-Starmarker-b" v-if='shuju.collection_type==2'></text>
					<text class="ltext" v-if='shuju.collection_type==2'>收藏</text>
					<text class="iconfont icon-guanzhu" v-if='shuju.collection_type==1'></text>
					<text class="ltext" v-if='shuju.collection_type==1'>已收藏</text>
				</button>
				<button class="dis_flex_c litem aic ju_c" @click="liu">
					<text class="iconfont icon-pinglun"></text>
					<text class="ltext">留言</text>
				</button>
				<button  v-if="shuju.is_my==2" class="dis_flex_c litem aic ju_c" @click="jump" :data-url="'/pagesA_lzc/chat/chat?toid='+shuju.userInfo.id">
					<text class="iconfont icon-fuwudingdanxiangqing-kefu"></text>
					<text class="ltext">客服</text>
				</button>
			</view>
			<view v-if="shuju.is_my==2" class="footRight dis_flex ju_b">
				<!-- <view class="dis_flex ju_c aic" @click="jump" :data-url="'/pagesA_lzc/pay/pay?price='+shuju.info.price+'&id='+shuju.info.id">立即购买</view>
				<view  class="dis_flex ju_c aic" @click="jump" :data-url="'/pagesA_lzc/chat/chat?toid='+shuju.userInfo.id">联系卖家</view> -->
				<view  class="dis_flex ju_c aic lxmj_btn" @click="jump" :data-url="'/pagesA_lzc/chat/chat?toid='+shuju.userInfo.id">联系卖家</view>
				
			</view>
			<!-- <view class="flex_1"></view> -->
			<!-- <view v-if="shuju.is_my==1" class="footRight dis_flex ju_b" style="width: auto;"> -->
				<!-- <view class="dis_flex ju_c aic" style="border-radius:36upx" @click="jump" data-url="/pagesA_lzc/pay/pay">立即购买</view> -->
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
				shuju: [],
				isShou: true,
				isLiu: false,
				liuText: '',
				Phomepage_url: '/pagesA_lzc/Phomepage/Phomepage',
				
			
				liuList:[],
				info: {},
				myid: 1,
				page: 1
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			console.log(option)
			if (option.id) {
				this.myid = option.id;
				console.log(this.myid)
				this.getData(option.id)
				that.onRetry()
			}
		},
		onShow() {

		},
		onReachBottom() {
			that.getData_list()
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			liu() {
				this.isLiu = true;
				this.mypage = 1;
				// this.getLiu(10);
			},
			delLiu() {
				this.isLiu = false;
			},
			liuBtn(id) {
				if(that.btnkg==1){
					retrun
				}
				that.btnkg=1
				service.P_post("transaction_list/message_add", {
					id: id,
					content: that.liuText,
					type: 1
				}).then((res) => {
					if (res.code == 1) {
						uni.showToast({
							title: '留言成功,请等待审核',
							duration: 1000,
							icon: 'none',
							success: () => {
								that.btnkg=0
								that.liuText = '';
								that.getData(that.myid)
								that.onRetry()
							}
						})
					}else{
						that.btnkg=0
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
				// uni.showToast({
				// 	title: '留言成功',
				// 	duration: 1000,
				// 	icon: 'none',
				// 	success: () => {
				// 		this.liuText = '';
				// 	}
				// })
			},
			ShouClick() {
				service.P_post("/trade/follow", {
					id: that.myid,
					type: 2
				}).then((res) => {
					if (res.code == 1) {
						that.getData()
					}else{
						that.btnkg=0
					}
				}).catch(e => {
					that.btnkg=0
					console.log(e)
					uni.showToast({
						title: "服务器异常",
						icon: "none"
					})
				})
			},
			/* 获取数据 */
			getData(id) {
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				service.P_post("transaction_list/detail", {
					id: that.myid,
				}).then((res) => {
					if (res.code == 1) {
						this.shuju = res.data;
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
			onRetry(){
				that.page=1
				that.datas=[]
				that.btnkg=0
				that.data_last=false
				that.getData_list()
			},
			/* 获取留言列表 */
			getData_list() {
				var turl = "transaction_list/message"
				
				var data = {
					id: this.myid,
					page: this.page,
					limit: 20
				};
				
				var  page_now=that.page
				service.P_post(turl, data).then(res => {
					if (res.code == 1) {
						var datas = res.data
						console.log(typeof datas)
										
						if (typeof datas == 'string') {
							datas = JSON.parse(datas)
						}
											
						if (page_now == 1) {
						
							that.liuList = datas.data
						
						} else {
							if (datas.data.length == 0) {
								that.data_last = true
								return
							}
							that.data_last = false
							that.liuList = that.liuList.concat(datas.data)
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
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})
				
			},
			
			
		}
	}
</script>

<style scoped lang="scss">
	.liuInput {
		width: 500upx;
		height: 60upx;
		border-radius: 30upx;
		background-color: #fff;
		border: 1px solid #F8F7F6;
		padding-left: 30upx;
		box-sizing: border-box;
		margin-left: 30upx;
		margin-right: 30upx;
	}

	.content {
		background-color: #fff;
		width: 100vw;

		.jvsl {
			width: 750upx;
			// height: 404upx;
			border: 1px solid #EEEEEE;
			border-radius: 10upx;
			padding: 0 30upx;

			.jvslView {
				width: 100%;
				height: 64upx;
				padding: 0 19upx 0 25upx;
				border-bottom: 1px solid #eee;

				.jvsl_fl {
					height: 100%;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
					}

					.tel {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						margin-left: 10upx;
					}
				}

				.jvsl_fr {
					// width: 100%;
					font-size: 22upx;
					font-family: Arial;
					font-weight: 400;
					color: #999999;
					opacity: 0.3;

					text:nth-child(2) {
						margin-left: 5upx;
					}

					text:nth-child(3) {
						margin-left: 5upx;
					}
				}
			}

			.jvsl_sl {
				width: 100%;
				min-height: 87upx;
				padding: 0 13upx;
				margin-top: 12upx;

				image {
					height: 87upx;
					width: 87upx;
					border-radius: 18upx;
				}

				.jvsl_slr {
					width: 100%;
					height: 100%;
					padding-top: 10upx;
					padding-left: 10upx;
					.biao {
						min-width: 100upx;
						height: 36upx;
						background: #B7D0F8;
						border-radius: 4upx;
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
						margin-left: 11upx;
						display: inline-flex;
					}

					.jvsl_slr_title {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 40upx;
						margin-left: 15upx;
						text-align: left;
					}
				}
			}

			.myTag {
				width: 100%;
				height: 35upx;
				margin-top: 22upx;
				padding: 0 13upx;

				.tagItem {
					display: inline-block;
					font-size: 20upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					border-radius: 16upx;
					box-sizing: border-box;
					padding: 6upx 11upx;
					margin-right: 10upx;
					margin-bottom: 10upx;
				}

			}

			.price {
				width: 100%;
				color: #F43B31;
				margin-top: 20upx;
				margin-bottom: 26upx;
				margin-left: 5upx;
				position: relative;

				// padding: 0 30upx 0 30upx;
				.jvsl_fr {
					// width: 100%;
					font-size: 22upx;
					font-family: Arial;
					font-weight: 400;
					color: #999999;
					opacity: 0.3;
					position: absolute;
					right: 0;

					text:nth-child(2) {
						margin-left: 5upx;
					}

					text:nth-child(3) {
						margin-left: 5upx;
					}
				}
			}
		}

		.info {
			width: 750upx;
			height: 116upx;
			padding: 24upx;

			.imgI {
				width: 68upx;
				height: 68upx;
				border-radius: 50%;

				image {
					width: 68upx;
					height: 68upx;
					border-radius: 50%;
				}
			}

			.textI {
				width: 476upx;
				height: 100%;
				padding-left: 37upx;

				.telI {
					text:nth-child(1) {
						font-size: 28upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #333333;
						line-height: 40upx;
					}

					.times {}

				}

				.tel2 {
					.times {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
						line-height: 40upx;
					}
				}
			}

			.btn_right {
				width: 162upx;
				height: 52upx;
				border: 1px solid #FB8C2A;
				border-radius: 26upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FB8C2A;

			}
		}

		.shopDetail {
			.sls {
				padding: 29upx 30upx;

				view {
					// margin-bottom: 10upx;
					font-size: 24upx;

					text:nth-child(1) {
						color: #bbb;
						// min-width: 5.5em;
					}

					view>text:nth-child(1) {
						color: #666;
					}
				}
			}
		}

		.DetailedD {
			border-bottom: 20upx solid #f8f8f8;

			.sls {
				padding: 30upx 54upx 30upx 29upx;

				view {
					margin-bottom: 10upx;
					font-size: 24upx;

					text:nth-child(1) {
						color: #bbb;
						min-width: 5.5em;
					}

					view>text:nth-child(1) {
						color: #666;
					}
				}
			}
		}

		.pictureInfo {
			border-bottom: 20upx solid #f8f8f8;

			.sls {
				padding: 29upx 30upx;

				image {
					width: 230upx;
					height: 230upx;
				}
			}
		}

		.liu1 {
			width: 750upx;
			height: 698upx;
			position: fixed;
			bottom: 0;
			background-color: #fff;
			z-index: 19999;
			padding-bottom: 20upx;

			.sls {
				margin-bottom: 22upx;

				.sls_fc {
					padding-left: 28upx;
					padding-top: 22upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
					}

					.tel {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.time {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #DDDDDD;
					}
				}

				.sls_sc {
					padding-left: 80upx;
					padding-right: 30upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 40upx;
				}
			}
		}

		.liu {
			border-bottom: 20upx solid #f8f8f8;

			.sls {
				margin-bottom: 22upx;

				.sls_fc {
					padding-left: 28upx;
					padding-top: 22upx;

					image {
						width: 40upx;
						height: 40upx;
						border-radius: 50%;
					}

					.tel {
						font-size: 22upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #999999;
					}

					.time {
						font-size: 24upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #DDDDDD;
					}
				}

				.sls_sc {
					padding-left: 80upx;
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 40upx;
				}
			}
		}

		.foot {
			width: 100%;
			height: 98upx;
			position: fixed;
			bottom: 0;
			left: 0;
			right: 0;
			background-color: #fff;
			z-index: 900;
			.footLeft {
				// padding-right: 78upx;
				width: 100%;

				.litem {
					max-width: 33.3%;
					min-width: 100upx;

					// margin-right: 75upx;
					.icon-Starmarker-b {
						font-size: 28upx;
					}

					.icon-guanzhu {
						color: #F43B31;
						font-size: 28upx;
					}

					.icon-pinglun {
						font-size: 28upx;
					}

					.icon-fuwudingdanxiangqing-kefu {
						font-size: 28upx;
					}

					.ltext {
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 23upx;
						margin-top: 10upx;
					}

				}
			}

			.footRight {
				width: 380upx;
				height: 72upx;
				border-radius: 36upx;
				padding-right: 30upx;
				padding-left: 30upx;
				view:nth-child(1) {
					width: 190upx;
					height: 72upx;
					background: #FB8C2A;
					border-radius: 36upx 0upx 0upx 36upx;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 23upx;

				}

				view:nth-child(2) {
					width: 190upx;
					height: 72upx;
					background: #F43B31;
					border-radius: 0px 36px 36px 0px;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 23upx;

				}
				view.lxmj_btn{
					width: 380upx;
					height: 72upx;
					background: #F43B31;
					border-radius: 36px;
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 23upx;
				}
			}
		}
	}

	/deep/.dh_top[data-v-67478258] {
		text {
			color: #fff;
		}
	}

	.shi {
		background: #FFB017;
		border-radius: 16upx;
		padding: 7upx 11upx;
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		margin: 0 7upx;
	}

	.flS {
		padding: 14upx 28upx;
		// border-top: 20upx solid #F8F8F8;
		border-bottom: 1px solid #eee;
	}

	.title_image {
		width: 15upx;
		height: 29upx;
	}

	.title_text {
		font-size: 30upx;
		font-family: PingFang SC;
		font-weight: 500;
		color: #333333;
		line-height: 23upx;
		margin-left: 10upx;
	}

	button {
		background-color: #fff;
		line-height: 1;
		padding-left: 0;
		padding-right: 0;
		overflow: visible;
	}
	.xq_img{
		width: 33%;
		position: relative;
		height: 0;
		padding-top: 33%;
	}
	.xq_img image{
		position: absolute;
		top: 5upx;
		left: 5upx;
		right: 5upx;
		bottom: 5upx;
		width: calc(100% - 10upx);
		height: calc(100% - 10upx);
	}
</style>
