<!-- 圈子内容详情 -->
<template>
	<view class="circleDetail2 flex-1">
		<!-- <circleDetailCartLzc :czlist="czlist" :isfu="false"></circleDetailCartLzc> -->
		<view class="tbodyView" v-if="showTbody">
			<view class="tbody">
				<view v-if="shuju.member" class="tbitem">
					<view class="tbitem_fl dis_flex aic">
						<image :src="getimg(shuju.member.img)" mode="aspectFill"></image>
						<view class="tel">{{shuju.member.phone}}</view>
						<view class="flex-right isDelText" style="position: absolute;right: 0;">
							<text>{{shuju.data.create_time}}</text>
						</view>
					</view>
					<view class="tbitem_sl oh4">
						<text>{{shuju.data.content}}</text>
					</view>
					<view class="tbitem_lls dis_flex" style="flex-wrap: wrap;">
						<view class="tbitem_ll_imgs" v-for="(img,iIndex) in shuju.data.banner" :key="iIndex">
							<image :src="img" mode="aspectFill"></image>
						</view>
						
					</view>
					<view class="tbFoot dis_flex flex-right">
						<view class="tbFitem dis_flex aic ju_b">
							<view class="left_tb">
								<text class="iconfont icon-pinglun"></text>
								<text class="pinNum">{{shuju.data.comment}}</text>
							</view>
							<view class="right_tb" @click="zans(shuju)">
								<text class="iconfont icon-zan-" v-if="shuju.fans==2"></text>
								<text class="iconfont icon-zan" style="color: #F43B31;" v-if="shuju.fans==1"></text>
								<text class="pinNum"
									:style="{color:shuju.fans==1?'#F43B31':'#DDDDDD'}">{{shuju.data.praise}}</text>
							</view>

						</view>
					</view>
				</view>
			</view>
		</view>
		
		<view style="background-color: #f8f8f8;width: 100%;height: 20upx;"></view>
		<view class="CDfoot">
			<view class="cdf_tit dis_flex aic">
				<view class="dis_flex_c ju_c aic">
					<text class="cdf_text fs15 fw400">评价({{pingNum}})</text>
					<view class="cdf_hr"></view>
				</view>
			</view>
			<view class="cdf_body">
				<view class="cdf_body_item dis_flex ju_b" v-for="(item,index) in datas" :key="index"
					v-if="pingNum>0">
					<image :src="getimg(item.img)" mode="aspectFill"></image>
					<view class="cdf_body_iv dis_flex_c" style="width: 100%;">
						<view class="dis_flex ju_b">
							<text class="tel fs12">{{item.phone}}</text>
							<view class="fs13 myD3" @tap.stop="zan(item)">
								<text class="iconfont icon-zan-" v-if="item.fans==2"></text>
								<text class="iconfont icon-zan" style="color: #F43B31;" v-if="item.fans==1"></text>
								<text class="pinNum"
									:style="{color:item.fans==1?'#F43B31':'#DDDDDD'}">{{item.fans_number}}</text>
							</view>
						</view>
						<text class="con fs12 myC3 fw400">{{item.content}}</text>
					</view>
				</view>
				<view class="zanwu" v-if=" pingNum== 0">暂无数据</view>

			</view>

		</view>
		<view style="height: 10upx;"></view>
		<view class="cdfBtn dis_flex ju_c aic" :style="{bottom:`${bottomHeight}upx`}">
			<input class="cdfBtnv fs12" cursor-spacing=20 placeholder="请输入您要评论的内容…" v-model="pinText"
				placeholder-style="font-size:24upx;" auto-blur :adjust-position="adjust_position" @focus="pingFocus"
				@blur="pingBlur">
			<view class="btnCdf dis_flex aic ju_c" @click.stop="send">
				发送
			</view>
			</input>
		</view>
	</view>
</template>

