<template>

	<view class="content">
		<topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">圈子管理</text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar>
		<view class=" pl15 pr15 bgcf">
			<view class="flex ju_b aic pt8 pb8 b-b-1">
				<text class="fs15">修改头像</text>
				<avatar selWidth="250rpx" selHeight="250rpx" @upload="myUpload" :avatarSrc="avatar?getimg(avatar):getimg('/static_s/images/upimg.png')"
					avatarStyle="width: 55rpx;height: 55rpx;border-radius: 10upx;" inner=true></avatar>
			</view>
			<view class="flex ju_b aic pt12 pb12 b-b-1">
				<text class="fs15">修改标题</text>
				<input type="text" placeholder="请输入手机号" v-model="opons" class="fs13 c9 text-right" />
			</view>
			<wangding-pickerAddress class=" b-b-1 " @change="change">
				<view class="flex aic ju_b  pb10 pt10">
					<view class="flex aic">
						<text class="fs15 ">修改地址</text>
					</view>
					<view class=" ">
						<text class="fs14  c9">{{city}}</text>
						<!-- <text class=" icon-arrow iconfont fs11 c9 pl5"></text> -->
						</image>
					</view>
				</view>
			</wangding-pickerAddress>
			<view class="pt12 pb12 b-b-1">
				<text class="fs15 ">修改简介</text>
				<textarea @input="descInput" v-model="desc" placeholder="请在这里输入圈子简介…" maxlength="500"
					placeholder-class="fs14  gaodu">
				</textarea>
				<view class="num  flex flex-right fs14"><text class="" style="color: #F43B31;">{{desc.length>0?desc.length:0}}</text>/500
				</view>
			</view>

			<view class="flex ju_b aic pt12 pb12 " @click='jump' data-url='../follow/follow'
				:data-shifou='true'>
				<text class="fs15">关注用户</text>
				<view class="flex aic">
					<text class="fs12 c9">{{concerns_number}}</text>
					<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
				</view>
			</view>
		</view>
<view class="funbao flex aic ju_c fs15 ml15 mt25" @click="bao">
	保存
</view>
<view class="funbao flex aic ju_c fs15 ml15 mt15" @click="quxiao">
	删除
</view>
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
				avatar: '',
				opons: '',
				city: '',
				remnant: 0,
				desc: '',
				myPid:'',
				concerns_number:0
			}
		},
		onHide() {

		},
		onLoad(option) {
			that = this
			this.myPid = option.id;
			this.getShowCircle();
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			getShowCircle() {
				service.P_post("circle/show_circle", {
					id: that.myPid
				}).then((res) => {
					if (res.code == 1) {
						console.log(res)
						var datas = res.data;
						that.avatar=datas.list.pic
						that.opons=datas.list.title
						that.city=datas.list.address
						that.desc=datas.list.subtitle||''
						that.concerns_number=datas.list.concerns_number
					}
				}).catch((e) => {
					console.log(e)
					uni.showToast({
						title: "服务器异常",
						icon: 'none'
					})
				})
			},
			bao() {
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
					id:that.myPid,
					title: this.opons,
					subtitle: this.desc,
					pic: this.avatar,
					address: this.city
				}
				service.P_post("/circle/edit_circle", data).then(res => {
					if (res.code == 1) {
						uni.showToast({
							title: "操作成功",
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
				
			
			},
			
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			descInput(e) {
				this.remnant = e.detail.value.length
			},
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
			
			quxiao() {
				uni.showModal({
					title: '提示',
					content: '确定删除圈子吗',
					success: function(res) {
						if (res.confirm) {
							uni.showToast({
								title: '删除圈子成功',
								icon: 'none',
							});
						} else if (res.cancel) {
							uni.showToast({
								title: '删除圈子失败',
								icon: 'none',
							});
						}
					}
				});
			},
			
			change(data) {

				this.city = data.data.join('')
				console.log(data.data.join(''))
				console.log(this.city);
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

	.gaodu {
		height: 100rpx;
	}

	uni-textarea {
		height: 150rpx !important;
		margin-top: 20rpx;
	}
	.funbao {
		width: 691rpx;
		color: #fff;
		height: 80rpx;
		background: #F43B31;
		border-radius: 10rpx;
	}
</style>
