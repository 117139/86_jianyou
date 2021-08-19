<!-- 发布 -->
<template>
	<view class="content flex-1">
		<image class="bgfa" src="/static/images/lzc/fa/fabg.png" mode="aspectFill"></image>
		<view class="navfa dis_flex ju_b aic">
			<view class="navItem dis_flex_c ju_c aic" @click="jump" :data-url="fqUrl+'?id=求购'" :data-login='true' :data-hasLogin='hasLogin'>
				<image src="/static/images/lzc/fa/qiu.png" mode="heightFix"></image>
				<text class="fs15 fw500">求购</text>
			</view>
			<view class="navItem dis_flex_c ju_c aic" @click="jump" data-url="/pagesA_lzc/faQiu/faQiu?id=出售" :data-login='true' :data-hasLogin='hasLogin'>
				<image src="/static/images/lzc/fa/shou.png" mode="heightFix"></image>
				<text class="fs15 fw500">出售</text>
			</view>
			<view class="navItem dis_flex_c ju_c aic" @click="jump" data-url="/pagesA_lzc/faQiu/faQiu?id=转让" :data-login='true' :data-hasLogin='hasLogin'>
				<image src="/static/images/lzc/fa/ran.png" mode="heightFix"></image>
				<text class="fs15 fw500">转让</text>
			</view>
			<view class="navItem dis_flex_c ju_c aic" @click="jump" :data-url="zhaoUrl" :data-login='true' :data-hasLogin='hasLogin'>
				<image src="/static/images/lzc/fa/zhao.png" mode="heightFix"></image>
				<text class="fs15 fw500">招标</text>
			</view>
		</view>
		<view class="footfa dis_flex aic ju_c">
			<text class="iconfont icon-shanchu" @click="back"></text>
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
				fqUrl:'/pagesA_lzc/faQiu/faQiu',
				zhaoUrl:'/pagesA_lzc/zhao/zhao',
				faUrl:'/pagesA_lzc/fabu2/fabu2',
			}
		},
		onHide() {
			console.log(111);
			// plus.navigator.setFullscreen(false);
		},
		onLoad() {
			that = this
		},
		onShow() {
			// plus.navigator.setFullscreen(true);
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
			back(){
				uni.navigateBack({
					delta:1
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
		height: 100vh;
		margin: 0;
		padding: 0;
		position: relative;
	}

	.bgfa {
		width: 100%;
		height: 100vh;
	}

	.navfa {
		width: 100%;
		position: absolute;
		bottom: 263upx;
		padding: 0 99upx;
	}

	.navItem image {
		width: 72upx;
		height: 72upx;
		min-width: 72upx;
	}

	.navItem text {
		font-family: PingFang SC;
		color: #666666;
		line-height: 32px;
		margin-top: 4upx;
	}
	.footfa{
		width: 750upx;
		position: absolute;
		bottom: 82upx;
	}
</style>
