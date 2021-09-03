<template>

	<view class="content">
		<!--bg_color="#ff0000"-->
		<!-- <topbar :bg_img="getimg('/static/images/ma/my_back.png')" text_color="#fff" :have_top="false"> -->
		<topbar bg_img="/static/images/ma/my_back.png" text_color="#fff" :have_top="true">
			<text class=""> </text>
			<text class="pl30">我的</text>
			<text class="pr5 fs16" @click='jump' data-url='/pagesB_mxx/set_up/set_up' :data-login='true'
				:data-hasLogin='hasLogin'>设置 </text>
		</topbar>
		<image src="/static/images/ma/my_back.png" mode="widthFix" class="img_backs "></image>
		<view class="my_box">
			<!-- {{hasLogin}} -->
			<view class="tou_img flex aic " v-if="hasLogin">
				<!-- <image src="/static/images/ma/my_back.png" mode="widthFix" class="img_backs "
					style="z-index: 1;"></image> -->
				<image :src="getimg(userinfo.img)" mode="aspectFill" class="touxaing  "></image>
				<!-- <text class="fs18 cf pl12 flex_1">{{userinfo.nick}}</text> -->
				<text class="fs18 cf pl12 flex_1">{{userinfo.phone}}</text>
				<view class="qianbao  cf fs14 flex aic pl20" @click='jump'
					data-url='/pagesB_mxx/My_wallet/My_wallet' :data-login='true' :data-hasLogin='hasLogin'>
					我的钱包
				</view>
			</view>
			<view class="tou_img dis_flex aic  ju_c  " v-else @click='jump' data-url='/pagesB_mxx/login/login' data-id = "1">
				
				登录/注册
			</view>
			<!-- 卡片 招标市场-->
			<view class="relative" style="z-index: 88;">
				<view class="ka  ml15 flex p15 flex  ju_b" @click='jump'
						data-url='/pagesB_mxx/Bidding_market/Bidding_market' :data-login='true' :data-hasLogin='hasLogin'>
					<view class="flex">
						<image src="/static/images/ma/biaozhi.png" mode="aspectFill" class="biaozhi"></image>
						<view class="flex flex-col pl12">
							<text class="ju fs14 pt3">招标市场</text>
							<text class="c9 fs12 pt5">交易过程更加安心便捷</text>
						</view>
					</view>
					<image src="/static/images/ma/go.png" mode="aspectFill" class="go" >
					</image>
				</view>
			</view>
			
			<!-- 我的订单 -->
			<view class="ka  ml15 mt15 pt12">
				<text class=" fwb fs16 pl15 ">我的订单</text>
				<view class="width flex mt10">
					<view class="flex align-items-center flex-col mt12 zhi ml10" @click='jump'
						data-url='/pagesB_mxx/My_transaction/My_transaction' :data-login='true' :data-hasLogin='hasLogin'>
						<image class="xiaou " src="/static/images/ma/qiu.png" mode="aspectFill"></image>
						<text class="fs13 fw500 pt8">求购订单</text>
					</view>
					<view class="flex align-items-center flex-col mt12 zhi ml12" @click='jump'
						data-url="/pagesB_mxx/My_order/My_order" :data-login='true' :data-hasLogin='hasLogin'>
						<image class="xiaos " src="/static/images/ma/zhao.png" mode="aspectFill"></image>
			
						<text class="fs13 fw500 pt8">招标订单</text>
					</view>
				</view>
			</view>
			<!-- 常用功能 -->
			<view class="">
				<view class="ka  ml15 mt15 pt12   mb15">
					<text class=" fwb fs16 pl15 ">交易中心</text>
					<view class="box_adds pt10">
						<view class="son" @click='jump' data-url="/pagesA_lzc/Phomepage/Phomepage" :data-login='true'
							:data-hasLogin='hasLogin'>
							<image class="xiao " src="/static/images/ma/fabu.png" mode="aspectFill"></image>
							<text class="fs13 fw500 pt5">我的发布</text>
						</view>
						<view class="son" @click='jump' data-url='/pagesB_mxx/My_shopping/My_shopping' :data-login='true'
							:data-hasLogin='hasLogin'>
							<image class="xiao " src="/static/images/ma/qiugou.png" mode="aspectFill"></image>
							<text class="fs13 fw500 pt5 ">我的求购</text>
						</view>
						<view class="son" @click='jump' data-url='/pagesB_mxx/browse/browse' :data-login='true'
							:data-hasLogin='hasLogin'>
							<image class="xiao " src="/static/images/ma/liu.png" mode="aspectFill"></image>
							<text class="fs13 fw500 pt5 ">浏览足迹</text>
						</view>
						<view class="son" @click='jump' data-url='/pagesB_mxx/My_Collection/My_Collection'
							:data-login='true' :data-hasLogin='hasLogin'>
							<image class="xiao " src="/static/images/ma/shou.png" mode="aspectFill"></image>
							<text class="fs13 fw500 pt5 ">收藏关注</text>
						</view>
						<view class="son" @click='jump' data-url='/pagesB_mxx/My_comments/My_comments' :data-login='true'
							:data-hasLogin='hasLogin'>
							<image class="xiao " src="/static/images/ma/qing.png" mode="aspectFill"></image>
							<text class="fs13 fw500 pt5 ">我的评价</text>
						</view>
						<view class="son" @click='jump' data-url='/pagesB_mxx/My_circle/My_circle' :data-login='true'
							:data-hasLogin='hasLogin'>
							<image class="xiao " src="/static/images/ma/quanzi.png" mode="aspectFill"></image>
							<text class="fs13 fw500 pt5 ">我的圈子</text>
						</view>
			
					</view>
				</view>
			</view>
			
			<view class="ka  ml15 mt15 pt6 xiab">
				<view class="width flex ">
					<!-- <view class="flex align-items-center flex-col mt12 zhi ml10" @click='call' :data-tel="kf_tel"
						data-url='/pagesA_lzc/news/news' :data-login='true' :data-hasLogin='hasLogin'> -->
					<view class="flex align-items-center flex-col mt12 zhi ml10" @click="jump" data-type="web" :data-tel="kf_tel" :data-url="kf_url" :data-login='true' :data-hasLogin='hasLogin'>
						<image class="xiao " src="/static/images/ma/kefu.png" mode="aspectFill"></image>
						<text class="fs13 fw500 pt8">客服中心</text>
					</view>
					<view class="flex align-items-center flex-col mt12 zhi ml12" @click='jump_fuc'
						data-url='/pagesB_mxx/shenfen/shenfen' :data-login='true'>
						<image class="xiao " src="/static/images/ma/fuwu.png" mode="aspectFill"></image>
			
						<text class="fs13 fw500 pt8">成为服务者</text>
					</view>
				</view>
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
				isLogin:false,
				hpic:'',
				tel:''
			}
		},
		
		onHide() {

		},
		onLoad() {
			that = this
		},
		onShow() {
		
		},
		

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','kf_tel','kf_url'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			call(e){
				service.call(e)
			},
			jump_fuc(){
				if(that.userinfo.is_examine==4){
					uni.navigateTo({
						url:'/pagesB_mxx/shenfen/shenfen'
					})
				}else{
					uni.navigateTo({
						url:'/pagesB_mxx/to_examine/to_examine'
					})
				}
			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				console.log(e)
				return service.jump(e)
				
			},
		}
	}
