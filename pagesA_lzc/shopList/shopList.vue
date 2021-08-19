<template>

	<view class="content">
		<!--自定义导航-->
		<topbar bg_color="#F43B31" :have_top="true">
			<text style="font-size: 36upx;color: #fff;"  @click="back" class="iconfont icon-back-line"></text>
			<view class="tfl_center dis_flex aic">
				<text style="color: #999;font-size: 28upx;" class="iconfont icon-sousou"></text>
				<input type="text" v-model="search"  @input="daiyan_sousuo"
							confirm-type='搜索' @confirm="onRetry" placeholder="请输入您需要的内容" placeholder-class="fs12 fw400" placeholder-style="color: #ddd;" class="fs12"/>
				<!-- <text class="fs12 fw400" style="color: #ddd;margin-left: 7upx;">请输入您需要的内容</text> -->
			</view>
			<text @click="jump" data-url="/pagesA_lzc/faQiu/faQiu?jump_type=1" style="font-size: 40upx;color: #fff;" class="iconfont icon-more"></text>
		</topbar>
		<!-- 导航 -->
		<view class="dis_flex ju_b aic shopNav">
			<view class="dis_flex snl aic" @click="paiLeft">
				<text class="fs13">价格排序</text>
				<view class="">
					<view class="iconfont icon-shangla" :class="[isPai?'shanLa1':'shanLa2']"></view>
					<view class="iconfont icon-xiala":class="[isPai?'shanLa2':'shanLa1']"></view>
				</view>
			</view>
			
			<!-- <wangding-pickerAddress @change="cityChange">
					<text class="fs13">{{city}}</text>
					<text style="margin-top: 10upx;" class="iconfont icon-xiala shanLa1" v-if="city=='地区'"></text>
			</wangding-pickerAddress> -->
		</view>
		<view class="shopListBody" v-for="(item,index) in datas" :key="index">
			<view class="jvsl" @click="jump" :data-url="'/pagesA_lzc/TradingMarketD/TradingMarketD?id='+item.id">
				<view class="jvslView dis_flex ju_b bs">
					<view class="jvsl_fl dis_flex aic">
						<image :src="getimg(item.img)" mode="widthFix"></image>

						<text class="tel">{{getTel(item.phone)}}</text>
					</view>
					<view class="jvsl_fr dis_flex aic">
						<text class="iconfont icon-news1"></text>
						<text class="tel fs11 fw400">联系卖家</text>
					</view>
				</view>
				<view class="jvsl_sl dis_flex">
					<image :src="getimg(item.img)" mode="aspectFill"></image>
					<view class="oh2 sp_title">
						<text class="biao ju_c aic">
							{{item.type}}
						</text>
						<text class="jvsl_slr_title">
							{{item.title}}
						</text>
					</view>
				</view>
				<!-- 标签 -->
				<view v-if="item.label_arr&&item.label_arr.length>0" class="myTag bs dis_flex aic fww">
					<view class="tagItem" v-for="(biao,bindex) in item.label_arr" :key="bindex" :style="{'background-color':biao.bg}">
						<text>{{biao.title}}</text>
					</view>
					
				</view>
				<!-- 基本属性 -->
				<!-- <view class="att">
					<view class="att_fl dis_flex ju_b aic">
						<view class="afll">
							<text class="att_type">组合类型:</text>
							<text class="att_text">{{item.type1}}</text>
						</view>
						<view class="afll">
							<text class="att_type">网店类目:</text>
							<text class="att_text">{{item.type2}}</text>
						</view>
					</view>
					<view class="att_sl dis_flex ju_b aic">
						<view class="afll">
							<text class="att_type">组合类型:</text>
							<text class="att_text">{{item.type3}}</text>
						</view>
						<view class="afll">
							<text class="att_type">网店类目:</text>
							<text class="att_text">{{item.type4}}</text>
						</view>
					</view>
				</view> -->
				<view class="price bs dis_flex ju_b">
					<view class="">
						<text style="font-size: 36upx;font-weight: bold;">{{item.price}}</text>
						<!-- <text style="font-size: 24upx;">万</text> -->
					</view>
					<view class="jvsl_fr dis_flex aic fs11">
						<text class="iconfont icon-yanjing"></text>
						<text class="tel">{{item.view}}</text>
						<text class="tel">浏览</text>
					</view>
				</view>
			</view>
		</view>
		<view v-if="datas.length==0" class="zanwu">暂无数据</view>
		<view v-if="data_last" class="data_last">到底了~~</view>
	</view>
</template>

