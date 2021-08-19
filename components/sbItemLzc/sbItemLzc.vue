<template>
	<view>
		<view class="sbItem" v-for="(search,sindex) in searchList" :key="sindex" @click="jump" 
		:data-url="'/pagesA_lzc/TradingMarketD/TradingMarketD?id='+search.id">
			<view class="sb_fl dis_flex">
				<view class="dis_flex aic">
					<image :src="getimg(search.classify_img)" mode="widthFix"></image>
				</view>
				<view class="sb_fl_sc dis_flex aic">
					<text class="sb_biao oh1">{{search.classify_title}}</text>
					<view class="sb_con oh1">
						<text>{{search.title}}</text>
					</view>
				</view>
			</view>
			<view class="sb_sl dis_flex ju_b">
				<view class="sb_sll dis_flex aic">
					<image :src="getimg(search.img)" mode="widthFix"></image>
					<text class="tel">{{search.phone}}</text>
				</view>
				<view class="sb_slr dis_flex aic">
					<view class="yx dis_flex aic ju_c">
						<text>意向价</text>
					</view>
					<view class="price">
						<text style="font-size: 36upx;font-weight: bold;">{{search.price}}</text>
						<!-- <text>万</text> -->
					</view>
				</view>
			</view>
		</view>
		
		<view v-if="searchList.length==0" class="zanwu">暂无数据</view>
	</view>
</template>

<script>
	import api from '@/components/service.js'
	export default {
		name: "sbItemLzc",
		props: {
			searchList: {
				type: Array,
				default: []
			},
			isShou:{
				type:String,
				default:'首页'
			}
		},
		data() {
			return {
				/* 商品列表 */
				slUrl: '/pagesA_lzc/TradingMarketD/TradingMarketD',
			};
		},
		methods: {
			getimg(img) {
				return api.getimg(img)
			},
			jump(e) {
				
				return api.jump(e)
			},
		}
	}
</script>

<style lang="scss" scoped>
	.sbItem {
		width: 100%;
		height: 213upx;
		// background-color: #00C5D8;
		box-sizing: border-box;
		padding: 24upx 30upx;
		border-bottom: 1px solid #eee;

		.sb_fl {
			width: 100%;
			height: 88upx;
			margin-bottom: 24upx;

			image {
				width: 88upx;
				height: 88upx;
				border-radius: 18upx;
			}

			.sb_fl_sc {
				width: 100%;
				height: 34upx;
				padding-left: 18upx;
				margin-top: 7upx;

				.sb_biao {
					// width: 92upx;
					max-width: 120upx;
					padding: 0 10upx;
					height: 34upx;
					background: #B7D0F8;
					border-radius: 4upx;
					font-size: 20upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #FFFFFF;
					text-align: center;
					line-height: 34upx;

				}

				.sb_con {
					font-size: 28upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					line-height: 40upx;
					margin-left: 12upx;
					max-width: 500upx;
				}
			}
		}

		.sb_sl {
			width: 100%;

			.sb_sll {
				image {
					width: 40upx;
					height: 40upx;
					border-radius: 50%;
				}

				.tel {
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-left: 10upx;
				}
			}

			.sb_slr {
				.yx {
					width: 80upx;
					height: 32upx;
					background: #FFB017;
					border-radius: 16upx;
					text-align: center;
					line-height: 32upx;
					text {
						font-size: 20upx;
						font-family: PingFang SC;
						font-weight: 400;
						color: #FFFFFF;
					}
				}

				.price {
					font-size: 24upx;
					font-family: Akzidenz-Grotesk BQ Condensed A;
					// font-weight: bold;
					color: #F43B31;
					margin-left: 24upx;
				}
			}
		}
	}
</style>
