<template>
	<view class="">
		<view class="citem dis_flex" v-for="(item,index) in zList" @click="jump" :data-url="'/pagesA_lzc/QfDetails/QfDetails?id='+item.id">
			<view class="ci_img" style="">
				<image :src="getImg(item.img)" mode="aspectFill"></image>
			</view>
			<view class="ci_view">
				<view class="ci_topv oh2">
					{{item.title}}
				</view>
				<view class="ci_bottom_v dis_flex ju_b aic">
					<view class="cil"><text>{{item.create_time}}</text></view>
					<view class="cir dis_flex aic"><text
							class="iconfont icon-yanjing"></text><text>{{item.visit}}浏览</text>
					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import url from '@/components/service.js'
	export default {
		name: "news_item_lzc",
		props: {
			zList: {
				type: Array,
				default: []
			}
		},
		data() {
			return {
				QfDetailsUrl: '/pagesA_lzc/QfDetails/QfDetails',
			
			};
		},
		methods: {
			getImg(img) {
				return url.getimg(img);
			},
			jump(e) {
				console.log(e);
				return url.jump(e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.citem {
		width: 750upx;
		height: 190upx;
		box-sizing: border-box;
		// margin-top:30upx;
		padding: 24upx 45upx 24upx 30upx;
		border-bottom: 1px solid #eee;

		.ci_img {
			width: 208upx;
			height: 142upx;
			background-color: #007AFF;
			border-radius: 10upx;

			image {
				width: 208upx;
				height: 142upx;
				border-radius: 10upx;
			}
		}

		.ci_view {
			width: 100%;
			height: 100%;
			box-sizing: border-box;
			padding: 15upx 0 0 35upx;
			position: relative;

			.ci_topv {
				width: 100%;
				// height: 61upx;
				font-size: 26upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 36upx;
			}

			.ci_bottom_v {
				width: 100%;
				height: 16upx;
				position: absolute;
				box-sizing: border-box;
				padding-left: 35upx;
				bottom: 0;
				left: 0;
				font-size: 20upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #BBBBBB;
				line-height: 36upx;
			}
		}
	}
</style>
