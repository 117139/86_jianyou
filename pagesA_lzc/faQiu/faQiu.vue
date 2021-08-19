<!-- 发布求购 -->
<template>

	<view class="content dis_flex ju_b">
		<view class="fq_left">
			<view :class="{'fq_left_itemA':nav_index==index}" class="fs12 fw400 fq_left_item dis_flex ju_c aic"
				v-for="(item,index) in navList" :key="index" @click="tab(index)">
				{{item.title}}
			</view>
		</view>
		<view class="fq_right">
			<view class="fqrt dis_flex ju_c aic">
				<text style="color: #eee;">———</text>
				<text class="fs12 fw400" style="margin: 0 0.25rem;"> 热门推荐 </text>
				<text style="color: #eee;">———</text>
			</view>
			<view class="fqrbody dis_flex">
				<view class="hsl_item dis_flex_c ju_c aic" v-for="(item,index) in hzList" :key="index" @click="jump" data-type="3" :data-pid="item.id" :data-url="`${fabu2Url}?typeId=${item.id}&type=${type}&title=${item.title}`">
					<image :src="getimg(item.img)" mode="aspectFill"></image>
					<text class="hsl_text">{{item.title}}</text>
				</view>
				<view v-if="hzList.length==0" class="zanwu">暂无数据</view>
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
				fabu2Url:'/pagesA_lzc/fabu2/fabu2',
				api:'',
				navList: [],
				hzList: [],
				list:[],
				type:"",
				nav_index:0,
				jump_type:0
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this;
			that.jump_type=option.jump_type||0
			// this.api = api.imgurl;
			
			if(option.id){
				console.log(option.id)
				this.type = option.id;
			}
			that.getdata()
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
				if(that.jump_type==1){
					console.log(e)
					uni.setStorageSync('shopList_lm',e.currentTarget.dataset.pid)
					uni.navigateBack({
						delta:1
					})
					return
				}
				return service.jump(e)
			},
			getdata(){
				service.P_post('transaction_list/classfiy').then((res) => {
					if(res.code == 1){
						this.navList = res.data;
						this.hzList = res.data[0].child;
						
						
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
			tab(index){
				that.nav_index=index
				that.hzList=that.navList[index].child
				
			}
		}
	}
</script>

<style>
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

	.fq_left {
		width: 209upx;
		height: 100vh;
		background-color: #f8f8f8;
		min-width: 209upx;
	}

	.fq_right {
		width: 100%;
		height: 100vh;
		min-width: 540upx;
		background-color: #fff;
	}

	.fq_left_item {
		width: 100%;
		height: 98upx;
		color: #333;
	}

	.fq_left_itemA {
		background-color: #fff;
	}

	.fqrt {
		width: 100%;
		height: 98upx;
		color: #333;
	}

	.fqrbody {
		flex-wrap: wrap;
	}

	.hsl_item {
		width: 33.3%;
		min-width: 33.3%;
		padding: 32upx 0;

	}

	.hsl_item image {
		height: 45upx;
		width: 45upx;
	}

	.hsl_text {
		font-size: 22upx;
		font-family: PingFang SC;
		font-weight: 400;
		color: #333333;
		margin-top: 20upx;
	}
</style>
