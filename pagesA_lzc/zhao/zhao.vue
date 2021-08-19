<!-- 发布招标 -->
<template>
	<view class="content">
		<!--自定义导航-->
		<topbar bg_color="#F43B31">
			<text style="color: #fff;" class="iconfont icon-back-line" @click="back"></text>
			<view class="searchView dis_flex aic">
				<text style="color: #999;font-size: 28upx;" class="iconfont icon-sousou"></text>
				<text class="fs12 fw400" style="color: #ddd;margin-left: 7upx;">请输入您需要的内容</text>
			</view>
		</topbar>
		<view class="zhaoBody dis_flex">
			<scroll-view scroll-y="true" class="zhaol" :style="{height:`${height}upx`}">
				<view class="zhl dis_flex aic ju_c fs17 fw500 myC3">
					全部业务
				</view>
				<view class="zhaoli dis_flex_c aic ju_c myC3 fs12 fw400" v-for="(item,index) in navlist" :key="index"
					:class="{zhaoliA:xz_index==index}" @click="nav(index)">
					{{item.title}}
					<view class="dian" v-if="xz_index==index"></view>
				</view>
			</scroll-view>
			<scroll-view scroll-y="true" class="zhaor" :style="{height:`${height}upx`}">
				<view class="zhr dis_flex aic fs12 fw400">
					<text class="myC9">本地有</text>
					<text class="F43B31">{{num}}</text>
					<text class="myC9">名服务者为您服务</text>
				</view>
				<view class="zhaori" v-if="navlist.length>0&&navlist[xz_index].child">
					<view v-for="(item,index) in navlist[xz_index].child" :key="index" @click.stop="gnav(index)">
						<view class="biao dis_flex aic flex-left F43B31 fw400">
							<view class="redLine"></view>
							<text class="fs12">{{item.title}}</text>
						</view>
						<view class="dis_flex" style="flex-wrap: wrap;" v-if="xz_index1==index">
							<view class="biao2 fs12" :class="{'F43B31':listitem.active,'biao1':listitem.active}"
								v-for="(listitem,lindex) in item.child" :key="lindex" @click.stop="gnlist(listitem)">
								{{listitem.title}}</view>
							<view v-if="item.child&&item.child.length==0" class="zanwu">暂无数据</view>
						</view>
					</view>
					<view v-if="navlist.length>0&&navlist[xz_index].child&&navlist[xz_index].child.length==0" class="zanwu">暂无数据</view>
				</view>
			</scroll-view>
		</view>
	</view>

</template>

<script>
	import Vue from 'vue'
	import service from '../../components/service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				height: 0,
				num: 20502,
				navlist: [],
				gnavlist: [],
				xz_index:0,
				xz_index1:0
			}
		},
		onHide() {

		},
		onLoad() {
			that = this;
			that.getdata()
		},
		onReady() {
			this.height = uni.getSystemInfoSync().windowHeight * 2 - 90;
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getdata(){
				service.P_post("bidding_list/classfiy").then((res)=>{
					console.log(res)
					if(res.code == 1){
						this.navlist = [];
						that.navlist = res.data.list;
						that.num = res.data.user_num;
						
						console.log(this.navlist)
					}
				})
			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			nav(index) {
				that.xz_index=index
				that.xz_index1=0
			},
			gnav(index) {
				that.xz_index1=index
			},
			gnlist(item) {
				
				// if (!item.active) {
				// 	Vue.set(item,'active',true)
				// }else{
				// 	Vue.set(item,'active',false)
				// }
				uni.navigateTo({
					url:'/pagesA_lzc/SendTender/SendTender?id='+item.id
				})

			},
			back() {
				uni.navigateBack({
					delta: 1
				})
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

	.searchView {
		width: 646upx;
		height: 60upx;
		background-color: #fff;
		border-radius: 30upx;
		margin-right: 22upx;
		padding-left: 34upx;
	}

	.CF3 {
		color: #fff;
	}

	.myC3 {
		color: #333;
	}

	.myC9 {
		color: #999;
	}

	.F43B31 {
		color: #F43B31;
	}

	.zhaoHeader {
		width: 750upx;
		height: 80upx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.zhl {
		width: 209upx;
		height: 80upx;
		min-width: 209upx;
		background-color: #fff;
		border-bottom: 1px solid #eee;
	}

	.zhr {
		width: 539upx;
		height: 80upx;
		padding-left: 27upx;
		border-bottom: 1px solid #eee;

	}

	.zhaol {
		width: 209upx;
		background-color: #f8f8f8;
	}

	.zhaoli {
		width: 209upx;
		height: 98upx;
		position: relative;
	}

	.zhaoliA {
		background-color: #fff;
	}

	.dian {
		width: 15upx;
		height: 15upx;
		background: #F43B31;
		opacity: 0.3;
		border-radius: 50%;
		position: absolute;
		top: 33upx;
		left: 46upx;
	}

	.zhaori {
		width: 100%;
		box-sizing: border-box;
		padding-left: 41upx;
	}

	.redLine {
		width: 3upx;
		height: 21upx;
		background: #F43B31;
		margin-right: 7upx;
	}

	.biao {
		width: 100%;
		height: 80upx;
	}

	.biao1 {
		padding: 10upx 13upx;
		border: 1px solid #F43B31;
		background-color: #FFDAD8;
		border-radius: 22upx;
		margin-right: 30upx;
		margin-bottom: 32upx;
	}

	.biao2 {
		border: none;
		background-color: #f8f8f8;
		border-radius: 22upx;
		margin-right: 30upx;
		margin-bottom: 32upx;
		padding: 10rpx 18rpx;
	}
</style>
