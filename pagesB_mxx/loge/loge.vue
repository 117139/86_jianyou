<template>

	<view class="content">
		<!-- <topbar bg_color="#FFFFFF" text_color="#fff" :have_top="true">
			<text class=""  @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;"></text>
			<text class="pr5 fs14 fs16" @click='jump' data-url='../zhuce/zhuce' :data-shifou='true'> </text>
		</topbar> -->
		<image src="/static/images/ma/qidong.png" mode="aspectFill" class="img_lode"></image>
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
			return {}
		},
		onHide() {

		},
		onLoad() {
			that = this
			setTimeout(function() {
				console.log('1')
				uni.reLaunch({
					url: '/pages/index/index',
				});
			}, 3000)
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
		}
	}
</script>

<style>
	page {
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.content {
		background-color: #F8F8F8;
		width: 100%;
		height: 100%;
		margin: 0;
		padding: 0;
	}

	.img_lode {
		width: 750rpx;
		height: 100%;
	}
</style>
