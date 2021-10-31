<template>

	<view  v-if="shuju.list" class="content">
		<!--bg_color="#ff0000"-->
		<!-- <topbar bg_color="#F43B31">
			<text @click="back" style="color: #fff;" class="iconfont icon-back-line backIcon"></text>
			<text style="color: #fff;" v-if="shuju.list&&shuju.list.status==1">招标中</text>
			<text style="color: #fff;" v-if="shuju.list&&shuju.list.status==2">选定服务者</text>
			<text style="color: #fff;" v-if="shuju.list&&shuju.list.status==3">终止交易</text>
			<text style="color: #fff;" v-if="shuju.list&&shuju.list.status==4">服务中</text>
			<text style="color: #fff;" v-if="shuju.list&&shuju.list.status==5">待评价</text>
			<text style="color: #fff;" v-if="shuju.list&&shuju.list.status==6">已完成</text>
			<text></text>
		</topbar> -->
		<view v-if="shuju.list" class="topBg">
			<image src="/static/images/lzc/biao/bg2.png" mode="scaleToFill"></image>
			
			<view class="topBody dis_flex aic ju_c" v-if="shuju.list.status==4&&shuju.list.create_times">
				<text class="tbox2">已用时:</text>
				<text class="tbox1">{{shuju.list.create_times[0]}}</text>
				<text class="tbox2">天</text>
				<text class="tbox1">{{shuju.list.create_times[1]}}</text>
				<text class="tbox2">时</text>
				<text class="tbox1">{{shuju.list.create_times[2]}}</text>
				<text class="tbox2">分</text>
			</view>
			<view class="topBody dis_flex aic ju_c" v-if="shuju.list.status==5&&shuju.list.create_times||shuju.list.status==6&&shuju.list.create_times">
				<text class="tbox2">实际用时:</text>
				<text class="tbox1">{{shuju.list.create_times[0]}}</text>
				<text class="tbox2">天</text>
				<text class="tbox1">{{shuju.list.create_times[1]}}</text>
				<text class="tbox2">时</text>
				<text class="tbox1">{{shuju.list.create_times[2]}}</text>
				<text class="tbox2">分</text>
			</view>
			<view class="topBody dis_flex aic ju_c" v-if="shuju.list.status==1&&shuju.list.create_times||shuju.list.status==2&&shuju.list.create_times">
				<text class="cf">{{shuju.list.create_times}}</text>
			</view>
			<view class="topBody dis_flex aic ju_c" v-if="shuju.list.status==3">
				<text class="cf">{{shuju.list.create_times}}</text>
			</view>
			
			<view class="fl_body bs dis_flex">
				<view class="fl_body_item dis_flex_c aic ju_c bs">
					<text class="fw300 fs12 flb_text1">中标价格</text>
					<view v-if="shuju.list&&shuju.list.status>2">
						<text class="fwb fs18 flb_text2">{{shuju.list.price}}</text>
						<text class="flb_text1 fs11">元</text>
					</view>
					<view v-else>
						--
					</view>
				</view>
				<view class="fl_body_item dis_flex_c aic ju_c bs">
					<text class="fw300 fs12 flb_text1">服务时长</text>
					<view v-if="shuju.list.status<4">
					--
					</view>
					<view v-else>
						<text class="fwb fs18 flb_text2">{{shuju.list.create_times[0]}}</text>
						<text class="flb_text1 fs11">天</text>
					</view>
				</view>
				<view class="fl_body_item dis_flex_c aic ju_c bs">
					<text class="fw300 fs12 flb_text1">竞标人数</text>
					<view>
						<text class="fwb fs18 flb_text2">{{shuju.list.user_number}}</text>
						<text class="flb_text1 fs11">人</text>
					</view>
				</view>
			</view>
			
		</view>
		<!--项目大概 -->
		<!-- <view class="AboutTheProject bs dis_flex_c">
			<view class="titleATP fs15 fwb">烟草经营许可证</view>
			<view class="textATP fs12">
				<text class="text1ATP">发布者:</text>
				<text>{{AboutTheProject.Publisher}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">联系信息:</text>
				<text>{{AboutTheProject.tel}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">信用评分:</text>
				<text>{{AboutTheProject.ren}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">办理地址:</text>
				<text>{{AboutTheProject.add}}</text>
			</view>
			<image class="sanjiao" src="/static/images/lzc/biao/ywc.png" mode="heightFix"></image>
		</view> -->
		<view v-if="shuju.list&&shuju.member" class="AboutTheProject bs dis_flex_c">
			<view class="titleATP fs15 fwb">{{shuju.list.title}}</view>
			<view class="textATP fs12">
				<text class="text1ATP">发布者:</text>
				<text>{{shuju.member.name}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">联系信息:</text>
				<text>{{shuju.member.phone}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">信用评分:</text>
				<text>{{shuju.member.star}}</text>
			</view>
			<view class="textATP fs12">
				<text class="text1ATP">办理地址:</text>
				<text>{{shuju.member.address}}</text>
			</view>
			<image v-if="shuju.list.status==5||shuju.list.status==6" class="sanjiao" src="/static/images/lzc/biao/ywc.png" mode="heightFix"></image>
			<image v-if="shuju.list.status==4" class="sanjiao" src="/static/images/lzc/biao/fu.png" mode="heightFix"></image>
			<image v-if="shuju.list.status==3" class="sanjiao" src="/static/images/lzc/biao/zhon.png" mode="heightFix"></image>
		</view>
		<!-- 项目进度 -->
		<view v-if="shuju.speed" class="progress">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">项目进度</view>
			</view>
			<view class="pro_sl bs dis_flex aic ju_b">
				<view class="pro_sl_item bs dis_flex_c aic ju_c fs11" style="background-color: #FFAB0A;">
					<text>{{gettime(shuju.speed[0].time,'ymd')}}</text>
					<text>{{shuju.speed[0].title}}</text>
				</view>
				<view class="pro_sl_z dis_flex aic ju_c">
					<view class="pro_sl_hr dis_flex aic ju_c"
						:style="{border:shuju.speed[0].type==1?'1px solid #FFAB0A':'1px solid #fff'}"></view>
					<text class="iconfont icon-link_lianjiedian"></text>
					<view class="pro_sl_hr dis_flex aic ju_c"
						:style="{border:shuju.speed[1].type==1?'1px solid #FFAB0A':'1px solid #f8f8f8'}"></view>
				</view>
				<view class="bs dis_flex_c aic ju_c fs11 pro_sl_item"
					:style="{'background': shuju.speed[1].type==1?'#FFAB0A':'#f8f8f8','color':shuju.speed[1].type==1?'#fff':'#bbb'}">
					<text>{{gettime(shuju.speed[1].time,'ymd')}}</text>
					<text>{{shuju.speed[1].title}}</text>
				</view>
				<view class="pro_sl_z dis_flex aic ju_c">
					<view class="pro_sl_hr dis_flex aic ju_c"
						:style="{border:shuju.speed[1].type==1?'1px solid #FFAB0A':'1px solid #f8f8f8'}"></view>
					<text class="iconfont icon-link_lianjiedian" :style="{color:shuju.speed[1].type==1?'#FFAB0A':'#f8f8f8'}"></text>
					<view class="pro_sl_hr dis_flex aic ju_c"
						:style="{border:shuju.speed[2].type==1?'1px solid #FFAB0A':'1px solid #f8f8f8'}"></view>
				</view>
				<view class="bs dis_flex_c aic ju_c fs11 pro_sl_item"
					:style="{'background': shuju.speed[2].type==1?'#FFAB0A':'#f8f8f8','color':shuju.speed[2].type==1?'#fff':'#bbb'}">
					<text>{{gettime(shuju.speed[2].time,'ymd')}}</text>
					<text>{{shuju.speed[2].title}}</text>
				</view>
			</view>
		</view>
		
		<view v-if="shuju.list" class="CompanyInfo" v-for="(item,index) in shuju.list.params">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">{{item.category[0]}}</view>
			</view>
			<view class="cro_sl bs sls">
				<!-- <view class="textATP fs12" v-for="item1 in item.info">
					<text class="text1ATP">{{item1.title}}:</text>
					<text>{{item1.c_value}}</text>
				</view> -->
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
		
		<!-- 跟踪服务 -->
		<view  class="demand dis_flex ju_b aic">
			<view class="pro_fl bs dis_flex aic" style="border: none;" @click="jump" :data-url="'/pagesA_lzc/track/track?id='+myid">
				<view class="redGan"></view>
				<view class="redText">跟踪服务</view>
			</view>
			<text class="iconfont icon-arrow" style="font-size:20upx;color: #eee;margin-right: 23upx;"></text>
		</view>
		<!-- 中标服务者 -->
		<view class="WinningTheBid">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">中标服务者</view>
			</view>
			<view class="wtb_fl" v-for="(item,index) in shuju.user_list">
				<view  class="wtb_view1 dis_flex ju_b aic" @click="jump" :data-url="'/pagesA_lzc/fuIndex/fuIndex?id='+item.uid">
					<view class="wtb_view1_left">
						<image :src="getimg(item.img)" mode="aspectFill"></image>
					</view>
					<view class="wtb_view1_right">
						<view class="wtb_view1_right_fl dis_flex aic">
							<view>
								<text class="fs15">{{item.nick}}</text>
								<text class="fs10">已中标</text>
							</view>
							<view class="flex-right">
								<text class="fw400 fs10">{{item.time}}</text>
							</view>
						</view>
						<view class="wtb_view1_right_f2 dis_flex aic">
							<view class="dis_flex aic">
								<text>服务者评价</text>
								<uni-rate :size="starStyle.size" :readonly="starStyle.readonly"
									:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="item.star">
								</uni-rate>
								<text class="fen">{{item.star}}</text>
							</view>
						</view>
						<view class="wtb_view1_right_f3 dis_flex aic">
							<view class="dis_flex aic">
								<text class="fs12 flex_0">服务者承诺:</text>
								<text class="fs10 oh1">每逾期4个工作日，扣除350.00元每逾期4个工作日</text>
							</view>
						</view>
					</view>
				</view>
				<view class="dis_flex  aic zb_umsg_list">
					<view class="dis_flex aic ju_c">
						<text>总竞标数量:</text>
						<text>{{item.bidding_view}}</text>
					</view>
					<text>|</text>
					<view class="dis_flex aic ju_c">
						<text>总中标数量:</text>
						<text>{{item.win_view}}</text>
					</view>
					<text>|</text>
					<view class="dis_flex aic ju_c">
						<text>总服务数量:</text>
						<text>{{item.view}}</text>
					</view>
				</view>
				<view v-if="shuju.list.status>4" class="dis_flex aic zb_umsg_list">
					<view class="dis_flex aic ju_c">
						<text>实际完成时间:</text>
						<text>{{item.over_time?gettime(item.over_time,'ymd'):'--'}}</text>
					</view>
					<text>|</text>
					<view class="dis_flex aic ju_c">
						<text>实际用时:</text>
						<text>{{item.use_time}}</text>
					</view>
				</view>
				<view class="wtb_hr"></view>
				<view v-if="shuju.list.status==6" class="wtb_view4 dis_flex aic">
					<text class="fs12">客户评价</text>
					<uni-rate :size="starStyle.size" :readonly="starStyle.readonly" :allowHalf="starStyle.allowHalf"
						:margin="starStyle.margin" :value="item.star">
					</uni-rate>
					<text class="fen fs10">{{item.star}}</text>
				</view>
				<view v-if="shuju.list.status==6" class="wtb_view5 dis_flex aic">
					<text class="fs10 fw400 oh1">{{item.content_content}}</text>
				</view>
			</view>

		</view>
		<!-- 本期竞标服务者 -->
		<view class="theBidList">
			<view class="pro_fl bs dis_flex aic">
				<view class="redGan"></view>
				<view class="redText">本期竞标服务者（{{shuju.bidding.length>0?shuju.bidding.length:0}}）</view>
			</view>
			<view class="wtb_view">
				<view  v-for="(item,index) in shuju.bidding" class="wtb_view1 dis_flex ju_b aic" @click="jump" :data-url="'/pagesA_lzc/fuIndex/fuIndex?id='+item.uid">
					<view class="wtb_view1_left">
						<image :src="getimg(item.img)" mode="aspectFill"></image>
					</view>
					<view class="wtb_view1_right">
						<view class="wtb_view1_right_fl dis_flex aic">
							<view>
								<text class="fs15">{{item.nick}}</text>
							</view>
							<view class="flex-right">
								<text class="fw400 fs10">{{item.time}}</text>
							</view>
							<view class="flex_1"></view>
							<view v-if="shuju.is_my==1&&shuju.list&&shuju.list.status==1||shuju.is_my==1&&shuju.list&&shuju.list.status==2" 
								class="xz_fwbtn" @click.stop="xz_fw_fuc(item)">选为服务者</view>
						</view>
						<view class="wtb_view1_right_f2 dis_flex aic">
							<view class="dis_flex aic">
								<text>服务者评价</text>
								<uni-rate :size="starStyle.size" :readonly="starStyle.readonly"
									:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="item.star">
								</uni-rate>
								<text class="fen">{{item.star}}</text>
							</view>
						</view>
						<view class="wtb_view1_right_f3 dis_flex aic">
							<view class="dis_flex aic">
								<text class="fs12 flex_0">服务者承诺:</text>
								<text class="fs10 oh1">每逾期4个工作日，扣除350.00元每逾期4个工作日</text>
							</view>
						</view>
					</view>
				</view>
			</view>
		</view>
		<view class="" style="width: 750upx;height: 98upx;"></view>
		<view class="bfoot bs dis_flex aic ju_b">
			<view class="f_left dis_flex ju_b bs">
				<button class="dis_flex_c f_left_item aic ju_c" @click="share" style="">
					<text class="iconfont icon-fenxiang" style="color: #666666;"></text>
					<text class="fl_text"  style="color: #666666;">分享</text>
				</button>
				<button class="dis_flex_c f_left_item aic ju_c" @click.stop="guanClick">
					<text v-if="shuju.is_collection==1" class="iconfont icon-guanzhu1" style="color: #ff0000;"></text>
					<text v-else class="iconfont icon-guanzhu2" style="color: #666666;"></text>
					<text v-if="shuju.is_collection==1" class="fl_text" style="color: #ff0000;">已关注</text>
					<text v-else class="fl_text">关注</text>
				</button>
				<button v-if="shuju.is_my==2" class="dis_flex_c f_left_item aic ju_c" @click.stop="jump" :data-url="'/pagesA_lzc/chat/chat?toid='+shuju.list.uid">
					<text class="iconfont icon-fuwudingdanxiangqing-kefu" style="color: #666666;"></text>
					<text class="fl_text">客服</text>
				</button>
			</view>
			<view v-if="shuju.is_my==2" class="f_right ju_c aic dis_flex" @click="jump" :data-url="'/pagesA_lzc/zhaobiao_pay/zhaobiao_pay?id='+shuju.list.id">
				投标
			</view>
			<view class="f_right ju_c aic dis_flex" @click="jump" :data-url="SendTenderUrl">
				发布此类需求
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
				xxx: [3, 5, 6],
				isGuan: true,
				biaoType: 0,
				
				AboutTheProject: {
					Publisher: '**公司',
					tel: '151****1125',
					ren: 5,
					add: '天津梓龙乡'
				},
				CompanyInfo: {
					name: '**公司',
					rtime: '',
					scale: '',
					idCard: '',
					radd: '',
					rprice: ''
				},
				/* 星星样式 */
				starStyle: {
					size: 10,
					readonly: true,
					allowHalf: true,
					margin: 1
				},
				SendTenderUrl: '/pagesA_lzc/SendTender/SendTender',
				trackUrl: '/pagesA_lzc/track/track',
				big_title: "bnbnbnbnb",
				
				
				
				myid:'',
				shuju: {},
				
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			that.myid=option.id
			that.getData()

		},
		onShow() {
			that.btnkg=0
		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','kf_tel'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			gettime(e,b){
				return service.gettime(e,'.',b)
			},
			/* 获取数据 */
			getData(id) {
				uni.showLoading({
					mask:true,
					title:'正在获取数据'
				})
				service.P_post("/bidding_list/detail", {
					id: that.myid,
				}).then((res) => {
					if (res.code == 1) {
						that.shuju = res.data;
						var shuju= res.data
						var ntitle='招标中'
						if(shuju.list.status==1){
							ntitle='招标中'
						}
						if(shuju.list.status==2){
							ntitle='选定服务者'
						}
						if(shuju.list.status==3){
							ntitle='终止交易'
						}
						if(shuju.list.status==4){
							ntitle='服务中'
						}
						if(shuju.list.status==5){
							ntitle='待评价'
						}
						if(shuju.list.status==6){
							ntitle='已完成'
						}
						uni.setNavigationBarTitle({
							title:ntitle
						})
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
			xz_fw_fuc(item){
				if(that.btnkg==1){
					return
				}
				that.btnkg=1
				service.P_post("/bidding_list/bidding_change", {
					pid: item.id,
					id: that.shuju.list.id,
				}).then((res) => {
					if (res.code == 1) {
						wx.showToast({
							title: '操作成功',
							icon: 'none',
							duration: 1000
						});
						setTimeout(function() {
							that.btnkg = 0
							that.getData()
						}, 1000)
						console.log(res.data)
					} else {
						that.btnkg = 0
						uni.showToast({
							title: `${res.msg},请检查`,
							icon: "none"
						})
					}
				}).catch(e => {
					that.btnkg = 0
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
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			guanClick() {
				// this.isGuan = !this.isGuan;
				// },
				// ShouClick() {
				service.P_post("/trade/follow", {
					id: that.myid,
					type: 3
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
			share() {
				uni.shareWithSystem({
					summary: '犀牛并购',
					href: 'https://jianyou365.com.a.800123456.vip/apk/jy_share/index.html?id='+that.myid,
					success() {
						// 分享完成，请注意此时不一定是成功分享
					},
					fail() {
						// 分享失败
					}
				})
				// uni.share({
				// 	provider: "weixin",
				// 	scene: "WXSceneSession",
				// 	type: 1,
				// 	summary: "我正在使用HBuilderX开发uni-app，赶紧跟我一起来体验！",
				// 	success: function(res) {
				// 		console.log("success:" + JSON.stringify(res));
				// 	},
				// 	fail: function(err) {
				// 		console.log("fail:" + JSON.stringify(err));
				// 	}
				// });
			}
		}
	}
</script>

<style lang="scss" scoped>
	.content {
		background-color: #f8f8f8;
		width: 100vw;

		.topBg {
			width: 750upx;
			height: 176upx;
			background-position: center;
			background-size: cover;
			position: relative;

			image {
				width: 750upx;
				height: 176upx;
			}

			.topBody {
				position: absolute;
				top: 50%;
				left: 50%;
				transform: translate(-50%, -50%);
				width: 750upx;

				.tbox1 {
					padding: 18upx 13upx;
					font-size: 40upx;
					font-family: Akzidenz-Grotesk BQ Condensed A;
					font-weight: bold;
					color: #F43B31;
					line-height: 23upx;
					background-color: #fff;
				}

				.tbox2 {
					padding: 18upx 13upx;
					font-size: 26upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					line-height: 23upx;
				}
			}

		}

		.fl_body {
			width: 690upx;
			height: 120upx;
			background-color: #fff;
			position: absolute;
			bottom: -90upx;
			z-index: 99;
			padding: 26upx 0upx;
			margin: 0 30upx;

			.fl_body_item {
				width: 33.3%;
				height: 100%;
				border-right: 1px solid #ccc;

				.flb_text1 {
					font-family: PingFang SC;
					color: #333333;
				}

				.flb_text2 {
					color: #F43B31;
				}
			}

			.fl_body_item:nth-child(3) {
				border-right: none;
			}
		}

		.AboutTheProject {
			width: 690upx;
			height: 266upx;
			margin: 110upx 30upx 0 30upx;
			background: #FFFFFF;
			border-radius: 10upx;
			padding: 22upx 24upx;
			position: relative;

			.titleATP {
				color: #333333;
			}

			.textATP {
				color: #666666;
				margin-top: 16upx;
				display: flex;
				align-items: center;
			}

			.text1ATP {
				margin-right: 0.5rem;
			}

			.topdirection {
				font-size: 0;
				width: 0;
				height: 0;
				line-height: 0;
				border-width: 136upx;
				border-style: solid;
				border-color: transparent transparent #A9DBF6 transparent;
				transform: rotate(180deg);
			}

			.sanjiao {
				// width: 0;
				// height: 0;
				// border-left: 136upx solid red;
				// border-top: 136upx solid transparent;
				// // border-bottom: 136upx solid transparent;
				// border-radius: 0 10upx 0 0;
				// position: absolute;
				// transform: rotate(180deg);
				// top: 0;
				// right: 0;
				// text-align: center;
				width: 70upx;
				height: 70upx;
				position: absolute;
				top: 0;
				right: 0;

				.text1 {
					position: absolute;
					top: 96upx;
					left: 690upx;
					transform: rotate(136deg);
					font-size: 20upx;
					font-weight: 400;
					background-color: #007AFF;
					z-index: 999999;
				}

			}

		}

		.progress {
			width: 690upx;
			height: 208upx;
			margin: 0 30upx;
			background-color: #fff;
			border-radius: 10upx;
			margin-top: 20upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.pro_sl {
				width: 100%;
				height: 137upx;
				padding: 0 24upx;

				.pro_sl_item {
					width: 157upx;
					height: 85upx;
					border-radius: 10upx;
					color: #fff;
				}

				.pro_sl_z {
					width: 96upx;
					height: 100%;

					.pro_sl_hr {
						width: 35upx;
						height: 1px;
					}

					.iconfont {
						color: #FFAB0A;
						font-size: 16upx;
						margin: 0 5upx;
					}
				}

			}
		}

		.CompanyInfo {
			width: 690upx;
			margin: 0 30upx;
			background-color: #fff;
			// border-radius: 10upx;
			margin-top: 20upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.cro_sl {
				width: 100%;
				// height: 315upx;
				padding: 25upx 24upx;
			}
		}

		.demand {
			width: 690upx;
			margin: 0 30upx;
			background-color: #fff;
			// border-radius: 10upx;
			margin-top: 20upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.da_body {
				width: 100%;
				height: 84upx;
				padding: 0 30upx;
				color: #999999;
				line-height: 48upx;
			}
		}

		.WinningTheBid {
			width: 690upx;
			margin: 0 30upx;
			background-color: #fff;
			// border-radius: 10upx;
			margin-top: 20upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.wtb_fl {
				width: 100%;
				padding: 24upx;

				.wtb_view1 {
					width: 100%;
					// height: 126upx;

					.wtb_view1_left {
						width: 126upx;
						height: 126upx;
						border-radius: 10upx;

						image {
							width: 126upx;
							height: 126upx;
							border-radius: 10upx;
						}
					}

					.wtb_view1_right {
						width: 510upx;
						height: 100%;
						padding-left: 23upx;
						position: relative;

						.wtb_view1_right_fl {
							view:nth-child(1) {
								text:nth-child(1) {
									color: #333333;
								}

								text:nth-child(2) {
									display: inline-block;
									background: #FFB017;
									border-radius: 16upx;
									color: #FFFFFF;
									padding: 6upx 11upx;
									margin-left: 23upx;
								}
							}

							view:nth-child(2) {
								color: #bbb;
								position: absolute;
								right: 0;
							}
						}

						.wtb_view1_right_f2 {
							width: 100%;

							view:nth-child(1) {
								text:nth-child(1) {
									font-size: 24upx;
									font-family: PingFang SC;
									font-weight: 400;
									color: #666666;
									margin-right: 25upx;
								}

								.fen {
									font-size: 20upx;
									font-family: Arial;
									font-weight: 400;
									color: #F43B31;
									margin-left: 13upx;
								}
							}
						}

						.wtb_view1_right_f3 {
							view:nth-child(1) {
								font-family: PingFang SC;
								font-weight: 400;
								color: #666666;

								text:nth-child(1) {
									min-width: 5.5em;
								}

								text:nth-child(2) {
									// margin-left: 0.5rem;
								}
							}
						}
					}
				}

				.wtb_view2 {
					min-width: 583upx;
					max-width: 690upx;
					height: 21upx;
					margin-top: 17upx;

					.wtb_view2_item {
						width: 33.3%;
						height: 100%;
						color: #bbbbbb;
						border-right: 1px solid #eee;

						text:nth-child(1) {
							min-width: 5.5em;
						}
					}

					.wtb_view2_item:nth-child(1) {
						margin-left: 0rem;
					}

					.wtb_view2_item:nth-child(3) {
						border-right: 0px solid #eee;
					}

				}

				.wtb_view3 {
					width: 500upx;
					height: 21upx;
					margin-top: 17upx;

					.wtb_view3_item {
						width: 50%;
						height: 100%;
						color: #bbbbbb;
						border-right: 1px solid #eee;

						.wtb_view3_item_text1 {
							min-width: 6em;
						}

						.wtb_view3_item_text2 {
							min-width: 4em;
						}
					}

					.wtb_view3_item:nth-child(2) {
						border-right: 0px solid #eee;

						text:nth-child(1) {
							min-width: 5.5em;
						}
					}
				}

				.wtb_view4 {
					margin-top: 22upx;

					text:nth-child(1) {
						color: #666666;
						font-family: PingFang SC;
						margin-right: 23upx;
					}

					.fen {
						color: #F43B31;
						font-family: Arial;
						margin-left: 13upx;
					}
				}

				.wtb_view5 {
					margin-top: 18upx;

					text:nth-child(1) {
						font-family: PingFang SC;
						color: #BBBBBB;
					}
				}
			}

			.wtb_hr {
				width: 100%;
				height: 1px;
				background-color: #eee;
				margin-top: 19upx;
			}
		}

		.theBidList {
			width: 690upx;
			margin: 0 30upx;
			background-color: #fff;
			margin-top: 20upx;
			margin-bottom: 44upx;

			.pro_fl {
				width: 100%;
				height: 70upx;
				border-bottom: 1px solid #eee;
				padding: 0 30upx;
			}

			.wtb_view {
				width: 100%;
				padding: 0 24upx;

				.wtb_view1 {
					width: 100%;
					// height: 126upx;
					padding: 24upx 0 20upx 0;
					// border-bottom: 1px solid #eee;

					.wtb_view1_left {
						width: 126upx;
						height: 126upx;
						border-radius: 10upx;

						image {
							width: 126upx;
							height: 126upx;
							border-radius: 10upx;
						}
					}

					.wtb_view1_right {
						width: 510upx;
						height: 100%;
						padding-left: 23upx;
						position: relative;

						.wtb_view1_right_fl {
							view:nth-child(1) {
								text:nth-child(1) {
									color: #333333;
								}

								text:nth-child(2) {
									display: inline-block;
									background: #FFB017;
									border-radius: 16upx;
									color: #FFFFFF;
									padding: 6upx 11upx;
									margin-left: 23upx;
								}
							}

							view:nth-child(2) {
								color: #bbb;
								position: absolute;
								right: 0;
							}
						}

						.wtb_view1_right_f2 {
							width: 100%;

							view:nth-child(1) {
								text:nth-child(1) {
									font-size: 24upx;
									font-family: PingFang SC;
									font-weight: 400;
									color: #666666;
									margin-right: 25upx;
								}

								.fen {
									font-size: 20upx;
									font-family: Arial;
									font-weight: 400;
									color: #F43B31;
									margin-left: 13upx;
								}
							}
						}

						.wtb_view1_right_f3 {
							view:nth-child(1) {
								font-family: PingFang SC;
								font-weight: 400;
								color: #666666;

								text:nth-child(1) {
									min-width: 5.5em;
								}

								text:nth-child(2) {
									// margin-left: 0.5rem;
								}
							}
						}
					}
				}
			}

		}

		.bfoot {
			width: 750upx;
			// height: 98upx;
			background-color: #fff;
			position: fixed;
			bottom: 0;
			padding: 10upx 31upx;
			// bottom: 0;
			padding-bottom: constant(safe-area-inset-bottom);
			padding-bottom: env(safe-area-inset-bottom);
			box-sizing: border-box;
			z-index: 900;
			.f_right {
				// min-width: 376upx;
				width: 100%;
				height: 78upx;
				background: #F43B31;
				border-radius: 39upx;
				font-size: 30upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #FFFFFF;
				line-height: 23upx;
				margin-left: 10upx;
				padding: 0 10upx;
			}

			.f_left {
				width: 100%;
				height: 100%;
				// padding-right: 78upx;
				// padding-right: 20upx;
				color: #666666;
				.f_left_item {
					min-width: 80upx;
					
					padding-right: 0;
					.icon-fenxiang {
						font-size: 31upx;
					}

					.icon-guanzhu2 {
						font-size: 31upx;
					}

					.icon-fuwudingdanxiangqing-kefu {
						font-size: 31upx;
					}

					.fl_text {
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #666666;
						line-height: 23upx;
					}

				}
			}
		}
	}

	// /deep/.dh_top[data-v-67478258] {
	// 	height: 315upx !important;
	// 	display: inline-block;

	// 	image {
	// 		width: 750upx;
	// 		height: 315upx;
	// 	}
	// }
	/deep/.dh_top_box[data-v-67478258] {
		justify-content: center;

		.backIcon {
			position: absolute;
			left: 30upx;
		}

		text {
			color: #FFFFFF;
		}
	}

	/* 页面公共样式 */
	.redGan {
		width: 5upx;
		height: 26upx;
		background: #F43B31;
	}

	.redText {
		font-size: 28upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		line-height: 48upx;
		margin-left: 10upx;
	}

	.titleATP {
		color: #333333;
	}

	.textATP {
		color: #666666;
		margin-top: 16upx;
		display: flex;
		align-items: center;
	}

	.text1ATP {
		margin-right: 0.5rem;
	}

	.pro_sl_items {
		background-color: #f8f8f8;
		color: #bbb;
		width: 157upx;
		height: 85upx;
		border-radius: 10upx;
	}

	button {
		background-color: #fff;
		line-height: 1;
		padding-left: 0;
	}
	
	
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
	
	.zb_umsg_list{
		font-size: 20upx;
		color: #BBB;
		margin-top: 10upx;
	}
	.zb_umsg_list>view{
		flex: 1;
	}
	.zb_umsg_list>text{
		margin: 0 8upx;
	}
	.xz_fwbtn{
		background: rgb(244,59,49);
		color: #fff;
		padding: 0 15upx;
		font-size: 28upx;
		margin-left: 10upx;
		border-radius: 30upx;
	}
	.topbar {
		width: 100%;
		height: 100%;
	}
</style>