</script>

<style>
	.go {
		width: 91rpx;
		height: 91rpx;
	}

	.ju {
		color: #F28D27;
	}

	.biaozhi {
		width: 73rpx;
		height: 86rpx;
	}



	
	

	.touxaing {
		width: 78rpx;
		height: 78rpx;
		border-radius: 50%;
		z-index: 99;
	}

	.qianbao {
		width: 180rpx;
		height: 50rpx;
		background: linear-gradient(-90deg, #FF544F 0%, #FAD126 100%);
		border-radius: 25rpx 0 0 25rpx;
	}

	.hhh {
		width: 750rpx;
		height: 390rpx;

	}

	.img_box {
		height: 390rpx;
		z-index: 0;

	}

	.logos {
		width: 40rpx;
		height: 40rpx;
		margin-top: 80rpx;
		margin-left: -35rpx;
		vertical-align: middle;
	}

	.img {
		width: 125rpx;
		height: 124rpx;
		border-radius: 50%;
		border: 8rpx solid #fff;
		/* margin-top: 127rpx; */
		margin-left: 35rpx;
		vertical-align: middle;
	}

	.user {
		font-size: 36rpx;
		font-family: PingFang;
		font-weight: 500;
		color: #FFFFFF;
		/* padding-top: 180rpx; */
		padding-left: 36rpx;
		height: 50rpx;
		/* margin-top: 40rpx; */
		z-index: 2;
	}

	.bian {
		width: 37rpx;
		height: 37rpx;
		/* margin-top: 192rpx; */
	}

	

	.harder {
		height: 91rpx;
		background-color: #fff;
		border-bottom: 2px solid #F2F2F2;
		border-radius: 10rpx;
	}

	.xu {
		width: 45rpx;
		height: 43rpx;
		vertical-align: middle;
		margin-right: 15rpx;
	}

	.chakan {
		color: #aaa;
	}

	.xiao {
		width: 67rpx;
		height: 68rpx;
	}

	.xiaou {
		width: 36rpx;
		height: 42rpx;
	}

	.xiaos {
		width: 40rpx;
		height: 43rpx;
	}

	/* .zichan {
		width: 718rpx;
		background: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(52, 52, 52, 0.1);
		border-radius: 10rpx;
		margin-left: 16rpx;
		padding-bottom: 30rpx;
	} */

	.zhi {
		width: 150rpx;

	}



	.box_adds {

		display: flex;
		flex-wrap: wrap;
		width: 100%;
		margin-left: 10rpx;
	}

	.son {
		display: flex;
		flex-direction: column;
		align-items: center;
		height: 140rpx;
		padding: 15rpx;
		width: 25%;
	}

	.xiab {
		margin-bottom: 180rpx;
	}
	
	
	
	
	
	
	
	
	
	page {
		background-color: #f5f5f5;
		width: 100%;
		min-height: 100vh;
		margin: 0;
		padding: 0;
	}
	
	.content {
		background-color: #f5f5f5;
		width: 100%;
		/* height: 100%; */
		margin: 0;
		padding: 0;
	}
	.img_backs {
		height: 350rpx !important;
		width: 100%;
		position: absolute;
		top: 0;
		z-index: 1;
	}
	
	.my_box{
		position: relative;
		z-index: 10;
		padding-top: 10upx;
		/*  #ifndef H5  */
		padding-bottom: 100upx;
		/*  #endif  */
	}
	.tou_img {
		width: 100%;
		min-height: 120upx;
		color: #fff;
		/* padding: 0 30upx; */
		padding-left: 30upx;
	}
	.ka {
		width: 694rpx;
		/* height: 317rpx; */
		background: #FFFFFF;
		box-shadow: 0px 0px 10px 0px rgba(52, 52, 52, 0.1);
		border-radius: 10rpx;
		background-color: #fff;
		z-index: 99;
		/* margin-top: -140rpx; */
		padding-bottom: 30rpx;
	}
</style>
