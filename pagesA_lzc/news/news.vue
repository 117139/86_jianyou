<!-- 消息 -->
<template>

	<scroll-view scroll-y="true" class="content">
		<view class="newItem dis_flex ju_b" v-for="(item,index) in conversationList" :key="index"  @click="toChat(item)"> 
			<view class="newView">
				<image class="newHpic" :src="getimg(item.userInfo.img)" mode="aspectFill"></image>
				<view class="dian" v-if="item.read_number>0"></view>
			</view>
			<view class="newright box-sizing" style="width: 100%;">
				<view class="newfl dis_flex ju_b aic">
					<text class="fs15 myC3">{{item.userInfo.nick}}</text>
					<text class="fs12 myC9">{{item.create_time_title}}</text>
				</view>
				<view class="newfl dis_flex oh1 sil">
					<rich-text :nodes="nodesFliter(item.msg)"></rich-text>
				</view>
			</view>
		</view>
		<view v-if="conversationList.length==0" class="zanwu">暂无数据</view>
		<!-- <button type="default" @click="jump" data-url="/pagesA_lzc/ceshi/ceshi">测试</button>
		<button type="default" @click="jump" data-url="/pagesA_lzc/ceshi1/ceshi1">测试</button> -->
	</scroll-view>
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
				datas:[],
				page:1,
				data_last:false,
				show_num:0,
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
			if(that.hasLogin){
				that.onRetry()
			}
		},
		onShow() {
			if(that.show_num>0){
				if(that.hasLogin){
					that.onRetry()
				}
			}
			that.show_num++
		},
		watch:{
			hasLogin(val){
				if(val){
					that.onRetry()
				}
			}
		},
		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo','conversationList']),
		},
		methods: {
			...mapMutations(['logout', 'login']),
			//聊天的节点加上外层的div
			nodesFliter(str) {
				let nodeStr = '<div style="align-items: center;word-wrap:break-word;">' + str + '</div>'
				return nodeStr
			},
			toUrl(url) {
				uni.navigateTo({
					url: url
				})
			},
			toChat(item) {
				this.$store.commit('updateConversationActive', item)
				console.log(this.$store.state.conversationActive)
				uni.navigateTo({
					url: '/pagesA_lzc/chat/chat?toid='+item.to_uid
				})
			
			
			},
			onRetry(index) {
				that.datas=[]
				that.page=1
				that.data_last=false
				that.getdata()
			},
			getdata(){
				var jkurl="/chat/list"
				var datas={
					token:this.userinfo.token,
					// page:that.page,
					// limit:20
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
						
						
						if(that.datas.length==0){
							that.datas = datas
							//返回的会话列表
							this.$store.commit("updateConversationList", datas);
						}
						// that.datas = datas.letter
				
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
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				service.jump(e)
			},
		}
	}
</script>

<style scoped>

	.content {
		background-color: #F8F8F8;
		width: 750upx;
		min-height:100vh;
		/* #ifdef H5 */
		min-height:calc(100vh - 44px - env(safe-area-inset-top));
		/* #endif */
		margin: 0;
		padding: 0;
	}
	.newItem{
		width: 750upx;
		height: 124upx;
		background: #FFFFFF;
		box-sizing: border-box;
		padding: 22upx 25upx 20upx 28upx;
		border-bottom: 1px solid #eee;
	}
	.newHpic{
		width: 82upx;
		height: 82upx;
		border-radius: 50%;
		min-width: 82upx;
	}
	.newView{
		width: 82upx;
		height: 82upx;
		border-radius: 50%;
		min-width: 82upx;
		position: relative;
	}
	.dian{
		width: 14upx;
		height: 14upx;
		background: #FE3A35;
		border-radius: 50%;
		position: absolute;
		top:0;
		right: 10upx;

	}
	.newright{
		padding-left: 19upx;
	}
	.myC9{
		color: #999;
	}
	.myC3{
		color: #333;
	}
	
	.box-sizing{
		box-sizing: border-box;
	}
	.sil {
		font-size: 24rpx;
		font-family: PingFang;
		font-weight: 400;
		color: #999;
		margin-top: 15rpx;
		line-height: 34upx;
	}
	/deep/ .emoji_i{
		width: 30upx;
		vertical-align: middle;
	}
</style>