<script>
	import Vue from 'vue'
	import service from '../../components/service.js';
	import circleDetailCartLzc from '@/components/circle-detail-cart-lzc/circle-detail-cart-lzc.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			circleDetailCartLzc
		},
		data() {
			return {
				pinText: '',
				adjust_position: false,
				showTbody: true,
				pinCon: '',
				shuju: {},
				listPf: true,
				czlist: [{
					hpic: '/static/images/logo.png',
					tel: '1535725603',
					time: '刚刚',
					con: '公司注册时开始创业的第一步，当我们有了项目，开始创业时，会需要用到公司的营业执照及相关资质证书，例如：入住天猫、京东等都需要提供营业执照；跟合作伙伴签合同时',
					imgs: [{
						img: 'https://ns-strategy.cdn.bcebos.com/ns-strategy/upload/applvyou/part-002139-1775.jpg'
					}],
					pNum: 200
				}],
				height: 0,
				datas: [],
				pingNum: 0,
				sendSuo: true,
				myPid: 0,
				zansTrue: false,
				zanTrue: false,
				bottomHeight: 0,
				
				
				
				page:1
			}
		},
		onReady() {
			this.height = uni.getSystemInfoSync().windowHeight * 2 - 834;
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			console.log(option.id)
			this.myPid = option.id;
			this.shuju = [];
			if (option.id) {
				this.getDetailPost();
				
			}
		},
		onShow() {

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
			pingFocus(e) {
				this.bottomHeight = e.detail.height * 2 + 30
			},
			pingBlur() {
				this.bottomHeight = 0
			},
			send() {
				this.pinCon = this.pinText;

				console.log(this.pinText);
				if (this.pinText == "") {
					uni.showToast({
						title: "评论内容不能为空",
						icon: "none"
					})
					return
				}
				if (this.sendSuo == false) {
					return
				}
				this.sendSuo = false;
				service.P_post("circle/add_comment", {
					pid: this.myPid,
					content: this.pinCon
				}).then((res) => {
					console.log(res)
					if (res.code == 1) {
						uni.showToast({
							title: '发布成功,请等待审核',
							icon: 'none',
							success: () => {
								that.sendSuo = true;
								that.getDetailPost();
							}
						})
					} else {
						uni.showToast({
							title: res.msg,
							icon: 'none',
							success: () => {
								this.sendSuo = true;
							}
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: '服务器异常',
						icon: 'none'
					})
				})
				this.pinText = "";
			},
			zans(item) {
				if (this.zansTrue) {
					return
				}
				this.zansTrue = true;
				service.P_post("circle/follow_post", {
					id: item.data.id
				}).then((res) => {
					console.log(res)
					if (res.code == 1) {
						var  new_num=item.data.praise
						if (item.fans == 1) {
							Vue.set(item,'fans',2)
							new_num--
							console.log(new_num)
							Vue.set(item.data,'praise',new_num)
							this.zansTrue = false;
						} else {
							Vue.set(item,'fans',1)
							new_num++
							console.log(new_num)
							Vue.set(item.data,'praise',new_num)
							this.zansTrue = false;
						}
					} else {
						this.zansTrue = false;
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					this.zansTrue = false;
					uni.showToast({
						title: '服务器异常',
						icon: 'none'
					})
				})
			},
			zan(item) {
				if (this.zanTrue) {
					return
				}
				this.zanTrue = true;
				service.P_post("circle/follow_comment", {
					id: item.id
				}).then((res) => {
					if (res.code == 1) {
						console.log(item.fans_number)
						var new_num=item.fans_number
						if (item.fans == 1) {
							Vue.set(item,'fans',2)
							new_num--
							console.log(new_num)
							Vue.set(item,'fans_number',new_num)
							this.zanTrue = false;
						} else {
							Vue.set(item,'fans',1)
							new_num++
							console.log(new_num)
							Vue.set(item,'fans_number',new_num)
							this.zanTrue = false;
						}
						
						
					} else {
						uni.showToast({
							title: res.msg,
							icon: "none"
						})
					}
				}).catch(e => {
					this.zanTrue = false;
					uni.showToast({
						title: "服务器异常",
						icon: 'none'
					})
				})
				// if(this.iszan){
				// 	this.znum --;
				// }else{
				// 	this.znum ++;
				// }
				// console.log(111)
			},
			getDetailPost() {
				service.P_post("circle/detail_post", {
					id: this.myPid
				}).then((res) => {
					console.log(res, "1212112212")
					if (res.code == 1) {
						this.shuju = res.data;
						that.onRetry();
					} else {
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}

				}).catch((e) => {
					console.log(e)
					uni.showToast({
						title: "服务器异常",
						icon: 'none'
					})
				})
			},
			
			onRetry(index) {
				that.datas=[]
				that.page=1
				that.data_last=false
				that.getdata()
			},
			getdata(){
				var jkurl="/circle/comment_post"
				var datas={
					pid: this.myPid,
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
						that.pingNum = datas.total;
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
			
			getCommentPost() {
				api.P_post("circle/comment_post", {
					pid: this.myPid
				}).then((res) => {
					console.log(res, "评论列表")
					console.log(res)
					if (res.code == 1) {
						this.pingNum = res.data.total;
						this.pList = res.data;
						console.log(res.data.data.length, "length")
					} else {
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: '服务器异常',
						icon: 'none'
					})
				})
			},
			pingList() {

				api.P_post("circle/comment_post", {
					pid: this.myPid
				}, {
					token: uni.getStorageSync('token')
				}).then((res) => {
					console.log(res, "评论列表")
					console.log(res)
					if (res.code == 1) {
						this.pingNum = res.data.total;
						this.pList = res.data;
					} else {
						uni.showToast({
							title: `${res.msg},请联系管理员`,
							icon: "none"
						})
					}
				}).catch((e) => {
					uni.showToast({
						title: '服务器异常',
						icon: 'none'
					})
				})
			}
		}
	}
</script>

<style scoped lang="scss">
	.tbody {
		width: 750upx;
		box-sizing: border-box;
		padding: 0 30upx;
		// margin-top: 60upx;
		background-color: #fff;
		margin-bottom: 22upx;
	}

	.tbitem {
		width: 690upx;
		box-sizing: border-box;
		padding-top: 28upx;
		position: relative;

		.isDelText {
			font-size: 24upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #999999;
		}

		.tbitem_fl {
			width: 100%;
			height: 40upx;
			position: relative;

			image {
				width: 40upx;
				height: 40upx;
				border-radius: 50%;
			}

			.tel {
				font-size: 22upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				margin-left: 10upx;
			}

			.time {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
				margin-left: 22upx;
			}
		}

		.tbitem_sl {
			width: 100%;
			font-size: 28upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #333333;
			line-height: 48upx;
			margin-top: 26upx;
		}

		.tbitem_ll {
			width: 100%;
			margin-top: 32upx;

			image {
				margin-right: 20upx;
			}
		}


	}

	.circleDetail2 {
		width: 750upx;
		min-height: 100vh;
		background-color: #fff;
		box-sizing: border-box;
		padding-top: 10upx;
	}

	.tbFoot {
		width: 100%;
		height: 26upx;
		position: absolute;
		bottom: 42upx;

		// background-color: #112288;
		.tbFitem {
			width: 200upx;
			height: 100%;
			// background-color: #007AFF;
			font-size: 24upx;
			font-family: Arial;
			font-weight: 400;
			color: #DDDDDD;
			line-height: 48upx;
			margin-top: 30upx;

			.pinNum {
				margin-left: 10upx;
			}
		}
	}


	/deep/.tbitem_ll_img {
		height: 297upx !important;
	}

	.tbitem {
		margin-bottom: 10upx;
		background-color: #fff;
		z-index: 99;
		padding-bottom: 55upx;
		box-sizing: border-box;
	}

	.CDfoot {
		width: 750upx;
		height: calc(100% - 668rpx);
		background-color: #fff;
		position: relative;
	}

	.cdf_tit {
		width: 100%;
		height: 68upx;
		padding-left: 61upx;
		position: relative;
		border-bottom: 1px solid #eee;
	}

	.cdf_body {
		width: 750upx;
		/* padding: 22upx 30upx; */
		box-sizing: border-box;
		margin-bottom: 98upx;
	}

	.cdf_text {
		color: #3c3c3c;
		line-height: 36upx;
	}

	.cdf_hr {
		width: 54upx;
		height: 4upx;
		background: #F43B31;
		position: absolute;
		bottom: 0;

	}

	.cdfBtn {
		width: 100%;
		height: 98upx;
		box-shadow: 0px -4upx 10upx 0px rgba(202, 202, 202, 0.2);
		position: fixed;
		bottom: 0;
		background-color: #FFFFFF;
	}

	.cdfBtnv {
		width: 690upx;
		height: 72upx;
		background: #F8F8F8;
		border-radius: 36upx;
		position: relative;
		box-sizing: border-box;
		padding-left: 30upx;
		padding-right: 142upx;
	}

	.btnCdf {
		width: 142upx;
		height: 72upx;
		background: #F43B31;
		border-radius: 36upx;
		position: absolute;
		right: 30upx;
		color: #fff;
	}

	.cdf_body_item {
		padding: 22upx 30upx;
		border-bottom: 1px solid #eee;
	}

	.cdf_body_item image {
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		min-width: 40upx;

	}

	.tel {
		font-family: PingFang SC;
		color: #999999;
	}

	.cdf_body_iv {
		padding-left: 10upx;
		box-sizing: border-box;
	}

	.cdf_body_iv .icon-zan-,
	.cdf_body_iv .icon-zan {
		font-size: 26upx;
		color: #ddd;
	}

	.con {
		font-family: PingFang SC;
		line-height: 40upx;
		text-align: justify;
	}

	.myC3 {
		color: #333333;
	}

	.myD3 {
		color: #ddd;
	}
	.tbitem_lls{
		width: 100%;
		.tbitem_ll_imgs{
			width: 33%;
			max-width: 230upx;
			height: 227upx;
			padding: 8upx;
			image{
				width: 100%;
				height: 100%;
			}
		}
	}
</style>
