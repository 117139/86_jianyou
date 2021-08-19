<!-- 创建圈子 -->
<template>

	<view class="createCircle">
		<!-- 自定义导航 -->
		<topbar bg_color="#F43B31">
			<text @click.stop="back" class="iconfont icon-back-line" style="font-weight: bold;color: #fff;"></text>
			<text style="color: #fff; font-size: 32upx;">创建圈子</text>
			<text class=""></text>
		</topbar>
		<!-- 主体 -->
		<view class="ccbocy">
			<!-- <view class="ccbi dis_flex ju_b aic">
				<text class="ccbi_text">上传头像</text>
				<image class="ccbi_img" src="/static/images/logo.png" mode="widthFix"></image>
			</view> -->
			<view class="flex ju_b aic pt8 pb8 b-b-1">
				<text class="fs15">上传头像</text>
				<avatar selWidth="250rpx" selHeight="250rpx" @upload="myUpload" :avatarSrc="avatar?getimg(avatar):getimg('/static_s/images/upimg.png')"
					avatarStyle="width: 55rpx;height: 55rpx;border-radius: 10upx;" inner=true></avatar>
			</view>
			<!-- <view class="ccbi dis_flex ju_b aic">
				<text class="ccbi_text">添加标题</text>
				<text class="fs14 myC9">企业服务</text>
			</view> -->
			<view class="flex ju_b aic pt12 pb12 b-b-1">
				<text class="fs15">添加标题</text>
				<input type="text" placeholder="请输入标题" v-model="opons" class="fs13 c9 text-right"
					style="max-width: 550upx; min-width: 550upx;" />
			</view>
			<!-- <view class="ccbi dis_flex ju_b aic">
				<text class="ccbi_text">选择地址</text>
				<text class="fs14 myC9">北京</text>
			</view> -->
			<wangding-pickerAddress class=" b-b-1 " @change="change">
				<view class="flex aic ju_b  pb10 pt10">
					<view class="flex aic">
						<text class="fs15 ">选择地址</text>
					</view>
					<view class=" ">
						<text class="fs14  c9">{{city?city:'请选择地址'}}</text>
						<!-- <text class=" icon-arrow iconfont fs11 c9 pl5"></text> -->
						</image>
					</view>
				</view>
			</wangding-pickerAddress>
			<!-- <view class="ccbi dis_flex ju_b aic" style="border: none;">
				<text class="ccbi_text">添加简介</text>
			</view>
			<textarea value="" placeholder-style="color:#eee;font-size:24upx" placeholder="请在这里输入圈子简介…"
				:maxlength='maxlength' />
			<view class="numCC dis_flex aic ju_c">
				<text style="color: #F43B31;">{{textLength}}</text>/<text style="">{{maxlength}}</text>
			</view> -->
			<view class="pt12 pb12 b-b-1">
				<text class="fs15 ">添加简介</text>
				<textarea @input="descInput" v-model="desc" placeholder="请在这里输入圈子简介…" maxlength="500"
					placeholder-class="fs14  gaodu">
				</textarea>
				<view class="num  flex flex-right fs14"><text class="" style="color: #F43B31;">{{desc.length>0?desc.length:0}}</text>/500
				</view>
			</view>
		</view>

		<view class="dis_flex aic ju_c createBtn" @click.stop="create">
			<text>创建</text>
		</view>
	</view>
</template>

<script>
	import service from '../../components/service.js';
	import topbar from '@/components/top_bar/top_bar.vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		components: {
			topbar
		},
		data() {
			return {
				avatar: '',
				maxlength: 500,
				textLength: 0,
				city: '',
				remnant: 0,
				desc: '',
				opons: '',
				createTrue: false
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
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			back() {
				uni.navigateBack({
					delta: 1
				})
			},
			change(data) {

				this.city = data.data.join('')
				console.log(data.data.join(''))
				console.log(this.city);
			},
			descInput(e) {
				this.remnant = e.detail.value.length
			},
			myUpload(rsp) {
				var avatar = rsp.path
				service.wx_upload(avatar).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						that.avatar=datas
					} else {
						if (res.msg) {
							uni.showToast({
								icon: 'none',
								title: res.msg
							})
						} else {
							uni.showToast({
								icon: "none",
								title: "上传失败"
							})
						}
					}
				}).catch(e => {
					that.btn_kg = 0
					console.log(e)
					uni.showToast({
						icon: 'none',
						title: '操作失败'
					})
				})

			},
			create() {
				let token = uni.getStorageSync('token');
				if (this.avatar.length == 0) {
					uni.showToast({
						title: "请上传图片",
						icon: "none"
					})
					return
				}
				if (this.city.length == 0) {
					uni.showToast({
						title: "请选择城市",
						icon: "none"
					})
					return
				}
				if (this.opons.length == 0) {
					uni.showToast({
						title: "请输入标题",
						icon: "none"
					})
					return
				}
				if (this.desc.length == 0) {
					uni.showToast({
						title: "请添加简介",
						icon: "none"
					})
					return
				}
				if (this.createTrue) {
					return
				}
				this.createTrue=true;
				// console.log(this.avatar)
				// return
				let data = {
					title: this.opons,
					subtitle: this.desc,
					pic: this.avatar,
					address: this.city
				}
				service.P_post("circle/add_circle", data).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: "创建成功",
							icon: "none",
							success() {
								setTimeout(() => {
								this.createTrue=false;
									uni.navigateBack({
										delta: 1
									})
								}, 1000)
							}
						})
					} else {
						this.createTrue=false;
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
					this.createTrue=false;
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

<style scoped lang="scss">
	.myC9 {
		color: #999;
	}

	.gaodu {
		height: 100rpx;
	}

	.createCircle {
		width: 100vw;
		height: 100vh;
		background-color: #F8F8F8;

		.ccbocy {
			width: 750upx;
			// height: 540upx;
			background-color: #fff;
			box-sizing: border-box;
			padding: 0 30upx;
			position: relative;

			.numCC {
				width: 100upx;
				height: 22upx;
				font-size: 24upx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #333;
				line-height: 23upx;
				position: absolute;
				bottom: 21upx;
				right: 32upx;
			}

			.ccbi {
				width: 100%;
				height: 93upx;
				border-bottom: 1px solid #eee;

				.ccbi_text {
					font-size: 30upx;
					font-family: Microsoft YaHei;
					font-weight: 400;
					color: #333333;
					line-height: 23upx;
				}

				.ccbi_img {
					width: 56upx;
					height: 56upx;
					border-radius: 10upx;
				}
			}

			.jianClass {
				font-size: 24upx;
				font-family: Microsoft YaHei;
				font-weight: 400;
				color: #BBBBBB;
				line-height: 23upx;
			}
		}

		.createBtn {
			width: 750upx;
			height: 80upx;
			background: #FFFFFF;
			border-radius: 10upx;
			font-size: 30upx;
			font-family: PingFang SC;
			font-weight: 400;
			color: #F43B31;
			line-height: 30upx;
			margin-top: 22upx;
		}
	}

	uni-textarea {
		height: 150rpx !important;
		margin-top: 20rpx;
		width: 690upx;
	}
</style>