<script>
	import service from '../../components/service.js';
	import tel from '@/components/data.js'
	import topbar from '@/components/top_bar/top_bar.vue'
	var that
	var inputt
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
				isPai:true,
				/* 交易市场详情页 */
				tmd_url: '/pagesA_lzc/TradingMarketD/TradingMarketD',
				city:'地区',
				datas:[
					{
						hpic:'/static/images/logo.png',
						tel:'15135725603',
						img:'/static/images/logo.png',
						type:'普通公司',
						title:'汽车用品/电子/清洗/改装专营店',
						biao:[
							{
								text:'可议价',
								bg:'#FFB017'
							},
							{
								text:'包过户费',
								bg:'#FF908A'
							}
						],
						type1:'中文+拼音',
						type2:'家装家具',
						type3:'中文+拼音',
						type4:'家装家具',
						price:'19.00',
						num:256
					}
				],
				showNum:0,
				shopList_lm:'',
				search:'',
				type:'',
				buy_type:'',
				data_last:false
			}
		},
		onHide() {

		},
		onReachBottom() {
			
			that.getdata()
		},
		onLoad(option) {
			that = this
			that.type=option.type
			that.buy_type=option.buy_type||''
			if(option.pid){
				that.shopList_lm=option.pid
			}
			that.onRetry()
		},
		onShow() {
				if(that.showNum>0){
					if(uni.getStorageSync('shopList_lm')){
						that.shopList_lm=uni.getStorageSync('shopList_lm')
					}
					that.onRetry()
				}
				that.showNum++
		},
		onHide() {
			uni.setStorageSync('shopList_lm','')
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			daiyan_sousuo(){
				clearInterval(inputt)
				inputt = setTimeout(function() {
					var kw = that.search
					console.log(kw.length)
					if (kw.length > 0) {
						
						that.onRetry()
				
					} else {
						that.onRetry()
					
					}
				}, 800)
			},
			onRetry(){
				that.data_last=false
				that.page=1
				that.datas=[]
				that.getdata()
			},
			getdata(){
				var jkurl="/trade/list"
				var datas={
					type:that.type,
					
					page:that.page,
					limit:20,
					pid:that.shopList_lm,
					sort:that.isPai?1:2,
					search:that.search
				}
				if(that.type==4){
					datas={
						type:that.type,
						buy_type:that.buy_type,
						page:that.page,
						limit:20,
						pid:that.shopList_lm,
						sort:that.isPai?1:2,
						search:that.search
					}
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
			getTel(phone) {
				return tel.tel(phone);
			},
			paiLeft() {
				this.isPai = !this.isPai;
				that.onRetry()
			},
			back(){
				uni.navigateBack({
					delta:1
				})
			},
			cityChange(data){
				this.city = data.data.join('')
				console.log(data.data.join(''))
				console.log(this.city);
			}
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
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.tfl_center {
		width: 574upx;
		height: 60upx;
		background: #FFFFFF;
		border-radius: 30upx;
		padding-left: 34upx;
	}
	.tfl_center input{
		width: 100%;
		box-sizing: border-box;
		padding: 0 20upx;
	}

	.shopNav {
		width: 750upx;
		padding: 31upx 30upx;
	}

	.snl {
		height: 35upx;
		
	}
	.shanLa1{
		color: #DFDFDF;
	}
	.shanLa2{
		color: #EF2A46;
	}

	.snl .iconfont {
		font-size: 30upx;

	}

	.icon-shangla {
		/* margin-top: 10upx; */
	}

	.icon-xiala {
		margin-top: -20upx;
	}

	.shopListBody {
		width: 750upx;
		padding: 0 30upx;
		box-sizing: border-box;
	}
	.shopListBody+.shopListBody{
		margin-top: 20upx;
	}
	.jvsl {
		width: 100%;
		// height: 404upx;
		border: 1px solid #EEEEEE;
		border-radius: 10upx;
	}

	.jvslView {
		width: 100%;
		height: 64upx;
		padding: 0 19upx 0 25upx;
		border-bottom: 1px solid #eee;

	}

	.jvsl_fl image {
		width: 40upx;
		height: 40upx;
		border-radius: 50%;
		min-width: 40upx;
	}

	.jvslView .tel {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333;
		margin-left: 10upx;
	}

	.jvsl_fr {
		color: #999;
	}

	.jvsl_fr text:nth-child(2) {
		margin-left: 5upx;
	}

	.jvsl_fr text:nth-child(3) {
		margin-left: 5upx;
	}

	.jvsl_sl {
		width: 100%;
		height: 87upx;
		padding: 0 13upx;
		margin-top: 12upx;
	}

	.jvsl_sl image {
		height: 87upx;
		width: 87upx;
		border-radius: 18upx;
		min-width: 87upx;
	}

	.jvsl_slr {
		width: 100%;
		height: 100%;
		padding-top: 10upx;
	}

	

	

	.myTag {
		width: 100%;
		/* height: 35upx; */
		margin-top: 22upx;
		padding: 0 13upx;

	}

	.tagItem {
		display: inline-block;
		font-size: 20upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #FFFFFF;
		background: #FFB017;
		border-radius: 16upx;
		box-sizing: border-box;
		padding: 6upx 11upx;
		margin-right: 10upx;
		margin-bottom: 10upx;
	}

	.att {
		width: 100%;
		margin-top: 34upx;
		padding: 0 30upx;


	}

	.att_fl,
	.att_sl {
		font-size: 24upx;
		font-family: PingFang SC;
		font-weight: 400;
	}

	.att_sl {
		margin-top: 20upx;
	}

	.att_type {
		color: #DDDDDD;
	}

	.att_text {
		color: #999999;
		margin-left: 0.5rem;
	}

	.price {
		width: 100%;
		color: #F43B31;
		margin-top: 20upx;
		margin-bottom: 26upx;
		padding: 0 30upx 0 30upx;
	}

	.icon-news1 {
		color: #FB8C2A;
		font-size: 24upx;
		margin-top: 5upx;
	}
	.sp_title{
		max-height: 64upx;
		line-height: 32upx;
		font-size: 28upx;
	}
	.biao {
		/* width: 100upx; */
		/* height: 36upx; */
		padding: 2upx 10upx;
		max-width: 150upx;
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
		}
</style>
