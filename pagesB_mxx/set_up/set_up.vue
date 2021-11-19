<template>

	<view class="content">
		<!-- 	<topbar bg_color="#F43B31" text_color="#fff" :have_top="true">
			<text class="icon-fanhui iconfont" style="color: #FFFFFF;" @click="fanhui"> </text>
			<text class=" " style="color: #FFFFFF;">设置</text>
			<text class="pr5 fs14" style="color: #FFFFFF;"> </text>
		</topbar> -->
		<view class=" pl15 pr15 bgcf">
			<view class="flex ju_b aic pt8 pb8 b-b-1">
				<text class="fs15">修改头像</text>
				<avatar selWidth="250rpx" selHeight="250rpx" @upload="myUpload" :avatarSrc="userinfo_data.img"
					avatarStyle="width: 52rpx;height: 52rpx;border-radius: 50%;" inner=true></avatar>
			</view>
			<view class="flex ju_b aic pt12 pb12 b-b-1" @click="jump" data-url="/pagesB_mxx/shoujih/shoujih">
				<text class="fs15">修改手机号</text>
				<input type="text" placeholder="请输入手机号" disabled="" v-model="userinfo_data.phone" class="fs13 text-right" />
			</view>
			<view class="flex ju_b aic pt12 pb12 b-b-1">
				<text class="fs15">绑定微信</text>
				<view class="flex aic">
					<text class="fs12 " style="color: #FF9102;" v-if="userinfo_data.wx_applet_openid==1">已绑定</text>
					<text class="fs12 c9" v-if="userinfo_data.wx_applet_openid==2">未绑定</text>
					<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
				</view>
			</view>
			<view class="flex ju_b aic pt12 pb12 b-b-1 " @click='jump' data-url='../contacts/contacts'
				:data-shifou='true'>
				<text class="fs15">联系人信息</text>
				<view class="flex aic">
					<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
				</view>
			</view>
			<view class="flex ju_b aic pt12 pb12 b-b-1 " @click='jump' data-url='../enterprise/enterprise'
				:data-shifou='true'>
				<text class="fs15">企业信息</text>
				<view class="flex aic">
					<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
				</view>
			</view>
			<view class="flex ju_b aic pt12 pb12 " @click='jump_fuc' data-url='../shenfen/shenfen' :data-shifou='true'>
				<text class="fs15">实名认证</text>
				<view class="flex aic">
					<text class="fs12"  style="color: #FF9102;"  v-if="userinfo.is_examine==2">已认证</text>
					<text class="fs12 c9" v-else-if="userinfo.is_examine==1">待审核</text>
					<text class="fs12 c9" v-else-if="userinfo.is_examine==3">不通过</text>
					<text class="fs12 c9" v-else>未认证</text>
					<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
				</view>
			</view>
		</view>
		<!-- <view class=" pl15 pr15 bgcf mt10">


			<view class="flex ju_b aic pt12 pb12 b-b-1 " @click='jump' data-url='../notice/notice' :data-shifou='true' data-id='2'>
				<text class="fs15">通知设置</text>
				<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
			</view>
			< view class="flex ju_b aic pt12 pb12 ">
				<text class="fs15">清理缓存</text>

				<text class="fs12 c9">0M</text>
			</view>
		</view> -->
		<view class=" pl15 pr15 bgcf mt10">


			<view class="flex ju_b aic pt12 pb12 b-b-1 " @click='jump' data-url='../About/About?key=gywm' data-id='2'
				:data-shifou='true'>
				<text class="fs15">关于我们</text>
				<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
			</view>
			<view class="flex ju_b aic pt12 pb12 b-b-1 " @click='jump' data-url='../About/About?key=ysxy' data-id='2'
				:data-shifou='true'>
				<text class="fs15">隐私协议</text>
				<text class=" icon-arrow iconfont fs11 c9 pl5"></text>
			</view>
			<view class="flex ju_b aic pt12 pb12 ">
				<text class="fs15">当前版本</text>

				<text class="fs12 c9">V1.0</text>
			</view>
		</view>
		<view class=" p15 bgcf flex aic ju_c   mt10" @click="myloginOut">
			<text class="fs15" style="color: #FF1919;"> 退出登录</text>
		</view>
		<view class=" p15 bgcf flex aic ju_c   mt10" @click="zx_id">
			<text class="fs15" style="color: #FF1919;"> 注销账号</text>
		</view>
	</view>
