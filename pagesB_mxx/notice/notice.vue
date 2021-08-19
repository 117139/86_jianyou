<template>

	<view class="content">
		<!-- <topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">通知设置</text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar> -->
		<view class="flex ju_b  p12 aic bgcf">
			<text class="fs15 fwb">接收消息通知</text>

			<switch class="section-right" :checked="treatmentStatu.checked" @change="switchChange" color="#F43B31"
				style="transform: scale(.98,.82);" />

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
				treatmentStatu: {
					checked: false
				},
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
			},
			switchChange() {
				uni.showModal({
					title: '提示',
					content: '确定接收消息通知吗',
					success: function(res) {
						if (res.confirm) {
							console.log('用户点击确定');
						} else if (res.cancel) {
							console.log('用户点击取消');
						}
					},
				})
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
</style>
