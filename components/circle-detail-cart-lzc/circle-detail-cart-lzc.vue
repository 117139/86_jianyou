<template>
	<view class="tbodyView">
		<!-- @click="jump" 
		data-url="/pagesA_lzc/circleDetail2/circleDetail2" -->
		<view class="tbody" v-for="(cz,cindex) in czlist" :key="cindex"  @click.stop="xx(isfu)">
			<view class="tbitem">
				<view class="tbitem_fl dis_flex aic">
					<image :src="getimg(cz.hpic)" mode="aspectFill"></image>
					<view class="tel">{{cz.tel}}</view>
					<view class="time">{{cz.time}}</view>
					<view class="flex-right isDelText" style="position: absolute;right: 0;" v-if="isZhu">
						<text>可删除</text>
					</view>
				</view>
				<view class="tbitem_sl oh4">
					<text>{{cz.con}}</text>
				</view>
				<view class="tbitem_ll dis_flex ju_b">
					<image style="width:207upx;" :src="img.img" mode="center" v-for="(img,iIndex) in cz.imgs"
						:key="iIndex" v-if="cz.imgs.length==3" class="tbitem_ll_img">
					</image>
					<image style="width:48%;" :src="img.img" mode="center" v-for="(img,iIndex) in cz.imgs" :key="iIndex"
						v-if="cz.imgs.length==2" class="tbitem_ll_img">
					</image>
					<image :src="img.img" mode="center" style="width:690upx;" v-for="(img,iIndex) in cz.imgs"
						:key="iIndex" v-if="cz.imgs.length==1" class="tbitem_ll_img"></image>
				</view>
				<view class="tbFoot dis_flex flex-right">
					<view class="tbFitem dis_flex aic ju_b">
						<view class="left_tb">
							<text class="iconfont icon-pinglun"></text>
							<text class="pinNum">{{cz.pNum}}</text>
						</view>
						<view class="right_tb"  @tap.stop="zan">
							<text class="iconfont icon-zan-" v-if="iszan"></text>
							<text class="iconfont icon-zan" style="color: #F43B31;" v-else></text>
							<text class="pinNum" :style="{color:iszan?'#ddd':'#F43B31'}">{{znum}}</text>
						</view>

					</view>
				</view>
			</view>
		</view>
	</view>

</template>

<script>
	import api from '@/components/service.js';
	export default {
		name: "circle-detail-cart-lzc",
		props: {
			czlist: {
				type: Array,
				default: []
			},
			isZhu: {
				type: Boolean,
				default: false
			},
			isfu:{
				type: Boolean,
				default: true
			}
		},
		data() {
			return {
				iszan:true,
				znum:200
			};
		},
		methods: {
			getimg(img) {
				return api.getimg(img)
			},
			jump(e) {
				return api.jump(e)
			},
			xx(e){
				if(e){
					uni.navigateTo({
						url:'/pagesA_lzc/circleDetail2/circleDetail2'
					})
				}
			},
			zan(index){
				
				// for (var i = 0; i < this.czlist.length; i++) {
				// 	if(i == index){
				// 		this.czlist[i].iszan = !this.czlist[i].iszan;
				// 		if(this.czlist[i].iszan){
				// 			this.czlist[i].znum --;
				// 		}else{
				// 			this.czlist[i].znum ++;
				// 		}
				// 		this.znum --
				// 	}
				// }
				this.iszan = !this.iszan;
				if(this.iszan){
					this.znum --;
				}else{
					this.znum ++;
				}
				console.log(111)
			}
		}
	}
</script>

<style lang="scss" scoped>
	.tbody {
		width: 750upx;
		box-sizing: border-box;
		padding: 0 30upx;
		// margin-top: 60upx;
		background-color: #fff;
		margin-bottom: 22upx;
		

		.tbitem {
			width: 690upx;
			height: 592upx;
			box-sizing: border-box;
			padding-top: 28upx;
			position: relative;

			.isDelText {
				font-size: 24upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #999999;
			}

			.tbitem_fl {
				width: 100%;
				height: 40upx;
				position: relative;

				// background-color: #F0AD4E;
				image {
					width: 40upx;
					height: 40upx;
					border-radius: 50%;
				}

				.tel {
					font-size: 22upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #333333;
					margin-left: 10upx;
				}

				.time {
					font-size: 24upx;
					font-family: PingFang SC;
					font-weight: 400;
					color: #999999;
					margin-left: 22upx;
				}
			}

			.tbitem_sl {
				width: 100%;
				font-size: 28upx;
				font-family: PingFang SC;
				font-weight: 400;
				color: #333333;
				line-height: 48upx;
				margin-top: 26upx;
			}

			.tbitem_ll {
				width: 100%;
				height: 207upx;
				margin-top: 32upx;

				.tbitem_ll_img {
					height: 207upx;
					border-radius: 4px;
				}
			}

			.tbFoot {
				width: 100%;
				height: 26upx;
				position: absolute;
				bottom: 42upx;
				// background-color: #112288;
				.tbFitem {
					width: 200upx;
					height: 100%;
					// background-color: #007AFF;
					font-size: 24upx;
					font-family: Arial;
					font-weight: 400;
					color: #DDDDDD;
					line-height: 48upx;
					margin-top: 30upx;

					.pinNum {
						margin-left: 10upx;
					}
				}
			}
		}
	}
</style>
