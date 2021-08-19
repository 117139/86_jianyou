<!-- 优秀服务者 -->
<template>
	<view class="content">
		<!-- v-if="arr.includes(item.Ranking)|| index==list.length-1" -->
		<view class="ful_item dis_flex aic ju_b" v-for="(item,index) in datas" :key="index"  @click="jump" 
		:data-url="`/pagesA_lzc/fuIndex/fuIndex?id=${item.id}`">
			<view class="full">
				<image :src="getimg(item.img)" mode="aspectFill"></image>
			</view>
			<view class="fulc dis_flex_c">
				<view class="dis_flex aic">
					<text class="fs12 fw400">{{item.nick}}</text>
					<uni-rate style="margin-left: 22upx;" :size="starStyle.size" :readonly="starStyle.readonly"
						:allowHalf="starStyle.allowHalf" :margin="starStyle.margin" :value="item.star" max="5" >
					</uni-rate>
				</view>
				<view class="fs12 fw500">
					<text>竞标</text> <text>{{item.view}}</text> <text>单</text>
				</view>
				<view class="fs11 fw400 oh2">
					<text>{{item.content}}</text>
				</view>
			</view>
			<!--  v-if="arr.includes(index)" -->
			<view class="fs12 fw800 flex_0" :class="{'biao':index==0,'biao2':index==1,'biao3':index==2}" style="width: 100upx;" v-if="arr.includes(index)">
				NO.{{index+1}}
			</view>
			<view class="fs12 fw800 flex_0 biao4" style="width: 100upx;" v-if="arr1.includes(index)">
				NO.{{index+1}}
			</view>
			<view class="fs12 fw800" style="width: 100%;" v-if="index>9"></view>
		</view>
		<view class="zanwu" v-if="datas.length==0">暂无数据</view>
		<view class="data_last" v-if="data_last">到底了</view>
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
				/* 星星样式 */
				starStyle: {
					size: 10,
					readonly: true,
					allowHalf: true,
					margin: 1
				},
				arr:[0,1,2],
				arr1:[3,4,5,6,7,8,9],
				limit:10,
				data_last:false,
				moreTrue:false,
				
				page:1,
				datas: []
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

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		onPullDownRefresh() {
			that.onRetry()
		},
		
		onReachBottom() {
			that.getData()
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			onRetry(){
				that.datas=[]
				that.page=1
				that.btnkg=0
				that.data_last=false
				that.getData()
			},
			getData(){
				if(that.btnkg==1){
					return
				}
				that.btnkg = 1;
				uni.showLoading({
					mask: true,
					title: '正在获取数据'
				})
				var turl = "user/service_list";
				var data = {
					page:that.page,
					limit:20
				}
				var nowpage=that.page
				service.P_post(turl,data).then(res=>{
					console.log(res)
					if(res.code == 1){
						var data = res.data.data;
						that.btnkg = 0;
						if(nowpage == 1){
							
							that.datas = res.data.data;
							
						}else{
							if(data.length>0){
								that.datas=that.datas.concat(res.data.data)
								
							}else{
								that.data_last = true;
								return
								console.log("没有了")
							}
						}
						that.page++
					}else{
						that.btnkg = 0;
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
				}).catch(e=>{
					that.btnkg = 0;
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

<style scoped>
	page {
		background-color: #fff;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	uni-view {
		word-break: unset;
	}

	.content {
		background-color: #F8F8F8;
		width: 750upx;
		/* height: 100vh; */
		min-height: 100vh;
		box-sizing: border-box;
		padding: 20upx 30upx;
	}

	.ful_item {
		width: 100%;
		height: 174upx;
		background: #fff;
		border-radius: 10upx;
		padding: 24upx 21upx;
		margin-bottom: 20upx;

	}

	.full image {
		width: 126upx;
		height: 126upx;
		border-radius: 10upx;
		min-width: 126upx;
	}

	.fulc {
		width: 100%;
		/* height: 100%; */
		min-width: 436upx;
		padding-left: 20upx;
		box-sizing: border-box;
		padding-bottom: 10upx;
		/* background-color: #007AFF; */
	}

	.biao {
		width: 100%;
		display: inline-block;
		box-sizing: border-box;
		padding: 13upx 17upx;
		background: linear-gradient(0deg, #F28E26 0%, #FD644F 100%);
		border-radius: 22upx;
		color: #fff;
		text-align: center;
	}
	.biao2 {
		width: 100%;
		display: inline-block;
		box-sizing: border-box;
		padding: 13upx 17upx;
		background: linear-gradient(0deg, #4FACFE 0%, #45DEE6 97%);
		border-radius: 22upx;
		color: #fff;
		text-align: center;
	}
	.biao3 {
		width: 100%;
		display: inline-block;
		box-sizing: border-box;
		padding: 13upx 17upx;
		background: linear-gradient(0deg, #4ECE7C 0%, #45DEC1 100%);
		border-radius: 22upx;
		color: #fff;
		text-align: center;
	}
	.biao4 {
		width: 100%;
		display: inline-block;
		box-sizing: border-box;
		padding: 13upx 10upx;
		background: linear-gradient(0deg, #F0F0F0 0%, #DBDBDB 100%);
		border-radius: 22upx;
		color: #fff;
		text-align: center;
	}
</style>