</template>

<script>
	import service from '../../components/service.js';
	import Vue from 'vue'
	var that
	import {
		mapState,
		mapMutations
	} from 'vuex'
	export default {
		data() {
			return {
				avatar: '/static/images/ma/xue.jpg',
				opons: '166****6011',
				userinfo_data:''
			}
		},
		onHide() {

		},
		onLoad() {
			that = this
			that.userinfo_data=that.userinfo
		},
		onShow() {

		},

		computed: {
			...mapState(['hasLogin', 'forcedLogin', 'userName', 'userinfo'])
		},
		methods: {
			...mapMutations(['logout', 'login']),
			jump_fuc(){
				if(that.userinfo.is_examine==4){
					uni.navigateTo({
						url:'/pagesB_mxx/shenfen/shenfen'
					})
				}else{
					uni.navigateTo({
						url:'/pagesB_mxx/to_examine/to_examine'
					})
				}
			},
			getimg(img) {
				return service.getimg(img)
			},
			jump(e) {
				return service.jump(e)
			},
			fanhui() {
				wx.navigateBack({
					delta: 1
				})
			},
			myUpload(rsp) {
				var avatar = rsp.path
				service.wx_upload(avatar).then(res => {
							
					that.btn_kg = 0
					console.log(res)
					if (res.code == 1) {
						var datas = res.data
						// console.log(that.userdata)
						Vue.set(that.userinfo_data,'img',datas)
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
				// wx.uploadFile({
				// 	url: service.IPurl + 'user/set', //仅为示例，非真实的接口地址
				// 	filePath: that.avatar,
				// 	name: 'file',
				// 	formData: {

				// 	},
				// 	header: {
				// 		'token': uni.getStorageSync('token') || '',
				// 	},
				// 	success(res) {
				// 		console.log(res)
				// 		const data = JSON.parse(res.data)
				// 		console.log(res.data)
				// 		that.avatar = data.data
				// 		that.getimg()
				// 		do something
				// 	}
				// })

			},
			zx_id(){
				uni.showModal({
				    title: '提示',
				    content: '是否注销账号，账号注销后不可恢复',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										var jkurl = "/user/cancellation"
										var datas = {
											// type: that.type,
											// search: '',
											// page: that.page,
											// limit: 4
										}
										console.log(that.data_last)
										if (that.data_last == true) {
											return
										}
										console.log(that.btnkg)
										if (that.btnkg == 1) {
											return
										} else {
											that.btnkg = 1
										}
										uni.showLoading({
											mask: true,
											title: '正在提交'
										})
										// var page_now = that.page
										service.P_post(jkurl, datas).then(res => {
											that.btnkg = 0
											console.log(res)
											if (res.code == 1) {
												var datas = res.data
												console.log(typeof datas)
										
												if (typeof datas == 'string') {
													datas = JSON.parse(datas)
												}
												uni.showToast({
													icon: 'none',
													title: '提交成功'
												})
												setTimeout(function(){
													that.btnkg = 0
													that.logout();
													uni.removeStorageSync('userInfo');
													uni.removeStorageSync('token');
													uni.reLaunch({
														url:'/pages/index/index'
													})
												},1000)
										
										
											} else {
												that.btnkg = 0
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
										// that.logout();
										// uni.removeStorageSync('userInfo');
										// uni.removeStorageSync('token');
										// uni.reLaunch({
										// 	url:'/pages/index/index'
										// })
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
			},
			myloginOut(){
				uni.showModal({
				    title: '提示',
				    content: '是否退出登陆',
				    success: function (res) {
				        if (res.confirm) {
				            console.log('用户点击确定');
										that.logout();
										uni.removeStorageSync('userInfo');
										uni.removeStorageSync('token');
										uni.reLaunch({
											url:'/pages/index/index'
										})
				        } else if (res.cancel) {
				            console.log('用户点击取消');
				        }
				    }
				});
				
			}

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
