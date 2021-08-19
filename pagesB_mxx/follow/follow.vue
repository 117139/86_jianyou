<template>

	<view class="content">
		<topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">关注用户(6)</text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar>
		<view class=" pl15 pr15 bgcf" v-for="(item,index) in shuju" :key='index'>
			<view class=" flex aic pt15 pb15" :style="{'borderBottom':index==shuju.length-1?'none':'1px solid #eee'}">
				<image :src="getimg(item.img)" mode="aspectFill" class="img_shju"></image>
				<text class="fs15 pl10">{{item.title}}</text>
			</view>
			
		</view>
	</view>
</template>

<script>
	import api from '../../components/service.js';
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				shuju:[
					{
						img:'/static/images/logo.png',
						title:'151****5678'
					},
					{
						img:'/static/images/logo.png',
						title:'151****5678'
					},
					{
						img:'/static/images/logo.png',
						title:'151****5678'
					},
					{
						img:'/static/images/logo.png',
						title:'151****5678'
					},
					{
						img:'/static/images/logo.png',
						title:'151****5678'
					},
					{
						img:'/static/images/logo.png',
						title:'151****5678'
					}
				]
			}
		},
		onHide() {

		},
		onLoad() {
that=this
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getimg(img) {
				return api.getimg(img)
			},
			jump(e) {
				return api.jump(e)
			},
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			}
		}
	}
</script>

<style>
	page {
		background-color:  #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color:  #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}
	.img_shju {
		width: 79rpx;
		height: 79rpx;
		border-radius: 40rpx;
	}
</style>
